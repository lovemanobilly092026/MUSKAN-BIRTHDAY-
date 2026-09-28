import React, { useState } from 'react';
import { Camera, Heart, Plus, Sparkles, X } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface PolaroidItem {
  id: string;
  imgSrc: string;
  title: string;
  note: string;
  date: string;
  rotation: string;
}

export const MemoriesWall: React.FC = () => {
  const [polaroids, setPolaroids] = useState<PolaroidItem[]>([
    {
      id: '1',
      imgSrc: '/src/assets/images/birthday_floral_cake_1790583915455.jpg',
      title: 'Sweet Celebrations',
      note: 'A soul as sweet as sugar and frosting. Happy Birthday Muskan!',
      date: 'Special Edition',
      rotation: '-rotate-2',
    },
    {
      id: '2',
      imgSrc: '/src/assets/images/birthday_gift_sparkles_1790583929135.jpg',
      title: 'Wrapped With Love',
      note: 'Every box packed with warm prayers and infinite blessings.',
      date: 'Gifted Moments',
      rotation: 'rotate-1',
    },
    {
      id: '3',
      imgSrc: '/src/assets/images/muskan_celebration_polaroid_1790583942413.jpg',
      title: 'Sparkles & Smiles',
      note: 'That iconic laugh that lights up every single evening.',
      date: 'Forever Glowing',
      rotation: '-rotate-1',
    },
  ]);

  const [activeModalPolaroid, setActiveModalPolaroid] = useState<PolaroidItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newDate, setNewDate] = useState('Today');

  const handleAddPolaroid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNote.trim()) return;

    const newItem: PolaroidItem = {
      id: Date.now().toString(),
      imgSrc: '/src/assets/images/muskan_celebration_polaroid_1790583942413.jpg',
      title: newTitle.trim(),
      note: newNote.trim(),
      date: newDate.trim() || 'Today',
      rotation: (Math.random() > 0.5 ? 'rotate-2' : '-rotate-2'),
    };

    setPolaroids([newItem, ...polaroids]);
    setNewTitle('');
    setNewNote('');
    setShowAddForm(false);
    audioManager.playSparkle();
  };

  return (
    <section id="memories-section" className="py-16 px-4 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <Camera className="w-3.5 h-3.5 text-purple-600" />
          <span>Polaroid Scrapbook</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Moments That Shine Like Muskan
        </h2>
        <p className="text-sm text-slate-500">
          A collection of sweet memories, delicate aesthetics, and heartfelt polaroid snapshots
          celebrating who you are.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
        {polaroids.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveModalPolaroid(item);
              audioManager.playSparkle();
            }}
            className={`group bg-white p-4 pb-6 rounded-lg shadow-md hover:shadow-xl border border-slate-200/80 transition-all duration-300 transform ${item.rotation} hover:rotate-0 hover:scale-[1.03] cursor-pointer relative`}
          >
            {/* Washi tape sticker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-200/80 backdrop-blur-xs transform -rotate-1 rounded-xs shadow-xs pointer-events-none" />

            {/* Photo frame */}
            <div className="relative aspect-4/3 w-full bg-slate-100 rounded overflow-hidden mb-4 shadow-inner">
              <img
                src={item.imgSrc}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback container
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className =
                      'relative aspect-4/3 w-full bg-gradient-to-br from-pink-200 via-purple-100 to-amber-100 flex items-center justify-center p-4 text-center rounded';
                    parent.innerHTML = `<span class="font-serif-display font-semibold text-pink-700 text-sm">${item.title}</span>`;
                  }
                }}
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
              </div>
            </div>

            {/* Handwritten Polaroid Notes */}
            <div className="px-1 text-center">
              <h4 className="font-handwriting text-xl text-slate-800 font-bold mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 font-body line-clamp-2 mb-2">
                {item.note}
              </p>
              <div className="text-[11px] text-pink-500 font-medium">
                {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Button */}
      <div className="flex justify-center">
        {!showAddForm ? (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-pink-300 bg-white/80 hover:bg-pink-50 text-pink-700 font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pin a New Memory for Muskan</span>
          </button>
        ) : (
          <form
            onSubmit={handleAddPolaroid}
            className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-pink-200 shadow-lg max-w-md w-full transition-all animate-fade-in"
          >
            <div className="flex items-center justify-between mb-3 border-b border-pink-100 pb-2">
              <span className="font-serif-display font-semibold text-slate-800 text-sm">
                Add Polaroid Note
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Beautiful Smile, Joyful Evening"
                  required
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Heartfelt Note
                </label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a sweet birthday note or special memory..."
                  required
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Tag / Date
                </label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Birthday Special, 2026"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-sm"
              >
                Pin Polaroid 📌
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Enlarged Polaroid Modal */}
      {activeModalPolaroid && (
        <div
          onClick={() => setActiveModalPolaroid(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 pb-8 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 relative animate-scale-up"
          >
            <button
              type="button"
              onClick={() => setActiveModalPolaroid(null)}
              className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-4/3 w-full bg-slate-100 rounded-xl overflow-hidden mb-5 shadow-inner">
              <img
                src={activeModalPolaroid.imgSrc}
                alt={activeModalPolaroid.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-handwriting text-3xl font-bold text-pink-700">
                {activeModalPolaroid.title}
              </h3>
              <p className="text-sm text-slate-600 font-body px-2">
                {activeModalPolaroid.note}
              </p>
              <div className="text-xs text-pink-500 font-semibold pt-2">
                {activeModalPolaroid.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
