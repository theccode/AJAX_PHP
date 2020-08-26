//holds the remote server address
let serverAddress = 'validate.php';
//show detailed error messages
showErrors = true;

function validate(inputValue, fieldId) {
    let data = 'validationType=ajax&inputValue='+inputValue + '&fieldId='+fieldId;

    let settings = {
        url: serverAddress,
        type: 'POST',
        complete: function (xhr, response, status) {
            if (xhr.responseText.indexOf('errNo') > 0 || xhr.responseText.indexOf('error') > 0 ||
            xhr.responseText.length == 0){
                alert(xhr.responseText.length == 0 ? 'Server error':response);
            }
            let result = response.result;
            fieldId = response.fieldid;
            let message = document.getElementById(fieldId + "Failed");
            message.className = (result == '0'?'error': 'hidden');
        },
        data: data,
        showErrors: showErrors
    }

     xmlHttp = XmlHttp(settings);
}

function setFocus(){
    document.getElementById('txtUsername').focus();
}