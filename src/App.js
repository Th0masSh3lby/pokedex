import Home from "./pages/Home";
import { useState } from "react";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import Navbar from "./pages/navbar";
import Footer from "./pages/footer";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [bookmark, setBookmark] = useState([]); //for bookmarks
  const [bookmarkList, setBookmarkList] = useState([]);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/pokedex"
          element={
            <Home
              setBookmark={setBookmark}
              bookmark={bookmark}
              setBookmarkList={setBookmarkList}
              bookmarkList={bookmarkList}
            />
          }
        />
        <Route
          path="/pokedex/search"
          element={
            <Search
              setBookmark={setBookmark}
              bookmark={bookmark}
              setBookmarkList={setBookmarkList}
              bookmarkList={bookmarkList}
            />
          }
        />
        <Route
          path="/pokedex/bookmarks"
          element={
            <Bookmarks
              setBookmark={setBookmark}
              bookmark={bookmark}
              setBookmarkList={setBookmarkList}
              bookmarkList={bookmarkList}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
