import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const statusColors = {
    pending: 'bg-[#fff4df] text-[#9a6b2f]',
    processing: 'bg-[#f3e9df] text-[#795538]',
    ready: 'bg-[#eee5dd] text-[#6b4630]',
    completed: 'bg-[#e8f0e8] text-[#4f6b50]',
    cancelled: 'bg-[#fceaea] text-[#a34b4b]',
};

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

export default function Index({ orders, filters }) {

    const handleFilterStatus = (status) => {
        router.get(
            route('orders.index'),
            {
                ...filters,
                status: status || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#3b2418]">
                    Riwayat Pesanan
                </h2>
            }
        >
            <Head title="Riwayat Pesanan" />

            <div className="py-12 bg-[#faf8f5] min-h-full">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm rounded-xl p-6 border border-[#eadfd5]">

                        {/* ================================================= */}
                        {/* FILTER & EXPORT */}
                        {/* ================================================= */}

                        <div className="flex gap-2 mb-6 flex-wrap justify-between items-center">

                            {/* Filter Status */}

                            <div className="flex gap-2 flex-wrap">

                                {/* Semua */}

                                <button
                                    onClick={() => handleFilterStatus('')}
                                    className={`
                                        px-4
                                        py-2
                                        rounded-md
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            !filters.status
                                                ? 'bg-black text-white shadow-sm'
                                                : 'bg-[#f5f1ed] text-[#6f6259] hover:bg-[#eadfd5] hover:text-[#3b2418]'
                                        }
                                    `}
                                >
                                    Semua
                                </button>


                                {/* Status */}

                                {Object.entries(statusLabels).map(
                                    ([key, label]) => (

                                        <button
                                            key={key}
                                            onClick={() =>
                                                handleFilterStatus(key)
                                            }
                                            className={`
                                                px-4
                                                py-2
                                                rounded-md
                                                text-sm
                                                font-medium
                                                transition
                                                ${
                                                    filters.status === key
                                                        ? 'bg-[#5c3825] text-white shadow-sm'
                                                        : 'bg-[#f5f1ed] text-[#6f6259] hover:bg-[#eadfd5] hover:text-[#3b2418]'
                                                }
                                            `}
                                        >
                                            {label}
                                        </button>

                                    )
                                )}

                            </div>


                            {/* Export CSV */}

                            <a
                                href={route('orders.export')}
                                className="
                                    bg-[#5c3825]
                                    hover:bg-[#45291b]
                                    text-white
                                    px-4
                                    py-2
                                    rounded-md
                                    text-sm
                                    font-medium
                                    transition
                                    shadow-sm
                                "
                            >
                                Export CSV
                            </a>

                        </div>


                        {/* ================================================= */}
                        {/* TABLE */}
                        {/* ================================================= */}

                        <div className="overflow-x-auto">

                            <table className="min-w-full divide-y divide-[#eadfd5]">

                                {/* TABLE HEADER */}

                                <thead>

                                    <tr className="bg-[#faf8f5]">

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            No. Order
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Meja
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Tipe
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Item
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Total
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Status
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Waktu
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b7768] uppercase tracking-wide">
                                            Aksi
                                        </th>

                                    </tr>

                                </thead>


                                {/* TABLE BODY */}

                                <tbody className="divide-y divide-[#eee5dd]">

                                    {orders.map((order) => (

                                        <tr
                                            key={order.id}
                                            className="hover:bg-[#fcfaf8] transition"
                                        >

                                            {/* No Order */}

                                            <td className="px-4 py-3 text-sm font-medium text-[#3b2418]">
                                                {order.order_number}
                                            </td>


                                            {/* Meja */}

                                            <td className="px-4 py-3 text-sm text-[#4f443d]">
                                                {order.table_number || '-'}
                                            </td>


                                            {/* Tipe */}

                                            <td className="px-4 py-3 text-sm text-[#4f443d]">
                                                {typeLabels[order.type]}
                                            </td>


                                            {/* Item */}

                                            <td className="px-4 py-3 text-sm text-[#4f443d]">
                                                {order.items.length} item
                                            </td>


                                            {/* Total */}

                                            <td className="px-4 py-3 text-sm font-semibold text-black">
                                                Rp{' '}
                                                {Number(
                                                    order.total
                                                ).toLocaleString('id-ID')}
                                            </td>


                                            {/* Status */}

                                            <td className="px-4 py-3 text-sm">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        px-2.5
                                                        py-1
                                                        rounded-md
                                                        text-xs
                                                        font-medium
                                                        ${statusColors[order.status]}
                                                    `}
                                                >
                                                    {statusLabels[order.status]}
                                                </span>

                                            </td>


                                            {/* Waktu */}

                                            <td className="px-4 py-3 text-sm text-[#8b817b]">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleString('id-ID')}
                                            </td>


                                            {/* Detail */}

                                            <td className="px-4 py-3 text-sm">

                                                <Link
                                                    href={route(
                                                        'orders.show',
                                                        order.id
                                                    )}
                                                    className="
                                                        text-[#5c3825]
                                                        hover:text-[#3b2418]
                                                        font-medium
                                                        hover:underline
                                                        transition
                                                    "
                                                >
                                                    Detail
                                                </Link>

                                            </td>

                                        </tr>

                                    ))}


                                    {/* EMPTY STATE */}

                                    {orders.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan={8}
                                                className="
                                                    px-4
                                                    py-10
                                                    text-center
                                                    text-[#a79a91]
                                                    text-sm
                                                "
                                            >
                                                Belum ada pesanan.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}