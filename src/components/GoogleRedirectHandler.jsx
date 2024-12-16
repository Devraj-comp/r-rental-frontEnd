import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RedirectGoogleAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log('RedirectHandler mounted successfully');

        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('access_token');
        console.log('QueryParams:', window.location.search);

        if(accessToken){
            console.log("Accesstoken found: ", accessToken);
            localStorage.setItem('google_access_token', accessToken);

            // verifty token from backend
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            axios.get('http://localhost:8000/api/auth/user')
                .then(response => {
                    console.log('user data: ', response.data)
                    navigate('/')
                })
                .catch(error => {
                    console.error('Error verifying token: ', error.response ? error.response.data:error.message)
                    navigate('/login');
                });
        }else{
            console.log('No token found in URL');
            navigate('/login');
        }
    },[navigate])
};

export default RedirectGoogleAuth;