# Réveil de l'instance Render (Worker Cloudflare)

## Le problème

Le service web Render est sur `plan: free`. Render **arrête complètement le
conteneur après ~15 minutes sans requête entrante**. Le visiteur suivant doit
attendre le redémarrage (40 à 60 s) et voit la page d'attente de Render à la
place du site :

> WELCOME TO RENDER · SERVICE WAKING UP · ALLOCATING COMPUTE RESOURCES…

Ce n'est pas un bug de l'application : le site répond en ~0,5 s une fois le
conteneur réveillé. C'est le plan gratuit qui met l'instance en veille.

## La solution retenue

Un Worker Cloudflare avec un **cron toutes les 5 minutes** qui appelle `/up` sur
l'origine Render. L'instance ne reste jamais inactive plus de 5 minutes, donc
elle ne s'endort jamais.

Pourquoi Cloudflare et pas GitHub Actions : GitHub **bride fortement** les
workflows planifiés d'un dépôt peu actif. Le workflow
`.github/workflows/keep-alive.yml` de ce dépôt demande une exécution toutes les
10 minutes ; les journaux GitHub montrent ~5 exécutions par jour, avec des trous
de 2 à 7 heures — largement de quoi laisser l'instance s'endormir. Cloudflare
n'applique pas cette bride, et le domaine `keynisgroup.ci` est déjà géré par
Cloudflare.

## Déploiement (5 minutes, une seule fois)

Prérequis : Node.js installé et un accès au compte Cloudflare qui gère
`keynisgroup.ci`.

```bash
cd cloudflare-worker

# 1. Se connecter (ouvre le navigateur)
npx wrangler login

# 2. Créer le Worker et enregistrer le cron
npx wrangler deploy
```

`wrangler deploy` affiche l'URL du Worker, par exemple
`https://keynis-keep-alive.<compte>.workers.dev`.

## Contrainte de quota Render (importante)

Render accorde **750 heures d'instance gratuites par mois et par workspace**.
Un service éveillé 24 h/24 en consomme 744 sur un mois de 31 jours : il suffit
d'un dépassement pour que **Render suspende tous les services gratuits du
workspace jusqu'au mois suivant**. Une panne de plusieurs jours serait bien pire
que la page d'attente de 60 s que l'on cherche à supprimer.

C'est pourquoi le cron de ce Worker tourne de **05:00 à 22:55 UTC** (heure
d'Abidjan = UTC) plutôt que 24 h/24 :

| Plage | Heures/mois (31 j) | Marge sur 750 h |
|---|---|---|
| 05:00–22:55 (réglage actuel) | 558 h | 192 h |
| 24 h/24 | 744 h | 6 h |

Le site peut donc encore afficher la page d'attente de Render pour un visiteur
entre 23:00 et 05:00 UTC. Pour couvrir la nuit, élargir la plage dans
`wrangler.toml` (`crons = ["*/5 5-23 * * *"]` pour aller jusqu'à 23:55) en
vérifiant la consommation réelle dans **Render Dashboard → Billing → Monthly
Included Usage**. Si le budget devient contraignant, la seule solution propre
reste le `plan: starter`.

## Vérification

```bash
# Déclenchement manuel : doit répondre {"ok":true,"status":200,...}
curl https://keynis-keep-alive.<compte>.workers.dev

# Le cron est bien enregistré (une ligne "*/5 5-22 * * *")
npx wrangler deployments list
```

Dans le tableau de bord Cloudflare, le Worker doit apparaître sous
**Workers & Pages → keynis-keep-alive → Settings → Trigger Events** avec
l'expression `*/5 5-22 * * *`.

## Suivre l'effet

Après le déploiement, l'instance reste éveillée pendant la plage couverte :
ouvrir `https://www.keynisgroup.ci` entre 05:00 et 23:00 UTC ne doit plus
afficher la page d'attente de Render. Le tableau de bord Render (onglet
**Logs**) montre une requête sur `/up` toutes les 5 minutes.

## Alternatives

| Solution | Fiabilité | Coût |
|---|---|---|
| **Worker Cloudflare (ce dossier)** | Élevée, cron 5 min respecté | Gratuit |
| `plan: starter` dans `render.yaml` | Totale, aucune mise en veille | ~7 $/mois |
| [cron-job.org](https://cron-job.org) ou [UptimeRobot](https://uptimerobot.com) | Élevée, cron 5 min respecté | Gratuit, compte externe requis |
| `.github/workflows/keep-alive.yml` | Faible (bridé par GitHub) | Gratuit |

La solution définitive reste de passer le service web en `plan: starter` :
plus de mise en veille, donc plus besoin de réveil externe.
