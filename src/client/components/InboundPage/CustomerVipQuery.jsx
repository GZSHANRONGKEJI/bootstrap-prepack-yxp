import React, { Component, PropTypes } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { PanelGroup } from '../Bootstrap';
import CrmInput from '../CrmWeb/CrmInput.jsx';
import common from '../../common/common.js';
class CustomerVipQuery extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleOnQuery = this.handleOnQuery.bind(this);
        this.handlerOnCustomerVipChange = this.handlerOnCustomerVipChange.bind(this);
        this.handleOnQueryOrder =this.handleOnQueryOrder.bind(this);
        this.handleOnClose =this.handleOnClose.bind(this);
        this.onunload = this.onunload.bind(this);
        this.isLeave = false;
        var iscreate = common.GetQueryString('iscreate');
        var uniqueId = common.GetQueryString('uniqueId');
        if(iscreate != '0' && !uniqueId) {
            
            window.onbeforeunload = this.onunload;
        }
    }
    handleOnQuery(e) {
        e.preventDefault();
        e.stopPropagation();
        const {handleOnQuery, query} = this.props;

        if (handleOnQuery) {
            query.currentpage = 1;
            handleOnQuery(query);
        }
    }
    onunload() {
        if (!this.isLeave) {
                return "你确定要离开此页面吗";
        }
    }
    handlerOnCustomerVipChange(e) {
        const { handlerOnCustomerVipChange } = this.props;
        if(handlerOnCustomerVipChange) {
            handlerOnCustomerVipChange(e.target.name,e.target.value);
        }
    }
    handleOnQueryOrder(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open('/_root/homepage.aspx?etn=xin_salesorder&viewid=%7bBE37CD9C-3FE0-E511-93F3-00155D3C1F05%7d');
    }
    handleOnClose(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isLeave =true;
        common.close();
    }
    render() {
        const {query} = this.props;
        let state = null;
        if (query.state === -1) {
            state = (<Button  disabled className="btn btn-sm ui primary loading disabled button" onClick={ this.handleOnQuery }>
                         <span >查询</span>
                     </Button>
            );
        } else {
            state = (<Button className="btn btn-sm ui primary button" onClick={ this.handleOnQuery }>
                         <span>查询</span>
                     </Button>
            );
        }
        let closebtn = [];
        var iscreate = common.GetQueryString('iscreate');
        if(iscreate != '0') {
             closebtn = (<Button className="btn btn-sm ui primary button" onClick={ this.handleOnClose }>
                                        <span>关闭</span>
                                    </Button>);
        }
        return (<Row {...this.props}>
                    <PanelGroup
                                accordion={ true }
                                defaultActiveKey={ 1 }>
                        <Panel
                               eventKey={ 2 }
                               style={ {    "border": "0px"} }>
                            <Row>
                                <Col
                                     xs={ 2 }
                                     md={ 2 }
                                     sm={ 2 }
                                     lg={ 2 }>
                                    <CrmInput
                                              placeholder="客户名称"
                                              value={ query.branchoffice }  name='branchoffice' onChange = { this.handlerOnCustomerVipChange } />
                                </Col>
                                <Col
                                     xs={ 2 }
                                     md={ 2 }
                                     sm={ 2 }
                                     lg={ 2 }>
                                    <CrmInput
                                              placeholder="联系电话"
                                              value={ query.usephone } name='usephone' onChange = { this.handlerOnCustomerVipChange } />
                                </Col>
                                <Col
                                     xs={ 2 }
                                     md={ 2 }
                                     sm={ 2 }
                                     lg={ 2 }>
                                    <CrmInput
                                              placeholder="登录名"
                                              value={ query.loginname } name='loginname' onChange = { this.handlerOnCustomerVipChange } />
                                </Col>
                                <Col
                                     xs={ 1 }
                                     md={ 1 }
                                     sm={ 1 }
                                     lg={ 1 }>
                                    { state }

                                </Col>
                                <Col
                                     xs={ 1 }
                                     md={ 1 }
                                     sm={ 1 }
                                     lg={ 1 }>
                                    <Button className="btn btn-sm ui primary button" onClick={ this.handleOnQueryOrder }>
                                        <span>查询订单</span>
                                    </Button>
                                    
                                </Col> 
                                 <Col
                                     xs={ 2 }
                                     md={ 2 }
                                     sm={ 2 }
                                     lg={ 2 }>
                                   {closebtn}
                                    
                                </Col> 
                            </Row>
                        </Panel>
                    </PanelGroup>
                </Row>
            );
    }
}
CustomerVipQuery.defaultProps = {
    query: {
        branchoffice: '',
        phone: '',
        usephone: ''
    }
};
CustomerVipQuery.propTypes = {
    query: PropTypes.shape({
        branchoffice: PropTypes.string,
        phone: PropTypes.string,
        usephone: PropTypes.string
    }),
    handlerOnCustomerVipChange: PropTypes.func,
    handleOnQuery: PropTypes.func
};

export default CustomerVipQuery;
