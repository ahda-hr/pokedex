import PokemonDetailTabs from "@/components/PokemonDetailTabs";
import { displayId, getTypeColor } from "@/lib/helpers";
import { getPokemon } from "@/lib/services";
import Image from "next/image";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemon(id);
  const type = pokemon.types[0].type.name;

  return (
    <div
      className={`relative h-screen w-full flex flex-col ${getTypeColor(type)}`}
    >
      <div className="absolute left-0 right-0 top-0 h-72 flex justify-center items-end">
        <Image
          src={pokemon.sprites.other?.["official-artwork"].front_default ?? ""}
          alt={pokemon.name}
          width={200}
          height={200}
          />
      </div>

      <div className="p-6 h-60">
        <div className="flex justify-between items-center ">
          <div className="">
            <h1 className="text-3xl font-bold text-white capitalize mb-2">{pokemon.name}</h1>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <div
                  key={type.type.name}
                  className="text-xs rounded-full px-2 py-1 bg-white/25 text-white/75 font-semibold capitalize"
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>
          <span className="text-white font-bold">{displayId(pokemon.id.toString())}</span>
        </div>
      </div>

      <div className="grow p-6 rounded-t-4xl bg-white">
        <PokemonDetailTabs pokemon={pokemon} />
      </div>
    </div>
  );
}
