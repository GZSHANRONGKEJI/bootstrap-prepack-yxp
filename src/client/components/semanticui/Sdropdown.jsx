import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
    var d = 1;
class Sdropdown extends Component {

    constructor(props, content) {
        super(props, content);
        this.onSdropdownChange = this.onSdropdownChange.bind(this)
    }
    componentWillUpdate(nextProps, nextState) {
        const { list } = nextProps;
        // var _list = _.map(list, function(a) { return { name: a.text, value: a.value }  });
        // $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown();
        // $(ReactDOM.findDOMNode(this.refs.dropdown)).parent().dropdown('setup').menu( { values: _list } );
        if(nextProps.value == "" || nextProps.value == null || (!_.findWhere(list, {value: nextProps.value}) && nextProps.value.length > 15 ) ) {
            $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown('clear');   
        }
        else
        {
            setTimeout(()=>{$(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown('set selected', nextProps.value);}, 0);
           
        }
        
    }
    onSdropdownChange(value, text) {
        const {name, onChange} = this.props; 
        if(onChange) {
            onChange({target:{ value:value, name: name },preventDefault :function(){} , stopPropagation:function(){}  });
        }
    }
    componentDidMount() {
        if (typeof $().dropdown.noConflict === 'function') {
            $().dropdown.noConflict();
        }
        $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown({onChange: this.onSdropdownChange});
        const {dispatch, value} = this.props;
    	
    }
    render() {
        let { className, list, clear, required, value} = this.props;
			className += ' ui selection search dropdown form-control'	
		let listItems;
        if (list && list.length > 0) {
           
            listItems = list.map((item, index) => {
                return (<div className="item" data-value={ item.value }>{item.text}
                    </div>);
            })
            if(clear) {
                // if(_.where(list, {value: "-1"}).length === 0) {
                //     list.unshift({value:"-1", text:"请选择"});
                // }
                listItems.unshift((<div className="item" data-value="-1">全部
                    </div>))
            }
        } else {
            listItems = [];
        }
        return (<div className= { className } ref="dropdown" >
                    <input type="hidden" value = { value }  />
                    <i className="dropdown icon"></i>
                    <div className="default text">请选择</div>
                    <div className="menu">
                      { listItems }
                    </div>
                 </div>)
        // return (<select ref = 'dropdown'
        //            {...this.props}
        //            className = { className }>
        //            { listItems }

        //     </select>
        // );
    }
}
Sdropdown.defaultProps = {
    className: '',
    list: [
	    {value:"1",text:"mytest"},
	    {value:"2",text:"mytest2"}
    ],
    clear: false,
    required: false
};
Sdropdown.propTypes = {
    className: PropTypes.string,
    list: PropTypes.array,
    clear: PropTypes.bool,
    required: PropTypes.bool
};

export default Sdropdown;
