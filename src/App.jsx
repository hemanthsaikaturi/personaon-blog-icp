import React, { useState } from 'react';
import BlogA from './components/BlogA';
import BlogB from './components/BlogB';
import BlogC from './components/BlogC';
import BlogD from './components/BlogD';
import BlogE from './components/BlogE';
import BlogF from './components/BlogF';

const APPROACHES = [
  { id: 'a', label: 'Editorial Grid', sublabel: 'Story Blog Cards' },
  { id: 'b', label: 'Live Meeting Room', sublabel: 'PersonaOn in Action' },
  { id: 'c', label: 'Chat Confession', sublabel: 'Slack Thread Format' },
  { id: 'd', label: 'Pain → Relief Flip', sublabel: 'Before / After Contrast' },
  { id: 'e', label: 'Brief Generator', sublabel: 'Terminal / Run Brief' },
  { id: 'f', label: 'Day Timeline', sublabel: 'Calendar View' },
];

const COMPONENTS = { a: BlogA, b: BlogB, c: BlogC, d: BlogD, e: BlogE, f: BlogF };

export default function App() {
  const [active, setActive] = useState('a');
  const ActiveComponent = COMPONENTS[active];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', position: 'relative' }}>

      {/* Ambient orbs — rose/fuchsia theme */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#f43f5e', filter: 'blur(120px)', left: '-10%', top: '-5%', opacity: 0.06 }} />
        <div style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', background: '#c026d3', filter: 'blur(120px)', right: '-8%', top: '30%', opacity: 0.06 }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#9333ea', filter: 'blur(100px)', left: '35%', bottom: '0%', opacity: 0.05 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ─── APPROACH SWITCHER ─────────────────── */}
        <div className="switcher-bar">
          <div className="switcher-inner">
            <div className="switcher-label">
              <span className="switcher-dot" />
              ICP Blog Section · Approach Variants
            </div>
            <div className="switcher-tabs">
              {APPROACHES.map(ap => (
                <button
                  key={ap.id}
                  className={`switcher-tab${active === ap.id ? ' switcher-tab-active' : ''}`}
                  onClick={() => setActive(ap.id)}
                >
                  <span className="switcher-tab-id">{ap.id.toUpperCase()}</span>
                  <span className="switcher-tab-label">{ap.label}</span>
                  <span className="switcher-tab-sub">{ap.sublabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── ACTIVE SECTION ────────────────────── */}
        <div className="blog-section-root" key={active}>
          <ActiveComponent />
        </div>
      </div>

    </div>
  );
}
