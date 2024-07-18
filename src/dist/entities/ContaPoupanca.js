"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaPoupanca = void 0;
const Conta_1 = require("./Conta");
const Transacao_1 = require("./Transacao");
const TipoTransacao_1 = require("../enums/TipoTransacao");
class ContaPoupanca extends Conta_1.Conta {
    constructor(id, saldo, clienteId, rendimentoMensal) {
        super(id, saldo, clienteId);
        this.rendimentoMensal = rendimentoMensal;
    }
    depositar(valor) {
        const idTransacao = this.transacoes.length + 1;
        const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Deposito);
        this.transacoes.push(transacao);
        const saldoAtualizado = this.saldo + valor;
        const valorRendimento = saldoAtualizado * this.rendimentoMensal;
        this.saldo = saldoAtualizado + valorRendimento;
        console.log('Depósito realizado com sucesso!');
    }
    ;
    sacar(valor) {
        if (this.saldo >= valor) {
            const idTransacao = this.transacoes.length + 1;
            const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Saque);
            this.transacoes.push(transacao);
            this.saldo = this.saldo - valor;
        }
        console.log(`Saldo insuficiente! Saldo atual: R$${this.saldo}`);
    }
    ;
    transferir(valor, contaDestino) {
        if (this.saldo >= valor) {
            const idTransacao = this.transacoes.length + 1;
            const transacao = new Transacao_1.Transacao(idTransacao, valor, new Date(), this.id, TipoTransacao_1.TipoTransacao.Transferencia);
            this.transacoes.push(transacao);
            this.saldo = this.saldo - valor;
            contaDestino.depositar(valor);
            console.log('Transferencia realizada com sucesso!');
        }
    }
}
exports.ContaPoupanca = ContaPoupanca;
