import React, { Component, PropTypes } from 'react';
import Icon from '../CustomHtml/Icon.jsx';

class ProblemRecordListRow extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnEditItem = this.handleOnEditItem.bind(this);
        this.handleOnDeleteItem = this.handleOnDeleteItem.bind(this);
        this.handleOnSubmitItem = this.handleOnSubmitItem.bind(this);
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
    handleOnSubmitItem(e) {
        e.preventDefault();
        e.stopPropagation();
        const {onSubmitItem, item} = this.props;
        if (onSubmitItem) {
            onSubmitItem(item);
        }
    }
    render() {
        const {item} = this.props;

        let deleteItem = ( <Icon
                              className="btn btn-danger btn-xs" 
                              iconclassName="fa fa-trash-o"
                              onClick={ this.handleOnDeleteItem } />);
        let subimtItem = (<Icon
                              className="btn btn-warning btn-xs"
                              iconclassName="fa fa-edit"
                              onClick = { this.handleOnSubmitItem } />) 
        if(item.State === 2) {
            deleteItem = [];
            subimtItem = [];
        }
        if(item.Processingmode === "2") {
            subimtItem = [];
        }
        return (<tr {...this.props}>
                    <td>
                        <span>{ item.No }</span>
                    </td>
                    <td>
                        <span>{ item.Theme }</span>
                    </td>
                    <td>
                        <span>{ item.QuestionTypeNameStr }</span>
                    </td>
                     <td>
                        <span>{ item.State === 0  ? "未保存" :  item.State === 1 ?  "已保存"  : "已提交" }</span>
                    </td>
                    <td>
                        <Icon
                              className="btn btn-warning btn-xs"
                              iconclassName="fa fa-edit"
                              onClick={ this.handleOnEditItem } />
                    </td>

                     <td>
                        { subimtItem }
                    </td>
                </tr>
            );
    }
}
ProblemRecordListRow.defaultProps = {
    item: {
        Id: 'Text in td',
        Theme: 'Text in td',
        QuestionTypeNameStr: 'Text in td'
    }
};
ProblemRecordListRow.propTypes = {
    item: PropTypes.shape({
        Id: PropTypes.string,
        Theme: PropTypes.string,
        QuestionTypeNameStr: PropTypes.string
    }),
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onSubmitItem: PropTypes.func
};

export default ProblemRecordListRow;
