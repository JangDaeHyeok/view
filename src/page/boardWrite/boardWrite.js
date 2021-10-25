import axios from "axios";
import React, {useEffect, useState, useContext} from 'react'
import {useHistory} from "react-router-dom";

import Title from "../../component/title/index";
import Button from "../../component/button/index";
import * as Common from "../../static/js/common";
import UserInfo from "../../component/userInfo";


function BoardWrite(props) {
    const history = useHistory(); // 컴포넌트간 이동
    const [view, setView] = useState(''); // case: 수정 -> 해당 게시물 저장
    const writeType = props.location.state.type;// 등록 or 수정 분기 저장 (writeType:write / writeType:mod)
    const modBoardIdx = props.location.state.boardIdx; // case: 수정 -> 게시물 idx 저장
    const sessionUser = window.localStorage.getItem('session'); // 현재 session 정보 저장
    const sessionUserId = window.localStorage.getItem('userId'); // 현재 userId 정보 저장
    const sessionUserNm = window.localStorage.getItem('userNm'); // 현재 userNm 정보 저장

    // case: 수정 -> 해당 게시물 내용 가져오기
    useEffect( () => {
        // axios 섹션 헤더 전달
        axios.defaults.headers.common['X-AUTH-TOKEN'] = sessionUser;

        if(writeType === 'mod') {
            axios({
                method: 'post',
                url: '/board/list/',
                headers: {'Content-Type': 'application/json'},
                data: {
                    viewType: 'detailView',
                    boardIdx: modBoardIdx
                },
            }).then(Response => {
                setView({
                    title:Response.data.one.title,
                    contents:Response.data.one.contents
                });
            }).catch((error) => {
                // 세션 end -> 로그인으로 이동
                const { data } = error.response;
                if(data.message === 'logout') history.push('/login');
                else console.log(data);
            })
        }
    }, [1]);

    // 등록/수정 데이터 저장
    const save = () => {

        // 필수값 체크
        if(!view.title) return Common.validate('제목을 입력해 주세요.');
        if(!view.contents) return Common.validate('내용을 입력해 주세요.');

        // 등록/수정 데이터 분기처리 및 전송
        axios({
            method: writeType === 'write' ? 'post' : 'patch',
            url: writeType === 'write' ? '/board/save/' : '/board/update/',
            headers: {'Content-Type': 'application/json'},
            data: {
                boardIdx: modBoardIdx ?? '',
                title: view.title,
                userId:sessionUserId,
                contents:view.contents,
                boardType: 'free'
            },
        }).then(Response => {
            if(Response.data) goBoardList();
            else alert('에러 발생!!');
        }).catch((error) => {
            // 세션 end -> 로그인으로 이동
            const { data } = error.response;
            if(data.message === 'logout') history.push('/login');
            else console.log(data);
        })
    }

    // 목록으로 이동
    const goBoardList = () => history.push('/board/list');

    return (
        <>
            {/* 로그인 정보 */}
            <UserInfo />

            {/* 타이틀 */}
            <Title titleText='일반게시판 글쓰기'/>

            {/* 게시판 글쓰기 */}
            <section className='comp-board-write'>
                <div className='comp-basic-row'>
                    <div className='tit'>제목</div>
                    <div className='desc'>
                        <input type="text" className='form-basic' title='제목 입력' placeholder='제목을 입력하세요.' defaultValue={view.title} onChange={e => setView(Object.assign(view, {title: e.target.value}))} />
                    </div>
                </div>
                <div className='comp-basic-row'>
                    <div className='tit'>작성자</div>
                    <div className='desc'>
                        <input type="text" className='form-basic' title='작성자 입력' defaultValue={sessionUserNm} readOnly />
                    </div>
                </div>
                <div className='comp-basic-row'>
                    <div className='tit'>내용</div>
                    <div className='desc'>
                        <textarea className='form-basic' rows='8' title='내용 입력' placeholder='내용을 입력하세요.' defaultValue={view.contents} onChange={e => setView(Object.assign(view, {contents:e.target.value}))} />
                    </div>
                </div>
            </section>


            {/* 버튼 */}
            <div className='comp-btn-wrap'>
                <Button type='button' text={writeType === 'write' ? '등록' : '수정'} style='primary' position='center' functions={save} />
                <Button type='button' text='취소' style='default' position='center' functions={goBoardList} />
            </div>
        </>
    );
}

export default BoardWrite;