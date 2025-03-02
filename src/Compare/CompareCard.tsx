import React, { useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import { PokemonData } from "../usePokemon";

interface CompareCardProps {
  allPokemon: PokemonData[];
}

const CompareCard: React.FC<CompareCardProps> = ({ allPokemon }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions from all Pokémon using the search text (case-insensitive)
  const suggestions = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon);
    setSearchText("");
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Card Display */}
      <div className=" bg-[rgb(30,30,30)] w-[28rem] h-[23.7rem] rounded-xl">
        {selectedPokemon ? (
          <PokemonCard pokemonData={selectedPokemon} />
        ) : (
          <div className="flex items-center justify-center h-full ">
            <span className="text-[rgb(20,20,20)] text-2xl font-extrabold tracking-[0.1em]">SELECT A POKEMON</span>
          </div>
        )}
      </div>

      {/* Search Field */}
      <div className="relative flex flex-col">
        <div className="flex gap-1 items-center border-b-2 w-[10.8rem]">
          <span>⬛</span>
          <input
            type="text"
            placeholder="ENTER POKEMON"
            className="w-[8.8rem] bg-transparent outline-none"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSuggestions(true);
            }}
          />
        </div>
        {/* Dropdown Suggestions */}
        {showSuggestions && searchText && (
          <div className="absolute top-full left-0 w-[10.8rem] bg-[rgb(30,30,30)] border">
            {suggestions.map((p) => (
              <div
                key={p.id}
                className="p-1 cursor-pointer"
                onClick={() => handleSelect(p)}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareCard;
