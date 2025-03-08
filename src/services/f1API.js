import { apiKey, BASE_URL } from "../utils/constants";

export async function getCircuits({ circuitId = "" }) {
  const res = await fetch(
    `${BASE_URL}/circuits${circuitId ? `?id=${circuitId}` : ""}`,
    {
      method: "GET",
      headers: {
        "x-apisports-key": `${BASE_URL}/`,
        "x-rapidapi-key": apiKey,
      },
    }
  );
  const data = await res.json();

  const { errors, response: circuits } = data;

  if (errors.length > 0)
    throw new Error(`Couldn't fetch circuits from the API ${errors}`);

  // console.log(data);

  return circuits;
}

export async function getTeams({ teamId = "" }) {
  const res = await fetch(`${BASE_URL}/teams${teamId ? `?id=${teamId}` : ""}`, {
    method: "GET",
    headers: {
      "x-apisports-key": `${BASE_URL}/`,
      "x-rapidapi-key": apiKey,
    },
  });

  const data = await res.json();

  const { errors, response: teams } = data;

  if (errors.length > 0)
    throw new Error(`Couldn't fetch teams from the API (${errors})`);

  // console.log(teams);

  return teams;
}
