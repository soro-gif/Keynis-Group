#!/usr/bin/env bash
set -e

cd /var/www/html

echo "==> Keynis Group : démarrage"

# 1. APP_KEY obligatoire, sinon Laravel plante en 500 dès la première requête.
if [ -z "${APP_KEY}" ]; then
    echo "!! APP_KEY absente — génération d'une clé temporaire."
    echo "!! Les sessions et cookies seront invalidés à chaque redéploiement."
    echo "!! Définis APP_KEY dans les variables d'environnement Render."
    export APP_KEY="base64:$(head -c 32 /dev/urandom | base64)"
fi

# 2. Base de données SQLite : créer le fichier s'il manque (il est gitignoré).
#    Attention : le disque Render est éphémère, les données sont perdues
#    à chaque redéploiement. Utilise Postgres pour la production.
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    DB_FILE="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
    mkdir -p "$(dirname "$DB_FILE")"
    touch "$DB_FILE"
    chmod 664 "$DB_FILE"
    echo "==> SQLite : ${DB_FILE}"
fi

# 3. Droits d'écriture (sessions, cache, vues compilées, logs).
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

# 4. Purger les caches hérités de l'image avant de recacher avec les
#    vraies variables d'environnement Render.
#    (cache:clear est reporté après les migrations : avec CACHE_STORE=database,
#    la table "cache" n'existe pas encore avant le premier `migrate`.)
php artisan config:clear || true

php artisan package:discover --ansi

# 5. Migrations — indispensable : les tables sessions, cache et métier
#    n'existent pas encore au premier démarrage.
echo "==> Migrations"
php artisan migrate --force --no-interaction

php artisan cache:clear || true

# 6. Seed optionnel : mets RUN_SEEDERS=true dans Render pour peupler la base.
if [ "${RUN_SEEDERS}" = "true" ]; then
    echo "==> Seeders"
    php artisan db:seed --force --no-interaction || true
fi

# 7. Lien symbolique storage -> public (images uploadées).
php artisan storage:link || true

# 8. Caches de production.
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Serveur sur le port ${PORT:-10000}"
exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
