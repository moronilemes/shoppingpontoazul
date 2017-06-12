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
      if(key == 13 && $('.chat-input').val()!==''){
        if($('.store-name').val()!==''){
          sendStoreChatMessage($('.store-name').val(), $('.chat-input').val());
        } else {
          sendChatMessage(thisChatUser.name, $(this).val());
        }
        $(this).val('');
      }
    });

    $('.chat-button').click(function(){
      if($('.chat-input').val()!==''){
        if($('.store-name').val()!==''){
          sendStoreChatMessage($('.store-name').val(), $('.chat-input').val());
        } else {
          sendChatMessage(thisChatUser.name, $('.chat-input').val());
        }
        $('.chat-input').val('');
      }
    });

    function sendChatMessage(userName, userMesage){
      $('.chat-well').append('<p class="text-warning"><strong>' + userName + ':</strong> '+userMesage+'</p>');
    }

    function sendStoreChatMessage(userName, userMesage){
      $('.chat-well').append('<p class="text-right text-primary"><strong>' + userName + ':</strong> '+userMesage+'</p>');
    }

    window.createChatUser = function createChatUser(){
      $.ajax({
        type: "POST",
        url: '/customer/insert/',
        data: "{'id':'yo'}",
        success: function(response){
          console.log(response);
        },
        dataType: 'json'
      });
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


    $( document ).ajaxStart(function() {
        NProgress.start();
    });

    $( document ).ajaxComplete(function() {
        NProgress.done();
    });

});
