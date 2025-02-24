import { useNavigate } from "react-router";
import { getCircuits } from "../services/f1API";

// Link is the entire path("/circuits", for example)
function Button({ label, link, classes }) {
  const navigate = useNavigate();

  return (
    <button className={classes} onClick={() => navigate(link)}>
      {label}
    </button>
  );
}

export default Button;
