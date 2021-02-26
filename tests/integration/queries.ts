export function GET_TEAM(id: number) {
  return `
    query {
        equipes(id: ${id}) {
          resultados {
            status {
              descricao
              status_id
            }
          }
        }
    }
  `;
}

export function GET_CHAMPIOSHIP(id: number) {
  return `
    query {
      campeonato(id: ${id}) {
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
}

export function GET_GAME(date: string) {
  return `
    query {
      games(date: "${date}") {
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
}