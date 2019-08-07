import React from "react";
import _ from 'lodash';
import PaginationTable from "../../src/component/table/PaginationTable";

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
        },
        {
            Header: "Visits",
            accessor: "visits",
            aggregate: vals => _.sum(vals)
        }
    ]
}

function getData() {
    return [
        {
            "firstName": "engineering",
            "lastName": "tendency",
            "age": 7,
            "visits": 26,
            "progress": 74,
            "status": "complicated",
            "children": [
                {
                    "firstName": "attack",
                    "lastName": "milk",
                    "age": 28,
                    "visits": 18,
                    "progress": 56,
                    "status": "complicated"
                },
                {
                    "firstName": "clover",
                    "lastName": "low",
                    "age": 28,
                    "visits": 35,
                    "progress": 91,
                    "status": "complicated"
                },
                {
                    "firstName": "guidance",
                    "lastName": "crime",
                    "age": 3,
                    "visits": 64,
                    "progress": 28,
                    "status": "single"
                },
                {
                    "firstName": "quality",
                    "lastName": "rate",
                    "age": 10,
                    "visits": 72,
                    "progress": 67,
                    "status": "complicated"
                },
                {
                    "firstName": "speech",
                    "lastName": "ornament",
                    "age": 3,
                    "visits": 10,
                    "progress": 86,
                    "status": "relationship"
                },
                {
                    "firstName": "skill",
                    "lastName": "initiative",
                    "age": 19,
                    "visits": 81,
                    "progress": 57,
                    "status": "relationship"
                },
                {
                    "firstName": "creature",
                    "lastName": "ball",
                    "age": 25,
                    "visits": 86,
                    "progress": 94,
                    "status": "relationship"
                },
                {
                    "firstName": "friend",
                    "lastName": "harmony",
                    "age": 25,
                    "visits": 13,
                    "progress": 10,
                    "status": "relationship"
                },
                {
                    "firstName": "driver",
                    "lastName": "rings",
                    "age": 0,
                    "visits": 81,
                    "progress": 90,
                    "status": "complicated"
                },
                {
                    "firstName": "investment",
                    "lastName": "opinion",
                    "age": 5,
                    "visits": 67,
                    "progress": 21,
                    "status": "single"
                }
            ]
        },
        {
            "firstName": "engineering",
            "lastName": "lake",
            "age": 13,
            "visits": 66,
            "progress": 90,
            "status": "single",
            "children": [
                {
                    "firstName": "database",
                    "lastName": "lake",
                    "age": 22,
                    "visits": 76,
                    "progress": 80,
                    "status": "relationship"
                },
                {
                    "firstName": "owner",
                    "lastName": "agreement",
                    "age": 5,
                    "visits": 2,
                    "progress": 55,
                    "status": "single"
                },
                {
                    "firstName": "bucket",
                    "lastName": "appointment",
                    "age": 23,
                    "visits": 49,
                    "progress": 83,
                    "status": "complicated"
                },
                {
                    "firstName": "pocket",
                    "lastName": "war",
                    "age": 29,
                    "visits": 82,
                    "progress": 44,
                    "status": "complicated"
                },
                {
                    "firstName": "rhythm",
                    "lastName": "cloud",
                    "age": 19,
                    "visits": 59,
                    "progress": 28,
                    "status": "complicated"
                },
                {
                    "firstName": "literature",
                    "lastName": "elevator",
                    "age": 16,
                    "visits": 92,
                    "progress": 56,
                    "status": "single"
                },
                {
                    "firstName": "ant",
                    "lastName": "hen",
                    "age": 0,
                    "visits": 64,
                    "progress": 6,
                    "status": "complicated"
                },
                {
                    "firstName": "sleep",
                    "lastName": "books",
                    "age": 18,
                    "visits": 22,
                    "progress": 23,
                    "status": "complicated"
                },
                {
                    "firstName": "house",
                    "lastName": "effort",
                    "age": 27,
                    "visits": 84,
                    "progress": 97,
                    "status": "single"
                },
                {
                    "firstName": "bomb",
                    "lastName": "engine",
                    "age": 29,
                    "visits": 83,
                    "progress": 19,
                    "status": "single"
                }
            ]
        },
        {
            "firstName": "woman",
            "lastName": "lake",
            "age": 5,
            "visits": 30,
            "progress": 34,
            "status": "complicated",
            "children": [
                {
                    "firstName": "flight",
                    "lastName": "priority",
                    "age": 1,
                    "visits": 45,
                    "progress": 59,
                    "status": "complicated"
                },
                {
                    "firstName": "wish",
                    "lastName": "ocean",
                    "age": 25,
                    "visits": 93,
                    "progress": 8,
                    "status": "single"
                },
                {
                    "firstName": "language",
                    "lastName": "studio",
                    "age": 12,
                    "visits": 52,
                    "progress": 19,
                    "status": "relationship"
                },
                {
                    "firstName": "girlfriend",
                    "lastName": "chairs",
                    "age": 9,
                    "visits": 51,
                    "progress": 60,
                    "status": "relationship"
                },
                {
                    "firstName": "sand",
                    "lastName": "print",
                    "age": 4,
                    "visits": 27,
                    "progress": 33,
                    "status": "relationship"
                },
                {
                    "firstName": "setting",
                    "lastName": "riddle",
                    "age": 23,
                    "visits": 99,
                    "progress": 69,
                    "status": "complicated"
                },
                {
                    "firstName": "flock",
                    "lastName": "account",
                    "age": 22,
                    "visits": 9,
                    "progress": 2,
                    "status": "complicated"
                },
                {
                    "firstName": "strategy",
                    "lastName": "start",
                    "age": 2,
                    "visits": 66,
                    "progress": 21,
                    "status": "complicated"
                },
                {
                    "firstName": "place",
                    "lastName": "introduction",
                    "age": 28,
                    "visits": 33,
                    "progress": 61,
                    "status": "complicated"
                },
                {
                    "firstName": "television",
                    "lastName": "rat",
                    "age": 27,
                    "visits": 37,
                    "progress": 72,
                    "status": "complicated"
                }
            ]
        },
        {
            "firstName": "bells",
            "lastName": "lab",
            "age": 18,
            "visits": 50,
            "progress": 52,
            "status": "relationship",
            "children": [
                {
                    "firstName": "seashore",
                    "lastName": "kettle",
                    "age": 18,
                    "visits": 98,
                    "progress": 84,
                    "status": "single"
                },
                {
                    "firstName": "pets",
                    "lastName": "screw",
                    "age": 0,
                    "visits": 52,
                    "progress": 55,
                    "status": "complicated"
                },
                {
                    "firstName": "sector",
                    "lastName": "boat",
                    "age": 17,
                    "visits": 78,
                    "progress": 17,
                    "status": "relationship"
                },
                {
                    "firstName": "investment",
                    "lastName": "soda",
                    "age": 13,
                    "visits": 43,
                    "progress": 1,
                    "status": "relationship"
                },
                {
                    "firstName": "songs",
                    "lastName": "internet",
                    "age": 19,
                    "visits": 25,
                    "progress": 72,
                    "status": "single"
                },
                {
                    "firstName": "finger",
                    "lastName": "pan",
                    "age": 24,
                    "visits": 25,
                    "progress": 14,
                    "status": "single"
                },
                {
                    "firstName": "degree",
                    "lastName": "editor",
                    "age": 7,
                    "visits": 2,
                    "progress": 5,
                    "status": "relationship"
                },
                {
                    "firstName": "judge",
                    "lastName": "spiders",
                    "age": 20,
                    "visits": 39,
                    "progress": 55,
                    "status": "complicated"
                },
                {
                    "firstName": "mass",
                    "lastName": "cushion",
                    "age": 4,
                    "visits": 67,
                    "progress": 39,
                    "status": "complicated"
                },
                {
                    "firstName": "knot",
                    "lastName": "crib",
                    "age": 26,
                    "visits": 2,
                    "progress": 19,
                    "status": "single"
                }
            ]
        },
        {
            "firstName": "preference",
            "lastName": "depth",
            "age": 10,
            "visits": 61,
            "progress": 5,
            "status": "single",
            "children": [
                {
                    "firstName": "cars",
                    "lastName": "pest",
                    "age": 0,
                    "visits": 42,
                    "progress": 6,
                    "status": "complicated"
                },
                {
                    "firstName": "republic",
                    "lastName": "part",
                    "age": 19,
                    "visits": 47,
                    "progress": 6,
                    "status": "relationship"
                },
                {
                    "firstName": "weather",
                    "lastName": "cracker",
                    "age": 4,
                    "visits": 31,
                    "progress": 13,
                    "status": "relationship"
                },
                {
                    "firstName": "hydrant",
                    "lastName": "election",
                    "age": 16,
                    "visits": 27,
                    "progress": 26,
                    "status": "complicated"
                },
                {
                    "firstName": "estate",
                    "lastName": "leg",
                    "age": 26,
                    "visits": 22,
                    "progress": 61,
                    "status": "relationship"
                },
                {
                    "firstName": "technology",
                    "lastName": "robin",
                    "age": 25,
                    "visits": 32,
                    "progress": 41,
                    "status": "relationship"
                },
                {
                    "firstName": "membership",
                    "lastName": "hook",
                    "age": 2,
                    "visits": 97,
                    "progress": 44,
                    "status": "single"
                },
                {
                    "firstName": "children",
                    "lastName": "inflation",
                    "age": 21,
                    "visits": 4,
                    "progress": 98,
                    "status": "relationship"
                },
                {
                    "firstName": "corn",
                    "lastName": "inspection",
                    "age": 20,
                    "visits": 25,
                    "progress": 31,
                    "status": "relationship"
                },
                {
                    "firstName": "cent",
                    "lastName": "bun",
                    "age": 12,
                    "visits": 17,
                    "progress": 13,
                    "status": "relationship"
                }
            ]
        },
    ]
}
class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            data: getData(),
            columns: getColumns(),
            totalNumber:4,
            pivotBy:["firstName", "lastName"],
            showSelected:false,
        };
    }
    render() {
        const {
            data,
            columns,
            totalNumber,
            pivotBy,
            showSelected
        } = this.state;

        const extraProps = {
            totalNumber,
            pivotBy,
            showSelected
        };

        return (
            <div>
                <PaginationTable
                    data={data}
                    columns={columns}
                    {...extraProps}
                />
            </div>
        );
    }
}

export default Example

