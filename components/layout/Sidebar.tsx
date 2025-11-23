import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <>
            {/* <!-- Sidebar --> */}
            <aside
                className="fixed left-4 top-6 bottom-6 w-72 p-5 bevel overflow-hidden hidden sm:block z-50
                           bg-linear-to-b from-[rgba(6,28,48,0.85)] to-[rgba(3,9,18,0.75)]
                           shadow-[0_18px_50px_rgba(22,46,92,0.6),inset_0_1px_0_rgba(255,255,255,0.02)]
                           border border-[rgba(95,160,255,0.06)]"
            >
                {/* <!-- neon left stripe --> */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r
                               bg-linear-to-b from-[rgba(88,166,255,0.95)] to-[rgba(77,225,193,0.85)]
                               shadow-[0_0_18px_rgba(88,166,255,0.12)]"
                >
                </div>

                <div className="flex items-center gap-3 mb-6 px-4 relative z-10">
                    <div className="w-14 h-14 rounded-md flex items-center justify-center bg-linear-to-br from-neon-blue/30 to-neon-turq/16 shadow-neon-deep">
                        <span className="text-neon-yellow font-pixel text-sm">DA</span>
                    </div>
                    <div>
                        <h1 className="font-pixel text-neon-blue text-[12px]">DEXARCHIVE</h1>
                        <p className="text-[11px] text-slate-200/75">Archive scientifique — neon-pixel</p>
                    </div>
                </div>

                <nav className="mt-4 relative z-10">
                    <ul className="space-y-2 px-2">
                        <li>
                            <a
                                href="#"
                                className="pixel-link text-slate-100 hover:text-neon-yellow"
                                style={{ ['--c' as never]: '#FFE066' }}
                            >
                                <span className="dot-left"></span>
                                <span className="label">ACCUEIL</span>
                                <span className="ml-auto text-xs text-slate-400">⌘1</span>
                                <span className="dot-right"></span>
                            </a>
                        </li>
                        <li>
                            <Link
                                href="pokedex"
                                className="pixel-link text-slate-100 hover:text-neon-turq"
                                style={{ ['--c' as never]: '#4DE1C1' }}
                            >
                                <span className="dot-left"></span>
                                <span className="label">POKÉDEX</span>
                                <span className="ml-auto text-xs text-slate-400">⌘2</span>
                                <span className="dot-right"></span>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="pixel-link text-slate-100 hover:text-neon-blue"
                                style={{ ['--c' as never]: '#58A6FF' }}
                            >
                                <span className="dot-left"></span>
                                <span className="label">COMPARATEUR</span>
                                <span className="ml-auto text-xs text-slate-400">⌘3</span>
                                <span className="dot-right"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="pixel-link text-slate-100 hover:text-neon-orange"
                                style={{ ['--c' as never]: '#FF944D' }}
                            >
                                <span className="dot-left"></span>
                                <span className="label">ARCHIVES</span>
                                <span className="ml-auto text-xs text-slate-400">⌘4</span>
                                <span className="dot-right"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="pixel-link text-slate-100 hover:text-neon-pink"
                                style={{ ['--c' as never]: '#D28CFF' }}
                            >
                                <span className="dot-left"></span>
                                <span className="label">COMPONENTS</span>
                                <span className="ml-auto text-xs text-slate-400">⌘5</span>
                                <span className="dot-right"></span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* <!-- Decorative pixels bottom-right --> */}
                <div className="absolute right-4 bottom-4 grid grid-cols-3 gap-1 z-10 opacity-95">
                    <span className="w-2 h-2 bg-neon-blue/90 rounded-sm shadow-[0_0_8px_#58A6FF]" />
                    <span className="w-2 h-2 bg-neon-turq/90 rounded-sm shadow-[0_0_8px_#4DE1C1]" />
                    <span className="w-2 h-2 bg-neon-pink/90 rounded-sm shadow-[0_0_8px_#D28CFF]" />
                    <span className="w-2 h-2 bg-neon-orange/90 rounded-sm shadow-[0_0_8px_#FF944D]" />
                    <span className="w-2 h-2 bg-neon-yellow/90 rounded-sm shadow-[0_0_8px_#FFE066]" />
                    <span className="w-2 h-2 bg-neon-blue/90 rounded-sm shadow-[0_0_8px_#58A6FF]" />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;