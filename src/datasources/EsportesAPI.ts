import { RESTDataSource } from "apollo-datasource-rest";
import Redis from "ioredis";

export default class EsportesAPI extends RESTDataSource {
  private redis;
  private CACHE_TTL = 300;

  constructor(redis: Redis.Redis) {
    super();
    this.baseURL = `${process.env.ESPORTE_API_URL}:${process.env.ESPORTE_API_PORT}/`;
    this.redis = redis;
  }

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
    const gameID = date.replace(/-/gi, ".");
    const cachedGames = await this.redis.get(`sports:games#${gameID}`);
    if (cachedGames) { return JSON.parse(cachedGames); }

    const games = await this.get(`esportes/futebol/modalidades/futebol_de_campo/categorias/profissional/data/${date}/jogos`);
    await this.redis.set(`sports:games#${gameID}`, JSON.stringify(games), "EX", this.CACHE_TTL);

    return games;
  }
}