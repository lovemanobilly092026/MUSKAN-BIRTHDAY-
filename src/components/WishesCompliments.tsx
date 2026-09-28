import React, { useState } from 'react';
import { Heart, Sparkles, Send, MessageCircleHeart, Star, ThumbsUp } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { WishItem } from '../types';

export const WishesCompliments: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: '1',
      sender: 'Your Biggest Admirer',
      relation: 'With Endless Care',
      message:
        'Muskan, tumhari muskurahat me wo jadu hai jo kisi ka bhi bura din achha kar de. Allah tumhe hamesha aisi hi khush aur aabaad rakhe! Happy Birthday 🌸✨',
      date: 'Today',
      likes: 12,
    },
    {
      id: '2',
      sender: 'Bestie',
      relation: 'Forever Friend',
      message:
        'To the girl with the kindest heart! May all your crazy ambitions, big goals, and beautiful dreams come true this year. Love you lots! 💖🎂',
      date: 'Today',
      likes: 9,
    },
    {
      id: '3',
      sender: 'Well Wisher',
      relation: 'Pure Blessings',
      message:
        'Wishing Muskan an abundance of health, success, peace, and glittering joys. Tumhara har saal pichle se behtar ho!',
      date: 'Today',
      likes: 7,
    },
  ]);

  const [activeComplimentIndex, setActiveComplimentIndex] = useState(0);
  const compliments = [
    {
      title: 'The Contagious Smile',
      text: 'Muskan’s name literally translates to "Smile", and true to her name, she brightens every room effortlessly!',
      icon: '✨',
    },
    {
      title: 'Gentle & Pure Heart',
      text: 'Her empathy, thoughtfulness, and genuine warmth make everyone around her feel valued and cherished.',
      icon: '💖',
    },
    {
      title: 'Grace & Elegance',
      text: 'She carries herself with effortless poise, captivating beauty, and an unmatched sense of kindness.',
      icon: '🌸',
    },
    {
      title: 'An Unstoppable Dreamer',
      text: 'Passionate, ambitious, and strong-willed. She never gives up on the things that truly matter.',
      icon: '🌟',
    },
  ];

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [msg, setMsg] = useState('');

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    const newWish: WishItem = {
      id: Date.now().toString(),
      sender: name.trim(),
      relation: relation.trim() || 'Friend',
      message: msg.trim(),
      date: 'Just now',
      likes: 1,
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setRelation('');
    setMsg('');
    audioManager.playFanfare();
  };

  const handleLikeWish = (id: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
    audioManager.playSparkle();
  };

  return (
    <section id="compliments-section" className="py-16 px-4 max-w-6xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-pink-600 mb-2">
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
          <span>Heartfelt Tribute</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Why Muskan Is Extraordinary
        </h2>
        <p className="text-sm text-slate-500">
          A carousel of sweet truths and a guestbook of loving wishes from the people who adore her.
        </p>
      </div>

      {/* Interactive Compliment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {compliments.map((comp, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveComplimentIndex(idx);
              audioManager.playSparkle();
            }}
            className={`p-5 rounded-2xl border transition-all cursor-pointer select-none text-left relative overflow-hidden ${
              activeComplimentIndex === idx
                ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-400 shadow-md ring-2 ring-pink-300'
                : 'bg-white/80 border-slate-200/80 hover:border-pink-300 shadow-xs'
            }`}
          >
            <div className="text-2xl mb-2">{comp.icon}</div>
            <h4 className="font-serif-display font-bold text-slate-800 text-base mb-1.5">
              {comp.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-body">
              {comp.text}
            </p>
          </div>
        ))}
      </div>

      {/* Guestbook Wishes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wish Form */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-200 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircleHeart className="w-5 h-5 text-pink-600" />
            <h3 className="font-serif-display font-bold text-slate-800 text-lg">
              Send a Birthday Wish
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-5 font-body">
            Leave your personalized blessing or secret note for Muskan to read on her birthday!
          </p>

          <form onSubmit={handleAddWish} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mano Billy, Ayesha, Zain"
                required
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Relation / Title
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Best Friend, Secret Admirer, Sister"
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Birthday Message
              </label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Write a sweet and warm prayer for Muskan..."
                required
                rows={3}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Birthday Wish 💌</span>
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="font-serif-display font-semibold text-slate-800 text-base">
              Birthday Love Wall ({wishes.length})
            </span>
            <span className="text-xs text-pink-600 font-medium">All wishes are celebrated ✨</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white/85 border border-pink-100 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{item.sender}</h5>
                    <div className="flex items-center gap-1.5 text-[11px] text-pink-600">
                      <span>{item.relation}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLikeWish(item.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500" />
                    <span className="tabular-nums font-semibold">{item.likes}</span>
                  </button>
                </div>

                <p className="text-slate-600 text-xs font-body leading-relaxed">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
