import CircuitBreaker from "opossum";

const circuitBreakOptions = {
  timeout: Number(process.env.CIRCUIT_BREAKER_TIMEOUT) ?? 15000,
  errorThresholdPercentage: Number(process.env.CIRCUIT_BREAKER_THRESHOLD_PERCENTAGE) ?? 50,
  resetTimeout: Number(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT) ?? 5000
}

type EndPoint = "getTeam" | "getChampionship" | "getGames";

async function call(endpoint: EndPoint, arg: number | string, dataSources: any) {
  return dataSources.esportesAPI[endpoint](arg);
}

export const breaker = new CircuitBreaker(call, circuitBreakOptions);
