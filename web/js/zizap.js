var thisChatUser;

$(document).ready(function(){



  window.getParam = function getParam(k){
    var p={};
    location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
    return k?p[k]:p;
  }

    $('#myModal').on('show.bs.modal', function () {
      $('#myInput').focus();
      FB.login(function(response) {
        console.log(response);
      }, {scope: 'email'});
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.api('/me?fields=name,email', function(response) {
              console.log(response);
              window.thisChatUser = response;
          });
        }
      });
    });

    $('.chat-input').keypress(function (e) {
      var key = e.which;
      if(key == 13 && $('.chat-input').val()!==''){
        if($('.store-name').val()===''){
          sendChatMessage($('.store-name').val(), $('.chat-input').val());
        } else {
          sendStoreChatMessage(thisChatUser.name, $(this).val());
          createChatUser(thisChatUser.name, thisChatUser.email, $('.chat-input').val(), getParam("id"));
        }
        $(this).val('');
      }
    });

    $('.chat-button').click(function(){
      if($('.chat-input').val()!==''){
        if($('.store-name').val()===''){
          sendChatMessage($('.store-name').val(), $('.chat-input').val());
        } else {
          sendStoreChatMessage(thisChatUser.name, $('.chat-input').val());
          createChatUser(thisChatUser.name, thisChatUser.email, $('.chat-input').val(), getParam("id"));
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

    window.createChatUser = function createChatUser(name1, email1, message1, store1){
      $.post('/customer/insert/', { name: name1,
      email: email1, message : message1, store: store1, phone: ''},
          function(returnedData){
               console.log(returnedData);
      }).fail(function(){
            console.log("error");
      })

      /*
      $.ajax({
        type: 'POST',
        url: '/customer/insert/',
        data: '{"user":"Moroni Test", "message":"cucarachas!", "store":"boot"}',
        error: function(e) {
          console.log(e);
        },
        success: function(response){
          console.log(response);
        },
        dataType: "json",
        contentType: "application/json"
      });*/
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
