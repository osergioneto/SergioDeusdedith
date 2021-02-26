import rp from 'request-promise';
import { ApolloServer } from 'apollo-server';
import { spawnBFFServer } from "../utils";
import { GET_CHAMPIOSHIP, GET_GAME, GET_TEAM } from "./queries";

const uri = `http://localhost:4000/graphql`;
let bffServer: ApolloServer;

beforeAll(async () => {
  bffServer = await spawnBFFServer(4000);
});

describe('Integration | Teams', () => {
  it.concurrent('fetches single team', async () => {
    const query = GET_TEAM(52);

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.data).toEqual({ "equipes": { "resultados": { "status": { "descricao": "Ativo", "status_id": "1" } } } });
  });

  it.concurrent('should throw when team is not found', async () => {
    const query = GET_TEAM(11);

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

describe('Integration | Championship', () => {
  it.concurrent('fetches single championship', async () => {
    const query = GET_CHAMPIOSHIP(26);

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
    const query = GET_CHAMPIOSHIP(0);

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

describe('Integration | Games', () => {
  it.concurrent('fetches single game', async () => {
    const query = GET_GAME("2019-01-02");

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.data.games.resultados.jogos.encerrado).toHaveLength(16);
    expect(res.data.games.resultados.jogos.ao_vivo).toHaveLength(0);
  });

  it.concurrent('should throw when game is not found', async () => {
    const query = GET_GAME("2019-13-35");

    const res = await rp({ method: 'POST', uri, body: { query }, json: true });
    expect(res.errors[0].message).toEqual("404: Not Found");
  });
});

afterAll(async () => {
  bffServer.stop();
});