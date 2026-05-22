import React, { useState } from 'react';
import { ICP_LIST, ICP_DATA } from '../icpData';
import { Zap } from 'lucide-react';

export default function BlogF() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [activeSlot, setActiveSlot] = useState(0);

  const icp = ICP_DATA[activeIcp];
  const slot = icp.calendarDay[activeSlot];

  return (
    <div>
      <div className="section-header">
        <span className="section-header-tag">📅 Approach F — Day Calendar Timeline</span>
        <h2>An ICP's entire day.<br />PersonaOn inside every meeting.</h2>
        <p>Pick an ICP, then click any meeting slot in their calendar. Each captured meeting has a PersonaOn brief and a story about how it changed the outcome.</p>
      </div>

      {/* ICP selector */}
      <div className="icp-filter">
        {ICP_LIST.map(i => (
          <button
            key={i.key}
            className={`icp-pill${activeIcp === i.key ? ' active' : ''}`}
            style={{ '--pill-color': i.color, '--pill-rgb': i.rgb }}
            onClick={() => { setActiveIcp(i.key); setActiveSlot(0); }}
          >
            <span className="icp-pill-dot" style={{ background: i.color }} />
            {i.name}
            <span style={{ fontSize: 10, opacity: 0.5 }}>· {i.title}</span>
          </button>
        ))}
      </div>

      <div className="calendar-layout">
        {/* Left: Calendar */}
        <div className="calendar-panel">
          <div className="calendar-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `rgba(${icp.rgb},0.1)`, border: `1px solid rgba(${icp.rgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13, color: icp.color, flexShrink: 0 }}>
                {icp.initials}
              </div>
              <div>
                <div className="calendar-header-date">{icp.name}</div>
                <div className="calendar-header-sub">{icp.title} · {icp.company}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: icp.color, animation: 'pulse-glow 2s infinite' }} />
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today · Meetings Day View</span>
            </div>
          </div>

          <div className="calendar-day">
            {icp.calendarDay.map((slot, i) => (
              <div
                key={i}
                className={`cal-slot${activeSlot === i ? ' active' : ''}`}
                onClick={() => slot.status === 'captured' && setActiveSlot(i)}
                style={{ opacity: slot.status === 'pending' ? 0.5 : 1, cursor: slot.status === 'pending' ? 'default' : 'pointer' }}
              >
                <span className="cal-time">{slot.time}</span>
                <div className="cal-event-wrap">
                  <div className="cal-event-title">{slot.event}</div>
                  <div className={`cal-persona-badge ${slot.status}`}>
                    {slot.status === 'captured' ? (
                      <><Zap size={8} /> Captured</>
                    ) : (
                      '· Upcoming'
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Story */}
        <div className="calendar-story-panel">
          {slot.status === 'captured' ? (
            <div className="cal-story-card" style={{ borderColor: `rgba(${icp.rgb},0.15)` }}>
              {/* Header */}
              <div className="cal-story-meeting-header">
                <div
                  className="cal-story-meeting-icon"
                  style={{ background: `rgba(${icp.rgb},0.08)`, color: icp.color, border: `2px solid rgba(${icp.rgb},0.2)` }}
                >
                  {icp.initials}
                </div>
                <div className="cal-story-meeting-meta">
                  <div className="cal-story-meeting-title">{slot.event}</div>
                  <div className="cal-story-meeting-with">{slot.time} · With {icp.meetingWith}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#06b6d4', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)', borderRadius: 20, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  ⚡ Captured
                </span>
              </div>

              {/* PersonaOn brief */}
              <div className="cal-story-brief">
                <div className="cal-brief-label" style={{ color: icp.color }}>
                  <Zap size={10} /> PersonaOn Brief · Pre-Meeting
                </div>
                <div className="cal-brief-body">
                  <div className="cal-brief-section">
                    <div className="cal-brief-section-label">Context</div>
                    <div className="cal-brief-section-val">{icp.personaonBrief.context}</div>
                  </div>
                  <div style={{ height: 1, background: 'var(--border-subtle)' }} />
                  <div className="cal-brief-section">
                    <div className="cal-brief-section-label">Last Left Off</div>
                    <div className="cal-brief-section-val">{icp.personaonBrief.lastLeftOff}</div>
                  </div>
                  <div className="cal-brief-watchfor">
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f59e0b', display: 'block', marginBottom: 5 }}>⚠ Watch For</span>
                    {icp.personaonBrief.watchFor}
                  </div>
                </div>
              </div>

              {/* Story */}
              <p className="cal-story-text">
                {slot.story || icp.benefit}
              </p>

              {/* ICP Quote */}
              <div style={{ background: `rgba(${icp.rgb},0.05)`, borderLeft: `3px solid ${icp.color}`, borderRadius: '0 var(--radius-md) var(--radius-md) 0', padding: '14px 16px', fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>
                "{icp.pain}"
                <div style={{ fontSize: 11, color: icp.color, fontWeight: 700, fontStyle: 'normal', marginTop: 8, fontFamily: 'var(--font-heading)' }}>— {icp.name}, {icp.title}</div>
              </div>

              {/* Outcome */}
              <div className="cal-story-outcome">✦ {icp.outcome}</div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                {icp.stats.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: icp.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', minHeight: 300 }}>
              <div style={{ fontSize: 28 }}>📅</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 300, lineHeight: 1.7 }}>
                Select a "Captured" meeting from the calendar to see PersonaOn's brief and the ICP story.
              </p>
              <span style={{ fontSize: 11, color: icp.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Pending meetings not yet captured
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
