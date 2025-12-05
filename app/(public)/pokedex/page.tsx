'use client';
import PokeCard from '@/components/pokedex/PokeCard';
import PokemonDetails from '@/components/pokedex/PokemonDetails';
import Spinner from '@/components/UI/Spinner';
import { getPokemons } from '@/services/pokeapi/pokeapiService';
import React, { useEffect, useMemo, useState, useRef } from 'react';

const TYPE_OPTIONS = [
  { key: 'all', label: 'TOUS', classes: 'filter-btn' },
  { key: 'fire', label: 'FEU', classes: 'filter-btn bg-gradient-to-r from-[var(--fire-1)] to-[var(--fire-2)]' },
  { key: 'water', label: 'EAU', classes: 'filter-btn bg-gradient-to-r from-[var(--water-1)] to-[var(--water-2)]' },
  { key: 'grass', label: 'PLANTE', classes: 'filter-btn bg-gradient-to-r from-[var(--grass-1)] to-[var(--grass-2)]' },
  { key: 'electric', label: 'ÉLECTRIK', classes: 'filter-btn bg-gradient-to-r from-[var(--electric-1)] to-[var(--electric-2)]' },
  { key: 'psychic', label: 'PSY', classes: 'filter-btn bg-gradient-to-r from-[var(--psychic-1)] to-[var(--psychic-2)]' }
];

const LOAD_STEP = 20;         // combien charger en plus quand on est proche du bas
const LOAD_THRESHOLD = 300;   // px depuis le bas pour déclencher le chargement

const Page = () => {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [gen, setGen] = useState('all');
  const [POKEMON, setPOKEMON] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  // new states for infinite scroll
  const [limit, setLimit] = useState<number>(40); // initial number requested
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const fetchAllPokemons = async (requestedLimit?: number) => {
    const reqLimit = requestedLimit ?? limit;
    // avoid redundant fetch if requested limit is not greater than what we already have
    if (totalCount !== null && reqLimit <= POKEMON.length) return;

    try {
      setLoading(true);
      const res = await getPokemons(reqLimit);
      // res expected to contain { count, results }
      setTotalCount(res.count ?? null);
      setPOKEMON(res.results ?? []);
      setLimit(reqLimit);

      // After the DOM/layout updates, if we are still near the bottom,
      // request more automatically (allows fast scrolling without needing another user scroll).
      // slight timeout so layout has time to grow
      setTimeout(() => {
        const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - LOAD_THRESHOLD);
        const haveMore = (res.count ?? Infinity) > (res.results?.length ?? 0);
        if (atBottom && haveMore) {
          const newLimit = Math.min(res.count ?? Infinity, reqLimit + LOAD_STEP);
          if (newLimit > reqLimit) {
            // call again to load more; fetchAllPokemons will guard against redundant requests
            fetchAllPokemons(newLimit);
          }
        }
      }, 150);
    } catch (error) {
      console.log('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchAllPokemons(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll handler for infinite loading
  useEffect(() => {
    const step = LOAD_STEP; // how many more to request when near bottom
    const thresholdPx = LOAD_THRESHOLD; // px from bottom to trigger load

    const onScroll = () => {
      if (loading) return;
      // if we know totalCount and already loaded everything, do nothing
      if (totalCount !== null && POKEMON.length >= totalCount) return;

      const scrolledToBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - thresholdPx);
      if (scrolledToBottom) {
        const newLimit = Math.min((totalCount ?? Infinity), limit + step);
        if (newLimit > limit) {
          fetchAllPokemons(newLimit);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // include dependencies that should re-bind if they change
  }, [limit, loading, POKEMON.length, totalCount]);

  const openModal = (p: any) => {
    setSelectedPokemon(p);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <>
      <main className="pt-28 px-6 md:px-12 pb-12 md:ml-80 md:mr-6">

        <section>
          <div className="poke-grid" id="poke-grid">

            {/* render cards from data model */}
            {POKEMON.map((p, index) => (
              <button onClick={() => openModal(p)} key={index} className="block">
                <PokeCard p={p} />
              </button>
            ))}

          </div>

          {/* small loader indicator */}
          <div className="mt-6 text-center">
            {loading ? 
            <Spinner/>
            : (totalCount !== null && POKEMON.length >= totalCount) ? 
            <span className="text-sm text-slate-400">Tous les pokémons chargés</span> 
            : null}
          </div>
        </section>
        <PokemonDetails isOpen={isModalOpen} onClose={closeModal} pokemon={selectedPokemon} />
      </main>
    </>
  );
};

export default Page;