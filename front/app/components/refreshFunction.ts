import Cookies from 'js-cookie';

const refreshTokens = async (jwtRTokenf: string) => {
    const res = await fetch(`http://localhost:3001/users/refresh`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtRTokenf}`,
        },
        next: {tags: ['reload']}
    })
    if (res.ok) {
        const {access_token, refresh_token} = await res.json(); 
        Cookies.set('jwtToken', access_token);
        Cookies.set('jwtRToken', refresh_token);
        return access_token
    }
}

export default refreshTokens