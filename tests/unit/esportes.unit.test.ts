import { parseReferences } from "../../src/resolvers/teams";

const references = {
  "organizacoes": {
    "81": {
      "organizacao_id": 81,
      "fundacao ": "1907-05-03",
      "escudos": {
        "60x60": "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/fenerbahce65.png",
        "30x30": "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/fenerbahce30.png",
        "svg": null,
        "45x45": "https://s.glbimg.com/es/sde/f/organizacoes/2012/04/27/fenerbahce45.png"
      },
      "nome": "Fenerbahçe Spor Kulübü"
    }
  },
  "categorias": {
    "4": {
      "esporte_id": 1,
      "nome": "Profissional",
      "slug": "profissional",
      "categoria_id": 4
    }
  },
  "modalidades": {
    "1": {
      "esporte_id": 1,
      "modalidade_id": 1,
      "slug": "futebol_de_campo",
      "nome": "Futebol de campo"
    }
  },
  "esportes": {
    "1": {
      "esporte_id": 1,
      "slug": "futebol",
      "nome": "Futebol"
    }
  }
}


describe('Teams', () => {
  it('should parse references and match properties/values ', async () => {
    const parsedReferences = parseReferences(references);

    expect(parsedReferences).toMatchObject({
      categorias: Array(expect.objectContaining({
        categoria_id: expect.any(Number),
      })),
      organizacoes: Array(expect.objectContaining({
        organizacao_id: expect.any(Number),
      })),
      modalidades: Array(expect.objectContaining({
        modalidade_id: expect.any(Number),
      })),
      esportes: Array(expect.objectContaining({
        esporte_id: expect.any(Number),
      }))
    });
  });
});

