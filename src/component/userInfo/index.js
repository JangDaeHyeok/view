import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "../button";
import {useHistory} from "react-router-dom";

function UserInfo() {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState('');
    const sessionChk = window.localStorage.getItem('session'); // 저장된 섹션 저장 가져오기

    /* 초기 - 세션값 체크 */
    useEffect(() => {
        axios({
            method: 'post',
            url: '/user/checkSession',
            headers: {'Content-Type': 'application/json', 'X-AUTH-TOKEN': sessionChk},
        }).then(Response => {
            setUserInfo(Response.data.userName);
            window.localStorage.setItem('userId', Response.data.userId);
            window.localStorage.setItem('userNm', Response.data.userName);
        }).catch((error) => {
            history.push('/login');
        });
    }, [sessionChk]);


    /* 로그아웃 */
    const logout = () => {
        axios({
            method: 'post',
            url: '/user/logout',
            headers: {'Content-Type': 'application/json'},
        }).then(Response => {
            history.push('/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <section className='user-info'>
            <div className='text'><strong className='name'>{userInfo}</strong>님 환영합니다.</div>
            <div className='btn'>
                <Button type='button' text='로그아웃' style='info' position='center' functions={logout} />
            </div>
        </section>
    )
}

export default UserInfo;