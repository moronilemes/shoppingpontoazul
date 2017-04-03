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
    window.thisOrderObject = [];
    var orderDetailMode;
    var orderPaginationQuantity;
    var orderPaginationPosition;
    // Loads last week's orders as new pageload
    window.orderStartDate = '&createdAfter=' + getInternationalDateTime(Date(),-7) + 'T00:00:00Z';
    window.orderEndDate = '&createdBefore=' + getInternationalDateTime(Date()) + 'T23:59:59Z';
    
    var orderCounter = 0;
    
    window.verifyOwnership = function verifyOwnership(anyProductID){
        $.ajax({
            type: 'GET',
            url: '/product/owner/',
            data: { "anymarket_id": anyProductID },
            dataType: 'text',
            success: function(data){
                $.each(JSON.parse(data), function(){
                    
                    console.log(this.user_id);
                    return this.user_id;
//                    console.log (this.user_id + ' === ' + window.thisUserID);
//                    
//                    if (this.user_id === window.thisUserID){
//                        return true;
//                    } else {
//                        return false;
//                    }
                });
            },
            fail: function(data){
                console.log(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    }
        
    function displayStatus(label){
        if (label === 'PENDING'){
            return 'Pendente';
        } else if (label === 'PAID_WAITING_SHIP'){
            return 'Pago';
        } else if (label === 'INVOICED'){
            return 'Faturado';
        } else if (label === 'PAID_WAITING_DELIVERY'){
            return 'Em trânsito';
        } else if (label === 'DELIVERED'){
            return 'Enviado';
        } else if (label === 'CONCLUDED'){
            return 'Finalizado';
        } else if (label === 'CANCELED'){
            return 'Cancelado';
        }
    }
    
    function displayNextStatus(rowItemID, label){
        
        if (label === 'PENDING'){
            return "<button class='btn btn-default btn-action btn-order-update-paid' data-id='" + rowItemID + "' data-action='update-set-paid' type='submit'>Pagar</button>";
        } else if (label === 'PAID_WAITING_SHIP'){
            return "<button class='btn btn-default btn-action' data-id='" + rowItemID + "' data-action='update-set-invoiced' type='submit'>Faturar</button>";
        } else if (label === 'INVOICED'){
            return "<button class='btn btn-default btn-action' data-id='" + rowItemID + "' data-action='update-set-transit' type='submit'>Enviar</button>";
        } else if (label === 'PAID_WAITING_DELIVERY'){
            return "<button class='btn btn-default btn-action' data-id='" + rowItemID + "' data-action='update-set-delivered' type='submit'>Entregar</button>";
        } else if (label === 'DELIVERED'){
            return "<button class='btn btn-default btn-action' data-id='" + rowItemID + "' data-action='update-set-finished' type='submit'>Finalizar</button>";
        } else {
            return "N/A";
        }
    }
       
    function updateOrderList(){
        
        $('.order-list').hide();
       
        $.ajax({
            url: baseURL  + '?limit=' + orderListLimit + '&offset=' + orderListOffset + orderStartDate + orderEndDate,
            dataType: 'json',  
            cache: false, 
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log(data);
               
                $.each(data['content'], function() {
                    
                    thisOrderRow = this;
                    
                    try {
                        orderCreatedAt = new Date(this.createdAt);
                        thisStatus = this.status;
                        try {
                            if(typeof this.tracking.deliveredDate !== "undefined" && this.status !== 'CONCLUDED'){
                                thisStatus = 'DELIVERED';
                            }
                        }
                        catch(e){
                            null;
                        }
                        
                        //console.log(this.items[0]['product']['id']);
                        //console.log(verifyOwnership(this.items[0]['product']['id']) + ' === ' + thisUserID);
                        
                        $.ajax({
                            type: 'GET',
                            url: '/product/owner/',
                            data: { "anymarket_id": thisOrderRow.items[0]['product']['id'] },
                            dataType: 'text',
                            success: function(data){
                                $.each(JSON.parse(data), function(){

                                    console.log(this.user_id + ' === ' + thisUserID);
                                    if (this.user_id === thisUserID){
                                        $('.order-list').append(
                                            "<tr class='odd pointer'>" +
                                                "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                                                "<td class=''>" + thisOrderRow.marketPlace + "</td>" +
                                                "<td class=''><a href='#' class='btn-order-detail' data-id='" + thisOrderRow.id + "'>" + thisOrderRow.id + "</a></td>" +
                                                "<td class=''>" + thisOrderRow.items[0]['product']['title'] + "</td>" +
                                                "<td class=''>" + thisOrderRow.buyer['name'] + "</td>" +
                                                "<td class=''> R$ " + thisOrderRow.gross.toFixed(2).replace('.',',') + "</td>" + 
                                                "<td class=''> R$ " + thisOrderRow.gross.toFixed(2).replace('.',',') + "</td>" +
                                                "<td class=''>" + getNormalDateTime(orderCreatedAt) + "</td>" +
                                                "<td class=''>" + displayStatus(thisStatus) + "</td>" +
                                                "<td class='a-right a-right'>" + displayNextStatus(thisOrderRow.id, thisStatus) + "</td>" +
                                                "<td class='last'><a href='#' class='btn btn-default btn-order-detail btn-zoom' data-id='" + thisOrderRow.id + "' type='submit'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></button></td>" +
                                            "</tr>" 
                                        );
                                    }
                                });
                            },
                            fail: function(data){
                                console.log(data);
                            },
                            error: function(data){
                                console.log(data);
                            }
                        });
                    }
                    catch(err){
                        console.log('Error in product');
                    }
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
                
                window.thisOrderObject = data;
                
                console.log(data);   
                console.log('status: ' + data['status']);
                
                switch(data['status']) {
                    case 'PENDING':
                        $('#step-1').removeClass('disabled');
                        $('#step-1').addClass('enabled');
                        $('#step-2').removeClass('enabled');
                        $('#step-2').addClass('disabled');
                        $('#step-3').removeClass('enabled');
                        $('#step-3').addClass('disabled');
                        $('#step-4').removeClass('enabled');
                        $('#step-4').addClass('disabled');
                        $('#step-5').removeClass('enabled');
                        $('#step-5').addClass('disabled');
                        $('#step-6').removeClass('enabled');
                        $('#step-6').addClass('disabled');
                        break;
                    case 'PAID_WAITING_SHIP':
                        $('#step-1').removeClass('disabled');
                        $('#step-1').addClass('enabled');
                        $('#step-2').removeClass('disabled');
                        $('#step-2').addClass('enabled');
                        $('#step-3').removeClass('enabled');
                        $('#step-3').addClass('disabled');
                        $('#step-4').removeClass('enabled');
                        $('#step-4').addClass('disabled');
                        $('#step-5').removeClass('enabled');
                        $('#step-5').addClass('disabled');
                        $('#step-6').removeClass('enabled');
                        $('#step-6').addClass('disabled');
                        break;
                    case 'INVOICED':
                        $('#step-1').removeClass('disabled');
                        $('#step-1').addClass('enabled');
                        $('#step-2').removeClass('disabled');
                        $('#step-2').addClass('enabled');
                        $('#step-3').removeClass('disabled');
                        $('#step-3').addClass('enabled');
                        $('#step-4').removeClass('enabled');
                        $('#step-4').addClass('disabled');
                        $('#step-5').removeClass('enabled');
                        $('#step-5').addClass('disabled');
                        $('#step-6').removeClass('enabled');
                        $('#step-6').addClass('disabled');
                        break;
                    case 'PAID_WAITING_DELIVERY':                        
                        if(typeof thisOrderObject['tracking']['deliveredDate'] === "undefined"){
                            // Assign value to the property here
                            $('#step-1').removeClass('disabled');
                            $('#step-1').addClass('enabled');
                            $('#step-2').removeClass('disabled');
                            $('#step-2').addClass('enabled');
                            $('#step-3').removeClass('disabled');
                            $('#step-3').addClass('enabled');
                            $('#step-4').removeClass('disabled');
                            $('#step-4').addClass('enabled');
                            $('#step-5').removeClass('enabled');
                            $('#step-5').addClass('disabled');
                            $('#step-6').removeClass('enabled');
                            $('#step-6').addClass('disabled');
                        } else {
                            $('#step-1').removeClass('disabled');
                            $('#step-1').addClass('enabled');
                            $('#step-2').removeClass('disabled');
                            $('#step-2').addClass('enabled');
                            $('#step-3').removeClass('disabled');
                            $('#step-3').addClass('enabled');
                            $('#step-4').removeClass('disabled');
                            $('#step-4').addClass('enabled');
                            $('#step-5').removeClass('disabled');
                            $('#step-5').addClass('enabled');
                            $('#step-6').removeClass('enabled');
                            $('#step-6').addClass('disabled');
                        }
                        break;                    
                    case 'CONCLUDED':
                        $('#step-1').removeClass('disabled');
                            $('#step-1').addClass('enabled');
                            $('#step-2').removeClass('disabled');
                            $('#step-2').addClass('enabled');
                            $('#step-3').removeClass('disabled');
                            $('#step-3').addClass('enabled');
                            $('#step-4').removeClass('disabled');
                            $('#step-4').addClass('enabled');
                            $('#step-5').removeClass('disabled');
                            $('#step-5').addClass('enabled');
                            $('#step-6').removeClass('disabled');
                            $('#step-6').addClass('enabled');
                        break;
                    default:
                        console.log(data['marketPlaceStatus']);
                }
                
                $('.order-detail-info').empty();
                
                $('.orderID').append(data['id']);
                $('.order-channel').append(data['marketPlace']);
                $('.order-date').append(getNormalDateTime(data['createdAt']));
                $('.order-payment-date').append(getNormalDateTime(data['paymentDate']));
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
                
                $('.order-gross').append(data['gross'].toFixed(2).replace('.',','));
                $('.order-interest').append(data['interestValue'].toFixed(2).replace('.',','));
                $('.order-freight').append(data['freight'].toFixed(2).replace('.',','));
                $('.order-discount').append(data['discount'].toFixed(2).replace('.',','));
                $('.order-total').append(data['total'].toFixed(2).replace('.',','));
                
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
                                "<td> R$ " + this.total.toFixed(2).replace('.',',') + "</td>" +
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
                showSuccessMessage('Status atual: PAGO.');
                console.log(response);
                openOrderDetail();
            },
            fail : function (response) {
                showAlertError('Não foi possível atualizar o status.');
                console.log(response);
                console.log('Something went wrong');
            },
            error : function (response) {
                showAlertError('Não foi possível atualizar o status.');
                console.log(response);
                console.log('Something went wrong');
            }
        });   
    };
    
    function updateStatusSetInvoiced(orderID, numberNF){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + orderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + orderID + "\",\r\n  \"status\": \"INVOICED\",\r\n  \"invoice\": {\r\n    \"series\": \"3\",\r\n    \"number\": \"431\",\r\n    \"accessKey\": \"" + numberNF + "\",\r\n    \"installments\": 1,\r\n    \"date\": \"" + getMyDateTime() + "\"\r\n  }\r\n}",
            success : function (response) {
                console.log(response);
                $('.fiscal-field-panel').hide();
                showSuccessMessage('Status atual: FATURADO.')
                console.log('Order #' + orderID + ' new status: INVOICED');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            },
            error : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            }
        });   
    };
    
    function updateStatusSetTransit(shipCorp, shipLink, shipCode){
        
        if (shipLink === ''){
            shipLinkRow = "\"url\": null ";
        } else {
            shipLinkRow = "\"url\": \"" + shipLink + "\"";
        }
        
        if (shipCode === ''){
            shipCodeRow = "\"number\": null,";
        } else {
            shipCodeRow = "\"number\": \"" + shipCode + "\","
        }
        
        console.log("{" +
                        "\"order_id\": \"" + thisOrderID + "\"," +
                        "\"status\": \"PAID_WAITING_DELIVERY\"," +
                        "\"tracking\": {" +
                            "\"date\": \"" + getMyDateTime() + "\"," +
                            "\"shippedDate\": \"" + getMyDateTime() + "\"," +
                            "\"estimateDate\": \"" + getMyDateTime() + "\"," +
                            "\"carrier\": \"" + shipCorp + "\"," +
                            shipCodeRow +
                            shipLinkRow +
                        "}" +
                      "}");
        
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + thisOrderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{" +
                        "\"order_id\": \"" + thisOrderID + "\"," +
                        "\"status\": \"PAID_WAITING_DELIVERY\"," +
                        "\"tracking\": {" +
                            "\"date\": \"" + getMyDateTime() + "\"," +
                            "\"shippedDate\": \"" + getMyDateTime() + "\"," +
                            "\"estimateDate\": \"" + getMyDateTime() + "\"," +
                            "\"carrier\": \"" + shipCorp + "\"," +
                            shipCodeRow +
                            shipLinkRow +
                        "}" +
                      "}",
            success : function (response) {
                $('.in-transit-field-panel').fadeOut();
                console.log('Order #' + thisOrderID + ' new status: IN Transit');
                showSuccessMessage('Novo status: EM TRÂNSITO.');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            },
            error : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            }
        });   
    };
    
    function updateStatusSetDelivered(){ 
            
            console.log(thisOrderObject.id);
        
            extraFields = '';
        
            if(typeof thisOrderObject['tracking']['url'] !== "undefined"){
                extraFields += ", \"url\": \"" + thisOrderObject['tracking']['url'] + "\" ";
            }
            if(typeof thisOrderObject['tracking']['number'] !== "undefined"){
                extraFields += ", \"number\": \"" + thisOrderObject['tracking']['number'] + "\" ";
            }
            if(typeof thisOrderObject['tracking']['carrier'] !== "undefined"){
                extraFields += ", \"carrier\": \"" + thisOrderObject['tracking']['carrier'] + "\" ";
            }
            if(typeof thisOrderObject['tracking']['date'] !== "undefined"){
                extraFields += ", \"date\": \"" + thisOrderObject['tracking']['date'] + "\" ";
            }
            if(typeof thisOrderObject['tracking']['estimateDate'] !== "undefined"){
                extraFields += ", \"estimateDate\": \"" + thisOrderObject['tracking']['estimateDate'] + "\" ";
            }
            if(typeof thisOrderObject['tracking']['shippedDate'] !== "undefined"){
                extraFields += ", \"shippedDate\": \"" + thisOrderObject['tracking']['shippedDate'] + "\" ";
            }
        
        console.log("{ \"order_id\": " + thisOrderID + "," +
                    "\"status\": \"PAID_WAITING_DELIVERY\", " +
                    "\"tracking\": {" +
                        "\"deliveredDate\": \"" + getMyDateTime() + "\" " + extraFields + "}}"); 
        
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + thisOrderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{ \"order_id\": " + thisOrderID + "," +
                    "\"status\": \"PAID_WAITING_DELIVERY\", " +
                    "\"tracking\": {" +
                    "\"deliveredDate\": \"" + getMyDateTime() + "\" " + extraFields + "}}",
            success : function (response) {
                showSuccessMessage('Novo status: ENTREGUE.');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            },
            error : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            }
        });   
    };
    
    function updateStatusSetFinished(){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + thisOrderID,
            "method": "PUT",
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\r\n  \"order_id\": \"" + thisOrderID + "\",\r\n  \"status\": \"CONCLUDED\"\r\n}",
            success : function (response) {
                showSuccessMessage('Novo status: CONCLUÍDO.');
                openOrderDetail(thisOrderID);
            },
            fail : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            },
            error : function (response) {
                console.log(response);
                showAlertError('Não foi possível atualizar o status.');
            }
        });   
    };
    
    function updateStatusSetCancelled(orderID){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + orderID,
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
    
    //------------// Datepicker //-------------
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
//    $('#reportrange').on('show.daterangepicker', function() {
//        console.log("show event fired");
//    });
//    $('#reportrange').on('hide.daterangepicker', function() {
//        console.log("hide event fired");
//    });
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        orderStartDate = '&createdAfter=' + picker.startDate.format('YYYY-MM-DD') + 'T00:00:00Z';
        orderEndDate = '&createdBefore=' + picker.endDate.format('YYYY-MM-DD') + 'T23:59:59Z';
        updateOrderList();
    });
