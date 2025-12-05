import React from 'react';

const Spinner = () => {
    return (
        <>
        <div className="mt-4 flex justify-center items-center gap-4">
          <div className="w-20 h-20 rounded grid place-items-center bg-gradient-to-br from-night-800/40 to-transparent">
            <div className="pixel-spinner">
              <span className="block w-2 h-2 bg-[#58A6FF]" />
              <span className="block w-2 h-2 bg-[#4DE1C1]" />
              <span className="block w-2 h-2 bg-[#D28CFF]" />
              <span className="block w-2 h-2 bg-[#FF944D]" />
              <span className="block w-2 h-2 bg-[#FFE066]" />
              <span className="block w-2 h-2 bg-[#58A6FF]" />
              <span className="block w-2 h-2 bg-[#4DE1C1]" />
              <span className="block w-2 h-2 bg-[#D28CFF]" />
              <span className="block w-2 h-2 bg-[#FF944D]" />
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-300 font-pixel">Chargement...</div>
            <div className="text-[11px] text-slate-400">Attendre la réponse du serveur</div>
          </div>
        </div>
        </>
    );
};

export default Spinner;