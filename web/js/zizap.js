$(document).ready(function(){
    var thisChatUser;

    $('#myModal').on('show.bs.modal', function () {
      $('#myInput').focus();
      FB.login(function(response) {
        console.log(response);
      }, {scope: 'email'});
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.api('/me?fields=name,email', function(response) {
              console.log(response);
              thisChatUser = response;
          });
        }
      });
    });

    $('.chat-input').keypress(function (e) {
      var key = e.which;
      if(key == 13){
        sendChatMessage($(this).val());
        $(this).val('');
      }
    });

    $('.chat-button').click(function(){
      if($('.chat-input').val()!==''){
        sendChatMessage($('.chat-input').val());
        $('.chat-input').val('');
      }
    });

    function sendChatMessage(userMesage){
      $('.chat-well').append('<p class="text-warning"><strong>'+thisChatUser.name+':</strong> '+userMesage+'</p>');
    }

    function sendStoreChatMessage(userMesage){
      $('.chat-well').append('<p class="text-right text-primary"><strong>'+thisChatUser.name+':</strong> '+userMesage+'</p>');
    }

    //window.thisUserID = $('.this-user-id').html().trim();

    window.showAlertError = function showAlertError(message){
        new PNotify({
            title: 'Erro no formulário:',
            text: message,
            type: 'error',
            styling: 'bootstrap3'
        });
    };

    window.showSuccessMessage = function showSuccessMessage(message){
        new PNotify({
            title: 'Tudo certo!',
            text: message,
            type: 'success',
            styling: 'bootstrap3'
        });
    };

    window.testInputMaxLength = function testInputMaxLength(inputField, length){

        typedValue = $(inputField).val();

        if (typedValue.length >= length){
            $(inputField).val(typedValue.substring(0, length-1));
        }
    };

    // Returns formatted date with the offset option to push on or back a date
    window.getMyDateTime = function getMyDateTime(offset = 0){

        myDate = new Date((new Date()).valueOf() + (offset)*1000*3600*24);
        str = myDate.toISOString().split('.')[0]+"Z" ;
        return str;

    };

    window.getNormalDateTime = function getNormalDateTime(dateSent, offset = 0){
        //myDate = new Date(dateSent);
        myDate = new Date((new Date(dateSent)).valueOf() + (offset)*1000*3600*24);
        return myDate.toLocaleDateString();
    };

    window.getInternationalDateTime = function getNormalDateTime(dateSent, offset = 0){
        //myDate = new Date(dateSent);
        myDate = new Date((new Date(dateSent)).valueOf() + (offset)*1000*3600*24);
        return myDate.toISOString().split('T')[0];
    };

    try {
        var options = {
          legend: false,
          responsive: false
        };

        new Chart(document.getElementById("canvas1"), {
            type: 'doughnut',
            tooltipFillColor: "rgba(51, 51, 51, 0.55)",
            data: {
                labels: [
                    "Symbian",
                    "Blackberry",
                    "Other",
                    "Android",
                    "IOS"
                ],
                datasets: [{
                    data: [15, 20, 30, 10, 30],
                    backgroundColor: [
                        "#BDC3C7",
                        "#9B59B6",
                        "#E74C3C",
                        "#26B99A",
                        "#3498DB"
                    ],
                    hoverBackgroundColor: [
                        "#CFD4D8",
                        "#B370CF",
                        "#E95E4F",
                        "#36CAAB",
                        "#49A9EA"
                    ]
                }]
            },
            options: options
        });

    }
    catch(err){
        console.warn('No chart here.');
    }





    // Text Area WYSIWYG

    function initToolbarBootstrapBindings() {
      var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
          'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
          'Times New Roman', 'Verdana'
        ],
        fontTarget = $('[title=Font]').siblings('.dropdown-menu');
      $.each(fonts, function(idx, fontName) {
        fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
      });
      $('a[title]').tooltip({
        container: 'body'
      });
      $('.dropdown-menu input').click(function() {
          return false;
        })
        .change(function() {
          $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
        })
        .keydown('esc', function() {
          this.value = '';
          $(this).change();
        });

      $('[data-role=magic-overlay]').each(function() {
        var overlay = $(this),
          target = $(overlay.data('target'));
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
      });

      if ("onwebkitspeechchange" in document.createElement("input")) {
        var editorOffset = $('#editor').offset();

        $('.voiceBtn').css('position', 'absolute').offset({
          top: editorOffset.top,
          left: editorOffset.left + $('#editor').innerWidth() - 35
        });
      } else {
        $('.voiceBtn').hide();
      }
    }

    function showErrorAlert(reason, detail) {
      var msg = '';
      if (reason === 'unsupported-file-type') {
        msg = "Unsupported format " + detail;
      } else {
        console.log("error uploading file", reason, detail);
      }
      $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }

    initToolbarBootstrapBindings();

    $('#editor').wysiwyg({
        fileUploadError: showErrorAlert
    });

    window.prettyPrint;
    prettyPrint();

    $( document ).ajaxStart(function() {
        NProgress.start();
    });

    $( document ).ajaxComplete(function() {
        NProgress.done();
    });

});
