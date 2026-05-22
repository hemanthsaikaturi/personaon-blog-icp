import React, { useState, useEffect, useRef } from 'react';
import { ICP_LIST, ICP_DATA } from '../icpData';
import { Play, RotateCcw, Terminal, Cpu, Zap, Fingerprint } from 'lucide-react';

const ENRICHED_CSS = `
  @keyframes fadeSlideIn {
    0% { opacity: 0; transform: translateY(8px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scanlineTerminal {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .terminal-glass {
    background: #020617;
    border-radius: var(--radius-2xl);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 32px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .terminal-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);
    pointer-events: none;
  }
  
  .terminal-scanline {
    position: absolute;
    top: 0; left: 0; right: 0; height: 150px;
    background: linear-gradient(to bottom, transparent, rgba(225, 29, 72, 0.08), transparent);
    animation: scanlineTerminal 4s linear infinite;
    pointer-events: none;
  }
  
  .terminal-line-anim {
    animation: fadeSlideIn 0.2s ease-out forwards;
  }

  .premium-story-panel {
    background: var(--bg-card);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: var(--radius-2xl);
    border: 1px solid var(--border-subtle);
    box-shadow: 0 24px 64px rgba(0,0,0,0.06);
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .premium-story-panel.locked {
    filter: grayscale(1) opacity(0.4) blur(2px);
    pointer-events: none;
  }
  
  .premium-story-panel.unlocked {
    filter: grayscale(0) opacity(1) blur(0);
    box-shadow: 0 24px 64px rgba(0,0,0,0.06), 0 0 40px var(--unlock-glow);
  }
`;

const TERMINAL_SCRIPTS = {
  founder: {
    color: '#38bdf8',
    highlight: '56,189,248',
    lines: [
      { type: 'cmd', text: 'personaon generate-brief --meeting="René Capital (Call 3)"' },
      { type: 'comment', text: '# Searching memory index...' },
      { type: 'out', text: '→ Found 2 previous calls with Evelyn Vance (René Capital)' },
      { type: 'out', text: '→ Extracting key topics from Call 1 & Call 2 transcripts...' },
      { type: 'comment', text: '# Synthesizing pre-meeting context...' },
      { type: 'highlight', text: '✦ context: Evelyn is API-infrastructure focused. Tracking Synthia since YC batch.' },
      { type: 'highlight', text: '✦ last_left_off: LATAM engineering velocity — scale headcount without margin compression.' },
      { type: 'highlight', text: '✦ watch_for: She will raise 3-year LatAm comp routing model. Have slide ready.' },
      { type: 'out', text: '→ Sentiment analysis: POSITIVE with active open questions' },
      { type: 'success', text: '✓ Brief compiled. Pushed to menu bar (32 seconds before call). Ready.' },
    ]
  },
  investor: {
    color: '#a78bfa',
    highlight: '167,139,250',
    lines: [
      { type: 'cmd', text: 'personaon generate-brief --meeting="Apex AI (Eval Call 3)"' },
      { type: 'comment', text: '# Scanning 52-deal pipeline for Liam K. / Apex AI...' },
      { type: 'out', text: '→ Found 2 previous meetings logged' },
      { type: 'out', text: '→ Loading ARR snapshots, growth metrics, flagged action items...' },
      { type: 'comment', text: '# Checking for unresolved promises...' },
      { type: 'warn', text: '⚠ Promise detected: Intro to Sarah Jenkins (ex-Vercel DevRel) — unfulfilled.' },
      { type: 'highlight', text: '✦ context: Liam K., 2nd-time founder. $1.2M ARR at 14% MoM. Serverless dev tools.' },
      { type: 'highlight', text: '✦ last_left_off: DevRel lead bottleneck — blocking top-of-funnel developer adoption.' },
      { type: 'highlight', text: '✦ recommended_action: Move to term sheet. Fulfill intro promise LIVE on this call.' },
      { type: 'success', text: '✓ Brief ready. 1 unresolved promise surfaced and included.' },
    ]
  },
  recruiter: {
    color: '#34d399',
    highlight: '52,211,153',
    lines: [
      { type: 'cmd', text: 'personaon generate-brief --candidate="Dan K." --role="Principal Backend"' },
      { type: 'comment', text: '# Building candidate context from LinkedIn + screen notes...' },
      { type: 'out', text: '→ Experience: 12 years (Go, Rust, PostgreSQL, K8s). Strong OSS contributor.' },
      { type: 'out', text: '→ Search type: QUIET — do not reference current employer' },
      { type: 'comment', text: '# Extracting motivational signals...' },
      { type: 'highlight', text: '✦ non_negotiable_1: 100% async-first remote — forced RTO is current pain.' },
      { type: 'highlight', text: '✦ non_negotiable_2: Architectural OWNERSHIP of database sharding (not implementation).' },
      { type: 'highlight', text: '✦ opening_hook: Lead with sharding project scope + async-remote culture.' },
      { type: 'out', text: '→ Sensitivity flag: Quiet search. Handle with discretion.' },
      { type: 'success', text: '✓ Candidate brief ready. Two non-negotiables identified and logged.' },
    ]
  },
  operator: {
    color: '#fbbf24',
    highlight: '251,191,36',
    lines: [
      { type: 'cmd', text: 'personaon generate-brief --meeting="AWS Cost Review Q2"' },
      { type: 'comment', text: '# Pulling cross-department meeting history...' },
      { type: 'out', text: '→ Found Q1 review, Engineering sync, 3 related cost threads' },
      { type: 'out', text: '→ Extracting owner map and open decisions...' },
      { type: 'warn', text: '⚠ Hard deadline detected: June 15 — contract renewal for 20% discount tier.' },
      { type: 'highlight', text: '✦ context: Finance approved reserved instances (Q1 confirmed). Engineering testing: NOT confirmed.' },
      { type: 'highlight', text: '✦ blocker: Engineering must commit to off-peak testing schedule. This is the bottleneck.' },
      { type: 'highlight', text: '✦ push_for: Specific Friday start commitment — not "next sprint" deferral.' },
      { type: 'out', text: '→ Action items from last session: 3 open, 1 overdue.' },
      { type: 'success', text: '✓ Brief ready. Critical deadline + blocker owner flagged.' },
    ]
  }
};

