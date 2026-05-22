import React, { useState } from 'react';
import { Clock, Sparkles, Zap, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const TIMELINE = {
  founder: {
    color: 'var(--founder-color)', rgb: '6,182,212',
    title: "Sarah Chen — Founder's Daily Compounding Cycle",
    pain: 'Struggled to recall investor feedback between back-to-back pitches.',
    steps: [
      {
        time: '9:00 AM', event: 'René Capital Pitch Call',
        before: 'Recalled Evelyn\'s concerns: "LATAM engineering velocity & gross margins at 76%". Brief pushed 30s before call.',
        during: 'Captured transcript. Auto-flagged LATAM compensation logistics & 22-day hiring lead time.',
        after: 'Synthesized clean Series A proposal. Drafted hyper-personalized email follow-up with specific data.',
        highlight: 'Evelyn focused on infra; margins target 76%',
        tags: ['#SeriesA', '#ReneCapital', '#LatAm']
      },
      {
        time: '1:00 PM', event: 'BlueRidge Capital Intro Sync',
        before: 'No previous history. Synced LinkedIn: BlueRidge focuses on SaaS dev tools. Flagged their API scaling article.',
        during: 'Liam mentioned wanting a developer-first console. Flagged potential DevRel intro needed.',
        after: 'Drafted introduction template to Vercel Head of DevRel. Logged pipeline card in HubSpot.',
        highlight: 'BlueRidge focus: dev tools integration',
        tags: ['#BlueRidge', '#Pipeline', '#DevTools']
      },
      {
        time: '4:30 PM', event: 'Product LatAm Roadmap Review',
        before: 'Extracted LATAM hiring details from 9 AM pitch. Pushed notes on compensation routing to VP Engineering.',
        during: 'Agreed on 14 engineer hires Q3. Lead time target 22 days to secure Series A margin targets.',
        after: 'Updated company handbook with scaling timeline. Created 3 Jira tickets for localized comp structures.',
        highlight: 'Jira tickets created for LatAm comp routing',
        tags: ['#Internal', '#LatAm', '#Hiring']
      }
    ]
  },
  investor: {
    color: 'var(--investor-color)', rgb: '139,92,246',
    title: "Alex Mercer — GP's Compound Portfolio Flow",
    pain: 'Founders got generic replies because deal metrics and promised intros were lost in pipeline haze.',
    steps: [
      {
        time: '10:00 AM', event: 'Apex AI Series A Evaluation',
        before: 'Recalled: Apex at $1.2M ARR, 14% MoM. Liam is 2nd-time founder. Flagged promised DevRel intro.',
        during: 'Liam walked through serverless console architecture. Discussed developer community bottleneck.',
        after: 'Instantly cc\'d Sarah Jenkins (ex-Vercel DevRel). Logged metrics inside pipeline dashboard.',
        highlight: 'Sarah Jenkins DevRel introduction triggered',
        tags: ['#ApexAI', '#SeriesA', '#Pipeline']
      },
      {
        time: '2:00 PM', event: 'Helios Climate Tech Update',
        before: 'Recalled Helios carbon offset tracker v1.2 launch. Flagged compliance concerns with EU regulations.',
        during: 'Helios shared regulatory certification timeline. Highlighted carbon credit buyer leads needed.',
        after: 'Drafted EU compliance overview for advisory board. Marked 2 corporate buyer leads for outreach.',
        highlight: 'EU Compliance roadmap logged',
        tags: ['#Helios', '#Portfolio', '#Climate']
      },
      {
        time: '5:30 PM', event: 'Quarterly LP Presentation Dry-run',
        before: 'Compiled pipeline performance: 52 active deals. Synthesized ARR progress across core portfolio.',
        during: 'Addressed LP questions on developer tool margins and climate tech growth metrics.',
        after: 'Prepared structured LP follow-up brief. Auto-generated slide updates showing dev tools ARR velocity.',
        highlight: '52 active deals data compiled',
        tags: ['#LP', '#Quarterly', '#Portfolio']
      }
    ]
  },
  recruiter: {
    color: 'var(--recruiter-color)', rgb: '16,185,129',
    title: "Marcus Thorne — Empathy-First Screening Loop",
    pain: 'Lost key candidate motivators, leading to generic experience and missed principal hires.',
    steps: [
      {
        time: '11:00 AM', event: "Dan K. — Principal Candidate Screen",
        before: '12yrs Go/Rust experience. PersonaOn alert: candidate prioritizes remote-first, hates RTO mandates.',
        during: 'Dan highlighted passion for PostgreSQL database sharding and async working models.',
        after: 'Drafted custom brief for VP Engineering. Offer email detailing sharding and async environment.',
        highlight: 'Database sharding project highlighted',
        tags: ['#DanK', '#Interview', '#Backend']
      },
      {
        time: '3:00 PM', event: 'Hiring Manager Calibration Sync',
        before: 'Pulled Dan K. details: database sharding focus, remote priority. Flagged technical questions.',
        during: 'VP Engineering approved database sharding scope. Agreed to fast-track technical round.',
        after: 'Auto-scheduled tech round. Pushed Dan\'s custom requirements to interviewer dashboard.',
        highlight: 'VP approved sharding ownership scope',
        tags: ['#Alignment', '#Internal', '#Calibration']
      },
      {
        time: '4:30 PM', event: 'Offer Call — Lisa (Product Manager)',
        before: 'Recalled: Lisa wants cross-functional leadership scope, transitioning from legacy fintech to agile SaaS.',
        during: 'Lisa expressed excitement about roadmap. Agreed on target compensation structure.',
        after: 'Generated high-fidelity PM contract template. Candidate closed successfully.',
        highlight: 'Product Manager candidate closed',
        tags: ['#Lisa', '#OfferStage', '#PM']
      }
    ]
  },
  operator: {
    color: 'var(--operator-color)', rgb: '245,158,11',
    title: "Elena Rostova — Cross-Team Operational Matrix",
    pain: 'Action items from vendor talks and database migrations slipped between product and ops reviews.',
    steps: [
      {
        time: '8:30 AM', event: 'AWS Cost Optimization Review',
        before: 'Recalled 12% compute cost target. Flagged June 15 renewal constraint for reserved instances.',
        during: 'Agreed on DB migrations to US-East-1. Finance approved migration budget allocations.',
        after: 'Generated step-by-step DB migration checklist. Prepared Cloud Ops project workspace.',
        highlight: 'US-East migration checklist extracted',
        tags: ['#AWS', '#Infrastructure', '#CostOpt']
      },
      {
        time: '1:30 PM', event: 'Engineering Resource Calibration',
        before: 'Pulled AWS DB migration details. Flagged June 15 constraint to VP Engineering.',
        during: 'VP assigned cloud engineers to test DB replication off-peak. Flagged testing downtime risk.',
        after: 'Prepared notification banner for testing schedule. Updated AWS migration sprint in Jira.',
        highlight: 'Off-peak replication testing scheduled',
        tags: ['#Engineering', '#Migration', '#Internal']
      },
      {
        time: '4:00 PM', event: 'Grid Vendor Contract Negotiation',
        before: 'Recalled legacy software licensing rates. Highlighted 15% pricing discount target criteria.',
        during: 'Negotiated enterprise tier discounts. Agreed on localized rates for off-site audits.',
        after: 'Drafted finalized vendor licensing amendment. Shared billing timeline updates with finance.',
        highlight: 'Finalized licensing terms sent',
        tags: ['#Vendor', '#Procurement', '#Contract']
      }
    ]
  }
};

export default function ApproachC() {
  const [activeIcp, setActiveIcp] = useState('founder');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activePhase, setActivePhase] = useState('before');

  const tl = TIMELINE[activeIcp];
  const step = tl.steps[activeStepIdx];

  const handleIcpChange = (key) => {
    setActiveIcp(key);
    setActiveStepIdx(0);
    setActivePhase('before');
  };

  const PHASES = [
    { id: 'before', label: '1. Pre-Meeting', dot: '#06b6d4' },
    { id: 'during', label: '2. Call Intercept', dot: '#ef4444' },
    { id: 'after', label: '3. After Impact', dot: '#10b981' }
  ];

  const waveHeights = [40, 70, 25, 90, 60, 35, 100, 80, 45, 20, 65, 95, 30, 55, 75, 28, 15, 50];

  return (
    <div>
      {/* ICP Tabs */}
      <div className="icp-tabs">
        {Object.entries(TIMELINE).map(([key, data]) => (
          <button
            key={key}
            className={`icp-tab${activeIcp === key ? ' active' : ''}`}
            style={activeIcp === key ? { color: data.color, borderColor: data.color } : {}}
            onClick={() => handleIcpChange(key)}
          >
            <span className="icp-tab-dot" style={{ background: data.color }} />
            {key.toUpperCase()} Cycle
          </button>
        ))}
      </div>

      <div className="timeline-layout">
        {/* LEFT: Timeline card */}
        <div className="timeline-card" style={{ boxShadow: `0 20px 40px -15px rgba(${tl.rgb}, 0.1)` }}>
          <div className="timeline-card-header">
            <div className="timeline-card-label">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
              System Companion Active
            </div>
            <div className="timeline-card-title">{tl.title}</div>
            <div className="timeline-card-pain">{tl.pain}</div>
          </div>

          <div className="timeline-nodes">
            <div className="timeline-connector" style={{ '--line-color': tl.color }} />
            {tl.steps.map((s, i) => (
              <div
                key={i}
                className={`timeline-node-item${activeStepIdx === i ? ' active' : ''}`}
                style={{ '--node-color': tl.color, '--node-rgb': tl.rgb }}
                onClick={() => { setActiveStepIdx(i); setActivePhase('before'); }}
              >
                <div className="timeline-node-dot">
                  <Clock size={13} style={{ color: activeStepIdx === i ? tl.color : 'var(--text-muted)' }} />
                  <div className="timeline-node-time">{s.time}</div>
                </div>
                <div className="timeline-node-content">
                  <div className="timeline-node-title">{s.event}</div>
                  <div className="timeline-node-excerpt">"{s.before.slice(0, 70)}..."</div>
                  <div className="timeline-node-tag">
                    {s.done !== false && <span className="timeline-status-dot" />}
                    <Sparkles size={8} /> {s.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="timeline-footer-hint">
            <Sparkles size={12} style={{ color: tl.color, flexShrink: 0 }} />
            Each timeline node maps an active meeting that feeds the centralized memory engine.
          </div>
        </div>

        {/* RIGHT: Stage panel */}
        <div className="stage-panel">
          <div className="stage-panel-header">
            <div>
              <div className="stage-panel-label">Real-time workflow interception</div>
              <div className="stage-panel-event">{step.event}</div>
            </div>
            <div className="stage-panel-counter">Node {activeStepIdx + 1}/3</div>
          </div>

          {/* Phase selector */}
          <div className="phase-tabs">
            {PHASES.map(p => (
              <button
                key={p.id}
                className={`phase-tab${activePhase === p.id ? ' active' : ''}`}
                onClick={() => setActivePhase(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Content by phase */}
          <div className="stage-content">
            {activePhase === 'before' && (
              <>
                <div className="stage-phase-title">
                  <div className="stage-phase-dot" style={{ background: tl.color }} />
                  The 30-Second Pre-Call Sync
                </div>
                <div className="stage-body">{step.before}</div>
                <div className="stage-tags">
                  <div className="stage-tags-label">Extracted memory tags</div>
                  <div className="stage-tags-list">
                    <span className="stage-tag">{step.time}</span>
                    {step.tags.map((t, i) => <span key={i} className="stage-tag">{t}</span>)}
                  </div>
                </div>
              </>
            )}

            {activePhase === 'during' && (
              <>
                <div className="stage-phase-title">
                  <div className="stage-phase-dot" style={{ background: '#ef4444', animation: 'pulse-glow 1.5s infinite' }} />
                  Silent Semantic Capture
                </div>
                <div className="stage-body">{step.during}</div>
                <div className="waveform">
                  <div className="waveform-label">Audio Transcript Processing</div>
                  <div className="waveform-bars">
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="waveform-bar"
                        style={{
                          height: `${h}%`,
                          background: i % 2 === 0 ? tl.color : 'rgba(0,0,0,0.1)',
                          opacity: 0.85
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activePhase === 'after' && (
              <>
                <div className="stage-phase-title">
                  <div className="stage-phase-dot" style={{ background: '#10b981' }} />
                  Automated Compounding Follow-up
                </div>
                <div className="stage-body">{step.after}</div>
                <div className="stage-checklist">
                  <div className="stage-check-item">
                    <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
                    CRM record logging completed
                  </div>
                  <div className="stage-check-item">
                    <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
                    Follow-up draft generated
                  </div>
                  <div className="stage-check-item">
                    <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
                    Memory index updated
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Node nav */}
          <div className="stage-nav">
            <button
              className="btn btn-ghost btn-sm"
              style={{ opacity: activeStepIdx === 0 ? 0.35 : 1 }}
              disabled={activeStepIdx === 0}
              onClick={() => { setActiveStepIdx(p => p - 1); setActivePhase('before'); }}
            >
              <ChevronLeft size={12} /> Previous
            </button>
            <div className="stage-dots">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`stage-dot${activeStepIdx === i ? ' active' : ''}`}
                  style={activeStepIdx === i ? { background: tl.color } : {}}
                />
              ))}
            </div>
            <button
              className="btn btn-ghost btn-sm"
              style={{ opacity: activeStepIdx === 2 ? 0.35 : 1 }}
              disabled={activeStepIdx === 2}
              onClick={() => { setActiveStepIdx(p => p + 1); setActivePhase('before'); }}
            >
              Next <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
