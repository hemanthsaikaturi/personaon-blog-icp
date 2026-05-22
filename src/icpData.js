// Shared ICP data used by all blog section approaches

export const ICP_DATA = {
  founder: {
    key: 'founder',
    name: 'Sarah Chen',
    initials: 'SC',
    title: 'Founder & CEO',
    company: 'Synthia AI',
    industry: 'AI SaaS',
    color: '#06b6d4',
    rgb: '6,182,212',
    glow: 'rgba(6,182,212,0.12)',
    tagColor: '#0e7490',
    tagBg: 'rgba(6,182,212,0.08)',

    // Core story
    headline: 'I was raising Series A across 45 meetings. By week two, all the investor names had blurred.',
    pain: 'Running 8–10 pitch calls daily during fundraising. By evening, every partner had merged into a single blur of follow-up promises and scribbled notes I couldn\'t decode.',
    benefit: 'PersonaOn compiles a 30-second pre-meeting brief from everything that was ever said about that investor — their focus, their concerns, where we left off. I walk in every call like I only had that one meeting all week.',
    outcome: '$4.2M Series A closed. Investor said: "You remember every detail we discussed — that\'s rare in a founder."',

    // The specific meeting
    meetingWith: 'Evelyn Vance, GP at René Capital',
    meetingContext: 'Series A lead check — 3rd call after initial pitch',
    personaonBrief: {
      context: 'Evelyn leads infrastructure-focused investments. Technical background, highly analytical. Has been tracking Synthia since YC batch.',
      lastLeftOff: 'Call 2 focused on API margins (Synthia at 76% gross margin). Evelyn flagged concern about LATAM engineering velocity — specifically how quickly you can scale headcount without margin compression.',
      watchFor: 'She will ask about the 3-year LATAM comp routing model. Have the slide ready.',
      sentiment: 'Positive with active open questions'
    },
    icpSays: [
      { time: '8:52 AM', msg: 'I have the René Capital call in 8 mins. I genuinely cannot remember if Evelyn asked about LATAM hiring or the pricing model in our last call.' },
      { time: '8:53 AM', msg: 'PersonaOn brief just appeared. She asked about LATAM hiring velocity AND margin compression. It even flagged she\'ll probably bring up our comp routing model.' },
      { time: '9:47 AM', msg: 'Called it exactly. She asked about the LatAm model first thing. I had the slide up before she finished the sentence.' },
    ],
    chaosNotes: `Rene Cap - Call 2 notes
- Evelyn liked the graph? or was it the team slide
- LATAM hiring something... ask about velocity or speed?
- Margin is 70-something %, check with CFO
- Follow up on pricing. Or was it the API model she asked about?
- Send her the spreadsheet by friday??? which spreadsheet`,
    stats: [{ val: '$4.2M', label: 'Funding Closed' }, { val: '45', label: 'Pitch Meetings' }, { val: '30s', label: 'Prep Per Call' }],
    calendarDay: [
      { time: '8:30', event: 'Partner sync - Sequoia', status: 'captured', story: 'Reviewed product roadmap concerns. PersonaOn logged their focus on enterprise go-to-market.' },
      { time: '9:00', event: 'René Capital (Evelyn)', status: 'captured', story: 'The call that changed the raise. PersonaOn\'s brief surfaced the LatAm velocity question before Evelyn asked it.' },
      { time: '11:00', event: 'BlueRidge Capital intro', status: 'captured', story: 'First meeting. PersonaOn pre-loaded their portfolio focus from public sources.' },
      { time: '2:00', event: 'Board prep call', status: 'pending', story: '' },
      { time: '4:30', event: 'LatAm roadmap review', status: 'captured', story: 'PersonaOn auto-extracted the LATAM hiring targets from the René call into this one.' },
    ]
  },

  investor: {
    key: 'investor',
    name: 'Alex Mercer',
    initials: 'AM',
    title: 'Managing Partner',
    company: 'Veloce Ventures',
    industry: 'Venture Capital',
    color: '#8b5cf6',
    rgb: '139,92,246',
    glow: 'rgba(139,92,246,0.12)',
    tagColor: '#6d28d9',
    tagBg: 'rgba(139,92,246,0.08)',

    headline: 'I manage 52 active deals. I used to forget what I promised founders by the next morning.',
    pain: 'Back-to-back pitch sessions blur metrics, names, and promises. I once told two different founders I\'d make the same intro — because I\'d forgotten I\'d already committed.',
    benefit: 'PersonaOn surfaces every promise, every metric, every question from every founder in a single 30-second pre-call snapshot. I never double-commit, never forget a milestone, and every founder thinks I have perfect recall.',
    outcome: 'Apex AI closed $3M with us. Liam said the intro we sent was "the exact person we needed." We\'d logged that promise 3 weeks earlier.',

    meetingWith: 'Liam K., Founder & CEO at Apex AI',
    meetingContext: 'Series A pipeline — 3rd evaluation call',
    personaonBrief: {
      context: 'Liam is a 2nd-time founder (exited MeshDB in 2022). High technical depth. Apex builds serverless developer tooling — $1.2M ARR growing 14% MoM.',
      lastLeftOff: 'Discussed developer community bottleneck — Apex lacks a dedicated DevRel lead to drive top-of-funnel developer adoption.',
      watchFor: 'You promised to intro Liam to Sarah Jenkins (ex-Vercel Head of DevRel) on the last call. He will expect this update.',
      sentiment: 'High conviction — move to term sheet discussion today'
    },
    icpSays: [
      { time: '9:58 AM', msg: 'Apex AI call in 2 mins. I have absolutely no memory of what I promised Liam last time. Was it an intro? A reference call?' },
      { time: '9:59 AM', msg: 'PersonaOn: you promised the Vercel DevRel intro. Also, they hit $1.2M ARR at 14% MoM. Move to term sheet.' },
      { time: '10:52 AM', msg: 'Sent the intro live on the call. Liam looked genuinely surprised. We\'re sending a term sheet Thursday.' },
    ],
    chaosNotes: `Apex AI notes - week 3
- Liam solid founder. 2nd time? check
- ARR is 1.2M... or was that his last company?
- DevRel bottleneck he keeps mentioning
- Did I promise to intro him to someone? Sarah something?
- Need to move faster, check conviction notes
- Term sheet? Wait for next call.`,
    stats: [{ val: '52', label: 'Active Deals' }, { val: '0', label: 'Broken Promises' }, { val: '15h', label: 'Weekly Hours Saved' }],
    calendarDay: [
      { time: '9:00', event: 'Apex AI (Liam K.)', status: 'captured', story: 'The call PersonaOn saved — surfaced the DevRel promise that sealed the deal.' },
      { time: '10:30', event: 'Helios Climate Tech', status: 'captured', story: 'Portfolio check-in. PersonaOn recalled EU compliance concerns from 6 weeks prior.' },
      { time: '12:00', event: 'LP Quarterly Update', status: 'captured', story: 'PersonaOn compiled portfolio ARR metrics across 52 deals automatically.' },
      { time: '3:00', event: 'New pitch — Orbit Health', status: 'pending', story: '' },
      { time: '5:00', event: 'IC meeting', status: 'pending', story: '' },
    ]
  },

  recruiter: {
    key: 'recruiter',
    name: 'Marcus Thorne',
    initials: 'MT',
    title: 'Head of Talent',
    company: 'ScaleUp Corp',
    industry: 'Tech Recruitment',
    color: '#10b981',
    rgb: '16,185,129',
    glow: 'rgba(16,185,129,0.12)',
    tagColor: '#047857',
    tagBg: 'rgba(16,185,129,0.08)',

    headline: 'We had a +22% lift in offer acceptance after I stopped writing generic follow-up emails.',
    pain: 'Screening 35 candidates a week, I\'d mix up who wanted remote work vs. in-person, who cared about ownership vs. compensation, who mentioned leaving a toxic manager. Generic follow-ups were killing our offer rate.',
    benefit: 'PersonaOn captures every nuance — a candidate\'s exact career motivator, the manager situation they escaped, what architecture they want to own. My follow-ups now reference things candidates said in passing that they\'d forgotten they said.',
    outcome: 'Dan accepted in 4 hours. He told three colleagues: "They actually listened." Two of them applied.',

    meetingWith: 'Dan K., Principal Backend Engineer',
    meetingContext: 'First technical screen — Principal Backend role',
    personaonBrief: {
      context: 'Dan has 12 years distributed systems experience (Go, Rust, PostgreSQL, Kubernetes). Strong OSS contributor. Currently miserable at CorpTech due to sudden RTO mandate.',
      lastLeftOff: 'First contact via LinkedIn. Dan mentioned he\'s exploring quietly — doesn\'t want his current manager to know.',
      watchFor: 'His non-negotiables: 100% async-first culture, and he wants architectural ownership over database sharding — not just implementation. Confirm both explicitly.',
      sentiment: 'Interested but cautious — needs trust built'
    },
    icpSays: [
      { time: '10:58 AM', msg: 'Dan K. screen in 2 mins. I spoke to 8 engineers this week — I\'m blanking on what his specific deal was.' },
      { time: '10:59 AM', msg: 'PersonaOn: He needs 100% async + sharding ownership. He\'s hiding this search from his manager. Don\'t reference his company by name.' },
      { time: '11:48 AM', msg: 'He said "you actually get what I\'m looking for" at the end. Sending the offer tonight with the exact project scope he described.' },
    ],
    chaosNotes: `Dan K - backend screen notes
- Strong Go and Rust. Good OSS stuff.
- Doesn't want to go back to office... or was that Jordan?
- He wants to build databases? Sharding something
- Currently unhappy — bad manager? Or compensation?
- Don't mention his company I think?
- Follow up with offer details... which project was he excited about`,
    stats: [{ val: '+22%', label: 'Offer Acceptance' }, { val: '35', label: 'Weekly Screens' }, { val: '4h', label: 'Dan\'s Acceptance Time' }],
    calendarDay: [
      { time: '10:00', event: 'Sarah L. — PM Screen', status: 'captured', story: 'PersonaOn flagged Sarah wants product leadership scope — not just shipping tickets.' },
      { time: '11:00', event: 'Dan K. — Principal Backend', status: 'captured', story: 'The screen that changed the offer rate. PersonaOn\'s brief nailed his non-negotiables.' },
      { time: '1:00', event: 'Hiring Manager Sync', status: 'captured', story: 'PersonaOn pulled Dan\'s brief automatically into the manager\'s prep view.' },
      { time: '3:00', event: 'Lisa M. — Offer Call', status: 'captured', story: 'Offer accepted on call. PersonaOn had pre-drafted the email to send immediately after.' },
      { time: '4:30', event: 'Team Standup', status: 'pending', story: '' },
    ]
  },

  operator: {
    key: 'operator',
    name: 'Elena Rostova',
    initials: 'ER',
    title: 'Chief Operating Officer',
    company: 'Grid Systems',
    industry: 'Operations',
    color: '#f59e0b',
    rgb: '245,158,11',
    glow: 'rgba(245,158,11,0.12)',
    tagColor: '#b45309',
    tagBg: 'rgba(245,158,11,0.08)',

    headline: 'Our syncs went from 60 minutes of reconstruction to 15 minutes of execution.',
    pain: 'As COO I\'m in every cross-functional meeting — vendor negotiations, engineering sprints, finance reviews. Action items bleed into each other. I\'ve had database migrations fail because someone assumed someone else had the deadline.',
    benefit: 'PersonaOn creates a live action graph after every meeting — who owns what, by when, and why. It cross-references follow-ups against previous sessions so nothing falls through the cracks between departments.',
    outcome: 'AWS migration completed 4 days early. Unlocked 20% discount tier. Saved ~$340K annually.',

    meetingWith: 'Cloud Ops, VP Engineering, Finance',
    meetingContext: 'AWS quarterly cost review — cross-functional',
    personaonBrief: {
      context: 'Third quarterly AWS cost review. Cloud Ops, Engineering, and Finance all present. Contract renewal is June 15 — migration to reserved instances must complete beforehand.',
      lastLeftOff: 'Finance approved the reserved instances budget last quarter but Engineering hasn\'t confirmed testing timeline. This is the blocker.',
      watchFor: 'June 15 is the hard deadline for 20% discount tier. Engineering needs to commit to off-peak testing schedule today — not "later this sprint."',
      sentiment: 'Cross-department tension on testing ownership'
    },
    icpSays: [
      { time: '8:28 AM', msg: 'AWS review in 2 mins. We have 3 departments who all think the database migration is someone else\'s responsibility.' },
      { time: '8:29 AM', msg: 'PersonaOn brief: Engineering hasn\'t confirmed testing. June 15 is the contract date. I need to get a commitment from VP Eng today.' },
      { time: '9:31 AM', msg: 'Engineering committed to off-peak testing start by Friday. PersonaOn already logged this as an action item and scheduled the check-in.' },
    ],
    chaosNotes: `AWS Q2 cost review notes
- Database migration to East region - who owns this?
- June 1 or June 15 for the contract renewal?
- Finance signed off on reserved instances I think
- Engineering needs to test something... off peak?
- 20% discount if we finish in time. Or is it 12%?
- Who sends the PO? Check with Raj or Mark`,
    stats: [{ val: '-30%', label: 'Sync Duration' }, { val: '98%', label: 'Action Follow-up' }, { val: '$340K', label: 'Annual Savings Unlocked' }],
    calendarDay: [
      { time: '8:30', event: 'AWS Cost Review', status: 'captured', story: 'PersonaOn surfaced the June 15 deadline and the Engineering testing gap before the meeting started.' },
      { time: '10:30', event: 'Engineering Resource Sync', status: 'captured', story: 'PersonaOn pulled the AWS action items into this meeting automatically.' },
      { time: '1:00', event: 'Sales Pipeline Review', status: 'captured', story: 'Cross-functional context from morning syncs carried into GTM discussion.' },
      { time: '3:30', event: 'Vendor Contract Neg.', status: 'captured', story: 'PersonaOn pulled previous contract terms for context before negotiation.' },
      { time: '5:00', event: 'Board Ops Update', status: 'pending', story: '' },
    ]
  }
};

export const ICP_LIST = Object.values(ICP_DATA);
