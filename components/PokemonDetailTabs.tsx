"use client";

import { getStatLabel } from "@/lib/helpers";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";
import PokemonStatBar from "./PokemonStatBar";
import PokemonEvolution from "./PokemonEvolution";

interface PokemonDetailTabsProps {
  pokemon: Pokemon;
}

function PokemonDetailTabs({ pokemon }: PokemonDetailTabsProps) {
  const tabs = ["About", "Base Stats", "Evolutions", "Moves"];
  const [currentTab, setCurrentTab] = useState<string>("About");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="text-sm flex flex-col">
      <ul className="border-b border-gray-200 pt-8 mb-4 flex justify-between text-sm">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`pb-4 text-center font-semibold capitalize cursor-pointer ${
              currentTab === tab
                ? "border-b-2 border-blue-500 text-black"
                : "text-gray-300"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      {currentTab === "About" && (
        <div className="flex flex-col grow gap-4">
          <div className="inline-flex">
            <div className="w-24 text-gray-400">Species</div>
            <div className="capitalize">{pokemon.species.name}</div>
          </div>

          <div className="inline-flex">
            <div className="w-24 text-gray-400">Height</div>
            <div className="capitalize">{pokemon.height}</div>
          </div>

          <div className="inline-flex">
            <div className="w-24 text-gray-400">Weight</div>
            <div className="capitalize">{pokemon.weight}</div>
          </div>

          <div className="inline-flex">
            <div className="w-24 text-gray-400">Abilities</div>
            <div className="capitalize">
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </div>
          </div>
        </div>
      )}

      {currentTab === "Base Stats" && (
        <div className="flex flex-col flex-1 overflow-y-scroll gap-1">
          {pokemon.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="inline-flex items-center gap-2"
            >
              <div className="w-20 text-gray-400">
                {getStatLabel(stat.stat.name)}
              </div>
              <div className="w-8 capitalize text-right">{stat.base_stat}</div>
              <PokemonStatBar stat={stat.base_stat} />
            </div>
          ))}
        </div>
      )}

      {currentTab === "Evolutions" && (
        <div className="space-y-4">
          <PokemonEvolution pokemon={pokemon} />
        </div>
      )}

      {currentTab === "Moves" && <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 flex-1 grow overflow-y-scroll">
          {pokemon.moves.map((move) => (
            <p key={move.move.name} className="capitalize">{move.move.name}</p>
          ))}
        </div>}
    </div>
  );
}

export default PokemonDetailTabs;
