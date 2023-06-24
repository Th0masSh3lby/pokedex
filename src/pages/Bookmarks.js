import "./home.css";
import "./pokemoncard.css";
import "./pokemonFull.css";
import PokList from "./PokList";
import { Link } from "react-router-dom";

function Bookmarks({ setBookmark, bookmark, bookmarkList, setBookmarkList }) {
  return (
    <div className="Home">
      <div className="subHead">
        <h3 className="subHeadH3">Captured Pokemons</h3>{" "}
        <Link to="/search">
          <div className="search">Capture More</div>
        </Link>
      </div>
      <div className="divider"></div>

      <PokList
        setBookmark={setBookmark}
        bookmark={bookmark}
        bookmarkList={bookmarkList}
        setBookmarkList={setBookmarkList}
      />
    </div>
  );
}

export default Bookmarks;
