import { useQuery } from "@tanstack/react-query";
import { getCircuits } from "../../services/f1API";
import { useNavigate } from "react-router";
import CircuitCard from "./CircuitCard";
import IntroImage from "../../ui/IntroImage";
import Spinner from "../../ui/Spinner";

// FAKE DATA (only for testing purposes)
// const fakeData = [
//   {
//     capacity: 80000,
//     competition: {
//       id: 1,
//       location: { country: "Australia", city: "Melbourne" },
//       name: "Australia Grand Prix",
//     },
//     first_grand_prix: 1996,
//     id: 1,
//     image: "https://media.api-sports.io/formula-1/circuits/1.png",
//     lap_record: {
//       driver: "Michael Schumacher",
//       time: "1:24.125",
//       year: "2004",
//     },
//     laps: 58,
//     length: "5.303 Kms",
//     name: "Albert Park Circuit",
//     opened: 1953,
//     owner: null,
//     race_distance: "307.574 kms",
//   },
//   {
//     capacity: 70000,
//     competition: {
//       id: 2,
//       name: "Bahrain Grand Prix",
//       location: { city: "Sakhir", country: "Bahrain" },
//     },
//     first_grand_prix: 2004,
//     id: 2,
//     image: "https://media.api-sports.io/formula-1/circuits/2.png",
//     lap_record: { time: "1:31.447", driver: "Pedro de la Rosa", year: "2005" },
//     laps: 57,
//     length: "5.412 Kms",
//     name: "Bahrain International Circuit",
//     opened: 2004,
//     owner: null,
//     race_distance: "308.238 kms",
//   },
//   {
//     capacity: null,
//     competition: {
//       id: 3,
//       name: "Vietnam Grand Prix",
//       location: { country: "Vietnam", city: "Hanoï" },
//     },
//     first_grand_prix: 2020,
//     id: 3,
//     image: "https://media.api-sports.io/formula-1/circuits/3.png",
//     lap_record: { time: null, driver: null, year: null },
//     laps: 55,
//     length: "5.607 Kms",
//     name: "Hanoi Street Circuit",
//     opened: null,
//     owner: null,
//     race_distance: "308.715 kms",
//   },
// ];

function Circuits() {
  const navigate = useNavigate();

  const {
    data: circuits,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["circuits"],
    queryFn: getCircuits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <div>Error loading data {error}</div>;

  return (
    <>
      <IntroImage
        pageTitle="Circuits"
        imgPath="circuits_info.jpg"
        imgAltText="Las Vegas Circuit"
        classes="circuits-cover"
      />
      <ul className="card-grid">
        {circuits.map((circuit) => (
          <li
            key={circuit.id}
            onClick={() => navigate(`/circuits/${circuit.id}`)}
          >
            <CircuitCard circuit={circuit} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Circuits;
