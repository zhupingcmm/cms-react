import React from "react";
import shortid from "shortid";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import selectTableHOC from "react-table/lib/hoc/selectTable";
import PaginationComponent from '../../../lib/component/table/PaginationComponent';
import _ from "lodash"


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

export class CommonTable extends React.Component {
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
            defaultPageSize:10,
            //minRows : 2,
            pageSizeOptions:[5, 10, 20, 25, 50, 100],
            currentPage:1,
            loading : false,
            showAll : true,
            selected:{
                data:[],
                showData:[],
                currentPage:1,
                number:0
            }
        };
    }


    getShowData = (data,pageIndex) => {
        let end = pageIndex * this.state.defaultPageSize;
        let start = end -this.state.defaultPageSize;
        return data.slice(start,end);
    };


    componentDidMount() {
        /*
          Make sure the data and columns have value
        */
        let data = getData(this.props.data);
        let columns = this.props.columns;
        let showData = this.getShowData(data,this.state.currentPage);
        this.setState({ data, columns,showData});

        //check some data by default
        if(this.props.checkByDefault !== undefined && data !== undefined){
            this.props.checkByDefault(data);
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.data !== this.props.data && nextProps.data !== undefined){
            let data = getData(nextProps.data);
            if(this.props.checkByDefault !== undefined){
                this.props.checkByDefault(data);
            }
            this.setState({data});



            setTimeout(()=>this.setState({loading:false}),1000);

        }

        if( nextProps.selection !== undefined && this.props.selection !== nextProps.selection ){
            let selection = nextProps.selection;
            this.setState({selection});

            //when visible data equal selection length , need auto set selected all
            if(this.getVisibleData() !== null && selection.length === this.getVisibleData().length){
                this.setState({selectAll:true});
            }else {
                this.setState({selectAll:false});
            }
        }

        if(nextProps.data === undefined || nextProps.data.length === 0){
            this.setState({selectAll:false});
        }

        // set showPagination
        // if(nextProps.showPagination !== undefined){
        //   this.setState({showPagination: nextProps.showPagination});
        // }

        //set defaultPageSize
        if(nextProps.defaultPageSize !== undefined){
            this.setState({defaultPageSize: nextProps.defaultPageSize})
        }

        if(nextProps.pageSizeOptions !== undefined){
            this.setState({pageSizeOptions:nextProps.pageSizeOptions})
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

        //handle selected data
        if(this.state.selected.data){
            let duplicate = false;
            this.state.selected.data.forEach(d=>{
                if(d._id === _id){
                    duplicate = true;
                }
            });
            let data = [...this.state.selected.data];
            if(duplicate){
                data = data.filter(d=>{
                    return d._id === _id
                })
            }else {
                data.push(row)
            }

            let number = data ? data.length : 0;

            this.setState({selected:{
                    ...this.state.selected,
                    data,
                    number
                }})
        }



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
            //const visibleData = currentRecords.slice(start, end);

            return currentRecords.slice(start, end);
        }

        return null;
    };


    toggleAll = () => {

        const selectAll = !this.state.selectAll;
        let selection = [];
        let data =[];

        const visibleData = this.getVisibleData();
        visibleData.map(item => {
            selection.push(item._original._id);
            //delete item._original['_id'];
            data.push(_.cloneDeep(item._original))
        });

        data.forEach((d)=>{
            return delete d['_id']
        });

        if(this.props.toggleAll!== undefined){
            this.props.toggleAll(selectAll, data);
        }

        if(!selectAll){
            selection =[]
        }
        this.setState({selectAll});
        this.setState({selection});
    };

    isSelected = key => {
        return this.state.selection.includes(key);
    };

    clearSelected = ()=>{
        const selectAll = this.state.selectAll;
        if(selectAll){
            this.toggleAll();
        }else {
            let selection = [];
            this.setState({selection});
        }
    };

    onPageSizeChange=(pageSize, pageIndex)=>{
        //clear selection and selectedAll
        this.clearSelected();

        if(this.props.onPageSizeChange !==undefined){
            this.props.onPageSizeChange(pageSize, pageIndex);
        }

    };

    onPageChange =(pageIndex,action)=>{
        //clear selection and selectedAll
        this.clearSelected();

        switch (action) {
            case 'next':
                pageIndex = ++pageIndex;
                //this.setState({currentPage:pageIndex});
                break;
            case 'previous':
                pageIndex = --pageIndex;
                //this.setState({currentPage:pageIndex});
                break;
        }

        this.setState({currentPage:pageIndex});

        //
        //this.setState({loading:true});

        let showData = this.getShowData(this.state.data,pageIndex);
        this.setState({showData});

        //this.setState({loading:false});

        const selectTable = this.selectTable;
        const wrappedInstance = selectTable.getWrappedInstance();
        wrappedInstance.props.getLoadingProps();
        console.log(wrappedInstance);


        if(this.props.onPageChange !==undefined){
            this.props.onPageChange(pageIndex);
        }
    };

    resolveData =(data)=>{
        if(this.props.resolveData!==undefined){
            this.props.resolveData(data);
        }
    };

    showSelect = (status)=>{
        let showData = this.getShowData(this.state.selected.data,this.state.selected.currentPage);
        this.setState({selected:
                {
                    ...this.state.selected,
                    showData,
                },
            showAll:false
        })
    };

    showAllData = ()=>{
        this.setState({showAll:true});
    };

    onScrollX=()=>{
        console.log('sd')
    };

    onSortedChange =()=>{
        console.log('asd')
    };

    render() {
        const {
            toggleSelection,
            toggleAll,
            isSelected,
            onPageChange,
            showSelect,
            showAllData,
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
            showAll,
            selected
        } = this.state;

        const {
            totalNumber
        }= this.props;

        const SelectTable = selectTableHOC(ReactTable);

        const data = showAll ? showData : selected.showData;

        const extraProps = {
            selectAll,
            isSelected,
            toggleAll,
            toggleSelection,
            selectType,
            data,
            columns,
            //resolveData,
            defaultPageSize,
            pageSizeOptions,
            showPagination,
            loading
        };

        const extraPropsForPagination = {
            onPageChange,
            currentPage,
            totalNumber,
            selectedNumber : selected.number,
            showSelect,
            defaultPageSize,
            showAll,
            showAllData
        };


        return (
            <div
                ref="xScrollWrapper"
                onScroll={this.onScrollX}>
                {showData ? (
                    <div>
                        <ReactTable
                            resolveData={resolveData(data)}
                            ref={r => (this.selectTable = r)}
                            manual
                            onSortedChange={this.onSortedChange }
                            defaultSorted={[
                                {
                                    id: "age",
                                    desc: true
                                }
                            ]}
                            {...extraProps}

                        />
                    </div>

                ) : null}
            </div>
        );
    }
}

export default  CommonTable;
