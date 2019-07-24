import React from "react";
import shortid from "shortid";

import ReactTable from "react-table";
import 'react-table/react-table.css'
import namor from 'namor';

import selectTableHOC from "react-table/lib/hoc/selectTable";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import CommonTable from  "../../src/component/table/CommonTable";

const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33 ? "complicated" : "single"
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(10).map(newPerson)
        };
    });
}



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

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: makeData(),
            columns: getColumns(),
            totalNumber:5553,
            showPagination:false
        };
    }

    render() {
        const {
            data,
            columns,
            totalNumber,
            showPagination
        } = this.state;

        const extraProps = {
            totalNumber,
            showPagination
        };
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={20}
                    defaultSorted={[
                        {
                            id: "age",
                            desc: true
                        }
                    ]}
                    {...extraProps}
                />
            </div>
        );
    }
}
export default Test;
