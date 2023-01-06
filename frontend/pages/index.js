/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import Header from '../components/Header';
import Loader from '../components/Loader';
import LoadMore from '../components/LoadMore';
import { listProducts } from '../redux/actions/productActions';

export default function Home() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, pages, page } = productList;

    const dispatch = useDispatch();

    const router = useRouter();

    if (!shippingAddress?.address) {
        router.push(`/location`);
    }

    const keyword = router.isReady ? router.asPath.toString() : '';

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    // decide what to render
    let content = null;

    if (loading) {
        content = <Loader />;
    }

    if (!loading && error) {
        content = <Error message={error} />;
    }

    if (!loading && !error && products?.length > 0) {
        content = (
            <>
                {products.map((product) => (
                    <li
                        class="relative flex flex-col rounded-lg p-[.75rem] bg-white shadow-sm shadow-lime-400"
                        key={product.id}
                    >
                        <Link href={`/product/${product.id}`}>
                            <Image
                                src={product.image ? product.image : ''}
                                alt="Product Title"
                                class="self-center mb-4 object-cover"
                                height={110}
                                width={100}
                            />
                        </Link>
                        <Link href={`/product/${product.id}`}>
                            <h3 class="font-medium text-md text-gray-800">{product.title}</h3>
                        </Link>
                        <span class="mb-2 text-sm">{product.brand}</span>
                        <span class="text-sm font-medium text-gray-800">${product.unit_price}</span>
                        <a
                            href="#"
                            class="inline-block text-white bg-[#069C54] p-[.75rem 1rem] transition duration-300 hover:bg-green-700 absolute bottom-0 right-0 flex p-3 rounded-br-lg rounded-tl-lg"
                        >
                            <i class="bx bx-cart-alt" />
                        </a>
                    </li>
                ))}
            </>
        );
    }

    return (
        <>
            <Header />

            {/* banner */}
            {!router.query.keyword && (
                <div class="my-[30px] mx-0 pt-16">
                    <div class="py-0 px-[15px]">
                        <div class="flex items-center gap-[10px] rounded overflow-y-hidden overflow-x-auto snap-proximity snap-x overscroll-x-contain pb-[5px]">
                            <div class="relative min-w-full max-h-[350px] aspect-square rounded-md overflow-hidden snap-start">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                    alt="Earphone"
                                    class="w-full h-full object-cover object-right"
                                    width={400}
                                    height={400}
                                />

                                <div class="bg-green-50 absolute bottom-[25px] left-[25px] right-[25px] py-[20px] px-[25px] rounded-md">
                                    <p class="text-[#ff8f9c] text-xl font-medium uppercase font-sans mb-2.5 tracking-normal">
                                        Trending item
                                    </p>

                                    <h2 class="text-[#212121] text-[1.1rem] uppercase mb-2.5 leading-none">
                                        Women&apos;s latest fashion sale
                                    </h2>

                                    <p class="none">
                                        starting at &dollar; <b>20</b>.00
                                    </p>

                                    <a
                                        href="#"
                                        class="bg-[#ff8f9c] text-white w-max text-[.625rem] font-semibold uppercase py-[4px] px-2.5 rounded-sm transition duration-300 hover:bg-pink-700"
                                    >
                                        Shop now
                                    </a>
                                </div>
                            </div>

                            <div class="relative min-w-full max-h-[350px] aspect-square rounded-md overflow-hidden snap-start">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                    alt="Earphone"
                                    class="w-full h-full object-cover object-right"
                                    width={400}
                                    height={400}
                                />

                                <div class="bg-green-50 absolute bottom-[25px] left-[25px] right-[25px] py-[20px] px-[25px] rounded-md">
                                    <p class="text-[#ff8f9c] text-xl font-medium uppercase font-sans mb-2.5 tracking-normal">
                                        Trending item
                                    </p>

                                    <h2 class="text-[#212121] text-[1.1rem] uppercase mb-2.5 leading-none">
                                        Women&apos;s latest fashion sale
                                    </h2>

                                    <p class="none">
                                        starting at $<b>20</b>.00
                                    </p>

                                    <a
                                        href="#"
                                        class="bg-[#ff8f9c] text-white w-max text-[.625rem] font-semibold uppercase py-[4px] px-2.5 rounded-sm transition duration-300 hover:bg-pink-700"
                                    >
                                        Shop now
                                    </a>
                                </div>
                            </div>

                            <div class="relative min-w-full max-h-[350px] aspect-square rounded-md overflow-hidden snap-start">
                                <Image
                                    src="https://images.unsplash.com/photo-1505740106531-4243f3831c78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                    alt="Earphone"
                                    class="w-full h-full object-cover object-right"
                                    width={400}
                                    height={400}
                                />

                                <div class="bg-green-50 absolute bottom-[25px] left-[25px] right-[25px] py-[20px] px-[25px] rounded-md">
                                    <p class="text-[#ff8f9c] text-xl font-medium uppercase font-sans mb-2.5 tracking-normal">
                                        Trending item
                                    </p>

                                    <h2 class="text-[#212121] text-[1.1rem] uppercase mb-2.5 leading-none">
                                        Women&apos;s latest fashion sale
                                    </h2>

                                    <p class="none">
                                        starting at &dollar; <b>20</b>.00
                                    </p>

                                    <a
                                        href="#"
                                        class="bg-[#ff8f9c] text-white w-max text-[.625rem] font-semibold uppercase py-[4px] px-2.5 rounded-sm transition duration-300 hover:bg-pink-700"
                                    >
                                        Shop now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* main container that contain product list */}
            <main class="pb-20 overflow-hidden">
                <section
                    class="max-w-[960px] w-[calc(100%-2rem)] ml-[1rem] mr-[1rem] pt-[4.5rem] pr-0 pb-4"
                    id="menu"
                >
                    <span class="block text-green-600 mb-2 font-medium text-center">Special</span>
                    <h2 class="text-2xl text-gray-700 mb-6 text-center">Menu of the week</h2>
                    <ul class="grid gap-6 justify-center grid-cols-2">{content}</ul>
                </section>

                <LoadMore pages={pages} page={page} />
            </main>

            {/* footer  need To Customize Later */}
            <footer class="p-4 bg-white sm:p-6 pb-20 mb-10">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" class="flex items-center">
                            <Image
                                src="https://flowbite.com/docs/images/logo.svg"
                                class="mr-3 h-8"
                                alt="FlowBite Logo"
                                height={32}
                                width={32}
                            />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap">
                                chapterclose
                            </span>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Resources
                            </h2>
                            <ul class="text-gray-600">
                                <li class="mb-4">
                                    <a href="https://flowbite.com/" class="hover:underline">
                                        Flowbite
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" class="hover:underline">
                                        Tailwind CSS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Follow us
                            </h2>
                            <ul class="text-gray-600">
                                <li class="mb-4">
                                    <a
                                        href="https://github.com/themesberg/flowbite"
                                        class="hover:underline"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                Legal
                            </h2>
                            <ul class="text-gray-600 dark:text-gray-400">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023
                        <a href="https://flowbite.com/" class="hover:underline">
                            chapterclose™
                        </a>
                        . All Rights Reserved.
                    </span>
                    <p>Miraz Hossain Foundation</p>
                    <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">Facebook page</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">Instagram page</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                            <span class="sr-only">Twitter page</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">GitHub account</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">Dribbbel account</span>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
