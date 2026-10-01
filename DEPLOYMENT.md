# Déploiement — Keynis Trading & Logistics Group

## Architecture

| Élément | Où | Plan |
|---|---|---|
| Application (Laravel 13 + Inertia/React) | Render, service web Docker | free (mise en veille) |
| Base de données | Render Postgres | `0.1c-256mb` (payant) |
| DNS + proxy | Cloudflare (`keynisgroup.ci`) | free |
| Réveil de l'instance | Worker Cloudflare (`cloudflare-worker/`) | free |

Domaine public : <https://www.keynisgroup.ci> ➜ `https://keynis-group-xu0n.onrender.com`

---

## Deux problèmes distincts sur le site

### 1. Plus aucun déploiement ne pouvait passer (sync Blueprint en échec)

Le Blueprint `Keynisgroup_blueprint` échouait à chaque synchronisation :

> There was a problem syncing with your Blueprint:
> `databases[0].plan` **cannot downgrade database from 0.1c-256mb to Free**

Cause : `render.yaml` déclarait `plan: free` pour la base, alors que celle-ci
tourne en réalité sur le plan payant `0.1c-256mb` (l'équivalent payant du plan
free : 0,1 CPU / 256 Mo). Render refuse toute rétrogradation, donc **chaque
synchronisation était annulée** — et une synchronisation annulée ne déploie
rien : ni le nouveau code, ni les variables d'environnement du Blueprint.

Correctif : le champ `plan` de la base est **omis** dans `render.yaml`. La
référence Blueprint précise que dans ce cas Render *conserve* le plan actuel :
plus aucune rétrogradation possible, donc plus aucun blocage. Voir
<https://render.com/docs/blueprint-spec#database-fields>.

### 2. Le site affiche « WELCOME TO RENDER » avant de s'ouvrir

**Ce qui se passe réellement**

