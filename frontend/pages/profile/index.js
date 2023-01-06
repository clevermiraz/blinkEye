/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';

export default function Profile() {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/profile');
        } else if (!user || !user.full_name || user.id !== userInfo.id || success) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            });

            dispatch(getUserDetails('profile'));
        } else {
            setFullName(user.full_name);
            setPhoneNumber(user.customer.phone_number);
            setEmail(user.email);
            setAddress(user.homeAddress.address);
            setCity(user.homeAddress.city);
            setPostalCode(user.homeAddress.postal_code);
            setBirthdate(user.customer.birth_date);
        }
    }, [dispatch, router, user, userInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserProfile({
                id: user.id,
                full_name: fullName,
                phone_number: phoneNumber,
                email,
                address,
                city,
                postal_code: postalCode,
                birth_date: birthdate
            })
        );
    };

    return (
        <div>
            <Header />

            <div className="pb-20 overflow-hidden mt-20">
                <div class="flex items-center justify-center my-10">
                    <h1>Account Information</h1>
                </div>
                <div class="mx-auto flex items-center justify-center">
                    <form class="w-full max-w-lg" onSubmit={submitHandler}>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Full Name
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="name"
                                    type="text"
                                    placeholder="Md Miraz Hossain"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <p class="text-gray-600 text-xs italic">
                                    Write Your Beautiful Name
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-password"
                                >
                                    Phone
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-password"
                                    type="number"
                                    placeholder="01........."
                                    disabled
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <p class="text-gray-600 text-xs italic">
                                    This Your Primary Number Your Can Change It If You Want To
                                    Change It Please Contact with us
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-password"
                                    type="email"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p class="text-gray-600 text-xs italic">
                                    Make it as long and as crazy as you like
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-2">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-city"
                                >
                                    Address
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-city"
                                    type="text"
                                    placeholder="MasterBari"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-city"
                                >
                                    City
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-city"
                                    type="text"
                                    placeholder="Gazipur"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-zip"
                                >
                                    Postal Code
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-zip"
                                    type="text"
                                    placeholder="1740"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            {/* Birthdate Field */}
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="birthdate"
                                >
                                    Birthdate
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="birthdate"
                                    type="date"
                                    placeholder="20/01/2000"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                />
                                <p className="text-gray-600 text-xs italic">Write Your Birthdate</p>
                            </div>
                        </div>

                        {error && <Error message={error} />}

                        <button
                            type="submit"
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
                        >
                            {loading ? <Loader /> : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
