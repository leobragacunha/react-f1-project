import { returnPositionComplement } from "../../utils/helpers";

function PilotCard({ pilot }) {
  // Data Example
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

  const {
    driver: { abbr: nameShort, id, image: photo, name: pilotName, number },
    points,
    position,
    season,
    team: { id: teamId, logo: teamLogo, name: teamName },
  } = pilot;

  const { ordinal: bestPositionComplement } =
    returnPositionComplement(position);

  const { emoji } = returnPositionComplement(position);

  return (
    <div className="pilot-card card__container">
      <img className="card__image" src={photo} alt={`Photo of ${pilotName}`} />
      <p className="pilot-card__name card-label">{pilotName}</p>
      <div className="pilot-card__team">
        <img
          className="card__image-small"
          src={teamLogo}
          alt={`Logo of ${teamName}`}
        />
        <p className="card-value">{teamName}</p>
      </div>
      <p className="pilot-card__position-label card-label">
        Position ({season})
      </p>
      <p className="pilot-card__position-info card-value">
        {emoji} {position}
        {`${bestPositionComplement}`} ({`${points} pts`})
      </p>
    </div>
  );
}

export default PilotCard;
