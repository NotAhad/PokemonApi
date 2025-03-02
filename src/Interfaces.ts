export interface PokemonData {
    name: string;
    id: number;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }
  