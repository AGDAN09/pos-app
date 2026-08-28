<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TableController extends Controller
{
    public function index()
    {
        $totalTables = 20; // meja 

        $tables = collect(range(1, $totalTables))->map(function ($number) {
            return [
                'number' => (string) $number,
                'url' => route('self-order.index', $number),
            ];
        });

        return Inertia::render('Tables/Index', [
            'tables' => $tables,
        ]);
    }
}