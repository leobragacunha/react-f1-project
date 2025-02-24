import Button from "../../ui/Button";

function MainMenu() {
  return (
    <div className="main-menu">
      <Button classes="button primary" label="Circuits" link="circuits" />
      <Button classes="button primary" label="Teams" link="teams" />
      <Button classes="button primary" label="Pilots" link="pilots" />
    </div>
  );
}

export default MainMenu;
