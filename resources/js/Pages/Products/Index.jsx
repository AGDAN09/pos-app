import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ products }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manajemen Produk
                </h2>
            }
        >
            <Head title="Produk" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Daftar Produk</h3>
                            <Link
                                href={route('products.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                            >
                                + Tambah Produk
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-3 text-sm">{product.name}</td>
                                            <td className="px-4 py-3 text-sm">{product.category?.name ?? '-'}</td>
                                            <td className="px-4 py-3 text-sm">
                                                Rp {Number(product.price).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3 text-sm">{product.stock}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {product.stock <= 0 || !product.is_available ? (
                                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                                        Sold Out
                                                    </span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                        Tersedia
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm space-x-2">
                                                <Link
                                                    href={route('products.edit', product.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}