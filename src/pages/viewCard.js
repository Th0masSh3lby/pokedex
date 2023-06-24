import pokeball from "./pokeball.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const ViewCard = ({
  value,
  active,
  setActive,
  setBookmark,
  bookmark,
  bookmarkList,
  setBookmarkList,
}) => {
  const handleTog = () => {
    setActive(["", "off"]);
  };

  function changeBookmark(value) {
    let index = bookmark.indexOf(value.name);
    if (index < 0) {
      setBookmark([...bookmark, value.name]);
      setBookmarkList([...bookmarkList, value]);
      console.log("bookmark", bookmark, bookmarkList);
      return;
    } else {
      setBookmark([...bookmark.slice(0, index), ...bookmark.slice(index + 1)]);
      setBookmarkList([
        ...bookmarkList.slice(0, index),
        ...bookmarkList.slice(index + 1),
      ]);
      console.log("bookmark", bookmark);
      return;
    }
  }

  return (
    <div className={"popup" + " " + active[1]}>
      <div className="fullwrapper">
        <div className="fullmodal">
          <div className="full-top-half">
            <div className="full-cardName">
              <h2 className="full-Pokename">
                #{value.id + " "}:{" " + value.name.toUpperCase()}
              </h2>
            </div>
            <div className="full-PokImg">
              <img
                onError={(e) => (
                  (e.currentTarget.src = `${pokeball}`),
                  (e.currentTarget.title = "image cannot be loaded")
                )}
                className="full-pokImage"
                src={value.sprites.front_default}
                title={value.name}
                alt="loading"
              />
            </div>
          </div>
          <div className="full-bottom-half">
            <div className="full-basic-info">
              <h2 className="fullh2">Basic Info</h2>
              <div className="full-type full-det">
                Type:
                {" " + value.types[0].type.name.toUpperCase()}
              </div>
              <div className="full-weight full-det">Weight: {value.weight}</div>
              <div className="full-height full-det">Height: {value.height}</div>
              <div className="full-ability full-det">
                Ability: {value.abilities[0].ability.name.toUpperCase()}
              </div>
            </div>
            <div className="full-stats">
              <h2 className="fullh2">Stats</h2>
              <div className="stat1 full-det">
                {value.stats[0].stat.name.toUpperCase()}:
                {" " + value.stats[0].base_stat}
              </div>
              <div className="stat2 full-det">
                {value.stats[2].stat.name.toUpperCase()}:
                {" " + value.stats[2].base_stat}
              </div>
              <div className="stat3 full-det">
                {value.stats[1].stat.name.toUpperCase()}:
                {" " + value.stats[1].base_stat}
              </div>
              <div className="stat4 full-det">
                {value.stats[5].stat.name.toUpperCase()}:
                {" " + value.stats[5].base_stat}
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              changeBookmark(value);
            }}
            className="bookmarkButton"
          >
            {bookmark.indexOf(value.name) >= 0
              ? "Remove from Bookmark"
              : "Add to bookmark"}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              return handleTog();
            }}
            className="close"
          >
            <FontAwesomeIcon
              className="close-outline"
              icon={faRectangleXmark}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
