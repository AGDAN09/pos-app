import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const statusLabels = {
    pending: 'Menunggu',
    processing: 'Diproses',
    ready: 'Siap',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
};

export default function Dashboard({ stats, revenueChart, topProducts, ordersByStatus }) {
    const formatRupiah = (value) => `Rp ${Number(value).toLocaleString('id-ID')}`;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Kartu Statistik */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <p className="text-sm text-gray-500">Pendapatan Hari Ini</p>
                            <p className="text-2xl font-bold mt-1">{formatRupiah(stats.revenue_today)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <p className="text-sm text-gray-500">Pendapatan Minggu Ini</p>
                            <p className="text-2xl font-bold mt-1">{formatRupiah(stats.revenue_week)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <p className="text-sm text-gray-500">Pendapatan Bulan Ini</p>
                            <p className="text-2xl font-bold mt-1">{formatRupiah(stats.revenue_month)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <p className="text-sm text-gray-500">Order Hari Ini</p>
                            <p className="text-2xl font-bold mt-1">{stats.order_count_today}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Grafik Pendapatan */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-semibold mb-4">Pendapatan 7 Hari Terakhir</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={revenueChart}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip formatter={(value) => formatRupiah(value)} />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Menu Terlaris */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-semibold mb-4">Menu Terlaris</h3>
                            <div className="space-y-3">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm">{product.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-500">
                                            {product.total_sold}x
                                        </span>
                                    </div>
                                ))}
                                {topProducts.length === 0 && (
                                    <p className="text-sm text-gray-400">Belum ada data penjualan.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Status Order */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="font-semibold mb-4">Pesanan Berdasarkan Status</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {Object.entries(statusLabels).map(([key, label]) => (
                                <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                    <p className="text-2xl font-bold">{ordersByStatus[key] ?? 0}</p>
                                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}