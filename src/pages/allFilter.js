import { useState, useEffect } from "react";
import { filterPower } from "./typesF";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function AllFilter({
  setEnd,
  filter,
  setFilter,
  setView,
  setWait,
  typesFi,
  setTypesFi,
}) {
  //const [filter, setFilter] = useState(false);
  const types = [
    "water",
    "fire",
    "ground",
    "grass",
    "electric",
    "bug",
    "normal",
    "poison",
    "dragon",
    "steel",
    "rock",
    "ghost",
    "ice",

    "fighting",
    "flying",
    "dark",
  ];
  useEffect(() => {
    console.log(typesFi);
  }, [typesFi]);
  function filterOn() {
    setFilter(true);
    setView(false);
    filterPower[0] = false;
  }

  function filterOff() {
    setTypesFi([]);
    setView(true);
    setFilter(false);
    filterPower[0] = false;
  }

  function filterApply() {
    if (typesFi.length > 0) {
      setEnd(false);
      setView(true);
      setWait(false);
      setTimeout(() => {
        setWait(true);
      }, 2000);
      setFilter(false);

      filterPower[0] = true;
      return;
    }
    setTypesFi([]);
    setView(true);
    setFilter(false);
    filterPower[0] = false;
  }

  return (
    <div>
      {!filter && (
        <button className="MainFilter" onClick={filterOn}>
          Select Type
        </button>
      )}
      {filter && (
        <div>
          <button className="filterButton" onClick={filterOff}>
            Reset <FontAwesomeIcon className="wrong" icon={faCircleXmark} />
          </button>
          <button className="filterButton" onClick={filterApply}>
            Apply <FontAwesomeIcon className="right" icon={faCircleCheck} />
          </button>
        </div>
      )}
      <div className="Typefilter">
        {filter &&
          types.map((value) => {
            return (
              <button
                className="typename"
                style={{
                  backgroundColor:
                    typesFi.indexOf(value) >= 0 ? "lightblue" : "",
                  border: typesFi.indexOf(value) >= 0 ? "2px solid black" : "",
                }}
                onClick={() => {
                  let i = typesFi.indexOf(value);
                  console.log(typesFi);
                  if (i < 0) {
                    setTypesFi([...typesFi, value]);
                    return;
                  } else
                    setTypesFi([
                      ...typesFi.slice(0, i),
                      ...typesFi.slice(i + 1),
                    ]);
                }}
              >
                {value}
              </button>
            );
          })}{" "}
      </div>
    </div>
  );
}

export default AllFilter;
