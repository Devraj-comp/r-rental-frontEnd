import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";


import GOOGLE_ICON from '../assets/google.jpg';

const colors = {
    primary: '#060606',
    background: '#E0E0E0',
    disabled: '#D9D9D9',
};

export const LoginPop = ({ onClose, toggleSignUp }) => {
    const [isLogin, setIsLogin] = useState(true); // True for Login, False for Signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState('renter'); // Default to renter
    const navigate = useNavigate();

    const closeLogin = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleToggleForm = () => {
        setIsLogin(!isLogin); // Toggle between login and signup
        setError(null); // Clear error on toggle
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { username, password };

        try {
            const response = await fetch('http://127.0.0.1:8000/user/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const { access, refresh } = await response.json();
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                const userResponse = await fetch('http://localhost:8000/user/current/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${access}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (userResponse.ok) {
                    const userInfo = await userResponse.json();
                    localStorage.setItem('user', userInfo.username);
                    localStorage.setItem('role', userInfo.role);
                    localStorage.setItem('id', userInfo.id);

                    userInfo.role === 'admin'
                        ? navigate('/admin-dashboard')
                        : navigate('/renter-dashboard');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Invalid credentials");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError("An error occurred. Please try again.");
        }
    };

    const handleGoogleCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
    
        if (code) {
            try {
                const response = await fetch('http://localhost:8000/user/google-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }), // Send the code to the backend
                });
    
                if (response.ok) {
                    const data = await response.json();
    
                    // Save tokens and user info
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);
                    localStorage.setItem('user', JSON.stringify(data.user));
    
                    // Redirect user to the dashboard
                    window.location.href = '/dashboard';
                } else {
                    const error = await response.json();
                    console.error('Google login failed:', error);
                }
            } catch (error) {
                console.error('Error during Google login callback:', error);
            }
        }
    };
    
    const handlegapicallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
    
        if (code) {
            try {
                const response = await fetch('http://localhost:8000/user/api/v1/auth/google/callback/', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                console.log('googleloginapi items: ', response);
                if (response.ok) {
                    const tokens = await response.json();
                    const { access_token, id_token } = tokens;
    
                    // Store tokens in localStorage
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('id_token', id_token);
                    console.log('Google login successful, tokens saved!');
                } else {
                    console.error('Error in callback:', await response.json());
                }
            } catch (error) {
                console.error('Error handling Google callback:', error);
            }
        } else {
            console.error('No authorization code found in URL');
        }
    };

    // useffect
    useEffect(() => {
        handlegapicallback();
    }, []);
    const googleLoginHandle = async (idToken) => {
        try {
            // Manual OAuth flow parameters
            const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
            const CLIENT_ID = '303729315971-09bic4sesir7a73i3013cj0tbvk98kl0.apps.googleusercontent.com';
            const REDIRECT_URI = 'http://localhost:8000/user/api/v1/auth/google/callback/';
    
            const scope = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ].join(' ');
    
            const params = new URLSearchParams({
                response_type: 'code',
                client_id: CLIENT_ID,
                redirect_uri: 'http://localhost:3000',
                prompt: 'select_account',
                access_type: 'offline',
                scope,
            });
    
            // Navigate the user to Google's login page
            window.location = `${GOOGLE_AUTH_URL}?${params.toString()}`;
            handleGoogleCallback();
            

            // trigger googlecallback api
            const googleToken = await fetch('http://localhost:8000/user/api/v1/auth/google/callback/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("the goolge token: ", googleToken);

            // Handle Google Sign-In flow via gapi
            const authInstance = window.gapi.auth2.getAuthInstance();
            const googleUser = await authInstance.signIn();
            const idToken = googleUser.getAuthResponse().id_token;
    
            // Send the ID token to the backend for verification
            const response = await fetch('http://localhost:8000/user/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: idToken }),
            });
            
            if (response.ok) {
                const data = await response.json(); // Parse response only if successful
                console.log('Login successful:', data);
            
                const { access, refresh, user } = data;
                
                console.log('Tokens saved: ', localStorage.getItem('access'));
                // Save tokens and user details in localStorage
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                localStorage.setItem('user', JSON.stringify(user)); // Ensure user is serialized
            } else {
                const errorData = await response.json(); // Parse error response
                console.error('Google login failed:', errorData);
            }
            
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    
    const handlegooglapi = async(idToken) => {
        const response = await fetch('http://localhost:8000/user/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_token: idToken }),
        });
    }

    return (
        <div className="fixed inset-0 bg-black text-white bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center" onClick={closeLogin}>
            <div className="w-1/2 h-3/2 flex items-start">
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
                    <MdCancel />
                </button>
                <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                    <h1 className="text-xl text-[#060606] font-semibold">RIGHT-RENTAL</h1>
                    <div className="w-full flex flex-col max-w-[500px]">
                        <h3 className="text-3xl font-semibold mb-2 text-black">{isLogin ? 'Login' : 'Sign Up'}</h3>
                        <p className="text-base mb-2 text-black">
                            {isLogin ? 'Welcome Back! Please enter your details.' : 'Create your account by filling in the details below.'}
                        </p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!isLogin && (
                                <div className="mt-4">
                                    <p className="text-black">Select User Type</p>
                                    <label className="mr-4">
                                        <input
                                            type="radio"
                                            value="renter"
                                            checked={userRole === 'renter'}
                                            onChange={() => setUserRole('renter')}
                                        />
                                        Renter
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="admin"
                                            checked={userRole === 'admin'}
                                            onChange={() => setUserRole('admin')}
                                        />
                                        Admin
                                    </label>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="w-full text-white bg-[#060606] rounded-md p-4 my-2">
                                {isLogin ? 'Log In' : 'Sign Up'}
                            </button>
                        </form>
                        <div className="w-full flex items-center justify-center relative py-2">
                            <div className="w-full h-[1px] bg-black/40"></div>
                            <p className="text-lg absolute text-black bg-[#f5f5f5]">or</p>
                        </div>
                        <button onClick={googleLoginHandle} className="w-full text-black bg-white border rounded-md p-4 flex items-center justify-center">
                            <img src={GOOGLE_ICON} className="h-6 mr-2" alt="Google" />
                            Sign In with Google
                        </button>
                    </div>
                    <p className="text-sm font-normal text-[#060606]">
                        Don't have an account?{' '}
                        <span onClick={toggleSignUp} className="font-semibold underline cursor-pointer">
                            Sign up for free
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
