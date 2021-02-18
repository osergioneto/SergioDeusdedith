import rp from 'request-promise';
import { ApolloServer } from 'apollo-server';
import { spawnBFFServer } from "../utils";

const uri = 'http://localhost:4000/';
let bffServer: ApolloServer;

beforeAll(async () => {
  bffServer = await spawnBFFServer(4000);
});


describe('Integration | Teams', () => {
  it.concurrent('fetches single team', async () => {
    const query = `
            query {
                equipes(id: "52") {
                  resultados {
                    status {
                      descricao
                      status_id
                    }
                  }
                }
            }
        `;

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.data).toEqual({ "equipes": { "resultados": { "status": { "descricao": "Ativo", "status_id": "1" } } } });
  });

  it.concurrent('should throw when team is not found', async () => {
    const query = `
            query {
                equipes(id: "11") {
                  resultados {
                    status {
                      descricao
                      status_id
                    }
                  }
                }
            }
        `;

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

describe('Integration | Championship', () => {
  it.concurrent('fetches single championship', async () => {
    const query = `
            query {
              campeonato(id: "26") {
                resultados {
                  campeonato_id
                  nome
                  slug
                  genero
                }
                paginacao{
                  pagina
                  anterior
                  paginas
                  por_pagina
                  total
                }
              }
            }
        `;

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.data).toEqual({
      "campeonato": {
        "resultados": {
          "campeonato_id": "26",
          "nome": "Campeonato Brasileiro",
          "slug": "campeonato-brasileiro",
          "genero": "M"
        },
        "paginacao": {
          "anterior": null,
          "paginas": 10,
          "por_pagina": 20,
          "pagina": 1,
          "total": 188
        }
      }
    });
  });

  it.concurrent('should throw when championship is not found', async () => {
    const query = `
            query {
              campeonato(id: "0") {
                resultados {
                  campeonato_id
                }
              }
            }
        `;

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

describe('Integration | Games', () => {
  it.concurrent('fetches single game', async () => {
    const query = `
            query {
              games(date: "2019-01-02") {
                resultados {
                  jogos {
                    encerrado {
                      jogo_id
                    }
                    ao_vivo {
                      jogo_id
                    }
                  }
                }
              }
            }
        `;



    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.data.games.resultados.jogos.encerrado).toHaveLength(16);
    expect(res.data.games.resultados.jogos.ao_vivo).toHaveLength(0);
  });

  it.concurrent('should throw when game is not found', async () => {
    const query = `
            query {
              games(date: "2019-13-35") {
                resultados {
                  jogos {
                    encerrado {
                      jogo_id
                    }
                  }
                }
              }
            }
        `;

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

afterAll(async () => {
  bffServer.stop();
});