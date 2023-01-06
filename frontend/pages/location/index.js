import Head from 'next/head';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';
import Error from '../../components/Error';
import { saveShipptingAddress } from '../../redux/actions/cartActions';

export default function LocationView() {
    const [address, setAddress] = useState('');
    const [getLocationError, setGetLocationError] = useState('');
    const city = '';
    const postalCode = '';
    const country = '';

    const dispatch = useDispatch();

    const router = useRouter();

    // auto submit when get location
    const submitHandler = () => {
        // e.preventDefault();

        dispatch(saveShipptingAddress({ address, city, postalCode, country }));
        router.push('/placeorder');
    };

    if (address) {
        setTimeout(() => {
            submitHandler();
        }, 1000);
    }

    const getLocation = () => {
        // get user location with high accuracy
        const success = (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            setAddress(`${latitude}, ${longitude}`);
        };

        const showError = (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setGetLocationError('Please Allow your location for faster delivery.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    setGetLocationError('Location information is unavailable.');
                    break;
                case error.TIMEOUT:
                    setGetLocationError('The request to get user location timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    setGetLocationError('An unknown error occurred.');
                    break;
                default:
                    setGetLocationError('An unknown error occurred.');
            }
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        if (navigator?.geolocation) {
            navigator?.geolocation?.getCurrentPosition(success, showError, options);
        } else {
            console.log('geolocation is not supported');
        }
    };

    return (
        <>
            <Head>
                <title>Location</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
                />
            </Head>

            <main class="overflow-hidden">
                {/* <!-- home section --> */}
                <section class="bg-gradient-to-r from-slate-900 to-black pt-[4.5rem] pr-0 pb-[11.7rem]">
                    <div class="pt-16 gap-y-14 ml-6 mr-6 max-w-screen-lg grid">
                        <div>
                            <h1 class="mb-5 leading-relaxed text-4xl font-serif text-slate-200">
                                Discover <br />
                                Most Suitable <br />
                                Product For You
                            </h1>

                            <p class="mb-[2rem] text-teal-500">
                                We Need Your Location To Find The Best Product For You
                            </p>

                            <form onSubmit={submitHandler}>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <i class="bx bx-map" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search"
                                        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search Address ..."
                                        required
                                        value={address || ''}
                                        onChange={(e) => setAddress(e.target.value)}
                                        disabled
                                    />

                                    {getLocationError && <Error message={getLocationError} />}

                                    <button
                                        type="button"
                                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                                        onClick={getLocation}
                                    >
                                        <i class="bx bx-current-location" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
