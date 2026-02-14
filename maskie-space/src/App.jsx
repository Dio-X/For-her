import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wind, Star, Smile, X, Gift, Sparkles } from 'lucide-react'; // Added Gift & Sparkles
import confetti from 'canvas-confetti';

// --- DATA: COMFORT MESSAGES ---
const comfortMessages = [
  "You are doing better than you think.",
  "I am so incredibly proud of you.",
  "Take a deep breath. I'm with you.",
  "You are my favorite person in the universe.",
  "Sending you a massive virtual hug right now.",
  "Everything is going to be okay.",
  "You look beautiful today (I just know it)."
];

// --- DATA: CUTE GIFS ---
const cuteGifs = [
  { url: "/1.gif", caption: "Sending a bear hug!" },
  { url: "/2.gif", caption: "Do a little happy dance." },
  { url: "/3.gif", caption: "Relax... just like this." },
  { url: "/4.gif", caption: "You being cute (caught on camera)." },
  { url: "/5.gif", caption: "Us. Always." },
];

const cuteReasons = [
  { id: 1, text: "The way you smile at me." },
  { id: 2, text: "KUCHUPUCHU <3." },
  { id: 3, text: "How strong you are, even when it's hard." },
  { id: 4, text: "Just existing. That's enough." },
  { id: 5, text: "SUKKU IS CUTE! (Fact)" } 
];

export default function App() {
  const [view, setView] = useState('home');
  const [message, setMessage] = useState(null);
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // State for GIFs

  const handleCuteClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffccd5', '#ffb3c1', '#ff8fa3']
    });
    setMessage("Confirmed: Sukku is officially the cutest.");
  };

  const showRandomComfort = () => {
    const random = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];
    setMessage(random);
  };

  const nextGif = () => {
    setCurrentGifIndex((prev) => (prev + 1) % cuteGifs.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      
      {/* Background Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* MAIN CONTENT */}
      <div className="z-10 w-full max-w-md">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl text-white drop-shadow-md" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Kitty's Space
          </h1>
          <p className="text-white/80 text-lg mt-2 font-light tracking-wide">
            A quiet corner, just for you.
          </p>
        </motion.div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-5">
          <Card 
            icon={<Wind className="w-7 h-7 text-white" />}
            label="Breathe"
            onClick={() => setView('breathe')}
            color="bg-blue-400/30"
            delay={0.1}
          />
          <Card 
            icon={<Heart className="w-7 h-7 text-white" />}
            label="Need Love"
            onClick={showRandomComfort}
            color="bg-rose-400/30"
            delay={0.2}
          />
          <Card 
            icon={<Star className="w-7 h-7 text-white" />}
            label="Why You?"
            onClick={() => setView('reasons')}
            color="bg-yellow-400/30"
            delay={0.3}
          />
          
          {/* NEW GIF CARD */}
          <Card 
            icon={<Gift className="w-7 h-7 text-white" />}
            label="Instant Smile"
            onClick={() => setView('gifs')}
            color="bg-green-400/30"
            delay={0.4}
          />

          {/* CUTE CHECK (Full Width) */}
          <div className="col-span-2">
            <Card 
              icon={<Sparkles className="w-7 h-7 text-white" />}
              label="Cute Check (Do Not Click)"
              onClick={handleCuteClick}
              color="bg-purple-400/30"
              delay={0.5}
            />
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Breathing Modal */}
      <AnimatePresence>
        {view === 'breathe' && (
          <Modal onClose={() => setView('home')}>
             <BreathingExercise />
          </Modal>
        )}
      </AnimatePresence>

      {/* 2. Reasons List Modal */}
      <AnimatePresence>
        {view === 'reasons' && (
          <Modal onClose={() => setView('home')}>
            <h2 className="text-2xl font-bold mb-6 text-rose-500" style={{ fontFamily: 'Dancing Script' }}>Reasons I Love You</h2>
            <div className="w-full space-y-3">
              {cuteReasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-rose-50/50 rounded-xl text-gray-700 font-medium border border-rose-100/50"
                >
                  {reason.text}
                </motion.div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* 3. NEW: GIF VAULT MODAL */}
      <AnimatePresence>
        {view === 'gifs' && (
          <Modal onClose={() => setView('home')}>
            <h2 className="text-2xl font-bold mb-4 text-green-500" style={{ fontFamily: 'Dancing Script' }}>Instant Serotonin</h2>
            
            <motion.div 
              key={currentGifIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-2 rounded-2xl shadow-sm mb-6"
            >
                <img 
                  src={cuteGifs[currentGifIndex].url} 
                  alt="Cute Gif" 
                  className="w-64 h-64 object-cover rounded-xl"
                />
            </motion.div>
            
            <p className="text-gray-500 font-medium mb-8">"{cuteGifs[currentGifIndex].caption}"</p>

            <button 
                onClick={nextGif}
                className="px-6 py-3 bg-green-400 text-white rounded-full font-bold shadow-lg hover:bg-green-500 transition active:scale-95"
            >
                See Another One! ↻
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {/* 4. Popup Message Overlay */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMessage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm text-center border border-white/50"
            >
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4 fill-rose-500 animate-bounce" />
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">{message}</p>
              <p className="text-xs text-gray-400 mt-8 uppercase tracking-widest font-bold cursor-pointer">Tap to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Card({ icon, label, onClick, color, delay }) {
  return (
    <motion.button 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`glass-card p-4 flex flex-col items-center gap-2 hover:bg-white/30 transition-all h-32 justify-center ${color} w-full`}
    >
      <div className="p-3 bg-white/20 rounded-full">{icon}</div>
      <span className="font-semibold text-white tracking-wide text-sm">{label}</span>
    </motion.button>
  );
}

function Modal({ children, onClose }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-white/60 backdrop-blur-lg flex flex-col items-center justify-center p-6"
    >
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-3 bg-white rounded-full shadow-lg text-gray-500 hover:text-gray-800 transition"
      >
        <X className="w-6 h-6" />
      </button>
      {children}
    </motion.div>
  );
}

function BreathingExercise() {
  const [text, setText] = useState("Inhale");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        if (prev === "Inhale") return "Hold";
        if (prev === "Hold") return "Exhale";
        return "Inhale";
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-500 mb-10 tracking-widest uppercase">{text}</h2>
      
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.1, 0.5],
            borderWidth: ["2px", "1px", "2px"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
          className="absolute w-64 h-64 rounded-full border-4 border-blue-400"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
          className="absolute w-48 h-48 bg-blue-100/50 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full shadow-2xl flex items-center justify-center"
        >
          <Wind className="text-white w-12 h-12" />
        </motion.div>
      </div>
      
      <p className="mt-12 text-gray-500 font-medium">Follow the rhythm</p>
    </div>
  );
}