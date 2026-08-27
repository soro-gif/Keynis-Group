<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach ([
    ['route' => 'home', 'changefreq' => 'weekly', 'priority' => '1.0'],
    ['route' => 'about', 'changefreq' => 'monthly', 'priority' => '0.8'],
    ['route' => 'trading', 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['route' => 'logistics', 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['route' => 'distribution', 'changefreq' => 'weekly', 'priority' => '0.9'],
    ['route' => 'resources', 'changefreq' => 'weekly', 'priority' => '0.7'],
    ['route' => 'products.index', 'changefreq' => 'daily', 'priority' => '0.9'],
    ['route' => 'commodities', 'changefreq' => 'daily', 'priority' => '0.8'],
    ['route' => 'assets.index', 'changefreq' => 'daily', 'priority' => '0.8'],
    ['route' => 'partners.index', 'changefreq' => 'weekly', 'priority' => '0.7'],
    ['route' => 'market-watch.index', 'changefreq' => 'daily', 'priority' => '0.7'],
    ['route' => 'projects.index', 'changefreq' => 'weekly', 'priority' => '0.7'],
    ['route' => 'contact', 'changefreq' => 'monthly', 'priority' => '0.6'],
] as $page)
    <url>
        <loc>{{ route($page['route']) }}</loc>
        <changefreq>{{ $page['changefreq'] }}</changefreq>
        <priority>{{ $page['priority'] }}</priority>
    </url>
@endforeach
</urlset>
