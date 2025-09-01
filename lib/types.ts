import { PokemonType } from "pokenode-ts";

export interface PokemonWithTypes {
  id: string;
  name: string;
  types: PokemonType[];
  image: string;
}