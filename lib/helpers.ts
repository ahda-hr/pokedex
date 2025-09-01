import { typeColors } from "./constants";

export function displayId(id: string) {
  return `#${id.padStart(3, "0")}`;
}

export function getTypeColor(typeName: string): string {
  return typeColors[typeName] ?? "bg-gray-400";
}