import { Head, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Menu({ tableNumber, categories, products }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [processing, setProcessing] = useState(false);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter((p) => p.category_id === selectedCategory);
    }, [selectedCategory, products]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product_id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev;
                return prev.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                {
                    product_id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    quantity: 1,
                    note: '',
                    maxStock: product.stock,
                },
            ];
        });
    };

    const updateQuantity = (productId, delta) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.product_id !== productId) return item;
                    const newQty = item.quantity + delta;
                    if (newQty <= 0) return null;
                    if (newQty > item.maxStock) return item;
                    return { ...item, quantity: newQty };
                })
                .filter(Boolean)
        );
    };

    const updateNote = (productId, note) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product_id === productId ? { ...item, note } : item
            )
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleSubmit = () => {
        if (cart.length === 0) return;
        setProcessing(true);

        router.post(route('self-order.store', tableNumber), {
            items: cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                note: item.note || null,
            })),
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <Head title={`Menu - Meja ${tableNumber}`} />

            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <h1 className="text-lg font-bold">Menu</h1>
                    <p className="text-sm text-gray-500">Meja {tableNumber}</p>
                </div>

                {/* Banner Sambutan */}
                <div className="max-w-2xl mx-auto px-4 pb-3">
                    <div className="bg-[#faf3ea] border border-[#eadfd5] rounded-lg px-4 py-3 flex items-start gap-3">
                        <span className="text-lg">👋</span>
                        <p className="text-xs text-[#8a5a3a] leading-relaxed">
                            Selamat datang! Pilih menu, atur jumlah, lalu tekan <strong className="text-[#5c3825]">"Pesan Sekarang"</strong> di keranjang bawah. Pesanan langsung masuk ke dapur kami.
                        </p>
                    </div>
                </div>

                {/* Filter Kategori */}
                <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                            selectedCategory === 'all' ? 'bg-[#5c3825] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                                selectedCategory === cat.id ? 'bg-[#5c3825] text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Produk */}
            <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
                {filteredProducts.map((product) => {
                    const cartItem = cart.find((item) => item.product_id === product.id);
                    return (
                        <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center">
                            <div className="flex-1">
                                <p className="font-medium text-sm">{product.name}</p>
                                {product.description && (
                                    <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                                )}
                                <p className="text-gray-900 font-semibold text-sm mt-1">
                                    Rp {Number(product.price).toLocaleString('id-ID')}
                                </p>
                            </div>

                            {cartItem ? (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(product.id, -1)}
                                        className="w-7 h-7 bg-gray-100 rounded-full text-sm"
                                    >
                                        -
                                    </button>
                                    <span className="text-sm w-4 text-center">{cartItem.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(product.id, 1)}
                                        className="w-7 h-7 bg-[#5c3825] text-white rounded-full text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-[#5c3825] text-white px-4 py-1.5 rounded-md text-sm"
                                >
                                    Tambah
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Floating Cart Button */}
            {itemCount > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
                    <div className="max-w-2xl mx-auto">
                        <button
                            onClick={() => setShowCart(true)}
                            className="w-full bg-[#5c3825] text-white py-3 rounded-md font-medium flex justify-between items-center px-4"
                        >
                            <span>{itemCount} item</span>
                            <span>Lihat Keranjang · Rp {total.toLocaleString('id-ID')}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Keranjang */}
            {showCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-end sm:items-center sm:justify-center">
                    <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto">
                        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="font-semibold">Keranjang</h3>
                            <button onClick={() => setShowCart(false)} className="text-gray-400">✕</button>
                        </div>

                        <div className="p-4 space-y-4">
                            {cart.map((item) => (
                                <div key={item.product_id} className="border-b pb-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <span className="text-sm font-medium">
                                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.product_id, -1)}
                                            className="w-6 h-6 bg-gray-100 rounded text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product_id, 1)}
                                            className="w-6 h-6 bg-gray-100 rounded text-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Catatan khusus (opsional)"
                                        value={item.note}
                                        onChange={(e) => updateNote(item.product_id, e.target.value)}
                                        className="w-full mt-2 text-xs border-gray-300 rounded-md"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t sticky bottom-0 bg-white">
                            <div className="flex justify-between font-semibold mb-3">
                                <span>Total</span>
                                <span>Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-md font-medium"
                            >
                                {processing ? 'Memproses...' : 'Pesan Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}