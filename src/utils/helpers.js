export function returnPositionComplement(position) {
  switch (position) {
    case 1:
      return { ordinal: "st", emoji: "🏆" };

    case 2:
      return { ordinal: "nd", emoji: "🥈" };

    case 3:
      return { ordinal: "rd", emoji: "🥉" };

    default:
      return { ordinal: "th" };
  }
}

// Helpers to endpoint /drivers?id=20

// Reorganizes the team array to display the results the way we want (check the last section of pilotDetail page for more details)
function organizeTeams(teams) {
  return teams.reduce((acc, team) => {
    const existingTeam = acc.find((item) => item.id === team.team.id);
    if (existingTeam) {
      existingTeam.seasons.push(team.season);
      return acc;
    } else {
      return [
        ...acc,
        {
          id: team.team.id,
          name: team.team.name,
          logo: team.team.logo,
          seasons: [team.season],
        },
      ];
    }
  }, []);
}

// Checks if a driver has a sequential contract with a team, or if he has worked with them and then returned
export function checkTeamSequence(teams) {
  const newTeams = organizeTeams(teams);

  newTeams.map((team) =>
    team.seasons.at(0) - team.seasons.at(-1) === team.seasons.length - 1
      ? (team.isSequence = true)
      : (team.isSequence = false)
  );

  return newTeams;
}
