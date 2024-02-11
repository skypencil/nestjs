import ProfileForm from "@/app/components/ProfileForm";
import { cookies } from 'next/headers'


const getUserProfileData = async () => {

    const cookieStore = cookies()

    const jwtToken = cookieStore.get('jwtToken')?.value 
    const res = await fetch("http://localhost:3001/users/profile/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        })

        if (res.ok) {
            const data = await res.json()
            return data
        }

        else {
            const err = await res.json()
            return err.message
        }
}


export default async function SignIn() {
    const data = await getUserProfileData()
    return (
        <div>
            <h1>Profile</h1>
            <p>Email: {data.user.email}</p>
            <p>Firstname: {data.user.firstname}</p>
            <p>Lastname: {data.user.lastname}</p>
            <ProfileForm email={data.user.email}/>
        </div>
    )
}