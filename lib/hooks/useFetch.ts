import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/nextjs';

function useFetch(url: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        setLoading(true)
        setData(null);
        setError(null);
        axios.get(url)
            .then((res: any) => {
                setLoading(false);
                setData(res.data)
            })
            .catch((err: any) => {
                Sentry.captureException(err);
                setLoading(false)
                setError(err)
            })
    }, [url])

    return {data, loading, error}
}

export default useFetch