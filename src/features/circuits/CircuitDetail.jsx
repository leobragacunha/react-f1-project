import { useParams } from "react-router";
import { getCircuits, getPilot } from "../../services/f1API";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

function CircuitDetail() {
  const { circuitId } = useParams();

  const {
    data: circuitData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["circuit", circuitId],
    queryFn: () => getCircuits({ circuitId }),
  });

  const { circuits = [], errors = {} } = circuitData || {};
  const circuit = circuits[0] || {};
  const recordDriver = circuit?.lap_record?.driver;

  // Getting pilot record image:
  const {
    data: dataImage,
    isPending: isPendingImage,
    isError: isErrorImage,
    error: errorImage,
  } = useQuery({
    queryKey: ["driverImage", recordDriver],
    queryFn: () => getPilot({ name: recordDriver }),
    enabled: !!recordDriver,
  });

  if (isPending) return <Spinner />;
  if (isError) return <div>Error Loading Data {error.message}</div>;

  const {
    id,
    capacity,
    competition: {
      name: competitionName,
      location: { country, city },
    },
    first_grand_prix,
    image,
    lap_record: { time: recordTime, year: recordYear },
    laps,
    name: circuitName,
    opened,
    race_distance,
  } = circuit;

  // console.log(id);

  const { pilot = [] } = dataImage || [];
  const recordDriverImage = pilot[0]?.image;

  // console.log(pilot);

  return (
    <div className="circuit__detail__container">
      <div className="circuit__detail__section-1">
        <div className="circuit__detail__photo">
          <img src={image} alt={`${circuitName} map`} />
        </div>
        <div className="circuit__detail__hof">
          <h2 className="text-primary text-medium">Track Record</h2>
          {recordDriverImage && (
            <img src={recordDriverImage} alt={`Photo of ${recordDriver}`} />
          )}
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
          <p className="text-primary text-medium">
            <span className="text-title">First Grand Prix:</span>{" "}
            {first_grand_prix}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          <p className="text-primary text-medium">
            <span className="text-title">Capacity:</span> {capacity}
          </p>
        </div>
        <div className="circuit__detail__text-container">
          {laps && (
            <p className="text-primary text-medium">
              <span className="text-title">Laps: </span>
              {laps}
            </p>
          )}
        </div>
        <div className="circuit__detail__text-container">
          {race_distance && (
            <p className="text-primary text-medium">
              <span className="text-title">Race Distance:</span> {race_distance}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CircuitDetail;
