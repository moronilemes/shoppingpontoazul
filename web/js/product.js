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
    var productListOffset = 0;
    var productListTotalElements;
    var thisProductID;
    var productDetailMode;
    var productPaginationQuantity;
    var productPaginationPosition;
    
    function showAlertError(message){
        new PNotify({
            title: 'Erro no formulário:',
            text: message,
            type: 'error',
            styling: 'bootstrap3'
        });
    }  
    
    function showSuccessMessage(message){        
        new PNotify({
            title: 'Tudo certo!',
            text: message,
            type: 'success',
            styling: 'bootstrap3'
        });
    } 
        
    function updateProductList(){
        
        $('.product-list').hide();
        
        $.ajax({
            url: baseURL + '?limit=' + productListLimit + '&offset=' + productListOffset,
            dataType: 'json',   
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                productPaginationPosition = productListOffset / productListLimit + 1;
                console.log(productPaginationPosition);
                console.log(data);
                productListTotalElements = data['page']['totalElements'];
                console.log(productListTotalElements);
                
                productPaginationQuantity = Math.ceil(productListTotalElements/productListLimit);
                console.log(productPaginationQuantity);
                
                
                $('.pagination-list').empty();
                $('.pagination-list').append("<button type='button' class='btn btn-default btn-product-list-previous btn-pagination-list'>Anterior</button>");
                for (i = 1; i<= productPaginationQuantity; i++){
                    if (productPaginationPosition === i){
                        $('.pagination-list').append(
                            "<button class='btn btn-default btn-pagination-list active' type='button'>" + i + "</button>"
                        );
                    } else {
                        $('.pagination-list').append(
                            "<button class='btn btn-default btn-pagination-list' type='button'>" + i + "</button>"
                        );
                    }
                }
                $('.pagination-list').append("<button type='button' class='btn btn-default btn-product-list-next btn-pagination-list'>Próximo</button>");
                
                              
                
                $('.product-list').hide();   
               
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
                        "<div class='img-upload-plus'>" +
                            "<img style='width: 100%; display: block; cursor: pointer' src='http://www.gratisskole.dk/sdata/minipic/001/00155-300.png' alt='image'>" +
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
        
        productID = ((thisProductID === '') ? 'null' : thisProductID);
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
        console.log(baseURL + productID);
        console.log(productDetailMode);
        console.log(tokenChosen);
        console.log('thisProductID ' + thisProductID);
        productID = ((thisProductID === null) ? null : thisProductID);
        
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": baseURL + thisProductID,
            "method": productDetailMode,
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json"
            },
            "processData": false,
            "data": productPreparation,
            success : function (response) {
                showSuccessMessage('Seu produto foi salvo com sucesso.');
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
    
    $('.product-modal-lg').on('hide.bs.modal', function (e) {
        if ($('tbody').hasClass('product-list')){
            updateProductList();
        };
    });
    
    $('.alert').hide();
    
    // Pagination
    $('.pagination-list').on('click', 'button', function(){       
        //
        if ($(this).text() === 'Próximo') { 
            productListOffset = productListOffset + productListLimit; 
            if (productListOffset > (productListLimit * (productPaginationQuantity - 1))){
                productListOffset = productListLimit * (productPaginationQuantity - 1);
            }                  
        } else if ($(this).text() === 'Anterior') { 
            productListOffset = productListOffset - productListLimit;
            productListOffset = ((productListOffset - 0) ? 0 : productListOffset);
        } else {
            productListOffset = ($(this).text() - 1) * productListLimit;
        }
        //
        updateProductList();
        //
    });
  
    // Open product details
    $( ".product-list " ).on( "click", "tr td a.btn-product-detail", function() {        
        thisProductID = $(this).data('id');
        productDetailMode = 'PUT';
        openProductDetail();
    });
    
    // Creates new product
    $( ".btn-product-new").click(function(){        
        thisProductID = '';
        productDetailMode = 'POST';
        $('.alert').hide();
        $('.form-control input').empty();
        $('.form-control').html('');
        getProductCategory();
    });

    $(".btn-save-product").click(function(){        
        saveProduct();
    });
    
    $(".form-control").keypress(function(){
        var keycode = event.keyCode || event.which;
        if(keycode === '13') {
           saveProduct();
        }
    });
    

    
    $('.img-thumbnail-list-product').on('click', '.img-upload-plus', function(){
        console.log('mais');
        $('.img-thumbnail-list-product').hide();
        $('.dropzone').show();
    });
    
    Dropzone.options.myAwesomeDropzone = {
        paramName: "imageFile", // The name that will be used to transfer the file
        maxFilesize: 1, // MB
        acceptedFiles: "image/*",
        accept: function(file, done) {
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            }
            else { done(); }
        }
    };
    
});