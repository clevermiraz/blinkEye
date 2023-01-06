import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import orderConfirmation from '../../../public/icons/orderConfirmation.svg';

export default function OrderConfirmationView() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Order Confirmation</title>
            </Head>

            {/* main container that contain static data to Show user Your Order successfully confirm */}
            <main class="py-2 px-6 font-serif relative mb-8">
                <div class="pt-20 px-6 flex">
                    <Image
                        src={orderConfirmation}
                        alt="orderConfirmation"
                        class="w-60 h-60 flex-1 text-center"
                    />
                </div>
                <div class="pt-10">
                    {/* <!-- thank for ordering we deliver your product with in 29minute --> */}
                    <p class="text-center text-2xl font-semibold">Thank you for your order!</p>
                    <p class="mt-2 pt-2 text-center text-lg font-semibold">
                        We&apos;ll deliver your product within 29 minutes.
                    </p>
                </div>

                {/* <!-- continue shopping --> */}
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </button>
                </div>
            </main>
        </>
    );
}
