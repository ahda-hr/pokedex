"use client";

import { getPokemonList } from "@/lib/services";
import { PokemonWithTypes } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import PokemonListItem from "./PokemonListItem";

interface PokemonListProps {
  initialPokemon: PokemonWithTypes[];
}

function PokemonList({ initialPokemon }: PokemonListProps) {
  const [pokemonList, setPokemonList] =
    useState<PokemonWithTypes[]>(initialPokemon);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(20);

  const loadMorePokemon = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPokemon = await getPokemonList(offset);

      if (newPokemon.length === 0) {
        setHasMore(false);
      } else {
        setPokemonList((prev) => [...prev, ...newPokemon]);
        setOffset((prev) => prev + newPokemon.length);
      }
    } catch (error) {
      console.error("Error loading more Pokemon:", error);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePokemon();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMorePokemon, hasMore, loading]);

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <PokemonListItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>

      {hasMore && (
        <div id="scroll-sentinel" className="flex justify-center py-8">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span>Loading more Pokemon...</span>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 text-gray-500">
          You&apos;ve caught them all!
        </div>
      )}
    </>
  );
}

export default PokemonList;
