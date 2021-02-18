import { formatISO, isSameDay } from "date-fns";
import { Game, GameState } from "generated/api";
import { groupGameByDate, parseReferences, differenceNowInMinutes, classifyTodayGames } from "../../src/resolvers/teams";
import { resultados, referencias } from "./game.json";

let dateNowSpy: jest.SpyInstance<Number>;
let acc: GameState;
let jogos: Array<Game> = [];
const TIMESTAMP_2019_01_01 = 1546362000000;

beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => TIMESTAMP_2019_01_01);
});

beforeEach(() => {
  resultados.jogos.forEach(val => jogos.push(Object.assign({}, val))); // Deep clone
  acc = {
    encerrado: [],
    ao_vivo: [],
    para_acontecer: []
  };
});

afterEach(() => {
  jogos = [];
  acc = {
    encerrado: [],
    ao_vivo: [],
    para_acontecer: []
  };
});

afterAll(() => {
  dateNowSpy.mockRestore();
  console.log("acc: ", acc);
});

describe('Unit | Sports', () => {
  it('should parse references and match properties/values ', () => {
    const parsedReferences = parseReferences(referencias);

    expect(parsedReferences).toMatchObject({
      sedes: expect.any(Array),
      campeonatos: expect.any(Array),
      fases: expect.any(Array),
      equipes: expect.any(Array),
      edicoes: expect.any(Array)
    });
    expect(parsedReferences).toHaveProperty(['sedes', 0, 'sede_id']);
  });
});

describe('Unit | Games', () => {
  it('should subtract two dates and return difference', () => {
    const now = new Date(Date.now());        // 14:00:00

    const gameHour1 = new Date(2019, 0, 1, 10, 30, 0); // 10:30:00
    const gameHour2 = new Date(2019, 0, 1, 13, 0, 0);  // 13:00:00
    const gameHour3 = new Date(2019, 0, 1, 18, 30, 0); // 18:30:00

    const gameDiff1 = differenceNowInMinutes(gameHour1, now);
    const gameDiff2 = differenceNowInMinutes(gameHour2, now);
    const gameDiff3 = differenceNowInMinutes(gameHour3, now);

    expect(gameDiff1).toBe(-210);
    expect(gameDiff2).toBe(-60);
    expect(gameDiff3).toBe(270);
  });

  it('should group games by state', () => {
    const games = groupGameByDate(resultados.jogos);

    expect(games.ao_vivo[0]).toHaveProperty("jogo_id");
    expect(games.encerrado[0]).toHaveProperty("jogo_id");
    expect(games.para_acontecer[0]).toHaveProperty("jogo_id");
  });

  it('should group past date games as "encerrado" ', () => {
    jogos[0].data_realizacao = "2018-05-15";
    jogos[1].data_realizacao = "2018-05-15";
    jogos[2].data_realizacao = "2018-05-15";

    const games = groupGameByDate(jogos);

    // TODO: SpyOn isBefore
    expect(games.encerrado).toHaveLength(3);
  });

  it('should group today games', () => {
    const games = groupGameByDate(jogos);

    // TODO: SpyOn isToday
    expect(games.encerrado).toHaveLength(1);
    expect(games.ao_vivo).toHaveLength(1);
    expect(games.para_acontecer).toHaveLength(1);
  });

  it('should group future date games as "para_acontecer"', () => {
    jogos[0].data_realizacao = "2019-01-03";
    jogos[1].data_realizacao = "2019-01-03";
    jogos[2].data_realizacao = "2019-01-03";

    const games = groupGameByDate(jogos);

    // TODO: SpyOn isAfter
    expect(games.para_acontecer).toHaveLength(3);
  });

  it('should classify today games', () => {
    const games = classifyTodayGames(jogos[0], acc);
    classifyTodayGames(jogos[1], acc);
    classifyTodayGames(jogos[2], acc);

    expect(games.encerrado).toHaveLength(1);
    expect(games.ao_vivo).toHaveLength(1);
    expect(games.para_acontecer).toHaveLength(1);
  });
});