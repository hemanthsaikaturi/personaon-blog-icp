import React, { useState } from 'react';
import { ICP_LIST, ICP_DATA } from '../icpData';
import { RotateCcw, FileText, Zap, ArrowRight, CornerDownRight } from 'lucide-react';

const ENRICHED_CSS = `
  .flip-grid-premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 40px;
    margin-top: 40px;
    perspective: 1500px;
  }

  .flip-card-3d {
    position: relative;
    width: 100%;
    height: 480px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  }

  .flip-card-wrap:hover .flip-card-3d:not(.flipped) {
    transform: translateY(-8px) rotateX(2deg) rotateY(-2deg);
  }

  .flip-card-3d.flipped {
    transform: rotateY(180deg);
  }

  .flip-face-premium {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: var(--radius-2xl);
    padding: 32px;
    display: flex;
    flex-direction: column;
  }

  .face-front {
    background: #fdfdfd;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 12px 32px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.02);
  }

  .face-back {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    box-shadow: 0 24px 64px rgba(0,0,0,0.08);
    transform: rotateY(180deg);
  }

  .messy-note-line {
    height: 8px;
    background: #f1f5f9;
    border-radius: 4px;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
  }

  .messy-note-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    animation: messyShimmer 3s infinite;
  }
  
  @keyframes messyShimmer {
    100% { left: 200%; }
  }

  .flip-hint-anim {
    animation: bounceRight 1.5s infinite;
  }
  
  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }
`;

export default function BlogD() {
  const [flipped, setFlipped] = useState({});

  const toggle = key => setFlipped(p => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      <style>{ENRICHED_CSS}</style>
      <div className="section-header">
        <span className="section-header-tag">🔄 Approach D — Pain → Relief Flip Card</span>
        <h2>The moment the chaos became clarity.</h2>
        <p>Every card shows an ICP's raw, scattered notes from before PersonaOn. <strong style={{ color: 'var(--brand)' }}>Click to flip</strong> — and see what PersonaOn compiled instead.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '12px 20px', background: 'rgba(225, 29, 72, 0.04)', border: '1px solid rgba(225, 29, 72, 0.15)', borderRadius: 'var(--radius-lg)', width: 'fit-content' }}>
        <RotateCcw size={16} color="var(--brand)" className="spin-anim" style={{ animationDuration: '4s' }} />
        <span style={{ fontSize: 13, color: 'var(--brand)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Click any card to flip between Before and After PersonaOn</span>
      </div>

      <div className="flip-grid-premium">
        {ICP_LIST.map(icp => {
          const isFlipped = !!flipped[icp.key];
          return (
            <div
              key={icp.key}
              className="flip-card-wrap"
              onClick={() => toggle(icp.key)}
              style={{ perspective: 1200 }}
            >
              <div className={`flip-card-3d ${isFlipped ? 'flipped' : ''}`}>
                
                {/* FRONT: Chaos notes */}
                <div className="flip-face-premium face-front">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#94a3b8' }}>
                        {icp.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{icp.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{icp.title}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#ef4444', background: '#fef2f2', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Before
                    </div>
                  </div>

                  {/* Messy visualizer */}
                  <div style={{ padding: 20, background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
                      <FileText size={14} /> Messy Notes (Post-Call)
                    </div>
                    <div style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', fontSize: 14, color: '#475569', lineHeight: 1.6, opacity: 0.8, fontStyle: 'italic' }}>
                      {icp.chaosNotes}
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                      <div className="messy-note-line" style={{ width: '80%' }} />
                      <div className="messy-note-line" style={{ width: '60%' }} />
                      <div className="messy-note-line" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, fontSize: 12, fontWeight: 700, color: 'var(--brand)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span className="flip-hint-anim"><ArrowRight size={14}/></span> Click to transform
                  </div>
                </div>

                {/* BACK: PersonaOn brief */}
                <div className="flip-face-premium face-back" style={{ '--card-glow': `rgba(${icp.rgb}, 0.2)` }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-2xl)', boxShadow: `inset 0 0 40px var(--card-glow)`, pointerEvents: 'none' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `rgba(${icp.rgb},0.15)`, border: `1px solid rgba(${icp.rgb},0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: icp.color, boxShadow: `0 4px 12px rgba(${icp.rgb},0.2)` }}>
                        {icp.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{icp.meetingWith}</div>
                        <div style={{ fontSize: 12, color: icp.color, fontWeight: 600 }}>PersonaOn Live Brief</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Zap size={10} /> After
                    </div>
                  </div>

                  {/* Clean UI */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1 }}>
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Context</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{icp.personaonBrief.context}</div>
                    </div>
                    
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Last Left Off</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{icp.personaonBrief.lastLeftOff}</div>
                    </div>

                    <div style={{ background: `rgba(${icp.rgb},0.08)`, border: `1px solid rgba(${icp.rgb},0.2)`, borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: icp.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}><CornerDownRight size={12}/> Watch For</div>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 600 }}>{icp.personaonBrief.watchFor}</div>
                    </div>
                  </div>

                  {/* What the ICP is telling (Testimonial) */}
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginTop: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)', zIndex: 1 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(${icp.rgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: icp.color, flexShrink: 0 }}>
                      {icp.initials}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{icp.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{icp.title}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                        "{icp.benefit}"
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', zIndex: 1 }}>
                    <RotateCcw size={12}/> Click to flip back
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
