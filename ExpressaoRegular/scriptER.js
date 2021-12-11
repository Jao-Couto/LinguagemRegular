

$(window).on("load", function () {
    let reg
    $('#expressao').keyup(function (e) {
        reg = new RegExp('^(' + this.value + ')$');
        console.log(reg.test(this.value));
        if (reg.test($('#entrada1').value))
            $('#entrada1').css("background-color", "#0f0")
        else
            $('#entrada1').css("background-color", "#ff7075")

        if (reg.test($('#entrada2').value))
            $('#entrada2').css("background-color", "#0f0")
        else
            $('#entrada2').css("background-color", "#ff7075")
    });

    $('#entrada1').keyup(function (e) {
        if (reg.test(this.value))
            $('#entrada1').css("background-color", "#0f0")
        else
            $('#entrada1').css("background-color", "#ff7075")
    });

    $('#entrada2').keyup(function (e) {
        if (reg.test(this.value))
            $('#entrada2').css("background-color", "#0f0")
        else
            $('#entrada2').css("background-color", "#ff7075")
    });


});
