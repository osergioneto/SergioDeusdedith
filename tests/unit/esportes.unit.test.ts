import { groupGameByDate, parseReferences, differenceNowInMinutes } from "../../src/resolvers/teams";
import game from "./game.json";

let dateNowSpy: any;

beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1546362000000);
});

afterAll(() => {
  dateNowSpy.mockRestore();
});

describe('Sports', () => {
  it('should parse references and match properties/values ', () => {
    const parsedReferences = parseReferences(game.referencias);

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

describe('Games', () => {
  it('should group games by state', () => {
    const games = groupGameByDate(game.resultados.jogos);

    expect(games.ao_vivo[0]).toHaveProperty("jogo_id");
    expect(games.encerrado[0]).toHaveProperty("jogo_id");
    expect(games.para_acontecer[0]).toHaveProperty("jogo_id");
  });

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
});