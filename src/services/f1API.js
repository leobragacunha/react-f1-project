import { apiKey } from "../utils/constants";

export async function getCircuits() {
  const res = await fetch("https://v1.formula-1.api-sports.io/circuits", {
    method: "GET",
    headers: {
      "x-apisports-key": "https://v1.formula-1.api-sports.io/",
      "x-rapidapi-key": apiKey,
    },
  });
  const data = await res.json();

  const { errors, response: circuits } = data;

  if (errors.length > 0) throw new Error(`Couldn't fetch data ${errors}`);

  // console.log(data);

  return circuits;
}
