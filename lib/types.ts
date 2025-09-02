import { PokemonType } from "pokenode-ts";

export interface PokemonWithTypes {
  id: string;
  name: string;
  types: PokemonType[];
  image: string;
}

export interface FlattenedEvolution {
  id: string;
  name: string;
  image: string;
}
