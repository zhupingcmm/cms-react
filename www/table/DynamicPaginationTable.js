import React from "react";
import 'react-table/react-table.css';
import namor from 'namor';
import Box from 'grommet/components/Box';
import PaginationTable from "../../src/component/table/PaginationTable";
import CheckBox from 'grommet/components/CheckBox';
import {makeData} from "./Util";


function getColumns(){
    return [
        {
            Header: "First Name",
            accessor: "firstName"
        },
        {
            Header: "Last Name",
            id: "lastName",
            accessor: d => d.lastName
        },
        {
            Header: "Age",
            accessor: "age"
        }
    ]
}

const requestData = (pageIndex,pageSize,sortId,ascending)=>{
    let data = makeData();
    return new Promise((resolve,reject)=>{
        let end = pageIndex * pageSize;
        let start = end - pageSize;
        if(sortId){
            data.sort((a,b)=>{
                a = a[sortId];
                b = b[sortId];

                a = a === null || a === undefined ? '' : a;
                b = b === null || b === undefined ? '' : b;
                a = typeof a === 'string' ? a.toLocaleLowerCase() : a;
                b = typeof b === 'string' ? b.toLocaleLowerCase() : b;
                if(a > b){
                    return 1
                }
                if(a < b){
                    return -1
                }
                return 0
            });

            if(!ascending) {
                data.reverse();
            }

        }
        let showData = data.slice(start,end);
        setTimeout(()=>resolve(showData),1000)
    })
};



export class DynamicPaginationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            columns: getColumns(),
            totalNumber:5553,
            showSelected:true,
            dynamic:true,
            ascending:true
        };
    }

    componentWillMount() {
        requestData(1,20).then(
            res=>{
                this.setState({data:res})
            }
        );
    }

    onPageChange = (pageIndex) =>{
        console.log(pageIndex);
        requestData(pageIndex,20).then(
            res=>{
                this.setState({data:res})
            }
        );
    };

    onSortedChange = (currentPage, sortId)=>{
        let {ascending} =  this.state;
        requestData(1,20,sortId,ascending).then(
            res=>{
                this.setState({data:res,ascending:!this.state.ascending})
            }
        );

    };

    render() {
        const {
            onPageChange,
            onSortedChange
        } = this;
        const {
            data,
            columns,
            totalNumber,
            showSelected,
            dynamic
        } = this.state;

        const extraProps = {
            totalNumber,
            showSelected,
            onPageChange,
            dynamic,
            onSortedChange
        };
        return (
            <Box>
                <PaginationTable
                    data={data}
                    columns={columns}
                    {...extraProps}
                />
            </Box>

        );
    }
}
export default DynamicPaginationTable;
