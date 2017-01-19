$(document).ready(function(){    
    
    // PRODUCTS LIST PAGE
    
    
    var sandboxURL = 'http://sandbox-api.anymarket.com.br/v2/products/';
    var sandboxToken = 'LG1484315269910R-224861608';
    var sandboxCategoryURL = 'http://sandbox-api.anymarket.com.br/v2/categories';
    var productionURL = 'http://api.anymarket.com.br/v2/products/';
    var productionToken = 'L118564309EG1480611916093R1250720512';
    var productionCategoryURL = 'http://api.anymarket.com.br/v2/categories';
     
    var baseURL = sandboxURL;
    var tokenChosen = sandboxToken;
    var categoryURL = sandboxCategoryURL;
    
    var productListLimit = 20;
    var productListOffset = 20;
    var productListTotalElements;
    var nextProductsURL;
    var previousProductsURL;
    var thisProductID;
    var productDetailMode;
    
    function showAlertError(message){
        $('.alert').hide();
        $('.alert-error-message').empty();
        $('.alert-error-message').text(message);
        $('.alert-danger').fadeIn();
    }  
    
    function showSuccessMessage(message){        
        $('.alert').hide();
        $('.alert-success-message').empty();
        $('.alert-success-message').text(message);
        $('.alert-success').fadeIn();
    } 
        
    function updateProductList(){
        console.log('productListLimit ' + productListLimit);
        console.log('productListOffset ' + productListOffset);
        
        
        $('.product-list').empty();
        
        $.ajax({
            url: baseURL + '?limit=' + productListLimit + '?offset=' + productListOffset,
            dataType: 'json',   
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log(data);
                productListTotalElements = data['page']['totalElements'];
                console.log(productListTotalElements);
                
                $('.pagination-list').empty();
                $('.pagination-list').append("<button type='button' class='btn btn-default btn-product-list-next'>Anterior</button>");
                for (i = 1; i<= Math.ceil(productListTotalElements/productListOffset); i++){
                    $('.pagination-list').append(
                        "<button class='btn btn-default' type='button'>" + i + "</button>"
                    );
                }
                $('.pagination-list').append("<button type='button' class='btn btn-default btn-product-list-previous'>Próximo</button>");
                
                console.log(Math.ceil(productListTotalElements/productListOffset));
                
                
                $('.product-list').hide();             
                //try{ 
                    //console.log(0);
                    //nextProductsURL = data['links'][0]['href'];
                    //previousProductsURL = data['links'][1]['href'];
                //}
                //catch(err) { 
                    //console.log(1);
                    //nextProductsURL = data['links'][0]['href'];
                    //previousProductsURL = productsURL;
                //}
               
                $.each(data['content'], function(index) {
                    
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
                        console.log('Error in product');
                    }
               });
               $('.product-list').fadeIn();
           }
       });        
    };
    
    function openProductDetail(){
        //
        $('.dropzone').hide();
        
        $.ajax({
            url: baseURL + thisProductID,
            dataType: 'json',  
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log(data);
                $('#name').val(data['title']);
                getProductCategory(data['category']['id']);
                $('#warranty-time').val(data['warrantyTime']);
                $('#warranty-text').val(data['warrantyText']);
                $('#origin').val(data['origin']['description']);
                $('#sku').val(data['skus'][0]['partnerId']);
                $('#pack-width').val(data['width']);
                $('#pack-height').val(data['height']);
                $('#pack-length').val(data['length']);
                $('#pack-weight').val(data['weight']);
                $('#cost').val(Math.round(data['skus'][0]['price'] / data['priceFactor']));
                $('#price-from').val(data['---']);
                $('#price-final').val(data['skus'][0]['price']);
                $('#stock').val(data['skus'][0]['amount']);
                $('#operation-period').val(data['skus'][0]['additionalTime']);
                $('#editor').html(data['description']);
                $('.modal').modal('show');
                $('.img-thumbnail-list-product').empty();
                
                $.each(data['images'], function(index) {
                    //console.log($(this)[0]['thumbnailUrl']);
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
                
                $('.img-thumbnail-list-product').append(
                    "<div class='col-md-55'>" +
                        "<div class=''>" +
                        "<div class=''>" +
                            "<img style='width: 100%; display: block;' src='http://www.gratisskole.dk/sdata/minipic/001/00155-300.png' alt='image'>" +
                            "</div>" +
                        "</div>" +
                      "</div>"   
                );
            }
        }); 
        //console.log(thisProductID);
    };
    
    function getProductCategory(categoryID){
        $.ajax({
                "async": true,
                "crossDomain": true,
                "url": categoryURL,
                "method": "GET",
                "headers": {
                  "gumgatoken": tokenChosen,
                  "content-type": "application/json"
                },
            success: function (data) {
                $('#category').empty();
                $('#category').append("<option value=''>Categoria</option>");
                
                $.each(data['content'], function(index) {                    
                    try {
                        $('#category').append("<option " + ((categoryID ===this.id)? " selected " : "") + " value='" + this.id + "'>" + this.name + "</option>");
                    }
                    catch(err){
                        console.log('Error in category');
                    }
                });
                console.log(data);
            },
            fail: function (message){
                console.log(message);
            }
        });
    };
    
    function saveProduct(){
        
        productID = ((thisProductID === null) ? 'null' : thisProductID);
        console.log('ID: ' + productID);
        if ($('#name').val() === ''){ showAlertError('Nome não preenchido'); return; };        
        if ($('#category').val() === ''){ showAlertError('Categoria não preenchida'); return; };        
        packWidth = (($('#pack-width').val() === '') ? "\"\"" : $('#pack-width').val());
        packHeight = (($('#pack-height').val() === '') ? "\"\"" : $('#pack-height').val());
        packLength = (($('#pack-length').val() === '') ? "\"\"" : $('#pack-length').val());
        packWeigth = (($('#pack-weight').val() === '') ? "\"\"" : $('#pack-weight').val());
        if ($('#cost').val() === ''){ showAlertError('Custo não preenchido'); return; };
        if ($('#price-final').val() === ''){ showAlertError('Preço não preenchido'); return; };
        if ($('#stock').val() === ''){ showAlertError('Estoque não preenchido'); return; };               
        
        productPreparation = "{\"id\": " + productID + ",\"title\": \"" + $('#name').val() + "\","+
                    "\"description\": \"" + $('#editor').html().replace(/"/g,"'") + "\",\"nbm\": {  \"id\": \"0\"}," +
                    "\"origin\": {  \"id\": \"0\"}," +
                    "\"category\": {  \"id\": \"" + $('#category').val() + "\"},\"model\": \"\"," +
                    "\"warrantyText\": \"" + $('#warranty-text').val() + "\",\"warrantyTime\": \"" + $('#warranty-time').val() + "\"," +
                    "\"weight\": " + packWeigth + ",\"height\": " + packHeight + ",\"width\": " + packWidth + ",\"length\": " + packLength + "," +
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
            "url": baseURL + productID,
            "method": productDetailMode,
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": productPreparation,
            success : function (response) {
                showSuccessMessage('Seu novo produto foi salvo com sucesso.');
                console.log(response);
            },
            fail : function (response) {
                console.log('Something went wrong');
            },
            error: function(response){
                console.log(response.statusText);
                console.log(response['responseJSON']['message']);
                //
                showAlertError(response.statusText);
                
            }
        });  
    }
    
    if ($('tbody').hasClass('product-list')){
        updateProductList();
    }
    
    $('.alert').hide();
    
    // Pagination
    $('.btn-product-list-next').click(function(){        
        $('.product-list').empty();
        updateProductList(nextProductsURL);
    });
    
    $('.btn-product-list-previous').click(function(){        
        $('.product-list').empty();
        updateProductList(previousProductsURL);
    });
  
    // Open product details
    $( ".product-list " ).on( "click", "tr td a.btn-product-detail", function() {        
        thisProductID = $(this).data('id');
        productDetailMode = 'PUT';
        openProductDetail();
    });
    
    // Creates new product
    $( ".btn-product-new").click(function(){        
        thisProductID = null;
        productDetailMode = 'POST';
        $('.alert').hide();
        $('.form-control').empty();
        getProductCategory();
    });

    $(".btn-save-product").click(function(){        
        saveProduct();
    });
    
    $('.product-modal-lg').on('hide.bs.modal', function (e) {
        updateProductList();
    });
    
});