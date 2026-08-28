<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['items.product', 'user'])->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $orders = $query->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'date']),
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'user']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,ready,completed,cancelled',
        ]);

        $order->update($validated);

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui.');
    }

    public function export(Request $request)
{
    $query = Order::with(['items.product', 'user'])->latest();

    if ($request->filled('start_date')) {
        $query->whereDate('created_at', '>=', $request->start_date);
    }

    if ($request->filled('end_date')) {
        $query->whereDate('created_at', '<=', $request->end_date);
    }

    $orders = $query->get();

    $filename = 'laporan-penjualan-' . now()->format('Y-m-d-His') . '.csv';

    $headers = [
        'Content-Type' => 'text/csv',
        'Content-Disposition' => "attachment; filename=\"$filename\"",
    ];

    $callback = function () use ($orders) {
        $file = fopen('php://output', 'w');

        // Header kolom
        fputcsv($file, [
            'No. Order',
            'Tanggal',
            'Meja',
            'Tipe',
            'Status',
            'Kasir',
            'Item',
            'Total',
        ]);

        foreach ($orders as $order) {
            $itemsList = $order->items->map(function ($item) {
                return $item->product?->name . ' x' . $item->quantity;
            })->implode('; ');

            fputcsv($file, [
                $order->order_number,
                $order->created_at->format('Y-m-d H:i:s'),
                $order->table_number ?? '-',
                $order->type,
                $order->status,
                $order->user?->name ?? 'Self Order',
                $itemsList,
                $order->total,
            ]);
        }

        fclose($file);
    };

    return response()->stream($callback, 200, $headers);
}
}