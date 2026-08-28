import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ categories }) {
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        is_active: true,
    });

    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setData((prev) => ({ ...prev, name, slug }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('categories.update', editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                },
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const startEdit = (category) => {
        setEditingId(category.id);
        setData({
            name: category.name,
            slug: category.slug,
            is_active: category.is_active,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori ini? Produk di dalamnya juga akan terhapus.')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manajemen Kategori
                </h2>
            }
        >
            <Head title="Kategori" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 space-y-6">
                    {/* Form Tambah/Edit */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingId ? 'Edit Kategori' : 'Tambah Kategori'}
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Kategori" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={handleNameChange}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="slug" value="Slug" />
                                    <TextInput
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                    />
                                    <InputError message={errors.slug} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                <label htmlFor="is_active" className="ml-2 text-sm text-gray-600">
                                    Aktif
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <PrimaryButton disabled={processing}>
                                    {editingId ? 'Update' : 'Simpan'}
                                </PrimaryButton>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="text-sm text-gray-600 hover:underline"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Tabel Kategori */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Daftar Kategori</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Produk</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-4 py-3 text-sm">{category.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{category.slug}</td>
                                        <td className="px-4 py-3 text-sm">{category.products_count ?? 0}</td>
                                        <td className="px-4 py-3 text-sm">
                                            {category.is_active ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                    Nonaktif
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm space-x-2">
                                            <button
                                                onClick={() => startEdit(category)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
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
        </AuthenticatedLayout>
    );
}