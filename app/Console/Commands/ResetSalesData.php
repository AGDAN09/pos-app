<?php

namespace App\Console\Commands;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\StockLog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetSalesData extends Command
{
    protected $signature = 'sales:reset';
    protected $description = 'Menghapus semua data transaksi (order, order item, stock log) tanpa menghapus produk/kategori/user';

    public function handle()
    {
        if (! $this->confirm('Yakin ingin menghapus SEMUA data transaksi (order & stock log)? Produk dan kategori tetap aman.')) {
            $this->info('Dibatalkan.');
            return;
        }

        DB::transaction(function () {
            OrderItem::query()->delete();
            Order::query()->delete();
            StockLog::query()->delete();
        });

        $this->info('Data transaksi berhasil direset. Produk & kategori tidak terpengaruh.');
    }
}