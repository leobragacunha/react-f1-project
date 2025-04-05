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

  // console.log(circuits, errors);

  return { circuits, errors };
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

  return { errors, teams };
}

// There is no endpoint directly to drivers (to get all drivers info)
export async function getPilotsPerSeason(seasonYear) {
  const res = await fetch(`${BASE_URL}/rankings/drivers?season=${seasonYear}`, {
    method: "GET",
    headers: {
      "x-apisports-key": `${BASE_URL}/`,
      "x-rapidapi-key": apiKey,
    },
  });

  const data = await res.json();

  const { errors, response: pilotsSeason } = data;

  if (errors.length > 0)
    throw new Error(`Couldn't fetch drivers from the API (${errors})`);

  console.log(pilotsSeason);

  return { errors, pilotsSeason };
}

export async function getPilot({ id, name, searchQuery }) {
  let endpointURL = `${BASE_URL}/drivers`;
  if (id) endpointURL += `?id=${id}`;
  if (name) endpointURL += `?name=${name}`;
  if (searchQuery) endpointURL += `?search=${searchQuery}`;

  const res = await fetch(`${endpointURL}`, {
    method: "GET",
    headers: {
      "x-apisports-key": `${BASE_URL}/`,
      "x-rapidapi-key": apiKey,
    },
  });

  const data = await res.json();

  const { errors, response } = data;
  const pilot = response;

  if (errors.length > 0)
    throw new Error(`Couldn't fetch driver from the API (${errors})`);

  return { errors, pilot };
}
