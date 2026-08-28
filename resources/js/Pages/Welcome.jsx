import { Head, Link } from '@inertiajs/react';

export default function Welcome({ canLogin, canRegister }) {
    return (
        <>
            <Head title="POS App - Sistem Kasir Modern" />

            <style>{`
                @keyframes gradientShift {
                    0% {
                        background-position: 0% 50%;
                    }

                    50% {
                        background-position: 100% 50%;
                    }

                    100% {
                        background-position: 0% 50%;
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }

                    50% {
                        transform: translateY(-20px) translateX(10px);
                    }
                }

                @keyframes floatSlow {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }

                    50% {
                        transform: translateY(15px) translateX(-15px);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }

                    to {
                        opacity: 1;
                    }
                }

                .animated-bg {
                    background: linear-gradient(
                        -45deg,
                        #3b2418,
                        #5c3825,
                        #7a4a2e,
                        #4a2c1d
                    );
                    background-size: 400% 400%;
                    animation: gradientShift 12s ease infinite;
                }

                .blob-1 {
                    animation: float 8s ease-in-out infinite;
                }

                .blob-2 {
                    animation: floatSlow 10s ease-in-out infinite;
                }

                .blob-3 {
                    animation: float 7s ease-in-out infinite;
                    animation-delay: 1s;
                }

                .fade-up-1 {
                    animation: fadeInUp 0.7s ease-out both;
                }

                .fade-up-2 {
                    animation: fadeInUp 0.7s ease-out 0.15s both;
                }

                .fade-up-3 {
                    animation: fadeInUp 0.7s ease-out 0.3s both;
                }

                .fade-in-nav {
                    animation: fadeIn 0.6s ease-out both;
                }

                .card-hover {
                    transition:
                        transform 0.25s ease,
                        background-color 0.25s ease,
                        border-color 0.25s ease;
                }

                .card-hover:hover {
                    transform: translateY(-4px);
                    background-color: rgba(255, 255, 255, 0.16);
                    border-color: rgba(255, 244, 230, 0.5);
                }

                .cta-button {
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .cta-button:hover {
                    transform: scale(1.04);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
            `}</style>

            <div className="min-h-screen relative overflow-hidden flex flex-col animated-bg">

                {/* Floating Blobs */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl blob-1" />

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl blob-2" />

                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-100/10 rounded-full blur-3xl blob-3" />

                {/* Navbar */}
                <nav className="relative z-10 px-6 sm:px-10 py-6 flex justify-between items-center fade-in-nav">

                    <div className="flex items-center gap-2 text-white">
                        <img
                            src="/images/logo.svg"
                            alt="Logo"
                            className="w-8 h-8"
                        />

                        <span className="font-bold text-lg">
                            Cafe App
                        </span>
                    </div>

                    <div className="flex gap-3">

                        {canLogin && (
                            <Link
                                href={route('login')}
                                className="px-5 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-md transition"
                            >
                                Masuk
                            </Link>
                        )}

                        {canRegister && (
                            <Link
                                href={route('register')}
                                className="cta-button px-5 py-2 text-sm font-medium bg-white text-[#5c3825] rounded-md shadow-lg"
                            >
                                Daftar
                            </Link>
                        )}

                    </div>
                </nav>

                {/* Hero */}
                <div className="relative z-10 flex-1 flex items-center">

                    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Hero Text */}
                        <div className="text-white">

                            <div className="fade-up-1 inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-medium bg-white/15 border border-white/25 rounded-full backdrop-blur-sm">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="#faf8f5"
                                    strokeWidth="2"
                                />

                                <path
                                    d="M12 7V12L15 14"
                                    stroke="#faf8f5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M17.5 4.5L19 3"
                                    stroke="#fcd34d"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <span>Real-time & Modern</span>
                            </div>

                            <h1 className="fade-up-1 text-4xl sm:text-5xl font-bold leading-tight mb-6">

                                Sistem Kasir Modern untuk{' '}

                                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                                    Bisnis Anda
                                </span>

                            </h1>

                            <p className="fade-up-2 text-amber-100 text-lg mb-8">
                                Kelola pesanan, dapur, dan laporan penjualan
                                dalam satu aplikasi. Real-time, cepat, dan
                                mudah digunakan.
                            </p>

                            {canLogin && (
                                <Link
                                    href={route('login')}
                                    className="fade-up-3 cta-button inline-block px-8 py-3 bg-white text-[#5c3825] font-semibold rounded-md shadow-xl"
                                >
                                    Mulai Sekarang →
                                </Link>
                            )}

                        </div>

                        {/* Feature Cards */}
                        <div className="space-y-4">

                            {[
                                {
                                    title: 'Kasir Cepat',
                                    desc: 'Transaksi mudah dengan keranjang belanja interaktif',
                                    icon: (
                                        <svg
                                            viewBox="0 0 60 60"
                                            className="w-6 h-6"
                                        >
                                            <rect
                                                x="12"
                                                y="18"
                                                width="36"
                                                height="24"
                                                rx="4"
                                                fill="none"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                            />

                                            <line
                                                x1="12"
                                                y1="28"
                                                x2="48"
                                                y2="28"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                            />

                                            <circle
                                                cx="20"
                                                cy="36"
                                                r="2.5"
                                                fill="#faf8f5"
                                            />

                                            <circle
                                                cx="34"
                                                cy="36"
                                                r="2.5"
                                                fill="#faf8f5"
                                            />
                                        </svg>
                                    ),
                                },

                                {
                                    title: 'Kitchen Display',
                                    desc: 'Pesanan masuk ke dapur secara real-time',
                                    icon: (
                                        <svg
                                            viewBox="0 0 60 60"
                                            className="w-6 h-6"
                                        >
                                            <circle
                                                cx="30"
                                                cy="30"
                                                r="14"
                                                fill="none"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                            />

                                            <line
                                                x1="30"
                                                y1="16"
                                                x2="30"
                                                y2="22"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M 22 38 Q 30 46 38 38"
                                                fill="none"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ),
                                },

                                {
                                    title: 'Self-Order',
                                    desc: 'Pelanggan pesan sendiri lewat scan QR',
                                    icon: (
                                        <svg
                                            viewBox="0 0 60 60"
                                            className="w-6 h-6"
                                        >
                                            <rect
                                                x="20"
                                                y="12"
                                                width="20"
                                                height="36"
                                                rx="3"
                                                fill="none"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                            />

                                            <line
                                                x1="20"
                                                y1="38"
                                                x2="40"
                                                y2="38"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                            />

                                            <circle
                                                cx="30"
                                                cy="42"
                                                r="1.5"
                                                fill="#faf8f5"
                                            />
                                        </svg>
                                    ),
                                },

                                {
                                    title: 'Dashboard Analitik',
                                    desc: 'Pantau pendapatan & menu terlaris',
                                    icon: (
                                        <svg
                                            viewBox="0 0 60 60"
                                            className="w-6 h-6"
                                        >
                                            <line
                                                x1="16"
                                                y1="20"
                                                x2="16"
                                                y2="42"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />

                                            <line
                                                x1="30"
                                                y1="28"
                                                x2="30"
                                                y2="42"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />

                                            <line
                                                x1="44"
                                                y1="14"
                                                x2="44"
                                                y2="42"
                                                stroke="#faf8f5"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ),
                                },
                            ].map((feature, i) => (

                                <div
                                    key={i}
                                    className="card-hover bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-start gap-4 fade-up-2"
                                    style={{
                                        animationDelay: `${0.1 * i + 0.2}s`,
                                    }}
                                >

                                    <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#5c3825] shadow-md shrink-0">
                                        {feature.icon}
                                    </span>

                                    <div>

                                        <p className="text-white font-semibold text-sm">
                                            {feature.title}
                                        </p>

                                        <p className="text-amber-100 text-xs mt-1">
                                            {feature.desc}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <footer className="relative z-10 text-center py-6 text-amber-200 text-xs">
                    Cafe App - Dibangun dengan Laravel & React
                </footer>

            </div>
        </>
    );
}