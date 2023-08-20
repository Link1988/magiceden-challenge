import {  useEffect, useCallback } from 'react';

export default function useDebounce (cb: () => void, deps: any, delay: number = 500) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(cb, deps)

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay])
}
