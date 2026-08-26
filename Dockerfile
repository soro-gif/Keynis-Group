FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    bcmath \
    zip \
    exif \
    pcntl \
    intl \
    dom \
    xml

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js 22 pour Vite
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

COPY . .

# Installer Composer sans exécuter artisan pendant le build
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist \
    --no-scripts

RUN npm ci
RUN npm run build

RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan package:discover --ansi \
    && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}