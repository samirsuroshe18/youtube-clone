import { useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";

function useCurrentUser() {
    const [data, setData] = useState(null); // Default data state
    const [error, setError] = useState(null); // For error messages
    const [loading, setLoading] = useState(true); // For loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`,
                    { withCredentials: true }
                );
                setData(response.data);
            } catch (err) {
                const errorMessage = handleAxiosError(err);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, loading };
}

export default useCurrentUser;
