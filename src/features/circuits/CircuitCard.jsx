function CircuitCard({ circuit }) {
  // {
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

  return (
    <div className="circuit-card__container">
      <img
        className="circuit-card__image"
        src={circuit.image}
        alt={circuit.name}
      />

      <p className="circuit-card__name card-label">Name</p>
      <p className="circuit-card__name card-value">{circuit.name}</p>

      <p className="circuit-card__created-at card-label">Built in</p>
      <p className="circuit-card__created-at card-value">
        {circuit.opened ? circuit.opened : "Unknown"}
      </p>

      <p className="circuit-card__location card-label">Location</p>
      <p className="circuit-card__location card-value">{`${circuit.competition.location.city}, ${circuit.competition.location.country}`}</p>

      <p className="circuit-card__capacity card-label">Capacity</p>
      <p className="circuit-card__capacity card-value">
        {circuit.capacity ? circuit.capacity : "Unknown"}
      </p>
    </div>
  );
}

export default CircuitCard;
