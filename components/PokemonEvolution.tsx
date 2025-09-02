"use client";

import { getEvolutionChain } from "@/lib/services";
import { FlattenedEvolution } from "@/lib/types";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

function PokemonEvolution({ pokemon }: PokemonEvolutionProps) {
  const [chain, setChain] = useState<FlattenedEvolution[]>([]);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const res = await getEvolutionChain(pokemon.id);
      setChain(res);
    };

    fetchEvolutionChain();
  }, [pokemon.id]);

  return (
    <div className="flex gap-2 w-full justify-between items-center relative before:absolute before:h-1 before:w-full before:bg-green-500 before:top-1/2 before:-translate-y-1/2">
      {chain.map((evolution) => (
        <div key={evolution.id} className="flex flex-col items-center gap-1 z-10 bg-white px-2">
          <Image
            src={evolution.image}
            alt={evolution.name}
            width={75}
            height={75}
          />
          <span className="capitalize">{evolution.name}</span>
        </div>
      ))}
    </div>
  );
}

export default PokemonEvolution;
