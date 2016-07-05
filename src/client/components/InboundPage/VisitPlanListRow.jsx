import React, { Component, PropTypes } from 'react';
import Icon from '../CustomHtml/Icon.jsx';
import common from '../../common/common.js';
class VisitPlanListRow extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnEditItem = this.handleOnEditItem.bind(this);
        this.handleOnDeleteItem = this.handleOnDeleteItem.bind(this);
    }
    handleOnEditItem(e) {
        e.preventDefault();
        e.stopPropagation();
        const {onEditItem, item} = this.props;
        if (onEditItem) {
            onEditItem(item);
        }
    }
    handleOnDeleteItem(e) {
        e.preventDefault();
        e.stopPropagation();
        const {onDeleteItem, item} = this.props;
        if (onDeleteItem) {
            onDeleteItem(item);
        }
    }

    render() {
         // <td>
         //                <Icon
         //                      className="btn btn-danger btn-xs" 
         //                      iconclassName="fa fa-trash-o"
         //                      onClick={ this.handleOnDeleteItem } />
         //            </td>
        const {item} = this.props;
        return (<tr {...this.props}>
                    <td>
                        <span>{ item.No }</span>
                    </td>
                    <td>
                        <span>{ common.momentFormat(item.visittime) }</span>
                    </td>
                    <td>
                        <span>{ item.description }</span>
                    </td>
                    <td>
                        <Icon
                              className="btn btn-warning btn-xs"
                              iconclassName="fa fa-edit"
                              onClick={ this.handleOnEditItem } />
                    </td>
                   
                </tr>
            );
    }
}
VisitPlanListRow.defaultProps = {

};
VisitPlanListRow.propTypes = {
    item: PropTypes.shape({
        No: PropTypes.number,
        description: PropTypes.string
    }),
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func
};

export default VisitPlanListRow;
