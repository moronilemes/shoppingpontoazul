$(document).ready(function(){    
    
    // PRODUCTS LIST PAGE
    
    var productionToken = 'L118564309EG1480611916093R1250720512';
    var sandboxToken = 'LG1484315269910R-224861608';
    var productsURL = 'http://api.anymarket.com.br/v2/products?gumgaToken=L118564309EG1480611916093R1250720512&limit=20';
    var nextProductsURL;
    var previousProductsURL;
    var thisProductID;
    
    function showAlertError(message){
        $('.alert-error-message').empty();
        $('.alert-error-message').text(message);
        $('.alert').fadeIn();
    }  
    
    function showSuccessMessage(message){
        $('.alert').hide();
        $('.alert-success').fadeIn();
    } 
    
    function updateProductList(url){
        $.ajax({
            url: url,
            dataType: 'json',        
            success: function (data) {
                console.log(data);
                $('.product-list').hide();
                //console.log(data['links'][0]['href']);                
                try{ 
                    nextProductsURL = data['links'][0]['href'];
                    previousProductsURL = data['links'][1]['href'];
                }
                catch(err) { 
                    nextProductsURL = data['links'][0]['href'];
                    previousProductsURL = productsURL;
                }
               
                $.each(data['content'], function(index) {
//                    console.log(this.images[0]['lowResolutionUrl']);
//                    console.log(this.title);
//                    console.log(this.skus[0]['partnerId']);
//                    console.log(this.skus[0]['price']);
//                    console.log('ativo');
//                    console.log(this.skus[0]['amount']);
//                    console.log('---------------------------------------------');                  
                    
                    try {
                        $('.product-list').append(
                            "<tr class='even pointer'>" + 
                                "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                                "<td class=''><img class='product-image btn-product-detail' src='" + this.images[0]['thumbnailUrl'] + "' /></td>" +
                                "<td class=''><a href='#' class='btn-product-detail' data-id='" + this['id'] + "'>" + this.title + "<br /><small>" + this['category']['name'] + "</small></a></td>" +
                                "<td class=''>" + this.skus[0]['partnerId'] + "</td>" +
                                "<td class=''>" + this.skus[0]['price'] + "</td>" +
                                "<td class=''>Ativo</td>" +
                                "<td class=''>" + this.skus[0]['amount'] + "</td>" +
                            "</tr>"    
                        );
                    }
                    catch(err){
                        console.log('Error in product')
                    }
               });
               $('.product-list').fadeIn();
           }
       });        
    };
    
    function openProductDetail(productID){
        
        productURL = 'http://api.anymarket.com.br/v2/products/' + productID + '?gumgaToken=L118564309EG1480611916093R1250720512';
        
        $.ajax({
            url: productURL,
            dataType: 'json',        
            success: function (data) {
                console.log(data);
                $('#name').val(data['title']);
                $('#category').val(data['category']['name']);
                $('#warranty-time').val(data['warrantyTime']);
                $('#origin').val(data['origin']['description']);
                $('#sku').val(data['skus'][0]['partnerId']);
                
                $('#pack-width').val(data['width']);
                $('#pack-height').val(data['height']);
                $('#pack-length').val(data['length']);
                $('#pack-weight').val(data['weight']);
                
                $('#cost').val(data['---']);
                $('#price-from').val(data['---']);
                $('#price-final').val(data['skus'][0]['price']);
                
                $('#stock').val(data['skus'][0]['amount']);
                $('#operation-period').val(data['skus'][0]['additionalTime']);
                
                $('#editor').html(data['description']);
                $('.modal').modal('show');
                
                $('.img-thumbnail-list-product').empty();
                
                $.each(data['images'], function(index) {
                    console.log($(this)[0]['thumbnailUrl']);
                    
                    try {
                        $('.img-thumbnail-list-product').append(
                            "<div class='col-md-55'>" +
                                "<div class='thumbnail'>" +
                                "<div class='image view view-first'>" +
                                    "<img style='width: 100%; display: block;' src='" + $(this)[0]['thumbnailUrl'] + "' alt='image'>" +
                                    "<div class='mask no-caption'>" +
                                        "<div class='tools tools-bottom'>" +
                                        "<a href='" + $(this)[0]['standardUrl'] + "' target='_blank'><i class='fa fa-link'></i></a>" +
                                        "<a href='#'><i class='fa fa-times'></i></a>" +
                                        "</div>" +
                                    "</div>" +
                                    "</div>" +
                                "</div>" +
                              "</div>"   
                        );
                    }
                    catch(err){
                        console.log('Error in product')
                    }
                    
                    
                });
                
            }
        }); 
        
        console.log(productID);
    };
    
    function getProductCategory(){
        $.ajax({
                "async": true,
                "crossDomain": true,
                "url": "http://sandbox-api.anymarket.com.br/v2/categories",
                "method": "GET",
                "headers": {
                  "gumgatoken": "LG1484315269910R-224861608",
                  "content-type": "application/json"
              },
            success: function (data) {
                $('#category').empty();
                $('#category').append("<option value=''>Categoria</option>");
                
                $.each(data['content'], function(index) {                    
                    try {
                        $('#category').append("<option value='" + this.id + "'>" + this.name + "</option>");
                    }
                    catch(err){
                        console.log('Error in category')
                    }
                });
                console.log(data);
            },
            fail: function (message){
                console.log(message);
            }
        });
    };
    
    function createProduct(){
        console.log('aaa');
        
        if ($('#name').val() === ''){ showAlertError('Nome não preenchido'); return; };
        if ($('#sku').val() === ''){ showAlertError('SKU não preenchido'); return; };
        if ($('#category').val() === ''){ showAlertError('Categoria não preenchida'); return; };
        if ($('#pack-width').val() === ''){ showAlertError('Largura não preenchida'); return; };
        if ($('#pack-height').val() === ''){ showAlertError('Altura não preenchida'); return; };
        if ($('#pack-length').val() === ''){ showAlertError('Comprimenro não preenchido'); return; };
        if ($('#pack-weigth').val() === ''){ showAlertError('Peso não preenchido'); return; };
        if ($('#price-final').val() === ''){ showAlertError('Preço não preenchido'); return; };
        if ($('#stock').val() === ''){ showAlertError('Estoque não preenchido'); return; };               
        
//        console.log($('#name').val()); 
//        console.log($('#sku').val());
//        console.log($('#warranty-time').val());
//        console.log($('#editor').html()); 
//        console.log($('#category').val());
//        console.log($('#origin').val());
//        console.log($('#pack-width').val());
//        console.log($('#pack-height').val());
//        console.log($('#pack-length').val());
//        console.log($('#pack-weigth').val());
//        console.log($('#cost').val());
//        console.log($('#price-from').val());
//        console.log($('#price-final').val()); 
//        console.log($('#stock').val());
//        console.log($('#operation-period').val());
        
        
        productPreparation = "{\"id\": null,\"title\": \"" + $('#name').val() + "\","+
                    "\"description\": \"" + $('#editor').html() + "\",\"nbm\": {  \"id\": \"0\"}," +
                    "\"origin\": {  \"id\": \"0\"}," +
                    "\"category\": {  \"id\": \"" + $('#category').val() + "\"},\"model\": \"\"," +
                    "\"warrantyText\": \"\",\"warrantyTime\": \"" + $('#warranty-time').val() + "\"," +
                    "\"weight\": " + $('#pack-weigth').val() + ",\"height\": " + $('#pack-height').val() + ",\"width\": " + $('#pack-width').val() + ",\"length\": " + $('#pack-length').val() + "," +
                    "\"images\": [{  \"main\": true,  \"url\": \"http://66.media.tumblr.com/tumblr_lcpn2mv6yU1qf0qtao1_1280.jpg\"}, " +
                    "{  \"main\": true,  \"url\": \"http://imguol.com/c/entretenimento/2014/09/03/2007---pedro-cardoso-em-cena-de-a-grande-familia-1409762964928_956x500.jpg\"}, " +
                    "{  \"main\": true,  \"url\": \"http://imguol.com/blogs/160/files/2016/05/cauby-peixoto.jpg\"}]," +
                    "\"priceFactor\": 1,\"calculatedPrice\": false," +
                    "\"skus\": [{  \"price\": " + $('#price-final').val() + ",  \"amount\": " + $('#stock').val() + ",  \"ean\": null,  " +
                    "\"partnerId\": \"" + $('#sku').val() + "\",  \"title\": \"" + $('#name').val() + "\",  \"idProduct\": null,  \"internalIdProduct\": \"2573\"}]\r\n}";
                
        console.log(productPreparation);
        
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "http://sandbox-api.anymarket.com.br/v2/products",
            "method": "POST",
            "headers": {
                "gumgatoken": sandboxToken,
                "content-type": "application/json"
            },
            "processData": false,
            "data": productPreparation,
            success : function (response) {
                console.log(response);
            },
            fail : function (response) {
                console.log('Something went wrong');
            },
            error: function(response){
                console.log(response.statusText);
                console.log(response['responseJSON']['message']);
                
                showAlertError(response.statusText);
                
            }
        });  

    }
    
    if ($('tbody').hasClass('product-list')){
        updateProductList(productsURL);
    }
    
    $('.alert').hide();
    
    $('.btn-product-list-next').click(function(){        
        $('.product-list').empty();
        updateProductList(nextProductsURL);
    });
    
    $('.btn-product-list-previous').click(function(){        
        $('.product-list').empty();
        updateProductList(previousProductsURL);
    });
  
    $( ".product-list " ).on( "click", "tr td a.btn-product-detail", function() {
        openProductDetail( $( this).data('id') );
    });
    
    $( ".btn-product-new").click(function(){        
        thisProductID = '';
        $('.alert').hide();
        $('.form-control').empty();
        getProductCategory();
    });

    $(".btn-save-product").click(function(){        
        createProduct();
    });
    
});