<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Contact;
use App\Models\Partner;
use App\Models\Product;
use App\Models\Rfq;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private const RFQ_STATUSES = [
        'nouvelle', 'en_analyse', 'sourcing', 'offre_disponible', 'negociation',
        'validee', 'livraison', 'cloturee', 'annulee', 'rejetee', 'en_attente',
    ];

    private const RFQ_CATEGORIES = ['demande', 'offre', 'partenariat'];

    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'rfqs_new' => Rfq::where('status', 'nouvelle')->count(),
                'rfqs_total' => Rfq::count(),
                'assets_pending' => Asset::where('status', 'en_attente')->count(),
                'assets_published' => Asset::where('status', 'publie')->count(),
                'partners_pending' => Partner::where('status', 'nouveau')->count(),
                'partners_validated' => Partner::where('status', 'valide')->count(),
                'contacts_new' => Contact::where('status', 'nouveau')->count(),
                'products_total' => Product::count(),
            ],
            'recentRfqs' => Rfq::latest()->limit(8)->get(['id', 'reference', 'type', 'name', 'subject', 'status', 'created_at']),
            'rfqsTrend' => $this->rfqsTrend(),
            'rfqsByStatus' => $this->rfqsByStatus(),
            'rfqsByCategory' => $this->rfqsByCategory(),
            'topSubjects' => $this->topSubjects(),
        ]);
    }

    private function rfqsTrend(): array
    {
        $start = Carbon::now()->subDays(29)->startOfDay();

        $counts = Rfq::where('created_at', '>=', $start)
            ->selectRaw('date(created_at) as day, count(*) as total')
            ->groupBy('day')
            ->pluck('total', 'day');

        $trend = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $trend[] = ['date' => $date, 'count' => (int) ($counts[$date] ?? 0)];
        }

        return $trend;
    }

    private function rfqsByStatus(): array
    {
        $counts = Rfq::selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status');

        return collect(self::RFQ_STATUSES)
            ->map(fn ($status) => ['status' => $status, 'count' => (int) ($counts[$status] ?? 0)])
            ->all();
    }

    private function rfqsByCategory(): array
    {
        $counts = Rfq::selectRaw('category, count(*) as total')->groupBy('category')->pluck('total', 'category');

        return collect(self::RFQ_CATEGORIES)
            ->map(fn ($category) => ['category' => $category, 'count' => (int) ($counts[$category] ?? 0)])
            ->all();
    }

    private function topSubjects(): array
    {
        return Rfq::whereNotNull('subject')
            ->where('subject', '!=', '')
            ->selectRaw('subject, count(*) as total')
            ->groupBy('subject')
            ->orderByDesc('total')
            ->limit(6)
            ->get()
            ->map(fn ($row) => ['subject' => $row->subject, 'count' => (int) $row->total])
            ->all();
    }
}
