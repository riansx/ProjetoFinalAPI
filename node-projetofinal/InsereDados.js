// src/testes/TestaInserirRegistros.js
import sequelize from './src/config/database.js';
import Fabricante from './src/models/Fabricante.js';
import Medicamento from './src/models/Medicamento.js';


(async () => {
  try {
    // Sincronizar o banco de dados
    // Recriar as tabelas no novo banco de dados
    await sequelize.sync({ force: true }); // Recria tabelas do zero
    console.log('Novo banco de dados criado!');


    await Fabricante.create({ nome: 'Fabricante 01', documentoRegistro: '0001A', pais: 'Brasil' }
    );
    await Fabricante.create({ nome: 'Fabricante 02', documentoRegistro: '0002A', pais: 'Brasil' }
    );
    await Fabricante.create({ nome: 'Fabricante 03', documentoRegistro: '0003A', pais: 'Brasil' }
    );

    console.log('Estados criados!');

    await Medicamento.create({ nomeComercial  : 'Tylenol', principioAtivo: 'Paracetamol', registroAnvisa: '2133', dosagem: '10mg', fabricante_id: 1 }); 
    await Medicamento.create({ nomeComercial  : 'Alivium', principioAtivo: 'Ibuprofeno', registroAnvisa: '2134', dosagem: '50mg', fabricante_id: 1 });
    await Medicamento.create({ nomeComercial  : 'Mylanta Plus', principioAtivo: 'Hidroxido de Aluminio', registroAnvisa: '2131', dosagem: '80mg/mL', fabricante_id: 2 });

    console.log('Medicamento Criado!');

  } catch (error) {
    console.error('Erro ao inserir registros:', error.message);
  }
})();


