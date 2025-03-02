import React, { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import usePokemon, { PokemonData } from "../usePokemon";

interface PokemonProps {
  // Removed onSearchChange prop; we now handle search internally.
}

const Pokemon: React.FC<PokemonProps> = () => {
  const { pokemon, loading, error } = usePokemon();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const itemsPerPage = 12;

  // Reset page number when the search term or selected type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-xl text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Get unique Pokémon types for the type filter
  const allTypes = Array.from(
    new Set(pokemon.flatMap((p) => p.types.map((t) => t.type.name)))
  );

  // Filter Pokémon based on the search term and selected type
  const filteredPokemon = pokemon.filter((p: PokemonData) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" ||
      p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Search and Type Filter */}
      <div className="absolute left-10 flex flex-col gap-5">
        {/* SEARCH */}
        <div className="flex gap-1 items-center border-b-2 w-[10.8rem]">
          <span>⬛</span>
          <input
            type="text"
            placeholder="ENTER POKEMON"
            className="w-[8.8rem] bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TYPE Filter */}
        <div>
          <label htmlFor="typeFilter" className="mr-3">TYPE</label>
          <select
            id="typeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="min-w-[7.5rem] max-w-[7.5rem] whitespace-nowrap bg-transparent py-[0.35rem] rounded-lg uppercase border-2"
          >
            <option value="All" className="bg-[rgb(30,30,30)]">All</option>
            {allTypes.map((type) => (
              <option key={type} value={type} className="bg-[rgb(30,30,30)] outline-none">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

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
    </div>
  );
};

export default Pokemon;
