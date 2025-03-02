import React, { useEffect, useState } from "react";
import usePokemon, { PokemonData } from "../../Data/usePokemon";
import SearchCard from "../../Components/SearchCard"; 

const Game: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();
  const [targetPokemon, setTargetPokemon] = useState<PokemonData | null>(null);
  const [guessedPokemon, setGuessedPokemon] = useState<PokemonData | null>(null);
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
    }
  };

  // Callback for when a Pokémon is selected from the search card.
  const handleSearchSelect = (p: PokemonData) => {
    setGuessedPokemon(p);
    setFeedback({ text: "GUESS", color: "inherit" });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">

      <div className="w-[35rem] p-5 flex flex-col items-center gap-10">
        <div>
          <h1 className="font-bold tracking-[0.1em]">
            I HAVE CHOSEN A RANDOM POKEMON. GUESS THE POKEMON BY FIGURING OUT ITS POKEDEX NUMBER! GUESS A POKEMON BELOW AND YOU WILL BE TOLD IF THE POKEDEX NUMBER IS HIGHER OR LOWER THAN YOUR POKEMON. REFRESH THE PAGE TO GUESS A NEW POKEMON.
          </h1>
        </div>

        <SearchCard allPokemon={pokemon} onSelect={handleSearchSelect} />

        <div className="flex justify-between items-center w-[10.8rem] -mt-5">
          <button
            onClick={handleGuess}
            className="py-[0.35rem] rounded-lg font-bold uppercase tracking-[0.1em] border-2 w-[60%]"
            style={{ borderColor: feedback.color, color: feedback.color }}
          >
            {feedback.text}
          </button>
          <div className="text-xl text-center font-bold py-[0.35rem] rounded-lg uppercase border-2 w-[25%]">
            {guessCount}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Game;
