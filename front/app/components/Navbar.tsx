import Link from "next/link"
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const Navbar = () => {
    const cookieStore = cookies()
    let decodedToken

    const jwtToken = cookieStore.get('jwtToken')?.value
    if (jwtToken !== undefined) {
        decodedToken = jwt.decode(jwtToken)
    }  else {decodedToken = ""}
    

    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">TodoList</a>
        </div>
            <div className="flex-none">
                {
                    !jwtToken || (decodedToken?.exp ?? 0) < Date.now() / 1000 ? 
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href="/users/signup">Sign Up</Link></li>
                            <li><Link href="/users/signin">Sign In</Link></li>
                        </ul>
                        :
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href="/todos/list/">Todo</Link></li>
                            <li><Link href="/todos/add/">Add</Link></li>
                            <li><Link href="/users/logout">Logout</Link></li>
                        </ul>
                    }   
            </div>
        </div> 
    )
}


export default Navbar
