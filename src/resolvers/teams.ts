export default {
  Query: {
    equipes: async (_ctx: any, { id }: any, { dataSources }: any) => {
      const { resultados } = await dataSources.esportesAPI.getTeam(id);
      console.log("resultados: ", resultados);
      return resultados.status;
    }
  },
}