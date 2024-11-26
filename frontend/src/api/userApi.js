import axiosInstance from "./axiosConfig";

// Overriding all properties in a POST request
const registerUser = async () => {
    try {
        const response = await axiosInstance.post(
            '/register', // Endpoint
            {
                // Payload for the POST request
                userName: "user",
                email: 'user@example.com',
                password: 'securePassword',
            },
            {
                headers: {
                    // Override headers
                    'Authorization': 'Bearer OVERRIDDEN_TOKEN', // New token
                    'X-Custom-Header': 'CustomValue',
                },
                withCredentials: true, // Enable credentials
                timeout: 10000, // Increase timeout
            }
        );

        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
};

const loginUser = async (email, password, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await axiosInstance.post(
            '/login', // Endpoint
            {
                // Payload for the POST request
                email,
                password,
            },
            {
                headers: {
                    'Authorization': 'Bearer OVERRIDDEN_TOKEN', // New token
                },
                withCredentials: true,
            }
        );

        console.log('Response:', response.data);
        return response.data; // Success response
    } catch (error) {
        setLoading(false);

        // Set the error message from the response or a fallback
        setError(error.response?.data?.message || error.message);

        console.error('Error:', error.response?.data || error.message);
        throw error; // Re-throw to propagate if needed
    }
};


// Upload file
const uploadFile = async (file, metadata) => {
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('file', file); // Add the file
        formData.append('title', metadata.title); // Add additional metadata
        formData.append('description', metadata.description); // Add more metadata if needed

        // Make POST request
        const response = await axiosInstance.post('/upload', formData, {
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with your token
                // 'Content-Type' is automatically set by Axios for FormData
            },
            withCredentials: true, // Optional if your API requires cookies
        });

        console.log('File Upload Successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('File Upload Error:', error.response?.data || error.message);
        throw error;
    }
};

// Example usage
(async () => {
    const file = new File(['content'], 'example.txt', { type: 'text/plain' }); // Example file
    const metadata = {
        title: 'My Example File',
        description: 'This is a description for the example file.',
    };

    try {
        const result = await uploadFile(file, metadata);
        console.log('Server Response:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
})();



// Accessing the Response in catch
// If you want to access the response in the catch block, you can use error.response:

// catch (error) {
//     setLoading(false);

//     // Access status code
//     const statusCode = error.response?.status;

//     // Access response body
//     const errorMessage = error.response?.data?.message || error.message;

//     setError(errorMessage); // Display error to the user
//     console.error(`Error ${statusCode}:`, errorMessage);

//     throw error; // Re-throw if needed
// }
