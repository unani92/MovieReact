import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import TV from "../routes/TV";
import Search from "../routes/Search";

function Router() {
  return (
    <BrowserRouter>
      <Header/>
      {/* 한 번에 오직 하나의 라우터만 렌더링해줌 */}
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/tv" exact component={TV}/>
        <Route path="/tv/popular" render={() => (<h1>Popular</h1>)}/>
        <Route path="/search" component={Search}/>
        {/* 해당하는 라우트가 없을 경우 홈으로 보내주세요.... */}
        <Redirect from="*" to="/"/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router