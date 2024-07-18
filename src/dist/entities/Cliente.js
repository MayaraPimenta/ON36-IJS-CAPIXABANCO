"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(nome, id, endereco, telefone) {
        this.contas = [];
        this.nome = nome;
        this.id = id;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}
exports.Cliente = Cliente;
