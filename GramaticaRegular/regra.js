export default class Regra {
    constructor() {
        this.left = '';
        this.right = [];
    }

    set nomeLeft(nome) {
        this.left = nome
    }

    get nomeLeft() {
        return this.left;
    }

    set nomeRight(nome) {
        let separate = nome.split('|')
        separate.map((elem) => {
            this.right.push(elem)
        })

    }

    get nomeRight() {
        return this.rigth;
    }
}