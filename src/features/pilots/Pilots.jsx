import { useCallback, useEffect, useState } from "react";
import { getPilot, getPilotsPerSeason } from "../../services/f1API";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import IntroImage from "../../ui/IntroImage";
import PilotCard from "./PilotCard";
import Spinner from "../../ui/Spinner";
import ApiLimits from "../../ui/ApiLimits";

// ENDPOINT: /rankings/drivers
// const fakeData = [
//   {
//     behind: null,
//     driver: {
//       abbr: "VER",
//       id: 25,
//       image: "https://media.api-sports.io/formula-1/drivers/25.png",
//       name: "Max Verstappen",
//       number: 1,
//     },
//     points: 575,
//     position: 1,
//     season: 2023,
//     team: {
//       id: 1,
//       logo: "https://media.api-sports.io/formula-1/teams/1.png",
//       name: "Red Bull Racing",
//     },
//     wins: 19,
//   },
//   {
//     behind: null,
//     driver: {
//       abbr: "VER",
//       id: 26,
//       image: "https://media.api-sports.io/formula-1/drivers/25.png",
//       name: "Max Verstappen",
//       number: 1,
//     },
//     points: 575,
//     position: 1,
//     season: 2023,
//     team: {
//       id: 1,
//       logo: "https://media.api-sports.io/formula-1/teams/1.png",
//       name: "Red Bull Racing",
//     },
//     wins: 19,
//   },
//   {
//     behind: null,
//     driver: {
//       abbr: "VER",
//       id: 27,
//       image: "https://media.api-sports.io/formula-1/drivers/25.png",
//       name: "Max Verstappen",
//       number: 1,
//     },
//     points: 575,
//     position: 1,
//     season: 2023,
//     team: {
//       id: 1,
//       logo: "https://media.api-sports.io/formula-1/teams/1.png",
//       name: "Red Bull Racing",
//     },
//     wins: 19,
//   },
// ];

// ENDPOINT: /drivers?id=20
// const fakeData2 = [
//   {
//     abbr: "HAM",
//     birthdate: "1985-01-07",
//     birthplace: "Stevenage, England",
//     career_points: "4862.5",
//     country: { name: "United Kingdom", code: "GB" },
//     grands_prix_entered: 356,
//     highest_grid_position: 1,
//     highest_race_finish: { position: 1, number: 105 },
//     id: 20,
//     image: "https://media.api-sports.io/formula-1/drivers/20.png",
//     name: "Lewis Hamilton",
//     nationality: "British",
//     number: 44,
//     podiums: 202,
//     teams: [
//       {
//         season: 2025,
//         team: {
//           id: 3,
//           name: "Scuderia Ferrari",
//           logo: "https://media.api-sports.io/formula-1/teams/3.png",
//         },
//       },

//       {
//         season: 2024,
//         team: {
//           id: 5,
//           name: "Mercedes-AMG Petronas",
//           logo: "https://media.api-sports.io/formula-1/teams/5.png",
//         },
//       },
//     ],
//     world_championships: 7,
//   },
// ];

function Pilots() {
  const [seasonYear, setSeasonYear] = useState(2023);
  const [searchInput, setSearchInput] = useState("");
  const [pilotsSearched, setPilotsSearched] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  // Creating effect to get the default seasonYear value on the first page mount
  useEffect(function () {
    if (!searchParams.has("season")) {
      setSearchParams({ season: seasonYear });
    }
  }, []);

  function handleSeasonChange(e) {
    setSeasonYear(Number(e.target.value));
    setSearchParams({ season: Number(e.target.value) });
  }

  // Debounced function for pilot search
  const pilotSearch = useCallback(
    debounce(async (query) => {
      // Guard Clause
      if (!query) {
        setPilotsSearched(null);
        return;
      }

      try {
        const { pilot } = await getPilot({ searchQuery: query });
        setPilotsSearched(pilot);
      } catch (error) {
        console.error(`Error while searching pilot: ${error}`);
        setPilotsSearched(null);
      }

      // console.log(query, pilotsSearched);
    }, 700),
    []
  );

  function handlePilotSearch(e) {
    const userInput = e.target.value;
    setSearchInput(userInput);
    pilotSearch(userInput);
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["drivers", seasonYear],
    queryFn: () => getPilotsPerSeason(seasonYear),
  });

  const { pilotsSeason = [], errors = {} } = data || {};

  if (isPending)
    return (
      <>
        <IntroImage
          pageTitle="Pilots"
          imgPath="pilots_info.jpg"
          imgAltText="F1 Pilots"
          classes="pilots-cover"
        />
        <Spinner />;
      </>
    );
  if (isError) return <div>Error fetching Data </div>;

  return (
    <>
      <IntroImage
        pageTitle="Pilots"
        imgPath="pilots_info.jpg"
        imgAltText="F1 Pilots"
        classes="pilots-cover"
      />

      {errors?.requests ? (
        <ApiLimits feature="pilots" />
      ) : (
        <>
          <form className="pilot-form">
            <div className="pilot-form__item">
              <label
                className="pilot-form__label text-title text-small"
                htmlFor="seasons"
              >
                Select a season to check pilots info:
              </label>
              <select
                className="pilot-form__select text-small"
                id="seasons"
                name="seasons"
                onChange={handleSeasonChange}
                value={seasonYear}
              >
                {/* Creating seasons array (we start in 2023 due to API limitations) */}
                {Array.from({ length: 3 }, (v, i) => (
                  <option key={2023 - i} value={2023 - i}>
                    {2023 - i}
                  </option>
                ))}
              </select>
            </div>
            <div className="pilot-form__item">
              <label
                htmlFor="pilotSearchInput"
                className="pilot-form__label text-title text-small"
              >
                {" "}
                Search for specific pilots (all seasons):
              </label>
              <input
                type="search"
                id="pilotSearchInput"
                name="pilotSearchInput"
                className="pilot-form__label text-title text-small"
                value={searchInput}
                onChange={handlePilotSearch}
              />
            </div>
          </form>

          <ul className="card-grid">
            {pilotsSearched
              ? pilotsSearched.map((pilot) => (
                  <li
                    key={pilot.id}
                    onClick={() => navigate(`/pilots/${pilot.id}`)}
                  >
                    <PilotCard
                      pilot={pilot}
                      isSearch={pilotsSearched !== null}
                    />
                  </li>
                ))
              : pilotsSeason.map((pilot) => (
                  <li
                    key={pilot.driver.id}
                    onClick={() => navigate(`/pilots/${pilot.driver.id}`)}
                  >
                    <PilotCard
                      pilot={pilot}
                      isSearch={pilotsSearched !== null}
                    />
                  </li>
                ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Pilots;
