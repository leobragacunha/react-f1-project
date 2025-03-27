import { useNavigate } from "react-router";
import { getTeams } from "../../services/f1API";
import IntroImage from "../../ui/IntroImage";
import TeamCard from "./TeamCard";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

function Teams() {
  const navigate = useNavigate();

  const {
    data: teams,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  if (isPending) return <Spinner />;
  if (isError) return <div>Error fetching data ({error})</div>;

  // const fakeData = [
  //   {
  //     base: "Milton Keynes, United Kingdom",
  //     chassis: "RB20",
  //     director: "Christian Horner",
  //     engine: "Honda RBPT",
  //     fastest_laps: 99,
  //     first_team_entry: 1997,
  //     highest_race_finish: { number: 122, position: 1 },
  //     id: 1,
  //     logo: "https://media.api-sports.io/formula-1/teams/1.png",
  //     name: "Red Bull Racing",
  //     pole_positions: 103,
  //     president: "Dietrich Mateschitz",
  //     technical_manager: "Pierre Waché",
  //     tyres: "Pirelli",
  //     world_championships: 6,
  //   },
  //   {
  //     base: "Woking, United Kingdom",
  //     chassis: "MCL38",
  //     director: "Andrea Stella",
  //     engine: "Mercedes",
  //     fastest_laps: 172,
  //     first_team_entry: 1966,
  //     highest_race_finish: { position: 1, number: 189 },
  //     id: 2,
  //     logo: "https://media.api-sports.io/formula-1/teams/2.png",
  //     name: "McLaren Racing",
  //     pole_positions: 164,
  //     president: "Zak Brown",
  //     technical_manager: "Peter Prodromou / Neil Houldey",
  //     tyres: "Pirelli",
  //     world_championships: 9,
  //   },
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

  return (
    <>
      <IntroImage
        pageTitle="Teams"
        imgPath="teams_info.jpg"
        imgAltText="Main teams presidents"
        classes="teams-cover"
      />

      <ul className="card-grid">
        {teams.map((team) => (
          <li key={team.id} onClick={() => navigate(`/teams/${team.id}`)}>
            <TeamCard team={team} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Teams;
