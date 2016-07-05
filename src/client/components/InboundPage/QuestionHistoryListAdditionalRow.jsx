import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Panel, Row, Col, Input, Button } from 'react-bootstrap';

class QuestionHistoryListAdditionalRow extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnAdditional = this.handlerOnAdditional.bind(this);
    }

    handlerOnAdditional() {
        const {handlerOnAdditional, item} = this.props;
        if (handlerOnAdditional) {
           const  problemdescription = $(ReactDOM.findDOMNode(this.refs.AddContent)).val();
            handlerOnAdditional(item, problemdescription);
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if(nextProps && nextProps.item.open === false) {

            ReactDOM.findDOMNode(this.refs.AddContent).value ='';
        }
        
    }

    render() {
        const {item, tdlength} = this.props;
     
        return (<tr><td colSpan = { tdlength } className = 'nopadding' > 
            <Panel collapsible expanded={ !!item.open } className = 'nomaring noborder'>
            <form className="ui reply form">
               
                <Row>
                        <Col
                             xs={ 10 }
                             md={ 10 }
                             sm={ 10 }
                             lg={ 10 }>
                             <div className="field"><input   type="text"  className='form-control' ref = "AddContent"></input>
                             </div>
                        </Col>
                        <Col
                             xs={ 2 }
                             md={ 2 }
                             sm={ 2 }
                             lg={ 2 }>
                             <Button
                                    bsStyle="primary"
                                    bsSize="sm"
                                    onClick={ this.handlerOnAdditional }>
                                <span>保存</span>
                            </Button>
                        </Col>
                </Row>
                </form>
            </Panel> </td></tr>);
    }
}
QuestionHistoryListAdditionalRow.defaultProps = {
    item: {
        open: false
    },
    tdlength: 1
}
QuestionHistoryListAdditionalRow.propTypes = {
    handlerOnAdditional: PropTypes.func,
    item: PropTypes.shape({
        open: PropTypes.bool
    }),
    tdlength: PropTypes.number
};

export default QuestionHistoryListAdditionalRow;
