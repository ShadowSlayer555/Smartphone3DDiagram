import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { ChemicalElement, elementsInfo, groupColors, LayerData, layers } from './data';

type ViewState = 'assembled' | 'exploded' | 'detailed';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
}

const ElementTile: React.FC<{ element: ChemicalElement }> = ({ element }) => (
  <div className="flex flex-col items-center justify-center w-20 h-20 rounded shadow-sm border border-white/10 bg-[#222]/80 relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg cursor-default">
    <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundColor: groupColors[element.group] }}></div>
    <div className="flex w-full justify-between px-2 pt-1 z-10">
      <span className="text-[10px] font-bold text-white/50">{element.number}</span>
    </div>
    <span className="text-2xl font-black z-10 leading-none" style={{ color: groupColors[element.group] }}>{element.symbol}</span>
    <span className="text-[10px] uppercase font-bold text-white/80 truncate w-full text-center px-1 mt-1 z-10 tracking-tighter">{element.name}</span>
  </div>
);

const InfoCard: React.FC<{ layer: LayerData }> = ({ layer }) => (
  <div className="w-full bg-[#1A1A1B]/90 backdrop-blur-xl p-6 rounded-[30px] shadow-2xl border border-white/10 pointer-events-auto">
    <div className="flex items-center gap-3 mb-2">
      <h2 className="text-2xl font-black text-white tracking-widest uppercase">{layer.title}</h2>
    </div>
    <p className="text-white/60 mb-6 leading-relaxed text-sm font-medium">
      {layer.description}
    </p>
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#00FF66] mb-3">Critical Elements</h3>
      <div className="flex flex-wrap gap-2">
        {layer.elements.map((symbol) => {
          const el = elementsInfo[symbol];
          return <ElementTile key={symbol} element={el} />;
        })}
      </div>
    </div>
  </div>
);

const baseShapeClass = "absolute inset-0 w-[260px] h-[560px] rounded-[40px] shadow-sm pointer-events-auto transform-gpu";

const PhoneShape: React.FC<{ children?: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <div className={`${baseShapeClass} ${className || ''}`} style={style}>
    {children}
  </div>
);