export default function BlogE() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [running, setRunning] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const icp = ICP_DATA[activeIcp];
  const script = TERMINAL_SCRIPTS[activeIcp];
  const intervalRef = useRef(null);

  const runScript = () => {
    if (running) return;
    setVisibleLines(0);
    setRunning(true);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= script.lines.length) {
        clearInterval(intervalRef.current);
        setRunning(false);
      }
    }, 400); // slightly slower for readability
  };

  const resetScript = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setVisibleLines(0);
  };

  useEffect(() => {
    resetScript();
  }, [activeIcp]);

  const lineStyle = type => {
    if (type === 'cmd') return { color: '#f8fafc' }; // white for cmd
    if (type === 'comment') return { color: '#64748b' }; // slate 500
    if (type === 'highlight') return { color: script.color, fontWeight: 700 };
    if (type === 'success') return { color: '#34d399', fontWeight: 600 };
    if (type === 'warn') return { color: '#fbbf24', fontWeight: 600 };
    return { color: '#94a3b8' }; // slate 400 for out
  };

  const isComplete = visibleLines >= script.lines.length;

  return (
    <div>
      <style>{ENRICHED_CSS}</style>
      
      <div className="section-header">
        <span className="section-header-tag">⚡ Approach E — Brief Generator Terminal</span>
        <h2>Watch PersonaOn compile<br />the brief in real-time.</h2>
        <p>Select an ICP, hit Run, and watch PersonaOn search their meeting history and extract exactly what they need. Then read their story alongside.</p>
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
            onClick={() => setActiveIcp(i.key)}
          >
            <span className="icp-pill-dot" style={{ background: i.color, boxShadow: `0 0 10px ${i.color}` }} />
            {i.name}
            <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 500 }}>({i.title})</span>
          </button>
        ))}
      </div>

      <div className="terminal-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start', marginTop: 40 }}>
        {/* Terminal - Left Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="terminal-glass">
            <div className="terminal-scanline" />
            
            {/* macOS Style Title Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'var(--font-mono)', color: '#64748b', fontWeight: 600 }}>
                <Terminal size={12} /> personaon-cli · {icp.name}
              </div>
            </div>

            <div style={{ padding: '20px 24px', minHeight: 380, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
              <div className="terminal-line-anim" style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: 'var(--brand)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>$</span>
                {visibleLines === 0 && !running ? (
                  <span style={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.6 }}>
                    # Ready. Press "Run Brief" to generate pre-meeting context for {icp.name}.<br/>
                    # Engine: PersonaOn v2.0
                  </span>
                ) : null}
              </div>

              {script.lines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="terminal-line-anim" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {line.type === 'cmd' && <span style={{ color: 'var(--brand)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>$</span>}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.5, ...lineStyle(line.type), paddingLeft: line.type !== 'cmd' ? 20 : 0 }}>
                    {line.text}
                  </span>
                </div>
              ))}

              {running && (
                <div className="terminal-line-anim" style={{ display: 'flex', gap: 12 }}>
                  <span style={{ width: 8, height: 16, background: 'var(--brand)', animation: 'glowPulse 1s infinite', marginTop: 2 }} />
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={runScript} 
              disabled={running || isComplete}
              style={{ 
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', 
                background: running || isComplete ? 'var(--brand-faint)' : 'var(--brand)', 
                color: running || isComplete ? 'var(--brand)' : '#fff',
                border: 'none', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', 
                fontSize: 13, fontWeight: 700, cursor: running || isComplete ? 'default' : 'pointer', 
                transition: 'all 0.2s ease',
                boxShadow: running || isComplete ? 'none' : '0 8px 16px var(--brand-glow)'
              }}
            >
              {running ? <Cpu size={14} className="spin-anim" /> : isComplete ? <Zap size={14} /> : <Play size={14} />} 
              {running ? 'Compiling...' : isComplete ? 'Brief Generated' : 'Run Brief'}
            </button>
            <button
              onClick={resetScript}
              style={{ 
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', 
                background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-subtle)', 
                color: 'var(--text-muted)', borderRadius: 'var(--radius-md)', 
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, 
                cursor: 'pointer', transition: 'all 0.2s ease' 
              }}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>

        {/* Story panel - Right Side */}
        <div 
          className={`premium-story-panel ${isComplete ? 'unlocked' : 'locked'}`}
          style={{ '--unlock-glow': `rgba(${icp.rgb}, 0.15)` }}
        >
          {/* Locked Overlay state */}
          {!isComplete && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 10, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}>
              <Fingerprint size={48} color="var(--text-muted)" style={{ opacity: 0.5 }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Awaiting Generation
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `rgba(${icp.rgb},0.1)`, border: `1px solid rgba(${icp.rgb},0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: icp.color, flexShrink: 0, boxShadow: `0 8px 24px rgba(${icp.rgb},0.15)` }}>
              {icp.initials}
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>{icp.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>{icp.title} · {icp.company}</div>
            </div>
          </div>

          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1.2, letterSpacing: '-0.03em', marginTop: 8 }}>
            "{icp.headline}"
          </div>

          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {icp.pain}
          </p>

          {/* What the ICP is telling (Testimonial) */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', margin: '8px 0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)', position: 'relative' }}>
            {/* Quote icon watermark */}
            <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 40, fontFamily: 'serif', color: 'var(--text-muted)', opacity: 0.1, lineHeight: 1 }}>"</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: `rgba(${icp.rgb},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: icp.color, flexShrink: 0, border: `1px solid rgba(${icp.rgb},0.3)` }}>
              {icp.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 600, position: 'relative', zIndex: 1 }}>
                "{icp.benefit}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                <span style={{ width: 12, height: 2, background: icp.color, borderRadius: 2 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{icp.name}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>— {icp.title}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 32, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
            {icp.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 900, color: icp.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 'var(--radius-md)', padding: '16px 20px', color: '#059669', fontSize: 13, lineHeight: 1.6, fontWeight: 600, marginTop: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 10, fontWeight: 800 }}><Zap size={12}/> Business Outcome</span><br/>
            {icp.outcome}
          </div>
        </div>
      </div>
    </div>
  );
}
