import util from 'util';
import rp from 'request-promise';
import { exec } from 'child_process';

const pExec = util.promisify(exec);
const uri = 'http://localhost:4000/';

beforeAll(async () => {
  // spawn EsportesAPI
  // spawn GraphQL BFF
});

describe('Teams', () => {
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

afterAll(async () => {
  // kill EsportesAPI
  // kill GraphQL BFF
});