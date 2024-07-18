"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transacao = void 0;
class Transacao {
    constructor(id, valor, dateTime, contaId, tipo) {
        this.id = id;
        this.valor = valor;
        this.dateTime = dateTime;
        this.contaId = contaId;
        this.tipo = tipo;
    }
}
exports.Transacao = Transacao;
