import "./home.css";
import "./pokemoncard.css";
import ViewCard from "./viewCard";
import "./pokemonFull.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import pokeball from "./pokeball.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

function Home({ setBookmark, bookmark, bookmarkList, setBookmarkList }) {
  const [pokemonData, setPokemonData] = useState([]); //to store full pokemon data
  const [pokemonList, setPokemonList] = useState([]); //for names 20 at a time
  const [nextUrl, setNextUrl] = useState(""); //sets url to fetch next
  const [loading, setLoading] = useState(false); //sets true if fetching is in progress
  const [loading1, setLoading1] = useState(false); //sets true if scrolling is on
  const [error2, setError2] = useState(false); //catch error for names fetch api
  const [error1, setError1] = useState(false); //catch error for data fetch api
  const [end, setEnd] = useState(false); //sets to true if all pokemon list is fetched
  const [active, setActive] = useState([]); //toggle to open fullCard details popup

  //getList for fetching PokemonList - fetches 20 pokemon names at a time
  const getList = async (url) => {
    if (pokemonList.length > 999) {
      setEnd(true);
      setLoading(false);
      setLoading1(false);
      return;
    }
    if (loading === true) {
      return;
    }
    setLoading(true);

    const data = await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .catch((error) => {
        setError2(true);
      });

    //createPokemonObject function for getting data for every pokemon name
    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .catch((error) => {
            setError1(true);
          });

        setPokemonData((list) => [...list, res]);
        //getImage(data1);
      });
    }
    if (!error2) {
      createPokemonObject(data.results);

      setPokemonList([...pokemonList, ...data.results]);
      setNextUrl(data.next);
      setLoading(false);

      return;
    } else {
      setLoading(false);
    }
  };
  //

  //get initial list of 20 names once loaded
  useEffect(() => {
    getList(`https://pokeapi.co/api/v2/pokemon/`);
  }, []);
  //
  //set interval to check if the scroll is reached a certain mark
  //or removes interval if all pokemons are loaded
  useEffect(() => {
    if (pokemonList.length > 999) {
      setEnd(true);
      setLoading(false);
      setLoading1(false);
      return;
    }

    if (!error2 && !error1) {
      const timer = setInterval(() => {
        let scrollheight = 0;
        if (document.documentElement.offsetHeight > 10000) {
          scrollheight =
            window.innerHeight +
            document.documentElement.scrollTop -
            Math.floor(document.documentElement.offsetHeight * 0.97);
        } else if (document.documentElement.offsetHeight > 3000) {
          scrollheight =
            window.innerHeight +
            document.documentElement.scrollTop -
            Math.floor(document.documentElement.offsetHeight * 0.93);
        } else {
          scrollheight =
            window.innerHeight +
            document.documentElement.scrollTop -
            Math.floor(document.documentElement.offsetHeight * 0.85);
        }

        if (scrollheight > 0) {
          setLoading1(true);
          getList(nextUrl);

          return;
        } else {
          setLoading1(false);
          return;
        }
      }, 2200);
      return () => clearInterval(timer);
    }
  }, [nextUrl, error2, error1]);
  //

  //Trigger for opening fullcard popup
  const handleTrigger = (name) => {
    setActive([name, "on"]);
  };
  //
  //Home component
  return (
    <div className="Home">
      <h1 className="title">Pokedex</h1>
      <div className="subHead">
        <h3 className="subHeadH3">All Pokemons</h3>{" "}
        {/*LetsCapture Option for SearchBar*/}
        <Link to="/pokedex/search">
          <div className="search">Let's Capture </div>
        </Link>
      </div>
      <div className="divider"></div>

      {/*All Pokemons Grid*/}
      <div className="allPokemons">
        {pokemonData.length > 0 &&
          pokemonData.map((value, index) => {
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
                  /*ViewCard full Html*/
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
        {/*set Loading Error and End components */}
        {(loading || loading1) && <div className="spinner"></div>}
        {(error2 || error1) && (
          <div className="error">
            <h3>error fetching</h3>
            <p>please check your internet and refresh the page</p>
          </div>
        )}
        {end && (
          <div className="end">
            <h3>Fetched All</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
