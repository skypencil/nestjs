"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import refreshTokens from "./refreshFunction";

type FormValues = {
    email: string,
    password: string,
    newPassword: string,
    firstname: string,
    lastname: string
}

export default function ProfileForm({email}: {email: string}) {

    const router = useRouter()
    const formHook = useForm<FormValues>()
    const { register, handleSubmit } = formHook;

    let jwtToken = Cookies.get('jwtToken') || ""
    let jwtRToken = Cookies.get('jwtRToken') || ""

    const onSubmit = async (data:FormValues) => {
        const updateUserDto = {
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            newPassword: data.newPassword
        }

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken) as {exp: 0}
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch("http://localhost:3001/users/update/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updateUserDto)
        })

        if (res.ok) {
            router.refresh()
            router.push("/users/profile/")
            alert("Successfully Changed")
        }

        else {
            const err = await res.json()
            alert(err.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input id="email" {...register('email')} type="email" value={email} className="input input-bordered input-accent w-full max-w-xs my-2" />
                <input id="firstname" {...register('firstname')} type="text" placeholder="Firstname" className="input input-bordered input-accent w-full max-w-xs my-2" />
                <input id="lastname" {...register('lastname')} type="text" placeholder="Lastname" className="input input-bordered input-accent w-full max-w-xs my-2" />
                <input id="password" {...register('password')} type="password" placeholder="Password" className="input input-bordered input-accent w-full max-w-xs my-2" />
                <input id="newPassword" {...register('newPassword')} type="password" placeholder="New Password" className="input input-bordered input-accent w-full max-w-xs my-2" />
                <button className="btn btn-accent my-2">Update</button>
            </form>
        </div>
    )
}