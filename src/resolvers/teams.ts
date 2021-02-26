import { TeamResult, ChampionshipResult, Game, GameResult, GameState } from "generated/api";
import { parse, formatDistanceStrict, isAfter, parseISO, isBefore, isSameDay } from "date-fns";
import { breaker } from "../utils";

export default {
  Query: {
    equipes: async (_ctx: any, { id }: any, { dataSources }: any): Promise<any> => {
      const { resultados, referencias, paginacao }: TeamResult = await breaker.fire("getTeam", id, dataSources);
      const parsedReferences = parseReferences(referencias);

      return {
        resultados: resultados,
        referencias: parsedReferences,
        paginacao: paginacao
      };
    },
    campeonato: async (_ctx: any, { id }: any, { dataSources }: any): Promise<ChampionshipResult> => {
      const { resultados, referencias, paginacao }: ChampionshipResult = await breaker.fire("getChampionship", id, dataSources);
      const parsedReferences = parseReferences(referencias);

      return {
        resultados,
        referencias: parsedReferences,
        paginacao
      };
    },
    games: async (_ctx: any, { date }: any, { dataSources }: any): Promise<GameResult> => {
      const { resultados, referencias, paginacao } = await breaker.fire("getGames", date, dataSources);
      const parsedReferences = parseReferences(referencias);
      const jogos = groupGameByDate(resultados.jogos);

      return {
        resultados: { jogos },
        referencias: parsedReferences,
        paginacao
      };
    },
  },
}

// TODO: Isolar resolver de jogos e suas funções
export function parseReferences(references: any) {
  const referenceKeys = Object.keys(references);
  const referenceValues = referenceKeys.map((key) => Object.values(references[key]));

  const parsedReferences = Object.fromEntries(referenceKeys.map((_, i) => [referenceKeys[i], referenceValues[i]]));

  return parsedReferences;
}

export function groupGameByDate(games: Game[]) {
  const groupedGames = games.reduce<GameState>((acc, curr) => {
    const gameDate = parseISO(curr.data_realizacao);
    const today = new Date(Date.now());

    switch (true) {
      case isSameDay(gameDate, today):
        classifyTodayGames(curr, acc); break;
      case isBefore(gameDate, today):
        acc.encerrado.push(curr); break;
      case isAfter(gameDate, today):
        acc.para_acontecer.push(curr); break;
    }

    return acc;
  }, {
    encerrado: [],
    ao_vivo: [],
    para_acontecer: []
  });

  return groupedGames;
}

export function differenceNowInMinutes(gameHour: Date | number, hourNow: Date | number = Date.now()) {
  let multiplier = 1;
  if (isAfter(hourNow, gameHour)) { multiplier = -1; }

  return Number(formatDistanceStrict(Date.now(), gameHour, { unit: "minute" }).replace(/\s.*/gi, "")) * multiplier;
}

export function classifyTodayGames(game: Game, accumulator: GameState) {
  const gameHour = parse(game.hora_realizacao, "HH:mm:ss", new Date(Date.now()));
  const differenceInMinutes = differenceNowInMinutes(gameHour);

  if (differenceInMinutes <= -120) {
    accumulator.encerrado.push(game);
  } else if (differenceInMinutes > -120 && differenceInMinutes <= 0) {
    accumulator.ao_vivo.push(game);
  } else {
    accumulator.para_acontecer.push(game);
  }

  return accumulator;
}