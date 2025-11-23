import React from 'react';

const Header = () => {
    return (
        <>
        {/* <!-- Header --> */}
  <header className="fixed z-10 left-0 right-0 top-4 mx-4 sm:mx-80 md:mx-[calc(18rem+36px)] px-4 py-2 header-glow flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-neon-blue/10 flex items-center justify-center text-neon-blue text-xs font-pixel">DA</div>
      <div>
        <h2 className="font-pixel text-[12px] text-neon-turq">Exploration</h2>
        <p className="text-[11px] text-slate-300/50">Session: archive-001</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <div className="text-[12px] text-slate-300/60 hidden sm:block">Recherche rapide</div>
      <div className="w-40 h-9 bevel flex items-center px-3">
        <input className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" placeholder="Rechercher un pokémon..." />
      </div>
      <button className="px-3 py-1 text-xs font-pixel text-neon-yellow/95 border border-neon-yellow/10 rounded-md">Connect</button>
    </div>
  </header>
        </>
    );
};

export default Header;