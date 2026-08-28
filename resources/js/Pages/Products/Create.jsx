import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: 0,
        is_available: true,
        image: '',
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
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Produk
                </h2>
            }
        >
            <Head title="Tambah Produk" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="category_id" value="Kategori" />
                                <select
                                    id="category_id"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="name" value="Nama Produk" />
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

                            <div>
                                <InputLabel htmlFor="description" value="Deskripsi" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="price" value="Harga" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="stock" value="Stok" />
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                    />
                                    <InputError message={errors.stock} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_available"
                                    type="checkbox"
                                    checked={data.is_available}
                                    onChange={(e) => setData('is_available', e.target.checked)}
                                    className="rounded border-gray-300"
                                />
                                <label htmlFor="is_available" className="ml-2 text-sm text-gray-600">
                                    Tersedia (uncheck untuk Sold Out)
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                                <Link href={route('products.index')} className="text-sm text-gray-600 hover:underline">
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}