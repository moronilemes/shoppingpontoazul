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
    
    
    var productList;
    
    $.ajax({
        url: 'http://api.anymarket.com.br/v2/products?gumgaToken=L118564309EG1480611916093R1250720512',
        dataType: 'json',        
        success: function (data) {
            console.log(data);
            $.each(data['content'], function(index) {
                console.log(this.images[0]['lowResolutionUrl']);
                console.log(this.title);
                console.log(this.skus[0]['partnerId']);
                console.log(this.skus[0]['price']);
                console.log('ativo');
                console.log(this.skus[0]['amount']);
                console.log('---------------------------------------------');
                $('.product-list').append(
                    "<tr class='even pointer'>" + 
                        "<td class='a-center'><input type='checkbox' class='flat' name='table_records'></td>" +
                        "<td class=''><img src='" + this.images[0]['thumbnailUrl'] + "' /></td>" +
                        "<td class=''>" + this.title + "</td>" +
                        "<td class=''>" + this.skus[0]['partnerId'] + "</td>" +
                        "<td class=''>" + this.skus[0]['price'] + "</td>" +
                        "<td class=''>Ativo</td>" +
                        "<td class=''>" + this.skus[0]['amount'] + "</td>" +
                    "</tr>"    
                );
                
                
                //console.log(this);
                
            });
        }
    }); 
    
});