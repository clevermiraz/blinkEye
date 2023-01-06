/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

export default function CartView() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const router = useRouter();
    const dispatch = useDispatch();

    const backToPrevPage = () => {
        router.back();
    };

    // handle change when user change qty
    const increaseQtyHandler = (item) => {
        if (item.quantity >= item.countInStock) {
            return;
        }
        dispatch(addToCart(item.product, item.quantity + 1));
    };

    const decreaseQtyHandler = (item) => {
        if (item.quantity <= 1) {
            return;
        }

        dispatch(addToCart(item.product, item.quantity - 1));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // decide what to render
    let content = null;

    if (cartItems.length === 0) {
        content = (
            <div class="flex flex-col items-center justify-center h-full">
                <h1 class="text-2xl font-bold text-gray-800">Your cart is empty</h1>
                <Link href="/">
                    <button
                        type="button"
                        class="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                        Back to shop
                    </button>
                </Link>
            </div>
        );
    } else {
        content = cartItems.map((item) => (
            <li class="flex py-6" key={item.product}>
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                        src={item?.image ? item?.image : ''}
                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        class="h-full w-full object-cover object-center"
                        height={400}
                        width={400}
                    />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                    <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <a href="#">{item.title}</a>
                            </h3>
                            <p class="ml-4">${item.quantity * item.unit_price}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                        <div class="mt-2">
                            <div class="w-[100px] h-[30px] flex justify-between items-center bg-black text-white p-4 rounded">
                                <button
                                    type="button"
                                    className="cursor-pointer px-1 py-1"
                                    onClick={() => decreaseQtyHandler(item)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    type="button"
                                    className="cursor-pointer px-1 py-1"
                                    onClick={() => increaseQtyHandler(item)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div class="flex">
                            <button
                                type="button"
                                class="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => removeFromCartHandler(item.product)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>

            {/* main container that contain cart view */}
            <main class="py-6 px-6 font-serif relative pb-60 mb-8">
                {/* Header */}
                <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-800">Shopping Cart</h2>
                    <button
                        type="button"
                        class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={backToPrevPage}
                    >
                        <span class="sr-only">Close panel</span>
                        {/* <!-- Heroicon name: outline/x-mark --> */}
                        <svg
                            class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* <!-- Product Cart List --> */}
                <div class="mt-8 pt-4 pb-4">
                    <div class="flow-root">
                        <ul class="-my-6 divide-y divide-gray-200">{content}</ul>
                    </div>
                </div>
                {/* Checkout Button */}
                <div class="fixed bottom-0 left-0 right-0">
                    <div class="border-t border-gray-200 py-6 px-4 sm:px-6 bg-white">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>
                                $
                                {cartItems
                                    .reduce((acc, i) => acc + i.quantity * i.unit_price, 0)
                                    .toFixed(2)}
                            </p>
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div class="mt-6">
                            <Link
                                href="/location"
                                class={`flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${
                                    cartItems.length === 0 && 'pointer-events-none'
                                }`}
                            >
                                Checkout
                            </Link>
                        </div>
                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <Link href="/">
                                or{' '}
                                <button
                                    type="button"
                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
