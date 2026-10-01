# Déploiement — Keynis Trading & Logistics Group

## Architecture

| Élément | Où | Plan |
|---|---|---|
| Application (Laravel 13 + Inertia/React) | Render, service web Docker | free |
| Base de données | Render Postgres | free |
| DNS + proxy | Cloudflare (`keynisgroup.ci`) | free |
| Réveil de l'instance | Worker Cloudflare (`cloudflare-worker/`) | free |

Domaine public : <https://www.keynisgroup.ci> ➜ `https://keynis-group-xu0n.onrender.com`

---

## Pourquoi le site affiche « WELCOME TO RENDER »

C'est le symptôme le plus visible du site. Il n'a rien à voir avec
l'application : la page vient de Render, pas du code.

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

### 1. Réveil fiable — Worker Cloudflare (`cloudflare-worker/`)

Cron **toutes les 5 minutes** (plage 05:00–22:55 UTC) qui appelle `/up` sur
l'origine Render. Cloudflare n'applique pas la bride de GitHub, et le domaine
est déjà chez Cloudflare.

```bash
cd cloudflare-worker
npx wrangler login
npx wrangler deploy
```

Voir `cloudflare-worker/README.md` (déploiement, vérification, quota).

### 2. Démarrage à froid raccourci

- `RUN_SEEDERS` passe de `true` à **`auto`** : les seeders ne tournent plus à
  chaque réveil mais uniquement si la base est vide
  (`php artisan keynis:seed-if-empty`, `app/Console/Commands/SeedIfEmpty.php`).
- `LOG_LEVEL` passe de `debug` à `warning` (moins d'écritures au démarrage).

### 3. Configuration de production restaurée (`render.yaml`)

Le fichier local avait été modifié et n'était pas commité :

| Variable | Valeur cassée | Valeur corrigée |
|---|---|---|
| `APP_ENV` | `local` | `production` |
| `APP_URL` | `127.00.1:10000` (URL invalide) | `https://www.keynisgroup.ci` |

`APP_URL` invalide ne se voyait pas depuis le navigateur (Laravel reconstruit
l'URL à partir de la requête), mais faussait les URL générées hors requête :
e-mails, liens en file d'attente, tâches planifiées.

### 4. Workflow GitHub réparé (filet de sécurité)

`keep-alive.yml` ne fait plus échouer le job lorsqu'un réveil est lent
(`--max-time 240`, puis vérification HTTP 200 avec reprises). Il reste un filet
de sécurité : sa cadence dépend de GitHub.

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

**La solution sans compromis** : passer le service web en `plan: starter`
dans `render.yaml` (~7 $/mois). Plus de mise en veille, plus besoin de réveil.

### Le Postgres gratuit expire après 30 jours

> Free Render Postgres databases expire 30 days after creation. […] After a free
> database expires, you have a grace period of 14 days […] After the grace
> period, Render **deletes the database (along with all of its data)**.

Contrairement au service web, la base **ne se réveille pas** : à l'expiration
elle devient inaccessible, puis est supprimée définitivement, avec tout le
contenu du site (produits, actifs, partenaires, demandes, comptes).

**À vérifier maintenant** : Render Dashboard → la base `keynis-db` → **Info** →
date de création et date d'expiration.

Options :

1. la passer sur un plan payant avant l'expiration ;
2. la recréer et relancer `migrate` + seeders (les données métier saisies depuis
   sont perdues) ;
3. migrer vers un Postgres gratuit sans expiration (Neon, Supabase) en changeant
   `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` sur Render
   — conserver `DB_SSLMODE=require`.

Aucune sauvegarde n'est possible sur une base gratuite : **aucun backup** n'est
disponible. Option 3 recommandée pour la production.

### Autres limites du plan gratuit

- Le disque est éphémère : les images envoyées doivent aller sur un stockage
  externe (R2/S3 via `AWS_BUCKET`), sinon elles disparaissent à chaque
  redéploiement ou réveil.
- Pas d'accès Shell : utiliser `php artisan admin:reset-password` et
  `ADMIN_PASSWORD` (voir `render.yaml`).
- Les ports SMTP (25/465/587) sont bloqués : l'e-mail passe par Resend en HTTPS
  (`MAIL_MAILER=resend`).

---

## Variables d'environnement à définir dans Render

Ces valeurs sont en `sync: false` dans `render.yaml` : à saisir une fois dans
**Render Dashboard → keynis-group → Environment**.

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

# Aucune page d'attente Render pendant la plage couverte (mesurer le TTFB)
curl -s -o /dev/null -w '%{time_starttransfer}s\n' https://www.keynisgroup.ci/

# Tests applicatifs
php artisan test
```

Dans le tableau de bord Render, l'onglet **Logs** du service doit montrer une
requête sur `/up` toutes les 5 minutes pendant la plage couverte.
