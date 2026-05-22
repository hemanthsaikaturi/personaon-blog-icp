import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, User, Mail, Zap, Clock, CheckCircle2 } from 'lucide-react';

const ICP = {
  founder: {
    name: 'Sarah Chen', initials: 'SC',
    role: 'Founder & CEO, Synthia AI',
    headline: 'How I stopped losing investor context in the Series A fundraising haze',
    tagline: 'From back-to-back pitches to a single compounding memory.',
    color: 'var(--founder-color)', rgb: '6,182,212', glow: 'var(--founder-glow)',
    stats: [
      { val: '45+', label: 'Pitch Meetings' },
      { val: '12h/wk', label: 'Time Saved' },
      { val: '100%', label: 'Context Recall' }
    ],
    brief: {
      title: 'René Capital Partners (Series A Lead)',
      participants: 'Evelyn Vance (GP), Sarah Chen (CEO)',
      lastLeft: 'Discussed API scaling & margins (76%). Evelyn concerned about engineering velocity.',
      critical: 'Scale LATAM engineering team to double throughput by Q4.'
    },
    email: {
      subject: 'Synthia AI LatAm Engineering Scale — Follow up',
      body: `Hi Evelyn,

Great speaking today. Here are our LatAm engineering hub details:

1. Target velocity: 14 engineers onboarding next quarter
2. Hiring efficiency: 22-day average lead time
3. Gross margin target: 76% maintained through local compensation routing

Let's sync Tuesday at 2 PM.

Best,
Sarah`
    },
    meetings: [
      { id: 'm1', title: 'René Capital Partners', time: 'Completed 2h ago', tag: 'Fundraising', done: true },
      { id: 'm2', title: 'BlueRidge Capital Prep', time: 'Tomorrow, 9:00 AM', tag: 'Fundraising', done: false },
      { id: 'm3', title: 'Synthia Q2 Board Sync', time: 'May 28, 2:00 PM', tag: 'Board', done: false },
      { id: 'm4', title: 'LatAm Lead Interview', time: 'May 29, 10:30 AM', tag: 'Hiring', done: false }
    ],
    blogBlocks: [
      { type: 'text', content: "Last quarter I was running 8–10 pitch calls a day. By 6 PM, all those partners had blended into a blur of follow-up promises and scribbled notes I couldn't decipher." },
      { type: 'action', label: 'Focus René Capital Partners', text: 'During our third week, we met with René Capital Partners.', action: 'meeting', target: 'm1' },
      { type: 'text', content: "In my raw notes: 'Rene – asked about hiring speeds?' No idea which partner, no context. But PersonaOn already had a perfect record. Before our second call, it pushed a sharp brief to my menu bar." },
      { type: 'action', label: 'View Pre-Meeting Brief', text: 'The René Capital Pre-Meeting Brief was crystal clear:', action: 'brief' },
      { type: 'text', content: "Partner Evelyn was focused on our LATAM engineering velocity. When she joined the call, I said: 'Evelyn, you wanted to dive into our LATAM hub scaling — here's the exact cohort analysis.' Her eyes lit up." },
      { type: 'action', label: 'Generate Compounded Follow-up', text: 'Directly after the call, PersonaOn drafted our follow-up.', action: 'email' },
      { type: 'text', content: "Instead of a blank screen at 9 PM, I spent 10 seconds reviewing a perfect brief, hit send, went to bed. We closed their lead check three weeks later." }
    ]
  },
  investor: {
    name: 'Alex Mercer', initials: 'AM',
    role: 'Managing Partner, Veloce Ventures',
    headline: 'Managing 50 active deals without letting a single founder relationship slip',
    tagline: 'Building a compounding memory bank across hundreds of companies.',
    color: 'var(--investor-color)', rgb: '139,92,246', glow: 'var(--investor-glow)',
    stats: [
      { val: '50+', label: 'Deals Managed' },
      { val: '15h/wk', label: 'Prep Time Saved' },
      { val: '99.4%', label: 'Context Accuracy' }
    ],
    brief: {
      title: 'Apex AI (Series A Prospect)',
      participants: 'Alex Mercer (Veloce), Liam K. (Apex CEO)',
      lastLeft: '$1.2M ARR growing 14% MoM. DevRel scaling is core bottleneck.',
      critical: 'Promised to intro Liam to Sarah Jenkins (ex-Vercel DevRel).'
    },
    email: {
      subject: 'Apex AI / Veloce Ventures — Next Steps & Intro',
      body: `Hi Liam,

Great call today! $1.2M ARR at 14% MoM is exceptional growth.

As promised, cc'ing Sarah Jenkins (ex-Vercel DevRel) here — she can share direct insights on scaling your developer community.

Let's reconnect once your tech docs are finalized.

Best,
Alex`
    },
    meetings: [
      { id: 'm1', title: 'Apex AI Evaluation', time: 'Completed 1h ago', tag: 'Pipeline', done: true },
      { id: 'm2', title: 'Helios Climate Tech Sync', time: 'Today, 4:00 PM', tag: 'Portfolio', done: false },
      { id: 'm3', title: 'LP Annual Dry-run', time: 'Tomorrow, 10:00 AM', tag: 'LP Relations', done: false },
      { id: 'm4', title: 'Orbit Health Pitch', time: 'May 30, 11:30 AM', tag: 'Pipeline', done: false }
    ],
    blogBlocks: [
      { type: 'text', content: "In early-stage VC, context is your superpower. But running 8 pitch sessions a day causes details to blur. I'd frantically search docs before meetings to remember if a company had $80k or $180k in MRR." },
      { type: 'action', label: 'Select Apex AI Meeting', text: 'Apex AI was in the middle of a massive pivot.', action: 'meeting', target: 'm1' },
      { type: 'text', content: "Their third call started in 2 minutes. I had no time to dig through notes. But PersonaOn's sidebar brief was already sitting on my second monitor." },
      { type: 'action', label: 'Open Apex AI Brief', text: "PersonaOn's brief summarized everything perfectly.", action: 'brief' },
      { type: 'text', content: "It even surfaced a promise I'd completely forgotten — an intro to the Head of DevRel at Vercel. I actioned it live on the call." },
      { type: 'action', label: 'Verify Promise Follow-Up', text: 'PersonaOn captured and drafted the follow-up instantly.', action: 'email' },
      { type: 'text', content: "I look like the most organized investor in the ecosystem. In reality, I'm just letting my meeting tool do the compounding for me." }
    ]
  },
  recruiter: {
    name: 'Marcus Thorne', initials: 'MT',
    role: 'Head of Talent, ScaleUp Corp',
    headline: 'From 35 candidate interviews a week to follow-ups that actually close offers',
    tagline: 'Making every candidate feel like the only person you interviewed today.',
    color: 'var(--recruiter-color)', rgb: '16,185,129', glow: 'var(--recruiter-glow)',
    stats: [
      { val: '35+', label: 'Weekly Screens' },
      { val: '+22%', label: 'Offer Acceptance' },
      { val: '45s', label: 'Follow-up Draft' }
    ],
    brief: {
      title: "Dan K. — Principal Backend Engineer",
      participants: 'Marcus Thorne (Talent), Dan K. (Candidate)',
      lastLeft: "Frustrated with RTO mandate. Wants absolute architectural ownership over the data layer.",
      critical: 'Confirm 100% remote-first policy + database sharding ownership scope.'
    },
    email: {
      subject: "ScaleUp Corp / Principal Backend Role — Next Steps",
      body: `Hi Dan,

Great conversation today about distributed systems architecture.

I checked with our VP Engineering — our upcoming data pipeline project focuses specifically on PostgreSQL database sharding at scale. You'd have 100% architectural ownership.

Confirming: we are fully remote-first with async-first culture.

Let's get you into the technical deep-dive round!

Best,
Marcus`
    },
    meetings: [
      { id: 'm1', title: 'Dan K. (Principal Candidate)', time: 'Completed 3h ago', tag: 'Interview', done: true },
      { id: 'm2', title: 'Sync with VP Engineering', time: 'Today, 5:30 PM', tag: 'Alignment', done: false },
      { id: 'm3', title: 'Recruiting Team Standup', time: 'Tomorrow, 9:30 AM', tag: 'Internal', done: false },
      { id: 'm4', title: 'Offer Call — Lisa (PM)', time: 'May 29, 3:00 PM', tag: 'Offer Stage', done: false }
    ],
    blogBlocks: [
      { type: 'text', content: "Top engineers are being contacted by 20 recruiters a week. A generic follow-up template is instant rejection. But writing custom letters for 35 weekly interviews is impossible — unless your memory tool does it for you." },
      { type: 'action', label: "Select Dan's Interview", text: "I was screening Dan, a Principal Backend candidate.", action: 'meeting', target: 'm1' },
      { type: 'text', content: "Dan was exceptional, but had strict constraints: 100% remote, complete architectural ownership. Critical details that would decide whether he signed." },
      { type: 'action', label: 'Examine Candidate Brief', text: "Before my hiring manager sync, PersonaOn had a granular dashboard.", action: 'brief' },
      { type: 'text', content: "The brief captured: 'Dan wants PostgreSQL sharding ownership; highly sensitive to remote setup.' The hiring manager structured the technical round around this exactly." },
      { type: 'action', label: 'View Offer Email Draft', text: 'When we made the offer, PersonaOn drafted a custom email.', action: 'email' },
      { type: 'text', content: "Dan accepted in 4 hours. He said: 'I've never had a recruiting team that actually listened to what I cared about.' PersonaOn remembered what I would have forgotten." }
    ]
  },
  operator: {
    name: 'Elena Rostova', initials: 'ER',
    role: 'Chief Operating Officer, Grid Systems',
    headline: 'Turning back-to-back alignment sessions into a self-updating knowledge graph',
    tagline: 'Operations moves at the speed of shared context.',
    color: 'var(--operator-color)', rgb: '245,158,11', glow: 'var(--operator-glow)',
    stats: [
      { val: '14+', label: 'Weekly Syncs' },
      { val: '-30%', label: 'Meeting Overhead' },
      { val: '98%', label: 'Action Follow-up' }
    ],
    brief: {
      title: 'AWS Enterprise Review & Cloud Ops Sync',
      participants: 'Elena Rostova (COO), VP Engineering, Cloud Architect',
      lastLeft: 'Agreed to migrate DBs to US-East-1. Finance approved reserved instances budget.',
      critical: 'Migration MUST complete before June 15 contract renewal for 20% discount tier.'
    },
    email: {
      subject: 'AWS Cost Sync — DB Migration Action Items',
      body: `Hi Team,

Following up on our AWS cost review. Here are our exact next steps to secure the 20% discount tier before June 15:

1. Cloud Ops: Setup US-East-1 DB instances by next Friday
2. Engineering: Start migration testing during off-peak hours  
3. Finance: Finalize Reserved Instances PO by June 1

Brief mid-week sync to stay coordinated.

Best,
Elena`
    },
    meetings: [
      { id: 'm1', title: 'AWS Cost Optimization Review', time: 'Completed 4h ago', tag: 'Infrastructure', done: true },
      { id: 'm2', title: 'Engineering Resource Sync', time: 'Today, 2:00 PM', tag: 'Internal', done: false },
      { id: 'm3', title: 'Sales Pipeline Review', time: 'Tomorrow, 11:00 AM', tag: 'GTM', done: false },
      { id: 'm4', title: 'Grid Vendor Contract Neg.', time: 'May 28, 4:00 PM', tag: 'Procurement', done: false }
    ],
    blogBlocks: [
      { type: 'text', content: "As COO, I bridge product, customer success, engineering, and sales. Every department speaks a slightly different language — and action items from vendor negotiations or cost reviews constantly slip between the cracks." },
      { type: 'action', label: 'Select AWS Enterprise Meeting', text: 'This week: our quarterly AWS Enterprise cost review.', action: 'meeting', target: 'm1' },
      { type: 'text', content: "We agreed on database migrations for 12% compute cost savings, with a hard June 15 deadline. Multiple stakeholders, complex cross-department dependencies." },
      { type: 'action', label: 'Show Cost Sync Briefing', text: 'Before my VP Engineering sync, PersonaOn pulled the brief.', action: 'brief' },
      { type: 'text', content: "It listed every migration spec from the AWS meeting and flagged the June 15 constraint. I didn't touch a transcript or write a word of minutes — it was all there." },
      { type: 'action', label: 'Review Action-Item Email', text: 'It then drafted an alignment update for the full team.', action: 'email' },
      { type: 'text', content: "Our syncs dropped from 60 minutes to 15 minutes. We spend time executing — not reconstructing who was supposed to do what." }
    ]
  }
};

