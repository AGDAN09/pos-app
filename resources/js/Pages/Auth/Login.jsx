import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk - POS App" />

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

                .login-card {
                    transition:
                        transform 0.25s ease,
                        box-shadow 0.25s ease;
                }

                .login-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
                }

                .login-button {
                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .login-button:hover {
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
                        href={route('register')}
                        className="px-5 py-2 text-sm font-medium bg-white text-[#5c3825] rounded-md shadow-lg hover:bg-amber-50 transition"
                    >
                        Daftar
                    </Link>

                </nav>


                {/* Login */}
                <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">

                    <div className="w-full max-w-md">

                        <div className="login-card bg-white rounded-2xl shadow-2xl p-8 fade-up">

                            {/* Logo */}
                            <div className="text-center mb-8">

                                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#5c3825] flex items-center justify-center shadow-lg mb-4">
                                    <img
                                        src="/images/logo.svg"
                                        alt="Logo"
                                        className="w-10 h-10"
                                    />
                                </div>

                                <h1 className="text-2xl font-bold text-[#3b2418] flex items-center justify-center gap-2">
                                Selamat Datang

                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 text-[#7a4a2e]"
                                    fill="none"
                                >
                                    <path
                                        d="M8 11V5.5C8 4.67 8.67 4 9.5 4C10.33 4 11 4.67 11 5.5V10"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <path
                                        d="M11 10V4.5C11 3.67 11.67 3 12.5 3C13.33 3 14 3.67 14 4.5V10"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <path
                                        d="M14 10V5.5C14 4.67 14.67 4 15.5 4C16.33 4 17 4.67 17 5.5V11"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />

                                    <path
                                        d="M17 11V8C17 7.17 17.67 6.5 18.5 6.5C19.33 6.5 20 7.17 20 8V13C20 17.42 16.42 21 12 21C8.13 21 5 17.87 5 14V11C5 10.17 5.67 9.5 6.5 9.5C7.33 9.5 8 10.17 8 11"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </h1>

                                <p className="text-gray-500 text-sm mt-2">
                                    Masuk ke akun Cafe App anda
                                </p>

                            </div>


                            {/* Status */}
                            {status && (
                                <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                                    {status}
                                </div>
                            )}


                            <form onSubmit={submit}>

                                {/* Email */}
                                <div>
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
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="Masukkan email kamu"
                                    />

                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>


                                {/* Password */}
                                <div className="mt-5">

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
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Masukkan password kamu"
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>


                                {/* Remember + Forgot */}
                                <div className="mt-5 flex items-center justify-between">

                                    <label className="flex items-center cursor-pointer">

                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked
                                                )
                                            }
                                        />

                                        <span className="ms-2 text-sm text-gray-600">
                                            Ingat saya
                                        </span>

                                    </label>


                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-[#7a4a2e] hover:text-[#3b2418] font-medium transition"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}

                                </div>


                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="login-button mt-6 w-full rounded-lg bg-[#5c3825] py-3 text-white font-semibold shadow-lg hover:bg-[#4a2c1d] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing
                                        ? 'Sedang masuk...'
                                        : 'Masuk ke Cafe App →'}
                                </button>

                            </form>


                            {/* Register */}
                            <div className="mt-6 pt-6 border-t border-gray-100 text-center">

                                <p className="text-sm text-gray-500">
                                    Belum punya akun?{' '}

                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-[#7a4a2e] hover:text-[#3b2418]"
                                    >
                                        Daftar sekarang
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