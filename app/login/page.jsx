"use client"
import React, { useState } from 'react';
import { assets, HomeIcon } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 py-12 transition-colors relative overflow-hidden">
            {/* Home Button */}
            <button
                onClick={() => router.push('/')}
                className="absolute top-6 right-6 z-20 p-3 bg-white/10 dark:bg-slate-800/10 backdrop-blur-md rounded-full border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all shadow-lg group"
                aria-label="Go to Home"
            >
                <div className="text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-transform">
                    <HomeIcon />
                </div>
            </button>

            {/* Background Image with highlights */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={assets.auth_bg}
                    alt="background"
                    fill
                    className="object-cover opacity-50 dark:opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-slate-950/40 dark:to-slate-950"></div>
            </div>

            <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-10 relative">
                <div className="text-center">
                    <Image
                        className="mx-auto w-40 h-auto cursor-pointer"
                        src={assets.logo}
                        alt="GlowCart Logo"
                        onClick={() => router.push('/')}
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please enter your details to Login
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-bold text-primary hover:text-primary-hover transition-colors underline underline-offset-4">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
