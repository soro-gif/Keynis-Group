FROM php:8.4-cli

# Dépendances système et extensions PHP
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libcurl4-openssl-dev \
    libpq-dev \
    libsqlite3-dev \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    pdo_sqlite \
    pgsql \
    mbstring \
    bcmath \
    zip \
    exif \
    pcntl \
    intl \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 22 pour Vite
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && node --version \
    && npm --version

WORKDIR /var/www/html

COPY . .

# Installer les dépendances Laravel
RUN composer install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts

# Compiler React / Inertia / Vite
# VITE_APP_NAME est intégré dans le bundle JS au moment du build (Render ne fournit
# ses variables d'environnement qu'à l'exécution, pas pendant "docker build"),
# sinon le titre des pages retombe sur le défaut "Laravel".
ENV VITE_APP_NAME="Keynis Trading & Logistics Group"
RUN npm ci
RUN npm run build

# Répertoires Laravel (+ fichier SQLite de secours si DB_CONNECTION=sqlite)
RUN mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database

# Le serveur PHP intégré est mono-thread : plusieurs workers évitent
# que le chargement des assets Vite ne bloque les requêtes suivantes.
ENV PHP_CLI_SERVER_WORKERS=4

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
