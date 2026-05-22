import React, { useState } from 'react';
import { ICP_LIST, ICP_DATA } from '../icpData';
import { Zap, Hash } from 'lucide-react';

const CHANNELS = [
  { name: 'founders-stories', key: 'founder' },
  { name: 'investor-ops', key: 'investor' },
  { name: 'talent-team', key: 'recruiter' },
  { name: 'ops-sync', key: 'operator' },
];

export default function BlogC() {
  const [activeChannel, setActiveChannel] = useState('founder');
  const icp = ICP_DATA[activeChannel];

  const THREADS = {
    founder: [
      {
        avatar: 'SC', name: 'Sarah Chen', time: '9:08 AM', color: '#06b6d4',
        bg: 'rgba(6,182,212,0.1)',
        text: "OK, I have the René Capital call in 8 minutes and I literally cannot remember if Evelyn asked about LATAM hiring velocity or the pricing model on our last call. This fundraise is turning my brain into soup.",
        reactions: ['😅 12', '👀 7']
      },
      {
        avatar: 'SC', name: 'Sarah Chen', time: '9:09 AM', color: '#06b6d4',
        bg: 'rgba(6,182,212,0.1)',
        text: "My actual notes from that call say: 'Evelyn liked the graph? or was it the team slide. LATAM hiring something... margin is 70-something%' — absolutely useless.",
        attachment: { title: 'RAW NOTES · Call 2', body: 'Rene Cap - Evelyn liked the graph? or was it the team slide\nLATAM hiring something... ask about velocity or speed?\nMargin is 70-something %, check with CFO\nFollow up on pricing. Or was it the API model?', color: '#ef4444' },
        reactions: []
      },
      {
        avatar: '⚡', name: 'PersonaOn', time: '9:09 AM', color: '#06b6d4',
        bg: 'rgba(6,182,212,0.07)',
        isApp: true,
        text: "Brief ready for your 9:00 call with Evelyn Vance (René Capital):",
        attachment: {
          title: '📋 PersonaOn Brief · René Capital (Call 3)',
          body: `Context: Evelyn focuses on API-first infrastructure bets. Has been tracking Synthia since YC batch.

Last left off: She asked specifically about LATAM engineering VELOCITY — not pricing. She flagged concerns about scaling headcount without margin compression at your 76% gross margin target.

Watch for: She will bring up the 3-year LatAm comp routing model. Have slide ready.

Sentiment: Positive with active open questions.`,
          color: '#06b6d4'
        }
      },
      {
        avatar: 'SC', name: 'Sarah Chen', time: '9:47 AM', color: '#06b6d4',
        bg: 'rgba(6,182,212,0.1)',
        text: "Ok so she asked about the LatAm model first thing. I had the slide up before she finished the sentence. PersonaOn called it perfectly. We're getting a term sheet.",
        reactions: ['🚀 23', '💙 15', '🎉 9']
      },
    ],
    investor: [
      {
        avatar: 'AM', name: 'Alex Mercer', time: '9:55 AM', color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        text: "Back-to-back pitches today. Apex AI call starting in 5 and I have absolutely no recollection of what I promised Liam last time. Was it a reference call? An intro? My notes are worthless.",
        reactions: ['💀 8', '😬 5']
      },
      {
        avatar: 'AM', name: 'Alex Mercer', time: '9:56 AM', color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        text: "I once double-committed to the same intro to two different founders because I forgot. Can't do that again.",
        reactions: ['😭 11']
      },
      {
        avatar: '⚡', name: 'PersonaOn', time: '9:58 AM', color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.07)',
        isApp: true,
        text: "Pre-call brief for Liam K. / Apex AI (Evaluation Call 3):",
        attachment: {
          title: '📋 PersonaOn Brief · Apex AI',
          body: `Context: Liam K. is a 2nd-time founder (exited MeshDB 2022). High technical depth. $1.2M ARR at 14% MoM growth.

Last left off: Developer community bottleneck — Apex lacks a dedicated DevRel lead for developer-led top-of-funnel growth.

Promise logged: You committed to introduce Liam to Sarah Jenkins (ex-Vercel Head of DevRel).

Recommended action: Move to term sheet discussion today — conviction is high.`,
          color: '#8b5cf6'
        }
      },
      {
        avatar: 'AM', name: 'Alex Mercer', time: '10:52 AM', color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.1)',
        text: "Made the Sarah Jenkins intro live on the call. Liam was genuinely shocked — in a good way. Term sheet going out Thursday. This is what compounding memory looks like.",
        reactions: ['🔥 18', '💜 12', '🚀 9']
      },
    ],
    recruiter: [
      {
        avatar: 'MT', name: 'Marcus Thorne', time: '10:56 AM', color: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        text: "Screening 35 engineers this week. About to jump on Dan K's call and I'm blanking on what his specific deal was. Was it the remote thing? Database work? Compensation? I've interviewed 8 people today already.",
        reactions: ['😰 6']
      },
      {
        avatar: 'MT', name: 'Marcus Thorne', time: '10:57 AM', color: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        text: "I think he mentioned not wanting his current company to find out he's looking? Or was that someone else?",
        reactions: []
      },
      {
        avatar: '⚡', name: 'PersonaOn', time: '10:59 AM', color: '#10b981',
        bg: 'rgba(16,185,129,0.07)',
        isApp: true,
        text: "Candidate brief ready for Dan K. / Principal Backend Screen:",
        attachment: {
          title: '📋 PersonaOn Brief · Dan K.',
          body: `Context: 12 years distributed systems (Go, Rust, PostgreSQL, K8s). Strong OSS contributor. LinkedIn contact (quiet search).

Critical: Dan is actively hiding this search from his current manager at CorpTech. Do NOT reference his current employer by name.

Non-negotiables: (1) 100% async-first remote culture — non-negotiable due to forced RTO at current job. (2) Architectural OWNERSHIP over database sharding, not just implementation.

Recommended opener: Lead with the sharding project scope + remote-first policy.`,
          color: '#10b981'
        }
      },
      {
        avatar: 'MT', name: 'Marcus Thorne', time: '11:48 AM', color: '#10b981',
        bg: 'rgba(16,185,129,0.1)',
        text: "He said 'you actually get what I'm looking for' at the end. He literally never says that. Offer going out tonight with the exact project scope he described. This is a close.",
        reactions: ['✅ 14', '💚 10', '👊 6']
      },
    ],
    operator: [
      {
        avatar: 'ER', name: 'Elena Rostova', time: '8:26 AM', color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        text: "AWS cost review in 4 mins and I have three departments who all think the database migration is someone else's responsibility. This is going to be a fun 60 minutes.",
        reactions: ['😤 5']
      },
      {
        avatar: 'ER', name: 'Elena Rostova', time: '8:27 AM', color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        text: "Also cannot remember if the contract renewal is June 1 or June 15. And whether Finance signed off on the reserved instances already or if that's still pending.",
        reactions: ['😭 7', '📅 3']
      },
      {
        avatar: '⚡', name: 'PersonaOn', time: '8:28 AM', color: '#f59e0b',
        bg: 'rgba(245,158,11,0.07)',
        isApp: true,
        text: "Pre-meeting context loaded for AWS Enterprise Review:",
        attachment: {
          title: '📋 PersonaOn Brief · AWS Cost Review Q2',
          body: `Context: Third quarterly cost review. Cloud Ops, VP Engineering, Finance all in the room.

Status from last session: Finance signed off on reserved instances budget (confirmed Q1 session). Engineering has NOT confirmed testing timeline — this is the blocker.

Critical date: June 15 contract renewal. Migration to US-East-1 must complete before this date to unlock 20% discount tier. NOT June 1.

Watch for: VP Engineering will try to defer testing to "next sprint." Push for a specific Friday commitment today.`,
          color: '#f59e0b'
        }
      },
      {
        avatar: 'ER', name: 'Elena Rostova', time: '9:31 AM', color: '#f59e0b',
        bg: 'rgba(245,158,11,0.1)',
        text: "Got the Engineering commitment — off-peak testing starts Friday. PersonaOn flagged exactly what to push on. Meeting was 35 minutes instead of 60. Migration tracking already created in Jira.",
        reactions: ['⚡ 11', '🙌 8', '🧡 6']
      },
    ]
  };

  const threads = THREADS[activeChannel];

  return (
    <div>
      <div className="section-header">
        <span className="section-header-tag">💬 Approach C — Chat Thread Confession</span>
        <h2>ICPs talking about their day.<br />PersonaOn arriving at the right moment.</h2>
        <p>Formatted like Slack — because this is how these conversations actually happen. Switching the channel switches the ICP and their story.</p>
      </div>

      <div className="slack-wrap">
        {/* Sidebar */}
        <div className="slack-sidebar">
          <div className="slack-sidebar-header">PersonaOn Workspace</div>
          <div className="slack-channel-list">
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '8px 10px 4px', fontFamily: 'var(--font-mono)' }}>Channels</div>
            {CHANNELS.map(ch => (
              <div
                key={ch.key}
                className={`slack-channel${activeChannel === ch.key ? ' active' : ''}`}
                onClick={() => setActiveChannel(ch.key)}
              >
                <span className="slack-channel-hash">#</span>
                {ch.name}
                {activeChannel === ch.key && (
                  <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: ICP_DATA[ch.key].color, flexShrink: 0 }} />
                )}
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '8px 10px' }} />
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '4px 10px', fontFamily: 'var(--font-mono)' }}>Apps</div>
            <div className="slack-channel active" style={{ color: '#fb7185' }}>
              <Zap size={13} /> PersonaOn AI
            </div>
          </div>
        </div>

        {/* Main thread */}
        <div className="slack-main">
          <div className="slack-topbar">
            <Hash size={14} color="var(--text-muted)" />
            <span className="slack-topbar-name">{CHANNELS.find(c => c.key === activeChannel)?.name}</span>
            <span className="slack-topbar-members">{[5, 8, 12, 7][ICP_LIST.findIndex(i => i.key === activeChannel)]} members</span>
          </div>
          <div className="slack-thread">
            {threads.map((msg, i) => (
              <div key={i} className="slack-msg-row">
                <div
                  className="slack-msg-avatar"
                  style={{
                    background: msg.bg,
                    color: msg.isApp ? '#06b6d4' : msg.color,
                    border: `1px solid rgba(${msg.isApp ? '6,182,212' : icp.rgb},0.2)`
                  }}
                >
                  {msg.isApp ? '⚡' : msg.avatar}
                </div>
                <div className="slack-msg-content">
                  <div className="slack-msg-header">
                    <span className="slack-msg-name" style={msg.isApp ? { color: '#06b6d4' } : {}}>{msg.name}</span>
                    <span className="slack-msg-time">{msg.time}</span>
                    {msg.isApp && (
                      <span style={{ fontSize: 9, background: 'rgba(244,63,94,0.1)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 4, padding: '1px 6px', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em' }}>APP</span>
                    )}
                  </div>
                  <div className="slack-msg-text">{msg.text}</div>
                  {msg.attachment && (
                    <div className="slack-attachment" style={{ '--att-color': msg.attachment.color }}>
                      <div className="slack-attachment-title">{msg.attachment.title}</div>
                      <div className="slack-attachment-body" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, whiteSpace: 'pre-wrap' }}>{msg.attachment.body}</div>
                    </div>
                  )}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      {msg.reactions.map((r, ri) => (
                        <span key={ri} className="slack-reaction">{r}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
