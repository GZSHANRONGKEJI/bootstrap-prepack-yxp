import moment from 'moment';
import EventEmitter from './eventemitter';
import Moment from 'moment';
import { request } from '../api/serverApi.js';
Moment.locale('zh-cn');
var common = {
        tempObj : { UserRolesName:[]},
        guid : function () {
            return 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        parseQueryString: function () {
            var url = window.parent.location.search;
            if (!url) {
                return {};
            }
            var obj = {};
            var keyvalue = [];
            var key = "", value = "";
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            for (var i in paraString) {
                keyvalue = paraString[i].split("=");
                key = keyvalue[0];
                value = keyvalue[1];
                obj[key] = value;
            }
            return obj;
        },
        GetQueryString :function (name)
        {
            if(common.tempObj[name] != undefined) {
                return common.tempObj[name];
             }
             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if(r!=null)return  unescape(r[2]); return null;
        },
        momentItemFormat:function(itemData, name, format) {
            format =  format || 'YYYY-MM-DD H:mm:ss';
            return itemData.map(item => {  return item[name] = moment(item[name] + 'Z').format(format), item});
        },
        momentFormat: function(date, format){
            format =  format || 'YYYY-MM-DD H:mm:ss';
            return moment(date).format(format);
        },

        getTemp: function(obj){
            if(obj) {
                common.tempObj = Object.assign(common.tempObj, obj); 
            }
            return common.tempObj;
        },
        getWinTop: function(win) {
            while (win.parent != win) {
                win = win.parent;
            }
               return win;
        },
        emit:function(onName, pars) {
            const _onName = onName;
            const _pars = pars;
            setTimeout(function(){
                EventEmitter.emit(_onName, _pars);
            },0)
        },
        CallPhone:function(phone, Create) {
             if(window.opener.callBtn) {
                 return window.opener.callBtn.phoneCallout(phone, Create);
             }
             else {
                  alert('当前无法外呼');
             }
             return false;
        },
        //从父窗体上获取值
        getCrmEntityAttr: function(attr) {
            if(typeof window.parent.Xrm  === 'object') {
                var  value = window.parent.Xrm.Page.getAttribute(attr).getValue();
                if(_.isArray(value)) {
                    return value[0].id;
                }
                return value;
            }
            return "";
        },
        alert: function(message) {
             message = message.replace(/\n\t\r\t/g,'</br>').replace(/\n/g, '</br>').replace(/\r\t/g,'</br>').replace(/\r/g,'</br>');
            var index = layer.msg(message);
           
        },
        info: function(message) {
            message = message.replace(/\n\t\r\t/g,'</br>').replace(/\n/g, '</br>').replace(/\r\t/g,'</br>').replace(/\r/g,'</br>');
            var index = layer.alert(message, {closeBtn:0,title:0,btn:0,shadeClose:1,area: '420px'});
               
        },
        GetBusinessUnit:function() {
            return new Promise(function(resolve, reject){
                if(!common.BusinessUnit) {
                    request.post('AccMgr/OpportunityService.svc/GetBusinessUnit').then(response => {
                    	common.BusinessUnit = response;
                    	resolve(common.BusinessUnit);
                    });
                }
                else {
                	resolve(common.BusinessUnit)
                }
            })
        },
        crmopen:function(id, etc) {
            var org = window.location.protocol + '//' + window.location.host;
            window.open(`${org}/main.aspx?etc=${etc}&extraqs=%3f_gridType%3d${etc}%26etc%3d${etc}%26id%3d%257b${id}%257d&newWindow=true&pagetype=entityrecord`)
        },
        close:function() {
            var id = common.GetQueryString('phonecallid') || common.getTemp().phonecallid;
            if(!id) {
                common.alert('当前未关联工单');
                return;
            }
            layer.confirm('是否完成此次任务', {
              closeBtn:0,
              btn: ['是', '否']
            }, function(index, layero){
               //ayer.close(index)
                request.post('AccMgr/OpportunityService.svc/UpdateWorkOrderComplete1',{phonecallid:id}).then(function(data){
                        if(data.d.returnValue) {
                             window.close();
                        }
                        else {
                            common.alert(data.d.message);

                        }
                       
                });
            });
        },
        getCookie:function(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return '';
        }
}
common.tempObj = Object.assign(common.tempObj, common.parseQueryString());



var ownerid;

var WinTop = common.getWinTop(window);
//测试数据
//WinTop.tempObj = { "entityName": "phonecall","phonecallid":"{8DC0FD4F-BBC4-E511-80D2-00155DC8C126}","questionid":"","phonenumber":"15369330502","phone":"15369330502","callObtype":905290002}


if(!WinTop.USER_GUID) {
    if(WinTop.opener &&  WinTop.opener != WinTop && WinTop.opener.USER_GUID) {
            ownerid = WinTop.opener.USER_GUID;

            if(WinTop.opener.tempObj)
              common.getTemp({'tape': WinTop.opener.tempObj});
            else {
                common.getTemp({'tape': {} });

            }
    
        }
}
else {
    ownerid = WinTop.USER_GUID;
}
if(!ownerid) {
    
    ownerid = common.getCookie('ownerid');
}
if(window.location.host.indexOf('localhost') > - 1) {
    ownerid = 'B0D642E6-4497-E511-80B8-0050568C4DCE';
}
common.getTemp({'ownerid': ownerid});
// if( WinTop!= window) {
//     WinTop.tempObj = common.getTemp();
//     WinTop.EventEmitter = EventEmitter;
// }
if(WinTop.tempObj) {
    //工单窗体
    if(WinTop.tempObj.phonecallid && WinTop.tempObj.entityName === 'phonecall') {

        WinTop.tempObj.callObtype == 905290001 && (common.emit('InboundTabsToProblemFeedbackEvent', WinTop.tempObj.questionid));
    }
    WinTop.tempObj =  Object.assign(common.getTemp(), WinTop.tempObj);
    common.tempObj = WinTop.tempObj;
}

else {
    WinTop.tempObj = common.tempObj;
}

WinTop.EventEmitter = EventEmitter;
export default  common;