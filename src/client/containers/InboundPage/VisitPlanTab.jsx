import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'react-bootstrap';
import VisitPlanList from '../../components/InboundPage/VisitPlanList.jsx';
import VisitPlan from '../../components/InboundPage/VisitPlan.jsx';
import { handlerOnVisitPlanNew, handlerOnVisitPlanDeleteItem, handlerOnVisitPlanSave, handlerOnVisitPlanEdit, handlerOnVisitPlanChange } from '../../actions/index.js';
import common from '../../common/common.js';
class VisitPlanTab extends Component {

    constructor(props, content) {
        super(props, content);
        this.handlerOnNew = this.handlerOnNew.bind(this);
        this.handlerOnDeleteItem = this.handlerOnDeleteItem.bind(this);
        this.handlerOnSave = this.handlerOnSave.bind(this);
        this.handlerOnEdit = this.handlerOnEdit.bind(this);
        this.handlerOnChange = this.handlerOnChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
        this.state = {
            a:1
        }
    }
    componentWillUpdate(nextProps, nextState) {
        const {dispatch} = this.props;
    }
    componentDidMount() {
        const {dispatch, query, queryEmpty} = this.props;
        query.phonenumber = common.getTemp().phone;
        queryEmpty.phonenumber = common.getTemp().phone;
        this.setState({a:2});

    }
    handlerOnNew() {
        const {dispatch, queryEmpty} = this.props;
        dispatch(handlerOnVisitPlanNew(queryEmpty));
    }
    handlerOnDeleteItem(item) {
        const {dispatch} = this.props;
        if(confirm('是否删除')) {
            dispatch(handlerOnVisitPlanDeleteItem(item));
        }
    }
    handlerOnSave(item) {
        const {dispatch} = this.props;
        dispatch(handlerOnVisitPlanSave(item));
    }
    handlerOnEdit(item) {
        const {dispatch} = this.props;
        dispatch(handlerOnVisitPlanEdit(item));
    }
    handlerOnChange(name, value) {
        const {dispatch} = this.props;
        dispatch(handlerOnVisitPlanChange(name, value));
    }

    render() {
        const {query, itemData} = this.props;
        return (<div {...this.props}>
                    <VisitPlanList
                                   striped={ true }
                                   bordered={ false }
                                   condensed={ false }
                                   hover={ true }
                                   onDeleteItem={ this.handlerOnDeleteItem }
                                   onEditItem={ this.handlerOnEdit }
                                   itemData={ itemData } />
                    <VisitPlan
                               item={ query }
                               handlerOnChange={ this.handlerOnChange }
                               handlerOnNew={ this.handlerOnNew }
                               handlerOnSave={ this.handlerOnSave }  />
                </div>
            );
    }
}
function mapStateToProps(state) {
    let {VisitPlan: {query, itemData, queryEmpty}} = state;

    return {
        query,
        itemData,
        queryEmpty
    };
}

export default connect(mapStateToProps)(VisitPlanTab);
