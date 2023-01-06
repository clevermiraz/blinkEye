/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import { createOrder } from '../../redux/actions/orderActions';

import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';

export default function PlaceOrderView() {
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, error, success } = orderCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const router = useRouter();
    const dispatch = useDispatch();

    if (!shippingAddress?.address) {
        router.push(`/location`);
    }

    const totalPrice = cartItems.reduce((acc, i) => acc + i.quantity * i.unit_price, 0).toFixed(2);

    const backToPrevPage = () => {
        router.back();
    };

    useEffect(() => {
        if (!userInfo) {
            router.push(`/login`);
        }

        if (success) {
            router.push(`/placeorder/confirmation`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, router, success, order, userInfo]);

    const placeOrderHandler = () => {
        if (cartItems.length === 0) {
            router.push(`/cart`);
        } else {
            dispatch(
                createOrder({
                    orderItems: cartItems,
                    shippingAddress,
                    totalPrice
                })
            );
        }
    };

    // what to render
    let content = null;

    if (cartItems.length === 0) {
        content = (
            <div class="flex flex-col items-center justify-center">
                <p class="text-2xl font-semibold">Your Cart is Empty</p>
                <p class="text-sm text-gray-500">Add some items to it now.</p>
                <Link href="/">back to home</Link>
            </div>
        );
    } else {
        content = cartItems.map((item) => (
            <li class="flex border-b pb-3 mt-4" key={item.product}>
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                        src={item?.image ? item?.image : ''}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        class="h-[100px] w-[100px] object-cover object-center"
                        height={400}
                        width={400}
                    />
                </div>
                <div class="pl-2 ml-2">
                    <p class="font-semibold text-sm text-gray-800">{item.title}</p>
                    <p class="text-gray-400 pt-2">{item.brand}</p>
                    <p class="pt-2">${item.unit_price}</p>
                </div>
                <div>
                    <p class="text-pink-600 font-medium p-2">x{item.quantity}</p>
                </div>
            </li>
        ));
    }

    return (
        <>
            <Head>
                <title>PlaceOrder</title>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Head>

            {/* main container that contain shipping address and Ordered Product Info */}
            <main class="py-6 px-6 font-serif relative mb-8 pb-52">
                {/* Heading */}
                <div class="flex items-start">
                    {/* <!-- back boxicon --> */}
                    <p>
                        <button onClick={backToPrevPage} type="button">
                            <i class="bx bx-arrow-back" />
                        </button>
                    </p>
                    {/* <!-- heading center tailwind with flex --> */}
                    <h1 class="flex-1 text-center">Check Out</h1>
                </div>

                <div class="pt-4 mt-4">
                    <div class="flex items justify-between">
                        <p class="text-lg font-semibold">Shipping Address</p>
                        <Link href="/location">
                            <span class="px-2 py-1 bg-pink-100 rounded-md text-sm text-pink-600">
                                Edit
                            </span>
                        </Link>
                    </div>
                    <div class="mt-1 pt-2 flex">
                        <span class="px-1 py-1 text-pink-600 text-2xl border border-slate-50">
                            <i class="bx bx-map" />
                        </span>
                        <div class="pl-2 ml-2">
                            <p>Md Miraz Hossain</p>
                            <p>+8801641055319</p>
                            <p>{shippingAddress?.address}</p>
                        </div>
                    </div>
                </div>

                <div class="pt-4 mt-4">
                    <div class="flex items justify-between">
                        <p class="text-lg font-semibold">Order Summary</p>
                        <Link href="/cart">
                            <span class="px-2 py-1 bg-pink-100 rounded-md text-sm text-pink-600">
                                Edit
                            </span>
                        </Link>
                    </div>
                    <div class="pt-1">
                        <ul>{content}</ul>
                    </div>
                </div>
                {/* Order Confirmation Button */}
                <div class="fixed bottom-0 left-0 right-0">
                    <div class="border-t border-gray-200 py-6 px-4 sm:px-6 bg-white">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div class="mt-6">
                            <div
                                role="presentation"
                                class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                                onClick={placeOrderHandler}
                            >
                                Confirm Order
                            </div>
                        </div>

                        {error && <Error message={error} />}

                        <div class="mt-4 flex justify-center text-center text-sm text-gray-500 px-1 py-1">
                            <p>
                                or{' '}
                                <button type="button" class="font-medium text-gray-600">
                                    Cancel Order
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
