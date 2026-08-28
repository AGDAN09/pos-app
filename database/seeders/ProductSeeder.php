<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $makanan = Category::where('slug', 'makanan')->first();
        $minuman = Category::where('slug', 'minuman')->first();
        $snack = Category::where('slug', 'snack')->first();
        $dessert = Category::where('slug', 'dessert')->first();

        $products = [
            ['category_id' => $makanan->id, 'name' => 'Nasi Goreng Spesial', 'slug' => 'nasi-goreng-spesial', 'price' => 25000, 'stock' => 50],
            ['category_id' => $makanan->id, 'name' => 'Mie Ayam', 'slug' => 'mie-ayam', 'price' => 20000, 'stock' => 40],
            ['category_id' => $makanan->id, 'name' => 'Ayam Geprek', 'slug' => 'ayam-geprek', 'price' => 22000, 'stock' => 30],
            ['category_id' => $minuman->id, 'name' => 'Es Teh Manis', 'slug' => 'es-teh-manis', 'price' => 5000, 'stock' => 100],
            ['category_id' => $minuman->id, 'name' => 'Es Jeruk', 'slug' => 'es-jeruk', 'price' => 8000, 'stock' => 80],
            ['category_id' => $minuman->id, 'name' => 'Kopi Susu', 'slug' => 'kopi-susu', 'price' => 15000, 'stock' => 60],
            ['category_id' => $snack->id, 'name' => 'Kentang Goreng', 'slug' => 'kentang-goreng', 'price' => 12000, 'stock' => 45],
            ['category_id' => $snack->id, 'name' => 'Pisang Goreng', 'slug' => 'pisang-goreng', 'price' => 10000, 'stock' => 35],
            ['category_id' => $dessert->id, 'name' => 'Es Krim Coklat', 'slug' => 'es-krim-coklat', 'price' => 15000, 'stock' => 25],
            ['category_id' => $dessert->id, 'name' => 'Puding Karamel', 'slug' => 'puding-karamel', 'price' => 12000, 'stock' => 20],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}