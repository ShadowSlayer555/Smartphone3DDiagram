export type ElementGroup = 'Alkali Metal' | 'Alkaline Earth' | 'Transition Metal' | 'Basic Metal' | 'Lanthanoid';

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  group: ElementGroup;
}

export interface LayerData {
  id: string;
  title: string;
  description: string;
  elements: string[];
  visual: 'glass' | 'screen' | 'components' | 'board' | 'battery' | 'case';
}

export const groupColors: Record<ElementGroup, string> = {
  'Alkali Metal': '#ef4444', 
  'Alkaline Earth': '#f97316', 
  'Transition Metal': '#eab308', 
  'Basic Metal': '#22c55e', 
  'Lanthanoid': '#3b82f6', 
};

export const elementsInfo: Record<string, ChemicalElement> = {
  In: { symbol: 'In', name: 'Indium', number: 49, group: 'Basic Metal' },
  La: { symbol: 'La', name: 'Lanthanum', number: 57, group: 'Lanthanoid' },
  Pr: { symbol: 'Pr', name: 'Praseodymium', number: 59, group: 'Lanthanoid' },
  Eu: { symbol: 'Eu', name: 'Europium', number: 63, group: 'Lanthanoid' },
  Gd: { symbol: 'Gd', name: 'Gadolinium', number: 64, group: 'Lanthanoid' },
  Tb: { symbol: 'Tb', name: 'Terbium', number: 65, group: 'Lanthanoid' },
  Dy: { symbol: 'Dy', name: 'Dysprosium', number: 66, group: 'Lanthanoid' },
  Ni: { symbol: 'Ni', name: 'Nickel', number: 28, group: 'Transition Metal' },
  Ga: { symbol: 'Ga', name: 'Gallium', number: 31, group: 'Basic Metal' },
  Ta: { symbol: 'Ta', name: 'Tantalum', number: 73, group: 'Transition Metal' },
  Nd: { symbol: 'Nd', name: 'Neodymium', number: 60, group: 'Lanthanoid' },
  Li: { symbol: 'Li', name: 'Lithium', number: 3, group: 'Alkali Metal' },
  Co: { symbol: 'Co', name: 'Cobalt', number: 27, group: 'Transition Metal' },
  Mg: { symbol: 'Mg', name: 'Magnesium', number: 12, group: 'Alkaline Earth' },
};

export const layers: LayerData[] = [
  {
    id: 'touch-screen',
    title: 'TOUCH SCREEN',
    description: 'It contains a thin layer of indium tin oxide, highly conductive and transparent, allowing the screen to function as a touch screen.',
    elements: ['In'],
    visual: 'glass'
  },
  {
    id: 'display',
    title: 'DISPLAY',
    description: 'The display contains several rare earth elements. Small quantities are used to produce the colors on the liquid crystal display. Some give the screen its glow.',
    elements: ['La', 'Pr', 'Eu', 'Gd', 'Tb', 'Dy'],
    visual: 'screen'
  },
  {
    id: 'audio-vibe',
    title: 'MICROPHONE, SPEAKERS, VIBRATION',
    description: 'Nickel is used in the microphone diaphragm (that vibrates in response to sound waves). Alloys containing neodymium, praseodymium and gadolinium are used in the magnets contained in the speaker and microphone. Neodymium, terbium and dysprosium are used in the vibration unit.',
    elements: ['Ni', 'Pr', 'Nd', 'Gd', 'Tb', 'Dy'],
    visual: 'components'
  },
  {
    id: 'electronics',
    title: 'ELECTRONICS',
    description: 'Nickel is used in electrical connections. Gallium is used in semiconductors. Tantalum is the major component of micro capacitors, used for filtering and frequency tuning.',
    elements: ['Ni', 'Ga', 'Ta'],
    visual: 'board'
  },
  {
    id: 'battery',
    title: 'BATTERY',
    description: 'The majority of smartphones use lithium-ion batteries.',
    elements: ['Li', 'Co', 'Ni'],
    visual: 'battery'
  },
  {
    id: 'casing',
    title: 'CASING',
    description: 'Nickel reduces electromagnetic interference. Magnesium alloys are superior at electromagnetic interference (EMI) shielding.',
    elements: ['Mg', 'Ni'],
    visual: 'case'
  }
];
