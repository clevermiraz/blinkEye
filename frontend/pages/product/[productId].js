/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SingleProduct from '../../components/SingleProduct';
import NavLogo from '../../public/icons/nike-logo.svg';
import ShoppingBagIcon from '../../public/icons/shopping-bag.svg';

export default function ProductDetail() {
    const router = useRouter();

    const backToPrevPage = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>Product Detail</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Head>
            {/* Header Or Navbar */}
            <header class="w-full fixed top-0 left-0 z-[100] bg-white">
                <nav class="flex justify-between items-center h-[3.5rem] xl:ml-auto xl:mr-auto">
                    <button
                        type="button"
                        class="pl-6 text-xl"
                        id="nav-toggle"
                        onClick={backToPrevPage}
                    >
                        <i class="bx bx-arrow-back" />
                    </button>

                    <div>
                        <a class="nav__logo">
                            <Image src={NavLogo} alt="Nike Logo" />
                        </a>
                    </div>

                    <div class="pr-6">
                        <Image src={ShoppingBagIcon} alt="shopping-bag" />
                    </div>
                </nav>
            </header>

            {/* main container that contain prouduct Detail */}
            <main class="ml-4 mr-4 pt-16 mt-28 max-w-7xl">
                <section class="w-11/2 md:4/5 h-screen m-auto flex items-center">
                    <SingleProduct />
                </section>
            </main>
        </>
    );
}
