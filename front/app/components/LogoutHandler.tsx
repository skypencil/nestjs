"use client"
import Cookies from 'js-cookie';

export default function LogoutHandler() {
    Cookies.remove('jwtToken')
    Cookies.remove('jwtRToken')
    return (
        <div>You are Logged Out Please Sign</div>
    )

}