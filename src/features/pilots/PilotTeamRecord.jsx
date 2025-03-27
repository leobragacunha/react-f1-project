function PilotTeamRecord({ teamRecord }) {
  const { logo, name, isSequence, seasons } = teamRecord;

  return (
    <>
      <img className="team__session-logo" src={logo} alt={`Logo of ${name}`} />
      <p className="team__session-info text-title text-small">
        {isSequence
          ? seasons.length === 1
            ? `${seasons.at(0)}`
            : `${seasons.at(-1)} - ${seasons.at(0)}`
          : [...seasons].reverse().join(", ")}
      </p>
    </>
  );
}

export default PilotTeamRecord;
