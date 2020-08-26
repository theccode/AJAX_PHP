$(function(){
    $('#upload').on('click', function(e){
        // e.preventDefault();
        doUpload();
    })
    $('#uploadprogress').hide();
})

function doUpload(){
    let iframe;
    try {
        iframe = document.createElement('<iframe name="uploadiframe">');
    } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = 'uploadiframe';
    }

    iframe.src = 'javascript:false';
    iframe.id = 'uploadiframe';
    iframe.className = 'iframe';
    document.body.appendChild(iframe);

    $('#form').attr('target', 'uploadiframe');
    $('#uploadform').hide();
    $('#uploadprogress').show();

    $('#uploadiframe').load(function () {
        $('#uploadprogress').hide();
        $('#uploadform').show();
        let $result = $('body', this.contentWindow.document).html();
        console.log($result);
        if ($result == 1){
            $('#result').html('The file upload was successful!');
        } else {
            $('#result').html('There was an error while uploading the file!')
        }
        setTimeout(function () {
            $('#uploadiframe').remove();
        }, 50)
    })
}