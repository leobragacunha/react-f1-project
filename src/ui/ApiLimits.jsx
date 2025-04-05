import { IconContext } from "react-icons";
import { GiCheckeredFlag } from "react-icons/gi";

function ApiLimits({ feature }) {
  return (
    <div className="api-limit__container">
      <IconContext.Provider value={{ className: "api-limit-icons" }}>
        <GiCheckeredFlag />
      </IconContext.Provider>
      <div className="text-secondary text-medium ">
        You've reached the API daily limits. Please come back tomorrow.
      </div>
    </div>
  );
}

export default ApiLimits;
