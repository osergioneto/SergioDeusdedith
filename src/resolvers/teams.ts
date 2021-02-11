import { TeamResult, ChampionshipResult } from "generated/api";

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
  },
}

function parseReferences(references: any) {
  const referenceKeys = Object.keys(references);
  const referenceValues = referenceKeys.map((key) => Object.values(references[key]));

  const parsedReferences = Object.fromEntries(referenceKeys.map((_, i) => [referenceKeys[i], referenceValues[i]]));

  return parsedReferences;
}