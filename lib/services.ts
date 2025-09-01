import { PokemonClient } from "pokenode-ts";
import { PokemonWithTypes } from "./types";

async function getPokemonList(offset: number): Promise<PokemonWithTypes[]> {
  const api = new PokemonClient();
  const res = await api.listPokemons(offset, 20);
  
  const listWithTypes = await Promise.all(
    res.results.map(async (pokemon) => {
      const detail = await api.getPokemonByName(pokemon.name);
      return {
        id: pokemon.url.split("/").filter(Boolean).pop() ?? "",
        name: detail.name,
        types: detail.types,
        image: detail.sprites.other?.["official-artwork"].front_default ?? "",
      };
    })
  );

  return listWithTypes;
}

export { getPokemonList };