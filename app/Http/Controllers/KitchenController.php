<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class KitchenController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product'])
            ->whereIn('status', ['pending', 'processing'])
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Kitchen/Index', [
            'orders' => $orders,
        ]);
    }
}