//    $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
//        console.log("cancel event fired");
//    });
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
        event.preventDefault();
        thisOrderID = $(this).data('id');
        $('.fiscal-field-input').empty();
        $('.fiscal-field-panel').hide();
        $('.in-transit-field-panel').hide();
        openOrderDetail();
    }); 
    
    // Action on Status 1 click :: PENDING
    $('.btn-order-update-pending').click(function(){        
        console.log('Calling PENDING');
        showAlertError('Não é possível selecionar esse status.');
    });
        
    // Action on Status 2 click :: PAID
     $('.btn-order-update-paid').click(function(){        
        console.log('Calling PAID');        
        if (thisOrderObject.status === "PENDING"){ 
            updateStatusSetPaid();  
        } else {
            showAlertError('Não é possível selecionar esse status.');
        }
    });    
    
    // Action on Status 3 click :: INVOICED
    $('.btn-order-update-invoiced').click(function(){        
        console.log('Calling INVOICED');
        if (thisOrderObject.status === 'PAID_WAITING_SHIP'){ 
            $('.fiscal-field-panel').fadeIn();
        } else {
            showAlertError('Não é possível selecionar esse status.');
        }
    });
    
    // keeps the field size max to 44 chars
    $('.fiscal-field-input').keypress( function(){
        testInputMaxLength(this, 44);
    });
        
    $('.fiscal-field-submit').click(function(){   
        if ($('.fiscal-field-input').val() === ''){
            showAlertError('Preencha o campo com a chave de acesso da NFe.');
        } else {     
            if (thisOrderObject.status === 'PAID_WAITING_SHIP'){
                console.log(thisOrderObject);
                if ($('.fiscal-field-input').val().length !== 44){
                    showAlertError('O número deve ter 44 caracteres de tamanho.');
                } else {
                    updateStatusSetInvoiced(thisOrderObject.id, $('.fiscal-field-input').val());
                }
            } else {
                showAlertError('Não é possível selecionar esse status.');
            };
        }
    });
    
    // Action on Status 4 click :: IN TRANSIT
    $('.btn-order-update-transit').click(function(){   
        console.log('Calling to in transit');
        if (thisOrderObject.status === 'INVOICED'){ 
            $('.in-transit-field-panel').fadeIn();
        } else {
            showAlertError('Não é possível selecionar esse status.');
        }
    });
    
    $('.ship-field-submit').click(function(){        
        console.log('Chamou Em Transito');
        if ($('.ship-link-field-input').val() !== ''){
            if ($('.ship-link-field-input').val().search("http://") === -1 && $('.ship-link-field-input').val().search("https://") === -1){
                showAlertError('Formato de link incorreto.');
                return;
            } 
        }
        if ($('.ship-corp-field-input').val() === ''){
            showAlertError('Preencha o campo com a Transportadora.');
        } else { 
            updateStatusSetTransit($('.ship-corp-field-input').val(),$('.ship-link-field-input').val(),$('.ship-code-field-input').val());
        }
    });
    
    // Action on Status 5 click :: DELIVERED
    $('.btn-order-update-delivered').click(function(){        
        console.log('Calling DELIVERED');
        if (thisOrderObject.status === 'PAID_WAITING_DELIVERY' && typeof thisOrderObject['tracking']['deliveredDate'] === "undefined"){ 
            updateStatusSetDelivered();
        } else {
            showAlertError('Não é possível selecionar esse status.');
        }
    });
    
    // Action on Status 6 click :: CONCLUDED
    $('.btn-order-update-finished').click(function(){        
        console.log('CONCLUDED');
        if (thisOrderObject.status === 'PAID_WAITING_DELIVERY' && typeof thisOrderObject['tracking']['deliveredDate'] !== "undefined"){ 
            updateStatusSetFinished();
        } else {
            showAlertError('Não é possível selecionar esse status.');
            return;
        }
    });
    
    $('.btn-order-update-canceled').click(function(){        
        console.log('CANCELED');
        updateStatusSetCancelled();
    });
    
    $( ".order-list " ).on( "click", "tr td .btn-action", function() {    
        
        thisOrderID = $(this).data('id');
        thisAction = $(this).data('action');
        
        $.ajax({
            url: baseURL + thisOrderID,
            dataType: 'json',   
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                
                thisOrderObject = data;
                console.log(data);
                console.log(thisAction);
                
                if (thisAction === 'update-set-paid'){
                    console.log('Calling PAID');        
                    if (thisOrderObject.status === "PENDING"){ 
                        $('.fiscal-field-panel').hide();
                        $('.in-transit-field-panel').hide();
                        console.log('updateStatusSetPaid()');  
                        updateStatusSetPaid();
                    } else {
                        showAlertError('Não é possível selecionar esse status.');
                    }
                } else if (thisAction === 'update-set-invoiced'){
                    console.log('Calling INVOICED');
                    if (thisOrderObject.status === 'PAID_WAITING_SHIP'){ 
                        $('.fiscal-field-panel').fadeIn();
                        $('.in-transit-field-panel').hide();
                        openOrderDetail();
                    } else {
                        showAlertError('Não é possível selecionar esse status.');
                    }
                } else if (thisAction === 'update-set-transit'){
                    console.log('Calling to in transit');
                    if (thisOrderObject.status === 'INVOICED'){ 
                        $('.fiscal-field-panel').hide();
                        $('.in-transit-field-panel').fadeIn();
                        openOrderDetail();
                    } else {
                        showAlertError('Não é possível selecionar esse status.');
                    }
                } else if (thisAction === 'update-set-delivered'){
                    console.log('Calling DELIVERED');
                    if (thisOrderObject.status === 'PAID_WAITING_DELIVERY' && typeof thisOrderObject['tracking']['deliveredDate'] === "undefined"){ 
                        console.log('updateStatusSetDelivered()');
                        $('.fiscal-field-panel').hide();
                        $('.in-transit-field-panel').hide();
                        updateStatusSetDelivered();
                    } else {
                        showAlertError('Não é possível selecionar esse status.');
                    }
                } else if (thisAction === 'update-set-finished'){
                    console.log('CONCLUDED');
                    if (thisOrderObject.status === 'PAID_WAITING_DELIVERY' && typeof thisOrderObject['tracking']['deliveredDate'] !== "undefined"){ 
                        console.log('updateStatusSetFinished()');
                        $('.fiscal-field-panel').hide();
                        $('.in-transit-field-panel').hide();
                        updateStatusSetFinished();
                    } else {
                        showAlertError('Não é possível selecionar esse status.');
                        return;
                    }
                } else {
                    null;
                }
            },
            error: function(data){
                console.log(data);  
            }
        });
        
        //openOrderDetail();
    });   
    
    $( ".order-list " ).on( "click", "tr td .btn-zoom", function() {    
        thisOrderID = $(this).data('id');
        openOrderDetail();
    });
    
});