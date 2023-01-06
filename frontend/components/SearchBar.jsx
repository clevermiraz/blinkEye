import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchBar() {
    const [keyword, setKeyword] = useState('');

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword) {
            router.push(`/?keyword=${keyword}&page=1`);
        } else {
            router.push(router.push(router.location.pathname));
        }
        setKeyword('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div class="relative text-gray-600 focus-within:text-gray-400">
                <input
                    type="search"
                    name="q"
                    class="py-2 text-sm text-white bg-gray-100 rounded-md pl-4 focus:outline-none focus:bg-white focus:text-gray-900"
                    placeholder="Search..."
                    autocomplete="off"
                    required
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            class="w-6 h-6"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </span>
            </div>
        </form>
    );
}
