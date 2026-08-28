<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = today();
        $startOfWeek = now()->startOfWeek();
        $startOfMonth = now()->startOfMonth();

        // Statistik ringkasan
        $revenueToday = Order::where('status', 'completed')
            ->whereDate('created_at', $today)
            ->sum('total');

        $revenueWeek = Order::where('status', 'completed')
            ->where('created_at', '>=', $startOfWeek)
            ->sum('total');

        $revenueMonth = Order::where('status', 'completed')
            ->where('created_at', '>=', $startOfMonth)
            ->sum('total');

        $orderCountToday = Order::whereDate('created_at', $today)->count();

        // Grafik pendapatan 7 hari terakhir
        $revenueChart = collect(range(6, 0))->map(function ($daysAgo) {
            $date = today()->subDays($daysAgo);
            $revenue = Order::where('status', 'completed')
                ->whereDate('created_at', $date)
                ->sum('total');

            return [
                'date' => $date->format('d M'),
                'revenue' => (float) $revenue,
            ];
        });

        // Menu terlaris (top 5)
        $topProducts = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_sold'))
            ->with('product:id,name')
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get()
            ->map(fn ($item) => [
                'name' => $item->product?->name ?? 'Produk Terhapus',
                'total_sold' => (int) $item->total_sold,
            ]);

        // Order per status (buat pie/info)
        $ordersByStatus = Order::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard', [
            'stats' => [
                'revenue_today' => (float) $revenueToday,
                'revenue_week' => (float) $revenueWeek,
                'revenue_month' => (float) $revenueMonth,
                'order_count_today' => $orderCountToday,
            ],
            'revenueChart' => $revenueChart,
            'topProducts' => $topProducts,
            'ordersByStatus' => $ordersByStatus,
        ]);
    }
}