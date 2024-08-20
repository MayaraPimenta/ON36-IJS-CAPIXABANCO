import { Injectable } from '@nestjs/common';
import { Iendereco } from '../Iendereco';

@Injectable()
export class CepAdapter {
  adaptaCep(endereco): Iendereco {
    const enderecoAdaptado = {
      cep: endereco.cep,
      rua: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
    };

    return enderecoAdaptado;
  }
}

//porta: interface de contrato
//adapter: altera dado pra que se encaixe no padrão necessário pra aplicação
