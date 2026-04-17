#!/bin/bash
set -e

# Install composer dependencies if they don't exist or if composer.json is newer
if [ ! -d "vendor" ] || [ composer.json -nt vendor ]; then
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Ensure storage and cache directories are writable
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --no-interaction
fi

# Run migrations
php artisan migrate --force --no-interaction

# Create storage link
php artisan storage:link --no-interaction

# Execute the CMD
exec "$@"
