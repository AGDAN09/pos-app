import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Daftar - POS App" />

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

                .fade-up {
                    animation: fadeInUp 0.7s ease-out both;
                }

                .fade-in {
                    animation: fadeIn 0.6s ease-out both;
                }

                .register-card {
                    transition:
                        transform 0.25s ease,
                        box-shadow 0.25s ease;
                }

                .register-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
                }

                .register-button {
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .register-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
                }
            `}</style>

            <div className="min-h-screen relative overflow-hidden flex flex-col animated-bg">

                {/* Background Blobs */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl blob-1" />

                <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl blob-2" />

                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-100/10 rounded-full blur-3xl blob-3" />

                {/* Navbar */}
                <nav className="relative z-10 px-6 sm:px-10 py-6 flex justify-between items-center fade-in">

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white"
                    >
                        <img
                            src="/images/logo.svg"
                            alt="Logo"
                            className="w-8 h-8"
                        />

                        <span className="font-bold text-lg">
                            Cafe App
                        </span>
                    </Link>

                    <Link
                        href={route('login')}
                        className="px-5 py-2 text-sm font-medium bg-white text-[#5c3825] rounded-md shadow-lg hover:bg-amber-50 transition"
                    >
                        Masuk
                    </Link>

                </nav>

                {/* Register Content */}
                <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">

                    <div className="w-full max-w-md">

                        {/* Register Card */}
                        <div className="register-card bg-white rounded-2xl shadow-2xl p-8 fade-up">

                            {/* Header */}
                            <div className="text-center mb-7">

                                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#5c3825] flex items-center justify-center shadow-lg mb-4">

                                    <img
                                        src="/images/logo.svg"
                                        alt="Logo"
                                        className="w-10 h-10"
                                    />

                                </div>

                                <h1 className="text-2xl font-bold text-[#3b2418] flex items-center justify-center gap-2">
                                    Buat Akun Baru

                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-[#7a4a2e]"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
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
                                </h1>

                                <p className="text-gray-500 text-sm mt-2">
                                    Daftar untuk mulai menggunakan Cafe App
                                </p>

                            </div>

                            {/* Form */}
                            <form onSubmit={submit}>

                                {/* Name */}
                                <div>

                                    <InputLabel
                                        htmlFor="name"
                                        value="Nama"
                                        className="text-[#3b2418]"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#7a4a2e] focus:ring-[#7a4a2e]"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Masukkan nama kamu"
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />

                                </div>

                                {/* Email */}
                                <div className="mt-4">

                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        className="text-[#3b2418]"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#7a4a2e] focus:ring-[#7a4a2e]"
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="Masukkan email kamu"
                                        required
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />

                                </div>

                                {/* Password */}
                                <div className="mt-4">

                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-[#3b2418]"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#7a4a2e] focus:ring-[#7a4a2e]"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Buat password"
                                        required
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />

                                </div>

                                {/* Confirm Password */}
                                <div className="mt-4">

                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Konfirmasi Password"
                                        className="text-[#3b2418]"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-[#7a4a2e] focus:ring-[#7a4a2e]"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Ulangi password"
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />

                                </div>

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="register-button mt-6 w-full rounded-lg bg-[#5c3825] py-3 text-white font-semibold shadow-lg hover:bg-[#4a2c1d] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing
                                        ? 'Membuat akun...'
                                        : 'Daftar Sekarang →'}
                                </button>

                            </form>

                            {/* Login Link */}
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">

                                <p className="text-sm text-gray-500">

                                    Sudah punya akun?{' '}

                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-[#7a4a2e] hover:text-[#3b2418] transition"
                                    >
                                        Masuk sekarang
                                    </Link>

                                </p>

                            </div>

                        </div>

                        {/* Back */}
                        <div className="text-center mt-5">

                            <Link
                                href="/"
                                className="text-sm text-amber-100 hover:text-white transition"
                            >
                                ← Kembali ke halaman utama
                            </Link>

                        </div>

                    </div>

                </main>

                {/* Footer */}
                <footer className="relative z-10 text-center py-5 text-amber-200 text-xs">
                    Cafe App — Dibangun dengan Laravel & React
                </footer>

            </div>
        </>
    );
}