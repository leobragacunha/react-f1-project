function TeamCard({ team }) {
  // Data Example
  // base: "Maranello, Italy",
  //   chassis: "SF-24",
  //   director: "Frédéric Vasseur",
  //   engine: "Ferrari",
  //   fastest_laps: 263,
  //   first_team_entry: 1950,
  //   highest_race_finish: { position: 1, number: 249 },
  //   id: 3,
  //   logo: "https://media.api-sports.io/formula-1/teams/3.png",
  //   name: "Scuderia Ferrari",
  //   pole_positions: 253,
  //   president: "John Elkann",
  //   technical_manager: "Loic Serra / Enrico Gualtieri",
  //   tyres: "Pirelli",
  //   world_championships: 16,

  return (
    <div className="team-card card__container">
      <img
        className="team-card card__image"
        src={team.logo}
        alt={`${team.name} logo`}
      />

      <p className="team-card__name card-label">Name</p>
      <p className="team-card__name card-value">{team.name}</p>

      <p className="team-card__created-in card-label">Created in</p>
      <p className="team-card__created-in card-value">
        {team.first_team_entry || "Unknown"}
      </p>

      <p className="team-card__championship card-label">Championships</p>
      <p className="team-card__championship card-value">
        {team.world_championships > 0
          ? `${
              team.world_championships < 13
                ? "🏆".repeat(team.world_championships)
                : "🏆".repeat(10) + "+++"
            }`
          : "None"}
        {team.world_championships > 0 && (
          <span>({team.world_championships})</span>
        )}
      </p>
    </div>
  );
}

export default TeamCard;
