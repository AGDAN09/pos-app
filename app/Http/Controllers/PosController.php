<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)->get();
        $products = Product::with('category')
            ->where('is_available', true)
            ->where('stock', '>', 0)
            ->get();

        return Inertia::render('Pos/Index', [
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_number' => 'nullable|string',
            'type' => 'required|in:dine_in,takeaway,self_order',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.note' => 'nullable|string',
        ]);

        $order = DB::transaction(function () use ($validated, $request) {
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
                    'note' => 'Pesanan ' . now()->format('Y-m-d H:i'),
                ]);
            }

            $order = Order::create([
                'order_number' => 'ORD-' . now()->format('Ymd') . '-' . str_pad(Order::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT),
                'table_number' => $validated['table_number'] ?? null,
                'type' => $validated['type'],
                'status' => 'pending',
                'total' => $total,
                'user_id' => $request->user()->id,
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            return $order;
        });

        event(new OrderCreated($order));
        
        return redirect()->route('pos.index')->with('success', 'Pesanan berhasil dibuat: ' . $order->order_number);
    }
}