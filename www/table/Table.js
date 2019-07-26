import React,{Component} from "react";
import {Route,Link} from 'react-router-dom';
import StaticPaginationTable from './StaticPaginationTable';
import DynamicPaginationTable from './DynamicPaginationTable';
import 'bootstrap/dist/css/bootstrap.css'

class Table extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container-fluid">
                    <div className="nav nav-stacked col-lg-1">
                        <li><Link to="/table/static">StaticPaginationTable</Link></li>
                        <li><Link to="/table/dynamic">DynamicPaginationTable</Link></li>
                    </div>
                <div className="col-lg-offset-2">
                    <Route path="/table/static" component={StaticPaginationTable}/>
                    <Route path="/table/dynamic" component={DynamicPaginationTable}/>
                </div>
            </div>
        );
    }

}

export default Table
