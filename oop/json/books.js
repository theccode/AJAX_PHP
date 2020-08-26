let xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject(){
    let xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    }catch (e) {
        try {
            let xmlVersion = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP']
            for (let i = 0; i < xmlVersion.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(xmlVersion[i]);
            }
        } catch (e) {

        }
    }

    if (!xmlHttp){
        alert('Unable to create xmlHttp Object');
    } else {
        return xmlHttp;
    }
}

function process(){
    // let xmlHttp;
    if (xmlHttp){
        try {
            xmlHttp.open('GET', 'books.txt', true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
            document.body.style.cursor = 'Wait'
        } catch (e) {
            alert('Can\'t connect to the server: ' + e.toString());
        }
    }
}

function handleRequestStateChange(){
    if (xmlHttp.readyState == 4){
        if (xmlHttp.status == 200){
            try {
                handleServerResponse();
            } catch (e) {
                alert('Error: ' + e.toString())
            }
        } else {
            alert('Error: Bad Request' + xmlHttp.statusText);
        }
    } else {
        alert('Error: Not Ready!')
    }
    document.body.style.cursor = 'default';
}

function handleServerResponse(){
    let jsonResponse = eval('(' + xmlHttp.responseText + ')');

    let html = '';

    for (let i = 0; i < jsonResponse.books.length; i++){
        html += jsonResponse.books[i].title + ', ' + jsonResponse.books[i].isbn + '<br/>';
    }

    let myDivElement = document.getElementById('myDivElement');
    myDivElement.innerHTML = '<p>Server says: </p>'  + html;
}