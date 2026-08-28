import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tables }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (url, number) => {
        navigator.clipboard.writeText(url);
        setCopiedId(number);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Meja and QR Self-Order
                </h2>
            }
        >
            <Head title="Meja and QR" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                        <p className="text-sm text-gray-600">
                            Scan QR di meja anda, pilih menu favorit, dan pesanan langsung masuk ke dapur kami!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {tables.map((table) => {
                            const qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(table.url);

                            return (
                                <div key={table.number} className="bg-white rounded-lg shadow-sm p-4 text-center">
                                    <p className="font-semibold text-sm mb-3">Meja {table.number}</p>

                                    <img src={qrImageUrl} alt={"QR Meja " + table.number} className="mx-auto rounded-md border" />

                                    <div className="mt-3 space-y-2">
                                        <a href={table.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-blue-600 hover:underline">
                                            Buka Halaman
                                        </a>
                                        <button onClick={() => handleCopy(table.url, table.number)} className="w-full text-xs bg-gray-100 hover:bg-gray-200 py-1.5 rounded-md">
                                            {copiedId === table.number ? 'Tersalin' : 'Salin Link'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}