import React, {useEffect, useState} from "react";
import Button from "../button";

function Search(props) {
    const option = props.selOption;


    useEffect(() => {
        for (const key in option) {
        }
    },[1])

    return (
        <section className='comp-search'>
            <div className='box'>
                <div className='item sel'>
                    <select className='form-basic'>
                        {
                          /*  selValue && selValue.map((item, index) => {
                                <option value={item} key={index}></option>
                            })*/
                        }
                    </select>
                </div>

                <div className='item inp'>
                    <input type="text" className='form-basic' placeholder='검색어를 입력하세요.' title='검색어 입력' />
                </div>
                <div className='item btn'>
                    <Button type='button' text='검색' style='info' position='center' />
                </div>
            </div>
        </section>
    )
}

export default Search;