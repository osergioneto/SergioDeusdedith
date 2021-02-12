import { RESTDataSource } from "apollo-datasource-rest";
import Redis from "ioredis";

export default class EsportesAPI extends RESTDataSource {
  redis: Redis.Redis;
  constructor() {
    super();
    this.baseURL = `http://localhost:8080/`;
    this.redis = new Redis();
  }

  async getTeam(id: number) {
    const cachedTeam = await this.redis.get(`esportes:team:${id}`);
    if (cachedTeam) { return JSON.parse(cachedTeam); }

    const team = await this.get(`equipes/${id}`);
    await this.redis.set(`esportes:team:${id}`, JSON.stringify(team), "EX", 100);

    return team;
  }

  async getChampionship(id: number) {
    const cachedChampioship = await this.redis.get(`esportes:champioship:${id}`);
    if (cachedChampioship) { return JSON.parse(cachedChampioship); }

    const champioship = await this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/campeonato/${id}`);
    await this.redis.set(`esportes:champioship:${id}`, JSON.stringify(champioship), "EX", 300);

    return champioship;
  }

  async getGames(date: string) {
    const games = await this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/data/${date}/jogos`);

    return games;
  }
}