import { Head, Link } from '@inertiajs/react';

export default function Success({ order }) {
    return (
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
            <Head title="Pesanan Berhasil" />

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes checkBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                .pop-in { animation: popIn 0.4s ease-out both; }
                .check-bounce { animation: checkBounce 1s ease-in-out 0.4s; }
            `}</style>

            <div className="pop-in bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="check-bounce w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                    ✅
                </div>

                <h1 className="text-xl font-bold text-[#3b2418] mb-2">Pesanan Berhasil Dikirim!</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Terima kasih! Pesanan kamu sedang disiapkan oleh dapur kami.
                </p>

                <div className="bg-[#faf8f5] rounded-xl p-4 text-left space-y-2 mb-6 border border-[#eadfd5]">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">No. Pesanan</span>
                        <span className="font-medium text-[#3b2418]">{order.order_number}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Meja</span>
                        <span className="font-medium text-[#3b2418]">{order.table_number}</span>
                    </div>
                    <div className="border-t border-[#eadfd5] pt-2 mt-2">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm py-1">
                                <span className="text-gray-700">{item.product?.name} x{item.quantity}</span>
                                <span className="text-gray-900">Rp {Number(item.price * item.quantity).toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between font-semibold border-t border-[#eadfd5] pt-2 mt-2">
                        <span className="text-[#3b2418]">Total</span>
                        <span className="text-[#5c3825]">Rp {Number(order.total).toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-4">
                    Silakan tunggu di meja kamu, pesanan akan diantar setelah siap 🍽️
                </p>

                <Link
                    href={route('self-order.index', order.table_number)}
                    className="inline-block bg-[#5c3825] text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-[#4a2d1d] transition"
                >
                    Pesan Menu Lagi
                </Link>
            </div>
        </div>
    );
}