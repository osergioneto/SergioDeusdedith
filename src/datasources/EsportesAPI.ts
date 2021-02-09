import { RESTDataSource } from "apollo-datasource-rest";

export default class EsportesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:8080/`;
  }

  async getTeam(id: number) {
    return this.get(`equipes/${id}`);
  }
}