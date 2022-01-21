// use Air datepicker in css element (class), we need add .datepicker-here where we want to use
new AirDatepicker('.datepicker-here');


// when click checkbox hidden element input and set value 0
$('#montlyAddDeposit').click(function() {
    if($(".calculator__montlyAddDeposit-checkBox").is(':checked')) {
        $(".calculator__sumAdd").css("visibility", 'visible');
        var sumAdd = $( "input[name=sumAdd]" ).val('');
        
    } else {
        $(".calculator__sumAdd").css("visibility", 'hidden');
        $(".calculator__sumAdd").css("visibility", 'hidden');
        var sumAdd = $( "input[name=sumAdd]" ).val(0);

    };
});

// action click button calculate
function handleClick() {
    var date = $( "input[name=startDate]" ).val();
    var term = $( "input[name=term]" ).val();
    var period = $( "select[name=period]" ).val();
    var sum = $( "input[name=sum]" ).val();
    var percent = $( "input[name=percent]" ).val();
    var sumAdd = $( "input[name=sumAdd]" ).val();

    
    // convert date from DD.MM.YYYY to YYYY.MM.DD
    var d=new Date(date.split(".").reverse().join("-"));
    var dd=d.getDate();
    var mm=d.getMonth()+1;
    var yy=d.getFullYear();
    var newDate=yy+"/"+mm+"/"+dd;
    
    
    // convert variable in date javascript
    var startDate = (new Date(newDate));
    startDate.getDate(Date.parse())
    
    
    // date setting last day in month
    var endDateMonth = new Date(newDate);
    endDateMonth.setDate(daysInMonth((startDate.getMonth()),(startDate.getFullYear())))
    endDateMonth.setMonth(startDate.getMonth())
    endDateMonth.setFullYear(startDate.getFullYear())
    
    
    // calculate difference between two date
    var msPerDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одних сутках
    var daysLeftover = (endDateMonth.getTime() - startDate.getTime()) / msPerDay;
    var daysLeftover = Math.round(daysLeftover); // возвращает количество дней, оставшихся до конца года
    

    // calculate deposit
    var daysN = daysInMonth((startDate.getMonth() + 1),(startDate.getFullYear()));
    var daysY = daysInYear(startDate.getFullYear());
    
    
    if (period === 'месяц') {
        var amountMonth = term
    } else {
        var amountMonth = term * 12
    }
    
    var sumN1 = ((sum * ((daysLeftover * (percent / daysY)) / 100)) + +sum);
    
    var sumN = (sumN1 + (sumN1 + sumAdd) * daysN * (percent / daysY));
    
    
    // show result if ford valid
    if($("#form_1").valid()) {
        $(".calculator__result").show();
        $('div.calculator__amountPaid-value').text(Math.round(sumN).toLocaleString());
       }


    // ajax
    $("#form_1").submit(function (e) {
        e.preventDefault();
    
        function call() {
            $.ajax({
            type: 'POST',
            url: 'calc.php',
            // dataType: 'json',
            data: $('#form_1').serialize(),
            success: function(data) {
                // $('.calculator__amountPaid').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
            });
    
        }
    
     call()
    
    })

    

}


// function number of days in a year
function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}


// function number of days in a month
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}


// action click submit form
$('.calculator__form-submit').click(function(){
    handleClick();
})


// Validation form (jquery validation plugin)
$("#form_1").validate({
    errorElement: 'span',
    errorClass: 'help-inline',
    rules:{
        startDate: {
            required: true,
        },
        term: {
            required: true,
            min: 1,
            max: 60,
        },
        sum:{
            required: true,
            min: 1000,
            max: 3000000,
        },
        percent:{
            required: true,
            min: 3,
            max: 100,
        },
        sumAdd:{
            required: true,
            min: 0,
            max: 3000000,
        },
    },
    messages:{
        startDate: {
            required: "Заполните поле",
        },
        term: {
            required: "Заполните поле",
            min: "Не менее 1",
            max: "Не более 60 месяцев или 5 лет",
        },
        sum:{
            required: "Заполните поле",
            min: "Не менее 1 000",
            max: "Не более 3 000 000",
        },
        percent:{
            required: "Заполните поле",
            min: "Не менее 3",
            max: "Не более 100",
        },
        sumAdd:{
            required: "Заполните поле",
            min: "Не менее 0",
            max: "Не более 3 000 000",
        },
    },
    

});
















