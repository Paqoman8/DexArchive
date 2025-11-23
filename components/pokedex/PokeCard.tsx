import { fetchResourceByUrl, getPokemonData } from '@/services/pokeapi/pokeapiService';
import React, { useEffect } from 'react';

const PokeCard = ({ p }) => {
  const [data, setdata] = React.useState(null);

  const fetchData = async () => {
    const res = await fetchResourceByUrl(p.url);
    // console.log("datas", res);

    setdata(res);
  }

  useEffect(() => {
    fetchData();
  }, [])

  // New helper functions: format name, id and stat labels
  const formatName = (s?: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const formatId = (id?: number) => id ? String(id).padStart(3, '0') : '000';
  const formatStat = (s?: string) => s ? s.toUpperCase() : '';

  return (
    <>
      <article
        key={p.name}
        className="poke-card"
        data-name={p.name}
        // data-types={p.types.join(',')}
        data-gen={p.gen}
        style={{ ['--c' as never]: p.glow }}
      >
        <div className="sprite">
          <div className="rounded-sm flex items-center justify-center bg-linear-to-b" >
            {/* {p.initials} */}
            <img src={data?.sprites?.front_default} alt={formatName(data?.name) || p.name} />
            {/* <img src={data?.sprites?.back_default} alt={formatName(data?.name) || p.name} /> */}
          </div>
        </div>
        <div className="poke-meta">
          <div className="poke-title">
            <span className={`poke-name ${p.titleClass}`}>{formatName(data?.name)}</span>
            <span className="poke-id ml-2">#{formatId(data?.id)}</span>
          </div>
          <div className="mt-2">
            {/* <span className={`type-badge bg-red-400`}>fire</span> */}
            {
              data?.types?.map((type, index) => (
                <span key={index} className={`type-badge type-${type?.type.name}`}>{formatName(type?.type.name)}</span>
              ))
            }
          </div>
          <div className="stats">
            {/* simplified static stats: keep original visual but you can extend later */}
            {/* <div className="stat"><span className="dot w-2 h-2 rounded-full inline-block mr-2"></span><span>HP -</span></div>
                    <div className="stat"><span className="dot w-2 h-2 rounded-full inline-block mr-2"></span><span>ATK —</span></div>
                    <div className="stat"><span className="dot w-2 h-2 rounded-full inline-block mr-2"></span><span>DEF —</span></div> */}
            {data?.stats?.slice(0, 3).map((stat, index) => (
              <div key={index} className="stat">
                <span className="dot w-2 h-2 rounded-full border inline-block mr-2">
                </span>
                <span>
                  {formatStat(stat?.stat?.name.slice(0, 3))} {stat?.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default PokeCard;