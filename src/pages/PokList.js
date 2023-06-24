import pokeball from "./pokeball.jpg";
import ViewCard from "./viewCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function PokList({ setBookmark, bookmark, bookmarkList, setBookmarkList }) {
  const [active, setActive] = useState([]); //for toggling FullCard popup

  //for handling trigger
  const handleTrigger = (name) => {
    setActive([name, "on"]);
  };

  return (
    <div className="allPokemons">
      {bookmarkList.length >= 0 &&
        bookmarkList.map((value, index) => {
          return (
            <div className="PokemoncardWrapper">
              {" "}
              <div className="Pokemoncard">
                <div className="Pokname">
                  #{value.id}: {value.name.toUpperCase()}
                </div>
                <div className="card__img">
                  <img
                    onError={(e) => (
                      (e.currentTarget.src = `${pokeball}`),
                      (e.currentTarget.title = "image cannot be loaded")
                    )}
                    className="pokImage"
                    src={value.sprites.front_default}
                    title={value.name}
                    alt="loading"
                  />
                </div>
                <div className="contentWrapper">
                  <div className="typeAbility">
                    <div className="Poktype">
                      {value.types[0].type.name.toUpperCase()}
                    </div>
                    <div className="Pokability">
                      {value.abilities[0].ability.name.toUpperCase()}
                    </div>
                  </div>

                  <button
                    className="fullCardButton"
                    onClick={(e) => {
                      e.preventDefault();
                      return handleTrigger(value.name);
                    }}
                  >
                    <FontAwesomeIcon
                      className="OpenCard"
                      icon={faArrowUpRightFromSquare}
                    />
                  </button>
                </div>
              </div>
              {active[0] === value.name && (
                //fullcard element
                <ViewCard
                  value={value}
                  active={active}
                  setActive={setActive}
                  bookmark={bookmark}
                  bookmarkList={bookmarkList}
                  setBookmark={setBookmark}
                  setBookmarkList={setBookmarkList}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}

export default PokList;
