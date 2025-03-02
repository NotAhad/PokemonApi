import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="flex ml-[16.5rem] mt-[1rem]">
        <div className="w-[86rem] flex justify-between font-bold  items-center tracking-[0.1em]">
          <Link to="/" className="cursor-pointer">POKEDEX</Link>
          <Link to="/favourites" className="cursor-pointer">FAVOURITES</Link>
          <Link to="/compare" className="cursor-pointer">COMPARE</Link>
          <Link to="/game" className="cursor-pointer">GAME</Link>
        </div>
    </div>
  );
};
