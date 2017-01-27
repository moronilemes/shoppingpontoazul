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
    
    var productListLimit = 70;
    var productListOffset = 0;
    var productListTotalElements;
    var thisProductID;
    var thisUserID;
    var myProductList = [];
    
    var productDetailMode;
    var productPaginationQuantity;
    var productPaginationPosition;
    var productThumbnailImage;
    
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
            type: 'GET',
            url: '/product/list',
            data: { "id": (thisUserID).trim() },
            //dataType: 'text',
            success: function(data){
                
                
                $.each(JSON.parse(data), function() {
                    myProductList.push(Number(this.anymarket_id));
                    //console.log(this.anymarket_id);
                });
                
                console.log(myProductList.findIndex(function(product){ product = '2'; }));
                
            },
            fail: function(create_response){
                console.log(create_response);
            },
            error: function(create_response){
                console.log(create_response);
            }
        });
        
        
        $.ajax({
            url: baseURL + '?limit=' + productListLimit + '&offset=' + productListOffset,
            dataType: 'json',   
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                productPaginationPosition = productListOffset / productListLimit + 1;
                //console.log(productPaginationPosition);
                console.log(data);
                productListTotalElements = data['page']['totalElements'];
                //console.log(productListTotalElements);
                
                productPaginationQuantity = Math.ceil(productListTotalElements/productListLimit);
                //console.log(productPaginationQuantity);
                
                
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
                
                              
                
                $('.product-list').empty();   
               
               
                //console.log(myProductList);
               
                $.each(data['content'], function(index) {
                    
                    try {
                        
                        if ($.inArray( this.id, myProductList) !== -1){
                            
                            //console.log(myProductList.findIndex(function(product){ product = this.id; }));
                            //console.log('esse vai ' + this.id);
                            
                            if (this.images === undefined){
                                productThumbnailImage = 'http://www.sensiblespeech.com/wp-content/uploads/2016/07/No_image_available-450x301.png';
                            } else {
                                productThumbnailImage = this.images[0]['thumbnailUrl'];
                            }

                            $('.product-list').append(
                                "<tr class='even pointer'>" + 
                                    "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                                    "<td class=''><img class='product-image btn-product-detail' src='" + productThumbnailImage + "' /></td>" +
                                    "<td class=''><a href='#' class='btn-product-detail' data-id='" + this['id'] + "'>" + this.title + "<br /><small>" + this['category']['name'] + "</small></a></td>" +
                                    "<td class=''>" + this.skus[0]['partnerId'] + "</td>" +
                                    "<td class=''>" + this.skus[0]['price'] + "</td>" +
                                    "<td class=''>Ativo</td>" +
                                    "<td class=''>" + this.skus[0]['amount'] + "</td>" +
                                "</tr>"    
                            );
                    
                        }
                        
                    }
                    catch(err){
                        console.log('Error in product id:' + this.id);
                    }
               });
               $('.product-list').fadeIn();
           }
       });        
    };
    
    function openProductDetail(){
        //
        console.log(thisProductID);
        
        //$('.dropzone').hide();
        
//        if (thisProductID !== ''){
//            $('#operation-period').attr('disabled', 'disabled');
//            $('#stock').attr('disabled', 'disabled');
//            $('#sku').attr('disabled', 'disabled');
//        } else {
//            $('#operation-period').attr('disabled', '');
//            $('#stock').attr('disabled', '');
//            $('#sku').attr('disabled', '');
//        }
        
        $.ajax({
            url: baseURL + thisProductID,
            dataType: 'json',  
            "headers": {
                "gumgatoken": tokenChosen,
                "content-type": "application/json" },
            success: function (data) {
                console.log('Product detail:');
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
                $('.dropzone').empty();
                
                $.each(data['images'], function(index) {
                    //console.log($(this)[0]['thumbnailUrl']);
                    try {
                        $('.dropzone').append(
                            "<div class='dz-preview dz-file-preview dz-processing dz-error dz-complete img-thumbnail-list-product' val='" + $(this)[0]['standardUrl'] + "'>  " +
                                "<div class='dz-image'><img src='" + $(this)[0]['thumbnailUrl'] + "' data-dz-thumbnail='' /></div>"  +
                                "<div class='dz-details'>    <div class='dz-size'><span data-dz-size=''><strong>23.8</strong> MB</span></div>    <div class='dz-filename'><span data-dz-name=''>" + $(this)[0]['standardUrl'] + "</span></div>  </div>"  +
                                "<div class='dz-progress'><span class='dz-upload' data-dz-uploadprogress=''></span></div>  " +
                                //"<div class='dz-error-message'><span data-dz-errormessage=''>Server responded with 0 code.</span></div>  " +
                                "<div class='dz-success-mark'>    <svg width='54px' height='54px' viewBox='0 0 54 54' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'>      <title>Check</title>      <defs></defs>      <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'>        <path d='M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z' id='Oval-2' stroke-opacity='0.198794158' stroke='#747474' fill-opacity='0.816519475' fill='#FFFFFF' sketch:type='MSShapeGroup'></path>      </g>    </svg>  </div>  " +
                                "<div class='dz-error-mark'>    <svg width='54px' height='54px' viewBox='0 0 54 54' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'>      <title>Error</title>      <defs></defs>      <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'>        <g id='Check-+-Oval-2' sketch:type='MSLayerGroup' stroke='#747474' stroke-opacity='0.198794158' fill='#FFFFFF' fill-opacity='0.816519475'>          <path d='M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z' id='Oval-2' sketch:type='MSShapeGroup'></path>        </g>      </g>    </svg>  </div>" +
                            "</div>"
                        );
                    }
                    catch(err){
                        console.log('Error in product')
                    }
                });
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
                //console.log(data);
            },
            fail: function (message){
                console.log(message);
            }
        });
    };
    
    function saveProduct(){
        
        productID = ((thisProductID === '') ? 'null' : thisProductID);
        //console.log('ID: ' + productID);
        if ($('#name').val() === ''){ showAlertError('Nome não preenchido'); return; };        
        if ($('#category').val() === ''){ showAlertError('Categoria não preenchida'); return; };        
        packWidth = (($('#pack-width').val() === '') ? "\"\"" : $('#pack-width').val());
        packHeight = (($('#pack-height').val() === '') ? "\"\"" : $('#pack-height').val());
        packLength = (($('#pack-length').val() === '') ? "\"\"" : $('#pack-length').val());
        packWeigth = (($('#pack-weight').val() === '') ? "\"\"" : $('#pack-weight').val());
        if ($('#cost').val() === ''){ showAlertError('Custo não preenchido'); return; };
        if ($('#price-final').val() === ''){ showAlertError('Preço não preenchido'); return; };
        if ($('#stock').val() === ''){ showAlertError('Estoque não preenchido'); return; }; 
        if ($('#operation-period').val() === ''){ $('#operation-period').val('0') }; 
        
        
        
        
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
            "\"skus\": [{  \"price\": " + $('#price-final').val() + ",  \"amount\": " + $('#stock').val() + ",  \"ean\": null, \"additionalTime\" : " + $('#operation-period').val() + ",  " +
            "\"partnerId\": \"" + $('#sku').val() + "\",  \"title\": \"" + $('#name').val() + "\",  \"idProduct\": null,  \"internalIdProduct\": \"2573\"}]\r\n}";
                
//        console.log(productPreparation);
//        console.log(baseURL + productID);
//        console.log(productDetailMode);
//        console.log(tokenChosen);        
        productID = ((thisProductID === null) ? null : thisProductID);
        console.log('thisProductID ' + thisProductID);
        
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
//                console.log('Response:');
//                console.log(response.id);
                thisProductID = response.id;
                //
                $.ajax({
                    type: 'POST',
                    url: '/product/create',
                    data: { "id": 0, "anymarket_id": thisProductID, "user_id": thisUserID.trim() },
                    //dataType: 'text',
                    success: function(create_response){
                        showSuccessMessage(create_response);
                        console.log(create_response);
                    },
                    fail: function(create_response){
                        showAlertError(create_response);
                        console.log(create_response);
                    },
                    error: function(create_response){
                        showAlertError(create_response.responseText);
                        console.log(create_response);
                    }
                });
                //
            },
            fail : function (response) {
                console.log('Something went wrong');
            },
            error: function(response){
                console.log(response.statusText);
                console.log(response['responseJSON']['message']);
                //
                showAlertError(response.statusText);
                showAlertError(response.message);
            }
        });  
    }
    
    if ($('tbody').hasClass('product-list')){
        thisUserID = $('.this-user-id').html();
        updateProductList();
    }
    
    $('.product-modal-lg').on('hide.bs.modal', function (e) {
        if ($('tbody').hasClass('product-list')){
            updateProductList();
        };
    });
    
    $('.product-modal-lg').on('show.bs.modal', function (e) {
        console.log(thisProductID);
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
        $('.form-control input').empty();
        $('.form-control').html('');
        //
        $('#name').val('');
        //getProductCategory('');
        $('#warranty-time').val('');
        $('#warranty-text').val('');
        $('#origin').val('');
        $('#sku').val('');
        $('#pack-width').val('');
        $('#pack-height').val('');
        $('#pack-length').val('');
        $('#pack-weight').val('');
        $('#cost').val('');
        $('#price-from').val('');
        $('#price-final').val('');
        $('#stock').val('');
        $('#operation-period').val('');
        $('#editor').html('');
        //$('.img-thumbnail-list-product').empty();
        //
        getProductCategory();
    });

    $(".btn-save-product").click(function(){        
        saveProduct();
    });
    
    $(".btn-delete-product").click(function(){        
        if (window.confirm('Você vai apagar este item para sempre. Continuar?')){
            console.log('The guy is sure...');
        }
    });
    
    $(".form-control").keypress(function(){
        var keycode = event.keyCode || event.which;
        if(keycode === '13') {
           saveProduct();
        }
    });
    
    $('.img-thumbnail-list-product').on('click', 'img', function(){
        console.log('yo');
        //$('.img-thumbnail-list-product').hide();
        //$('.dropzone').show();
    });
    
//    Dropzone.options.myAwesomeDropzone = {
//        paramName: "imageFile", // The name that will be used to transfer the file
//        maxFilesize: 1, // MB
//        acceptedFiles: "image/*",
//        maxFiles: 6,
//        accept: function(file, done) {
//            if (file.name === "justinbieber.jpg") {
//                done("Naha, you don't.");
//            }
//            else { done(); }
//        }
//    };

    Dropzone.options.myAwesomeDropzone = {
       maxFilesize: 5,
       addRemoveLinks: true,
       dictResponseError: 'Server not Configured',
       maxFiles: 6,
       acceptedFiles: "image/*",
       init:function(){
            var self = this;
            // config
            self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Delete";
            //New file added
            self.on("addedfile", function (file) {
              console.log('new file added ', file);
            });
            // Send file starts
            self.on("sending", function (file) {
              console.log('upload started', file);
              $('.meter').show();
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
              console.log("progress ", progress);
              $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
              $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
              console.log(file);
            });
        }
    };
    
});