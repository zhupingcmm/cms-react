import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss'
// import 'bootstrap/dist/css/bootstrap-grid.css';
// import 'bootstrap/dist/css/bootstrap-reboot.css';
import {HashRouter as Router, Route,Link,Redirect,Switch} from 'react-router-dom';
import Table from "./table/Table";
// import "grommet/grommet.min.css";

ReactDOM.render(

    <Router>
        <div>
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">CMS Component example</div>
                    </div>
                    <div className="nav nav-pills" style={{"position":"relative"}}>
                        <li><Link to="/table">Table</Link></li>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <Switch>
                    <Route path="/table" component={Table}/>
                    <Redirect to="/table"/>
                </Switch>
            </div>
        </div>
    </Router>,
    document.getElementById("root")
);
