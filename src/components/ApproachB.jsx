import React, { useState } from 'react';
import { Sparkles, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const EDITORIAL = {
  founder: {
    name: 'Sarah Chen', initials: 'SC',
    company: 'Synthia AI', role: 'Founder & CEO',
    color: 'var(--founder-color)', rgb: '6,182,212',
    headline: 'Scaling Synthetic APIs without losing the human connection',
    quote: 'Our seed check was secured because we remembered a single LATAM engineering cohort metric Evelyn asked about in a passing Zoom 4 weeks earlier.',
    statPrimary: { val: '$4.2M', label: 'Funding Secured' },
    metrics: [
      { val: '0 min', label: 'Time on CRM Logs' },
      { val: '30s', label: 'Investor Prep/Call' }
    ],
    chaosNotes: `Rene Cap Pitch notes
- Evelyn liked the tech graph slide 12
- scaling velocity? she asked about hiring latency or speed. LatAm?
- send her the engineering sheets by friday?? or next week.
- margin is 70 something percent — check with engineering
- follow up on pricing model. did she ask about Stripe too?`,
    clearBrief: {
      title: 'René Capital Series A Prep',
      items: [
        'Evelyn Vance (GP) focuses on API margins — target 76%.',
        'Last left off: Evelyn asked about LatAm engineering velocity scaling.',
        'Action: Deliver the 3-year LatAm compensation routing spreadsheet.'
      ],
      draft: "Hi Evelyn, here's the LatAm hub scaling analysis we discussed, confirming 76% margin targets..."
    }
  },
  investor: {
    name: 'Alex Mercer', initials: 'AM',
    company: 'Veloce Ventures', role: 'Managing Partner',
    color: 'var(--investor-color)', rgb: '139,92,246',
    headline: 'Managing a 50-deal pipeline with flawless context retention',
    quote: 'Deals blend when you hear 8 pitches a day. But a founder knows instantly if you actually remember their bottlenecks — or if you\'re reading from a sheet.',
    statPrimary: { val: '52', label: 'Active Deals' },
    metrics: [
      { val: '99.4%', label: 'Context Accuracy' },
      { val: '45', label: 'Meetings/Week' }
    ],
    chaosNotes: `Apex AI notes
- Liam K solid dev. ARR is 1.2M? or wait — was that his last company?
- He mentioned 14% growth. Check ARR.
- DevRel bottleneck. He needs an intro. Who did I promise?
- Was it Sarah Jenkins at Vercel or someone else?
- Next call starting. Write Liam back later.`,
    clearBrief: {
      title: 'Apex AI Series A Evaluation',
      items: [
        'Liam K (CEO) growing Apex serverless tools 14% MoM — $1.2M ARR.',
        'Last left off: Developer relations scaling is core engineering bottleneck.',
        'Promise logged: Intro to Sarah Jenkins (ex-Vercel Head of DevRel).'
      ],
      draft: "Hi Liam, cc'ing Sarah Jenkins (ex-Vercel DevRel) here — she can help with your DevRel scaling..."
    }
  },
  recruiter: {
    name: 'Marcus Thorne', initials: 'MT',
    company: 'ScaleUp Corp', role: 'Head of Talent',
    color: 'var(--recruiter-color)', rgb: '16,185,129',
    headline: 'How custom empathy converted a principal developer in 4 hours',
    quote: 'Top-tier talent gets recruited by dozens of teams a week. Empathy isn\'t a template. It\'s recalling exactly what they want from their career.',
    statPrimary: { val: '+22%', label: 'Offer Acceptance' },
    metrics: [
      { val: '25m', label: 'Avg Screen Time' },
      { val: '45s', label: 'Offer Draft Speed' }
    ],
    chaosNotes: `Dan K candidate notes
- Dan is good backend dev. Rust and Go.
- Doesn't like return to office. Wants remote.
- Wants to work on databases. Sharding? PostgreSQL scaling.
- What was Dan's exact motivation?
- He had a bad manager? Or compensation?
- Need to copy this to the recruitment system.`,
    clearBrief: {
      title: 'Dan K. — Principal Backend Candidate Screen',
      items: [
        '12 years distributed systems (Go/Rust/K8s). Architectural fit for data pipeline.',
        'Last left off: Frustrated with RTO mandate. Values remote autonomy highly.',
        'Hook: Wants ownership of PostgreSQL sharding and read-replica architecture.'
      ],
      draft: 'Hi Dan, confirming 100% remote-first and you\'d have full architectural ownership of our database sharding...'
    }
  },
  operator: {
    name: 'Elena Rostova', initials: 'ER',
    company: 'Grid Systems', role: 'Chief Operating Officer',
    color: 'var(--operator-color)', rgb: '245,158,11',
    headline: 'Eliminating operating overhead by turning meetings into searchable networks',
    quote: 'When vendor details and database migration timelines get buried in scattered notes, execution halts. PersonaOn made our syncs 15 minutes instead of 60.',
    statPrimary: { val: '-30%', label: 'Meeting Overhead' },
    metrics: [
      { val: '98%', label: 'Task Follow-up Rate' },
      { val: '2h', label: 'Weekly Sync Total' }
    ],
    chaosNotes: `AWS enterprise costs meeting
- Cloud ops: migrate database to East region, saves 12% compute.
- Finance wants reserved instances PO signed by June 1? Or June 15?
- Contract renewal is June 15. Migration must finish before.
- Need to tell engineering to run off-peak tests.
- Put in Jira or Slack? Will check next week.`,
    clearBrief: {
      title: 'AWS Enterprise Review & Cloud Ops Sync',
      items: [
        'Transitioning active DB pools to US-East-1 reserved instances for 12% cost savings.',
        'Hard constraint: Migration must complete before June 15 contract renewal for 20% discount.',
        'Action graph: Cloud Ops sets up instances by Friday; Engineering runs off-peak migration tests.'
      ],
      draft: 'Hi Team, here are the DB migration action items to unlock our 20% discount tier by June 15...'
    }
  }
};

export default function ApproachB() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [notesView, setNotesView] = useState('chaos');
  const [emailView, setEmailView] = useState('before');

  const ed = EDITORIAL[activeIcp];

  const handleIcpChange = (key) => {
    setActiveIcp(key);
    setNotesView('chaos');
    setEmailView('before');
  };

  return (
    <div>
      {/* ICP Tabs */}
      <div className="icp-tabs">
        {Object.entries(EDITORIAL).map(([key, data]) => (
          <button
            key={key}
            className={`icp-tab${activeIcp === key ? ' active' : ''}`}
            style={activeIcp === key ? { color: data.color, borderColor: data.color } : {}}
            onClick={() => handleIcpChange(key)}
          >
            <span className="icp-tab-dot" style={{ background: data.color }} />
            {data.name}
            <span className="icp-tab-sub">({data.company})</span>
          </button>
        ))}
      </div>

      {/* Editorial Layout */}
      <div className="editorial-layout">
        {/* LEFT: Profile Card */}
        <div className="editorial-profile-card" style={{ boxShadow: `0 20px 40px -12px rgba(${ed.rgb}, 0.1)` }}>
          <div>
            <span className="badge" style={{ background: `rgba(${ed.rgb}, 0.08)`, color: ed.color, border: `1px solid rgba(${ed.rgb}, 0.2)`, fontSize: 9, marginBottom: 14, display: 'inline-flex' }}>
              ICP Testimonial
            </span>
            <div className="editorial-profile-avatar" style={{ color: ed.color, borderColor: ed.color, background: `rgba(${ed.rgb}, 0.05)` }}>
              {ed.initials}
            </div>
          </div>
          <div>
            <div className="editorial-profile-name">{ed.name}</div>
            <div className="editorial-profile-role">{ed.role}<br />{ed.company}</div>
          </div>

          <div className="editorial-metrics">
            <div className="editorial-metric">
              <div className="editorial-metric-val" style={{ color: ed.color }}>{ed.statPrimary.val}</div>
              <div className="editorial-metric-label">{ed.statPrimary.label}</div>
            </div>
            {ed.metrics.map((m, i) => (
              <div className="editorial-metric" key={i}>
                <div className="editorial-metric-val">{m.val}</div>
                <div className="editorial-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="editorial-quote">
            <div className="editorial-quote-mark">"</div>
            <p className="editorial-quote-text">{ed.quote}</p>
          </div>
        </div>

        {/* RIGHT: Article */}
        <div className="editorial-article">
          <div className="editorial-meta">
            <span style={{ color: ed.color, fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Editorial Series</span>
            <span className="sep">•</span>
            <span>4 min read</span>
            <span className="sep">•</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>Compounding Workflows</span>
          </div>

          <h1 className="editorial-headline">{ed.headline}</h1>

          <p className="editorial-text">
            "We've all been there. It's 5:30 PM, your last Zoom just ended, and your notepad is full of scribbles that make zero sense out of context. When you're rushing to close deals, sign candidates, or coordinate projects, capturing actual context is the first thing that breaks."
          </p>

          {/* Toggle Block 1: Notes Chaos vs Clear */}
          <div className="toggle-block">
            <div className="toggle-block-header">
              <span className="toggle-block-label">Interactive Context Contrast</span>
              <div className="toggle-block-tabs">
                <button
                  className={`toggle-tab${notesView === 'chaos' ? ' active-chaos' : ''}`}
                  onClick={() => setNotesView('chaos')}
                >
                  ✕ Raw Chaos
                </button>
                <button
                  className={`toggle-tab${notesView === 'clear' ? ' active-clear' : ''}`}
                  onClick={() => setNotesView('clear')}
                >
                  ✓ Compounded Brief
                </button>
              </div>
            </div>
            <div className="toggle-block-body">
              {notesView === 'chaos' ? (
                <div className="chaos-notes">
                  <span className="chaos-badge"><span className="badge badge-error" style={{ fontSize: 8 }}>Unstructured Draft</span></span>
                  {ed.chaosNotes}
                </div>
              ) : (
                <div className="clear-brief">
                  <div className="clear-brief-header">
                    <div className="clear-brief-title" style={{ color: ed.color }}>
                      <Sparkles size={10} /> {ed.clearBrief.title}
                    </div>
                    <span className="badge badge-success" style={{ fontSize: 8 }}>SYNTHESIZED</span>
                  </div>
                  <ul className="clear-brief-list">
                    {ed.clearBrief.items.map((item, i) => (
                      <li key={i}>
                        <div className="clear-brief-bullet" style={{ background: ed.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <p className="editorial-text">
            "For months I suffered through the notes, spent evenings writing follow-up emails from memory, and hoped I'd remembered something critical. When PersonaOn began compiling our briefs, the tool captured transcripts silently, extracted structured context, and delivered pre-meeting alerts of exactly what needed attention."
          </p>

          {/* Toggle Block 2: Manual vs PersonaOn Follow-up */}
          <div className="toggle-block">
            <div className="toggle-block-header">
              <span className="toggle-block-label">Follow-Up Email Efficiency</span>
              <div className="toggle-block-tabs">
                <button
                  className={`toggle-tab${emailView === 'before' ? ' active-manual' : ''}`}
                  onClick={() => setEmailView('before')}
                >
                  Manual (9 PM)
                </button>
                <button
                  className={`toggle-tab${emailView === 'after' ? ' active-persona' : ''}`}
                  onClick={() => setEmailView('after')}
                >
                  <Zap size={9} /> PersonaOn (Instant)
                </button>
              </div>
            </div>
            <div className="toggle-block-body">
              {emailView === 'before' ? (
                <div className="manual-placeholder">
                  <span style={{ fontSize: 28 }}>☕</span>
                  <p>"Staring at a blank Outlook tab for 15 minutes trying to structure a warm follow-up without sounding generic. Usually takes 12–15 minutes per email."</p>
                  <span className="manual-placeholder-sub">Mental strain rate: High</span>
                </div>
              ) : (
                <div className="persona-draft">
                  <div className="persona-draft-row">
                    <span>TO: Contact Partner / Lead Candidate</span>
                    <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
                      <CheckCircle2 size={10} /> Ready to send
                    </span>
                  </div>
                  <div className="persona-draft-body">{ed.clearBrief.draft}</div>
                  <div className="persona-source">
                    <Sparkles size={9} style={{ color: ed.color }} />
                    Structured directly from call context
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="editorial-text">
            "We closed our cycle with unprecedented efficiency. Not because I worked harder, but because we stopped letting hard-won meeting context die in scattered docs. Our calls now compound into real, searchable memory."
          </p>

          {/* CTA */}
          <div className="editorial-cta" style={{ borderColor: `rgba(${ed.rgb}, 0.3)` }}>
            <div>
              <div className="editorial-cta-title">Experience this compounding memory</div>
              <div className="editorial-cta-sub">See how PersonaOn fits your industry workflow.</div>
            </div>
            <button className="btn btn-ghost btn-sm">
              Explore Integration <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
