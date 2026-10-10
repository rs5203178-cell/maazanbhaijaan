import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUp, Camera, Check, ChevronLeft, ChevronRight,
  Crown, Gift, Heart, Menu, Music2, Pause, Play, Sparkles, Star, Volume2, X
} from 'lucide-react';

const birthday = new Date('2026-10-16T00:00:00');
const memories = [
  { title: 'The good old days', category: 'Childhood', image: '/images/memory-1.jpg', note: 'Our childhood adventures, forever in my heart.' },
  { title: 'Little superstar', category: 'Childhood', image: '/images/memory-3.jpg', note: 'A little legend even back then.' },
  { title: 'My Brother, My Hero ❤️', category: 'Family', image: '/images/memory-2.jpg', note: 'No matter how much we grow, we are always a team.' },
  { title: 'More memories to make', category: 'Travel', image: '/images/memory-4.jpg', note: 'Here is to all the adventures still waiting for us.' },
];
const quotes = [
  'A brother like you makes life more beautiful, meaningful, and fun.',
  'The best kind of hero is the one who never asks to be called one.',
  'No matter how much life changes, you will always have me in your corner.',
  'Some people are gifts from life. You are one of my biggest blessings.',
];

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, birthday.getTime() - now);
  const parts = [
    ['Days', Math.floor(diff / 86400000)],
    ['Hours', Math.floor((diff % 86400000) / 3600000)],
    ['Minutes', Math.floor((diff % 3600000) / 60000)],
    ['Seconds', Math.floor((diff % 60000) / 1000)],
  ];
  return <div className="countdown-grid">{parts.map(([label, value]) => <div className="count-card" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [blown, setBlown] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); setMusicOn(false); return; }
    try { await audio.play(); setMusicOn(true); }
    catch { setMusicOn(false); setToast('Add Nach Meri Jaan MP3 to public/music/nach-meri-jaan.mp3 first'); }
  }
  const [letterOpen, setLetterOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [wishText, setWishText] = useState('');
  const [toast, setToast] = useState('');
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  const shownMemories = useMemo(() => memories.filter(m => filter === 'All' || m.category === filter), [filter]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const nav = [['Home', '#home'], ['Memories', '#memories'], ['Letter', '#letter'], ['Wishes', '#wishes'], ['Countdown', '#countdown']];
  const goTo = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const addPhotos = (e) => {
    const added = Array.from(e.target.files || []).map((file) => ({ url: URL.createObjectURL(file), title: file.name.replace(/\.[^/.]+$/, '') }));
    setPhotos(old => [...old, ...added]);
    if (added.length) setToast(`${added.length} photo${added.length > 1 ? 's' : ''} added to your gallery ✨`);
    e.target.value = '';
  };
  const addWish = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setWishes(old => [...old, wishText.trim()]);
    setWishText('');
    setToast('Your wish has been added ❤️');
  };

  return (
    <main>
      <audio ref={audioRef} src="/music/nach-meri-jaan.mp3" loop preload="none" onEnded={() => setMusicOn(false)} />
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>Maazan <Crown size={17} /></a>
        <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="nav-music" onClick={toggleMusic} aria-label="Toggle music"><Music2 size={17} /></button>
        </nav>
      </header>

      <section className="hero section" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="floating-spark spark-one">✦</div><div className="floating-spark spark-two">✧</div><div className="floating-spark spark-three">✦</div>
        <div className="hero-copy reveal">
          <div className="eyebrow"><Crown size={15} /> A little surprise, made with love</div>
          <p className="script hero-script">Happy Birthday</p>
          <h1>MAAZAN <span>BHAIJAAN</span></h1>
          <div className="gold-rule"><i /></div>
          <p className="hero-tagline">A brother. A friend. A legend.</p>
          <p className="hero-description">Not just a year older, but a year more amazing.<br className="desktop-only" /> Thank you for always being there.</p>
          <div className="hero-actions">
            <button className="button button-gold" onClick={() => goTo('#memories')}>Start the journey <ArrowRight size={16} /></button>
            <button className="button button-glass" onClick={toggleMusic}>{musicOn ? <Pause size={15} /> : <Play size={15} />} {musicOn ? 'Pause Music' : 'Play Music'}</button>
          </div>
          <span className="scroll-hint"><ArrowDown size={15} /> Scroll to explore</span>
        </div>
        <div className="hero-bottom"><span>16 OCTOBER 2026</span><span>MADE ESPECIALLY FOR YOU <Heart size={12} fill="currentColor" /></span></div>
      </section>

      <section className="countdown section" id="countdown">
        <div className="section-bg countdown-bg" />
        <div className="section-heading">
          <span className="eyebrow">The big day is almost here</span>
          <h2>Counting down to <em>your day</em></h2>
          <p>Every second brings us closer to celebrating you.</p>
        </div>
        <Countdown />
        <p className="countdown-note">“A special day for a very special person <span>♥</span>”</p>
      </section>

      <section className="brother section" id="about">
        <div className="brother-photo photo-frame"><img src="/images/brother.jpg" alt="Add a favourite portrait of Maazan Bhaijaan" onError={e => { e.currentTarget.style.opacity = 0; }} /><div className="photo-placeholder"><Camera size={30} /><span>Your favourite photo of<br />Maazan Bhaijaan goes here</span></div><div className="photo-caption">Legend <span>♥</span></div></div>
        <div className="brother-copy">
          <span className="crown-mark"><Crown /></span><span className="eyebrow">A note about my favourite human</span>
          <h2>About my<br /><em>brother</em></h2>
          <p className="letter-intro">Maazan Bhaijaan,</p>
          <p>You are not just my brother, you are my biggest support, my guide, my motivation, and my partner in all the crazy moments. You make the hard days easier and the happy days unforgettable.</p>
          <p>Thank you for believing in me, standing by me, and being exactly who you are. Today is your day — and you deserve all the love in the world.</p>
          <div className="trait-grid"><div><Sparkles /><span>Inspiration</span></div><div><Heart /><span>Support</span></div><div><Star /><span>Best friend</span></div><div><span className="infinity">∞</span><span>Always there</span></div></div>
        </div>
      </section>

      <section className="memories section" id="memories">
        <div className="section-heading">
          <span className="eyebrow">Little moments, forever memories</span>
          <h2>Our beautiful <em>memories</em></h2>
          <p>Some moments make life special. These are just the beginning. ❤️</p>
        </div>
        <div className="filter-row">{['All', 'Childhood', 'Fun', 'Travel', 'Family', 'Friends'].map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'filter active' : 'filter'}>{f}</button>)}</div>
        <div className="memory-grid">
          {shownMemories.map((memory, i) => <button className={`memory-card memory-${i % 3}`} key={memory.title} onClick={() => setLightbox(memory)}><img src={memory.image} alt={memory.title} onError={e => { e.currentTarget.style.display = 'none'; }} /><div className="memory-placeholder"><Camera /><span>Add your photo</span></div><div className="memory-overlay"><span>{memory.category}</span><h3>{memory.title}</h3><p>{memory.note}</p></div><span className="memory-open">↗</span></button>)}
          {photos.map((photo, i) => <button className="memory-card uploaded-memory" key={photo.url} onClick={() => setLightbox({ ...photo, category: 'Your photos', note: 'A memory worth keeping.' })}><img src={photo.url} alt={photo.title} /><div className="memory-overlay"><span>Your photo</span><h3>{photo.title}</h3><p>A memory worth keeping.</p></div></button>)}
          <label className="add-photo-card"><input type="file" accept="image/*" multiple onChange={addPhotos} /><span className="add-icon">+</span><strong>Add your photos</strong><small>Choose photos from your device</small><span className="upload-note"><Camera size={14} /> Private to this page session</span></label>
        </div>
        <p className="gallery-tip"><Camera size={15} /> Tip: add photos here to preview them. For a permanent website, place your photos in <code>public/images/</code> and update the image paths in <code>src/App.jsx</code>.</p>
      </section>

      <section className="cake-section section" id="surprise">
        <div className="cake-bg" />
        <div className="cake-content">
          <span className="eyebrow">Your special moment</span>
          <p className="script cake-script">Make a wish</p>
          <h2>Bhaijaan <span>♥</span></h2>
          <button className={`cake-button ${blown ? 'is-blown' : ''}`} onClick={() => { setBlown(!blown); setToast(blown ? 'Candles are back — make another wish!' : 'Wish made! May your year be full of magic ✨'); }} aria-label="Blow out the birthday candles">
            <div className="cake-candles">{Array.from({ length: 9 }, (_, i) => <span className={blown ? 'candle out' : 'candle'} key={i}><i /></span>)}</div>
            <div className="cake-top"><span className="berry">✦</span><span className="berry">✧</span><span className="berry">✦</span></div>
            <div className="cake-layer layer-top"><span>Happy<br />Birthday</span></div><div className="cake-layer layer-bottom" />
            <div className="cake-plate" />
          </button>
          <p className="cake-instruction">{blown ? '✨ Wish sent to the universe. Tap to relight!' : 'Tap the cake to blow out the candles ✨'}</p>
          <button className="button button-gold" onClick={() => setLetterOpen(true)}>Open your surprise <Gift size={16} /></button>
        </div>
      </section>

      <section className="letter-section section" id="letter">
        <div className="letter-decor decor-left">✦</div><div className="letter-decor decor-right">♥</div>
        <div className="letter-paper">
          <span className="eyebrow">From my heart to yours</span>
          <h2>A letter <em>for you</em></h2>
          <div className="letter-divider">❦</div>
          <p>Dear Maazan Bhaijaan,</p>
          <p>On your special day, I just want to say how grateful I am to have you in my life. You are my inspiration, my biggest support, and the person who always believes in me.</p>
          <p>You make every moment brighter with your presence, your advice, your laughter, and your unconditional love. No matter where life takes us, I hope you always know that I am cheering for you.</p>
          <p>May this year bring you endless happiness, good health, success, peace, and all the things your heart dreams of. Keep smiling, keep shining, and keep being the amazing person you are.</p>
          <p className="letter-signoff">Happy Birthday, Maazan Bhaijaan <span>❤️</span></p>
          <p className="signature">— Always your little brother</p>
          <button className="text-button" onClick={() => setLetterOpen(true)}>Read the full surprise <ArrowRight size={15} /></button>
        </div>
      </section>

      <section className="wishes section" id="wishes">
        <div className="section-heading">
          <span className="eyebrow">Only the best for you</span>
          <h2>Birthday <em>wishes</em></h2>
          <p>A few things I wish for you, today and always.</p>
        </div>
        <div className="wish-cards">
          {[['☀','Stay happy','Always'],['♡','Good health','& strength'],['♜','More success','in life'],['✈','See the world','Your way'],['✦','Keep inspiring','everyone'],['∞','All your dreams','come true']].map(([icon, title, sub]) => <div className="wish-card" key={title}><span>{icon}</span><strong>{title}</strong><small>{sub}</small></div>)}
        </div>
        <form className="wish-form" onSubmit={addWish}>
          <label htmlFor="wish">Add one more wish for Bhaijaan</label>
          <div><input id="wish" value={wishText} onChange={e => setWishText(e.target.value)} placeholder="May your year be full of..." maxLength={140} /><button className="button button-gold" type="submit">Add wish <Heart size={15} /></button></div>
        </form>
        {wishes.length > 0 && <div className="user-wishes">{wishes.map((wish, i) => <p key={`${wish}-${i}`}><Heart size={14} fill="currentColor" /> {wish}</p>)}</div>}
      </section>

      <section className="quote-section section">
        <span className="eyebrow">A few words that define you</span>
        <div className="quote-box"><button aria-label="Previous quote" onClick={() => setQuoteIndex((quoteIndex + quotes.length - 1) % quotes.length)}><ChevronLeft /></button><blockquote>“{quotes[quoteIndex]}”</blockquote><button aria-label="Next quote" onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)}><ChevronRight /></button></div>
        <div className="quote-dots">{quotes.map((q, i) => <button aria-label={`Show quote ${i + 1}`} key={q} onClick={() => setQuoteIndex(i)} className={i === quoteIndex ? 'dot selected' : 'dot'} />)}</div>
      </section>

      <footer className="footer section">
        <div className="footer-image" />
        <div className="footer-content"><Crown className="footer-crown" /><p className="script">Happy Birthday</p><h2>Maazan Bhaijaan</h2><p>Here's to more adventures, more laughter, more success<br className="desktop-only" /> and many more memories together. <Heart size={13} fill="currentColor" /></p><button className="button button-gold" onClick={() => goTo('#home')}>Back to top <ArrowUp size={15} /></button><span className="footer-signature">Made with love, just for you ✦</span></div>
      </footer>

      {letterOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={() => setLetterOpen(false)}><div className="surprise-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" aria-label="Close surprise" onClick={() => setLetterOpen(false)}><X /></button><span className="modal-spark">✦</span><Crown size={28} /><p className="script">One more thing...</p><h2 id="modal-title">You mean more than words can say.</h2><p>Thank you for being my brother, my guide, and one of my greatest blessings. Whatever the future brings, I hope you always feel proud of the life you are building — and know that I will always be in your corner.</p><p className="modal-love">Happy Birthday, Maazan Bhaijaan ❤️</p><button className="button button-gold" onClick={() => setLetterOpen(false)}>Keep this moment <Heart size={15} /></button></div></div>}

      {lightbox && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Memory details" onClick={() => setLightbox(null)}><div className="photo-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" aria-label="Close photo" onClick={() => setLightbox(null)}><X /></button>{lightbox.url ? <img src={lightbox.url} alt={lightbox.title} /> : <img src={lightbox.image} alt={lightbox.title} onError={e => { e.currentTarget.style.display = 'none'; }} />}<span className="eyebrow">{lightbox.category}</span><h2>{lightbox.title}</h2><p>{lightbox.note}</p></div></div>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
      <div className="audio-note" aria-live="polite"><Volume2 size={13} /> {musicOn ? 'Music option selected' : 'A little love in every detail'}</div>
    </main>
  );
}

export default App;
