import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function useCookie(cookieName) {
    const [cookie, setCookie] = useState(Cookies.get(cookieName));

    useEffect(() => {
        function handleCookieChange() {
            setCookie(Cookies.get(cookieName));
        }

        window.addEventListener('cookiechange', handleCookieChange);
        return () => {
            window.removeEventListener('cookiechange', handleCookieChange);
        };
    }, [cookieName]);

    return cookie;
}