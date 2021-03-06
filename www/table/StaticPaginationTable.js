import React from "react";
import 'react-table/react-table.css';
import Box from 'grommet/components/Box';
import PaginationTable from "../../src/component/table/PaginationTable";
import CheckBox from 'grommet/components/CheckBox';
import Select from 'grommet/components/Select';
import {makeData} from "./Util";
import Button from 'grommet/components/Button';


function getColumns(){
    return [
        {
            Header: "First Name",
            accessor: "firstName",

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


export class StaticPaginationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData(),
            columns: getColumns(),
            totalNumber:5553,
            showSelected:true,
        };
    }

    handleChangeShowSelected =()=>{
        this.setState({showSelected:!this.state.showSelected})
    };

    toggleSelection = (row) =>{
        console.log(row)
    };

    toggleAll = (selectAll, data)=>{
        console.log(selectAll, data)
    };

    handleOncontextmenu =(e)=>{
        e.preventDefault();
    };

    handleOnmouseup=(oEvent)=>{
        if (!oEvent) oEvent=window.event;
        if (oEvent.button===2) {
            console.log('鼠标右击了')
        }
    };



    render() {
        const {
            onPageChange,
            toggleAll,
            toggleSelection
        } = this;

        //const defaultSorted = this.getDefaultSorted();
        const {
            data,
            columns,
            totalNumber,
            showSelected,
        } = this.state;



        const extraProps = {
            totalNumber,
            showSelected,
            onPageChange,
            toggleAll,
            toggleSelection
        };
        return (
            <Box>
                <Box direction="row">
                    <CheckBox  label = "showSelected" defaultChecked={showSelected} onClick={this.handleChangeShowSelected}/>
                    <Button oncontextmenu={this.handleOncontextmenu} onmouseup={this.handleOnmouseup}/>
                </Box>
                <PaginationTable
                    data={data}
                    columns={columns}
                    {...extraProps}
                />
            </Box>

        );
    }
}
export default StaticPaginationTable;
