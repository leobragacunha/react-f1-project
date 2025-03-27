import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPilot } from "../../services/f1API";
import {
  checkTeamSequence,
  returnPositionComplement,
} from "../../utils/helpers";
import PilotTeamRecord from "./PilotTeamRecord";
import Spinner from "../../ui/Spinner";

function PilotDetail() {
  const { pilotId } = useParams();

  const {
    data: pilot,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: [pilotId], queryFn: () => getPilot(pilotId) });

  if (isPending) return <Spinner />;
  if (isError) return <div>Couldn't fetch data</div>;

  // const fakeData2 = {
  //   abbr: "HAM",
  //   birthdate: "1985-01-07",
  //   birthplace: "Stevenage, England",
  //   career_points: "4862.5",
  //   country: { name: "United Kingdom", code: "GB" },
  //   grands_prix_entered: 356,
  //   highest_grid_position: 1,
  //   highest_race_finish: { position: 1, number: 105 },
  //   id: 20,
  //   image: "https://media.api-sports.io/formula-1/drivers/20.png",
  //   name: "Lewis Hamilton",
  //   nationality: "British",
  //   number: 44,
  //   podiums: 202,
  //   teams: [
  //     {
  //       season: 2025,
  //       team: {
  //         id: 3,
  //         name: "Scuderia Ferrari",
  //         logo: "https://media.api-sports.io/formula-1/teams/3.png",
  //       },
  //     },

  //     {
  //       season: 2024,
  //       team: {
  //         id: 5,
  //         name: "Mercedes-AMG Petronas",
  //         logo: "https://media.api-sports.io/formula-1/teams/5.png",
  //       },
  //     },
  //     {
  //       season: 2023,
  //       team: {
  //         id: 5,
  //         name: "Mercedes-AMG Petronas",
  //         logo: "https://media.api-sports.io/formula-1/teams/5.png",
  //       },
  //     },
  //     {
  //       season: 2022,
  //       team: {
  //         id: 5,
  //         name: "Mercedes-AMG Petronas",
  //         logo: "https://media.api-sports.io/formula-1/teams/5.png",
  //       },
  //     },
  //     {
  //       season: 2021,
  //       team: {
  //         id: 5,
  //         name: "Mercedes-AMG Petronas",
  //         logo: "https://media.api-sports.io/formula-1/teams/5.png",
  //       },
  //     },
  //     {
  //       season: 2020,
  //       team: {
  //         id: 5,
  //         name: "Mercedes-AMG Petronas",
  //         logo: "https://media.api-sports.io/formula-1/teams/5.png",
  //       },
  //     },
  //     {
  //       season: 2019,
  //       team: {
  //         id: 2,
  //         logo: "https://media.api-sports.io/formula-1/teams/2.png",
  //         name: "McLaren Racing",
  //       },
  //     },
  //     {
  //       season: 2018,
  //       team: {
  //         id: 2,
  //         logo: "https://media.api-sports.io/formula-1/teams/2.png",
  //         name: "McLaren Racing",
  //       },
  //     },
  //     {
  //       season: 2017,
  //       team: {
  //         id: 1,
  //         logo: "https://media.api-sports.io/formula-1/teams/1.png",
  //         name: "Red Bull Racing",
  //       },
  //     },
  //     {
  //       season: 2016,
  //       team: {
  //         id: 2,
  //         logo: "https://media.api-sports.io/formula-1/teams/2.png",
  //         name: "McLaren Racing",
  //       },
  //     },
  //   ],
  //   world_championships: 7,
  // };

  const {
    id,
    name,
    number: pilotNumber,
    birthdate,
    birthplace,
    country,
    world_championships: worldChampionships,
    career_points: careerPts,
    grands_prix_entered: numRaces,
    highest_race_finish: highestRacePosition,
    podiums,
    image,
  } = pilot;

  const bestPositionComplement = returnPositionComplement(
    highestRacePosition.position
  );

  const { teams } = pilot;
  const teamsCleaned = checkTeamSequence(teams);

  // console.log(teamsCleaned);

  return (
    <div className="pilot__container">
      <div className="pilot__session">
        <div className="pilot__image">
          <img src={image} alt={`Photo of ${name}`} />
        </div>
        <div className="pilot__info">
          <div className="pilot__info-header">
            <h1 className="pilot__info-name text-title text-large">
              <span>#{pilotNumber} </span>
              {name}
            </h1>
            <div className="pilot__info-country">
              <img
                src={`https://flagcdn.com/20x15/${country.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/32x24/${country.code.toLowerCase()}.png 2x, https://flagcdn.com/48x36/${country.code.toLowerCase()}.png 3x`}
                width="20"
                height="15"
                alt={`${country.name}`}
              ></img>
              <p className="pilot__info-birthplace text-medium text-secondary">
                {birthplace}
              </p>
            </div>
          </div>
          <p className="pilot__info-birthdate text-medium text-title">
            Born in: <span className="text-content">{birthdate}</span>
          </p>
          <p className="pilot__info-championships text-medium text-title">
            World Championships:{" "}
            <span className="text-content">{worldChampionships || 0}</span>
          </p>
          <p className="pilot__info-career-pts text-medium text-title">
            Career Points: <span className="text-content">{careerPts}</span>
          </p>
          <p className="pilot__info-num-races text-medium text-title">
            Number of races: <span className="text-content">{numRaces}</span>
            <span className="text-content"> ({podiums} podiums)</span>
          </p>
          <p className="pilot__info-race-position text-medium text-title">
            Best race position:{" "}
            <span className="text-content">{`${highestRacePosition.position}${bestPositionComplement.ordinal}`}</span>
            <span className="text-content">
              {" "}
              ({highestRacePosition.number}x)
            </span>
          </p>
        </div>
      </div>
      <div className="team__session">
        <ul>
          {teamsCleaned.map((teamRecord) => (
            <li key={teamRecord.id}>
              <PilotTeamRecord teamRecord={teamRecord} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PilotDetail;
