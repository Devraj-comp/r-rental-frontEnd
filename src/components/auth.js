import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';


export const useAuthentication = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem('access_token');
            const googleAccessToken = localStorage.getItem('google_access_token')

            console.log('ACCESS_TOKEN', token);
            console.log('GOOGLE_ACCESS_TOKEN', googleAccessToken);

            if (token){
                const decoded = jwtDecode(token);
                const tokenExpiration = decoded.exp;
                const now = Date.now() / 1000;

                if (tokenExpiration < now){
                    await refreshToken();
                } else{
                    setIsAuthorized(true);
                }
            } else if (googleAccessToken) {
                const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
                console.log("Google token is valid", isGoogleTokenValid);
                if (isGoogleTokenValid){
                    setIsAuthorized(true);
                } else{
                    setIsAuthorized(false);
                }
            }else{
                setIsAuthorized(false);
            }
        };
        auth().catch(() => setIsAuthorized(false));
    },[]);
    const refreshToken = async() => {
        const refreshToken =localStorage.getItem('refresh_token');
        try{
            const res = await fetch('http://localhost:8000/api/token/refresh/',{
                refresh: refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem('refresh_token', res.data.access);
                setIsAuthorized(true);
            } else{
                setIsAuthorized(false);
            }
        }catch(error){
            console.log('Error refreshing token', error);
            setIsAuthorized(false);
        }
    }
    const validateGoogleToken = async(googleAccessToken) => {
        try{
            const google_access_token =  googleAccessToken;
            const res = await fetch('http://localhost:8000/api/google/validate_token',{
                method: 'POST',
                headers: {
                    'Authorization': google_access_token,
                    'Content-Type': 'application/json',
                },

            });
            console.log('validated respponse: ', res.data);
            return res.data.valid;
        }catch(error){
            console.error('Error validating google token', error);
            return false;
        }
    }
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('google_access_token');
    }

    return {isAuthorized, logout};
}

