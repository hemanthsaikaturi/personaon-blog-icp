import React, { useState, useEffect, useRef } from 'react';
import { ICP_LIST, ICP_DATA } from '../icpData';
import { Zap, Mic, MicOff, Video, VideoOff, PhoneOff, Activity, Shield, MoreHorizontal, LayoutGrid } from 'lucide-react';

const ENRICHED_CSS = `
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(12px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes audioJump {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }
  
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  .audio-bar {
    width: 3px;
    border-radius: 2px;
    background: currentColor;
    animation: audioJump 0.8s ease-in-out infinite;
  }
  
  .stagger-1 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
  .stagger-2 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
  .stagger-3 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
  .stagger-4 { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }
  
  .glass-panel-enhanced {
    background: var(--bg-card);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid var(--border-subtle);
    box-shadow: 0 24px 64px rgba(0,0,0,0.06);
    border-radius: var(--radius-xl);
  }
  
  .meeting-room-premium {
    border-radius: var(--radius-2xl);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 40px 80px rgba(0,0,0,0.1), 0 0 0 1px var(--border-mid);
    background: #0f172a; /* Slate 900 for video contrast even in light mode */
    position: relative;
  }
  
  .video-ambient-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%);
  }

  .msg-bubble-animated {
    animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .ai-scan-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(225, 29, 72, 0.1), transparent);
    animation: scanline 3s linear infinite;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const AudioVisualizer = ({ color }) => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 16, color }}>
    <div className="audio-bar" style={{ animationDelay: '0.1s' }} />
    <div className="audio-bar" style={{ animationDelay: '0.3s' }} />
    <div className="audio-bar" style={{ animationDelay: '0.05s' }} />
    <div className="audio-bar" style={{ animationDelay: '0.4s' }} />
  </div>
);

export default function BlogB() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [speaker, setSpeaker] = useState('other'); // 'icp' or 'other'
  const [timer, setTimer] = useState(847);
  const [msgIdx, setMsgIdx] = useState(0);
  const [briefKey, setBriefKey] = useState(0); // Force re-render of animations

  const icp = ICP_DATA[activeIcp];

  // Rotate speaking indicator with realistic random intervals
  useEffect(() => {
    let timeout;
    const rotate = () => {
      setSpeaker(p => (p === 'icp' ? 'other' : 'icp'));
      timeout = setTimeout(rotate, Math.random() * 3000 + 1500);
    };
    timeout = setTimeout(rotate, 2000);
    return () => clearTimeout(timeout);
  }, [activeIcp]);

  // Timer
  useEffect(() => {
    const t = setInterval(() => setTimer(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Advance messages
  useEffect(() => {
    setMsgIdx(0);
    setBriefKey(k => k + 1); // Reset animations
    const msgs = icp.icpSays;
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i < msgs.length) setMsgIdx(i);
      else clearInterval(t);
    }, 4000);
    return () => clearInterval(t);
  }, [activeIcp]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const OTHER_NAMES = { founder: 'Evelyn Vance', investor: 'Liam K.', recruiter: 'Dan K.', operator: 'VP Engineering' };
  const OTHER_INITS = { founder: 'EV', investor: 'LK', recruiter: 'DK', operator: 'VP' };
  const OTHER_BG = { founder: '#0f172a', investor: '#1e1b4b', recruiter: '#064e3b', operator: '#451a03' };
  const OTHER_COLORS = { founder: '#38bdf8', investor: '#a78bfa', recruiter: '#34d399', operator: '#fbbf24' };

  return (
    <div>
      <style>{ENRICHED_CSS}</style>
      
      <div className="section-header">
        <span className="section-header-tag">📹 Approach B — Live Meeting Room</span>
        <h2>PersonaOn, working live<br />while the call is happening.</h2>
        <p>Each ICP is mid-meeting. The sidebar shows exactly what PersonaOn surfaces in real-time — enriched with active sentiment analysis and instant recall.</p>
      </div>

      {/* Premium ICP selector */}
      <div className="icp-filter">
        {ICP_LIST.map(i => (
          <button
            key={i.key}
            className={`icp-pill${activeIcp === i.key ? ' active' : ''}`}
            style={{ 
              '--pill-color': i.color, 
              '--pill-rgb': i.rgb,
              boxShadow: activeIcp === i.key ? `0 8px 24px rgba(${i.rgb}, 0.2)` : 'none',
              transform: activeIcp === i.key ? 'translateY(-2px)' : 'none'
            }}
            onClick={() => { setActiveIcp(i.key); setTimer(Math.floor(Math.random() * 1200 + 200)); }}
          >
            <span className="icp-pill-dot" style={{ background: i.color, boxShadow: `0 0 10px ${i.color}` }} />
            {i.name}
            <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 500 }}>({i.title})</span>
          </button>
        ))}
      </div>

      <div className="meeting-room-wrap">
        {/* LEFT: Video call + story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="meeting-room-premium">
            <div className="video-ambient-glow" />
            
            {/* Top bar (macOS style) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2))', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Shield size={14} color="#10b981" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>{icp.meetingWith}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <LayoutGrid size={14} color="#94a3b8" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e2e8f0', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: 6 }}>{fmt(timer)}</span>
              </div>
            </div>

            {/* Video tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, zIndex: 1 }}>
              {/* ICP tile */}
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', boxShadow: speaker === 'icp' ? `0 0 0 2px ${icp.color}, 0 0 30px rgba(${icp.rgb}, 0.2)` : 'none', transition: 'all 0.3s ease' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 900, opacity: 0.05, color: icp.color }}>{icp.initials}</div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, background: `rgba(${icp.rgb},0.2)`, color: icp.color, border: `1px solid rgba(${icp.rgb},0.4)`, backdropFilter: 'blur(10px)' }}>
                  {icp.initials}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 64, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{icp.name} (You)</span>
                  {speaker === 'icp' ? (
                    <AudioVisualizer color={icp.color} />
                  ) : (
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Muted</span>
                  )}
                </div>
              </div>

              {/* Other person tile */}
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: OTHER_BG[activeIcp], border: '1px solid rgba(255,255,255,0.1)', boxShadow: speaker === 'other' ? `0 0 0 2px ${OTHER_COLORS[activeIcp]}, 0 0 30px ${OTHER_COLORS[activeIcp]}33` : 'none', transition: 'all 0.3s ease' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 900, opacity: 0.1, color: '#fff' }}>{OTHER_INITS[activeIcp]}</div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                  {OTHER_INITS[activeIcp]}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 64, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{OTHER_NAMES[activeIcp]}</span>
                  {speaker === 'other' && <AudioVisualizer color={OTHER_COLORS[activeIcp]} />}
                </div>
              </div>
            </div>

            {/* Premium Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(10px)' }}><Mic size={18} /></div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(10px)' }}><Video size={18} /></div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(10px)' }}><Activity size={18} /></div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', backdropFilter: 'blur(10px)' }}><MoreHorizontal size={18} /></div>
              <div style={{ width: 56, height: 44, borderRadius: 22, background: '#ef4444', border: '1px solid #f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 12px rgba(239,68,68,0.4)', marginLeft: 8 }}><PhoneOff size={18} /></div>
            </div>
          </div>

          {/* What the ICP is saying / thinking - glass panel */}
          <div className="glass-panel-enhanced" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: icp.color, display: 'inline-block', boxShadow: `0 0 8px ${icp.color}` }} />
              Internal Monologue & AI Intervention
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              {icp.icpSays.slice(0, msgIdx + 1).map((m, i) => (
                <div key={i} className="msg-bubble-animated" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap', paddingTop: 2, minWidth: 60, fontWeight: 500 }}>{m.time}</div>
                  <div style={{ 
                    background: m.msg.startsWith('PersonaOn') ? 'var(--brand-faint)' : 'var(--bg-elevated)', 
                    border: '1px solid', 
                    borderColor: m.msg.startsWith('PersonaOn') ? 'var(--brand-glow)' : 'var(--border-subtle)',
                    borderRadius: '0 16px 16px 16px', 
                    padding: '14px 18px', 
                    fontSize: 14, 
                    color: m.msg.startsWith('PersonaOn') ? 'var(--text-primary)' : 'var(--text-secondary)',
                    lineHeight: 1.6, 
                    flex: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}>
                    {m.msg.startsWith('PersonaOn') ? (
                      <><span style={{ fontSize: 11, fontWeight: 800, color: 'var(--brand)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}><Zap size={12}/> PersonaOn AI</span>{m.msg.replace(/^PersonaOn: /, '')}</>
                    ) : m.msg}
                  </div>
                </div>
              ))}
              {msgIdx < icp.icpSays.length - 1 && (
                <div className="msg-bubble-animated" style={{ display: 'flex', gap: 6, paddingLeft: 72, marginTop: 8 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: icp.color, animation: `pulse-glow ${0.8 + i * 0.2}s ease-in-out infinite`, opacity: 0.8 }} />)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: PersonaOn AI Sidebar */}
        <div className="glass-panel-enhanced" key={briefKey} style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="ai-scan-overlay" />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, var(--brand), var(--brand-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px var(--brand-glow)' }}>
              <Zap size={14} color="#fff" />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>PersonaOn</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--brand)', background: 'var(--brand-faint)', border: '1px solid var(--brand-glow)', borderRadius: 20, padding: '3px 10px', fontWeight: 700 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand)', animation: 'pulse-glow 1.5s infinite' }}/> LIVE
            </span>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            
            {/* Staggered Brief Sections */}
            <div className="stagger-1">
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                📋 Meeting Context
              </div>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {icp.personaonBrief.context}
              </div>
            </div>

            <div className="stagger-2">
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                ↩ Last Left Off
              </div>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 16, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {icp.personaonBrief.lastLeftOff}
              </div>
            </div>

            <div className="stagger-3">
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f59e0b', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                ⚠ Watch For
              </div>
              <div style={{ borderLeft: '3px solid #f59e0b', background: 'rgba(245,158,11,0.06)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '14px 16px', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>
                {icp.personaonBrief.watchFor}
              </div>
            </div>

            <div className="stagger-4" style={{ marginTop: 'auto', paddingTop: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                ✦ Predicted Outcome
              </div>
              <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 'var(--radius-md)', padding: 16, fontSize: 13, color: '#059669', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 600 }}>
                {icp.outcome}
              </div>
            </div>

            {/* Real-time Sentiment chip */}
            <div className="stagger-4" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
              <Activity size={14} color="#10b981" />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Live Sentiment:</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: '3px 12px', fontFamily: 'var(--font-heading)' }}>
                {icp.personaonBrief.sentiment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What the ICP is telling (Testimonial) */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 32, padding: '24px 32px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: `rgba(${icp.rgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: icp.color, border: `2px solid rgba(${icp.rgb},0.3)`, flexShrink: 0 }}>
          {icp.initials}
        </div>
        <div>
          <div style={{ fontSize: 16, color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 600, lineHeight: 1.5 }}>
            "{icp.benefit}"
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ width: 16, height: 2, background: icp.color, borderRadius: 2 }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{icp.name}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>— {icp.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
