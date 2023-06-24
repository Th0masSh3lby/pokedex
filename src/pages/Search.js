import { filterPower } from "./typesF";
import { useState, useEffect } from "react";
import ViewCard from "./viewCard";
import "./Search.css";
import "./pokemoncard.css";
import "./pokemonFull.css";
import pokeball from "./pokeball.jpg";
import AllFilter from "./allFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Search({ setBookmark, bookmark, setBookmarkList, bookmarkList }) {
  const [typesFi, setTypesFi] = useState([]);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const [temp, setTemp] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [view, setView] = useState(false);
  const [wait, setWait] = useState(true);
  const [filter, setFilter] = useState(false);

  const getList = async (url) => {
    setError(false);
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
        setError(true);
      });

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
      });
    }
    if (!error) {
      createPokemonObject(data.results);

      setPokemonList([...pokemonList, ...data.results]);
      setNextUrl(data.next);
      setLoading(false);

      return;
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!view) return;
    if (pokemonList.length > 999) {
      setLoading(false);
      setLoading1(false);
      return;
    }
    const timer = setInterval(() => {
      console.log(typesFi, filterPower, view);
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
      } else if (document.documentElement.offsetHeight > 1000) {
        scrollheight =
          window.innerHeight +
          document.documentElement.scrollTop -
          Math.floor(document.documentElement.offsetHeight * 0.85);
      } else {
        scrollheight =
          window.innerHeight +
          document.documentElement.scrollTop -
          Math.floor(document.documentElement.offsetHeight * 0.5);
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
  }, [nextUrl, view]);

  const handleSubmit = (e) => {
    setEnd(false);
    setTypesFi([]);
    setFilter(false);
    setPokemonList([]);
    setPokemonData([]);
    setNextUrl("https://pokeapi.co/api/v2/pokemon/");
    setPokemon(temp);
    setActive(["", "off"]);
    setView(true);

    //getPokemonData(pokemon);
    console.log("Data", pokemonData);
    console.log("LIST", pokemonList);
    console.log("Name", RegExp(pokemon));

    console.log("view", view);
  };

  const handleChange = (e) => {
    setView(false);
    setTypesFi([]);
    setFilter(false);
    setTemp(e.target.value.toLowerCase());
  };

  const [active, setActive] = useState([]);

  const handleTrigger = (name) => {
    setActive([name, "on"]);
    console.log(active);
  };

  return (
    <div className="Main">
      <div className="Searchbar">
        <input
          className="inputbar"
          type="text"
          onChange={handleChange}
          placeholder="Enter Pokemon name"
        />

        <button className="searchButton" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      {
        <AllFilter
          typesFi={typesFi}
          setTypesFi={setTypesFi}
          setView={setView}
          setWait={setWait}
          filter={filter}
          setFilter={setFilter}
          setEnd={setEnd}
        />
      }

      <div className="allPokemons">
        {view &&
          wait &&
          pokemonData.length > 0 &&
          pokemonData.map((value, index) => {
            if (
              RegExp(pokemon).test(value.name) &&
              (!filterPower[0] ||
                (filterPower[0] &&
                  typesFi.indexOf(value.types[0].type.name) >= 0))
            ) {
              return (
                <div className="PokemoncardWrapper">
                  {" "}
                  <div
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   return handleTrigger(value.name);
                    // }}
                    className="Pokemoncard"
                  >
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
            }
          })}
        {view && (loading || loading1) && <div className="spinner"></div>}
        {view && (error || error1) && (
          <div className="error">
            <h3>error fetching</h3>
            <p>please check your internet and refresh the page</p>
          </div>
        )}
        {view && end && !filterPower[0] && (
          <div className="error">
            <h3>Searched All Pokemons</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
