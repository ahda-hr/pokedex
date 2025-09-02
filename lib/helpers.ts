import { EvolutionChain } from "pokenode-ts";
import { statLabels, typeColors } from "./constants";
import { FlattenedEvolution } from "./types";

export function displayId(id: string) {
  return `#${id.padStart(3, "0")}`;
}

export function getTypeColor(typeName: string): string {
  return typeColors[typeName] ?? "bg-gray-400";
}

export function getStatLabel(statName: string): string {
  return statLabels[statName] ?? statName;
}

export function flattenEvolution(chain: EvolutionChain): FlattenedEvolution[] {
  const flattened: FlattenedEvolution[] = [];
  let current = chain.chain;

  while (current) {
    const id = current.species.url.split("/").filter(Boolean).pop() ?? "";
    flattened.push({
      id,
      name: current.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    });
    current = current.evolves_to[0];
  }

  return flattened;
}

export function displayMoveName(name: string): string {
  return name.replace(/-/g, " ");
}