/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store, wrapper } from '../redux/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div>
            {domLoaded && (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            )}
        </div>
    );
}

export default wrapper.withRedux(MyApp);
