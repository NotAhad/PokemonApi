import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavouritesProvider } from "./Favourites/FavouritesContext";
import Favourites from "./Favourites/Favourites";
import Compare from "./Compare/Compare";
import GameHL from "./Game/GameHL";
import { NavBar } from "./Components/NavBar";
import Pokemon from "./Pokedex/Pokemon";

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/game" element={<GameHL />} />
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
