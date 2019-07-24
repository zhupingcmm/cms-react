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

const requestData = (pageIndex,pageSize)=>{
    let data = makeData();
    return new Promise((resolve,reject)=>{
        let end = pageIndex * pageSize;
        let start = end - pageSize;
        let showData = data.slice(start,end);
        setTimeout(()=>resolve(showData),1000)
    })
};

export class DynamicPaginationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData(),
            columns: getColumns(),
            totalNumber:5553,
            showSelected:true,
            dynamic:true,
        };
    }

    componentWillMount() {
        requestData(1,20).then(
            res=>{
                this.setState({data:res})
            }
        );
    }

    handleChangeShowSelected =()=>{
        this.setState({showSelected:!this.state.showSelected})
    };

    handleChangeDynamic =()=>{
        this.setState({dynamic:!this.state.dynamic})
    };

    handleSelectPageSize =()=>{

    };

    onPageChange = (pageIndex) =>{
        console.log(pageIndex);
        requestData(pageIndex,20).then(
            res=>{
                this.setState({data:res})
            }
        );
    };

    render() {
        const {
            onPageChange
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
            dynamic
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
