"use client"

import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form'


type FormValues = {
    email: string,
    password: string
}

export default function SignUpForm() {
    const router = useRouter()
    const formHook = useForm<FormValues>()
    const { register, handleSubmit } = formHook;


    const onSubmit = async (data:FormValues) => {
        const userDto = {
            email: data.email,
            password: data.password
        }

        const res = await fetch("http://localhost:3001/users/signup/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto)
        })

        if (res.ok) {
            const {access_token, refresh_token} = await res.json();
            Cookies.set('jwtToken', access_token);
            Cookies.set('jwtRToken', refresh_token);
            // router.push("/todos/list/")
            alert("user created successfully")
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input id="email" {...register('email')} type="email" placeholder="Email" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <input id="email" {...register('password')} type="password" placeholder="Password" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <button type="submit" className="btn btn-accent my-2">Sign Up</button>
        </form>
    )
}
