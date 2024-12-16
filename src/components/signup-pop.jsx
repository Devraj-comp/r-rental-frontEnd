import React, {useState, useEffect, useRef} from "react";
import { MdCancel } from "react-icons/md";

import GOOGLE_ICON from '../assets/google.jpg';

const colors = {
    primary: '#060606',
    background: '#E0E0E0',
    disabled: '#D9D9D9'
}

export const SignUpPop = ({onClose, toggleLogin}) => {
    const [showSignUp, setShowSignUp] = useState(true)
    const [showLogin, setShowLogin] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('renter');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const loginRef = useRef();

    const closeSignUp = (e) => {
        if (loginRef.current === e.target){
            onClose();
        }
    }
    const handleSignUpClick = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }
    const handleLoginClick = () => {
        setShowSignUp(false);
        setShowLogin(true);
    }
    // handle role
    const handleRoleChange = (e) => {
        setRole(e.target.checked ? "renter" : "admin");
    };
    // handle sign-up
    const handleSubmit = async(e) => {
        e.preventDefault();
        // create payload
        const payload = {
            username: username,
            email: email,
            password: password,
            role: role
        };
        try{
            const response = await fetch('http://127.0.0.1:8000/user/create-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if(response.ok){
                const data = await response.json();
                setMessage("User created successfully!");
            } else{
                const data = await response.json();
                setError(data.errors || "Something went wrong. ");
            }
        } catch(err){
            setError("Error connecting to the server");
        }
    } ; 
    return(
        <div className="fixed inset-0 bg-black text-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="w-1/2 h-3/2 flex items-start">
            <button onClick={onClose} className="absolute top-4 right-4 text-2xl place-self-end"><MdCancel/></button>
                    <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                        <h1 className="text-xl text-[#060606] font-semibold">RIGHT-RENTAL</h1>
                        <div className="w-full flex flex-col max-w-[500px]">
                            <div className="w-full flex flex-col mb-2">
                                <h3 className="text-3xl font-semibold mb-2 text-black">Sign Up</h3>
                                <p className="text-base mb-2 text-black">Welcome Back! Please enter your details.</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="w-full flex flex-col">
                                    <input
                                        type = "text"
                                        placeholder = "Username"
                                        className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}    
                                    />
                                    <input
                                        type = "email"
                                        placeholder = "Email"
                                        className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type = "password1"
                                        placeholder = "Password"
                                        className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {/* <input type = "password2" placeholder = "Enter your Password again" className="w-full text-black py-4 my-4 bg-transparent border-b border-black outline-none focus:outline-none" /> */}
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <div className="w-full flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 mr-2"
                                            checked = {role === 'admin'}
                                            onChange={handleRoleChange}
                                        />
                                        <p className="text-sm text-black">is admin</p>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 mr-2"
                                            checked = {role === 'renter'}
                                            onChange={handleRoleChange}
                                        />
                                        <p className="text-sm text-black">is renter</p>
                                    </div>
                                    <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password</p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer" type="submit">
                                        Sign Up
                                    </button>
                                    {/* <button className="w-full text-black my-2 bg-white border border-black rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer">
                                        Register
                                    </button> */}
                                </div>
                            </form>
                            
                            <div className="w-full flex items-center justify-center relative py-2">
                                <div className="w-full h-[1px] bg-black/40"></div>
                                <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
                            </div>
                            <button className="w-full text-black my-2 bg-white border border-black/40 rounded-md p-4 text-center font-semibold flex items-center justify-center cursor-pointer">
                                <img src={GOOGLE_ICON} className="h-6 mr-2" /> Sign Up with Google
                                </button>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <p className="text-sm font-normal text-[#060606]">Already have an account? <span onClick= {toggleLogin} className="font-semibold underline underline-offset-2 cursor-pointer">Login</span></p>
                            
                        </div>
                </div>
        </div>
        </div>
    )
}