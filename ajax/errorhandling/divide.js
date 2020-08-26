let xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject() {
    let xmlHttp;
    try{
        xmlHttp = new XMLHttpRequest();
    }catch (e) {
        try {
            let httpVersions = [
                'MSXML.XMLHTTP.6.0',
                'MSXML.XMLHTTP.5.0',
                'MSXML.XMLHTTP.4.0',
                'MSXML.XMLHTTP.3.0',
                'MSXML.XMLHTTP',
                'Microsoft.XMLHTTP',
            ];
            for (let i = 0; i < httpVersions.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(httpVersions[i]);
            }
        } catch (e) {
            
        }
    }
    if (!xmlHttp){
        alert('Error creating Http Request');
    } else {
        return xmlHttp;
    }
}

function process(){
    if (xmlHttp){
        try {
            let firstNumber = document.getElementById('firstNumber').value;
            let secondNumber = document.getElementById('secondNumber').value;
            
            let params = 'firstNumber=' + firstNumber + '&secondNumber=' + secondNumber;
            
            xmlHttp.open('GET', 'divide.php?' + params, true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        } catch (e) {
            alert('Error: ' + e.toString());
        }
    }
}

function  handleRequestStateChange() {
    if (xmlHttp.readyState == 4){
        if (xmlHttp.status == 200){
            try{
                handleServerResponse();
            } catch (e) {
                alert('Error: ' + e.toString())
            }
        } else{
            alert('Request Status Error: ' + xmlHttp.statusText);
        }
    } else {

    }
}

function  handleServerResponse() {
    let xmlResponse = xmlHttp.responseXML;

    if (!xmlResponse || !xmlResponse.documentElement){
        throw ('Invalid XML structure ' + xmlHttp.responseText);
    }

    let xmlRootNodeName = xmlResponse.documentElement.nodeName;
    if (xmlRootNodeName == "parsererror"){
        throw ('Invalid XML structure ' + xmlHttp.responseText);
    }

    let xmlRoot = xmlResponse.documentElement;
    if (xmlRootNodeName != 'response' || !xmlRoot.firstChild){
        throw  ('Invalid XML structure: ' + xmlHttp.responseText);
    }

    let responseText = xmlRoot.firstChild.data;

    let myDivElement = document.getElementById('myDivElement');
    myDivElement.innerHTML = '<p>Server says the answer is: </p>' + responseText + '<br/>';
}