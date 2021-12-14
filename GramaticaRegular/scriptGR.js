import Regra from './regra.js'


$(window).on("load", function () {
    $('#nav-er').removeClass("active")
    $('#nav-home').removeClass("active")
    $('#nav-af').removeClass("active")
    $('#nav-gr').addClass("active")

    let elem = 0;
    let regras = []
    let inicial = 'S'
    let elemInput = 0
    let focus


    $("#esq").keyup(() => {
        $("#esq").val($("#esq").val().toUpperCase())
    })

    $("#moreT").click(() => {
        elem++
        $('#elementosTeste').append(`<div class="input-group m-1 ">
        <input type="text" class="form-control" id="entrada`+ elem + `"> 
    </div>`)

    })

    $("#more").click(() => {
        $('#elementos').append(`<div class="input-group m-1" id="elem` + elemInput + `">
        <input type="text" class="form-control col-2" size="5" value="`+ $("#esq").val() + `" id="esq` + elemInput + `" readonly>
        <div class="input-group-prepend">
            <span class="input-group-text">-></span>
        </div>
        <input type="text" class="form-control" value="`+ $("#dir").val() + `" id="dir` + elemInput + `" readonly>
        <div class="input-group-prepend ">
                        <input type="button" class="form-control bg-info text-white" id="del` + elemInput + `" value="-">
                    </div>  
    </div>`)
        let r = new Regra()
        r.nomeLeft = $("#esq").val()
        r.nomeRight = $("#dir").val()
        regras.push(r)
        console.log(regras);
        $("#esq").val('')
        $("#dir").val('')

        $('#del' + elemInput).click(function () {
            let id = $(this).attr('id')[3]
            let r = new Regra()
            r.nomeLeft = $("#esq" + id).val()
            r.nomeRight = $("#dir" + id).val()
            regras.pop(r)
            $('#elem' + id).remove()
        })

        elemInput++
    })



    $('#inicial').keyup((e) => {
        inicial = $('#inicial').val();
    })

    $('#teste').click((e) => {
        console.log('-------------------------------------');
        for (let j = 0; j <= elem; j++) {
            let value = $('#entrada' + j).val();
            console.log(value);
            let prox = [inicial]
            let first
            let i
            let final = ''
            for (i = 0; i < value.length; i++) {
                console.log('teste ' + i);
                console.log('letra ' + value[i]);
                regras.map((elem) => {
                    prox.map((elem1) => {
                        console.log(elem.left + ' + ' + prox);
                        if (elem.left == elem1)
                            first = elem.right
                    })

                })

                console.log(first);
                if (first == undefined)
                    break
                prox = []
                first.filter((elem) => {
                    console.log(elem[0] + ',' + value[i]);
                    if (elem[0] == value[i]) {
                        final += elem[0]
                        if (elem[1] != undefined)
                            prox.push(elem[1])
                    }
                })
                console.log('proximo');
                console.log(prox);
                if (prox.length == 0) {
                    break
                }
            }
            i++
            console.log('final ' + final);
            if (final == value && prox.length == 0)
                $('#entrada' + j).css("background-color", "#0f0")
            else $('#entrada' + j).css("background-color", "#ff7075")
        }

    })

    $('body').click(() => {
        if (document.activeElement.getAttribute("id") != 'vazio')
            focus = document.activeElement
    })

    $('#vazio').click(() => {
        $(focus).val($(focus).val() + 'ε')
    })

});