import { EvolutionClient, Pokemon, PokemonClient } from "pokenode-ts";
import { FlattenedEvolution, PokemonWithTypes } from "./types";
import { flattenEvolution } from "./helpers";

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

async function getPokemon(id: number): Promise<Pokemon> {
  const api = new PokemonClient();
  const detail = await api.getPokemonById(id);

  return detail;
}

async function getEvolutionChain(id: number): Promise<FlattenedEvolution[]> {
  const api = new EvolutionClient();
  const chain = await api.getEvolutionChainById(id);

  return flattenEvolution(chain);
}

export { getPokemonList, getPokemon, getEvolutionChain };
