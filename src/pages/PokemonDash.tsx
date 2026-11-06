import React, { useEffect, useState } from "react";
import { Link } from "react-router";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default?: string; 
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
}

const PokemonDash: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const limit = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (offset === 0) setLoading(true);
        else setLoadingMore(true);

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        );
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        const data = await res.json();

        const detailedPokemonData: Pokemon[] = await Promise.all(
          data.results.map(async (curPokemon: { url: string }) => {
            const pokemonRes = await fetch(curPokemon.url);
            const pokemonData = await pokemonRes.json();
            return pokemonData;
          }),
        );

        setPokemon((prev) => [...prev, ...detailedPokemonData]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading && offset === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-indigo-600"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-center text-sm">
        <p className="font-semibold text-base mb-1">Error Loading Data</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back Link & Header */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-center">
          Let's Catch Pokémon
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm text-center mt-2">
          Explore, search, and load more creatures using the native Fetch API.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchData.map((curPokemon) => {
          const imgSrc =
            curPokemon.sprites.other?.dream_world?.front_default ||
            curPokemon.sprites.front_default;

          return (
            <div
              key={curPokemon.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-40 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-center p-4 mb-6">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={curPokemon.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">
                      No Image Available
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white">
                    {curPokemon.name}
                  </h3>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    #{curPokemon.id}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize mb-4">
                  {curPokemon.types.map((t) => t.type.name).join(", ")}
                </p>

                <div className="space-y-1.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <p className="flex justify-between">
                    <span>Height:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {curPokemon.height}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {curPokemon.weight}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Speed:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {curPokemon.stats[5]?.base_stat || 0}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-6">
        <button
          onClick={() => setOffset((prev) => prev + limit)}
          disabled={loadingMore}
          className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
        >
          {loadingMore && <i className="fa-solid fa-spinner fa-spin"></i>}
          <span>{loadingMore ? "Loading More..." : "Load More Pokémon"}</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonDash;