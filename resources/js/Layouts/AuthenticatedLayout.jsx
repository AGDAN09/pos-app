import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const menuItems = [
    {
        name: 'Dashboard',
        route: 'dashboard',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <rect
                    x="4"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <rect
                    x="14"
                    y="4"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <rect
                    x="4"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <rect
                    x="14"
                    y="14"
                    width="6"
                    height="6"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
            </svg>
        ),
    },
    {
        name: 'Kasir',
        route: 'pos.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <rect
                    x="4"
                    y="7"
                    width="16"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M4 11H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
                <circle cx="13" cy="15" r="1" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: 'Meja & QR',
        route: 'tables.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                    d="M5 10H19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M7 10V17M17 10V17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M5 17H19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M7 10V7C7 5.9 7.9 5 9 5H15C16.1 5 17 5.9 17 7V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        name: 'Kitchen',
        route: 'kitchen.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                    d="M4 11H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M5 11C5 7.7 7.7 5 11 5H13C16.3 5 19 7.7 19 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M6 11V18M18 11V18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        name: 'Pesanan',
        route: 'orders.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <rect
                    x="5"
                    y="3"
                    width="14"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M8 8H16M8 12H16M8 16H13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        name: 'Produk',
        route: 'products.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                    d="M4 7L12 3L20 7V17L12 21L4 17V7Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 7L12 11L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 11V21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
            </svg>
        ),
    },
    {
        name: 'Kategori',
        route: 'categories.index',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path
                    d="M4 6H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M4 12H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M4 18H14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <style>{`
                @keyframes sidebarGlow {
                    0%, 100% {
                        box-shadow: 4px 0 25px rgba(92, 56, 37, 0.04);
                    }

                    50% {
                        box-shadow: 4px 0 35px rgba(92, 56, 37, 0.10);
                    }
                }

                @keyframes logoFloat {
                    0%, 100% {
                        transform: translateY(0px);
                    }

                    50% {
                        transform: translateY(-3px);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes menuSlide {
                    from {
                        opacity: 0;
                        transform: translateX(-8px);
                    }

                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes pulseSoft {
                    0%, 100% {
                        opacity: 0.5;
                    }

                    50% {
                        opacity: 1;
                    }
                }

                .sidebar-animated {
                    animation: sidebarGlow 5s ease-in-out infinite;
                }

                .logo-float {
                    animation: logoFloat 3s ease-in-out infinite;
                }

                .content-fade {
                    animation: fadeIn 0.45s ease-out both;
                }

                .menu-item {
                    transition:
                        transform 0.2s ease,
                        background-color 0.2s ease,
                        color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .menu-item:hover {
                    transform: translateX(4px);
                }

                .menu-icon {
                    transition:
                        transform 0.2s ease,
                        background-color 0.2s ease;
                }

                .menu-item:hover .menu-icon {
                    transform: scale(1.1);
                }

                .active-menu {
                    box-shadow: 0 5px 15px rgba(92, 56, 37, 0.15);
                }

                .user-card {
                    transition:
                        background-color 0.2s ease,
                        transform 0.2s ease;
                }

                .user-card:hover {
                    transform: translateY(-1px);
                }

                .mobile-button {
                    transition:
                        background-color 0.2s ease,
                        transform 0.2s ease;
                }

                .mobile-button:active {
                    transform: scale(0.95);
                }

                .brown-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }

                .brown-scrollbar::-webkit-scrollbar-track {
                    background: #faf8f5;
                }

                .brown-scrollbar::-webkit-scrollbar-thumb {
                    background: #c8a98d;
                    border-radius: 999px;
                }
            `}</style>

            <div className="min-h-screen bg-[#faf8f5] flex">

                {/* ================================================= */}
                {/* MOBILE OVERLAY */}
                {/* ================================================= */}

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-[#2b1a10]/50 backdrop-blur-sm z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}


                {/* ================================================= */}
                {/* SIDEBAR */}
                {/* ================================================= */}

                <aside
                    className={`
                        fixed lg:static
                        inset-y-0 left-0
                        z-40
                        w-64
                        bg-white
                        border-r border-[#eadfd5]
                        flex flex-col
                        transform
                        transition-transform
                        duration-300
                        sidebar-animated
                        ${
                            sidebarOpen
                                ? 'translate-x-0'
                                : '-translate-x-full lg:translate-x-0'
                        }
                    `}
                >

                    {/* --------------------------------------------- */}
                    {/* LOGO */}
                    {/* --------------------------------------------- */}

                    <div className="h-20 flex items-center px-6 border-b border-[#eadfd5]">

                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            onClick={() => setSidebarOpen(false)}
                        >

                            <div className="logo-float w-10 h-10 rounded-xl bg-[#5c3825] flex items-center justify-center shadow-lg shadow-[#5c3825]/20">

                                <img
                                src="/images/logo.svg"
                                alt="Logo"
                                className="w-8 h-8"
                            />

                            </div>

                            <div>
                                <span className="block font-bold text-[#3b2418] text-lg leading-none">
                                    Cafe App
                                </span>

                                <span className="block text-[10px] text-[#a0785c] mt-1 tracking-wider uppercase">
                                    Point of Sale
                                </span>
                            </div>

                        </Link>

                    </div>


                    {/* --------------------------------------------- */}
                    {/* MENU TITLE */}
                    {/* --------------------------------------------- */}

                    <div className="px-6 pt-6 pb-2">

                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#b49a86]">
                            Menu Utama
                        </p>

                    </div>


                    {/* --------------------------------------------- */}
                    {/* MENU */}
                    {/* --------------------------------------------- */}

                    <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto brown-scrollbar">

                        {menuItems.map((item, index) => {

                            const isActive =
                                route().current(item.route) ||
                                route().current(
                                    item.route.replace('.index', '.*')
                                );

                            return (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        menu-item
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-3
                                        rounded-xl
                                        text-sm
                                        font-medium
                                        content-fade
                                        ${
                                            isActive
                                                ? 'active-menu bg-[#5c3825] text-white'
                                                : 'text-[#6f6259] hover:bg-[#f7f1eb] hover:text-[#5c3825]'
                                        }
                                    `}
                                    style={{
                                        animationDelay: `${index * 0.05}s`,
                                    }}
                                >

                                    <span
                                        className={`
                                            menu-icon
                                            w-9
                                            h-9
                                            flex
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-lg
                                            ${
                                                isActive
                                                    ? 'bg-white/15'
                                                    : 'bg-[#f7f1eb] group-hover:bg-[#ead8c8]'
                                            }
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    <span>
                                        {item.name}
                                    </span>

                                    {isActive && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5dfc8]" />
                                    )}

                                </Link>
                            );
                        })}

                    </nav>


                    {/* --------------------------------------------- */}
                    {/* USER SECTION */}
                    {/* --------------------------------------------- */}

                    <div className="border-t border-[#eadfd5] p-3">

                        {/* User Info */}

                        <div className="user-card px-3 py-3 mb-2 rounded-xl bg-[#faf8f5]">

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-[#5c3825] text-white flex items-center justify-center font-semibold text-sm shadow-md">
                                    {user.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className="min-w-0">

                                    <p className="text-sm font-semibold text-[#3b2418] truncate">
                                        {user.name}
                                    </p>

                                    <p className="text-[11px] text-[#a0785c] truncate">
                                        {user.email}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Profile */}

                        <Link
                            href={route('profile.edit')}
                            onClick={() => setSidebarOpen(false)}
                            className="menu-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6f6259] hover:bg-[#f7f1eb] hover:text-[#5c3825]"
                        >

                           <span className="menu-icon w-8 h-8 flex items-center justify-center rounded-lg bg-[#f7f1eb]">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-[#5c3825]"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="8"
                                        r="3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />

                                    <path
                                        d="M5 20C5 16.7 8.1 14 12 14C15.9 14 19 16.7 19 20"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>

                            Profile

                        </Link>


                        {/* Logout */}

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="menu-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                        >

                            <span className="menu-icon w-8 h-8 flex items-center justify-center rounded-lg bg-red-50">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-red-600"
                                    fill="none"
                                >
                                    <path
                                        d="M10 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H10"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <path
                                        d="M13 8L17 12L13 16"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <path
                                        d="M9 12H17"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>

                            Log Out

                        </Link>

                    </div>

                </aside>


                {/* ================================================= */}
                {/* MAIN CONTENT */}
                {/* ================================================= */}

                <div className="flex-1 flex flex-col min-w-0">


                    {/* --------------------------------------------- */}
                    {/* MOBILE TOP BAR */}
                    {/* --------------------------------------------- */}

                    <div className="lg:hidden h-16 bg-white border-b border-[#eadfd5] flex items-center px-4 sticky top-0 z-20 shadow-sm">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="mobile-button p-2 rounded-lg text-[#5c3825] hover:bg-[#f7f1eb]"
                        >

                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>

                        </button>

                        <div className="ml-3 flex items-center gap-2">

                            <span className="text-xl">
                                
                            </span>

                            <span className="font-bold text-[#3b2418]">
                                Cafe App
                            </span>

                        </div>

                    </div>


                    {/* --------------------------------------------- */}
                    {/* HEADER */}
                    {/* --------------------------------------------- */}

                    {header && (
                        <header className="bg-white border-b border-[#eadfd5] shadow-sm">

                            <div className="px-4 py-6 sm:px-6 lg:px-8 content-fade">
                                {header}
                            </div>

                        </header>
                    )}


                    {/* --------------------------------------------- */}
                    {/* PAGE */}
                    {/* --------------------------------------------- */}

                    <main className="flex-1 content-fade">
                        {children}
                    </main>

                </div>

            </div>
        </>
    );
}