let xmlHttp = createXMLHttpRequestObject();

function createXMLHttpRequestObject(){
    let xmlHttp;

    try{
        xmlHttp = new XMLHttpRequest();
    }catch (e) {
        try {
            let xmlHttpVersion = [
                'MSXML2.XMLHTTP.6.0',
                'MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP.2.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHttp'
            ];

            for(let i =0; i < xmlHttpVersion.length && !xmlHttp; i++){
                xmlHttp = new ActiveXObject(xmlHttpVersion[i]);
            }
        } catch (e) {
            alert('Error crating xmlHttp object' + e.toString());
        }
    }

    if (!xmlHttp){
        alert('Unable to create xmlHttp object');
    } else {
        return xmlHttp;
    }
}

function process(){
    if (xmlHttp){
        try {
            xmlHttp.open('GET', 'books.xml', true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send(null);
        } catch (e) {
            alert('Unable to resolve the server: ' + e.toString());
        }
    } else {
        alert('')
    }
}

function handleRequestStateChange() {
    if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0){
        if (xmlHttp.status == 200){
            try{
                handleServerResponse();
            } catch (e) {
                alert('Error reading the response ' + e.toString());
            }
        }
    } else {
        alert('Error retrieving the data '  + xmlHttp.responseText);
    }
}

function handleServerResponse(){
    let xmlResponse = xmlHttp.responseXML;
    let xmlRoot = xmlResponse.documentElement;

    let titleArray = xmlRoot.getElementsByTagName('title');
    let isbnArray = xmlRoot.getElementsByTagName('isbn');

    let html = '';
    for (let i = 0; i < titleArray.length; i++){
        html += titleArray.item(i).firstChild.data + ', '+ isbnArray.item(i).firstChild.data + '<br/>';
    }

    let myDivElement = document.getElementById('myDivElement');
    myDivElement.innerHTML = '<p>Server says: </p>' + html;
}
function createXmlDocument(){
    let xmlDoc;

    if (document.implementation && document.implementation.createDocument){
        xmlDoc = document.implementation.createDocument("", "", null);
    } else if (window.ActiveXObject){
        xmlDoc  = new ActiveXObject('Microsoft.XMLDOM');
    }

    if (!xmlDoc){
        alert ('Error creating xml document');
    } else {
        return xmlDoc;
    }
}

function Table(col, row){
    // this.row = row;
    // this.col = col;
    let _row = row;
    let _col = col;
     this. getCellCount = function () {
         return _row * _col
     }
}

// Table.prototype.getCellCount = function(){
//     return _row * _col;
// }
//  function getCellCount(){
//     return _row * _col;
//  }
let tableOne = new Table(3, 5);
let tableTwo = new Table(3,5);
console.log(tableOne.getCellCount());

// tableOne.getCellCount = function(){
//     return _row * _col + 1;
// }
// console.log('Table One: '+tableTwo.getCellCount());
// console.log('Table Two: ' + tableOne.getCellCount());
//
// Table.SQUARESIZE = 2;
// Table.getSquareSize = function(){
//     return new Table(Table.SQUARESIZE, Table.SQUARESIZE);
// }
//
// let t3 = Table.getSquareSize();
// alert(t3.getCellCount());