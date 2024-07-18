"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaCorrente = void 0;
const Conta_1 = require("./Conta");
const Transacao_1 = require("./Transacao");
const TipoTransacao_1 = require("../enums/TipoTransacao");
class ContaCorrente extends Conta_1.Conta {
    constructor(id, saldo, clienteId, limiteChequeEspecial) {
        super(id, saldo, clienteId);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    verificaSaldo(valor) {
        return valor < 0 && Math.abs(valor) <= this.limiteChequeEspecial;
    }
    depositar(valor) {
        const idTransacao = this.transacoes.length + 1;
        const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Deposito);
        this.transacoes.push(transacao);
        this.saldo = this.saldo + valor;
        console.log('Depósito realizado com sucesso!');
    }
    ;
    sacar(valor) {
        const valorRestante = this.saldo - valor;
        if (this.verificaSaldo(valorRestante)) {
            const idTransacao = this.transacoes.length + 1;
            const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Saque);
            this.transacoes.push(transacao);
            this.saldo = valorRestante;
            console.log(`Saque realizado com sucesso! Saldo atual: R$${this.saldo}`);
        }
        console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}
      | Limite Cheque especial: R$${this.limiteChequeEspecial}`);
    }
    ;
    transferir(valor, contaDestino) {
        const valorRestante = this.saldo - valor;
        if (this.verificaSaldo(valorRestante)) {
            const idTransacao = this.transacoes.length + 1;
            const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Transferencia);
            this.transacoes.push(transacao);
            this.saldo = valorRestante;
            contaDestino.depositar(valor);
            console.log('Transferencia realizada com sucesso!');
        }
    }
    ;
}
exports.ContaCorrente = ContaCorrente;
