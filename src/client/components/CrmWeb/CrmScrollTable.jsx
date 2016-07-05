import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import IScroll from 'IScroll';
import EventEmitter from '../../common/eventemitter';
import common from '../../common/common.js';
class CrmScrollTable extends Component {

    constructor(props, content) {
        super(props, content);
        this.ScrollEvent = this.ScrollEvent.bind(this);
        this.initTr = this.initTr.bind(this);
        this.handleOnScrollEnd = this.handleOnScrollEnd.bind(this);
        this.handleOnIScroll = this.handleOnIScroll.bind(this);
        this.info = this.info.bind(this)
        this.myScroll = null;
    }

    componentDidUpdate(nextProps, nextState) {
        this.initTr();
        this.handleOnIScroll()
       //myScroll.on('scrollEnd',this.handleOnScrollEnd);
    }
    componentDidMount() {

        const { EEName } = this.props;
        if( typeof EEName === 'string') {
            EventEmitter.once(EEName, this.ScrollEvent);
        }
    }
    handleOnIScroll() {
        if(!this.myScroll) {
            const wrapper = this.refs.wrapper;
            this.myScroll = new IScroll(ReactDOM.findDOMNode(wrapper), {preventDefault : !1, scrollbars:'custom',mouseWheel: !0, interactiveScrollbars : true});
            this.myScroll.on('scrollEnd',this.handleOnScrollEnd);
         
        }
        else
        {
            setTimeout(()=>{
                 this.myScroll.refresh();
            }, 0)
        }
    }
    info(e) {
        common.info(e.currentTarget.title);
        
    }
    ScrollEvent() {
        
        setTimeout(()=> {
            this.initTr();
            this.handleOnIScroll();
          
        }.bind(this), 300)
         
    }
    handleOnScrollEnd() {
        if(this.myScroll && this.myScroll.y >= this.myScroll.maxScrollY ) {
            const { onScrollEnd } = this.props;
            if(onScrollEnd) {
                onScrollEnd();
            }
        }
    }
    mapTr(item, itemData) {
        if(itemData instanceof Object) {
            if(item instanceof Object) {
                return item.map((item, index) => {
                    if(item.type == 'truncate') {
                        return (<td><div className = { 'pointer text-truncate' } style= { item.style } onClick= { this.info } title = { itemData[item.value] }>{ itemData[item.value] } </div></td>);
                    }
                    else {
                        return (<td>{ itemData[item] }</td>);
                    }
                });

            }
            return item.map((item, index) => {
                return (<td>{ itemData[item] }</td>);
            });
        }
        return null;
    }
    initTr() {
      
        const thead = ReactDOM.findDOMNode(this.refs.thead);
        const tbody = ReactDOM.findDOMNode(this.refs.tbody);
        if(tbody && tbody.children && tbody.children.length > 0) {
            let td =  $(tbody.children[0]).find('td');
            $(thead.children[0]).find('th').map((index, item) => 
                { 
                    td.eq(index).width($(item).width()); 
                });
        }
    }
    render() {
        const {item, itemData , className} = this.props;
        let head;
        let headlist = item.head;
        if (headlist && headlist.length > 0) {
            head = headlist.map((item, index) => {
                if(typeof item === 'object') {
                    return (<th key = { index}  style = { item.style }>  { item.value } </th>)

                }
                return (<th key={ index }>
                            { item }
                        </th>);
            })
        } else {
            head = (<th>empty</th>);
        }
        let list;
        let itemlist = item.list;
        if (itemData && itemData.length > 0) {
            list = itemData.map((item, index) => {

                return (<tr key={ index }>
                             { this.mapTr(itemlist,item) }
                        </tr>);
            })
        } else {
            list = (<tr><td colSpan={ head.length || 1 }>无</td></tr>);
        }
        return (<div>
                    <table 
                            {...this.props}
                            className= { 'ui table ' + className }  
                            striped={ true }
                            bordered={ false }
                            condensed={ false }
                            hover={ true }
                            style = { { "marginBottom" : "0px" } } >
                        <thead ref = "thead">
                            <tr>
                                { head }
                            </tr>
                        </thead>
                    </table>
                    <div ref="wrapper" style = { { "display":"block","max-height":"400px","overflow":"hidden","marginTop":"-2px"} }>
                        <table ref = 'iscrollTr' 
                            {...this.props} 
                            className= { 'ui table ' }>
                            <tbody ref = "tbody">
                                { list }
                            </tbody>
                        </table>
                    </div>
            </div>);
    }
}
CrmScrollTable.defaultProps = {
    item: {
        head: ["姓名","年龄","性别"],
        list: ["name","age","sex"]
    },
    className:"green",
    itemData:[]
};
CrmScrollTable.propTypes = {
    className:PropTypes.string,
    EEName:PropTypes.string,
    item: PropTypes.shape({
        head: PropTypes.array,
        list: PropTypes.array
    }),
    itemData: PropTypes.array,
    onScrollEnd: PropTypes.func
};

export default CrmScrollTable;




