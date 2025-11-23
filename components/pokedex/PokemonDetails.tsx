import React, { useEffect, useRef, useState } from 'react';
import { fetchResourceByUrl } from '@/services/pokeapi/pokeapiService';

// type Stats = {
//   hp: number;
//   attack: number;
//   defense: number;
//   spAttack: number;
//   spDefense: number;
//   speed: number;
// };

// type Pokemon = {
//   id?: number;
//   name?: string;
//   species?: string;
//   types?: any[] | string[];
//   rarity?: number;
//   height?: string | number;
//   weight?: string | number;
//   abilities?: any;
//   description?: string;
//   stats?: any;
//   pixelArtUrl?: string | null;
//   url?: string;
// };

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   pokemon: Pokemon | null;
// };

const PokemonDetails: React.FC<Props> = ({ isOpen, onClose, pokemon }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [detailData, setDetailData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // fetch details when modal opens or pokemon changes
  useEffect(() => {
    let cancelled = false;
    const fetchDetails = async () => {
      if (!pokemon) return;
      // if already detailed (has sprites or types as objects), reuse
      if ((pokemon as any).sprites || ((pokemon.types ?? []).length && typeof (pokemon.types[0]) === 'object')) {
        setDetailData(pokemon);
        return;
      }
      if ((pokemon as any).url) {
        setLoading(true);
        try {
          const res = await fetchResourceByUrl((pokemon as any).url);
          if (!cancelled) setDetailData(res);
        } catch {
          if (!cancelled) setDetailData(null);
        } finally {
          if (!cancelled) setLoading(false);
        }
      }
    };
    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [pokemon, isOpen]);

  if (!isOpen || !pokemon) return null;

  const source: any = detailData ?? pokemon;

  const getTypes = (t: any) => {
    if (!t) return [];
    if (Array.isArray(t)) {
      return t.map((x: any) => (typeof x === 'string' ? x : x?.type?.name ?? x?.name ?? '—'));
    }
    return [];
  };

  const normalizeStats = (raw: any): Stats => {
    if (!raw) return { hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0 };
    if (raw.hp !== undefined) return raw;
    const out: any = { hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0 };
    if (Array.isArray(raw)) {
      raw.forEach((st: any) => {
        const name = st.stat?.name ?? st.name ?? '';
        const val = st.base_stat ?? st.value ?? 0;
        if (name.includes('hp')) out.hp = val;
        else if (name.includes('attack') && !name.includes('special')) out.attack = val;
        else if (name.includes('defense') && !name.includes('special')) out.defense = val;
        else if (name.includes('special-attack') || name === 'special_attack') out.spAttack = val;
        else if (name.includes('special-defense') || name === 'special_defense') out.spDefense = val;
        else if (name.includes('speed')) out.speed = val;
      });
    }
    return out;
  };

  // --- ADDED HELPERS: safely extract/display simple values and format abilities ---
  const getSimpleName = (v: any) => {
    if (v === undefined || v === null) return undefined;
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    if (typeof v === 'object') {
      // common shapes: { name }, { species }, nested ability object { ability: { name } }
      return v.name ?? v.species ?? v.ability?.name ?? JSON.stringify(v);
    }
    return String(v);
  };

  // capitalize first letter, keep rest as-is (defensive)
  const capitalize = (s?: string) => {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const formatAbilities = (ab: any) => {
    if (!ab) return '—';
    if (Array.isArray(ab)) {
      return ab
        .map((a: any) => {
          if (typeof a === 'string') return a;
          return a?.ability?.name ?? a?.name ?? JSON.stringify(a);
        })
        .join(' / ');
    }
    if (typeof ab === 'object') {
      return ab?.ability?.name ?? ab?.name ?? JSON.stringify(ab);
    }
    return String(ab);
  };
  // --- END ADDED HELPERS ---

  const s = normalizeStats(source?.stats);
  const renderRarity = (r = (source?.rarity ?? 0)) => '★'.repeat(r) + '☆'.repeat(Math.max(0, 5 - r));

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (loading) {
    return (
      <div ref={overlayRef} onMouseDown={handleOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 p-6 bg-night-900/80 rounded-md">Chargement...</div>
      </div>
    );
  }

  return (
    <div
    // key={pokemon.name}
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center "
      aria-hidden={!isOpen}
    >
      {/* style local pour cacher la scrollbar (WebKit, Firefox, IE) */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* modal */}
      <main
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-[min(96vw,1200px)] max-h-[92vh] overflow-auto hide-scrollbar pt-8 px-6 pb-12 md:px-12 bg-night-900/80 rounded-lg shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <section className="max-w-6xl mx-auto">
          <div className="bevel p-6 grid grid-cols-1 md:grid-cols-3 main-grid-gap">

            {/* Left: Pixel art large */}
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="pixel-frame w-full max-w-xs pixel-border bg-night-800/60 p-4">
                {/* <div
                  className="w-full h-80 bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-black rounded-md flex items-center justify-center pixel-grid
                             shadow-[0_18px_50px_rgba(22,46,92,0.6),inset_0_1px_0_rgba(255,255,255,0.02)]"
                >
                  {source?.sprites?.front_default || source?.pixelArtUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={source?.sprites?.front_default ?? source?.pixelArtUrl} alt={`${source?.name ?? pokemon?.name} pixel art`} className="w-48 h-48 object-contain bg-amber-200" />
                  ) : (
                    <div className="w-48 h-48 bg-black/40 rounded-sm flex items-center justify-center text-neon-blue text-[10px] font-pixel">PIXEL ART</div>
                  )}
                </div> */}
                {source?.sprites?.front_default || source?.pixelArtUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={source?.sprites?.front_default ?? source?.pixelArtUrl} alt={`${source?.name ?? pokemon?.name} pixel art`} className="w-48 h-48 object-contain " />
                  ) : (
                    <div className="w-48 h-48 bg-black/40 rounded-sm flex items-center justify-center text-neon-blue text-[10px] font-pixel">PIXEL ART</div>
                  )}

                {/* <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-yellow font-pixel text-[12px]">Fiche #{String(source?.id ?? pokemon?.id ?? 0).padStart(3, '0')}</span>
                    <span className="text-slate-400 text-xs">— {getSimpleName(source?.species ?? pokemon?.species) ?? 'Espèce inconnue'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-pixel text-neon-blue border border-neon-blue/10 rounded">Exporter</button>
                    <button className="px-3 py-1 text-xs font-pixel text-neon-pink border border-neon-pink/10 rounded">Annoter</button>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right: Details + stats */}
            <div className="md:col-span-2 space-y-4">
              <div className="bevel p-4 pixel-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-pixel text-neon-yellow text-[22px]">{capitalize(getSimpleName(source?.name ?? pokemon?.name))}</h1>
                    <p className="text-slate-300/70 text-sm">#{String(source?.id ?? pokemon?.id ?? 0).padStart(3, '0')} • Espèce : {getSimpleName(source?.species ?? pokemon?.species) ?? '—'}</p>

                    <div className="mt-3 badge-wrap">
                      {getTypes(source?.types ?? pokemon?.types).map((t: string, i: number) => (
                        // <span key={i} className="type-badge bg-neon-yellow/10 text-neon-yellow mr-2">{t?.toString?.()?.toUpperCase?.() ?? t}</span>
                        <span key={i} className={`type-badge type-${t}`}>{t?.toString?.()?.toUpperCase?.() ?? t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Rareté</div>
                    <div className="font-pixel text-neon-blue text-[18px]">{renderRarity()}</div>
                  </div>
                </div>

                <div className="pixel-sep my-4"></div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gradient-to-br from-night-900/40 to-night-800/30 rounded pixel-border">
                    <div className="text-[10px] text-slate-400">Taille</div>
                    <div className="font-pixel text-neon-blue text-[12px]">{source?.height ?? pokemon?.height ?? '—'}</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-night-900/40 to-night-800/30 rounded pixel-border">
                    <div className="text-[10px] text-slate-400">Poids</div>
                    <div className="font-pixel text-neon-blue text-[12px]">{source?.weight ?? pokemon?.weight ?? '—'}</div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-night-900/40 to-night-800/30 rounded pixel-border">
                    <div className="text-[10px] text-slate-400">Abilities</div>
                    <div className="font-pixel text-neon-blue text-[12px]">
                      {formatAbilities(source?.abilities ?? pokemon?.abilities)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-300/70">Description: <span className="text-slate-200">{source?.description ?? pokemon?.description ?? 'Aucune description fournie.'}</span></div>
              </div>

              {/* Stats card */}
              <div className="bevel p-4 pixel-border">
                <h3 className="font-pixel text-neon-blue text-[12px]">Barres de stats — Mesures biologiques</h3>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  {/* stat rows use normalized s */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>PV</span>
                      <span className="font-pixel text-slate-200">{s.hp}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#58A6FF,#4DE1C1)] shadow-[0_6px_20px_rgba(88,166,255,0.12)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.hp) || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Attaque</span>
                      <span className="font-pixel text-slate-200">{s.attack}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#FF944D,#D28CFF)] shadow-[0_6px_20px_rgba(255,148,77,0.08)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.attack) || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Défense</span>
                      <span className="font-pixel text-slate-200">{s.defense}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#FFE066,#FF944D)] shadow-[0_6px_20px_rgba(255,224,102,0.08)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.defense) || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Sp. Atq</span>
                      <span className="font-pixel text-slate-200">{s.spAttack}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#D28CFF,#58A6FF)] shadow-[0_6px_20px_rgba(210,140,255,0.08)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.spAttack) || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Sp. Def</span>
                      <span className="font-pixel text-slate-200">{s.spDefense}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#4DE1C1,#58A6FF)] shadow-[0_6px_20px_rgba(77,225,193,0.08)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.spDefense) || 0))}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Vitesse</span>
                      <span className="font-pixel text-slate-200">{s.speed}</span>
                    </div>
                    <div className="stat-bar">
                      <div
                        className="stat-fill h-2 rounded bg-[linear-gradient(90deg,#FFE066,#58A6FF)] shadow-[0_6px_20px_rgba(255,224,102,0.12)]"
                        style={{ width: `${Math.min(100, Math.max(0, Number(s.speed) || 0))}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Archive notes */}
              <div className="bevel p-4 pixel-border">
                <h3 className="font-pixel text-neon-yellow text-[12px]">Notes d'archive</h3>
                <p className="mt-2 text-sm text-slate-300/70">Observations et annotations scientifiques — zone libre pour commentaires internes.</p>

                <textarea className="w-full mt-3 p-3 bg-night-900/40 rounded text-sm text-slate-200 placeholder:text-slate-400 outline-none" rows={6} placeholder="Ajouter une note d'archive..." defaultValue="Comportement observé: émission de micro-sphères électriques au crépuscule. Interaction non agressive avec espèces voisines." />

                <div className="mt-3 flex items-center justify-end gap-2">
                  <button className="px-3 py-1 text-xs font-pixel text-neon-blue border border-neon-blue/10 rounded">Sauvegarder</button>
                  <button onClick={onClose} className="px-3 py-1 text-xs font-pixel text-slate-400 border border-slate-700/10 rounded">Annuler</button>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default PokemonDetails;