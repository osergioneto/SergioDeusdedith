import { RESTDataSource } from "apollo-datasource-rest";

export default class EsportesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:8080/`;
  }

  async getTeam(id: number) {
  async getChampionship(id: number, page = 1) {
    return this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/campeonato/${id}`);
  }
}