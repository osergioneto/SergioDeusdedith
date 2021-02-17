import { TeamResult, ChampionshipResult, Game, GameResult } from "generated/api";
import { parse, formatDistanceStrict, isAfter, differenceInMinutes } from "date-fns";
// import { parse, formatDistanceStrictWithOptions } from "date-fns/fp";

export default {
  Query: {
    equipes: async (_ctx: any, { id }: any, { dataSources }: any): Promise<TeamResult> => {
      const { resultados, referencias, paginacao }: TeamResult = await dataSources.esportesAPI.getTeam(id);
      const parsedReferences = parseReferences(referencias);

      return {
        resultados,
        referencias: parsedReferences,
        paginacao
      };
    },
    campeonato: async (_ctx: any, { id }: any, { dataSources }: any): Promise<ChampionshipResult> => {
      const { resultados, referencias, paginacao }: ChampionshipResult = await dataSources.esportesAPI.getChampionship(id);
      const parsedReferences = parseReferences(referencias);

      return {
        resultados,
        referencias: parsedReferences,
        paginacao
      };
    },
    games: async (_ctx: any, { date }: any, { dataSources }: any): Promise<GameResult> => {
      const { resultados, referencias, paginacao } = await dataSources.esportesAPI.getGames(date);
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

export function parseReferences(references: any) {
  const referenceKeys = Object.keys(references);
  const referenceValues = referenceKeys.map((key) => Object.values(references[key]));

  const parsedReferences = Object.fromEntries(referenceKeys.map((_, i) => [referenceKeys[i], referenceValues[i]]));

  return parsedReferences;
}

export function groupGameByDate(games: Game[]) {
  const groupedGames = games.reduce<{ encerrado: Array<Game>, ao_vivo: Array<Game>, para_acontecer: Array<Game> }>((acc, curr) => {
    const gameHour = parse(curr.hora_realizacao, "HH:mm:ss", new Date(Date.now()));
    const minutes = differenceNowInMinutes(gameHour);

    if (minutes <= -120) {
      acc.encerrado.push(curr);
    } else if (minutes > -120 && minutes <= 0) {
      acc.ao_vivo.push(curr);
    } else {
      acc.para_acontecer.push(curr);
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