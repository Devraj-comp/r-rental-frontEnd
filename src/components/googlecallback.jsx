import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code'); // Extract the authorization code from the URL

        if (authCode) {
            // Send authCode to the backend to exchange for tokens and create user
            fetch('http://localhost:8000/user/api/v1/auth/google-login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: authCode }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.access && data.refresh) {
                        // Save tokens, redirect, or handle login success
                        console.log('Login successful', data);
                        navigate('/dashboard'); // Example redirection after login
                    } else {
                        console.error('Login failed', data);
                    }
                })
                .catch((error) => {
                    console.error('Error during login:', error);
                });
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
