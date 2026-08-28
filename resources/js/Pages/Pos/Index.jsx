import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ categories, products }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [orderType, setOrderType] = useState('dine_in');

    const { post, processing } = useForm();

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
                item.product_id === productId
                    ? { ...item, note }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prev) =>
            prev.filter((item) => item.product_id !== productId)
        );
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) return;

        router.post(
            route('pos.store'),
            {
                table_number: tableNumber || null,
                type: orderType,
                items: cart.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    note: item.note || null,
                })),
            },
            {
                onSuccess: () => {
                    setCart([]);
                    setTableNumber('');
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kasir (POS)
                </h2>
            }
        >
            <Head title="Kasir" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* ================================================= */}
                        {/* KOLOM PRODUK */}
                        {/* ================================================= */}

                        <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6">

                            {/* Filter Kategori */}

                            <div className="flex gap-2 mb-4 flex-wrap">

                                {/* SEMUA */}

                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-4 py-2 rounded-md text-sm ${
                                        selectedCategory === 'all'
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    Semua
                                </button>

                                {/* KATEGORI */}

                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() =>
                                            setSelectedCategory(cat.id)
                                        }
                                        className={`px-4 py-2 rounded-md text-sm ${
                                            selectedCategory === cat.id
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}

                            </div>


                            {/* ================================================= */}
                            {/* GRID PRODUK */}
                            {/* ================================================= */}

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                                {filteredProducts.map((product) => (

                                    <button
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        className="border rounded-lg p-4 text-left hover:border-gray-800 hover:shadow-md transition"
                                    >

                                        <div className="font-medium text-sm">
                                            {product.name}
                                        </div>

                                        {/* HARGA → HITAM */}

                                        <div className="text-black font-semibold text-sm mt-1">
                                            Rp{' '}
                                            {Number(product.price).toLocaleString(
                                                'id-ID'
                                            )}
                                        </div>

                                        <div className="text-xs text-gray-400 mt-1">
                                            Stok: {product.stock}
                                        </div>

                                    </button>

                                ))}

                                {filteredProducts.length === 0 && (
                                    <p className="text-gray-400 text-sm col-span-full">
                                        Tidak ada produk tersedia.
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* KOLOM KERANJANG */}
                        {/* ================================================= */}

                        <div className="bg-white shadow-sm rounded-lg p-6 h-fit sticky top-6">

                            <h3 className="font-semibold mb-4">
                                Keranjang
                            </h3>


                            <div className="space-y-3 mb-4">

                                <input
                                    type="text"
                                    placeholder="Nomor Meja (opsional)"
                                    value={tableNumber}
                                    onChange={(e) =>
                                        setTableNumber(e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md text-sm"
                                />

                                <select
                                    value={orderType}
                                    onChange={(e) =>
                                        setOrderType(e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md text-sm"
                                >
                                    <option value="dine_in">
                                        Dine In
                                    </option>

                                    <option value="takeaway">
                                        Takeaway
                                    </option>

                                    <option value="self_order">
                                        Self Order
                                    </option>
                                </select>

                            </div>


                            {/* CART ITEMS */}

                            <div className="space-y-3 max-h-96 overflow-y-auto">

                                {cart.map((item) => (

                                    <div
                                        key={item.product_id}
                                        className="border-b pb-3"
                                    >

                                        <div className="flex justify-between items-start">

                                            <span className="text-sm font-medium">
                                                {item.name}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.product_id
                                                    )
                                                }
                                                className="text-red-500 text-xs"
                                            >
                                                Hapus
                                            </button>

                                        </div>


                                        <div className="flex items-center justify-between mt-2">

                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product_id,
                                                            -1
                                                        )
                                                    }
                                                    className="w-6 h-6 bg-gray-100 rounded text-sm"
                                                >
                                                    -
                                                </button>

                                                <span className="text-sm">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product_id,
                                                            1
                                                        )
                                                    }
                                                    className="w-6 h-6 bg-gray-100 rounded text-sm"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <span className="text-sm font-medium">
                                                Rp{' '}
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toLocaleString('id-ID')}
                                            </span>

                                        </div>


                                        <input
                                            type="text"
                                            placeholder="Catatan (misal: less sugar)"
                                            value={item.note}
                                            onChange={(e) =>
                                                updateNote(
                                                    item.product_id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full mt-2 text-xs border-gray-300 rounded-md"
                                        />

                                    </div>

                                ))}


                                {cart.length === 0 && (
                                    <p className="text-gray-400 text-sm">
                                        Keranjang masih kosong.
                                    </p>
                                )}

                            </div>


                            {/* ================================================= */}
                            {/* TOTAL & CHECKOUT */}
                            {/* ================================================= */}

                            <div className="border-t mt-4 pt-4">

                                <div className="flex justify-between font-semibold mb-4">

                                    <span>
                                        Total
                                    </span>

                                    <span>
                                        Rp{' '}
                                        {total.toLocaleString('id-ID')}
                                    </span>

                                </div>


                                <button
                                    onClick={handleCheckout}
                                    disabled={
                                        cart.length === 0 || processing
                                    }
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-md font-medium"
                                >
                                    Checkout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}