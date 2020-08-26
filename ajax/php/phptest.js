let xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject(){
    let xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        try {
            let xmlHttpVersions = [
                'MSXML2.XMLHTTP.6.0',
                'MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];

            for(let i = 0; i < xmlHttpVersions.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(xmlHttpVersions[i])
            }
        } catch (e) {

        }
    }

    if (!xmlHttp){
        alert('Unable to create Ajax obj');
    } else {
        return xmlHttp;
    }
}

function process(){
    if (xmlHttp){
        try {
            xmlHttp.open('GET', 'phptest.php', true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        } catch (e) {
            alert('' + e.toString())
        }

    }
}

function handleRequestStateChange(){
    if (xmlHttp.readyState == 4){
        if (xmlHttp.status == 200){
            try {
                handleServerResponse();
            } catch (e) {
                alert('Can\'t Connect to the server: ' +e.toString());
            }
        } else {
            alert('' + xmlHttp.statusText);
        }
    }

}

function handleServerResponse(){
    // let xmlResponse = xmlHttp.responseXML;
    // let rootDoc = xmlResponse.documentElement;
    // let titleArray = rootDoc.getElementsByTagName('title');
    // let isbnArray = rootDoc.getElementsByTagName('isbn');
    try{
        let jsonResponse = JSON.parse(xmlHttp.responseText);
        console.log(jsonResponse);
        console.log(jsonResponse.books.length);
        let html = '';
        for(let i = 0; i < jsonResponse.books.length; i++){
            html += jsonResponse.books[i].title+ ', ';
            html += jsonResponse.books[i].isbn;
        }
        console.log(html);
        let myDivElement = document.getElementById('myDivElement');
        myDivElement.innerHTML = '<p>Server says: </p>' +html + '<br/>';
    } catch (e) {
      alert('' + e.toString())
    }
}