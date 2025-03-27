import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTeams } from "../../services/f1API";
import { IconContext } from "react-icons";
import { FaGear } from "react-icons/fa6";
import { PiTimerFill } from "react-icons/pi";

import { returnPositionComplement } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";

function TeamDetail() {
  // Team Schema
  // const fakeData = [
  //   {
  //     base: "Maranello, Italy",
  //     chassis: "SF-24",
  //     director: "Frédéric Vasseur",
  //     engine: "Ferrari",
  //     fastest_laps: 263,
  //     first_team_entry: 1950,
  //     highest_race_finish: { position: 1, number: 249 },
  //     id: 3,
  //     logo: "https://media.api-sports.io/formula-1/teams/3.png",
  //     name: "Scuderia Ferrari",
  //     pole_positions: 253,
  //     president: "John Elkann",
  //     technical_manager: "Loic Serra / Enrico Gualtieri",
  //     tyres: "Pirelli",
  //     world_championships: 16,
  //   },
  // ];

  const { teamId } = useParams();

  const {
    data: team,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["team"], queryFn: () => getTeams({ teamId }) });

  console.log(team);

  if (isPending) return <Spinner />;
  if (isError) return <div>Couldnt fetch data</div>;

  const {
    id,
    base: location,
    chassis,
    engine,
    fastest_laps: numFastestLaps,
    first_team_entry: createdIn,
    highest_race_finish: { position: bestPosition, number: numBestPosition },
    logo,
    name: teamName,
    pole_positions: numPoles,
    president,
    director,
    technical_manager: techManager,
    tyres,
    world_championships: numWorldChampionships,
  } = team[0];

  const { ordinal: bestPositionComplement } =
    returnPositionComplement(bestPosition);

  return (
    <>
      <div className="flex-container">
        <div className="flex-row flex-row-1">
          <div className="team__logo">
            <img src={logo} alt={`${teamName} logo`} />
          </div>

          <div className="team__session team__general-info">
            <div className="team__header">
              <h1 className="text-title text-large text-primary">{teamName}</h1>
            </div>

            {/* This div (team__content) was created only for flex alignment */}
            <div className="team__content">
              <div className="flex-column">
                <p className="text-title text-small text-primary">
                  Created in:{" "}
                  <span className="text-content text-secondary">
                    {createdIn}
                  </span>
                </p>
                <p className="text-title text-small text-primary">
                  Location:{" "}
                  <span className="text-content text-secondary">
                    {location}
                  </span>
                </p>
              </div>

              <div className="flex-column">
                <p className="text-title text-small text-primary">
                  President:{" "}
                  <span className="text-content text-secondary">
                    {president}
                  </span>
                </p>
                <p className="text-title text-small text-primary">
                  Director:{" "}
                  <span className="text-content text-secondary">
                    {director}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-row flex-row-2">
          <div className="team__session team__technical-info">
            <div className="team__header">
              {/* React icons styling */}
              <IconContext.Provider value={{ className: "react-icons" }}>
                <FaGear />
              </IconContext.Provider>
              <h2 className="text-title text-medium">Technical Info</h2>
            </div>

            <p className="text-title text-small text-primary">
              Techinal Manager:{" "}
              <span className="text-content text-secondary ">
                {techManager}
              </span>
            </p>
            <p className="text-title text-small text-primary">
              Engine:{" "}
              <span className="text-content text-secondary ">{engine}</span>
            </p>
            <p className="text-title text-small text-primary">
              Chassis:{" "}
              <span className="text-content text-secondary ">{chassis}</span>
            </p>
            <p className="text-title text-small text-primary">
              Tyres:{" "}
              <span className="text-content text-secondary ">{tyres}</span>
            </p>
          </div>

          <div className="team__session team__race-records">
            <div className="team__header">
              {/* React icons styling */}
              <IconContext.Provider value={{ className: "react-icons" }}>
                <PiTimerFill />
              </IconContext.Provider>
              <h2 className="text-title text-medium text-primary">
                Race Records
              </h2>
            </div>
            <p className="text-title text-small text-primary">
              World Championships:{" "}
              <span className="text-content text-secondary ">
                {numWorldChampionships}
              </span>
            </p>
            <p className="text-title text-small text-primary">
              Best Race Position:{" "}
              <span className="text-content text-secondary ">
                {`${bestPosition}${bestPositionComplement} (${numBestPosition}x)`}
              </span>
            </p>
            <p className="text-title text-small text-primary">
              Pole Positions:{" "}
              <span className="text-content text-secondary ">{numPoles}</span>
            </p>
            <p className="text-title text-small text-primary">
              Fastest Laps:{" "}
              <span className="text-content text-secondary ">
                {numFastestLaps}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamDetail;
