import PokemonList from "@/components/PokemonList";
import { getPokemonList } from "@/lib/services";

export default async function HomePage() {
  const pokemonList = await getPokemonList(0);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Pokedex</h1>
      <PokemonList initialPokemon={pokemonList} />
    </>
  );
}