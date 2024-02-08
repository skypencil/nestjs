"use client"

import Link from "next/link"
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";


interface DecodedToken {
    exp: number; // Expiration timestamp
    // Add other properties if needed
}

const checkAuthStatus = () => {
    const jwtToken = Cookies.get('jwtToken');
    
    if (!jwtToken) {
        return false; // No token found, user is not authenticated
    }

    try {
        const decodedToken =  jwt.decode(jwtToken) as DecodedToken;
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
            // Token has expired // Remove expired token
            return false; // User is not authenticated
        } else {
            // Token is still valid
            return true; // User is authenticated
        }
    } catch (error) {
        // Token is invalid or couldn't be decoded
        console.error("Invalid JWT token:", error); // Remove invalid token
        return false; // User is not authenticated
    }
};


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        setIsLoggedIn(checkAuthStatus());
    }, []);

    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">TodoList</a>
        </div>
            <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                {
                    isLoggedIn ? 
                        <>
                            <li><Link href="/todos/list/">Todo</Link></li>
                            <li><Link href="/todos/add/">Add</Link></li>
                            <li><Link href="/users/profile">Profile</Link></li>
                            <li><Link href="/users/logout">Logout</Link></li>
                        </>
                        :
                        <>
                            <li><Link href="/users/signup">Sign Up</Link></li>
                            <li><Link href="/users/signin">Sign In</Link></li>
                        </>
                    }   
                </ul>
            </div>
        </div> 
    )
}


export default Navbar
