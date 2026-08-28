import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const statusLabels = {
    pending: 'Menunggu',
    processing: 'Diproses',
    ready: 'Siap',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
};

const typeLabels = {
    dine_in: 'Dine In',
    takeaway: 'Takeaway',
    self_order: 'Self Order',
};

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setData('status', status);
        patch(route('orders.status', order.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Pesanan — {order.order_number}
                </h2>
            }
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-sm text-gray-500">No. Order</p>
                                <p className="font-semibold">{order.order_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <select
                                    value={data.status}
                                    onChange={handleStatusChange}
                                    disabled={processing}
                                    className="border-gray-300 rounded-md text-sm"
                                >
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                            <div>
                                <p className="text-gray-500">Meja</p>
                                <p className="font-medium">{order.table_number || '-'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Tipe</p>
                                <p className="font-medium">{typeLabels[order.type]}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Kasir</p>
                                <p className="font-medium">{order.user?.name ?? '-'}</p>
                            </div>
                        </div>

                        <h3 className="font-semibold mb-3">Item Pesanan</h3>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start border-b pb-3">
                                    <div>
                                        <p className="text-sm font-medium">{item.product?.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}
                                        </p>
                                        {item.note && (
                                            <p className="text-xs text-gray-400 italic mt-1">Catatan: {item.note}</p>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium">
                                        Rp {Number(item.price * item.quantity).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-semibold text-lg mt-6 pt-4 border-t">
                            <span>Total</span>
                            <span>Rp {Number(order.total).toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <Link href={route('orders.index')} className="text-sm text-gray-600 hover:underline">
                        ← Kembali ke Riwayat Pesanan
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}