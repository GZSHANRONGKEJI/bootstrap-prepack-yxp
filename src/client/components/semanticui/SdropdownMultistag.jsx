import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
class SdropdownMultistag extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleronChange = this.handleronChange.bind(this);
        
    }

    componentWillUpdate(nextProps, nextState) {
        if(!nextProps.value) {
            $(this.refs.dropdown).dropdown('clear');
        }
        else
        {
           $(this.refs.dropdown).dropdown('set selected',nextProps.value); 
        }
        
    }
    handleronChange(value) {
        const { onChange:handleronChange, name } = this.props;
        if(handleronChange){

            handleronChange({ target: {name:name, value: value } });
        }
    }
    componentDidMount() {
        if (typeof $().dropdown.noConflict === 'function') {
            $().dropdown.noConflict();
        }
        const {dispatch} = this.props;
        $(ReactDOM.findDOMNode(this.refs.dropdown)).dropdown({ onChange: this.handleronChange });
    }
    setdropdown(arr) {
        let listItems = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];

            if(item.menu && item.menu.length > 0) {
               listItems.push(
                    <div className="item" data-value = { item.value } >
                    <i className="dropdown icon"></i>
                    <span className="text">{ item.text }</span>
                        <div className="menu">
                            { this.setdropdown(item.menu) }
                        </div>
                    </div>
                  );
            }
            else {
               listItems.push(<div className="item" data-value =  { item.value }> 
                    <span className="text">{ item.text }</span> 
                </div>);
            }
        };
        return listItems;
    }
    render() {
        let { className, list, label } = this.props;
		className += 'ui dropdown button form-control';	
        let listItems =  {};
        listItems = this.setdropdown(list);

        return (
            <div {...this.props}  className= { className } ref = 'dropdown' >
                 <input type="hidden" ref = 'sdropdownmultis' value = { this.props.value } />
                <span className="text"> { label }</span>
                <i className="dropdown icon"></i>
                    <div className="menu">
                        { listItems }
                    </div>
            </div>
        );
    }
}
SdropdownMultistag.defaultProps = {
    className: '',
    label: '请选择',
    // // name: '',
    value: '',
    list: 
    [  
        { text:"Category C2",value:"C2",menu: [ { text:"Category CA",value:"CB",menu: [ { text:"Category DA",value:"DB" } ] } ] },
        { text:"Category C3",value:"C3" }
    ]
};
SdropdownMultistag.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    // // name: PropTypes.string,
    // // value: propTypes.string,
    list: PropTypes.array,
    value: PropTypes.string,
    handleronChange: PropTypes.func
};

export default SdropdownMultistag;
