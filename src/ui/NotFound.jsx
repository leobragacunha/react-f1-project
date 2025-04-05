import { IconContext } from "react-icons";
import Button from "./Button";
import { GiCheckeredFlag } from "react-icons/gi";

function NotFound() {
  return (
    <div className="not-found__container">
      <div>
        <IconContext.Provider value={{ className: "api-limit-icons" }}>
          <GiCheckeredFlag />
        </IconContext.Provider>
        <p className="text-secondary text-medium ">
          The page you are looking for doesn't exist. Please check your url.
        </p>
      </div>
      <Button label="Return to home" link="/" classes="button primary" />
    </div>
  );
}

export default NotFound;
