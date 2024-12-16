import React, {useEffect, useRef} from "react";
import { MdCancel } from "react-icons/md";

export const PopupLogin = ({onClose}) => {
    const loginRef = useRef();

    const closeLogin = (e) => {
        if (loginRef.current === e.target){
            onClose();
        }
    }

    return(
        <div ref={loginRef} onClick={closeLogin} className="fixed inset-0 bg-black text-white bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-white">
                <button onClick={onClose} className="place-self-end"><MdCancel/></button>
                <div className="bg-indigo-400 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-extrabold">Login</h1>
                    <form>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 text-black border-gray-300 rounded-md gap-3 mb-3"
                        />
                         <input
                            type="password"
                            placeholder="Enter your password"
                            required
                             className="w-full px-4 py-3 text-black border-gray-300 rounded-md gap-3 mt-3"
                        />
                    </form>
                    <button className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-black">Log In</button>
                </div>
            </div>
        </div>
    )
}