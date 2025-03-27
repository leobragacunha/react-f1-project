function Spinner({ size = 40, color = "#333" }) {
  return (
    <div className="spinner__container">
      <div
        className="spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${size / 8}px solid #f3f3f3`, // Borda cinza clara
          borderTop: `${size / 8}px solid ${color}`, // Borda colorida girando
        }}
      />
    </div>
  );
}

export default Spinner;
