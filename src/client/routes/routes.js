'use strict';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import Inbound from './Inbound.js';
import InboundData from './InboundData.js';
import InboundData_copy from './InboundData_copy.js';
import ProblemRecordPage from './ProblemRecordPage.js';

export default function() {
    const history = createHistory();
    return (
        <Router history={ history }>
            <Route path="/" component="div">
                <IndexRoute component={ Inbound } />
                <Route path="/crmWebPage/Inbound" component={ Inbound } />
                <Route path="/InboundData" component={ InboundData } />
                <Route path="/InboundData_copy" component={ InboundData_copy } />
                <Route path="/crmWebPage/CrmProblemRecordPage" component={ ProblemRecordPage } />
            </Route>
        </Router>
        );
}