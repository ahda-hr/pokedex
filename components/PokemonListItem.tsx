import { displayId, getTypeColor } from "@/lib/helpers";
import { PokemonWithTypes } from "@/lib/types";
import Image from "next/image";

interface PokemonListItemProps {
  pokemon: PokemonWithTypes;
}

function PokemonListItem({ pokemon }: PokemonListItemProps) {
  return (
    <li
      className={`relative w-full h-32 rounded-xl p-2 ${getTypeColor(
        pokemon.types[0].type.name
      )}`}
    >
      <div className="">
        <span className="block text-right text-sm text-black/25 font-bold">
          {displayId(pokemon.id)}
        </span>

        <div className="space-y-2">
          <div className="font-bold text-white capitalize">{pokemon.name}</div>
          <div className="flex flex-col items-start gap-1">

          {pokemon.types.map((type) => (
            <div key={type.type.name} className="text-xs rounded-full px-2 py-1 bg-white/25 text-white/75 font-semibold capitalize">{type.type.name}</div>
          ))}
          </div>
        </div>
      </div>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={75}
        height={75}
        className="absolute z-10 bottom-1 right-1 w-20 h-20"
      />
    </li>
  );
}

export default PokemonListItem;
