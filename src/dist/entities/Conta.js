"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
class Conta {
    constructor(id, saldo, clienteId) {
        this.transacoes = [];
        this.id = id;
        this.clienteId = clienteId;
        this.saldo = saldo;
    }
}
exports.Conta = Conta;
