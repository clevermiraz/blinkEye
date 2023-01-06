/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Error from '../../components/Error';
import Header from '../../components/Header';
// import Navbar from '../../components/Navbar';
import { getOrderDetails } from '../../redux/actions/orderActions';

export default function MySingleOrder() {
    const router = useRouter();
    const { orderId } = router.query;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.totalPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    useEffect(() => {
        if (!userInfo) {
            router.push('/login');
        }

        if (!order || order.id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, router, order, orderId, userInfo]);

    return (
        <>
            <Header />

            {error && <Error message={error} />}
            <main className="pb-20 overflow-hidden">
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col ">
                        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                            Order {order && order.id}
                        </h1>
                        <p className="text-base font-medium leading-6 text-gray-600">
                            {/* {order.order_placed_at} at 10:34 PM */} 10pm
                        </p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                    Your Order
                                </p>
                                {order?.orderItems?.length === 0 ? (
                                    <Error message="Your order is empty" />
                                ) : (
                                    <div>
                                        {order?.orderItems?.map((item, index) => (
                                            <div
                                                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                                                key={index}
                                            >
                                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                                    <Image
                                                        src={
                                                            item?.product?.image
                                                                ? item?.product?.image
                                                                : ''
                                                        }
                                                        alt={item.product?.title}
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>
                                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                                            {item?.product?.title}
                                                        </h3>
                                                    </div>
                                                    <div className="flex justify-between space-x-8 items-start w-full">
                                                        <p className="text-base xl:text-lg leading-6">
                                                            ${item.unit_price}{' '}
                                                        </p>
                                                        <p className="text-base xl:text-lg leading-6 text-gray-800">
                                                            {item.quantity}
                                                        </p>
                                                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                                            $
                                                            {(
                                                                item.quantity * item.unit_price
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                        Summary
                                    </h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between  w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Subtotal
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">
                                                ${order?.total_price}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Discount{' '}
                                                <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                                                    STUDENT
                                                </span>
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">-$0</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Shipping
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">
                                                $0.00
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base font-semibold leading-4 text-gray-800">
                                            Total
                                        </p>
                                        <p className="text-base font-semibold leading-4 text-gray-600">
                                            ${order?.total_price}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                                        Shipping Address
                                    </p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                        {order?.shippingAddress?.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
