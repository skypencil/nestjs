"use client"
import Cookies from 'js-cookie';

import { cookies } from 'next/headers'

export default async function LogoutHandler() {
    const jwtToken = Cookies.remove('jwtToken')
    return (
        <div>You're Logged Out Please Sign</div>
    )

}