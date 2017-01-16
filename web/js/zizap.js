$(document).ready(function(){   
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
        console.log(err);
    }

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
    
    
    // PRODUCTS LIST PAGE
    
    var productsURL = 'http://api.anymarket.com.br/v2/products?gumgaToken=L118564309EG1480611916093R1250720512&limit=20';
    var nextProductsURL;
    var previousProductsURL;
    
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
                $('#first-name').val(data['title']);
                $('#category').val(data['category']['name']);
                $('#warranty-time').val(data['warrantyTime']);
                $('#origin').val(data['origin']['description']);
                $('#sku').val(data['skus'][0]['partnerId']);
                
                $('#product-width').val(data['width']);
                $('#product-height').val(data['height']);
                $('#product-length').val(data['length']);
                $('#product-weight').val(data['weight']);
                
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
    
    updateProductList(productsURL);
    
    $('.btn-product-list-next').click(function(){        
        $('.product-list').empty();
        updateProductList(nextProductsURL);
    });
    
    $('.btn-product-list-previous').click(function(){        
        $('.product-list').empty();
        updateProductList(previousProductsURL);
    });
    
    $('.btn-product-detail').on('click', function(){        
        console.log('yo');
    });
    
    $( ".product-list " ).on( "click", "tr td a.btn-product-detail", function() {
        openProductDetail( $( this).data('id') );
    });
    
    // ORDERS LIST PAGE
    
    var orderURL = 'http://sandbox-api.anymarket.com.br/v2/orders?gumgaToken=LG1484315269910R-224861608&limit=20';
    var nextOrderURL;
    var previousOrderURL;
    
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
                        $('.order-list').append(
                            "<tr class='odd pointer'>" +
                                "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                                "<td class=''>" + this.marketPlace + "</td>" +
                                "<td class=''>" + this.id + "</td>" +
                                "<td class=''>" + this.items[0]['product']['title'] + "</td>" +
                                "<td class=''>" + this.buyer['name'] + "</td>" +
                                "<td class=''>" + this.gross + "</td>" + 
                                "<td class=''>" + this.gross + "</td>" +
                                "<td class=''>" + this.createdAt + "</td>" +
                                "<td class=''>" + this.status + "</td>" +
                                "<td class='a-right a-right'><button class='btn btn-default' type='submit'>NF</button></td>" +
                                "<td class='last'><button class='btn btn-default' type='submit'><span class='glyphicon glyphicon-print' aria-hidden='true'></span></button></td>" +
                            "</tr>" 
                        );
                    }
                    catch(err){
                        console.log('Error in product')
                    }

                   //console.log(this);
                    $('.order-list').fadeIn();
               });
           }
       });        
    };
    
    updateOrderList(orderURL);
    
    $('.btn-order-list-next').click(function(){
        $('.order-list').empty();
        updateOrderList(nextOrderURL);
    });
    
    $('.btn-order-list-previous').click(function(){
        $('.order-list').empty();
        updateOrderList(previousOrderURL);
    });
    
    
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
    
    
});