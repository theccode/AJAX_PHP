/*
XmlHttp constructor can receive request settings
ulr - server url
Content-Type: request content type
type: request type. default: GET
data: optional request params
async: Whether request is asynchronous. default: true
showErrors: display errors
complete: the callback function to call when the request completes.
 */

function XmlHttp(settings){
    //store the settings object in a class property.
    this.settings = settings;


    //override default settings with those received as parameter.
    //the default url points to the current page
    let url = location.href;

    if (settings.url){
        url = settings.url;
    }

    //the default content type is the content type for forms.
    let contentType = 'application/x-www-form-urlencoded';
    if (settings.contentType){
        contentType = settings.contentType;
    }

    //By default request type is GET;
    let type = "GET";
    if(settings.type){
        type = settings.type;
    }

    //By default data is null. No parameters are sent
    let data = null;
    if (settings.data){
        data = settings.data;

        if (type == 'GET'){
            url = url + '?' + data;
        }
    }
    //By default postback is asynchronous
    let async = true;
    if (settings.async){
        async = settings.async;
    }

    //by default all infrastructure errors are shown
    let showErrors = true;
    if (settings.showErrors){
        showErrors = settings.showErrors;
    }

    let xmlHttp = XmlHttp.create();

    xmlHttp.open(type, url, async);
    xmlHttp.onreadystatechange = onreadystatechange;
    xmlHttp.setRequestHeader('Content-Type', contentType);
    xmlHttp.send(data)
    
    function  displayErrors(message) {
        if (showErrors){
            alert('Errors encountered: \n' + message);
        }
    }

    function readResponse(){
        let response;
        try {
            //retrieve the response content type
            let contentType = xmlHttp.getResponseHeader('Content-Type');
            //if the response is json, build the json type
            if (contentType == 'application/json'){
                response = JSON.parse(xmlHttp.responseText);
            }
            //if the response is xml, build the xml type
            else if (contentType == 'text/xml'){
                response = xmlHttp.responseXML;
            }
            //by default the response is plain text
            else{
                response = xmlHttp.responseText;
            }
            //call the callback function if any
            if (settings.complete){
                settings.complete(xmlHttp, response, xmlHttp.status);
            }
        } catch (e) {
            //display error message
            displayErrors(e.toString());
        }
    }

    //called when the request state changes
    function onreadystatechange(){
        //when ready state is 4, we read the server response;
        if (xmlHttp.readyState == 4){
            //continue only if HTTP is 'OK'
            if (xmlHttp.status == 200){
                try {
                    //read the response from the server
                    readResponse();
                } catch (e) {
                    //display error message
                    displayErrors(e.toString());
                }
            }else {
                //display error message
                displayErrors(xmlHttp.statusText);
            }
        }
    }
}
//static method that returns a new XmlHttpRequest Object
XmlHttp.create = function(){
    //will store a reference to the XmlHttpRequest Object
    let xmlHttp;
    //create the XmlHttpRequest Object
    try {
        //assume IE7 or newer or other modern browsers.
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        //cater for older IE as well as current IE
        try {
            let xmlHttpVersions = [
                'MSXML.XMLHTTP.6.0',
                'MSXML.XMLHTTP.5.0',
                'MSXML.XMLHTTP.4.0',
                'MSXML.XMLHTTP.3.0',
                'MSXML.XMLHTTP',
                'Microsoft.XMLHTTP'
            ]
            for (let i = 0; i < xmlHttpVersions.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(xmlHttpVersions[i]);
            }
        } catch (e) {

        }
    }
    //return the created object object or display an error.
    if (!xmlHttp){
        alert('Error creating the XmlHttpRequest Object');
    } else {
        return xmlHttp;
    }
}
