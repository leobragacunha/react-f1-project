import { returnPositionComplement } from "../../utils/helpers";

function PilotCard({ pilot, isSearch = false }) {
  // Data Example
  // !isSearch
  // {
  //   behind: null,
  //   driver: {
  //     abbr: "VER",
  //     id: 26,
  //     image: "https://media.api-sports.io/formula-1/drivers/25.png",
  //     name: "Max Verstappen",
  //     number: 1,
  //   },
  //   points: 575,
  //   position: 1,
  //   season: 2023,
  //   team: {
  //     id: 1,
  //     logo: "https://media.api-sports.io/formula-1/teams/1.png",
  //     name: "Red Bull Racing",
  //   },

  // isSearch
  //  {
  //   abbr: "MSC",
  // birthdate: "1969-03-01",
  // birthplace: null,
  // career_points: "1566",
  // country:{name: 'Germany', code: 'DE'},
  // grands_prix_entered: null,
  // highest_grid_position: null,
  // highest_race_finish: {position: null, number: null},
  // id:46,
  // image:"https://media.api-sports.io/formula-1/drivers/46.png",
  // name: "Michael Schumacher",
  // nationality: "German",
  // number: 7,
  // podiums: 155,
  // teams: (2) [{…}, {…}],
  // world_championships: 7,}

  // if (isSearch) {
  //   const {
  //     id,
  //     name: pilotName,
  //     number,
  //     image: photo,
  //     teams: [
  //       {
  //         team: { logo: teamLogo },
  //       },
  //     ],
  //   } = pilot;
  // } else {
  //   const {
  //     driver: { abbr: nameShort, id, image: photo, name: pilotName, number },
  //     points,
  //     position,
  //     season,
  //     team: { id: teamId, logo: teamLogo, name: teamName },
  //   } = pilot;
  // }

  // Declaring variables outside scope due to "conditional destructuring"
  let position,
    points,
    season,
    teamName,
    pilotName,
    photo,
    number,
    teamLogo,
    id;

  if (isSearch) {
    ({
      id,
      name: pilotName,
      number,
      image: photo,
      teams: [
        {
          team: { logo: teamLogo },
        },
      ],
    } = pilot);
  } else {
    ({
      driver: { id, image: photo, name: pilotName, number },
      points,
      position,
      season,
      team: { logo: teamLogo, name: teamName },
    } = pilot);
  }

  const { ordinal: bestPositionComplement } = position
    ? returnPositionComplement(position)
    : { ordinal: "" };

  const { emoji } = position
    ? returnPositionComplement(position)
    : { emoji: "" };

  return (
    <div className={`pilot-card card__container`}>
      <img className="card__image" src={photo} alt={`Photo of ${pilotName}`} />
      <p className="pilot-card__name card-label">
        {pilotName} {emoji}
      </p>
      <img
        className="card__image-small"
        src={teamLogo}
        alt={`Logo of ${teamName}`}
      />

      {!isSearch && (
        <>
          <p className="pilot-card__position-info card-label">
            Position in {season}:{" "}
            <span className="card-value text-content">
              {position}
              {`${bestPositionComplement}`} ({`${points} pts`})
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default PilotCard;
