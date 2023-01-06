import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LoadMore({ pages }) {
    const [totalPages, setTotalPages] = useState(Number(pages));
    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter();
    const keyword = router.query.keyword ? router.query.keyword : '';

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
        if (keyword) {
            router.push(`/?keyword=${keyword}&page=${currentPage + 1}`);
        } else {
            router.push(`/?page=${currentPage + 1}`);
        }
    };

    useEffect(() => {
        if (pages) {
            setTotalPages(Number(pages));
        }
        if (router.asPath === '/') {
            setCurrentPage(1);
        }
    }, [pages, router.asPath]);

    // console.log('totalPages', totalPages);
    // console.log('currentPage', currentPage);

    return (
        <div>
            {currentPage < totalPages && (
                <div class="flex px-16 py-4">
                    <button
                        type="button"
                        class="justify-center text-center flex-1 px-4 py-4 mt-4 text-white bg-gradient-to-r from-slate-500 to-black hover:to-slate-600"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