1. Render arrête complètement le conteneur après **15 minutes sans aucune
   requête entrante** (documenté dans
   [Deploy for Free](https://render.com/docs/free#spinning-down-on-idle)).
2. Le visiteur suivant déclenche le redémarrage : Render affiche sa page
   d'attente pendant **40 à 60 secondes**.
3. Une fois le conteneur réveillé, le site répond en **~0,5 s** et `/up` en
   **9 ms** (mesuré).

**Le mécanisme de réveil prévu ne fonctionnait pas**

Le dépôt contenait déjà `.github/workflows/keep-alive.yml`, censé appeler `/up`
toutes les 10 minutes. Mesures sur les exécutions réelles (API GitHub) :

| Constat | Mesure |
|---|---|
| Exécutions attendues | 144 / jour (`*/10 * * * *`) |
| Exécutions réelles | **~5 / jour**, trous de 2 h à 7 h |
| Durée des passages réussis | 6 à 8 s → l'instance était déjà éveillée par un visiteur |
| Durée des passages échoués | **65 à 68 s** = le `--max-time 60` du workflow |
| Échecs consécutifs | **12**, du 27/09 23:08 au 30/09 08:42 UTC |

Deux défauts indépendants :

- **GitHub bride les crons des dépôts peu actifs** (dernier commit sur `main` :
  3 septembre). Espacé de plusieurs heures, chaque passage trouvait l'instance
  rendormie.
- **Le timeout de 60 s était plus court que le démarrage à froid** : le ping
  abandonnait avant la réponse et le job passait au rouge.

Résultat : l'instance était en veille pour la quasi-totalité des visiteurs.

---

## Correctifs appliqués

### 1. Débloquer les déploiements (`render.yaml`)

- `databases[0].plan` retiré (voir problème n°1 ci-dessus).
- `APP_ENV` : `local` ➜ **`production`** et `APP_URL` : `127.00.1:10000` ➜
  **`https://www.keynisgroup.ci`**. Ces deux valeurs avaient été dégradées
  localement sans être commitées. `APP_URL` invalide ne se voyait pas depuis le
  navigateur (Laravel reconstruit l'URL à partir de la requête) mais faussait
  les URL générées hors requête : e-mails, file d'attente, tâches planifiées.
- `LOG_LEVEL` : `debug` ➜ `warning` (moins d'écritures au démarrage).

### 2. Réveil fiable — Worker Cloudflare (`cloudflare-worker/`)

Cron **toutes les 5 minutes** (plage 05:00–22:55 UTC) qui appelle `/up` sur
l'origine Render. Cloudflare n'applique pas la bride de GitHub, et le domaine
est déjà chez Cloudflare.

```bash
cd cloudflare-worker
npx wrangler login
npx wrangler deploy
```

Voir `cloudflare-worker/README.md` (déploiement, vérification, quota).

### 3. Démarrage à froid raccourci

`RUN_SEEDERS` passe de `true` à **`auto`** : les seeders ne tournent plus à
chaque réveil mais uniquement si la base est vide
(`php artisan keynis:seed-if-empty`, `app/Console/Commands/SeedIfEmpty.php`).

### 4. Workflow GitHub réparé (filet de sécurité)

`keep-alive.yml` ne fait plus échouer le job lorsqu'un réveil est lent
(`--max-time 240`, puis vérification HTTP 200 avec reprises). Il reste un filet
de sécurité : sa cadence dépend de GitHub.

### 5. En-tête `X-Release`

Chaque réponse HTTP porte le commit réellement déployé
(`RENDER_GIT_COMMIT` fourni par Render, via `config('app.release')`). Absent en
local. C'est ce qui permet de vérifier qu'une révision est bien en ligne.

---

## Contraintes à connaître

### 750 heures d'instance gratuites par mois

Render accorde **750 h d'instance gratuites par mois et par workspace** ; au-delà,
**tous les services gratuits du workspace sont suspendus jusqu'au mois suivant**
(le site serait indisponible plusieurs jours).

Un service éveillé 24 h/24 consomme 744 h sur un mois de 31 jours : la marge est
de 6 h, donc insuffisante. C'est pourquoi le réveil est limité à **05:00–22:55
UTC** : 558 h/mois, 192 h de marge. Conséquence assumée : entre 23:00 et 05:00
UTC, un visiteur peut encore voir la page d'attente de Render.

Suivre la consommation : **Render Dashboard → Billing → Monthly Included Usage**.

**La solution sans compromis** : passer le service web en `plan: starter` dans
`render.yaml` (~7 $/mois). Le site ne se mettrait plus jamais en veille, et le
Worker de réveil deviendrait inutile. La base étant déjà sur un plan payant,
c'est le seul plan gratuit restant sur ce projet.

### Base de données

La base `keynis-db` tourne sur le plan payant **`0.1c-256mb`** : elle n'est donc
**pas** soumise à l'expiration de 30 jours des bases gratuites de Render.

Deux points à garder en tête :

- **Aucun backup automatique** n'est configuré (les sauvegardes gérées sont
  réservées aux plans Postgres supérieurs). Pour une sauvegarde ponctuelle :
  `pg_dump` depuis un poste local avec les identifiants de la base.
- La limite de stockage de ce plan est de 15 Go par défaut.

### Autres limites du plan gratuit du service web

- Le disque est éphémère : les images envoyées doivent aller sur un stockage
  externe (R2/S3 via `AWS_BUCKET`), sinon elles disparaissent à chaque
  redéploiement ou réveil.
- Pas d'accès Shell : utiliser `php artisan admin:reset-password` et
  `ADMIN_PASSWORD` (voir `render.yaml`).
- Les ports SMTP (25/465/587) sont bloqués : l'e-mail passe par Resend en HTTPS
  (`MAIL_MAILER=resend`).

---

## Variables d'environnement à définir dans Render

Ces valeurs sont en `sync: false` dans `render.yaml` : Render **ignore** les
variables `sync: false` lors de la mise à jour d'un Blueprint existant. Elles se
saisissent une fois dans **Render Dashboard → keynis-group → Environment**.

| Variable | Rôle |
|---|---|
| `APP_KEY` | `base64:…` — obligatoire, sinon erreur 500 |
| `ADMIN_PASSWORD` | réinitialise le mot de passe de `admin@keynisgroup.ci` |
| `RESEND_API_KEY` | envoi des e-mails (`re_…`) |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET`, `AWS_URL`, `AWS_ENDPOINT` | stockage des médias uploadés |

---

## Vérifier après déploiement

```bash
# Le service répond
curl -s -o /dev/null -w '%{http_code}\n' https://www.keynisgroup.ci/up      # 200

# Révision réellement en ligne (doit correspondre au dernier commit de main)
curl -sI https://www.keynisgroup.ci/ | findstr /I "x-release"

# Pas de page d'attente Render pendant la plage couverte (temps de réponse)
curl -s -o /dev/null -w '%{time_starttransfer}s\n' https://www.keynisgroup.ci/

# Tests applicatifs
php artisan test
```

Dans le tableau de bord Render, l'onglet **Syns** doit repasser au vert, et
l'onglet **Logs** du service doit montrer une requête sur `/up` toutes les
5 minutes pendant la plage couverte.
