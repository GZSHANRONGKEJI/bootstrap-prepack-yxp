import { createAction, handleActions } from '../reduxActionsSequence';
import { request } from '../../api/serverApi.js';
import common from '../../common/common.js';
import EventEmitter from '../../common/eventemitter';
const HANDLER_CUSTOMER_SAVE = 'HANDLER_CUSTOMER_SAVE';
const HANDLER_CUSTOMER_LOAD = 'HANDLER_CUSTOMER_LOAD';
const HANDLE_CUSTOMER_CHANGE = 'HANDLE_CUSTOMER_CHANGE';

export const handlerCustomerSave = createAction(HANDLER_CUSTOMER_SAVE, CustomeData => {
     	var Custome = CustomeData;
     	// Custome.name+="0";
     	// return  Custome;
     	Custome.phonenumber = common.GetQueryString('phone');
      Custome.ownerid = common.getTemp().ownerid;
     	var obj  = {};
     	var _request = {};
     	obj.request = Custome ;
    
    	return new Promise(function (resolve,reject) {
        // if(!Custome.phonenumber) {
        //   reject({"message":"缺少手机号码"});
        //   return;
        // }
    		request.post('AccMgr/OpportunityService.svc/CreateOpportunity', obj).then(response => {
        		  const { returnValue, message } = response.d || response;
              if(returnValue) {
                const { req : data } = JSON.parse(message);
                if(!common.getTemp().phone) {
                  common.getTemp({phone: Custome.phone1});
                }
                common.alert('保存成功');
                resolve(Object.assign(data,obj));
              }
              else {
              	reject(response.d);
    		    	}
      		  },error => {
      			   reject(error);
        });
		    // setTimeout(function () {
		    // 		Custome.name+="0";
		    // 		const Data = {
		    // 			name : Custome.name 
		    // 		}
		    //     	resolve(Data);
		    // }, 3000);
		});  
});
export const handlerCustomerLoad = createAction(HANDLER_CUSTOMER_LOAD, CustomeData => {
	  var phone = common.GetQueryString('phone');
    return new Promise((resolve, reject) => {
        
        CustomeData.phone1 = phone;
        common.getTemp({"phone": phone});
        var  requestObj = {}
        requestObj.phonenumber = phone;
        requestObj.ownerid = common.getTemp().ownerid;
        requestObj.directioncode = false;
        requestObj.fromtype = 1; //呼入-通话记录
        requestObj.AreaCode = common.getTemp().AreaCode;
    
          requestObj.uniqueId = common.GetQueryString('uniqueId');
          common.GetBusinessUnit().then(response => {
          const { returnValue, message } = response.d || response;
          if(returnValue) {
            const { req : { businessunitlist } } = JSON.parse(message);
            var phonecallid = common.GetQueryString('phonecallid');
            var iscreate = common.GetQueryString('iscreate');
            if(iscreate === '0') {
              common.getTemp({"phonecallid": ''});
              resolve({"phonecallid": '',LargeArea: businessunitlist});
              return;
            }
            if(!phone) {
                reject({"message":"缺少手机号码"});
                return;
            }
            if(!phonecallid) {

               return request.post('AccMgr/OpportunityService.svc/CreateWorkOrder', { request : requestObj}).then(response => {
                   const { returnValue, message } = response.d || response;
                    if(returnValue) {
                      resolve({"phonecallid": message,LargeArea:businessunitlist});
                      common.getTemp({"phonecallid": message});
                    }
                    else {
                        reject({message : "创建工单失败"});
                    }
                });
            }
            else{
               resolve({"phonecallid": phonecallid,LargeArea: businessunitlist});
            }
          }
          else {
              reject(response.d);
          }
            },error => {
                reject(error);
        });
        
      
    });
    
});
export const handleOnCustomerChange = createAction(HANDLE_CUSTOMER_CHANGE, ( CustomeData,name,value ) => {
		var obj = {} ;
		obj[name] = value; 
		return obj;
});
export default handleActions({

    [HANDLER_CUSTOMER_SAVE]:{
   		start(state, action) {
   			
  	   			let Data = {};
  	   			Data = Object.assign({},state.CustomeData ,{ savestate : "2" });
  	        state = Object.assign({}, state , {  CustomeData : Data });
	           return state;	
   		
   		},
   		next(state, action) {
	   			let Data = {};
	   			Data = Object.assign({},state.CustomeData , { savestate : "1" }, action.payload  );
	        state = Object.assign({}, state , {  CustomeData : Data });
          common.emit('onCustomerVipChangeEnvent', common.getTemp().phone); 
	        return state;	
   		},
   		throw(state, action) {
   			
   			if(state.CustomeData) {
	   			let Data = {};
	   			Data = Object.assign({},state.CustomeData ,{ savestate : "1" });
	        	state = Object.assign({}, state , {  CustomeData : Data });
	        	common.alert(action.payload.message);
	        }
	       return state;	
   		},
    },
    [HANDLER_CUSTOMER_LOAD]:  {
      start(state, action) {
            return state;
        },
        next(state, action) {
            state.LargeArea = action.payload.LargeArea;
            state.CustomeData.phonecallid = action.payload.phonecallid;
            state.CustomeData = Object.assign({}, state.CustomeData);
            state = Object.assign({},state);
            common.emit('onCustomerVipChangeEnvent', common.getTemp().phone); 
            common.emit('onCallRecordsChangeEnvent', common.getTemp().phone);
            common.emit('onQuestionHistoryChangeEnvent', common.getTemp().phone);
            return state;
        },
        throw (state, action) {
            // if(state.CustomeData)
            //   alert(action.payload.message || action.payload.statusText);
            common.alert(action.payload.message);
            return state;
        }
    },
   	[HANDLE_CUSTOMER_CHANGE]: (state, action) => {
   		if(state.CustomeData) {
   			let Data = {};
        if(action.payload.businesstype != undefined) {
            action.payload.customertype = ""; 
        }
   			Data = Object.assign({},state.CustomeData ,action.payload);
        state = Object.assign({}, state , {  CustomeData : Data });
   		}

        return state;
    }


}, {});
