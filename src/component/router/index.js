import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from '../../page/login/login';
import Join from '../../page/join/join';
import BoardList from '../../page/boardList/boardList';
import BoardWrite from '../../page/boardWrite/boardWrite';
import BoardView from '../../page/boardView/boardView';
import Test from "../../test";


/* router: url과 component 세팅 */
function Routers() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={['/', '/login']} exact component={Login} />
                    <Route path='/join' exact component={Join} />
                    <Route path='/board/list' exact component={BoardList} />
                    <Route path='/board/write' exact  component={BoardWrite} />
                    <Route path='/board/view' exact  component={BoardView} />
                    <Route path='/test' exact  component={Test} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Routers;