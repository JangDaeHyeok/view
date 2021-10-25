import React, {useEffect, useState} from "react";
import axios from "axios";

function Test() {
    const [test, setTest] = useState('');






    useEffect(() => {
        axios({
            method: 'post',
            url: '/board/list/',
            headers: {'Content-Type': 'application/json'},
        }).then(Response => {
            setTest(Response);
        }).catch((Error) => {
            console.log(Error);
        });
    }, [test]);










    const click = () => {

    }

    return(
        <button type='button' onClick={() => {click()}}>보내기</button>
    )

}

export default Test;