import React, { useState, useEffect } from "react";
import { useFavourites } from "./FavouritesContext";
import PokemonCard from "../../Components/PokemonCard";
import { PokemonData } from "../../Data/usePokemon";

const Favourites: React.FC = () => {
  const { favourites } = useFavourites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [favourites]);

  const totalPages = Math.ceil(favourites.length / itemsPerPage);
  const paginatedFavourites = favourites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center p-10">      
      <div className="grid grid-cols-3 gap-4">
        {paginatedFavourites.map((pokemon: PokemonData) => (
          <PokemonCard key={pokemon.id} pokemonData={pokemon} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      
    </div>
  );
};

export default Favourites;
