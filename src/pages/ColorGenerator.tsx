import React, { useState } from 'react';
import { Link } from 'react-router';

interface ColorPalette {
  name: string;
  colors: string[];
}

interface GradientPreset {
  name: string;
  css: string;
}

const presetPalettes: ColorPalette[] = [
  { name: 'Neon Cyberpunk', colors: ['#ff007f', '#7928ca', '#4facfe', '#00f2fe', '#00ffcc'] },
  { name: 'Sunset Glow', colors: ['#ff416c', '#ff4b2b', '#f7b733', '#fc4a1a', '#f857a6'] },
  { name: 'Emerald Forest', colors: ['#0ba360', '#3cba92', '#30dfbc', '#00b09b', '#96c93d'] },
  { name: 'Deep Ocean', colors: ['#2b5876', '#4e4376', '#141e30', '#243b55', '#2c3e50'] },
];

const presetGradients: GradientPreset[] = [
  { name: 'Purple Bliss', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Aqualicious', css: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' },
  { name: 'Sunny Morning', css: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { name: 'Juicy Peach', css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: 'Midnight City', css: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { name: 'Frost', css: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)' },
];

export const ColorGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'palette' | 'gradient'>('palette');

  // Palette State
  const [colors, setColors] = useState<string[]>(['#4f46e5', '#7c3aed', '#db2777', '#2563eb', '#059669']);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Gradient State
  const [gradColor1, setGradColor1] = useState<string>('#4f46e5');
  const [gradColor2, setGradColor2] = useState<string>('#06b6d4');
  const [gradDirection, setGradDirection] = useState<string>('135deg');
  const [copiedGradient, setCopiedGradient] = useState<boolean>(false);

  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleGenerateNewPalette = () => {
    const newColors = Array.from({ length: 5 }, () => getRandomColor());
    setColors(newColors);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedColor(code);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const currentGradientCSS = `linear-gradient(${gradDirection}, ${gradColor1}, ${gradColor2})`;

  const handleCopyGradient = () => {
    navigator.clipboard.writeText(`background: ${currentGradientCSS};`);
    setCopiedGradient(true);
    setTimeout(() => setCopiedGradient(false), 2000);
  };

  const handleRandomGradient = () => {
    setGradColor1(getRandomColor());
    setGradColor2(getRandomColor());
    const directions = ['0deg', '45deg', '90deg', '135deg', '180deg', 'to right', 'to bottom right'];
    setGradDirection(directions[Math.floor(Math.random() * directions.length)]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header & Back Link */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Color & Gradient Suite
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Generate random palettes or custom CSS gradients with instant code copying.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center">
            <div className="bg-white dark:bg-slate-900 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 flex gap-1 shadow-sm">
              <button
                onClick={() => setActiveTab('palette')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'palette'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <i className="fa-solid fa-palette mr-2"></i> Palette Generator
              </button>
              <button
                onClick={() => setActiveTab('gradient')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'gradient'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <i className="fa-solid fa-fill-drip mr-2"></i> Gradient Generator
              </button>
            </div>
          </div>

          {/* Tab 1: Palette Generator */}
          {activeTab === 'palette' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                {colors.map((hex, index) => (
                  <div
                    key={index}
                    onClick={() => handleCopyCode(hex)}
                    className="group relative h-48 sm:h-64 rounded-2xl flex flex-col justify-end p-4 cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.03]"
                    style={{ backgroundColor: hex }}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-lg">
                        {copiedColor === hex ? 'Copied!' : 'Copy Hex'}
                      </span>
                    </div>
                    <div className="relative z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl text-center shadow-sm">
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                        {hex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={handleGenerateNewPalette}
                  className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Generate Random Palette</span>
                </button>
              </div>

              {/* Preset Palettes */}
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
                  Curated Professional Presets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {presetPalettes.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => setColors(preset.colors)}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                    >
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {preset.name}
                      </span>
                      <div className="flex gap-1.5">
                        {preset.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                            style={{ backgroundColor: c }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Gradient Generator */}
          {activeTab === 'gradient' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Main Gradient Preview Box */}
              <div
                className="h-64 sm:h-80 rounded-3xl shadow-xl flex flex-col justify-end p-6 transition-all duration-500 border border-white/20 relative"
                style={{ background: currentGradientCSS }}
              >
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md">
                  background: {currentGradientCSS};
                </div>
                <div className="flex justify-between items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                    {currentGradientCSS}
                  </span>
                  <button
                    onClick={handleCopyGradient}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer shrink-0 ml-4"
                  >
                    {copiedGradient ? 'Copied CSS!' : 'Copy CSS'}
                  </button>
                </div>
              </div>

              {/* Controls Toolbar */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500">Color Stop 1</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={gradColor1}
                      onChange={(e) => setGradColor1(e.target.value)}
                      className="w-12 h-12 rounded-xl border-0 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-sm font-bold uppercase text-slate-800 dark:text-slate-200">{gradColor1}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500">Color Stop 2</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={gradColor2}
                      onChange={(e) => setGradColor2(e.target.value)}
                      className="w-12 h-12 rounded-xl border-0 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-sm font-bold uppercase text-slate-800 dark:text-slate-200">{gradColor2}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500">Direction / Angle</label>
                  <select
                    value={gradDirection}
                    onChange={(e) => setGradDirection(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="0deg">To Top (0deg)</option>
                    <option value="45deg">Diagonal (45deg)</option>
                    <option value="90deg">To Right (90deg)</option>
                    <option value="135deg">Bottom Right (135deg)</option>
                    <option value="180deg">To Bottom (180deg)</option>
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleRandomGradient}
                  className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Generate Random Gradient</span>
                </button>
              </div>

              {/* Preset Gradients */}
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
                  Curated Gradient Presets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {presetGradients.map((grad, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        // Extract hex stops or set preset
                        if (idx === 0) { setGradColor1('#667eea'); setGradColor2('#764ba2'); setGradDirection('135deg'); }
                        else if (idx === 1) { setGradColor1('#5ee7df'); setGradColor2('#b490ca'); setGradDirection('135deg'); }
                        else if (idx === 2) { setGradColor1('#f6d365'); setGradColor2('#fda085'); setGradDirection('135deg'); }
                        else if (idx === 3) { setGradColor1('#ffecd2'); setGradColor2('#fcb69f'); setGradDirection('135deg'); }
                        else if (idx === 4) { setGradColor1('#232526'); setGradColor2('#414345'); setGradDirection('135deg'); }
                        else { setGradColor1('#00ff87'); setGradColor2('#60efff'); setGradDirection('135deg'); }
                      }}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                    >
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {grad.name}
                      </span>
                      <div className="w-8 h-8 rounded-xl shadow-xs border border-white/20" style={{ background: grad.css }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ColorGenerator;