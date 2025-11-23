'use client';
import PokeCard from '@/components/pokedex/PokeCard';
import { getPokemons } from '@/services/pokeapi/pokeapiService';
import React, { useEffect, useMemo, useState } from 'react';

// const POKEMON = [
//   // minimal data model for each card (name, types array, gen, id, initials, glow var, title color class, badge label)
//   { id: '#001', name: 'Flamion', types: ['fire'], gen: '1', initials: 'FL', glow: 'var(--glow-fire)', titleClass: 'text-neon-orange', badge: 'FEU' },
//   { id: '#002', name: 'Aquarion', types: ['water'], gen: '1', initials: 'AQ', glow: 'var(--glow-water)', titleClass: 'text-neon-blue', badge: 'EAU' },
//   { id: '#003', name: 'Verdelume', types: ['grass'], gen: '2', initials: 'VD', glow: 'var(--glow-grass)', titleClass: 'text-neon-turq', badge: 'PLANTE' },
//   { id: '#004', name: 'Voltix', types: ['electric'], gen: '1', initials: 'VT', glow: 'var(--glow-electric)', titleClass: 'text-neon-yellow', badge: 'ÉLECTRIK' },
//   { id: '#005', name: 'Psyloop', types: ['psychic'], gen: '3', initials: 'PS', glow: 'var(--glow-psychic)', titleClass: 'text-neon-pink', badge: 'PSY' },
//   { id: '#006', name: 'Gravion', types: ['rock'], gen: '2', initials: 'GV', glow: 'var(--glow-rock)', titleClass: 'text-slate-200', badge: 'ROCHE' },
//   { id: '#007', name: 'Aerol', types: ['flying'], gen: '1', initials: 'AE', glow: 'var(--glow-flying)', titleClass: 'text-neon-blue', badge: 'VOL' },
//   { id: '#008', name: 'Pyrrhine', types: ['fire'], gen: '2', initials: 'PR', glow: 'var(--glow-fire)', titleClass: 'text-neon-orange', badge: 'FEU' },
//   { id: '#009', name: 'Marinette', types: ['water'], gen: '3', initials: 'MA', glow: 'var(--glow-water)', titleClass: 'text-neon-blue', badge: 'EAU' },
//   { id: '#010', name: 'Luminex', types: ['electric'], gen: '2', initials: 'LU', glow: 'var(--glow-electric)', titleClass: 'text-neon-yellow', badge: 'ÉLECTRIK' },
//   { id: '#011', name: 'Florash', types: ['grass'], gen: '1', initials: 'FR', glow: 'var(--glow-grass)', titleClass: 'text-neon-turq', badge: 'PLANTE' },
//   { id: '#012', name: 'Noctavox', types: ['psychic'], gen: '3', initials: 'NX', glow: 'var(--glow-psychic)', titleClass: 'text-neon-pink', badge: 'PSY' }
// ];



const TYPE_OPTIONS = [
  { key: 'all', label: 'TOUS', classes: 'filter-btn' },
  { key: 'fire', label: 'FEU', classes: 'filter-btn bg-gradient-to-r from-[var(--fire-1)] to-[var(--fire-2)]' },
  { key: 'water', label: 'EAU', classes: 'filter-btn bg-gradient-to-r from-[var(--water-1)] to-[var(--water-2)]' },
  { key: 'grass', label: 'PLANTE', classes: 'filter-btn bg-gradient-to-r from-[var(--grass-1)] to-[var(--grass-2)]' },
  { key: 'electric', label: 'ÉLECTRIK', classes: 'filter-btn bg-gradient-to-r from-[var(--electric-1)] to-[var(--electric-2)]' },
  { key: 'psychic', label: 'PSY', classes: 'filter-btn bg-gradient-to-r from-[var(--psychic-1)] to-[var(--psychic-2)]' }
];

const Page = () => {
  // use React state instead of direct DOM queries
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [gen, setGen] = useState('all');
  const [POKEMON,setPOKEMON] = useState([]);

  const fetchAllPokemons = async () => {
    try {
      const res = await getPokemons()
      console.log(res);
      setPOKEMON(res.results);
    } catch (error) {
      console.log('Error fetching pokemons:', error);
      
    }
  }

  useEffect(() => {
    fetchAllPokemons()
  },[])

  // const filtered = useMemo(() => {
  //   const q = (query || '').toLowerCase().trim();
  //   return POKEMON.filter(p => {
  //     if (q) {
  //       const name = p.name.toLowerCase();
  //       if (!(name.includes(q) || ('#' + name).includes(q))) return false;
  //     }
  //     if (activeType && activeType !== 'all') {
  //       if (!p.types.includes(activeType)) return false;
  //     }
  //     if (gen && gen !== 'all') {
  //       if (p.gen !== gen) return false;
  //     }
  //     return true;
  //   });
  // }, [query, activeType, gen]);

  return (
    <>
      <main className="pt-28 px-6 md:px-12 pb-12 md:ml-80 md:mr-6">

        {/* <section className="bevel p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-pixel text-neon-blue text-[12px]">POKÉDEX — DexArchive</h3>
              <p className="text-sm text-slate-400 mt-1">Grille néon — Explorez les entrées. Cliquez sur un type pour filtrer.</p>
            </div>
            <div className="filters flex gap-2 items-center">
              {TYPE_OPTIONS.map(opt => (
                <div
                  key={opt.key}
                  className={`${opt.classes} ${activeType === opt.key ? 'active' : ''}`}
                  data-filter-type={opt.key}
                  onClick={() => setActiveType(opt.key)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <section className="pokedex-hero bevel p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-300">
              <p className="font-pixel text-neon-pink text-[11px]">Recherche avancée</p>
              <p className="text-sm text-slate-400">Filtrez par génération, type ou saisissez un nom.</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="global-search"
                className="bg-transparent outline-none text-sm px-3 py-2 border border-slate-700 rounded-md text-slate-300 font-pixel"
                placeholder="Rechercher nom ou #..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                id="gen-filter"
                className="bg-transparent outline-none text-sm px-3 py-2 border border-slate-700 rounded-md text-slate-300 font-pixel"
                value={gen}
                onChange={(e) => setGen(e.target.value)}
              >
                <option value="all">Toutes générations</option>
                <option value="1">Génération I</option>
                <option value="2">Génération II</option>
                <option value="3">Génération III</option>
              </select>
            </div>
          </div>
        </section> */}

        <section>
          <div className="poke-grid" id="poke-grid">

            {/* render cards from data model */}
            {/* {filtered.map(p => (
              <PokeCard key={p.name} p={p} />
            ))} */}
            {POKEMON.map(p => (
              <PokeCard key={p.name} p={p} />
            ))}

          </div>
        </section>

      </main>
    </>
  );
};

export default Page;