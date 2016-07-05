import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import VisitPlanListRow from './VisitPlanListRow.jsx';

class VisitPlanList extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {onEditItem, onDeleteItem, itemData} = this.props;
        let itemlist;
        if(itemData &&itemData.length > 0) {
            itemlist = itemData.map((item) =>{
                return (<VisitPlanListRow
                                  onEditItem={ onEditItem }
                                  onDeleteItem={ onDeleteItem }
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
                                <span>下次外呼时间</span>
                            </th>
                            <th>
                                <span>说明</span>
                            </th>
                            <th>
                                <span>修改</span>
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
VisitPlanList.defaultProps = {
    itemData: []
};
VisitPlanList.propTypes = {
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    itemData: PropTypes.array
};

export default VisitPlanList;
