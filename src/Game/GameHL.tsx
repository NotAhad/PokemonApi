import React, { useEffect, useState } from "react";
import usePokemon, { PokemonData } from "../usePokemon";
import PokemonCard from "../Components/PokemonCard";

const GameHL: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();
  const [targetPokemon, setTargetPokemon] = useState<PokemonData | null>(null);
  const [searchText, setSearchText] = useState("");
  const [guessedPokemon, setGuessedPokemon] = useState<PokemonData | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; color: string }>({
    text: "GUESS",
    color: "inherit",
  });
  const [guessCount, setGuessCount] = useState(0);
  const [isGuessing, setIsGuessing] = useState(false);

  // Randomly choose a target Pokémon once data is loaded.
  useEffect(() => {
    if (pokemon.length > 0 && !targetPokemon) {
      const randomIndex = Math.floor(Math.random() * pokemon.length);
      setTargetPokemon(pokemon[randomIndex]);
    }
  }, [pokemon, targetPokemon]);

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

  // Filter suggestions based on user input.
  const suggestions = pokemon.filter((p: PokemonData) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (p: PokemonData) => {
    setGuessedPokemon(p);
    setSearchText("");
    setShowSuggestions(false);
    // Reset feedback for a new guess.
    setFeedback({ text: "GUESS", color: "inherit" });
  };

  const handleGuess = () => {
    if (!targetPokemon || !guessedPokemon) return;
    if (feedback.text === "Correct") return; // Do nothing if already correct.
    if (isGuessing) return; // Prevent multiple clicks during delay.

    setIsGuessing(true);
    setGuessCount((prev) => prev + 1);

    if (guessedPokemon.id > targetPokemon.id) {
      setFeedback({ text: "Lower", color: "blue" });
      setTimeout(() => {
        setFeedback({ text: "GUESS", color: "inherit" });
        setIsGuessing(false);
      }, 1000);
    } else if (guessedPokemon.id < targetPokemon.id) {
      setFeedback({ text: "Higher", color: "red" });
      setTimeout(() => {
        setFeedback({ text: "GUESS", color: "inherit" });
        setIsGuessing(false);
      }, 1000);
    } else {
      // Correct guess; keep feedback as "Correct" and do not reset.
      setFeedback({ text: "Correct", color: "green" });
      // No need to reset isGuessing, so subsequent clicks won't increment the counter.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">
      <div className="w-[35rem] p-5 flex flex-col items-center gap-10">
        <div>
          <h1 className="font-bold tracking-[0.1em]">I HAVE CHOSEN A RANDOM POKEMON. GUESS THE POKEMON BY FIGURING OUT ITS POKEDEX NUMBER! GUESS A POKEMON BELOW AND YOU WILL BE TOLD IF THE POKEDEX NUMBER IS HIGHER OR LOWER THAN YOUR POKEMON. REFRESH THE PAGE TO GUESS A NEW POKEMON.</h1>
        </div>
        {/* Display the guessed Pokémon card or a placeholder */}
        <div className="p-4 bg-[rgb(30,30,30)] w-[28rem] h-[28rem] rounded-xl flex items-center justify-center">
          {guessedPokemon ? (
            <PokemonCard pokemonData={guessedPokemon} />
          ) : (
            <span className="text-[rgb(20,20,20)] text-2xl font-extrabold">SELECT A POKEMON</span>
          )}
        </div>
        
        <div className="flex items-center gap-10">
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

            {showSuggestions && searchText && (
              <div className="absolute top-full left-0 w-[10.8rem] bg-[rgb(30,30,30)] border">
                {suggestions.map((p: PokemonData) => (
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

          {/* GUESS Button */}
          <div className="flex justify-between items-center w-[10.8rem]">
            <button
              onClick={handleGuess}
              className="py-[0.35rem] rounded-lg font-bold uppercase tracking-[0.1em] border-2 w-[60%]"
              style={{ borderColor: feedback.color, color: feedback.color }}
            >
              {feedback.text}
            </button>

            {/* Guess Counter */}
            <div className="text-xl text-center font-bold py-[0.35rem] rounded-lg uppercase border-2 w-[25%]">{guessCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHL;
