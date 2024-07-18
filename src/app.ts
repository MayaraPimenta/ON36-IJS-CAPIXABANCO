import { Cliente } from './entities/Cliente';
import { ContaCorrente } from './entities/ContaCorrente';
import { ContaPoupanca } from './entities/ContaPoupanca';

const cliente = new Cliente('Mayara', 1, 'rua A, n1', '99999999');
const ccCliente = new ContaCorrente(1, 0, cliente.id, 100);
const cpCliente = new ContaPoupanca(2, 0, cliente.id, 0.02);

console.log(cliente);
console.log(ccCliente);
console.log(cpCliente);