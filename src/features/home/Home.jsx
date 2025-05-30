import { useState } from "react";
import Carousel from "./Carousel";
import MainMenu from "./MainMenu";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function handleModal() {
    setIsModalOpen((modal) => !modal);
    const element = document.elem;
    console.log(element);
  }

  return (
    <div className="home">
      <Carousel />
      <button className={`home__modal__toggle`} onClick={handleModal}>
        {isModalOpen ? "×" : "≡"}
      </button>
      <div
        className={`home__container home__modal ${!isModalOpen && "hidden"}`}
      >
        <div className="home__container-text">
          <h1 className="poppins-medium-italic">React F1 Project</h1>
          <p>
            The main purpose of this project is practice some development
            skills, spetially regarding react and css.
          </p>
          <p>
            {" "}
            To make things more interesting, I tried to apply some of the libs I
            wanted to train to a subject I like a lot, which is Formula 1
          </p>
          <p>
            Here you will find interesting facts about circuits, pilots, and
            constructor teams.
          </p>
          <p>
            If you have any comments, feel free to contact me (my github page is
            linked in the footer)!{" "}
          </p>
          <p>Hope you enjoy! </p>
        </div>
        <MainMenu />
      </div>
    </div>
  );
}

export default Home;
