import { RESTDataSource } from "apollo-datasource-rest";
import Redis from "ioredis";

export default class EsportesAPI extends RESTDataSource {
  redis: Redis.Redis;
  constructor() {
    super();
    this.baseURL = `http://localhost:8080/`;
    this.redis = new Redis();
  }

  private CACHE_TTL = 30;

  async getTeam(id: number) {
    const cachedTeam = await this.redis.get(`sports:team#${id}`);
    if (cachedTeam) { return JSON.parse(cachedTeam); }

    const team = await this.get(`equipes/${id}`);
    await this.redis.set(`sports:team#${id}`, JSON.stringify(team), "EX", this.CACHE_TTL);

    return team;
  }

  async getChampionship(id: number) {
    const cachedChampioship = await this.redis.get(`sports:champioship#${id}`);
    if (cachedChampioship) { return JSON.parse(cachedChampioship); }

    const champioship = await this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/campeonato/${id}`);
    await this.redis.set(`sports:champioship#${id}`, JSON.stringify(champioship), "EX", this.CACHE_TTL);

    return champioship;
  }

  async getGames(date: string) {
    const games = await this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/data/${date}/jogos`);

    return games;
  }
}