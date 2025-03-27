import { useParams } from "react-router";
import { getCircuits } from "../../services/f1API";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

function CircuitDetail() {
  const { circuitId } = useParams();

  const {
    data: circuit,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["circuit"],
    queryFn: () => getCircuits({ circuitId }),
  });

  // console.log(circuit);

  if (isPending) return <Spinner />;
  if (isError) return <div>Error Loading Data {error}</div>;

  const {
    id,
    capacity,
    competition: {
      name: competitionName,
      location: { country, city },
    },
    first_grand_prix,
    image,
    lap_record: { driver: recordDriver, time: recordTime, year: recordYear },
    laps,
    name: circuitName,
    opened,
    race_distance,
  } = circuit[0];

  // console.log(id);

  return (
    <div className="circuit__detail__container">
      <div className="circuit__detail__section-1">
        <div className="circuit__detail__photo">
          <img src={image} alt={`${circuitName} map`} />
        </div>
        <div className="circuit__detail__hof">
          <h2 className="text-primary text-medium">Track Record</h2>
          <p className="text-primary text-small">{recordDriver}</p>
          <p className="text-secondary text-small">
            🗓️ {recordYear} ⏱️ {recordTime}
          </p>
        </div>
      </div>
      <div className="circuit__detail__section-2">
        <div className="circuit__detail__text-container">
          <h1 className="text-primary text-large">{circuitName}</h1>
          <p className="text-secondary text-medium">{competitionName}</p>
        </div>
        <div className="circuit__detail__text-container">
          <p className="text-primary text-medium">
            <span className="text-title">Location</span>: {country}, {city}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          <p className="text-primary- text-medium">
            <span className="text-title">Built in:</span> {opened}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          <p className="text-primary- text-medium">
            <span className="text-title">First Grand Prix:</span>{" "}
            {first_grand_prix}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          <p className="text-primary- text-medium">
            <span className="text-title">Capacity:</span> {capacity}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          {laps && (
            <p className="text-primary- text-medium">
              <span className="text-title">Laps: </span>
              {laps}
            </p>
          )}
        </div>
        <div className="circuit__detail__text-container">
          {race_distance && (
            <p className="text-primary- text-medium">
              <span className="text-title">Race Distance:</span> {race_distance}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CircuitDetail;
