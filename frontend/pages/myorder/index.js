import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

// import Navbar from '../../components/Navbar';
import { listMyOrders } from '../../redux/actions/orderActions';

export default function MyOrder() {
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/order');
        } else {
            dispatch(listMyOrders());
        }
    }, [dispatch, userInfo, router]);

    return (
        <>
            <Header />
            <main className="pb-20 overflow-hidden mt-24">
                <div class="bg-white p-8 rounded-md w-full">
                    <div class=" flex items-center justify-between pb-6">
                        <div>
                            <h2 class="text-gray-600 font-semibold">Products Order</h2>
                            <span class="text-xs">All products item</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex bg-gray-50 items-center p-2 rounded-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <input
                                    class="bg-gray-50 outline-none ml-1 block "
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="search..."
                                />
                            </div>
                        </div>
                    </div>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Error message={errorOrders} />
                    ) : (
                        <div>
                            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table class="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Order No
                                                </th>

                                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Created at
                                                </th>

                                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Payment Method
                                                </th>

                                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">
                                                                    {order.id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {order?.order_placed_at?.substring(
                                                                0,
                                                                10
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {order?.payment_method}
                                                        </p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <Link href={`/myorder/${order.id}`}>
                                                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                <span
                                                                    aria-hidden
                                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                />
                                                                <span class="relative">Detail</span>
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
