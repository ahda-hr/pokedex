"use client";

import { Pokemon } from "pokenode-ts";
import { useState } from "react";

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
    <div className="text-sm">
      <ul className="border-b border-gray-200 pt-8 mb-4 flex justify-between text-sm">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`pb-4 text-center font-semibold capitalize ${
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
        <div className="flex flex-col gap-4">
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

      {currentTab === "Base Stats" && <div className="space-y-4"></div>}

      {currentTab === "Evolutions" && <div className="space-y-4"></div>}

      {currentTab === "Moves" && <div className="space-y-4"></div>}
    </div>
  );
}

export default PokemonDetailTabs;
