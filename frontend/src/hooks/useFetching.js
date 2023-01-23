import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoad(true)
            await callback()
        }
        catch (e) {
            setError(e.message)
        }
        finally {
            setIsLoad(false)
        }
    }
    return [fetching, isLoad, error];

}
