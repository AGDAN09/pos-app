<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SelfOrderController extends Controller
{
    public function index(string $tableNumber)
    {
        $categories = Category::where('is_active', true)->get();
        $products = Product::with('category')
            ->where('is_available', true)
            ->where('stock', '>', 0)
            ->get();

        return Inertia::render('SelfOrder/Menu', [
            'tableNumber' => $tableNumber,
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    public function store(Request $request, string $tableNumber)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.note' => 'nullable|string',
        ]);

        $order = DB::transaction(function () use ($validated, $tableNumber) {
            $total = 0;
            $orderItemsData = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    abort(422, "Stok {$product->name} tidak cukup.");
                }

                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'note' => $item['note'] ?? null,
                ];

                $product->decrement('stock', $item['quantity']);

                StockLog::create([
                    'product_id' => $product->id,
                    'quantity_change' => -$item['quantity'],
                    'type' => 'order',
                    'note' => 'Self-order meja ' . $tableNumber,
                ]);
            }

            $order = Order::create([
                'order_number' => 'ORD-' . now()->format('Ymd') . '-' . str_pad(Order::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT),
                'table_number' => $tableNumber,
                'type' => 'self_order',
                'status' => 'pending',
                'total' => $total,
                'user_id' => null,
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            return $order;
        });

        event(new OrderCreated($order));

        return Inertia::render('SelfOrder/Success', [
            'order' => $order->load('items.product'),
        ]);
    }
}