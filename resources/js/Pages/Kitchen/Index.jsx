import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const typeLabels = {
    dine_in: 'Dine In',
    takeaway: 'Takeaway',
    self_order: 'Self Order',
};

export default function Index({ orders: initialOrders }) {
    const [orders, setOrders] = useState(initialOrders);

    useEffect(() => {
        const channel = window.Echo.channel('kitchen');

        channel.listen('.order.created', (e) => {
            setOrders((prev) => [...prev, e.order]);

            const audio = new Audio('/sounds/notification.mp3');
            audio.play().catch(() => {});
        });

        return () => {
            window.Echo.leaveChannel('kitchen');
        };
    }, []);

    const markAsReady = (orderId) => {
        router.patch(route('orders.status', orderId), { status: 'ready' }, {
            onSuccess: () => {
                setOrders((prev) => prev.filter((o) => o.id !== orderId));
            },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kitchen Display System
                </h2>
            }
        >
            <Head title="Kitchen Display" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white border-2 border-orange-300 rounded-lg p-4 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-bold text-lg">{order.order_number}</p>
                                        <p className="text-xs text-gray-500">
                                            {typeLabels[order.type]} {order.table_number ? `· Meja ${order.table_number}` : ''}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(order.created_at).toLocaleTimeString('id-ID')}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="text-sm border-b pb-2">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{item.product?.name}</span>
                                                <span className="font-bold">x{item.quantity}</span>
                                            </div>
                                            {item.note && (
                                                <p className="text-xs text-red-500 italic mt-1">
                                                    Catatan: {item.note}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => markAsReady(order.id)}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
                                >
                                    ✓ Selesai Dimasak
                                </button>
                            </div>
                        ))}

                        {orders.length === 0 && (
                            <p className="text-gray-400 text-sm col-span-full text-center py-12">
                                Belum ada pesanan masuk.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}