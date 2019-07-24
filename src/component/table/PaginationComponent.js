import React,{Component} from 'react'
import Button from 'grommet/components/Button';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import 'bootstrap/dist/css/bootstrap.css';
import Box from 'grommet/components/Box';

class PaginationComponent extends Component{
  constructor(props){
    super(props);
    this.state ={
      previous:false,
      next:false,
      totalPageNumber:undefined,
      selectedPageNumber:undefined,
      pageIndex:null,
      pageNumber:{
        pageChanged:false,
        start:1,
        end:10
      }
    }
  }

  componentWillMount(){
    //set next is true when component first did mount
    this.setState({next:true,previous:false});
    //set totalPageNumber value , this number only calculate once
    let totalPageNumber = Math.ceil(this.props.totalNumber / this.props.defaultPageSize);
    this.setState({totalPageNumber})

  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.currentPage){
      //let totalPageNumber = Math.ceil(nextProps.totalNumber / nextProps.defaultPageSize);
      if(nextProps.currentPage === this.state.totalPageNumber){
        if(nextProps.currentPage === 1){
          this.setState({next:false,previous:false});
        }else {
          this.setState({next:false,previous:true});
        }
      }else if(nextProps.currentPage < this.state.totalPageNumber){
        if(nextProps.currentPage === 1){
          this.setState({next:true,previous:false})
        }else {
          this.setState({next:true,previous:true})
        }
      }
    }

    //set selected number value , this number
    if(nextProps.selectedNumber !== this.props.selectedNumber){
      let selectedPageNumber = Math.ceil(this.props.selectedNumber / this.props.defaultPageSize);
      this.setState({selectedPageNumber});
    }
  }

  handleNext = ()=>{
    this.props.onPageChange(this.props.currentPage,'next');
    let pageIndex = this.props.currentPage + 1;
    this.handlePageChange(pageIndex);
  };

  handlePrevious = ()=>{
    this.props.onPageChange(this.props.currentPage,'previous');
    let pageIndex = this.props.currentPage -1;
    this.handlePageChange(pageIndex);
  };

  showSelect = () =>{
    this.props.showSelect(true);
    this.setState({showSelect:false})
  };

  showAllData = () =>{
    this.props.showAllData();
    this.setState({showSelect:true});
  };

  handlePageChange = (pageIndex)=>{
    let distanceToEnd = this.state.pageNumber.end - pageIndex;
    let distanceToStart = pageIndex - this.state.pageNumber.start;
    if( distanceToEnd <= 3){
      let start = pageIndex - 5;
      let end = start + 9;
      this.setState({pageNumber:{
        start,
          end,
          pageChanged:true
        }})
    }else if(distanceToStart <= 4){
      let start = pageIndex - 5;
      if(start < 1){
        start =1;
      }
      let end = start + 9;
      this.setState({pageNumber:{
          start,
          end,
          pageChanged:true
        }})

    }
    this.setState({pageIndex});
    this.props.onPageChange(pageIndex);
  };

  getOnClickStyle=(index)=>{
    if(index !== this.state.pageIndex){
      if(index ===1 && this.state.pageIndex == null){
        return {
          padding:"5px",
          fontWeight:"bold",
        }
      }else {
        return{
          padding:"5px"
        };
      }
    }else {
        return {
          padding:"5px",
          fontWeight:"bold",
        }
    }

  };


  getPageNumber = (number,currentPage)=>{
    if(number<=10){
      let result =  [];
      for(let i =1; i<=number;i++){
        result.push(<div key={i} style={this.getOnClickStyle(i)} onClick={()=>this.handlePageChange(i)}>{i}</div>)
      }
      return result;

    }else {
      if(!this.state.pageNumber.pageChanged){
        let result = [];
        for (let i = 1;i<=10;i++){
          result.push(<div key={i} style={this.getOnClickStyle(i)} onClick={()=>this.handlePageChange(i)}>{i}</div>)
        }
        return result;
      }else {
        let result = [];
        for (let i = this.state.pageNumber.start;i<=this.state.pageNumber.end;i++){
          result.push(<div key={i} style={this.getOnClickStyle(i)} onClick={()=>this.handlePageChange(i)}>{i}</div>)
        }
        return result;
      }
    }

  };


  render() {
    const {
      totalNumber,
      selectedNumber,
      currentPage,
      showAll,
    } = this.props;

    const {
      previous,
      next,
      totalPageNumber,
      selectedPageNumber
    } = this.state;

    const pageNumber = this.getPageNumber(totalPageNumber,currentPage);


    return (
      < div style={{"backgroundColor":"#f1f2f3"}} className="paginationComponent">
        <div className="selected">
          <div style={{"float":"left","color":"#0073e7", "paddingRight":"8px","paddingLeft":"16px"}} onClick={this.showSelect}>
            {selectedNumber} records selected
          </div>
          <div style={{"float":"left"}}>
            | &nbsp;&nbsp;{totalNumber}  total items
          </div>
        </div>
        < div  className="page">
          <Button label="Previous"
                  icon = {<LinkPreviousIcon/>}
                  plain={true}
                  className="previous-button"
            style={{"float":"left","position":"absolute","top":"50%","transform": "translateY(-50%)"}}
                  onClick={previous ? this.handlePrevious : undefined}/>
          <Box direction='row' style={{"float":"left", "position": "absolute", "right": "50%","transform":"translateX(50%)"}}>
            {pageNumber}
          </Box>
          <Button label="Next"
                  icon={<LinkNextIcon/>}
                  plain={true}
                  style={{"float":"right"}}
                  className="next-button"
                  onClick={next ? this.handleNext : undefined}/>
        </div>
      </div>
    );
  }
}

export default PaginationComponent
