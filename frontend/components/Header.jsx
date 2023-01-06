/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

import SearchBar from './SearchBar';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div>
            <Head>
                <title>Home Page</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Head>
            {/* Header */}
            <header
                class="fixed top-0 left-0 w-full bg-gradient-to-r from-green-50 to-white z-[100] transition duration-400 font-serif"
                id="header"
            >
                <nav class="h-14 flex justify-between items-center max-w-[968px] ml-4 mr-4">
                    <Link
                        href="/"
                        class="text-blue-800 font-medium transition duration-400 hover:text-blue-900"
                    >
                        chapterclose
                    </Link>

                    <div class="fixed bottom-4 bg-gradient-to-r from-slate-500 to-slate-600 w-[90%] rounded-lg py-4 px-[2.25rem] transition duration-400 backdrop-blur-[10px] left-0 right-0 mx-auto my-0 md:w-[328px]">
                        <ul class="flex justify-between items-center">
                            <li class="nav__item">
                                <Link href="/" class="text-white font-normal p-1 flex rounded">
                                    <i class="bx bx-home-alt" />
                                </Link>
                            </li>

                            <li class="nav__item">
                                <Link href="/cart" class="nav__link">
                                    <i class="bx bx-shopping-bag" />
                                </Link>
                            </li>

                            <li class="nav__item">
                                <Link href="/myorder" class="nav__link">
                                    <i class="bx bx-book" />
                                </Link>
                            </li>

                            <button
                                type="button"
                                class="nav__item"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <i class="bx bx-menu-alt-right" />
                            </button>
                        </ul>
                    </div>

                    {/* <i class="bx bx-search-alt" /> */}
                    <SearchBar />
                </nav>
            </header>
            {isMenuOpen && userInfo ? (
                <div class="fixed bottom-20 right-16 w-28">
                    <div class="py-1 rounded-md bg-gradient-to-r from-slate-900 to-black shadow-xs">
                        <Link
                            href="/profile"
                            class="block px-4 py-2 text-sm text-slate-50 hover:text-slate-400
                                    focus:outline-none focus:text-slate-100"
                        >
                            <i class="bx bx-user" /> Account
                        </Link>

                        <button
                            type="button"
                            onClick={logoutHandler}
                            class="block px-4 py-2 text-sm text-slate-50
                                    hover:text-slate-400
                                    focus:outline-none focus:text-slate-100"
                        >
                            <i class="bx bx-log-out" /> Logout
                        </button>
                    </div>
                </div>
            ) : (
                isMenuOpen && (
                    <div class="fixed bottom-20 right-16 w-28">
                        <div class="py-1 rounded-md bg-gradient-to-r from-slate-900 to-black shadow-xs">
                            <Link
                                href="/login"
                                class="block px-4 py-2 text-sm text-slate-50 hover:text-slate-400
                                    focus:outline-none focus:text-slate-100"
                            >
                                <i class="bx bx-user" /> login
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
