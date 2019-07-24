import React from "react";
import shortid from "shortid";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import selectTableHOC from "react-table/lib/hoc/selectTable";
import _ from "lodash";
import PaginationComponent from './PaginationComponent';



/**
 * @param data table data
 * @return {*}
 *This method use to generate data
 */
function getData(data) {
    if (data === undefined){return;}
    // we are adding a unique ID to the data for tracking the selected records
    return data.map(item => {
        const _id = shortid.generate();
        return {
            _id,
            ...item
        };
    });
}
const SelectTable = selectTableHOC(ReactTable);

export class PaginationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            showData:null,
            columns: null,
            selection: [],
            selectAll: undefined,
            selectType: "checkbox",
            //this react table default pagination , set disable this pagination and can not open by user , because we have over write this pagination
            showPagination: false,
            defaultPageSize:20,
            //minRows : 2,
            pageSizeOptions:[5, 10, 20, 25, 50, 100],
            currentPage:1,
            loading : false,
            showSelected:true,
            dynamic:false,
            selected:{
                number:0
            }
        };
    }


    getShowData = (data,pageIndex) => {
        let end = pageIndex * this.state.defaultPageSize;
        let start = end -this.state.defaultPageSize;
        return data.slice(start,end);
    };

    componentWillMount() {
        if(this.props.showSelected){
            this.setState({showSelected:this.props.showSelected})
        }
        if(this.props.dynamic){
            this.setState({dynamic:this.props.dynamic})
        }
    }


    componentDidMount() {
        /*
          Make sure the data and columns have value
        */
        let data = getData(this.props.data);
        let columns = this.props.columns;
        let showData = this.getShowData(data,this.state.currentPage);
        this.setState({ data, columns,showData});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        //only for example code
        if(nextProps.showSelected !== this.state.showSelected){
            this.setState({showSelected:nextProps.showSelected})
        }



        if(this.state.showSelected){
            if(this.state.dynamic){
                let showData = getData(nextProps.data);
                this.setState({showData,loading:false});
            }

        }else {
            if(this.state.dynamic){
                let showData = _.cloneDeep(nextProps.data);
                this.setState({showData,loading:false})
            }
        }

    }

    /**
     *
     * @param key the resource unique id
     * @param shift
     * @param row the data of row
     * This method use to single select
     *
     */
    toggleSelection = (key, shift, row) => {

        // start off with the existing state
        let _id = row._id;

        let selection = [];
        if (this.state.selectType === "radio") {

            if (selection.indexOf(_id) < 0) selection.push(_id);
            this.setState({ selection });
        } else {

            selection = [...this.state.selection];
            const keyIndex = selection.indexOf(_id);

            if (keyIndex >= 0) {

                selection = [
                    ...selection.slice(0, keyIndex),
                    ...selection.slice(keyIndex + 1)
                ];
            } else {

                selection.push(_id);
            }
            // update the state
            this.setState({ selection });
        }

         let number = selection.length;

         this.setState({selected:{
                 ...this.state.selected,
                 number
             }});

        if(selection.length === this.getVisibleData().length){
            this.toggleAll();
        }else {
            this.setState({selectAll:false});
            //return origin data to invoker
            let data = {...row};
            //let data = lodash.cloneDeep(row);
            delete data['_id'];
            if(this.props.toggleSelection){
                this.props.toggleSelection(data);
            }
        }
    };

    getVisibleData = ()=>{
        // we need to get at the internals of ReactTable
        const selectTable = this.selectTable;
        if(selectTable !== undefined){
            const wrappedInstance = selectTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort
            const currentRecords = wrappedInstance.getResolvedState().sortedData;


            let page = wrappedInstance.getResolvedState().page;
            let pageSize = wrappedInstance.getResolvedState().pageSize;

            let end = (page+1)*pageSize;
            let start = end - pageSize;

            //the data visible show the page
            return currentRecords.slice(start, end);
        }

        return null;
    };


    toggleAll = () => {

        const selectAll = !this.state.selectAll;
        let selection = [];
        let data =[];

        if(selectAll){
            const visibleData = this.getVisibleData();
            visibleData.map(item => {
                selection.push(item._original._id);
                //delete item._original['_id'];
                data.push(_.cloneDeep(item._original))
            });

            //
            this.setState({selected:{
                    ...this.state.selected,
                    number:data.length
                }
            });

            data.forEach((d)=>{
                return delete d['_id']
            });

        }else {
            //
            this.setState({selected:{
                    ...this.state.selected,
                    number:0
                }
            });

        }


        if(this.props.toggleAll!== undefined){
            this.props.toggleAll(selectAll, data);
        }

        this.setState({selectAll,selection});


    };

    isSelected = key => {
        return this.state.selection.includes(key);
    };

    clearSelected = ()=>{
        const {selectAll} = this.state;
        if(selectAll){
            this.toggleAll();
        }else {
            let selection = [];
            this.setState({selection});
        }
    };


    onPageChange =(pageIndex,action)=>{
        //clear selection and selectedAll when page change
        this.clearSelected();

        switch (action) {
            case 'next':
                pageIndex = ++pageIndex;
                break;
            case 'previous':
                pageIndex = --pageIndex;
                break;
        }

        this.setState({currentPage:pageIndex,loading:true});

        if(!this.state.dynamic){
            let showData = this.getShowData(this.state.data,pageIndex);
            this.setState({showData,loading:false});
        }else {
            if(this.props.onPageChange !==undefined){
                this.props.onPageChange(pageIndex);
            }
        }
    };

    resolveData =(data)=>{
        if(this.props.resolveData!==undefined){
            this.props.resolveData(data);
        }
    };

    getTable = (showSelected, extraProps)=>{
        if(!showSelected){
            return <ReactTable
                manual
                defaultSorted={[
                    {
                        id: "firstName",
                        desc: true
                    }
                ]}
                {...extraProps}
            />
        }

        return <SelectTable
                ref={r => (this.selectTable = r)}
                manual
                defaultSorted={[
                    {
                        id: "firstName",
                        desc: true
                    }
                ]}
                {...extraProps}/>
            };

    render() {
        const {
            toggleSelection,
            toggleAll,
            isSelected,
            onPageChange,
            resolveData
        } = this;

        const {
            showData,
            columns,
            selectAll,
            selectType ,
            showPagination,
            defaultPageSize ,
            pageSizeOptions,
            currentPage,
            loading,
            selected,
            showSelected,
        } = this.state;

        const {
            totalNumber
        }= this.props;

        const extraProps = {
            selectAll,
            isSelected,
            toggleAll,
            toggleSelection,
            selectType,
            data:showData,
            columns,
            //resolveData,
            defaultPageSize,
            pageSizeOptions,
            showPagination,
            loading
        };

        let table = this.getTable(showSelected, extraProps);

        const extraPropsForPagination = {
            onPageChange,
            currentPage,
            totalNumber,
            selectedNumber : selected.number,
            defaultPageSize,
        };


        return (
            <div>
                {showData ? (
                    <div>
                        {table}
                        <PaginationComponent
                            {...extraPropsForPagination}
                        />
                    </div>

                ) : null}
            </div>
        );
    }
}

export default PaginationTable;
