import React from "react";
import usePokemon from "../usePokemon";
import CompareCard from "./CompareCard";

const Compare: React.FC = () => {
  const { pokemon, loading, error } = usePokemon();

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

  return (
    <div className="mt-28 flex items-center justify-center gap-[5rem]">
      <div className="flex flex-col p-5 gap-10 w-[65rem]">
        <h1 className="text-center font-bold tracking-[0.1em]">SELECT TWO POKEMON'S TO COMPARE</h1>
        <div className="flex justify-between">
          <CompareCard allPokemon={pokemon} />
          <CompareCard allPokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default Compare;
