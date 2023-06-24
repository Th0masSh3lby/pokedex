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
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error1, setError1] = useState(false);
  const [end, setEnd] = useState(false);
  const [active, setActive] = useState([]);
  //const [bookmark, setBookmark] = useState([]);
  //let bookmarktemp = [...allbookmark];

  // const getImage = async (data) => {
  //   const imageRes = null;
  //   try {
  //     imageRes = await fetch(data.sprites.front_default);
  //   } catch (error) {
  //     setImage([...image, fire]);

  //     console.log("There was an error", error);
  //   }
  //   if (imageRes) {
  //     setImage([...image, imageRes]);
  //   }
  // };
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

  useEffect(() => {
    getList(`https://pokeapi.co/api/v2/pokemon/`);
  }, []);

  useEffect(() => {
    //setAllbookmark([...bookmarktemp, ...bookmark]);
    console.log("bookmark", bookmark);
    //console.log("all", allbookmark);
  }, [bookmark]);

  useEffect(() => {
    if (pokemonList.length > 999) {
      setEnd(true);
      setLoading(false);
      setLoading1(false);
      return;
    }

    if (!error2 && !error1) {
      const timer = setInterval(() => {
        //console.log(typesF, filterPower);
        // console.log(bookmark);

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

        // console.log(
        //   scrollheight,
        //   window.innerHeight,
        //   document.documentElement.scrollTop,
        //   Math.floor(document.documentElement.offsetHeight),
        //   loading
        // );

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

  const handleTrigger = (name) => {
    setActive([name, "on"]);
  };

  return (
    <div className="Home">
      <h1 className="title">Pokedex</h1>

      <div className="subHead">
        <h3 className="subHeadH3">All Pokemons</h3>{" "}
        <Link to="/search">
          <div className="search">Let's Capture </div>
        </Link>
      </div>
      <div className="divider"></div>

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

                    {/* <img
                      className="pokImage"
                      title={value.name}
                      src={}
                      onError={(event) => {
                        event.target.title = "image cannot be loaded";
                        event.target.src = { fire };
                      }}
                    /> */}
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
          })}
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
