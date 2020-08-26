let xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject(){
        let xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            let xmlHttpVersion = ['MSXML2.XMLHTTP.6.0',
                'MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'];

            for (let i = 0; i < xmlHttpVersion.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(xmlHttpVersion[i]);
            }
        }catch (e) {

        }
    }

    if (!xmlHttp){
        alert('Error creating the xmlHttp Object');
    } else {
        return xmlHttp;
    }
}

function process(){
    if (xmlHttp){
        try {
            xmlHttp.open('GET', 'async.txt', true);
            xmlHttp.onreadystatechange = setTimeout('handleRequestStateChange()',1000);

            xmlHttp.send(null);
            document.body.style.cursor = 'wait';
        } catch (e) {
            alert('A server error occured: ' + e.toString());
            document.body.style.cursor = 'default';
        }
    }
}

function handleRequestStateChange(){
    let myDivElement = document.getElementById('myDivElement');

    if (xmlHttp.readyState == 1){
        myDivElement.innerHTML += 'Request status: 1 (loading)<br>';
    } else if (xmlHttp.readyState == 2){
        myDivElement.innerHTML += 'Request status: 2 (load)<br>';
    } else if (xmlHttp.readyState == 3){
        myDivElement.innerHTML += 'Request status: 3 (interactive) <br>';
    } else if (xmlHttp.readyState == 4){


        if (xmlHttp.status == 200){
            try {
                let responseText = xmlHttp.responseText;
                myDivElement.innerHTML += 'Request status: 4 (complete) <br>';
                myDivElement.innerHTML += 'Server said: ' + responseText;
            } catch (e) {
                alert('Error reading the response: ' + e.toString());
            }
        }else {
            alert('There was a problem retrieving the data: ' + xmlHttp.statusText);
            document.body.style.cursor = 'default';
        }
        if (xmlHttp.readyState == 4){
            document.body.style.cursor = 'default';
        }

    }
}