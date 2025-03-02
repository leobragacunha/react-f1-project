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

  if (errors.length > 0) throw new Error(`Couldn't fetch data ${errors}`);

  // console.log(data);

  return circuits;
}

export async function getTeams() {
  const res = await fetch(`${BASE_URL}/teams`, {
    method: "GET",
    headers: {
      "x-apisports-key": `${BASE_URL}/`,
      "x-rapidapi-key": apiKey,
    },
  });

  const data = await res.json();

  console.log(data);
}
