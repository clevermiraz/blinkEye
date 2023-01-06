/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

import { register } from '../../redux/actions/userActions';

export default function Register() {
    const [fullName, setFullName] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMesssage] = useState('');

    const dispatch = useDispatch();

    const router = useRouter();
    const { query } = router;
    const redirect = query.redirect ? query.redirect : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            router.push(redirect);
        }
    }, [router, redirect, userInfo]);

    const phoneRegex = /(^(01))[3-9]{1}(\d){8}$/;
    const handleValidate = (phone) => {
        // Check if the phone number matches the regex
        if (!phoneRegex.test(phone)) {
            // If the phone number is not valid, return an error message
            return "Phone number must be entered in the format: '01xxxxxxxxx' up to 11 digits allowed.";
        }
        // If the phone number is valid, return an empty string
        return '';
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMesssage('Passwords do not match');
        } else {
            dispatch(register(fullName, phoneNumber, password));
        }
    };
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>

            <section class="bg-gray-50">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create and account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                                <div>
                                    <label
                                        for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Miraz Hossain"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        for="phone"
                                        class="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Your Phone Number
                                    </label>
                                    <input
                                        type="phone"
                                        name="phone"
                                        id="phone"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="01........."
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        pattern={phoneRegex.source}
                                        title={handleValidate(phoneNumber)}
                                    />
                                </div>
                                <div>
                                    <label
                                        for="password"
                                        class="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        for="confirm-password"
                                        class="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                {loading && <Loader />}
                                {error && <Error message={error} />}
                                {message && <Error message={message} />}

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required=""
                                        />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="terms" class="font-light text-gray-500">
                                            I accept the{' '}
                                            <a
                                                class="font-medium text-primary-600 hover:underline"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
                                >
                                    Register
                                </button>
                            </form>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
