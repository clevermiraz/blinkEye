import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

import { listProductDetails } from '../redux/actions/productActions';
import Error from './Error';
import Loader from './Loader';

/* eslint-disable @next/next/no-img-element */
export default function SingleProduct() {
    const [quantity, setQuantity] = useState(1);

    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;

    const dispatch = useDispatch();

    const router = useRouter();
    const { productId } = router.query;

    useEffect(() => {
        if (router.isReady) {
            dispatch(listProductDetails(productId));
        }
        if (localStorage.getItem('cartItems') && router.isReady) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));

            const items = cartItems.find((item) => item.product === Number(productId));

            if (items !== undefined) {
                setQuantity(items.quantity);
            }
        }
    }, [dispatch, productId, router.isReady]);

    // increase quantity
    const increaseQty = () => {
        if (quantity < product.countInStock) {
            setQuantity((prevQty) => prevQty + 1);
        }
    };

    // decrease quantity
    const decreaseQty = () => {
        if (quantity > 1) {
            setQuantity((prevQty) => prevQty - 1);
        }
    };

    // add to cart handler
    const addToCartHandler = () => {
        if (
            quantity > 0 &&
            quantity <= product.countInStock &&
            product.countInStock > 0 &&
            product.countInStock !== undefined &&
            product.countInStock !== null &&
            productId !== undefined &&
            productId !== null
        ) {
            dispatch(addToCart(productId, quantity));
            router.push('/cart');
        } else {
            console.log(quantity);
        }
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <div class="w-full flex flex-col md:flex-row md:justify-between md:space-x-10 items-center">
                    <div class="relative">
                        <Image
                            src={product?.image ? product?.image : ''}
                            id="image"
                            class="w-full h-full"
                            alt={product.title}
                            width="200"
                            height="240"
                        />
                        <div class="arrows w-full absolute inset-y-1/2 flex justify-between px-3" />
                    </div>
                    <div class="space-y-5 p-5">
                        <h4 class="text-xl font-semibold">{product.brand}</h4>
                        <h1 class="text-3xl font-bold">{product.title}</h1>
                        <h2 class="text-xl font-bold">${product.unit_price}</h2>
                        <p class="text-sm">Description</p>
                        <p class="text-sm">{product.description}</p>
                        <div class="space-y-5">
                            <h3 class="quantity__title">Qty</h3>
                            <div class="w-[100px] h-[30px] flex justify-between items-center bg-black text-white p-2 rounded">
                                <button
                                    type="button"
                                    className="cursor-pointer px-1 py-1"
                                    onClick={decreaseQty}
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    type="button"
                                    className="cursor-pointer px-1 py-1"
                                    onClick={increaseQty}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center space-x-5">
                            <button
                                type="button"
                                class="text-white bg-gradient-to-br from-slate-800 to-black hover:bg-gradient-to-bl focus:outline-none focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={addToCartHandler}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
