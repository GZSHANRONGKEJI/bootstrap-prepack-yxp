import 'isomorphic-fetch';

export function readData(url,data) {

    return fetch(url, {
        method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:JSON.stringify(data || {})
        })
        .then( response => {

            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then( response => {
            return response.json();
        });
}
export const request =  {
    contentType:window.location.host.indexOf('localhost') > - 1 ? "application/x-www-form-urlencoded; charset=UTF-8" : "application/json; charset=UTF-8",
    url: window.location.host.indexOf('localhost') > - 1 ? "http://localhost:54375/Handler.ashx?url=" : location.protocol + '//' + location.host + '/isv/wcf/',
   // url: window.location.host.indexOf('localhost') > - 1 ? "http://crm.xin.com:8080/Handler.ashx?url=" : location.protocol + '//' + location.host + '/isv/wcf/',
    //url:"http://localhost:54375/",
    post: function(url,data,async = 1) {
        return $.ajax({
            //url: request.url+url,
            url:request.url + url,
            type: "post",
            datatype: "json",
            async:!!async,
            crossDomain:true,
            contentType:request.contentType,
            data:JSON.stringify(data) || {}
        });
    },
    jsonp: function(url, data, async = 1) {
        if(_.isObject(data))
        {
            data = $.param(data);
        }
        return  $.ajax({
        url: url + "?" + data, 
        type: 'GET',
        async:!!async,
        dataType: 'JSONP',
       
    });

    }

}
// export request;
