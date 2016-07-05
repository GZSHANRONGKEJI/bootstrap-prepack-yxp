import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import ProblemRecordListRow from './ProblemRecordListRow.jsx';

class ProblemRecordList extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {onEditItem, onDeleteItem, onSubmitItem, ProblemList} = this.props;
        let itemlist;
        if(ProblemList &&ProblemList.length > 0) {
            itemlist = ProblemList.map((item) =>{
                return (<ProblemRecordListRow
                                  onEditItem={ onEditItem }
                                  onDeleteItem={ onDeleteItem }
                                  onSubmitItem= { onSubmitItem }
                                  item={ item } />)
            }) 
        }
        else {
            itemlist = null;
        }        
        return (<Table
                       {...this.props}
                       striped={ true }
                       bordered={ false }
                       condensed={ false }
                       hover={ true }>
                    <thead>
                        <tr>
                            <th>
                                <span>编号</span>
                            </th>
                            <th>
                                <span>主题</span>
                            </th>
                            <th>
                                <span>问题类别</span>
                            </th>
                            <th>
                                <span>状态</span>
                            </th>
                            <th>
                                <span>修改</span>
                            </th>
  
                            <th>
                                <span>提交</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    { itemlist }
                    </tbody>
                </Table>
            );
    }
}
ProblemRecordList.defaultProps = {
    ProblemList: [{No: 1,
                Id:"000000-000000-000000-0000",
                Theme: '客户反映现场拍的接待处理问题随时随时随随收到是撒啊啊',
                QuestionTypeNameStr: '问题求助类-现场拍-拍品问题',
                QuestionType: '000000-000000-000000-0000',
                QuestionTypeName: '拍品问题',
                QuestionType1: '000000-000000-000000-0000',
                QuestionTypeName1: '问题求助类',
                QuestionType2: '000000-000000-000000-0000',
                QuestionTypeName2: '现场拍',
                largeArea: '问题所属大区',
                CustomerCategory: '客户类别',
                Processingmode: '问题处理方式',
                VisitTime: '下次回访时间',
                ProblemDescription: '问题描述',
                Feedback: '问题反馈',
                State:0}]
};
ProblemRecordList.propTypes = {
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onSubmitItem: PropTypes.func,
    ProblemList: PropTypes.array
};

export default ProblemRecordList;
