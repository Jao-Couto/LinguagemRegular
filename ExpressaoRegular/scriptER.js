$(window).on("load", function () {
    $('#nav-er').addClass("active")
    $('#nav-home').removeClass("active")
    $('#nav-af').removeClass("active")
    $('#nav-gr').removeClass("active")

    let reg
    let elem = 0
    $("#moreT").click(() => {
        elem++
        $('#elementosTeste').append(`<div class="input-group m-1 ">
        <input type="text" class="form-control" id="entrada`+ elem + `"> 
    </div>`)

    })

    $('#teste').click(() => {
        for (let j = 0; j <= elem; j++) {
            let entrada = $('#entrada' + j)
            if (reg.test(entrada.val()))
                entrada.css("background-color", "#0f0")
            else
                entrada.css("background-color", "#ff7075")
        }
    })

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

});
