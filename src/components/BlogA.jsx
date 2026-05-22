import React, { useState } from 'react';
import { ICP_LIST } from '../icpData';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function BlogA() {
  const [expanded, setExpanded] = useState(null);

  const featured = ICP_LIST[0]; // Founder as featured
  const rest = ICP_LIST.slice(1);

  return (
    <div>
      <div className="section-header">
        <span className="section-header-tag">✦ Approach A — Editorial Blog Grid</span>
        <h2>Real people. Real meetings.<br />Real compounding memory.</h2>
        <p>Every ICP has a story. Click any card to expand the full narrative — their exact pain, PersonaOn's intervention, and the measurable outcome.</p>
      </div>

      <div className="blog-a-grid">

        {/* FEATURED CARD */}
        <div
          className="blog-a-card featured"
          style={{ borderColor: `rgba(${featured.rgb},0.2)`, boxShadow: `0 0 60px rgba(${featured.rgb},0.05)` }}
          onClick={() => setExpanded(expanded === featured.key ? null : featured.key)}
        >
          <div className="blog-a-card-glow" style={{ background: featured.color }} />

          {/* Left: meta + headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="blog-a-tags">
              <span className="blog-a-tag" style={{ background: featured.tagBg, color: featured.color, border: `1px solid rgba(${featured.rgb},0.2)` }}>Featured Story</span>
              <span className="blog-a-tag" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>{featured.industry}</span>
            </div>
            <div className="blog-a-headline">"{featured.headline}"</div>
            {expanded === featured.key ? (
              <div className="blog-a-story" onClick={e => e.stopPropagation()}>
                <p className="blog-a-excerpt">{featured.pain}</p>
                
                {/* ICP Testimonial Box */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginTop: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `rgba(${featured.rgb},0.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: featured.color, flexShrink: 0 }}>
                    {featured.initials}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{featured.name}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{featured.title}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                      "{featured.benefit}"
                    </div>
                  </div>
                </div>

                <div className="blog-a-outcome-box">✦ {featured.outcome}</div>
              </div>
            ) : (
              <p className="blog-a-excerpt">{featured.pain.slice(0, 160)}…</p>
            )}
            <div className="blog-a-read-more" style={{ color: featured.color }}>
              {expanded === featured.key ? <><RotateCcw size={12} /> Collapse</> : <>Read full story <ArrowRight size={12} /></>}
            </div>
          </div>

          {/* Right: author + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="blog-a-author">
              <div className="blog-a-avatar" style={{ color: featured.color, background: `rgba(${featured.rgb},0.08)`, border: `2px solid rgba(${featured.rgb},0.3)` }}>
                {featured.initials}
              </div>
              <div className="blog-a-author-info">
                <div className="blog-a-name">{featured.name}</div>
                <div className="blog-a-role">{featured.title} · {featured.company}</div>
              </div>
            </div>
            <div className="blog-a-stats">
              {featured.stats.map((s, i) => (
                <div key={i}>
                  <div className="blog-a-stat-val" style={{ color: featured.color }}>{s.val}</div>
                  <div className="blog-a-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Mini quote */}
            <div style={{ background: 'rgba(0,0,0,0.03)', borderLeft: `3px solid ${featured.color}`, borderRadius: '0 10px 10px 0', padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>
              "{featured.personaonBrief.watchFor}"
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 8, fontStyle: 'normal', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PersonaOn Brief — Watch For</div>
            </div>
          </div>
        </div>

        {/* REGULAR CARDS */}
        {rest.map(icp => (
          <div
            key={icp.key}
            className="blog-a-card"
            style={expanded === icp.key ? { borderColor: `rgba(${icp.rgb},0.3)`, boxShadow: `0 0 40px rgba(${icp.rgb},0.06)` } : {}}
            onClick={() => setExpanded(expanded === icp.key ? null : icp.key)}
          >
            <div className="blog-a-card-glow" style={{ background: icp.color }} />
            <div className="blog-a-author">
              <div className="blog-a-avatar" style={{ color: icp.color, background: `rgba(${icp.rgb},0.08)`, border: `2px solid rgba(${icp.rgb},0.2)` }}>
                {icp.initials}
              </div>
              <div className="blog-a-author-info">
                <div className="blog-a-name">{icp.name}</div>
                <div className="blog-a-role">{icp.title} · {icp.company}</div>
              </div>
            </div>

            <div className="blog-a-tags">
              <span className="blog-a-tag" style={{ background: icp.tagBg, color: icp.color, border: `1px solid rgba(${icp.rgb},0.2)` }}>{icp.key}</span>
              <span className="blog-a-tag" style={{ background: 'rgba(0,0,0,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>{icp.industry}</span>
            </div>

            <div className="blog-a-headline">"{icp.headline}"</div>

            {expanded === icp.key ? (
              <div className="blog-a-story" onClick={e => e.stopPropagation()}>
                <p className="blog-a-excerpt">{icp.pain}</p>
                
                {/* ICP Testimonial Box */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginTop: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
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

                <div className="blog-a-outcome-box">✦ {icp.outcome}</div>
              </div>
            ) : (
              <p className="blog-a-excerpt">{icp.pain.slice(0, 120)}…</p>
            )}

            <div className="blog-a-stats">
              {icp.stats.map((s, i) => (
                <div key={i}>
                  <div className="blog-a-stat-val" style={{ color: icp.color }}>{s.val}</div>
                  <div className="blog-a-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="blog-a-read-more" style={{ color: icp.color }}>
              {expanded === icp.key ? <><RotateCcw size={12} /> Collapse</> : <>Full story <ArrowRight size={12} /></>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
