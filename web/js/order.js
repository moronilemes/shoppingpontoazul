$(document).ready(function(){
    
    // ORDERS LIST PAGE
    var sandboxURL = 'http://sandbox-api.anymarket.com.br/v2/orders/';
    var sandboxToken = 'LG1484315269910R-224861608';
    var productionURL = 'http://api.anymarket.com.br/v2/orders/';
    var productionToken = 'L118564309EG1480611916093R1250720512';
     
    var baseURL = sandboxURL;
    var tokenChosen = sandboxToken;

    var orderListLimit = 20;
    var orderListOffset = 0;
    var orderListTotalElements;
    var thisOrderID;
    var orderDetailMode;
    var orderPaginationQuantity;
    var orderPaginationPosition;
    var orderStartDate;
    var orderEndDate;
    
    var orderCounter = 0;
    
    function orderDashBoardStat(){
        $.ajax({
            url: baseURL  + '?limit=' + orderListLimit + '&offset=' + orderListOffset,
            dataType: 'json',  
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                               
                $.each(data['content'], function() {
                    try {  
                        console.log(this.createdAt);
                        console.log(Date(this.createdAt));
                        
                        orderCounter++;                 
                    }
                    catch(err){
                        console.log('Error in product');
                    }
               });
               
               console.log(orderCounter);
               
           }
       });
    }
    
    function updateOrderList(){
        
        $('.order-list').hide();
        
        $.ajax({
            url: baseURL  + '?limit=' + orderListLimit + '&offset=' + orderListOffset,
            dataType: 'json',  
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log(data);
                
                //console.log(data['links'][0]['href']);  
               
                $.each(data['content'], function() {           
                    
                    try {
                        
                        if (orderStartDate !== undefined && orderEndDate !== undefined){
                            console.log('Início: ' + Date(orderStartDate) + ' Fim: ' + Date(orderEndDate) + ' Pedido: ' + this.createdAt);
                            if (Date(this.createdAt) >= Date(orderStartDate) && Date(this.createdAt) <= Date(orderEndDate)){
                                console.log('está dentro');
                            } else {
                                console.log('não está dentro');
                            }
                        }
                        
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
    
    function openOrderDetail(){        
        
        $('.modal').modal('hide');
        
        $.ajax({
            url: baseURL + thisOrderID,
            dataType: 'json',   
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log(data);   
                console.log('status: ' + data['status']);
                
                switch(data['status']) {
                    case 'PENDING':
                        console.log(1);
                        $('#step-1').removeClass('disabled');
                        $('#step-1').removeClass('enabled');
                        break;
                    case 'PAID_WAITING_SHIP':
                        console.log(2);
                        $('#step-2').removeClass('disabled');
                        $('#step-2').removeClass('enabled');
                        break;
                    case 'PAID_WAITING_SHIP':
                        console.log(1);
                        $('#step-3').removeClass('disabled');
                        $('#step-3').removeClass('enabled');
                        break;
                    case 'PAID_WAITING_SHIP':
                        console.log(1);
                        $('#step-4').removeClass('disabled');
                        $('#step-4').removeClass('enabled');
                        break;
                    case 'PAID_WAITING_SHIP':
                        console.log(1);
                        $('#step-5').removeClass('disabled');
                        $('#step-5').removeClass('enabled');
                        break;
                    case 'CONCLUDED':
                        console.log(6);
                        $('#step-6').removeClass('disabled');
                        $('#step-6').removeClass('enabled');
                        break;
                    default:
                        console.log(data['marketPlaceStatus']);
                }
                
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
    
    function updateStatusSetPaid(){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + thisOrderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + thisOrderID + "\",\r\n  \"status\": \"PAID_WAITING_SHIP\"\r\n}",
            success : function (response) {
                console.log(response);
                openOrderDetail();
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
    
    //-----------------------------------------
    //------------// Datepicker //-------------
    //-----------------------------------------
    try{
    
    var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        //$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    };

    var optionSet1 = {
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: '12/31/2017',
        dateLimit: {
            days: 60
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
            'Hoje': [moment(), moment()],
            'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
            'Este Mês': [moment().startOf('month'), moment().endOf('month')],
            'Mês Passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'DD/MM/YYYY',
        separator: ' até ',
        locale: {
            applyLabel: 'OK',
            cancelLabel: 'Limpar',
            fromLabel: 'A partir',
            toLabel: 'Até',
            customRangeLabel: 'Personalizado',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            firstDay: 1
        }
    };
    
    $('#reportrange span').html(moment().subtract(29, 'days').format('DD/MM/YYYY') + ' - ' + moment().format('DD/MM/YYYY'));
    $('#reportrange').daterangepicker(optionSet1, cb);
    $('#reportrange').on('show.daterangepicker', function() {
        console.log("show event fired");
    });
    $('#reportrange').on('hide.daterangepicker', function() {
        console.log("hide event fired");
    });
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        orderStartDate = picker.startDate.format('YYYY/MM/DD');
        orderEndDate = picker.endDate.format('YYYY/MM/DD');
        updateOrderList();
        console.log("apply event fired, start/end dates are " + picker.startDate.format('DD/MM/YYYY') + " to " + picker.endDate.format('DD/MM/YYYY'));
    });
    $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
        console.log("cancel event fired");
    });
    $('#options1').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
    });
    $('#options2').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
    });
    $('#destroy').click(function() {
        $('#reportrange').data('daterangepicker').remove();
    });
    } 
    catch(err){
        console.log(err);
    }
    
    
    //--------------------------------------------------------//
    
    
    //orderDashBoardStat();
    

    if ($('tbody').hasClass('order-list')){
        updateOrderList();
    }
    
    $('.order-modal-lg').on('hide.bs.modal', function (e) {
        if ($('tbody').hasClass('order-list')){
            updateOrderList();
        };
    });
      
    // Opens order detail modal
    $( ".order-list " ).on( "click", "tr td .btn-order-detail", function() {
        thisOrderID = $(this).text();
        openOrderDetail();
    });    
        
    $('.btn-order-update-paid').click(function(){        
        console.log('PAID_WAITING_SHIP');
        updateStatusSetPaid();        
    });
    
    $('.btn-order-update-invoiced').click(function(){        
        console.log('INVOICED');
        updateStatusSetInvoiced("00000000000000000000000000000000000000000000");
    });
    
    $('.btn-order-update-transit').click(function(){        
        console.log('PAID_WAITING_DELIVERY');
    });
    
    $('.btn-order-update-delivered').click(function(){        
        console.log('PAID_WAITING_DELIVERY 2');
        updateStatusSetDelivered();
    });
    
    $('.btn-order-update-finished').click(function(){        
        console.log('CONCLUDED');
    });
    
    $('.btn-order-update-canceled').click(function(){        
        console.log('CANCELED');
        updateStatusSetCancelled();
    });
    
    $('.status-step').hover(function(){
        //$(this).effect('highlight');
    });    
});