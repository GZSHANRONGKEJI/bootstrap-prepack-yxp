import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Button, Panel } from 'react-bootstrap';
import common from '../../common/common.js';

class QuestionHistoryListRow extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnOpen = this.handleOnOpen.bind(this);
        this.handleOnInfoProblemdescription = this.handleOnInfoProblemdescription.bind(this);
        this.handleOnInfoFeedback = this.handleOnInfoFeedback.bind(this);
        this.openObj = this.openObj.bind(this);
    }

    handleOnOpen() {
        const {handleOnOpen, item} = this.props;
        if (handleOnOpen) {
            handleOnOpen(item);
        }
    }
    handleOnInfoProblemdescription() {
        const {handleOnInfo, item} = this.props;
        if (handleOnInfo) {
            handleOnInfo(item.problemdescription);
        }
    }
    handleOnInfoFeedback() {
        const {handleOnInfo, item} = this.props;
        if (handleOnInfo) {
            handleOnInfo(item.feedback);
        }
    }
    openObj() {
        const { item} = this.props;
        common.crmopen(item.questionid, '10024');

    }
    render() {
        const {item} = this.props;
        var tdpadd = { paddingLeft: '0px',paddingRight: '10px' }
        return (<tr {...this.props}>
                       <td>
                           <a href="javasctipt:void(0)" onClick = { this.openObj } > { item.no }</a>
                        </td>
                        <td>
                            { item.questionname }
                        </td>
                        <td>
                            { item.phonenumber }
                        </td>
                        <td>
                            { item.owneridName }
                        </td>
                        <td>
                            { item.processingmodeOpt }
                        </td>
                         <td style={ tdpadd }>
                         <div className = { 'pointer text-truncate' } onClick = { this.handleOnInfoProblemdescription } style= {{ width :'140px' }}>{ item.problemdescription }</div>
                            
                        </td>
                         <td style={ tdpadd }>
                          <div  className = { 'pointer text-truncate' } onClick = { this.handleOnInfoFeedback } style= {{ width :'140px' }}>{ item.feedback }</div>
                        </td>
                        <td>
                            { item.problemstate }
                        </td>
                        <td>
                            <Button
                                    bsStyle="primary"
                                    bsSize="sm"
                                    onClick={ this.handleOnOpen }>
                                <span> { ['2'].indexOf(item.Processingmode+'') > -1 || ['8'].indexOf(item.questionsolvestatus+'') > -1 ? "编辑":"追加" }</span>
                            </Button>
                        </td>
                    </tr>);
    }
}
QuestionHistoryListRow.defaultProps = {
    item: {
        name: 'Text in td',
        phonenumber: 'Text in td',
        owneridName: 'Text in td',
        processingmodeOpt: 'Text in td',
        open: false
    }
};
QuestionHistoryListRow.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        phonenumber: PropTypes.string,
        owneridName: PropTypes.string,
        processingmodeOpt: PropTypes.string,
        open: PropTypes.bool
    }),
    handleOnOpen: PropTypes.func
};

export default QuestionHistoryListRow;