const LayerVisuals: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'glass':
      return (
        <PhoneShape className="bg-[#FFFFFF10] border border-[#FFFFFF20] backdrop-blur-sm shadow-2xl flex flex-col justify-between p-4">
          <div className="h-4 w-1/4 bg-white/20 rounded-full mx-auto mt-2 shadow-inner"></div>
        </PhoneShape>
      );
    case 'screen':
      return (
        <PhoneShape className="bg-[#333] border border-[#FFFFFF20] shadow-md flex items-center justify-center overflow-hidden p-2">
          <div className="w-full h-full bg-[#111] rounded-[30px] flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FF66]/20 via-transparent to-transparent"></div>
             <div className="space-y-6 opacity-30 w-full px-8">
               <div className="w-full h-12 bg-white/20 rounded-xl"></div>
               <div className="w-3/4 h-8 bg-white/20 rounded-lg"></div>
               <div className="w-5/6 h-8 bg-white/20 rounded-lg"></div>
             </div>
          </div>
        </PhoneShape>
      );
    case 'components':
      return (
        <PhoneShape className="bg-transparent pointer-events-none border-2 border-dashed border-[#00FF6640]">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#222] rounded-full drop-shadow-md border border-[#444] flex items-center justify-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]"></div>
          </div>
          <div className="absolute top-32 right-6 w-12 h-16 bg-[#222] rounded drop-shadow-md border border-[#444] border-t-8 border-t-[#00FF66]"></div>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#222] rounded-full drop-shadow-lg border-2 border-[#444] flex items-center justify-center relative overflow-hidden">
            <div className="w-8 h-8 border-[6px] border-[#00FF66]/50 rounded-full opacity-80"></div>
            <div className="absolute inset-0 border-2 border-[#00FF66]/30 rounded-full m-1 border-dashed animate-[spin_10s_linear_infinite]"></div>
          </div>
        </PhoneShape>
      );
    case 'board':
      return (
        <PhoneShape className="bg-[#1A1A1A] border border-[#FFFFFF10] shadow-lg p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00FF66 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
          <div className="w-24 h-48 bg-[#222] rounded-md absolute top-16 left-6 border border-[#333] shadow-xl flex items-center justify-center">
             <div className="w-12 h-12 border border-[#444] rounded bg-[#111] text-[8px] flex items-center justify-center text-[#00FF66] font-mono">CPU</div>
          </div>
          <div className="w-16 h-16 bg-[#222] rounded-md absolute top-20 right-6 border border-[#333] shadow-xl"></div>
          <div className="w-32 h-64 bg-[#222] flex items-end p-4 rounded-md absolute top-72 left-1/2 -translate-x-1/2 border border-[#333] shadow-xl">
             <div className="w-full h-8 bg-[#111] rounded-sm"></div>
          </div>
          <div className="absolute top-8 right-6 flex space-x-1 border border-white/20 p-1 bg-[#111]/50 rounded-sm">
             {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-6 bg-[#00FF66] rounded-sm"></div>)}
          </div>
        </PhoneShape>
      );
    case 'battery':
      return (
        <PhoneShape className="bg-[#222] border border-[#FFFFFF10] p-6 flex flex-col items-center">
          <div className="w-full h-3/5 mt-[30%] bg-[#111] rounded-lg border border-[#333] shadow-inner flex items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-12 bg-white/10"></div>
             <div className="text-white/60 font-mono text-4xl font-bold tracking-widest rotate-90 drop-shadow-md">Li-Ion</div>
             <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent w-[300%] rotate-45 animate-[shimmer_5s_infinite]"></div>
          </div>
        </PhoneShape>
      );
    case 'case':
      return (
        <PhoneShape className="bg-[#111] border border-[#FFFFFF05] shadow-2xl relative">
          <div className="w-20 h-20 bg-white/5 rounded-full absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-inner mix-blend-overlay"></div>
          <div className="absolute -left-2 top-32 w-1.5 h-16 bg-white/10 rounded-r-md"></div>
          <div className="absolute -left-2 top-56 w-1.5 h-12 bg-white/10 rounded-r-md"></div>
          <div className="absolute -right-2 top-32 w-1.5 h-24 bg-white/10 rounded-l-md"></div>
        </PhoneShape>
      );
    default:
      return <PhoneShape className="bg-[#111] border border-white/10" />;
  }
};

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('assembled');
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  
  const activeLayerData = layers.find(l => l.id === activeLayer);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleReveal = () => {
    if (viewState === 'assembled') {
      setViewState('exploded');
      setActiveLayer(null);
    } else {
      setViewState('assembled');
      setActiveLayer(null);
    }
  };

  const handleLayerClick = (id: string) => {
    if (viewState === 'exploded') {
       setActiveLayer(id);
       setViewState('detailed');
    }
  };

  const handleBack = () => {
    setViewState('exploded');
    setActiveLayer(null);
  };

  const sceneVariants = {
    assembled: { 
        rotateX: 60, 
        rotateZ: -30, 
        scale: isMobile ? 0.5 : 0.7, 
        x: 0, 
        y: isMobile ? -50 : 0 
    },
    exploded: { 
        rotateX: 60, 
        rotateZ: -30, 
        scale: isMobile ? 0.35 : 0.6, 
        x: 0, 
        y: isMobile ? -100 : 0 
    },
    detailed: { 
        rotateX: 0, 
        rotateZ: 0, 
        scale: isMobile ? 0.6 : 0.8, 
        x: isMobile ? 0 : -200, 
        y: isMobile ? -250 : 0 
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F0F0F0] flex flex-col font-sans overflow-x-hidden selection:bg-[#00FF66]/30">
      
      {/* Header */}
      <header className="px-6 md:px-12 py-8 md:py-12 flex-shrink-0 z-20 w-full relative">
        <h1 className="text-5xl md:text-[80px] lg:text-[100px] leading-[0.85] font-black tracking-tighter uppercase text-[#F0F0F0]">
          What are you<br />
          <span className="text-[#00FF66]">made of?</span>
        </h1>
        <p className="text-[#4D4D4F] mt-4 md:mt-6 text-xs uppercase tracking-[0.3em] font-medium">A Breakdown of the Critical Metals in a Smartphone</p>
      </header>

      {/* Main 3D Canvas */}
      <main className="flex-grow flex items-center justify-center relative w-full overflow-hidden perspective-[1500px]">
        
        {/* Back Button for Detailed View */}
        <AnimatePresence>
          {viewState === 'detailed' && (
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={handleBack}
              className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 px-6 py-3 bg-[#1A1A1A]/80 backdrop-blur-md rounded-full shadow-2xl text-[10px] uppercase font-bold tracking-widest text-[#F0F0F0] hover:bg-[#333] transition-colors z-30 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4 text-[#00FF66]" /> Back to components
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial="assembled"
          animate={viewState}
          variants={sceneVariants}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-[260px] h-[560px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {layers.map((layer, index) => {
            const reverseIndex = layers.length - index - 1; 
            
            let targetZ = 0;
            if (viewState === 'assembled') {
               targetZ = reverseIndex * 8;
            } else if (viewState === 'exploded') {
               targetZ = reverseIndex * 120 - 300; 
            } else if (viewState === 'detailed') {
               targetZ = activeLayer === layer.id ? 50 : (reverseIndex * 20 - 100);
            }
            
            const isActive = activeLayer === layer.id;
            const isDetailed = viewState === 'detailed';

            return (
              <motion.div
                key={layer.id}
                animate={{
                  translateZ: targetZ,
                  opacity: isDetailed ? (isActive ? 1 : 0) : 1,
                  pointerEvents: isDetailed ? (isActive ? 'auto' : 'none') : 'auto',
                }}
                whileHover={viewState === 'exploded' ? { 
                    scale: 1.05, 
                    translateZ: targetZ + 20, 
                    filter: 'brightness(1.1)' 
                } : {}}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 cursor-pointer origin-center"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => handleLayerClick(layer.id)}
              >
                <LayerVisuals type={layer.visual} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info Card Overlay - Rendered alongside but outside 3D stack space for better layout */}
        <AnimatePresence>
          {viewState === 'detailed' && activeLayerData && (
            <motion.div
              key="info-card"
              initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 40 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute md:right-[10%] xl:right-[20%] top-[65%] md:top-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-sm z-20"
            >
              <InfoCard layer={activeLayerData} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer Controls */}
      <footer className="py-8 px-6 md:px-12 z-20 flex flex-col md:flex-row justify-between items-center md:items-end flex-shrink-0 min-h-[100px] gap-8">
        <div className="space-y-4 hidden md:block">
          <div className="flex space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF66]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
          </div>
          <p className="text-[10px] uppercase tracking-tighter text-white/40 max-w-[200px]">
            {viewState === 'exploded' ? 'Select a layer to view details and sub-assemblies.' : (viewState === 'assembled' ? 'Unpack the device to discover what it is made of.' : 'Detailed view of the selected component.')}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {viewState !== 'detailed' && (
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
            >
              <button 
                onClick={toggleReveal}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-[#00FF66] rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
                <div className="relative bg-white text-black px-8 md:px-12 py-4 md:py-5 rounded-full flex items-center space-x-4 md:space-x-6">
                  <span className="text-xs md:text-sm font-black uppercase tracking-widest">
                    {viewState === 'assembled' ? 'Explode Unit' : 'Reassemble Unit'}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={viewState === 'assembled' ? "rotate-45 transition-transform" : "transition-transform"}><path d="M12 5v14M5 12h14" /></svg>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>

      {/* Small Legend below everything optionally? The diagram has one, we could add a tiny minimal static one */}
      <div className="fixed top-8 right-8 hidden md:flex flex-col gap-2 p-4 bg-[#1A1A1A]/80 backdrop-blur rounded-2xl border border-white/5 shadow-2xl z-0">
        <div className="text-[9px] font-black uppercase text-[#00FF66] tracking-wider mb-1">Metals Key</div>
        {Object.entries(groupColors).map(([group, color]) => (
           <div key={group} className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full shadow-[0_0_8px_var(--tw-shadow-color)]" style={{ backgroundColor: color, '--tw-shadow-color': color } as React.CSSProperties}></div>
             <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase">{group}</span>
           </div>
        ))}
      </div>

    </div>
  );
}
