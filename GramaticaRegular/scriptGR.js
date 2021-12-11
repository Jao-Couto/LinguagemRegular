



$(window).on("load", function () {
    let elem = 0;
    let obj = {}
    let pos
    let t
    let ini
    adicionarEventos()

    function adicionarEventos() {
        $('#dir' + elem).keyup(function (e) {
            pos = this.id[3]
            obj[t][pos] = this.value
            console.log(obj);
        })

        $('#esq' + elem).keyup(function (e) {
            if (elem == 0)
                ini = this.value
            pos = this.id[3]
            t = this.value
            if (!obj[t])
                obj[t] = []
        });
    }

    $("#more").click(() => {
        elem++
        $('#elementos').append(`<div class="input-group m-1">
        <input type="text" class="form-control col-2" size="5"  name="esq`+ elem + `" id="esq` + elem + `">
        <div class="input-group-prepend">
            <span class="input-group-text">-></span>
        </div>
        <input type="text" class="form-control" name="dir`+ elem + `" id="dir` + elem + `">
    </div>`)
        adicionarEventos()
    })






    $('#teste').click((e) => {
        let value = $('#entrada').val();
        let res
        Object.keys(obj).forEach((item) => {
            console.log(obj[item]);
            res = obj[item].filter(
                function (elem) {
                    return elem[0] === value
                }
            );
            if (res.length > 0)
                console.log("bate");
        });
    })


});