export default function ApproachA() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [activeMeetingId, setActiveMeetingId] = useState('m1');
  const [briefHighlighted, setBriefHighlighted] = useState(false);
  const [emailTyping, setEmailTyping] = useState(false);
  const [typedEmail, setTypedEmail] = useState('');
  const [actionHint, setActionHint] = useState('Click highlighted items in the story to control the app');
  const typingRef = useRef(null);

  const icp = ICP[activeIcp];

  useEffect(() => {
    clearInterval(typingRef.current);
    setActiveMeetingId('m1');
    setBriefHighlighted(false);
    setEmailTyping(false);
    setTypedEmail('');
    setActionHint('Click highlighted items in the story to control the app');
  }, [activeIcp]);

  const handleAction = (action, target) => {
    if (action === 'meeting' && target) {
      setActiveMeetingId(target);
      setActionHint(`→ Selected: ${icp.meetings.find(m => m.id === target)?.title}`);
      setTimeout(() => setActionHint('Click highlighted items in the story to control the app'), 3500);
    } else if (action === 'brief') {
      setBriefHighlighted(true);
      setActionHint('→ Pre-meeting brief highlighted!');
      setTimeout(() => { setBriefHighlighted(false); setActionHint('Click highlighted items in the story to control the app'); }, 3000);
    } else if (action === 'email') {
      setEmailTyping(true);
      setTypedEmail('');
      setActionHint('→ Generating follow-up draft...');
      clearInterval(typingRef.current);
      const full = icp.email.body;
      let i = 0;
      typingRef.current = setInterval(() => {
        i += 10;
        if (i >= full.length) {
          setTypedEmail(full);
          clearInterval(typingRef.current);
          setActionHint('→ Follow-up ready to send!');
          setTimeout(() => setActionHint('Click highlighted items in the story to control the app'), 3500);
        } else {
          setTypedEmail(full.slice(0, i));
        }
      }, 30);
    }
  };

  return (
    <div>
      {/* ICP Tabs */}
      <div className="icp-tabs">
        {Object.entries(ICP).map(([key, data]) => (
          <button
            key={key}
            className={`icp-tab${activeIcp === key ? ' active' : ''}`}
            style={activeIcp === key ? { color: data.color, borderColor: data.color } : {}}
            onClick={() => setActiveIcp(key)}
          >
            <span className="icp-tab-dot" style={{ background: data.color }} />
            {data.name}
            <span className="icp-tab-sub">({key})</span>
          </button>
        ))}
      </div>

      {/* Workspace Layout */}
      <div className="workspace-layout">
        {/* LEFT: App Mockup */}
        <div className="app-mockup-wrapper">
          <div className="mockup-status-bar">
            <span className="mockup-live">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              Live Companion Mockup
            </span>
            <span className={`mockup-hint${actionHint.startsWith('→') ? ' triggered' : ''}`}>{actionHint}</span>
          </div>

          <div
            className={`app-mockup${briefHighlighted ? ' flash' : ''}`}
            style={{
              '--flash-color': icp.color,
              '--flash-glow': icp.glow,
              boxShadow: `0 20px 50px -15px ${icp.glow}`
            }}
          >
            {/* Titlebar */}
            <div className="mockup-titlebar">
              <div className="titlebar-dots">
                <div className="titlebar-dot dot-red" />
                <div className="titlebar-dot dot-yellow" />
                <div className="titlebar-dot dot-green" />
              </div>
              <div className="titlebar-app-name">
                PersonaOn <span className="titlebar-badge">AI</span>
              </div>
              <div className="titlebar-right">
                <div className="search-mock">
                  <Search size={11} color="var(--text-muted)" />
                  <input readOnly placeholder="Search memory..." />
                </div>
                <div className="avatar-mock">{icp.initials[0]}</div>
              </div>
            </div>

            {/* App Body */}
            <div className="app-body">
              {/* Sidebar */}
              <div className="app-sidebar">
                <div className="sidebar-label">Today</div>
                {icp.meetings.map(m => (
                  <button
                    key={m.id}
                    className={`sidebar-item${activeMeetingId === m.id ? ' active' : ''}`}
                    style={{ '--active-color': icp.color }}
                    onClick={() => { setActiveMeetingId(m.id); setTypedEmail(''); setEmailTyping(false); }}
                  >
                    <div className="sidebar-item-time">{m.time.split(',')[0]}</div>
                    <div className="sidebar-item-title">{m.title}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="sidebar-item-tag">{m.tag}</span>
                      {m.done && <div className="sidebar-completed-dot" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Content pane */}
              <div className="app-content">
                {/* Brief Card */}
                <div
                  className={`brief-card${briefHighlighted ? ' highlighted' : ''}`}
                  style={{
                    '--highlight-color': icp.color,
                    '--highlight-rgb': icp.rgb,
                    '--accent-color': icp.color
                  }}
                >
                  <div className="brief-card-header">
                    <div className="brief-card-label" style={{ color: icp.color }}>
                      <Sparkles size={10} /> Pre-Meeting Brief
                    </div>
                    <span className="badge badge-success" style={{ fontSize: 8 }}>COMPILED</span>
                  </div>
                  <div>
                    <div className="brief-title">{icp.brief.title}</div>
                    <div className="brief-participants">
                      <User size={10} /> {icp.brief.participants}
                    </div>
                  </div>
                  <div className="brief-rows">
                    <div>
                      <span className="brief-row-label">Where we left off</span>
                      <div className="brief-row-value">{icp.brief.lastLeft}</div>
                    </div>
                    <div>
                      <span className="brief-row-label">Critical context</span>
                      <div className="brief-row-value accent">{icp.brief.critical}</div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="email-card">
                  <div className="email-card-header">
                    <div className="brief-card-label">
                      <Mail size={10} /> Compounded Follow-up
                    </div>
                    <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Draft Status</span>
                  </div>
                  {(emailTyping || typedEmail) ? (
                    <div>
                      <div className="email-subject-line">Subject: {icp.email.subject}</div>
                      <div className="email-body">{typedEmail || 'Generating draft...'}</div>
                      <div className="email-footer">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={10} /> Auto-syncing to CRM
                        </span>
                        <button className="email-clear-btn" onClick={() => { setTypedEmail(''); setEmailTyping(false); }}>Clear Draft</button>
                      </div>
                    </div>
                  ) : (
                    <div className="email-placeholder">
                      <Mail size={22} color="var(--text-muted)" />
                      <p>Follow-up generates on meeting completion</p>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleAction('email')}>
                        <Zap size={10} style={{ color: icp.color }} /> Generate Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Blog Post */}
        <div className="blog-panel">
          {/* Stats */}
          <div className="stats-row">
            {icp.stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-card-value" style={{ color: icp.color }}>{s.val}</div>
                <div className="stat-card-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Article */}
          <div className="article-card">
            <div className="article-glow" style={{ background: icp.color }} />

            {/* Author */}
            <div className="article-author">
              <div className="author-avatar" style={{ color: icp.color, borderColor: icp.color, background: `rgba(${icp.rgb}, 0.06)` }}>
                {icp.initials}
              </div>
              <div>
                <div className="author-name">{icp.name}</div>
                <div className="author-role">{icp.role}</div>
              </div>
            </div>

            <div className="article-headline">"{icp.headline}"</div>
            <div className="article-tagline">{icp.tagline}</div>

            {/* Content blocks */}
            <div className="article-body">
              {icp.blogBlocks.map((block, i) => {
                if (block.type === 'text') return <p key={i} className="article-text">{block.content}</p>;
                if (block.type === 'action') return (
                  <div
                    key={i}
                    className="interactive-link"
                    onClick={() => handleAction(block.action, block.target)}
                  >
                    <div>
                      <div className="interactive-link-label" style={{ color: icp.color }}>
                        <Sparkles size={9} /> Interactive Demo Link
                      </div>
                      <div className="interactive-link-text">"{block.text}"</div>
                    </div>
                    <div className="interactive-link-btn">
                      {block.label} →
                    </div>
                  </div>
                );
                return null;
              })}
            </div>

            <div className="article-callout">
              <div className="callout-title" style={{ color: icp.color }}>
                <Zap size={11} /> Why this catches attention
              </div>
              <p className="callout-text">
                By placing the SaaS dashboard side-by-side with the pain narrative, readers don't just read — they click references inside the story and watch the UI update in real-time. It connects emotional relief with visual clarity of the product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
