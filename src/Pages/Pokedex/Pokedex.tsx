import React from "react";
import PokemonCard from "../../Components/PokemonCard";
import { PokemonData } from "../../Data/usePokemon";

interface PokedexProps {
  paginatedPokemon: PokemonData[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pokedex: React.FC<PokedexProps> = ({
  paginatedPokemon,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <>
      {/* Pokémon Grid */}
      <div className="grid grid-cols-3 gap-4">
        {paginatedPokemon.map((currentPokemon: PokemonData) => (
          <PokemonCard key={currentPokemon.id} pokemonData={currentPokemon} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 m-10">
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
    </>
  );
};

export default Pokedex;
