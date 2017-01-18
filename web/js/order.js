$(document).ready(function(){
    
    // ORDERS LIST PAGE
    
    var productionToken = 'L118564309EG1480611916093R1250720512';
    var sandboxToken = 'LG1484315269910R-224861608';
    var orderURL = 'http://sandbox-api.anymarket.com.br/v2/orders?gumgaToken=' + sandboxToken + '&limit=20';
    var nextOrderURL;
    var previousOrderURL;
    var thisOrderID;
    
    
    function updateOrderList(url){
        $.ajax({
            url: url,
            dataType: 'json',        
            success: function (data) {
                console.log(data);
                $('.order-list').hide();
                //console.log(data['links'][0]['href']);                
                try{ 
                    nextProductsURL = data['links'][0]['href'];
                    previousProductsURL = data['links'][1]['href'];
                }
                catch(err) { 
                    nextProductsURL = data['links'][0]['href'];
                    previousProductsURL = orderURL;
                }
               
                $.each(data['content'], function() {           
                    
                    try {
                        $('.order-list').append(
                            "<tr class='odd pointer'>" +
                                "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                                "<td class=''>" + this.marketPlace + "</td>" +
                                "<td class=''><a href='#' class='btn-order-detail' data-id='" + this.id + "'>" + this.id + "</a></td>" +
                                "<td class=''>" + this.items[0]['product']['title'] + "</td>" +
                                "<td class=''>" + this.buyer['name'] + "</td>" +
                                "<td class=''>" + this.gross + "</td>" + 
                                "<td class=''>" + this.gross + "</td>" +
                                "<td class=''>" + this.createdAt + "</td>" +
                                "<td class=''>" + this.status + "</td>" +
                                "<td class='a-right a-right'><button class='btn btn-default' type='submit'>NF</button></td>" +
                                "<td class='last'><button class='btn btn-default btn-order-detail' data-id='" + this.id + "' type='submit'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></button></td>" +
                            "</tr>" 
                        );
                    }
                    catch(err){
                        console.log('Error in product');
                    }

                   //console.log(this);
                    $('.order-list').fadeIn();
               });
           }
       });        
    };
    
    function openOrderDetail(orderID){
        
        thisOrderID = orderID;
        
        $('.modal').modal('hide');
        
        orderURL = 'http://sandbox-api.anymarket.com.br/v2/orders/' + orderID + '?gumgaToken=' + sandboxToken;
        
        $.ajax({
            url: orderURL,
            dataType: 'json',        
            success: function (data) {
                console.log(data);                
                $('.order-detail-info').empty();
                
                $('.orderID').append(data['id']);
                $('.order-channel').append(data['marketPlace']);
                $('.order-date').append(data['createdAt']);
                $('.order-payment-date').append(data['paymentDate']);
                $('.order-payment-status').append(data['payments'][0]['status']);
                $('.order-payment-value').append('xxxxxxx');
                $('.order-stalments-number').append('xxxxxxx');
                $('.order-marketplace-status').append(data['marketPlaceStatus']);                
                $('.order-shipment-type').append(data['deliverStatus']);
                $('.order-customer-name').append(data['buyer']['name']);
                $('.order-customer-document').append(data['buyer']['document']);
                $('.order-customer-email').append(data['buyer']['email']);                
                $('.order-customer-phone').append(data['buyer']['phone']);
                $('.order-customer-address').append(data['shipping']['address']);
                $('.order-customer-city').append(data['shipping']['city']);                
                $('.order-customer-postal-code').append(data['shipping']['zipCode']);
                
                if (data['payments'][0]['method'].toLowerCase() === 'credicard'){
                    data['payments'][0]['method'] = 'mastercard';
                }
                $('.order-payment-method').append("<img src='/images/" + data['payments'][0]['method'].toLowerCase() + ".png' alt='" + data['payments'][0]['method'] + "'>");
                
                $('.modal').modal('show');
                
                $.each(data['items'], function(index) {                    
                    try {
                        $('.order-detail-item-list').append(
                            "<tr>" + 
                                "<td>" + this.amount + "</td>" + 
                                "<td>" + this.product['title'] + "</td>" + 
                                "<td>" + this.sku['partnerId'] + "</td>" + 
                                "<td>" + this.total + "</td>" +
                            "</tr>"
                        );
                    }
                    catch(err){
                        console.log('Error in order.');
                    }
                });
                
            }
        }); 
        
    };
    
    function updateStatusSetPaid(orderID){ // ok
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"PAID_WAITING_SHIP\"\r\n}",
            success : function (response) {
                console.log('Order #' + orderID + ' new status: PAID');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetInvoiced(orderID, numberNF){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"INVOICED\",\r\n  \"invoice\": {\r\n    \"series\": \"3\",\r\n    \"number\": \"431\",\r\n    \"accessKey\": \"00000000000000000000000000000000000000000000\",\r\n    \"installments\": 7,\r\n    \"date\": \"2017-01-15T19:01:58Z\"\r\n  }\r\n}",
            success : function (response) {
                console.log(response);
                console.log('Order #' + orderID + ' new status: INVOICED');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetTransit(orderID){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"PAID_WAITING_SHIP\"\r\n}",
            success : function (response) {
                console.log('Order #' + orderID + ' new status: PAID');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetDelivered(orderID){ // ??
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{ \"order_id\": " + orderID + "," +
                    "\"status\": \"PAID_WAITING_DELIVERY\", " +
                    "\"tracking\": " +
                    "{ \"date\": \"2017-01-17T11:42:53Z\", " +
                    "\"deliveredDate\": \"2017-01-17T11:42:53Z\", " +
                    "\"carrier\": \"Correios Correios-Sedex\", " +
                    "\"number\": \"999988800001BR\", " +
                    "\"url\": \"http://www.example.com.vr\" }}",
            success : function (response) {
                console.log('Order #' + orderID + ' new status: DELIVERED');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetFinished(orderID){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"PAID_WAITING_SHIP\"\r\n}",
            success : function (response) {
                console.log('Order #' + orderID + ' new status: PAID');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetCancelled(orderID){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/orders/" + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"CANCELED\"\r\n}",
            success : function (response) {
                console.log(response);
                console.log('Order #' + orderID + ' new status: PAID');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    
    //--------------------------------------------------------//

    if ($('tbody').hasClass('order-list')){
        updateOrderList(orderURL);
    }
    
    //updateStatusSetPaid("4827");
    //updateStatusSetInvoiced(4812, "00000000000000000000000000000000000000000000");
    //updateStatusSetDelivered(4811);
    //updateStatusSetCancelled('4814');

    // Pagination
    $('.btn-order-list-next').click(function(){
        $('.order-list').empty();
        updateOrderList(nextOrderURL);
    });
    
    $('.btn-order-list-previous').click(function(){
        $('.order-list').empty();
        updateOrderList(previousOrderURL);
    });
    
    // Opens order detail modal
    $( ".order-list " ).on( "click", "tr td .btn-order-detail", function() {
        openOrderDetail($(this).text());
    });
    
        
    $('.btn-order-update-paid').click(function(){        
        console.log('PAID_WAITING_SHIP');
        updateStatusSetPaid(thisOrderID);        
    });
    
    $('.btn-order-update-invoiced').click(function(){        
        console.log('INVOICED');
        updateStatusSetInvoiced(thisOrderID, "00000000000000000000000000000000000000000000");
    });
    
    $('.btn-order-update-transit').click(function(){        
        console.log('PAID_WAITING_DELIVERY');
    });
    
    $('.btn-order-update-delivered').click(function(){        
        console.log('PAID_WAITING_DELIVERY 2');
        updateStatusSetDelivered(thisOrderID);
    });
    
    $('.btn-order-update-finished').click(function(){        
        console.log('CONCLUDED');
    });
    
    $('.btn-order-update-canceled').click(function(){        
        console.log('CANCELED');
        updateStatusSetCancelled(thisOrderID);
    });
    
});