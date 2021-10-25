import React, {createContext, useEffect, useState} from "react";
import Routers from "../component/router";
import axios from "axios";

function Layout() {

    const UserContext = createContext('');
    const [session, setSession] = useState();

    useEffect(() => {
        axios({
            method: 'post',
            url: '/user/checkSession',
            headers: {'Content-Type': 'application/json', 'X-AUTH-TOKEN': session},
        }).then(Response => {

            console.log(Response)
        }).catch((error) => {
        });
    }, [1]);

    return (
        <>
            <UserContext.Provider value={session}>
                {/* 라우터 - url, 컴포넌트 세팅 */}
                <Routers/>
            </UserContext.Provider>
        </>
    )
}

export default Layout;