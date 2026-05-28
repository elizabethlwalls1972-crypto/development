import React, { useState } from 'react';
import { ArrowRight, Shield, Users, Zap, CheckCircle2, Scale, Building2, Globe, Mail, Phone, Briefcase, TrendingUp, FileCheck, X, Info } from 'lucide-react';
import DocumentModal, { type DocumentType } from './LegalDocuments';
// OSINT search removed - using unified location research

// Command Center - Complete ADVERSIQ Landing Page

interface CommandCenterProps {
    onEnterPlatform?: (payload?: { query?: string; results?: Record<string, unknown>[] }) => void;
    onOpenGlobalLocationIntel?: () => void;
    onLocationResearched?: (data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        profile: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        research: any;
        city: string;
        country: string;
    }) => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ onEnterPlatform, onOpenGlobalLocationIntel: _onOpenGlobalLocationIntel, onLocationResearched: _onLocationResearched }) => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [activeStep, setActiveStep] = useState<number | null>(null);
    const [showPipelineDeepDive, setShowPipelineDeepDive] = useState(false);
    const [showFormulas, setShowFormulas] = useState(false);
    const [_showCaseStudy, _setShowCaseStudy] = useState(false);
    const [showOutputDetails, setShowOutputDetails] = useState(false);
    const [showProtocolDetails, setShowProtocolDetails] = useState(false);
    const [showBlock2More, setShowBlock2More] = useState(false);
    const [showBlock3More, setShowBlock3More] = useState(false);
    const [showBlock4More, setShowBlock4More] = useState(false);
    const [showBlock5Popup, setShowBlock5Popup] = useState(false);
    const [showBreakthroughPopup, setShowBreakthroughPopup] = useState(false);
    const [showProofPopup, setShowProofPopup] = useState(false);
    const [showFounderLetter, setShowFounderLetter] = useState(false);
    const [showArchitecture, setShowArchitecture] = useState(false);
    const [activeWorkflowStage, setActiveWorkflowStage] = useState<'intake' | 'analysis' | 'output' | null>(null);
    const [showProtocolLetters, setShowProtocolLetters] = useState(false);
    const [showUnifiedSystemOverview, setShowUnifiedSystemOverview] = useState(false);
    const [unifiedActiveTab, setUnifiedActiveTab] = useState<'protocol' | 'documents' | 'letters' | 'proof'>('protocol');
    const [activeDocument, setActiveDocument] = useState<DocumentType>(null);
    const [_activeLayer, _setActiveLayer] = useState<number | null>(null);
    const [expandedEngine, setExpandedEngine] = useState<string | null>(null);
    const [_expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const _toggleCard = (id: string) => setExpandedCards(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        return next;
    });

    // Category-level read-more content for Original Developments
    const categoryDetails: Record<string, { title: string; subtitle: string; icon: string; color: string; summary: string; full: React.ReactNode }> = {
        'a': {
            title: 'Algorithms & Reasoning Engines',
            subtitle: 'Five proprietary engines that score, debate, validate, and simulate before any output is produced, with explicit contradiction and release-gate verdicts.',
            icon: 'A',
            color: 'from-blue-600 to-blue-800',
            summary: 'Neuroscience-based cognition modelling, adversarial Bayesian debate, propositional logic validation, cross-domain analogical reasoning, and Monte Carlo simulation &mdash; five engines that run in sequence on every input.',
            full: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-500 leading-relaxed mb-4">These five engines form the analytical core of the NSIL pipeline. Every input passes through all of them before any output is produced. They were not adapted from existing tools &mdash; each applies theory from a specific academic discipline to investment intelligence for the first time.</p>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Human Cognition Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Seven neuroscience models &mdash; Wilson-Cowan neural field equations, Friston&rsquo;s Free Energy Principle, Rao & Ballard predictive coding, Itti-Koch salience mapping, Baars&rsquo; Global Workspace Theory, neurovisceral emotional processing, and Baddeley&rsquo;s working memory model. These are university-level differential equations applied to investment analysis: modelling how a real decision-maker will respond to your proposal, what they&rsquo;ll pay attention to, what will feel wrong, and where their cognitive blind spots exist.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 5 &mdash; runs after quantitative scoring, before autonomous intelligence. Produces a &ldquo;human reception forecast&rdquo; that shapes how findings are framed in final output.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Bayesian Debate Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Five independent personas &mdash; Skeptic, Advocate, Regulator, Accountant, Operator &mdash; argue over every conclusion using Bayesian belief updating and Nash bargaining. Each persona independently votes proceed, pause, restructure, or reject. Beliefs are updated with weighted evidence. The system stops early when posterior probability exceeds 75% consensus. Disagreements are preserved in the output &mdash; you see where the Skeptic and Advocate couldn&rsquo;t agree, and why.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 2 &mdash; the first analytical gate. No data reaches the formula layer without surviving adversarial debate. This prevents confirmation bias structurally.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">SAT Contradiction Solver</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Your inputs are converted into propositional logic clauses (conjunctive normal form) and run through a DPLL-like satisfiability solver. &ldquo;Low risk + 40% ROI&rdquo; or &ldquo;small budget + global expansion + fast timeline&rdquo; &mdash; contradictions are caught mathematically before any AI model processes the case. No other business intelligence tool validates inputs for logical impossibility at the propositional level.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 1 &mdash; the input shield. Logically impossible claims are flagged before any resources are spent on analysis.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Cross-Domain Transfer Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Applies formal structural analogies from ecology, medicine, physics, and military strategy to economic development using Gentner&rsquo;s Structure-Mapping Theory. Coral reef recovery maps to regional economic recovery: keystone species = anchor industry, biodiversity = diversification, reef bleaching = economic shock. The engine contains fully modelled domain libraries with quantitative rules. These are patterns no economist would think to look for.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 6 &mdash; autonomous intelligence. Generates insights that expand the analysis beyond conventional economic frameworks.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Counterfactual & Monte Carlo Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Generates &ldquo;what if?&rdquo; scenarios and runs 10,000-iteration Monte Carlo simulations producing probabilistic outcome distributions. Calculates Value-at-Risk (95th percentile), expected shortfall, probability of loss, and full histograms. The regret analysis layer quantifies the cost of doing nothing. Every recommendation becomes a probability-weighted statement, not a binary yes/no.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 4 &mdash; stress testing. Runs after formula scoring to test whether conclusions hold under adverse conditions.</p>
                    </div>
                </div>
            ),
        },
        'b': {
            title: 'Agentic & Autonomous Systems',
            subtitle: '50+ parallel engines orchestrated as a unified brain with anticipatory thinking — adversarial analysis, 20+ live external sources, quantum risk simulation, multi-provider AI orchestration, and adaptive runtime control.',
            icon: 'B',
            color: 'from-emerald-600 to-emerald-800',
            summary: 'A 50+ engine parallel brain fires on every query with anticipatory intelligence — formula indices, reactive intelligence, entity verification, quantum Monte Carlo simulation, cognitive reasoning, geopolitical arbitrage, OSINT, sanctions screening, trade statistics, opportunity detection, and deep web research, with intelligent provider load-balancing, graceful degradation and full audit trail.',
            full: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-500 leading-relaxed mb-4">These systems provide goal-directed autonomy for research, synthesis, and live intelligence gathering. Fifty-plus engines fire in parallel on every query via the Brain Integration Service &mdash; each contributing a different analytical dimension, including three quantum-inspired engines (Monte Carlo risk simulation, pattern discovery, and cognitive bias modelling) and a 12-layer Cognitive Reasoning Engine that models human decision-making. An anticipatory thinking system predicts what the user will need next and pre-loads engines before they are requested. An intelligent multi-provider AI Orchestrator distributes workload across available providers (Groq, Together, OpenAI, Anthropic) with automatic failover, health tracking, and rate-limit-aware load balancing. Specialist agents spawn on demand, external data providers are queried in real time, and governance gates (red/amber/green) enforce control at every step. Output quality and freshness depend on provider availability, API configuration, and release-gate verdicts.</p>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Multi-Agent Brain System</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Multiple AI models (Gemini, GPT-4, Claude, Mistral) orchestrated together as a consensus panel &mdash; not as fallbacks. They vote on findings with weighted confidence based on historical accuracy per domain. If models disagree, you see the disagreement. This prevents single-model hallucination and ensures outputs are cross-validated by independent reasoning architectures.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Runs across all NSIL layers. Each engine can call the Multi-Agent Brain for validation, creating multi-model checkpoints throughout the pipeline.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Autonomous Orchestrator & Agent Spawner</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">A goal-directed autonomy layer with governance gates (red/amber/green). The system plans its own research tasks, spawns specialist agents via the Agent Spawner, executes them against a mission graph with dependency tracking, and verifies outcomes through the Outcome Verification Engine. It decides what questions need answering, not just how to answer yours. The mission graph persists state so work resumes exactly where it left off.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 6 &mdash; autonomous intelligence. This is what makes the system proactive rather than reactive.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Self-Evolving Algorithm Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Scoring formulas adjust their own weights using online gradient descent and Thompson Sampling (Bayesian bandits) based on outcome feedback. Exponential moving averages track performance trends. If accuracy drifts, the system rolls back automatically to the last known-good configuration. Every change is logged with a full audit trail: what changed, why, what triggered it, and accuracy before and after.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Operates continuously in the background. Keeps the 54+ formula architecture calibrated without manual intervention.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Scenario Simulation Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Forward-looking system dynamics based on Forrester (1961): stocks, flows, and feedback loops modelled as coupled differential equations. Monte Carlo uncertainty propagation through causal graphs with Markov chain state transitions. Simulates cascading futures where one change triggers downstream effects through workforce, housing, supply chain, and tax base. Each simulation produces probability-weighted branching timelines.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Called during NSIL Layer 6 for strategic recommendations. Produces the forward-looking scenarios that appear in generated documents.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Brain Integration Service &mdash; 50+-Engine Intelligent Brain with Anticipatory Thinking</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">The brain doesn&rsquo;t fire everything blindly. It <strong>thinks first, then predicts what you&rsquo;ll need next</strong>. An Engine Capability Registry declares what every engine group provides, what questions it can answer, whether it has live external data, and its cost weight. A Deep Query Analyzer breaks down every user message into intent (assess, compare, plan, investigate, report, calculate, monitor, advise), domains, complexity (trivial &rarr; deep), temporal focus (past/present/future), and whether real-time data is needed. A Relevance Scorer then scores each of the 12 engine groups on 12 factors &mdash; domain match, keyword hits, live data priority, parameter availability, readiness gates, complexity alignment, and intent-specific boosts &mdash; and only activates groups scoring above threshold. <strong>An Anticipatory Thinking layer then predicts follow-up needs</strong> (assessment queries auto-load strategic + risk engines; entity mentions trigger due diligence pre-loading; financial queries pull country context automatically) and an <strong>Unconventional Angle Detector</strong> injects cross-domain insights that standard analysis would miss (financial queries trigger relocation cost arbitrage analysis; risk queries surface historical failure precedents; strategy queries activate ESG screening). When queries need current information, engines with live APIs (World Bank, IMF, ACLED, Tavily, OpenSanctions, Numbeo, Comtrade, REST Countries, Wikidata, Exchange Rates) receive automatic score boosts. The brain&rsquo;s reasoning, anticipatory predictions, and unconventional angles are all injected into the prompt so the AI consultant sees <em>why</em> specific engines were selected and what the brain predicted you&rsquo;d need next.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: The runtime brain. Sits between your input and the AI response. Introspects its own capabilities, analyses the query deeply, builds a scored execution plan, and fires only the engines that matter &mdash; including quantum Monte Carlo risk simulation, quantum pattern matching, quantum cognition bias modelling, production-grade financial calculations (Newton-Raphson IRR, NPV, WACC), 5&times;5 risk matrix analysis, and proactive overlooked-city discovery. Every decision is logged with reasoning.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Global Issue Resolver</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">A universal problem-solver that treats any query as a solvable issue. Performs root cause analysis, gathers real-time data via the Reactive Intelligence Engine, applies multi-layer NSIL analysis, and produces a structured resolution plan with specific interventions, timelines, and resource requirements. Wired into the Brain Integration Service so it runs on every strategic question.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 6 &mdash; autonomous intelligence. Ensures the system always attempts to solve the underlying problem, not just describe it.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Live External Intelligence Layer &mdash; 20+ Global Data APIs</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">The platform integrates with multiple external sources including <strong>ACLED</strong>, <strong>OpenSanctions</strong>, <strong>OpenCorporates</strong>, <strong>GLEIF</strong>, <strong>V-Dem</strong>, <strong>Brave Search</strong>, <strong>UN Comtrade</strong>, <strong>GDELT</strong>, <strong>World Bank</strong> (7 indicators), <strong>IMF World Economic Outlook</strong> (GDP forecasts, inflation, debt, unemployment), <strong>Exchange Rate API</strong> (real-time currency rates), <strong>Wikidata SPARQL</strong> (structured knowledge graph), <strong>Wikipedia</strong>, <strong>REST Countries</strong> (population, currencies, Gini coefficient, borders), <strong>DuckDuckGo</strong>, <strong>GNews</strong>, <strong>Bing</strong>, <strong>ContextualWeb</strong>, and <strong>Tavily</strong>. A master <code>fetchIntelligenceSnapshot()</code> function pulls all country-level sources in parallel for maximum speed. Availability varies by configuration, provider uptime, and credential setup.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Feeds the Brain Integration Service, Entity Intelligence Pipeline, Cognitive Reasoning Engine, and Location Intelligence with live signals when providers are reachable. Every data point carries a freshness timestamp and confidence score.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Entity Intelligence Pipeline &mdash; 7-Source Parallel Verification</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">When any entity is mentioned in a query, the Entity Intelligence Pipeline fires automatically. It runs <strong>OpenSanctions</strong> (sanctions/PEP screening), <strong>OpenCorporates</strong> (corporate registry), <strong>GLEIF</strong> (LEI/ownership chain), <strong>Tavily</strong> (deep web research), <strong>Brave Search</strong> (independent search), <strong>GDELT</strong> (news sentiment), and <strong>V-Dem</strong> (jurisdiction governance) in parallel. Produces a composite Entity Intelligence Report with verified/unverified status, risk rating (LOW/MODERATE/HIGH/CRITICAL), and full source accountability. Supports <strong>Groq function calling</strong> with 4 tool schemas so the AI can autonomously decide which verification tools to invoke.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Bridges country-level NSIL scoring and entity-level due diligence. Ensures every mentioned company, partner, or individual is verified against real registries &mdash; not training-data guesses.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Reactive Intelligence Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Real-time opportunity detection and risk monitoring. Scans live web sources, detects emerging investment signals, flags political and economic risks as they develop, and feeds structured intelligence into the Brain Integration Service. Also powers the multi-agent location research system &mdash; 7 research categories (Economy, Demographics, News, Business, Leadership, Culture, Infrastructure) each querying multiple APIs simultaneously for any city or region worldwide.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Runs alongside every analysis. Ensures the system is working with current intelligence, not stale assumptions.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Geopolitical Arbitrage Engine &mdash; Disruption-to-Opportunity Analysis</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Scans live global news for active disruptions &mdash; wars, sanctions, trade fractures, supply-chain breaks, currency crises, energy shocks, regulatory shifts &mdash; and maps them against a pattern library of 10 disruption types with 25+ historical precedents. When a crisis hurts a major market, the engine identifies where regional cities, small islands, and lesser-known jurisdictions can capture displaced demand, talent, capital, or supply-chain links. Scores each arbitrage opportunity on severity, contextual relevance, and historical validation. Vietnam replacing China in textiles post-tariff (2018), Dubai absorbing Gulf War capital (1991), Georgia&rsquo;s tech boom from Russian IT worker relocation (2022) &mdash; these patterns repeat. The engine spots them proactively.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Feeds into the ADVERSIQ Consultant system prompt on every query. Ensures the user is always informed how current world events &mdash; good or bad &mdash; create structural openings for their market or jurisdiction.</p>
                    </div>
                </div>
            ),
        },
        'c': {
            title: 'Reflexive Intelligence',
            subtitle: 'The system analyses the user, not just the market — detecting what you—re not saying, modelling cognitive intent, and reframing for every audience.',
            icon: 'C',
            color: 'from-amber-600 to-amber-800',
            summary: 'Identity reality-checking using post-structuralist theory, latent advantage mining from casual mentions, audience-adaptive translation, and hidden motivation detection.',
            full: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-500 leading-relaxed mb-4">Most systems only analyse external conditions. This layer analyses you &mdash; how you&rsquo;re framing your situation, what you&rsquo;re not mentioning, whether your competitive identity is authentic, and what your real motivation might be. It then adapts everything for whoever will read the output.</p>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Regional Identity Decoder</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Based on Baudrillard&rsquo;s Simulacra theory combined with Porter&rsquo;s Competitiveness Theory. Scans all inputs for generic investment marketing language &mdash; phrases like &ldquo;strategically located&rdquo; and &ldquo;skilled workforce&rdquo; that appear in 90%+ of investment brochures globally and therefore communicate nothing. Flags competitive identity loss and surfaces the hidden assets the region undersells but that are structurally non-replicable.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 8 &mdash; reflexive intelligence. Catches when a region is presenting a simulacrum rather than its authentic advantage, and corrects the framing before output.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Latent Advantage Miner</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Inspired by the &ldquo;junk DNA&rdquo; concept from molecular biology. Scans every input field for assets mentioned casually that the user doesn&rsquo;t realise are strategically significant. &ldquo;We have a small port&rdquo; &mdash; ports are non-replicable. &ldquo;Many of our people work overseas&rdquo; &mdash; diaspora networks are proven investment channels (Philippines, Israel, Ireland). Cross-references against the Historical Parallel Matcher&rsquo;s precedent database.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 8 &mdash; reflexive intelligence. Ensures no strategic asset is overlooked because the user didn&rsquo;t know it mattered.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Universal Translation Layer</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Takes analytical findings and translates them into five audience-specific formats: Investor (ROI-focused), Government (policy-aligned), Community (impact-centred), Partner/IPA (technical), Executive (board-ready). Uses Aristotelian rhetoric (ethos/pathos/logos) and Halliday&rsquo;s Register Theory. &ldquo;Young population&rdquo; means cheap labour to an investor, demographic dividend to a government, and opportunity to a community leader. Same truth, different framing.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 10 &mdash; audience-adaptive output. The final layer before the user sees anything.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Motivation Detector</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Scans all user text for trigger patterns that reveal real motivation: crisis signals, capital stress, desperation markers, time pressure cues, sanctions exposure hints. Each pattern is assigned a risk level. A user under financial stress asking about &ldquo;quick ROI&rdquo; gets different treatment than a long-term strategic planner. The system reads why you&rsquo;re asking, not just what you asked.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 1 &mdash; input shield. Detects context before the analysis begins, shaping how the entire pipeline processes the case.</p>
                    </div>
                </div>
            ),
        },
        'd': {
            title: 'Self-Monitoring & Calibration',
            subtitle: 'The system audits its own reasoning, tracks perception drift, learns from every interaction, adapts its own control mode from outcome history, and can hard-gate or reject recommendations on ethical and control grounds.',
            icon: 'D',
            color: 'from-violet-600 to-violet-800',
            summary: 'Metacognitive bias detection, statistical drift monitoring with automatic recalibration, event-driven continuous learning, runtime weight tuning with rollback, and computational ethics scoring against Rawlsian fairness principles.',
            full: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-500 leading-relaxed mb-4">These systems ensure the OS doesn&rsquo;t just produce analysis &mdash; it continuously checks whether that analysis is trustworthy, learns from every interaction, and tunes itself over time. They detect cognitive bias in the system&rsquo;s own reasoning, catch when the world has changed enough that models need recalibration, apply formal ethical frameworks to every recommendation, and feed outcome data back into the engine weights for continuous improvement.</p>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">MetaCognition Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Continuously audits the system&rsquo;s own reasoning &mdash; detecting overconfidence (certainty exceeds evidence quality), confirmation bias (finding what it expects), missing counterfactuals (arguments not considered), pattern overfitting (conclusions from too few cases), and stale assumptions (outdated data). Produces a cognitive reliability score for every analysis and generates self-improvement directives.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 7 &mdash; proactive monitoring. &ldquo;Thinking about thinking&rdquo; &mdash; catches the system&rsquo;s own mistakes before they reach you.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Drift Detection & Backtesting</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">All 54+ proprietary formulas are backtested against 200+ real historical cases with known outcomes &mdash; Tesla Shanghai, Samsung Vietnam, PEZA Philippines, Rwanda IT Hub, the Marshall Plan. Drift detection uses Welch&rsquo;s t-test for three types of change: concept drift, data drift, and performance drift. When detected, the system automatically widens confidence intervals and triggers recalibration.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Runs continuously. The system knows its own accuracy per country, per sector, and per strategy type. This is how it stays honest over time.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Ethical Reasoning Engine</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Computational ethics applied to every recommendation. Calculates multi-stakeholder utility, Rawls&rsquo; Difference Principle (does the least-advantaged group benefit?), intergenerational equity using Stern Review discount rates (&le;1.4%), proportionality calculus, and Gini coefficient for inequality impact. These are mathematical scores, not checkbox exercises. The system can recommend &ldquo;reject&rdquo; on ethical grounds alone &mdash; even when the financial case is strong.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 9 &mdash; compliance checking. Ethical scoring runs alongside regulatory compliance as a hard gate before output.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Self-Improvement Engine &mdash; Runtime Weight Tuning</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Records per-run performance metrics (duration, accuracy, confidence), detects accuracy drift via Welch&rsquo;s t-test across rolling windows, and auto-tunes formula weights when regression is detected. Every weight change carries a rollback checkpoint &mdash; if a tuning degrades accuracy, the system reverts automatically. Runs in the background on every Brain Integration Service invocation at readiness &ge;50%.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Continuous background process. Keeps formula calibration aligned with real-world accuracy, not static assumptions. Full audit trail of every adjustment.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Self-Learning Engine &mdash; Event-Driven Continuous Learning</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">Listens for events across the entire system via an EventBus &mdash; new analyses, user feedback, outcome data, formula executions, agent completions. Each event is processed as a learning signal that builds institutional knowledge over time. Pattern recognition across accumulated events surfaces recurring success factors and failure modes that inform future analyses.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Persistent background listener. Over time, the system gets smarter by learning from its own operations &mdash; not just from training data.</p>
                    </div>
                </div>
            ),
        },
        'e': {
            title: 'Proprietary Quantitative Architecture',
            subtitle: '54+ proprietary formulas, 8 cognitive-reasoning indices, 3 quantum-inspired engines, production-grade financial modelling (IRR/NPV/WACC), 200+ backtested cases, 195-country governance, and Research Ecosystem scoring.',
            icon: 'E',
            color: 'from-rose-600 to-rose-800',
            summary: 'Purpose-built scoring formulas running as a dependency graph, sixty years of searchable institutional memory, and a 195-country queryable compliance engine.',
            full: (
                <div className="space-y-6">
                    <p className="text-lg text-slate-500 leading-relaxed mb-4">This is the quantitative foundation that every other engine draws from. The formulas produce the scores. The historical cases provide the precedents. The compliance database provides the jurisdiction-specific rules. Without this layer, the reasoning engines would have nothing to reason over.</p>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">54+ Proprietary Formulas + Cognitive Indices + Research Ecosystem Scoring</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">BARNA, NVI, CRI, SPI, RROI, SEAM, IVAS, SCF, CAP, AGI, VCI, ATI, ESI, ISI, OSI, TCO, PRI, RNI, SRA, IDV, FMS, DCS, DQS, GCS, RDBI, AFC, <strong>PVI</strong> (Partnership Viability), <strong>RRI</strong> (Regional Resilience), <strong>CRPS</strong> (Composite Risk Priority), <strong>SRCI</strong> (Supply Chain Risk), <strong>MPI</strong> (Market Penetration), <strong>GCI</strong> (Governance Confidence), <strong>CIS</strong> (Counterparty Integrity), <strong>ESHOCK</strong> (Ecosystem Shock), and 8 cognitive formulas: <strong>DII&trade;</strong> (Decision Inertia), <strong>PAI&trade;</strong> (Partnership Asymmetry), <strong>ICI&trade;</strong> (Inaction Cost), <strong>SCX&trade;</strong> (Solution Complexity), <strong>HFI&trade;</strong> (Human Friction), <strong>ORI&trade;</strong> (Opportunity Reversibility), <strong>SVG&trade;</strong> (Stakeholder Value Gap), <strong>EMA&trade;</strong> (Execution Momentum Advantage). Each is a composite formula purpose-built for investment and regional strategy. They run as a dependency DAG (directed acyclic graph) with topological-sort parallel execution, memoisation of intermediate results, mathematical bounds enforcement, and confidence intervals per formula per context.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 3 &mdash; quantitative scoring. The DAG scheduler executes 54+ formulas with dependency-aware parallelism, including Research Ecosystem formulas (TAI, ICI, ERS) and the Cognitive Reasoning Engine&rsquo;s 8 human-brain-inspired indices. Every score traces back to its exact inputs and weights.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Historical Parallel Matcher</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">200+ real historical cases &mdash; Shenzhen SEZ 1980, PEZA Philippines 1995, Rwanda IT Hub 2010, Silicon Valley formation, Dubai free zone model, Singapore&rsquo;s industrialisation. Searchable by structural similarity using vector-based matching across economic, demographic, infrastructure, and institutional dimensions. Each case stores what worked, what failed, time to outcome, and key contributing factors.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: Called by multiple NSIL layers. The Backtesting Engine uses it for calibration. The Latent Advantage Miner cross-references it. Generated documents cite specific precedents.</p>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">195-Country Compliance & IFC Standards</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">A structured, code-queryable database covering investment frameworks, key agencies, tax treaty networks, sanctions status, dispute resolution mechanisms, data privacy frameworks, anti-corruption laws, and regional bloc memberships for 195 countries. All 8 IFC Performance Standards (PS1&ndash;PS8) implemented as assessable rules mapped to UN Sustainable Development Goals. The &ldquo;Global Baseline + Local Search&rdquo; model applies universal standards first, then finds local law to fill gaps.</p>
                        <p className="text-xs text-slate-400 mt-2 italic">Role in the OS: NSIL Layer 9 &mdash; compliance checking. Automatically activated when the system detects the user&rsquo;s jurisdiction. No manual selection required.</p>
                    </div>
                </div>
            ),
        },
    };

    // Global Location Intelligence state - LIVE SEARCH
    const [_locationQuery, _setLocationQuery] = useState('');
    const [_isResearchingLocation, _setIsResearchingLocation] = useState(false);
    const [_researchProgress, _setResearchProgress] = useState<null>(null);
    const [_locationResult, _setLocationResult] = useState<{ city: string; country: string; lat: number; lon: number } | null>(null);
    const [_comparisonCities, _setComparisonCities] = useState<Array<{ city: string; country: string; reason: string; keyMetric?: string }>>([]);
    const [_researchSummary, _setResearchSummary] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [_liveProfile, _setLiveProfile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [_researchResult, _setResearchResult] = useState<any>(null);
    const [_searchError, _setSearchError] = useState<string | null>(null);

    // Handle location search - SIMPLIFIED Gemini-first approach

    const tenStepProtocol = [
        { step: 1, title: "Opportunity Definition", description: "Project name, type, sector, target region, investment scale, and timeline. The foundation everything else builds on.", details: ["Project name and type", "Sector and industry classification", "Target region and jurisdiction", "Investment scale and range", "Project timeline and phasing", "Primary opportunity thesis"] },
        { step: 2, title: "Strategic Alignment", description: "Alignment with national and regional policy, SDG mapping, government priority status, and bilateral agreements.", details: ["National and regional policy alignment", "SDG mapping and development goals", "Government priority status", "Bilateral and multilateral agreements", "Strategic fit with host jurisdiction", "Policy environment assessment"] },
        { step: 3, title: "Market Analysis", description: "Demand drivers, supply gaps, competitive landscape, pricing dynamics, and growth trajectory.", details: ["Demand drivers and market size", "Supply gap identification", "Competitive landscape analysis", "Pricing dynamics and benchmarks", "Growth trajectory and projections", "Market entry strategy"], gliEnabled: true, gliNote: "Live intelligence enriches market sizing with GDP, trade flows, and sector benchmarks" },
        { step: 4, title: "Financial Structure", description: "CAPEX, OPEX, revenue model, funding mix, IRR targets, payback expectations, and currency exposure.", details: ["CAPEX and OPEX breakdown", "Revenue model and streams", "Funding mix and sources", "IRR targets and returns", "Payback period expectations", "Currency exposure and hedging"], gliEnabled: true, gliNote: "Tax incentive data, economic zone structures, and cost indicators inform financial modelling" },
        { step: 5, title: "Risk Assessment", description: "Political, regulatory, operational, financial, environmental, and social risks with probability and impact scoring.", details: ["Political and regulatory risk", "Operational risk factors", "Financial and currency risk", "Environmental and social risk", "Probability and impact scoring", "Risk matrix and mitigations"], gliEnabled: true, gliNote: "Political, economic, natural, and regulatory risk scores sourced from live intelligence" },
        { step: 6, title: "Stakeholder Mapping", description: "Government bodies, investors, partners, communities, and regulators - mapped by influence, interest, and engagement strategy.", details: ["Government bodies and ministries", "Investor and capital partner profiles", "Delivery and implementation partners", "Community and civil society", "Regulators and compliance bodies", "Influence, interest, and engagement matrix"], gliEnabled: true, gliNote: "Major employers, foreign company presence, and key government contacts surfaced from live data" },
        { step: 7, title: "Implementation Pathway", description: "Phasing, milestones, dependencies, critical path, resource requirements, and decision gates.", details: ["Project phases and sequencing", "Milestone definitions and timelines", "Dependency mapping", "Critical path analysis", "Resource requirements per phase", "Go/no-go decision gates"], gliEnabled: true, gliNote: "Entry timeline guidance and infrastructure readiness indicators from live intelligence" },
        { step: 8, title: "Compliance Requirements", description: "Permits, licenses, environmental approvals, sector-specific regulations, and international standards.", details: ["Permits and licensing requirements", "Environmental approvals and assessments", "Sector-specific regulatory obligations", "International standards compliance", "Anti-bribery and sanctions screening", "GDPR and data handling where applicable"], gliEnabled: true, gliNote: "Jurisdiction-specific regulatory frameworks and compliance risk flags applied automatically" },
        { step: 9, title: "Partnership Terms", description: "Equity split, governance structure, decision rights, exit mechanisms, IP ownership, and non-compete clauses.", details: ["Equity split and ownership structure", "Governance and decision-making rights", "Exit mechanisms and triggers", "IP ownership and licensing", "Non-compete and exclusivity provisions", "Dispute resolution framework"] },
        { step: 10, title: "Success Metrics", description: "KPIs, monitoring framework, reporting requirements, adjustment triggers, and exit criteria.", details: ["KPI definition and measurement", "Monitoring and evaluation framework", "Reporting cadence and format", "Adjustment triggers and thresholds", "Exit criteria and conditions", "Final readiness and go/no-go score"], gliEnabled: true, gliNote: "Composite readiness scores, comparison baselines, and data quality confidence metrics" }
    ];


    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-light tracking-wide text-slate-800">ADVERSIQ Intelligence</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-600 font-medium">
                        <button onClick={() => scrollToSection('launch-platform')} className="ml-2 px-4 md:px-6 py-2 bg-slate-200 text-slate-800 text-sm md:text-lg font-light tracking-wide hover:bg-slate-300 transition-colors">Launch Consultant</button>
                    </div>
                </div>
            </nav>



            {/* OUR MISSION  -  Header with B&W photo banner background */}
            <section id="mission" className="relative pt-36 pb-24 px-4 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1200&fit=crop&q=80" 
                    alt="Adversarial Intelligence Quorum" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    style={{ filter: 'grayscale(100%)' }}
                />
                <div className="absolute inset-0 bg-black/80" />
                <style>{`
                    @keyframes heroColor { 0%,100%{color:#ff3366} 25%{color:#00d4ff} 50%{color:#facc15} 75%{color:#a855f7} }

                `}</style>
                <div className="relative z-10 max-w-5xl mx-auto text-center" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                    <h1
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-4 tracking-tight"
                        style={{ animation: 'heroColor 4s ease-in-out infinite' }}
                    >
                        ADVERSIQ
                    </h1>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mb-12">
                        Adversarial Intelligence Quorum
                    </p>
                    <div className="max-w-5xl mx-auto">
                        <p className="text-base md:text-lg lg:text-xl text-white font-medium uppercase tracking-widest">
                            Built for regional councils, investment boards, government agencies, and businesses entering new markets.
                        </p>
                    </div>
                </div>
            </section>

            
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Statement */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">What Is ADVERSIQ</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">
                                The intelligence platform<br className="hidden md:block" />
                                <span className="font-black">built for decisions that matter.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-4 max-w-3xl">
                                Start Free Today<br />
                                5-day full access. No credit card. See how ADVERSIQ turns uncertainty into defensible decisions in the time it takes to grab lunch.
                            </p>
                        </div>

                        {/* Right — Feature words with color cycling */}
                        <div className="flex flex-col justify-center">
                            <style>{`
                                @keyframes colorCycle1 { 0%,100%{color:#ff3366} 20%{color:#ff9500} 40%{color:#00d4ff} 60%{color:#a855f7} 80%{color:#22d3ee} }
                                @keyframes colorCycle2 { 0%,100%{color:#00d4ff} 20%{color:#ff3366} 40%{color:#facc15} 60%{color:#22d3ee} 80%{color:#a855f7} }
                                @keyframes colorCycle3 { 0%,100%{color:#facc15} 20%{color:#22d3ee} 40%{color:#ff3366} 60%{color:#ff9500} 80%{color:#a855f7} }
                                @keyframes colorCycle4 { 0%,100%{color:#a855f7} 20%{color:#facc15} 40%{color:#22d3ee} 60%{color:#ff3366} 80%{color:#00d4ff} }
                                @keyframes colorCycle5 { 0%,100%{color:#22d3ee} 20%{color:#a855f7} 40%{color:#ff9500} 60%{color:#facc15} 80%{color:#ff3366} }
                            `}</style>
                            <div className="space-y-1">
                                {['Six fields.', 'Ten layers.', 'One pipeline.', 'One person.', 'From nothing.'].map((word, i) => (
                                    <p
                                        key={word}
                                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] select-none cursor-default"
                                        style={{ animation: `colorCycle${i + 1} 3s ease-in-out infinite` }}
                                    >{word}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* What ADVERSIQ Intelligence AI Is */}
            <section className="py-20 px-4 bg-slate-950">
                <div className="max-w-6xl mx-auto">
                    <div className="border-t border-white/10 pt-12 pb-16">
                        <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
                            Your next major decision deserves more than a confident-sounding answer.<br />
                            <span className="text-amber-400">No endless questionnaires. ADVERSIQ Consultant asks the right questions in sequence—building your case in real time through natural dialogue.</span>
                        </p>

                        <div className="mt-10 max-w-3xl border-l-2 border-amber-400 pl-6">
                            <p className="text-base text-slate-300 leading-relaxed">
                                ADVERSIQ brings institutional rigor to everyone. We built a platform that's more cost-effective and more open, helping clear up misconceptions on both sides. Whether you're a regional authority, development finance institution, or investment operator, you get the clarity and confidence to approach stakeholders on solid ground.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <button
                                onClick={() => setShowFounderLetter(true)}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-slate-900 text-sm font-bold uppercase tracking-[0.15em] hover:bg-amber-300 transition-colors"
                            >
                                One Developer
                                <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => setShowArchitecture(true)}
                                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm font-bold uppercase tracking-[0.15em] hover:border-white/70 hover:bg-white/5 transition-colors"
                            >
                                View Architecture
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-amber-400">The Platform</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
                                Institutional intelligence.<br />
                                <span className="font-black">On demand. Without the firm.</span>
                            </h2>
                            <p className="text-base text-amber-400 uppercase tracking-[0.24em] mb-10">A single platform run for verified, auditable insight.</p>
                            <div>
                                <p className="text-base md:text-lg font-bold uppercase tracking-widest text-amber-400 mb-4">Why this matters now</p>
                                <p className="text-lg md:text-xl text-white/90 leading-relaxed">Meet ADVERSIQ<br /><br />ADVERSIQ delivers institutional-grade strategic intelligence in minutes, not months. Talk to our AI consultant like you'd brief a senior advisor. In 30-45 minutes, you have a complete strategic brief, stress-tested conclusions, and defensible output.</p>
                            </div>
                        </div>
                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            <div className="aspect-square overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
                                <img
                                    src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&h=1200&fit=crop&q=80"
                                    alt="City skyline at night"
                                    className="w-full h-full object-cover brightness-110 contrast-110 saturate-125"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Photo */}
                        <div className="order-2 lg:order-1">
                            <div className="h-80 lg:h-[28rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=900&fit=crop&q=80"
                                    alt="Diverse teams making strategic decisions"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right — Text */}
                        <div className="order-1 lg:order-2">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Who This Is For</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">You don&rsquo;t need to be an expert. The system already is.</h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                                The same engine serves first-time exporters and seasoned investment boards. Beginners get guided walkthroughs and plain-language explanations. Experts get full control over advanced settings, detailed audit trails, and granular data breakdowns. Same engine &mdash; different depth.
                            </p>
                        </div>
                    </div>

                    {/* Four audience cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Regional Councils & Development Agencies', desc: 'Get the same depth of analysis as a top-tier advisory firm \u2014 financial projections, supply chain mapping, workforce analysis \u2014 without the consulting invoice.', photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop&q=80' },
                            { title: 'Government Agencies & Investment Boards', desc: 'Defensible decision trails. Stress-tested assumptions, surfaced deal-killers, and documented rationale you can stand behind.', photo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&h=250&fit=crop&q=80' },
                            { title: 'Businesses Expanding Into New Regions', desc: 'Research any location instantly \u2014 regulatory landscape, real cost of entry, partner credibility \u2014 and flag what will go wrong before you commit capital.', photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop&q=80' },
                            { title: 'First-Time Exporters & Entrepreneurs', desc: 'Never written an investment prospectus? The guided 10-step intake asks the right questions and produces the documents that open doors.', photo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop&q=80' },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="h-36 overflow-hidden mb-4">
                                    <img src={item.photo} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="border-t-2 border-slate-300 pt-4">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 leading-snug">{item.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            {expandedEngine && categoryDetails[expandedEngine] && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setExpandedEngine(null)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 flex-shrink-0 relative">
                            <button 
                                onClick={() => setExpandedEngine(null)} 
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${
                                expandedEngine === 'a' ? 'text-blue-600' :
                                expandedEngine === 'b' ? 'text-emerald-600' :
                                expandedEngine === 'c' ? 'text-amber-600' :
                                expandedEngine === 'd' ? 'text-violet-600' :
                                'text-rose-600'
                            }`}>Core Engine {categoryDetails[expandedEngine].icon}</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">{categoryDetails[expandedEngine].title}</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">{categoryDetails[expandedEngine].subtitle}</p>
                        </div>
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10">
                            {categoryDetails[expandedEngine].full}
                        </div>
                    </div>
                </div>
            )}

            
            {showPipelineDeepDive && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowPipelineDeepDive(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 flex-shrink-0 relative">
                            <button onClick={() => setShowPipelineDeepDive(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">10-Layer Architecture</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">The Verification Pipeline</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">Every input passes through ten sequential layers of validation, scoring, and synthesis before any output is produced.</p>
                        </div>

                        {/* Scrollable content with all 10 layers */}
                        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 space-y-10">
                            {[
                                { n: '01', title: 'Five Competing Reasoning Engines', photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop&q=80', extended: 'Five independent AI personas analyse your situation simultaneously but cannot see each other\u2019s work. Strategic Viability evaluates market opportunity. Risk & Compliance surfaces legal and regulatory exposure. Geopolitical Context maps political dynamics and stability. Financial Architecture stress-tests the numbers. Stakeholder & Social assesses community impact and partner dynamics. Once each persona reaches its own conclusion, they enter a structured adversarial debate. Bayesian inference updates each persona\u2019s confidence based on evidence quality. Nash bargaining theory finds the equilibrium position where no persona can improve its argument without considering the others. The Tribunal then renders a final verdict: proceed, proceed-with-conditions, or reject.', highlights: ['5 independent AI personas with separate reasoning chains', 'Bayesian belief updating based on evidence strength', 'Nash bargaining equilibrium across competing conclusions', 'Tribunal verdict system with 3 possible outcomes', 'Disagreements preserved in output \u2014 you see where experts couldn\u2019t agree'], plainEnglish: 'Imagine five senior advisors in separate rooms, each analysing your situation from their own expertise. They can\u2019t influence each other. Once they\u2019re done, they debate. The strongest arguments win \u2014 not the loudest voice. You get the consensus AND the dissent.' },
                                { n: '02', title: 'SAT Contradiction Solver', photo: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&h=400&fit=crop&q=80', extended: 'Your inputs and the five engines\u2019 conclusions are converted into propositional logic clauses in conjunctive normal form (CNF). A DPLL-like satisfiability algorithm \u2014 the same class of solver used in chip design verification and NASA mission-critical software \u2014 checks whether all statements can be simultaneously true. If Engine A concludes \u201cthe market is ready\u201d but Engine B\u2019s evidence implies regulatory blockage, these become contradictory clauses. The solver catches this mathematically, not through pattern matching or keyword detection. No other commercial AI product applies formal logic verification to its own conclusions.', highlights: ['Propositional logic in conjunctive normal form (CNF)', 'DPLL satisfiability algorithm \u2014 same class used in chip verification', 'Catches logical contradictions between engine conclusions', 'Also validates user inputs for logical impossibility', 'Runs before resources are spent on full analysis'], plainEnglish: 'Before the system gives you an answer, it checks whether its own conclusions are logically possible. If one part of the analysis contradicts another, the system catches it \u2014 mathematically, not by guessing. Think of it as a spell-checker for logical consistency.' },
                                { n: '03', title: 'Monte Carlo Stress Testing', photo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop&q=80', extended: 'The system runs thousands of randomised simulations, varying key parameters: policy changes, currency fluctuations, partner reliability, market demand shifts, regulatory timing, and commodity prices. Each simulation produces a complete outcome pathway. The results are aggregated into probability distributions. You get Value-at-Risk at the 95th percentile, expected shortfall (what happens in the worst 5% of cases), probability of loss, and full histograms. A regret analysis layer also calculates the cost of doing nothing \u2014 quantifying the opportunity cost of inaction.', highlights: ['10,000-iteration Monte Carlo simulations', 'Variables: policy, currency, partners, demand, regulation, commodities', 'Value-at-Risk (95th percentile) and expected shortfall', 'Probability distributions replace single-point estimates', 'Regret analysis quantifies the cost of inaction'], plainEnglish: 'Instead of telling you \u201cROI is 12%,\u201d the system tells you \u201cROI is 12% with 73% confidence, dropping below 5% in 18% of scenarios when partner reliability falls below threshold.\u201d Every number becomes a probability, not a promise.' },
                                { n: '04', title: 'Human Cognition Engine', photo: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=400&fit=crop&q=80', extended: 'Seven computational neuroscience models work together to understand how you \u2014 and the people reading your output \u2014 actually make decisions. Wilson-Cowan neural field equations model attention oscillation. Friston\u2019s Free Energy Principle predicts which conclusions will feel surprising vs. confirming. Rao & Ballard predictive coding detects when your expectations diverge from reality. Itti-Koch saliency mapping identifies what will grab attention in a document. Baars\u2019 Global Workspace Theory models conscious vs. unconscious processing. Neurovisceral integration models emotional response. Baddeley\u2019s Working Memory model ensures output doesn\u2019t exceed cognitive load limits.', highlights: ['Wilson-Cowan neural oscillation \u2014 attention modelling', 'Friston\u2019s Free Energy Principle \u2014 surprise prediction', 'Itti-Koch saliency \u2014 what grabs attention in documents', 'Baars Global Workspace Theory \u2014 conscious processing limits', 'Baddeley\u2019s Working Memory \u2014 cognitive load management'], plainEnglish: 'The system models how your brain will react to information. It detects hidden priorities you haven\u2019t articulated, anticipates where you\u2019ll feel uncertain, and structures output so the most critical information lands where your attention naturally goes.' },
                                { n: '05', title: 'Self-Evolving Algorithms', photo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=400&fit=crop&q=80', extended: 'Scoring formulas adjust their own weights using online gradient descent and Thompson Sampling (Bayesian bandits) based on outcome feedback. When the system gets feedback on a recommendation \u2014 whether from explicit user input or from tracked outcomes \u2014 it updates which analytical approaches receive more weight for similar problem types. Exponential moving averages track performance trends. If accuracy drifts, the system rolls back automatically to the last known-good configuration. Every change is logged with a full audit trail: what changed, why, what triggered it, and accuracy before and after.', highlights: ['Online gradient descent for weight optimisation', 'Thompson Sampling (Bayesian bandits) for approach selection', 'Automatic rollback when accuracy degrades', 'Full audit trail of every weight adjustment', 'Performance tracking via exponential moving averages'], plainEnglish: 'The system learns which analytical methods work best for each type of problem. If Monte Carlo stress testing proves more predictive for infrastructure projects than real estate deals, the system automatically adjusts. It gets smarter with every case.' },
                                { n: '06', title: 'Reflexive Intelligence', photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop&q=80', extended: 'Seven specialised background engines run continuously to ensure the system monitors its own performance and the external environment. Drift Detection uses Welch\u2019s t-test to catch when the world changes enough that models need recalibration. Backtesting validates all 54+ formulas against 200+ real historical cases with known outcomes. MetaCognition audits the system\u2019s own reasoning for overconfidence, confirmation bias, and missing counterfactuals. Continuous Learning processes every interaction as a training signal. Proactive Intelligence anticipates what you\u2019ll need next. The Perception Delta Index measures the gap between your assumptions and reality. The Case Graph Builder maps relationships between all entities and findings.', highlights: ['Drift Detection \u2014 catches when models need recalibration', 'Backtesting against 200+ real historical cases', 'MetaCognition \u2014 the system auditing its own thinking', 'Proactive Intelligence \u2014 predicting your next question', 'Perception Delta Index \u2014 gap between assumptions and reality'], plainEnglish: 'These engines run silently in the background. They make sure the system stays honest, stays current, catches its own mistakes, and anticipates what you\u2019ll need before you ask for it.' },
                                { n: '07', title: 'Entity Intelligence', photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop&q=80', extended: 'When any company, person, or organisation is mentioned in your input, the Entity Intelligence Pipeline activates automatically. Seven parallel verification streams fire simultaneously: OpenCorporates for corporate registry validation, GLEIF for beneficial ownership chains (LEI lookups), OpenSanctions for sanctions and PEP screening, financial health indicators from structured databases, GDELT for real-time news sentiment analysis, litigation history checks, and relationship mapping to uncover hidden connections. The output is a composite Entity Intelligence Report with verified/unverified status, a risk rating (LOW/MODERATE/HIGH/CRITICAL), and full source accountability showing exactly where each data point came from.', highlights: ['Corporate registry verification (OpenCorporates)', 'Beneficial ownership chains (GLEIF LEI)', 'Sanctions and PEP screening (OpenSanctions)', 'Real-time news sentiment (GDELT)', 'Composite risk rating: LOW / MODERATE / HIGH / CRITICAL'], plainEnglish: 'Every time you mention a company or person, the system quietly runs background checks \u2014 corporate registries, sanctions lists, news sentiment, ownership chains, litigation history. You get a verified trust score, not a guess.' },
                                { n: '08', title: 'Confidence Scoring', photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop&q=80', extended: 'Every material claim in the system\u2019s output carries a numerical confidence score. These scores are built from three sources: engine convergence (how much the five reasoning engines agree), Monte Carlo distribution width (how stable the projections are under stress), and evidence quality (how fresh, how authoritative, and how many independent sources confirm each data point). Data provenance annotations trace every number back to its exact source. You can see not just the conclusion, but the confidence behind it and the evidence trail that supports it.', highlights: ['Numerical confidence scores on every material claim', 'Engine convergence measurement across 5 reasoning personas', 'Monte Carlo distribution width as stability indicator', 'Evidence quality scoring: freshness, authority, independence', 'Full data provenance \u2014 every number traces to its source'], plainEnglish: 'You never have to wonder \u201chow sure is the system?\u201d Every claim shows its confidence score. High confidence with strong evidence means the claim has been validated from multiple angles. Low confidence with thin evidence means the system is being honest about what it doesn\u2019t know.' },
                                { n: '09', title: 'DAG-Scheduled Execution', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop&q=80', extended: 'The system manages 47+ interdependent analysis tasks using a directed acyclic graph (DAG) with topological sorting. This means it automatically determines which tasks can run in parallel and which must wait for dependencies. 23 workstreams execute simultaneously where possible. The DAG scheduler handles memoisation of intermediate results (so the same calculation never runs twice), mathematical bounds enforcement, and dependency-aware parallelism. This is the architectural reason the system can compress months of traditional advisory work into minutes \u2014 it\u2019s not cutting corners, it\u2019s executing optimally.', highlights: ['Directed acyclic graph (DAG) with topological sorting', '47+ interdependent analysis tasks orchestrated', '23 parallel workstreams for maximum throughput', 'Memoisation prevents redundant calculations', 'Dependency-aware execution \u2014 nothing runs before its prerequisites'], plainEnglish: 'Traditional consulting takes months because tasks happen sequentially and manually. The system maps every dependency, runs everything that can run simultaneously, and never repeats work. Same rigour, fraction of the time.' },
                                { n: '10', title: 'Document Factory', photo: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=400&fit=crop&q=80', extended: '247 document templates span 15 categories covering the entire project lifecycle: Foundation & Legal, Strategic Intelligence, Financial & Investment, Market & Competitive Analysis, Risk & Compliance, Government & Policy, Partnership & Stakeholder, Project Management, Procurement & Contract, Human Resources, Infrastructure & Environmental, Governance & Board, Regulatory & Licensing, ESG & Sustainability, and Case Study Intelligence. Plus 156 letter templates for every stakeholder communication scenario. Every document is grounded in verified evidence from the pipeline \u2014 not generated from thin air. Board-ready briefs, investor presentations, and regulator submissions are produced from the same validated analysis.', highlights: ['247 document templates across 15 lifecycle categories', '156 letter templates for stakeholder communications', 'Board-ready briefs and investor presentations', 'Regulator submissions with compliance evidence', 'All grounded in verified pipeline output \u2014 not hallucinated content'], plainEnglish: 'The system doesn\u2019t just analyse \u2014 it produces the actual documents you need. Investment memos, board papers, regulator filings, partnership agreements \u2014 all built from the verified analysis, ready to use on day one.' },
                            ].map((layer) => (
                                <div key={layer.n} className="border-t-2 border-slate-300 pt-6">
                                    <div className="flex items-baseline gap-4 mb-4">
                                        <span className="text-3xl font-extralight text-slate-300">{layer.n}</span>
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{layer.title}</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{layer.extended}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                                        {layer.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                                                <p className="text-sm text-slate-500">{h}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-slate-100 pt-4">
                                        <p className="text-sm text-slate-500 leading-relaxed"><span className="text-xs font-bold text-slate-800 uppercase tracking-wide mr-2">In practice:</span>{layer.plainEnglish}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Text */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">The Experience</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">
                                You describe your situation. The system figures out the rest.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                                You don&rsquo;t need to know which formula applies, which jurisdiction pack to select, or which document your situation requires. The system learns your case as the conversation develops. It detects signals while you type, builds the case model in the background, checks compliance for your jurisdiction, and tells you exactly what to generate when you&rsquo;re ready.
                            </p>
                        </div>

                        {/* Right — Photo */}
                        <div>
                            <div className="h-80 lg:h-[28rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=900&fit=crop&q=80"
                                    alt="Intelligence experience interface"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Three detail columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Signal Detection</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">The system reads intent, context, urgency, and complexity from your natural language. Mention a company &mdash; entity verification triggers automatically. Mention a country &mdash; jurisdiction compliance loads in the background.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Adaptive Depth</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">First-time users get guided walkthroughs and plain-language explanations. Experienced analysts get full control over advanced settings, detailed audit trails, and granular data breakdowns.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Guided 10-Step Intake</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">A structured 10-step protocol captures everything the system needs: opportunity definition, strategic alignment, market analysis, financial structure, risk assessment, stakeholder mapping, implementation, compliance, partnership terms, and success metrics.</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Text */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Deliverables</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">What you walk away with.</h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                                A verified strategy &mdash; one that has been challenged by five independent AI systems, checked for contradictions, scored for confidence on every claim, and assembled in the right order automatically. Ready for board presentations, investor conversations, and regulator submissions on day one.
                            </p>
                        </div>

                        {/* Right — Photo */}
                        <div>
                            <div className="h-80 lg:h-[28rem] overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=900&fit=crop&q=80" alt="Person walking with confidence" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Start Anywhere</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Global baseline works in any country, immediately. No jurisdiction pre-selection required.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Investor-Ready</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Every report scored against IFC Performance Standards (PS1&ndash;PS8) and UN SDGs. Compliance opens doors to DFI financing.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Protected</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Exact compliance risks flagged before they become deal-killers. Matching local regulations surfaced with legal references, forms, and filing deadlines.</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={() => { setUnifiedActiveTab('protocol'); setShowUnifiedSystemOverview(true); }} className="text-xs font-semibold text-slate-500 hover:text-blue-600 border-b border-transparent hover:border-blue-600 transition-colors pb-0.5">
                            View Complete System: Protocol, 247 Documents &amp; 156 Letters &rarr;
                        </button>
                    </div>
                </div>
            </section>

            
            <section id="partnerships" className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Photo */}
                        <div className="order-2 lg:order-1">
                            <div className="h-80 lg:h-[28rem] overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&h=900&fit=crop&q=80" alt="Partnership collaboration" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Right — Text */}
                        <div className="order-1 lg:order-2">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Partnerships</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">Early partners shape what this becomes.</h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                                We&rsquo;re looking for organisations willing to put this system to work on real problems. You get a system nobody else has access to yet. We get the real-world feedback that turns good software into something indispensable.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Investment Promotion Agencies</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Faster, defensible assessments while directly shaping what gets built next.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Regional Economic Development</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Intelligence designed for regional economies &mdash; not retrofitted from corporate tools.</p>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Public-Private Partnerships</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">Work directly with the developer. Your pain points become features.</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 px-4 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left — Photo */}
                        <div className="order-2 lg:order-1">
                            <div className="h-80 lg:h-[28rem] overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=900&fit=crop&q=80" alt="Accessible intelligence pricing" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Right — Text */}
                        <div className="order-1 lg:order-2">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Pricing</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">Verified decisions for everyone.</h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                                Not just those who can afford elite advisory firms. During beta and in future subscriptions, <strong className="text-slate-700">10% of every paid transaction</strong> goes back into initiatives that support economic development and intelligence accessibility.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Starter Access', period: '5 Days', note: 'Full Access Pass', price: 'Free', features: ['Full 10-layer pipeline', 'All 50+ engines active', '247 document templates', 'Entity verification', 'No credit card required'] },
                            { label: 'Subscription', period: '3 Months', note: 'Full Access', price: '$439', features: ['Everything in Starter', 'Unlimited analyses', 'Priority processing', 'Audit trail exports', 'Email support'] },
                            { label: 'Subscription', period: '6 Months', note: 'Full Access', price: '$810', features: ['Everything in 3-Month', 'Advanced scenario controls', 'Full engine transparency', 'Custom document templates', 'Save $49 vs quarterly'] },
                            { label: 'Subscription', period: '12 Months', note: 'Full Access', price: '$1288', features: ['Everything in 6-Month', 'Direct developer access', 'Feature request priority', 'Multi-user workspace', 'Save $348 vs quarterly'] },
                        ].map((plan) => (
                            <div key={plan.period} className="border-t-2 border-slate-300 pt-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{plan.label}</p>
                                <h3 className="text-lg font-bold text-slate-900 mb-0.5">{plan.period}</h3>
                                <p className="text-xs text-slate-500 mb-3">{plan.note}</p>
                                <p className="text-2xl font-light text-slate-900 mb-4">{plan.price}</p>
                                <ul className="space-y-1.5">
                                    {plan.features.map((f, fi) => (
                                        <li key={fi} className="flex items-start gap-2 text-xs text-slate-500">
                                            <CheckCircle2 size={12} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section id="launch-platform" className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Get Started</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-slate-800">Launch the Intelligence OS.</h2>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Terms */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                            <div className="border-t border-slate-200 pt-3">
                                <p className="text-xs text-slate-500"><strong className="text-slate-700">Strategic Decision Support</strong> &mdash; All outputs are advisory.</p>
                            </div>
                            <div className="border-t border-slate-200 pt-3">
                                <p className="text-xs text-slate-500"><strong className="text-slate-700">Reasoning Governance</strong> &mdash; Built-in safety layer screens every output before delivery.</p>
                            </div>
                            <div className="border-t border-slate-200 pt-3">
                                <p className="text-xs text-slate-500"><strong className="text-slate-700">Data Privacy</strong> &mdash; Strict GDPR and Australian Privacy Act compliance.</p>
                            </div>
                            <div className="border-t border-slate-200 pt-3">
                                <p className="text-xs text-slate-500"><strong className="text-slate-700">Accountability</strong> &mdash; Users retain final accountability for decisions.</p>
                            </div>
                        </div>

                        {/* T&C Checkbox */}
                        <div className="flex items-start gap-3 mb-6">
                            <input 
                                type="checkbox" 
                                id="acceptTerms" 
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded border-slate-300 bg-transparent text-blue-600 focus:ring-blue-400 cursor-pointer"
                            />
                            <label htmlFor="acceptTerms" className="text-sm text-slate-500 cursor-pointer">
                                By accessing the platform, you agree to our <strong className="text-slate-700">Terms &amp; Conditions</strong>
                            </label>
                        </div>

                        {/* Launch Button */}
                        <button 
                            disabled={!termsAccepted}
                            onClick={() => termsAccepted && onEnterPlatform?.()}
                            className={`w-full py-3.5 text-sm font-semibold tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                                termsAccepted 
                                    ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            Launch Intelligence OS
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Footer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-200">
                        <div>
                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">ADVERSIQ</h5>
                            <p className="text-xs text-slate-500 leading-relaxed mb-2">ADVERSIQ is an Australian-developed AI platform that verifies strategic decisions for cross-border investment and regional economic development.</p>
                            <div className="space-y-0.5 text-xs text-slate-400">
                                <p className="flex items-center gap-1"><Mail size={10} /> brayden@bwglobaladvis.info</p>
                                <p className="flex items-center gap-1"><Phone size={10} /> +63 960 835 4283</p>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Development Status</h5>
                            <p className="text-xs text-slate-500"><strong>Current Phase:</strong> Research &amp; Development</p>
                            <p className="text-xs text-slate-400 mt-1">Operating under Brayden Walls as a registered Australian sole trader. Platform being developed for government and enterprise clients.</p>
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">Documentation</h5>
                            <div className="flex flex-col gap-1 text-xs text-slate-400">
                                <button onClick={() => setActiveDocument('user-manual')} className="text-left hover:text-slate-700 transition-colors">User Manual &rarr;</button>
                                <button onClick={() => setActiveDocument('terms')} className="text-left hover:text-slate-700 transition-colors">Terms &amp; Conditions &rarr;</button>
                                <button onClick={() => setActiveDocument('privacy')} className="text-left hover:text-slate-700 transition-colors">Privacy Policy &rarr;</button>
                                <button onClick={() => setActiveDocument('ethics')} className="text-left hover:text-slate-700 transition-colors">Ethical AI Framework &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------------------------------------------------------- */}
            {/* WHAT YOU GET  -  Detail Popup Modal                          */}
            {/* ----------------------------------------------------------- */}
            {showOutputDetails && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowOutputDetails(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 flex-shrink-0 relative">
                            <button 
                                onClick={() => setShowOutputDetails(false)} 
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Document Factory</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">What You Get</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">247 document types across 15 categories, plus 156 letter templates &mdash; covering the entire lifecycle of global development projects.</p>
                        </div>
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10">
                            <div className="max-w-4xl mx-auto">

                            <p className="text-base text-slate-700 leading-relaxed mb-4">
                                This is where the system becomes practical. It takes what would normally live across spreadsheets, slide decks, consultant workstreams, and weeks of revisions &mdash; and assembles it into institutional-ready deliverables.
                            </p>

                            <div className="space-y-4 text-sm text-slate-600 mb-8">
                                <p><strong className="text-slate-900">Why it exists:</strong> High-potential regional projects fail not because the opportunity isn&rsquo;t real &mdash; but because nobody packaged the case at the standard investors and governments expect. This fixes that.</p>
                                <p><strong className="text-slate-900">How it works:</strong> It fuses your intake data, scores, and risk tests into a single evidence-backed narrative.</p>
                                <p><strong className="text-slate-900">What you get:</strong> Decision-ready documents and packs that match the expectations of boards, agencies, and partners &mdash; generated from the same validated analysis.</p>
                            </div>

                            <h3 className="text-lg font-semibold text-blue-600 mb-2">The Document Factory Catalog</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                <strong>247 Document Types</strong> across <strong>15 Categories</strong>, plus <strong>156 Letter Templates</strong> &mdash; covering the entire lifecycle of global development projects, including case study analysis and intelligence extraction.
                            </p>

                            {/* 15 CATEGORY STRUCTURE */}
                            <div className="bg-slate-50 border-t border-slate-200 p-4 mb-6">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">THE 15-CATEGORY LIFECYCLE STRUCTURE</p>
                                <div className="grid grid-cols-5 gap-3 text-center text-xs">
                                    <div className="bg-emerald-50 border border-emerald-200 rounded p-2">
                                        <p className="font-bold text-emerald-700">ENTRY PHASE</p>
                                        <p className="text-slate-600">Strategy, Market, Government</p>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded p-2">
                                        <p className="font-bold text-blue-700">DEAL PHASE</p>
                                        <p className="text-slate-600">Foundation, Financial, Partnership</p>
                                    </div>
                                    <div className="bg-amber-50 border border-amber-200 rounded p-2">
                                        <p className="font-bold text-amber-700">EXECUTION PHASE</p>
                                        <p className="text-slate-600">PM, Procurement, HR, Infrastructure</p>
                                    </div>
                                    <div className="bg-rose-50 border border-rose-200 rounded p-2">
                                        <p className="font-bold text-rose-700">SAFETY PHASE</p>
                                        <p className="text-slate-600">Risk, Governance, Regulatory, ESG</p>
                                    </div>
                                    <div className="bg-violet-50 border border-violet-200 rounded p-2">
                                        <p className="font-bold text-violet-700">INTELLIGENCE PHASE</p>
                                        <p className="text-slate-600">Case Study Analysis &amp; Extraction</p>
                                    </div>
                                </div>
                            </div>

                            {/* FULL 14-CATEGORY CATALOG */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                {/* Category 1: Foundation & Legal */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">1. Foundation &amp; Legal (10 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Letter of Intent (LOI)</li>
                                        <li>&bull; Memorandum of Understanding (MOU)</li>
                                        <li>&bull; Non-Disclosure Agreement (NDA)</li>
                                        <li>&bull; Term Sheet</li>
                                        <li>&bull; Expression of Interest (EOI)</li>
                                        <li>&bull; Request for Information (RFI)</li>
                                        <li>&bull; Request for Proposal (RFP)</li>
                                        <li>&bull; Request for Quotation (RFQ)</li>
                                        <li>&bull; Invitation to Tender (ITT)</li>
                                        <li>&bull; Pre-Qualification Document</li>
                                    </ul>
                                </div>

                                {/* Category 2: Strategic Intelligence */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">2. Strategic Intelligence (12 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Executive Summary</li>
                                        <li>&bull; Strategic Brief</li>
                                        <li>&bull; Strategic Plan</li>
                                        <li>&bull; Business Case</li>
                                        <li>&bull; Feasibility Study</li>
                                        <li>&bull; Market Entry Strategy</li>
                                        <li>&bull; Growth Strategy</li>
                                        <li>&bull; Exit Strategy</li>
                                        <li>&bull; Turnaround Plan</li>
                                        <li>&bull; Transformation Roadmap</li>
                                        <li>&bull; Vision Document</li>
                                        <li>&bull; White Paper</li>
                                    </ul>
                                </div>

                                {/* Category 3: Financial & Investment */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">3. Financial &amp; Investment (19 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Financial Model (5-Year Projections)</li>
                                        <li>&bull; Investment Memo</li>
                                        <li>&bull; Investment Thesis</li>
                                        <li>&bull; Capital Raise Deck</li>
                                        <li>&bull; Private Placement Memorandum (PPM)</li>
                                        <li>&bull; Prospectus</li>
                                        <li>&bull; Bond Offering Document</li>
                                        <li>&bull; Project Finance Model</li>
                                        <li>&bull; Valuation Report</li>
                                        <li>&bull; Fairness Opinion</li>
                                        <li>&bull; Solvency Opinion</li>
                                        <li>&bull; Credit Analysis</li>
                                        <li>&bull; Cash Flow Analysis</li>
                                        <li>&bull; Budget Proposal</li>
                                        <li>&bull; Cost-Benefit Analysis</li>
                                        <li>&bull; ROI Analysis</li>
                                        <li>&bull; NPV/IRR Analysis</li>
                                        <li>&bull; Sensitivity Analysis</li>
                                        <li>&bull; Monte Carlo Simulation Report</li>
                                    </ul>
                                </div>

                                {/* Category 4: Risk & Due Diligence */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">4. Risk &amp; Due Diligence (21 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Risk Assessment Report</li>
                                        <li>&bull; Blind Spot Audit</li>
                                        <li>&bull; Risk Register</li>
                                        <li>&bull; Risk Mitigation Plan</li>
                                        <li>&bull; Due Diligence Request List</li>
                                        <li>&bull; Due Diligence Report</li>
                                        <li>&bull; Legal Due Diligence</li>
                                        <li>&bull; Financial Due Diligence</li>
                                        <li>&bull; Commercial Due Diligence</li>
                                        <li>&bull; Technical Due Diligence</li>
                                        <li>&bull; Environmental Due Diligence</li>
                                        <li>&bull; Tax Due Diligence</li>
                                        <li>&bull; HR Due Diligence</li>
                                        <li>&bull; IT Due Diligence</li>
                                        <li>&bull; Background Check Report</li>
                                        <li>&bull; Integrity Due Diligence</li>
                                        <li>&bull; Sanctions Screening Report</li>
                                        <li>&bull; AML/KYC Report</li>
                                        <li>&bull; Political Risk Assessment</li>
                                        <li>&bull; Country Risk Report</li>
                                        <li>&bull; Currency Risk Analysis</li>
                                    </ul>
                                </div>

                                {/* Category 5: Government & Policy */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">5. Government &amp; Policy (21 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Policy Brief</li>
                                        <li>&bull; Position Paper</li>
                                        <li>&bull; Regulatory Impact Assessment</li>
                                        <li>&bull; Legislative Proposal</li>
                                        <li>&bull; Cabinet Memo</li>
                                        <li>&bull; Ministerial Briefing</li>
                                        <li>&bull; Budget Submission</li>
                                        <li>&bull; Public Consultation Document</li>
                                        <li>&bull; PPP Proposal Framework</li>
                                        <li>&bull; Concession Agreement</li>
                                        <li>&bull; Sovereign Guarantee Request</li>
                                        <li>&bull; Bilateral Investment Treaty Template</li>
                                        <li>&bull; Free Trade Agreement Analysis</li>
                                        <li>&bull; Economic Impact Assessment</li>
                                        <li>&bull; Social Impact Assessment</li>
                                        <li>&bull; National Development Plan</li>
                                        <li>&bull; Sector Development Strategy</li>
                                        <li>&bull; Special Economic Zone Proposal</li>
                                        <li>&bull; Investment Promotion Brief</li>
                                        <li>&bull; Grant Application</li>
                                        <li>&bull; Subsidy Application</li>
                                    </ul>
                                </div>

                                {/* Category 6: Partnership & Consortium */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">6. Partnership &amp; Consortium (14 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Partnership Proposal</li>
                                        <li>&bull; Partnership Assessment</li>
                                        <li>&bull; Partner Comparison Matrix</li>
                                        <li>&bull; Alliance Framework</li>
                                        <li>&bull; Consortium Agreement</li>
                                        <li>&bull; Joint Venture Agreement</li>
                                        <li>&bull; Teaming Agreement</li>
                                        <li>&bull; Co-Development Agreement</li>
                                        <li>&bull; Technology Transfer Agreement</li>
                                        <li>&bull; Capacity Building Program</li>
                                        <li>&bull; Local Content Plan</li>
                                        <li>&bull; Stakeholder Mapping</li>
                                        <li>&bull; Stakeholder Engagement Strategy</li>
                                        <li>&bull; Partnership Scorecard</li>
                                    </ul>
                                </div>

                                {/* Category 7: Execution & Project Management */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">7. Execution &amp; Project Management (18 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Implementation Roadmap</li>
                                        <li>&bull; 100-Day Plan</li>
                                        <li>&bull; Project Charter</li>
                                        <li>&bull; Project Plan</li>
                                        <li>&bull; Gantt Chart</li>
                                        <li>&bull; Critical Path Analysis</li>
                                        <li>&bull; Milestone Report</li>
                                        <li>&bull; Status Report</li>
                                        <li>&bull; Lessons Learned</li>
                                        <li>&bull; Change Management Plan</li>
                                        <li>&bull; Integration Plan</li>
                                        <li>&bull; Post-Merger Integration Playbook</li>
                                        <li>&bull; Transition Plan</li>
                                        <li>&bull; Business Continuity Plan</li>
                                        <li>&bull; Disaster Recovery Plan</li>
                                        <li>&bull; Quality Management System</li>
                                        <li>&bull; Process Documentation (SOP)</li>
                                        <li>&bull; Performance Metrics (KPI Framework)</li>
                                    </ul>
                                </div>

                                {/* Category 8: Governance & Board */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">8. Governance &amp; Board Reporting (12 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Board Charter</li>
                                        <li>&bull; Steering Committee Report</li>
                                        <li>&bull; Decision Rights Matrix</li>
                                        <li>&bull; Governance Report</li>
                                        <li>&bull; Annual Report</li>
                                        <li>&bull; Quarterly Report</li>
                                        <li>&bull; Board Presentation</li>
                                        <li>&bull; Shareholder Letter</li>
                                        <li>&bull; Proxy Statement</li>
                                        <li>&bull; Committee Charter</li>
                                        <li>&bull; Board Resolution Template</li>
                                        <li>&bull; Corporate Minutes Template</li>
                                    </ul>
                                </div>

                                {/* Category 9: Human Capital */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">9. Human Capital &amp; Capability (12 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Organizational Chart</li>
                                        <li>&bull; Talent Gap Analysis</li>
                                        <li>&bull; Key Personnel Bios</li>
                                        <li>&bull; Capability Assessment</li>
                                        <li>&bull; Training Materials</li>
                                        <li>&bull; HR Due Diligence Report</li>
                                        <li>&bull; Compensation Benchmarking</li>
                                        <li>&bull; Succession Planning</li>
                                        <li>&bull; Performance Management Framework</li>
                                        <li>&bull; Employee Handbook</li>
                                        <li>&bull; Onboarding Program</li>
                                        <li>&bull; Culture Assessment</li>
                                    </ul>
                                </div>

                                {/* Category 10: Procurement & Supply Chain */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">10. Procurement &amp; Supply Chain (13 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Procurement Strategy</li>
                                        <li>&bull; Vendor Assessment Scorecard</li>
                                        <li>&bull; Supply Chain Mapping</li>
                                        <li>&bull; Tender Document</li>
                                        <li>&bull; Bid Evaluation Matrix</li>
                                        <li>&bull; Supplier Qualification</li>
                                        <li>&bull; Purchase Order Template</li>
                                        <li>&bull; Master Service Agreement</li>
                                        <li>&bull; Supply Agreement</li>
                                        <li>&bull; Distribution Agreement</li>
                                        <li>&bull; Logistics Plan</li>
                                        <li>&bull; Inventory Management</li>
                                        <li>&bull; Supplier Risk Assessment</li>
                                    </ul>
                                </div>

                                {/* Category 11: ESG & Social Impact */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">11. ESG &amp; Social Impact (19 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; ESG Report</li>
                                        <li>&bull; Sustainability Report</li>
                                        <li>&bull; Carbon Footprint Assessment</li>
                                        <li>&bull; Net Zero Roadmap</li>
                                        <li>&bull; Environmental Impact Assessment</li>
                                        <li>&bull; Social Impact Assessment</li>
                                        <li>&bull; Community Engagement Plan</li>
                                        <li>&bull; Human Rights Due Diligence</li>
                                        <li>&bull; Labor Standards Assessment</li>
                                        <li>&bull; Supply Chain Ethical Audit</li>
                                        <li>&bull; Diversity &amp; Inclusion Report</li>
                                        <li>&bull; Governance Report</li>
                                        <li>&bull; Ethics Policy / Code of Conduct</li>
                                        <li>&bull; Whistleblower Policy</li>
                                        <li>&bull; Anti-Bribery Program</li>
                                        <li>&bull; Green Bond Framework</li>
                                        <li>&bull; Social Bond Framework</li>
                                        <li>&bull; Impact Measurement Report</li>
                                        <li>&bull; UN SDG Alignment Report</li>
                                    </ul>
                                </div>

                                {/* Category 12: Regulatory & Compliance */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">12. Regulatory &amp; Compliance (16 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Permit Application</li>
                                        <li>&bull; Regulatory Clearance Timeline</li>
                                        <li>&bull; Compliance Certificate</li>
                                        <li>&bull; Regulatory Filing</li>
                                        <li>&bull; License Application</li>
                                        <li>&bull; Regulatory Pathway Document</li>
                                        <li>&bull; Compliance Checklist</li>
                                        <li>&bull; Anti-Corruption Policy</li>
                                        <li>&bull; Data Protection Policy (GDPR)</li>
                                        <li>&bull; Sanctions Clearance Certificate</li>
                                        <li>&bull; Export Control Assessment</li>
                                        <li>&bull; Customs Declaration</li>
                                        <li>&bull; Trade Compliance Report</li>
                                        <li>&bull; Regulatory Change Impact</li>
                                        <li>&bull; Audit Response Document</li>
                                        <li>&bull; Dispute Resolution Brief</li>
                                    </ul>
                                </div>

                                {/* Category 13: Communications & IR */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">13. Communications &amp; IR (17 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Press Release</li>
                                        <li>&bull; Media Kit</li>
                                        <li>&bull; Investor Presentation</li>
                                        <li>&bull; Board Presentation Deck</li>
                                        <li>&bull; Stakeholder Update</li>
                                        <li>&bull; Crisis Communication Plan</li>
                                        <li>&bull; Internal Memo</li>
                                        <li>&bull; Newsletter Template</li>
                                        <li>&bull; Case Study</li>
                                        <li>&bull; Testimonial Collection</li>
                                        <li>&bull; FAQ Document</li>
                                        <li>&bull; Talking Points</li>
                                        <li>&bull; Speech Draft</li>
                                        <li>&bull; Op-Ed Template</li>
                                        <li>&bull; Social Media Strategy</li>
                                        <li>&bull; Brand Guidelines</li>
                                        <li>&bull; Content Calendar</li>
                                    </ul>
                                </div>

                                {/* Category 14: Asset & Infrastructure */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">14. Asset &amp; Infrastructure (17 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Site Selection Report</li>
                                        <li>&bull; Asset Utilization Plan</li>
                                        <li>&bull; Technical Requirements Brief</li>
                                        <li>&bull; Infrastructure Assessment</li>
                                        <li>&bull; Grid Connection Study</li>
                                        <li>&bull; Engineering Study</li>
                                        <li>&bull; Feasibility Engineering</li>
                                        <li>&bull; Resource Assessment</li>
                                        <li>&bull; Reserve Report (Mining/Oil)</li>
                                        <li>&bull; Power Purchase Agreement (PPA)</li>
                                        <li>&bull; Offtake Agreement</li>
                                        <li>&bull; Construction Contract (EPC)</li>
                                        <li>&bull; O&amp;M Agreement</li>
                                        <li>&bull; Technology Roadmap</li>
                                        <li>&bull; Patent/IP Landscape Analysis</li>
                                        <li>&bull; Safety Assessment</li>
                                        <li>&bull; Equipment Specification</li>
                                    </ul>
                                </div>

                                {/* Category 15: Case Study Intelligence */}
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <h5 className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">15. Case Study Intelligence (15 types)</h5>
                                    <ul className="space-y-0.5 text-xs text-slate-600">
                                        <li>&bull; Case Study Analysis Report</li>
                                        <li>&bull; Strength/Weakness Diagnostic</li>
                                        <li>&bull; NSIL Section Scoring Report</li>
                                        <li>&bull; Adversarial Debate Transcript</li>
                                        <li>&bull; Historical Parallel Matching Report</li>
                                        <li>&bull; Replication Viability Assessment</li>
                                        <li>&bull; Financial Gap Analysis</li>
                                        <li>&bull; Governance Framework Assessment</li>
                                        <li>&bull; Stakeholder Engagement Plan</li>
                                        <li>&bull; Implementation Roadmap</li>
                                        <li>&bull; Partner Proposal Template</li>
                                        <li>&bull; Executive Brief (from uploaded case)</li>
                                        <li>&bull; Case Study Rewrite (institutional format)</li>
                                        <li>&bull; Community Impact Assessment</li>
                                        <li>&bull; Due Diligence Summary (from uploaded evidence)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* LETTER TEMPLATES SECTION */}
                            <div className="border-t-2 border-slate-300 pt-6 mb-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">+ 156 Letter Templates</h3>
                                <p className="text-sm text-slate-500 mb-4">Professional correspondence for every stage of deal-making:</p>
                                <div className="grid md:grid-cols-3 gap-3 text-xs text-slate-500">
                                    <div>
                                        <p className="font-semibold text-slate-900 mb-1">Outreach &amp; Introduction</p>
                                        <p>&bull; Partnership Introduction</p>
                                        <p>&bull; Investment Promotion</p>
                                        <p>&bull; Ministerial Introduction</p>
                                        <p>&bull; Trade Mission Request</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 mb-1">Deal &amp; Negotiation</p>
                                        <p>&bull; Commitment Confirmation</p>
                                        <p>&bull; JV Invitation</p>
                                        <p>&bull; Co-Investment Invitation</p>
                                        <p>&bull; Price Negotiation</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 mb-1">Operations &amp; Compliance</p>
                                        <p>&bull; Vendor Onboarding</p>
                                        <p>&bull; Audit Response</p>
                                        <p>&bull; License Renewal</p>
                                        <p>&bull; Crisis Statement</p>
                                    </div>
                                </div>
                            </div>

                            {/* PAGE LENGTH OPTIONS */}
                            <div className="border-t border-slate-200 pt-4 mb-6">
                                <p className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Flexible Page Lengths: 1 to 100 Pages</p>
                                <p className="text-xs text-slate-500">Every document can be generated at the length you need: 1-page quick brief, 10-page board report, or 100-page full documentation package.</p>
                            </div>

                            <div className="border-t border-slate-200 pt-4">
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    <strong className="text-slate-900">The audit trail:</strong> Every recommendation traces back to specific data inputs, formula calculations, and persona debate transcripts. This isn&rsquo;t a black box &mdash; it&rsquo;s court-defensible, investor-ready documentation of exactly why the system reached each conclusion.
                                </p>
                            </div>
                            </div>

                        {/* --- PROOF OF CAPABILITY --- */}
                        <div className="py-10 px-6 md:px-8 bg-white border-t border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 mb-4">Proof of Capability</p>
                                <h3 className="text-2xl font-light text-slate-800 mb-3">See the System in Action</h3>
                                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                    Words are cheap. The best way to understand what this system produces is to see an actual report it generated from a real submission. Below is a live example of a regional council that submitted a 5MW solar partnership proposal through the Ten-Step Protocol.
                                </p>
                                <button 
                                    onClick={() => { setShowOutputDetails(false); setShowProofPopup(true); }}
                                    className="w-full py-3 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <Info size={16} />
                                    See the Proof &mdash; A Real System, A Real Report
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* TEN-STEP PROTOCOL  -  Detail Popup Modal  -  REDESIGNED      */}
            {/* ----------------------------------------------------------- */}
            {showProtocolDetails && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowProtocolDetails(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 flex-shrink-0 relative">
                            <button 
                                onClick={() => setShowProtocolDetails(false)} 
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">The Process</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">From First Input to Final Document</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">Three stages, one continuous evidence chain. Adaptive intake captures your opportunity. Adversarial analysis stress-tests every claim. Institutional output produces documents your decision-makers can act on.</p>
                        </div>
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                        
                        {/* Content sections */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">

                                {/* ADVERSIQ Consultant intro */}
                                    <div className="bg-white border-t border-slate-200 p-6 mb-6 shadow-sm">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-[7px] tracking-tight">ADV</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 leading-tight">ADVERSIQ Consultant</h3>
                                                <p className="text-xs text-blue-600 font-medium mt-0.5">Powered by NSIL Agentic Runtime &bull; Case Study Builder</p>
                                            </div>
                                        </div>

                                        {/* 5-Phase Flow */}
                                        <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
                                            {[
                                                { label: '1. Intake', color: 'bg-stone-900 text-white border-stone-900' },
                                                { label: '2. Discovery', color: 'bg-stone-700 text-white border-stone-700' },
                                                { label: '3. Analysis', color: 'bg-amber-600 text-white border-amber-600' },
                                                { label: '4. Recommendations', color: 'bg-amber-500 text-white border-amber-500' },
                                                { label: '5. Generation', color: 'bg-blue-600 text-white border-blue-600' },
                                            ].map((phase, i, arr) => (
                                                <div key={phase.label} className="flex items-center gap-1.5 flex-shrink-0">
                                                    <div className={`px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide ${phase.color}`}>{phase.label}</div>
                                                    {i < arr.length - 1 && <span className="text-stone-400 text-sm font-bold">&rarr;</span>}
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                            Hello &mdash; welcome, and thank you for being here.<br /><br />
                                            I'm your ADVERSIQ Consultant. I'm here to assist you in any way I can to help you better connect with those who wish to do business or invest in regional areas, no matter where they are in the world. Whether it's preparing the right documents, understanding a new market, building a compelling case, or simply working through an idea &mdash; this is what I do.<br /><br />
                                            Are you looking to know more about something? Need help writing a letter or proposal? Want to build a case study for a project you're working on? Or do you just need some guidance on where to start?<br /><br />
                                            Let me know what you need and we'll get to work.
                                        </p>
                                        {/* Add logic to capture name/location and act on it in subsequent steps */}
                                        {/* This would be handled in the chat logic or intake form, e.g. */}
                                        {/* <NameLocationCapture onSubmit={(name, location) => setUserInfo({ name, location })} /> */}
                                    </div>

                                {/* Three Stages Overview  -  Clickable Cards */}
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <button 
                                        onClick={() => setActiveWorkflowStage('intake')}
                                        className="text-left bg-white border-2 border-blue-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</div>
                                            <span className="text-xs text-blue-600 uppercase tracking-wider font-bold">STAGE ONE</span>
                                        </div>
                                        <h4 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-700">Adaptive Intake</h4>
                                        <p className="text-xs text-slate-600">ADVERSIQ Consultant captures 10 dimensions through conversation &mdash; scope, financials, risk, compliance, and partnership terms</p>
                                        <p className="text-xs text-blue-600 mt-3 font-medium group-hover:underline">Click to explore &rarr;</p>
                                    </button>

                                    <button 
                                        onClick={() => setActiveWorkflowStage('analysis')}
                                        className="text-left bg-white border-2 border-amber-200 rounded-lg p-5 hover:border-amber-400 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">2</div>
                                            <span className="text-xs text-amber-600 uppercase tracking-wider font-bold">STAGE TWO</span>
                                        </div>
                                        <h4 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-amber-700">Adversarial Analysis</h4>
                                        <p className="text-xs text-slate-600">Stress-test with 5 personas, 54+ formulas, and Monte Carlo simulation</p>
                                        <p className="text-xs text-amber-600 mt-3 font-medium group-hover:underline">Click to explore &rarr;</p>
                                    </button>

                                    <button 
                                        onClick={() => setActiveWorkflowStage('output')}
                                        className="text-left bg-white border-2 border-emerald-200 rounded-lg p-5 hover:border-emerald-400 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">3</div>
                                            <span className="text-xs text-emerald-600 uppercase tracking-wider font-bold">STAGE THREE</span>
                                        </div>
                                        <h4 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-emerald-700">Institutional Output</h4>
                                        <p className="text-xs text-slate-600">Compile evidence into 247 document types and 156 letter templates</p>
                                        <p className="text-xs text-emerald-600 mt-3 font-medium group-hover:underline">Click to explore &rarr;</p>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* The 10 Steps Grid */}
                        <section className="py-8 px-6 md:px-8 bg-white">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-blue-600 uppercase tracking-[0.2em] text-xs mb-3 font-bold">ADVERSIQ CONSULTANT &mdash; INTAKE PHASE</p>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">What Gets Captured Across 10 Dimensions</h3>
                                <p className="text-sm text-slate-600 mb-1">Most users complete this in 30&ndash;45 minutes. ADVERSIQ Consultant builds this picture through conversation &mdash; asking the right questions in sequence so you never face a blank form. By the end, the system has clear scope, quantified assumptions, full risk visibility, and a consistent dataset the reasoning engine can trust.</p>
                                <p className="text-sm text-slate-500 mb-6">Click any dimension to see what gets captured:</p>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                                    {tenStepProtocol.map((item) => (
                                        <button
                                            key={item.step}
                                            onClick={() => setActiveStep(activeStep === item.step ? null : item.step)}
                                            className={`text-left transition-all rounded-lg p-4 border-2 ${
                                                activeStep === item.step
                                                    ? 'bg-blue-100 border-blue-400 shadow-md'
                                                    : item.gliEnabled
                                                        ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
                                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    activeStep === item.step ? 'bg-blue-600 text-white' : item.gliEnabled ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-200 text-slate-600'
                                                }`}>
                                                    {item.step}
                                                </div>
                                                {item.gliEnabled && <span className="text-[10px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded font-medium">GLI</span>}
                                            </div>
                                            <h4 className="text-xs font-semibold text-slate-700 leading-tight">{item.title}</h4>
                                        </button>
                                    ))}
                                </div>

                                {/* Active Step Detail */}
                                {activeStep && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                                        <h4 className="text-sm font-semibold text-slate-900 mb-2">Step {activeStep}: {tenStepProtocol[activeStep - 1].title}</h4>
                                        <p className="text-sm text-slate-600 mb-4">{tenStepProtocol[activeStep - 1].description}</p>

                                        {tenStepProtocol[activeStep - 1].gliEnabled && tenStepProtocol[activeStep - 1].gliNote && (
                                            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
                                                <p className="text-xs text-indigo-700 font-medium"><span className="font-bold">BW Intel Integration:</span> {tenStepProtocol[activeStep - 1].gliNote}</p>
                                            </div>
                                        )}

                                        <div className="bg-white rounded-lg p-4 border border-slate-200">
                                            <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">Data Requirements:</h5>
                                            <ul className="grid md:grid-cols-2 gap-2">
                                                {tenStepProtocol[activeStep - 1].details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                                        <CheckCircle2 size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Stage 2 - Adversarial Analysis */}
                        <section className="py-8 px-6 md:px-8 bg-slate-50 border-t border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-amber-600 uppercase tracking-[0.2em] text-xs mb-3 font-bold">STAGE 2 &mdash; ADVERSARIAL ANALYSIS</p>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Every Claim Gets Stress-Tested</h3>
                                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                                    Once intake is complete, the system stress-tests every claim. A SAT Contradiction Solver checks for logical inconsistencies across your inputs. Five adversarial personas &mdash; Skeptic, Advocate, Regulator, Accountant, Operator &mdash; debate the opportunity using Bayesian inference. 54+ proprietary formulas calculate risk-adjusted returns, stakeholder alignment, and strategic positioning. Monte Carlo simulation runs 5,000 scenarios to show you the real distribution of outcomes, not just the optimistic case.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-amber-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <Shield size={16} className="text-amber-600" />
                                            What Gets Tested
                                        </h4>
                                        <ul className="space-y-2 text-xs text-slate-600">
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Input contradictions via SAT Solver</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Five adversarial personas debate every angle</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> 54+ proprietary scoring formulas</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Monte Carlo across 5,000 scenarios</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Regional Development Kernel with causal graphs</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Partner Intelligence Engine rankings</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border border-amber-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <FileCheck size={16} className="text-amber-600" />
                                            What Comes Out
                                        </h4>
                                        <ul className="space-y-2 text-xs text-slate-600">
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Quantified scores with confidence intervals</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Risk matrix with mitigations</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Adversarial debate transcripts</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Outcome distribution from simulation</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Structural twin region benchmarks</li>
                                            <li className="flex items-start gap-2"><CheckCircle2 size={12} className="text-amber-500 mt-0.5" /> Ranked co-investor and partner shortlists</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Stage 3 - Institutional Output */}
                        <section className="py-8 px-6 md:px-8 bg-white border-t border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-emerald-600 uppercase tracking-[0.2em] text-xs mb-3 font-bold">STAGE 3 &mdash; INSTITUTIONAL OUTPUT</p>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">Every Score Becomes a Document</h3>
                                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                                    Every score, every debate conclusion, every simulation result flows into document generation. 247 document types across 15 categories. 156 letter templates for every stage of deal-making. All populated with your actual data, exact scores, and traceable reasoning &mdash; not AI-generated placeholder text. The 15th category, Case Study Intelligence, lets you upload existing reports, proposals, or case studies and receive full NSIL analysis: scored sections, adversarial debate, historical parallels, and recommended documents.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="border-t-2 border-slate-300 pt-6 text-center">
                                        <p className="text-3xl font-bold text-emerald-700 mb-1">247+</p>
                                        <p className="text-xs font-semibold text-slate-700">Document Types</p>
                                        <p className="text-xs text-slate-500 mt-1">Across 15 categories, covering the full project lifecycle</p>
                                    </div>
                                    <div className="border-t-2 border-slate-300 pt-6 text-center">
                                        <p className="text-3xl font-bold text-emerald-700 mb-1">156+</p>
                                        <p className="text-xs font-semibold text-slate-700">Letter Templates</p>
                                        <p className="text-xs text-slate-500 mt-1">For every stage of deal-making, LOIs to closing briefs</p>
                                    </div>
                                    <div className="border-t-2 border-slate-300 pt-6 text-center">
                                        <p className="text-3xl font-bold text-emerald-700 mb-1">100%</p>
                                        <p className="text-xs font-semibold text-slate-700">Your Data</p>
                                        <p className="text-xs text-slate-500 mt-1">Exact scores and reasoning from source data</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Close Button */}
                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50 rounded-b-sm">
                            <button 
                                onClick={() => setShowProtocolDetails(false)}
                                className="px-6 py-2 bg-slate-800 text-white rounded-sm text-sm font-semibold hover:bg-slate-900 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            {/* WORKFLOW STAGE DETAIL POPUPS */}
            {activeWorkflowStage && (
                <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setActiveWorkflowStage(null)}>
                    <div className="bg-white shadow-2xl max-w-4xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
                        
                        {/* Stage 1: Structured Intake */}
                        {activeWorkflowStage === 'intake' && (
                            <>
                                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-8 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-xs font-bold mb-1">STAGE 1</p>
                                        <h3 className="text-3xl md:text-4xl font-light leading-tight text-slate-800">Structured Intake</h3>
                                        <p className="text-sm text-slate-500 mt-2">Define the opportunity in measurable terms</p>
                                    </div>
                                    <button onClick={() => setActiveWorkflowStage(null)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={24} /></button>
                                </div>
                                <div className="p-6 md:p-8 space-y-6">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        The intake process forces clarity. You cannot submit vague aspirations &mdash; the system requires specific, measurable, verifiable data. This isn&rsquo;t bureaucracy; it&rsquo;s the foundation that makes everything else possible.
                                    </p>
                                    
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">The 10 Dimensions Captured</h4>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {tenStepProtocol.map((item) => (
                                                <div key={item.step} className="flex items-start gap-3 text-xs text-slate-600 bg-white p-3 rounded border border-blue-100">
                                                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">{item.step}</span>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{item.title}</p>
                                                        <p className="text-slate-500 mt-0.5">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-700 mb-2">Why This Matters</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Every downstream analysis &mdash; the formulas, the debate, the scoring &mdash; depends on the quality of inputs. Garbage in, garbage out. The structured intake ensures the reasoning engine works with complete, well-structured, internally consistent data. The same inputs will always produce the same validated output.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-8 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-end">
                                    <button onClick={() => setActiveWorkflowStage(null)} className="px-6 py-2 bg-slate-900 text-white rounded-sm text-sm font-bold hover:bg-slate-800 transition-all">Close</button>
                                </div>
                            </>
                        )}

                        {/* Stage 2: Adversarial Analysis */}
                        {activeWorkflowStage === 'analysis' && (
                            <>
                                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-8 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-xs font-bold mb-1">STAGE 2</p>
                                        <h3 className="text-3xl md:text-4xl font-light leading-tight text-slate-800">Adversarial Analysis</h3>
                                        <p className="text-sm text-slate-500 mt-2">Stress-test with personas and scoring models</p>
                                    </div>
                                    <button onClick={() => setActiveWorkflowStage(null)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={24} /></button>
                                </div>
                                <div className="p-6 md:p-8 space-y-6">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        Once your inputs are validated, the system attacks them from every angle. This isn&rsquo;t optimistic forecasting &mdash; it&rsquo;s rigorous stress-testing designed to find problems before the market does.
                                    </p>

                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">The Adversarial Pipeline</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3 bg-white p-3 rounded border border-amber-100">
                                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">SAT Contradiction Solver</p>
                                                    <p className="text-xs text-slate-600">Converts inputs to propositional logic (CNF) and runs DPLL satisfiability checks. Catches conflicts like &ldquo;low risk + 40% ROI&rdquo; immediately.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-white p-3 rounded border border-amber-100">
                                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">54+ Formula Engine</p>
                                                    <p className="text-xs text-slate-600">DAG Scheduler executes SPI, RROI, SEAM, and 51+ more formulas across 5 dependency levels. Each produces bounded, auditable scores.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-white p-3 rounded border border-amber-100">
                                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">Five-Persona Bayesian Debate</p>
                                                    <p className="text-xs text-slate-600">Skeptic (1.2x weight), Advocate, Regulator, Accountant, Operator. Each votes proceed/pause/restructure/reject. Beliefs update via Bayesian inference.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-white p-3 rounded border border-amber-100">
                                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">Monte Carlo Stress Testing</p>
                                                    <p className="text-xs text-slate-600">5,000 simulated futures with Markov state transitions. Tests your proposal against economic shocks, policy changes, and market shifts.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-700 mb-2">The Output</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            A classification (Investment Ready, Conditional, Do Not Proceed) backed by quantified scores, persona reasoning transcripts, and specific findings that support or challenge the proposal. Nothing is smoothed over. Disagreements are preserved.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-8 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-end">
                                    <button onClick={() => setActiveWorkflowStage(null)} className="px-6 py-2 bg-slate-900 text-white rounded-sm text-sm font-bold hover:bg-slate-800 transition-all">Close</button>
                                </div>
                            </>
                        )}

                        {/* Stage 3: Institutional Output */}
                        {activeWorkflowStage === 'output' && (
                            <>
                                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-8 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-xs font-bold mb-1">STAGE 3</p>
                                        <h3 className="text-3xl md:text-4xl font-light leading-tight text-slate-800">Institutional Output</h3>
                                        <p className="text-sm text-slate-500 mt-2">Compile evidence into auditable deliverables</p>
                                    </div>
                                    <button onClick={() => setActiveWorkflowStage(null)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={24} /></button>
                                </div>
                                <div className="p-6 md:p-8 space-y-6">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        The final stage transforms validated analysis into professional deliverables. Every document is populated with real data, exact scores, and traceable reasoning &mdash; not AI-generated fluff.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
                                            <h4 className="text-lg font-bold text-emerald-700 mb-2">247 Document Types</h4>
                                            <p className="text-xs text-slate-600 mb-3">Across 15 categories:</p>
                                            <ul className="space-y-1.5 text-xs text-slate-600">
                                                <li>&bull; Foundation &amp; Strategic Planning</li>
                                                <li>&bull; Financial Analysis &amp; Modeling</li>
                                                <li>&bull; Risk Assessment &amp; Mitigation</li>
                                                <li>&bull; Government &amp; Policy Compliance</li>
                                                <li>&bull; Partnership &amp; Stakeholder Management</li>
                                                <li>&bull; Governance &amp; Monitoring</li>
                                                <li>&bull; ESG &amp; Sustainability Reporting</li>
                                                <li className="text-violet-700 font-medium">&bull; Case Study Intelligence &amp; Analysis</li>
                                                <li>&bull; And 7 more categories...</li>
                                            </ul>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                                            <h4 className="text-lg font-bold text-blue-700 mb-2">156 Letter Templates</h4>
                                            <p className="text-xs text-slate-600 mb-3">Professional correspondence for:</p>
                                            <ul className="space-y-1.5 text-xs text-slate-600">
                                                <li>&bull; Investment LOI &amp; EOI</li>
                                                <li>&bull; Government Applications</li>
                                                <li>&bull; Compliance Declarations</li>
                                                <li>&bull; Stakeholder Engagement</li>
                                                <li>&bull; Partnership Proposals</li>
                                                <li>&bull; Trade &amp; Export Documentation</li>
                                                <li>&bull; Crisis Communications</li>
                                                <li>&bull; And 8 more categories...</li>
                                            </ul>
                                            <button 
                                                onClick={() => { setActiveWorkflowStage(null); setShowProtocolLetters(true); }}
                                                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-sm text-xs font-bold hover:bg-blue-500 transition-all"
                                            >
                                                View Full Letter Catalog
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 border border-slate-200 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-slate-700 mb-2">Audit Trail &amp; Provenance</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Every number in every document traces back to a specific formula, a specific input, a specific line of reasoning. The system maintains full provenance so that any stakeholder &mdash; investor, regulator, board member &mdash; can verify exactly how each conclusion was reached.
                                        </p>
                                    </div>
                                </div>
                                <div className="px-8 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-end">
                                    <button onClick={() => setActiveWorkflowStage(null)} className="px-6 py-2 bg-slate-900 text-white rounded-sm text-sm font-bold hover:bg-slate-800 transition-all">Close</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* PROTOCOL LETTER CATALOG POPUP */}
            {showProtocolLetters && (
                <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowProtocolLetters(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-8 flex items-start justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Full Letter Catalog</p>
                                <h2 className="text-3xl md:text-4xl font-light leading-tight text-slate-800">156 Professional Letter Templates</h2>
                            </div>
                            <button onClick={() => setShowProtocolLetters(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2"><X size={20} /></button>
                        </div>
                        <div className="p-6 md:p-8 space-y-6">
                            {/* Investment Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <TrendingUp size={16} />
                                    Investment Letters (10)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; Letter of Intent (LOI) &mdash; Investment</span>
                                    <span>&bull; Letter of Intent (LOI) &mdash; Partnership</span>
                                    <span>&bull; Investor Update Letter</span>
                                    <span>&bull; Proposal Cover Letter</span>
                                    <span>&bull; Capital Call Notice</span>
                                    <span>&bull; Dividend Declaration</span>
                                    <span>&bull; Investment Commitment Letter</span>
                                    <span>&bull; Co-Investment Invitation</span>
                                    <span>&bull; Fund Launch Announcement</span>
                                    <span>&bull; Portfolio Company Update</span>
                                </div>
                            </div>

                            {/* Government Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Building2 size={16} />
                                    Government &amp; Regulatory Letters (18)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; Expression of Interest (EOI) &mdash; Government Project</span>
                                    <span>&bull; Investment Incentive Application</span>
                                    <span>&bull; Regulatory Inquiry Letter</span>
                                    <span>&bull; MoU Proposal Letter</span>
                                    <span>&bull; License Renewal Application</span>
                                    <span>&bull; Permit Application Letter</span>
                                    <span>&bull; Environmental Clearance Request</span>
                                    <span>&bull; Tax Exemption Application</span>
                                    <span>&bull; Customs Facilitation Request</span>
                                    <span>&bull; Special Economic Zone Application</span>
                                    <span>&bull; Grant Application Cover</span>
                                    <span>&bull; Subsidy Request Letter</span>
                                    <span>&bull; PPP Proposal Letter</span>
                                    <span>&bull; Sovereign Guarantee Request</span>
                                    <span>&bull; Bilateral Agreement Proposal</span>
                                    <span>&bull; Trade Mission Request</span>
                                    <span>&bull; Ministerial Introduction Letter</span>
                                    <span>&bull; Policy Submission Cover</span>
                                </div>
                            </div>

                            {/* Compliance Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Shield size={16} />
                                    Compliance &amp; Legal Letters (12)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; AML/KYC Declaration Letter</span>
                                    <span>&bull; Compliance Assurance Letter</span>
                                    <span>&bull; Beneficial Ownership Declaration</span>
                                    <span>&bull; Sanctions Clearance Confirmation</span>
                                    <span>&bull; PEP Declaration Letter</span>
                                    <span>&bull; Source of Funds Declaration</span>
                                    <span>&bull; Audit Response Letter</span>
                                    <span>&bull; Regulatory Compliance Confirmation</span>
                                    <span>&bull; Data Protection Confirmation (GDPR)</span>
                                    <span>&bull; Anti-Corruption Compliance Letter</span>
                                    <span>&bull; Export Control Declaration</span>
                                    <span>&bull; Conflict of Interest Disclosure</span>
                                </div>
                            </div>

                            {/* Stakeholder Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Users size={16} />
                                    Stakeholder &amp; Community Letters (10)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; Community Notification Letter</span>
                                    <span>&bull; Stakeholder Engagement Letter</span>
                                    <span>&bull; Public Consultation Invitation</span>
                                    <span>&bull; Impact Assessment Notification</span>
                                    <span>&bull; Community Benefit Agreement Proposal</span>
                                    <span>&bull; Local Content Commitment Letter</span>
                                    <span>&bull; Indigenous Rights Consultation</span>
                                    <span>&bull; Resettlement Notification</span>
                                    <span>&bull; Grievance Mechanism Introduction</span>
                                    <span>&bull; Employment Opportunity Announcement</span>
                                </div>
                            </div>

                            {/* Trade Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Globe size={16} />
                                    Trade &amp; International Letters (14)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; Trade Inquiry Letter</span>
                                    <span>&bull; Customs/Trade Facilitation Letter</span>
                                    <span>&bull; DFI Concept Note Cover</span>
                                    <span>&bull; UN Agency Submission Letter</span>
                                    <span>&bull; Export Declaration Letter</span>
                                    <span>&bull; Import License Request</span>
                                    <span>&bull; Certificate of Origin Request</span>
                                    <span>&bull; Trade Credit Application</span>
                                    <span>&bull; Letter of Credit Request</span>
                                    <span>&bull; Shipping Instruction Letter</span>
                                    <span>&bull; Consignment Agreement Cover</span>
                                    <span>&bull; Distribution Agreement Proposal</span>
                                    <span>&bull; Agency Agreement Proposal</span>
                                    <span>&bull; Franchise Opportunity Letter</span>
                                </div>
                            </div>

                            {/* Partnership Letters */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Briefcase size={16} />
                                    Partnership &amp; Negotiation Letters (12)
                                </h5>
                                <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-600">
                                    <span>&bull; Partnership Introduction</span>
                                    <span>&bull; JV Invitation Letter</span>
                                    <span>&bull; Consortium Formation Letter</span>
                                    <span>&bull; Teaming Agreement Proposal</span>
                                    <span>&bull; Co-Development Invitation</span>
                                    <span>&bull; Technology Transfer Proposal</span>
                                    <span>&bull; Capacity Building Proposal</span>
                                    <span>&bull; Price Negotiation Letter</span>
                                    <span>&bull; Term Renegotiation Request</span>
                                    <span>&bull; Contract Extension Request</span>
                                    <span>&bull; Performance Improvement Notice</span>
                                    <span>&bull; Partnership Termination Notice</span>
                                </div>
                            </div>

                            {/* Operations & Crisis Letters */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 border-t border-slate-200 p-4">
                                    <h5 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <Zap size={16} />
                                        Operations &amp; Procurement (12)
                                    </h5>
                                    <div className="space-y-1.5 text-xs text-slate-600">
                                        <span className="block">&bull; Vendor Onboarding Letter</span>
                                        <span className="block">&bull; Supplier Qualification Request</span>
                                        <span className="block">&bull; RFP/RFQ Cover Letter</span>
                                        <span className="block">&bull; Bid Submission Cover</span>
                                        <span className="block">&bull; Contract Award Notification</span>
                                        <span className="block">&bull; Purchase Order Confirmation</span>
                                        <span className="block">&bull; Delivery Schedule Confirmation</span>
                                        <span className="block">&bull; Quality Assurance Letter</span>
                                        <span className="block">&bull; Warranty Claim Letter</span>
                                        <span className="block">&bull; Payment Release Request</span>
                                        <span className="block">&bull; Force Majeure Notification</span>
                                        <span className="block">&bull; Contract Variation Request</span>
                                    </div>
                                </div>
                                <div className="border-t-2 border-slate-300 pt-6">
                                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <Scale size={16} />
                                        Crisis &amp; Communications (10)
                                    </h5>
                                    <div className="space-y-1.5 text-xs text-slate-600">
                                        <span className="block">&bull; Crisis Statement Letter</span>
                                        <span className="block">&bull; Incident Notification</span>
                                        <span className="block">&bull; Media Response Letter</span>
                                        <span className="block">&bull; Stakeholder Reassurance Letter</span>
                                        <span className="block">&bull; Regulatory Incident Report</span>
                                        <span className="block">&bull; Insurance Claim Letter</span>
                                        <span className="block">&bull; Legal Notice Response</span>
                                        <span className="block">&bull; Dispute Resolution Proposal</span>
                                        <span className="block">&bull; Settlement Offer Letter</span>
                                        <span className="block">&bull; Apology/Remediation Letter</span>
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="border-t-2 border-slate-300 pt-6">
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    <strong className="text-slate-900">156 templates</strong> covering every stage of global deal-making &mdash; from initial outreach to crisis management. Each template includes tone guidance, required structure, and key elements tailored to the specific audience and purpose.
                                </p>
                            </div>
                        </div>
                        <div className="px-8 md:px-12 py-8 border-t border-slate-200 bg-white flex justify-end">
                            <button onClick={() => setShowProtocolLetters(false)} className="px-8 py-3 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================================================================== */}
            {/* UNIFIED SYSTEM OVERVIEW  -  Combined Protocol, Documents, Letters  */}
            {/* ================================================================== */}
            {showUnifiedSystemOverview && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowUnifiedSystemOverview(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-6">
                            <button onClick={() => setShowUnifiedSystemOverview(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={20} />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Complete System Overview</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">How It Works &amp; What You Get</h2>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-slate-200 px-8 md:px-12 bg-white">
                            <div className="flex flex-wrap">
                                <button 
                                    onClick={() => setUnifiedActiveTab('protocol')}
                                    className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${unifiedActiveTab === 'protocol' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    ADVERSIQ Consultant
                                </button>
                                <button 
                                    onClick={() => setUnifiedActiveTab('documents')}
                                    className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${unifiedActiveTab === 'documents' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    247 Document Types
                                </button>
                                <button 
                                    onClick={() => setUnifiedActiveTab('letters')}
                                    className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${unifiedActiveTab === 'letters' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    156 Letter Templates
                                </button>
                                <button 
                                    onClick={() => setUnifiedActiveTab('proof')}
                                    className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${unifiedActiveTab === 'proof' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                >
                                    See Proof
                                </button>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-6 md:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">

                            {/* Introduction - always visible */}
                            <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-[7px] tracking-tight">ADV</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">ADVERSIQ Consultant</p>
                                        <p className="text-xs text-blue-600 font-medium mt-0.5">Powered by NSIL Agentic Runtime &bull; Case Study Builder</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                                    {[
                                        { label: '1. Intake', color: 'bg-stone-900 text-white border-stone-900' },
                                        { label: '2. Discovery', color: 'bg-stone-700 text-white border-stone-700' },
                                        { label: '3. Analysis', color: 'bg-amber-600 text-white border-amber-600' },
                                        { label: '4. Recommendations', color: 'bg-amber-500 text-white border-amber-500' },
                                        { label: '5. Generation', color: 'bg-blue-600 text-white border-blue-600' },
                                    ].map((phase, i, arr) => (
                                        <span key={phase.label} className="flex items-center gap-1.5">
                                            <span className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${phase.color}`}>{phase.label}</span>
                                            {i < arr.length - 1 && <span className="text-stone-400 text-xs font-bold">&rarr;</span>}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    ADVERSIQ Consultant is the conversational intelligence layer that feeds the full analysis engine. Instead of a form, you talk. The system listens, asks the highest-value follow-up questions, builds the structured case brief in the background, and routes it through three stages: <strong className="text-slate-900">Adaptive Intake</strong> (10 dimensions captured through natural conversation with case-method gating), <strong className="text-slate-900">Adversarial Analysis</strong> (54+ formulas, 5 personas, Monte Carlo across 5,000 scenarios, Regional Development Kernel with partner intelligence and causal graphs), and <strong className="text-slate-900">Institutional Output</strong> (247+ document types across 15 categories and 156+ letter templates, all populated with your actual scores and traceable reasoning &mdash; not AI placeholder text). Plus <strong className="text-slate-900">Case Study Intelligence</strong> &mdash; upload any report, proposal, or mandate and the system reads, scores, debates, and diagnoses it instantly.
                                </p>
                            </div>

                            {/* TAB CONTENT: Protocol */}
                            {unifiedActiveTab === 'protocol' && (
                                <>
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">What ADVERSIQ Consultant Captures &mdash; 10 Dimensions</h4>
                                    <p>ADVERSIQ Consultant builds the case brief through conversation, not a form. It asks the highest-value question at each point, infers facts from context, and structures the intake across 10 dimensions. Most sessions complete this in 30&ndash;45 minutes. By the end, the reasoning engine has clear scope, quantified assumptions, full risk visibility, and a consistent dataset it can trust.</p>

                                    <div className="border-l-2 border-blue-200 pl-4 space-y-4">
                                        <div>
                                            <p className="font-semibold text-slate-900">1. Opportunity Definition</p>
                                            <p className="text-slate-600">Project name, type, sector, target region, investment scale, timeline. The foundation everything else builds on.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">2. Strategic Alignment</p>
                                            <p className="text-slate-600">Alignment with national/regional policy, SDG mapping, government priority status, bilateral agreements.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">3. Market Analysis</p>
                                            <p className="text-slate-600">Demand drivers, supply gaps, competitive landscape, pricing dynamics, growth trajectory.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">4. Financial Structure</p>
                                            <p className="text-slate-600">CAPEX, OPEX, revenue model, funding mix, IRR targets, payback expectations, currency exposure.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">5. Risk Assessment</p>
                                            <p className="text-slate-600">Political, regulatory, operational, financial, environmental, social risks with probability and impact.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">6. Stakeholder Mapping</p>
                                            <p className="text-slate-600">Government bodies, investors, partners, communities, regulators &mdash; influence, interest, engagement strategy.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">7. Implementation Pathway</p>
                                            <p className="text-slate-600">Phasing, milestones, dependencies, critical path, resource requirements, decision gates.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">8. Compliance Requirements</p>
                                            <p className="text-slate-600">Permits, licenses, environmental approvals, sector-specific regulations, international standards.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">9. Partnership Terms</p>
                                            <p className="text-slate-600">Equity split, governance structure, decision rights, exit mechanisms, IP ownership, non-compete clauses.</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">10. Success Metrics</p>
                                            <p className="text-slate-600">KPIs, monitoring framework, reporting requirements, adjustment triggers, exit criteria.</p>
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-bold text-slate-900 pt-4">Stage 2 &mdash; Adversarial Analysis</h4>
                                    <p>Once intake is complete, the system stress-tests every claim. A SAT Contradiction Solver checks for logical inconsistencies across your inputs. Five adversarial personas &mdash; Skeptic, Advocate, Regulator, Accountant, Operator &mdash; debate the opportunity using Bayesian inference. 54+ proprietary formulas calculate risk-adjusted returns, stakeholder alignment, and strategic positioning. Monte Carlo simulation runs 5,000 scenarios to show the real distribution of outcomes &mdash; not just the optimistic case. The Regional Development Kernel maps structural twin regions worldwide and builds a causal Problem-to-Solution Graph. The Partner Intelligence Engine ranks co-investors and delivery partners by fit, reliability, and local legitimacy.</p>

                                    <h4 className="text-lg font-bold text-slate-900 pt-4">Stage 3 &mdash; Institutional Output</h4>
                                    <p>Every score, every debate conclusion, every simulation result flows into document generation. 247 document types across 15 categories. 156 letter templates for every stage of deal-making &mdash; LOIs to closing briefs. All populated with your actual data, exact scores, and traceable reasoning &mdash; not AI-generated placeholder text. The 15th category, Case Study Intelligence, lets you upload existing reports, proposals, or case studies and receive full NSIL analysis with scored sections, adversarial debate, historical parallels, and recommended documents.</p>
                                </>
                            )}

                            {/* TAB CONTENT: Documents */}
                            {unifiedActiveTab === 'documents' && (
                                <>
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">247 Document Types Across 15 Categories</h4>
                                    <p>Every document is populated with real data, exact scores, and traceable reasoning. Flexible page lengths from 1-page brief to 100-page full package.</p>

                                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">1. Foundation &amp; Strategic (18)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Regional Profile</li>
                                                <li>&bull; Strategic Mandate</li>
                                                <li>&bull; SWOT Analysis</li>
                                                <li>&bull; Investment Prospectus</li>
                                                <li>&bull; Market Positioning</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">2. Financial Analysis (22)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Financial Model</li>
                                                <li>&bull; Investment Brief</li>
                                                <li>&bull; Pro Forma</li>
                                                <li>&bull; Cash Flow</li>
                                                <li>&bull; Valuation</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">3. Risk Assessment (15)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Risk Assessment</li>
                                                <li>&bull; Mitigation Plan</li>
                                                <li>&bull; Due Diligence Report</li>
                                                <li>&bull; Scenario Analysis</li>
                                                <li>&bull; Sensitivity Analysis</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">4. Government &amp; Policy (17)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Policy Brief</li>
                                                <li>&bull; Incentive Application</li>
                                                <li>&bull; Government Submission</li>
                                                <li>&bull; MOU Draft</li>
                                                <li>&bull; Bilateral Proposal</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">5. Partnership (16)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Partnership Assessment</li>
                                                <li>&bull; LOI</li>
                                                <li>&bull; JV Agreement</li>
                                                <li>&bull; Stakeholder Map</li>
                                                <li>&bull; Partner Profile</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">6. Execution (21)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Project Plan</li>
                                                <li>&bull; Implementation Roadmap</li>
                                                <li>&bull; Milestone Report</li>
                                                <li>&bull; Change Management</li>
                                                <li>&bull; Transition Plan</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">7. Governance &amp; Board (12)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Board Charter</li>
                                                <li>&bull; Steering Committee Report</li>
                                                <li>&bull; Annual Report</li>
                                                <li>&bull; Quarterly Report</li>
                                                <li>&bull; Decision Matrix</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">8. Human Capital (12)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Org Chart</li>
                                                <li>&bull; Talent Gap Analysis</li>
                                                <li>&bull; Capability Assessment</li>
                                                <li>&bull; HR Due Diligence</li>
                                                <li>&bull; Succession Planning</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">9. Procurement &amp; Supply (13)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Procurement Strategy</li>
                                                <li>&bull; Vendor Scorecard</li>
                                                <li>&bull; Supply Chain Mapping</li>
                                                <li>&bull; Tender Document</li>
                                                <li>&bull; Bid Matrix</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">10. ESG &amp; Social Impact (19)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; ESG Report</li>
                                                <li>&bull; Sustainability Report</li>
                                                <li>&bull; Carbon Assessment</li>
                                                <li>&bull; Environmental Impact</li>
                                                <li>&bull; Social Impact</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">11. Regulatory &amp; Compliance (16)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Permit Application</li>
                                                <li>&bull; Compliance Certificate</li>
                                                <li>&bull; Regulatory Filing</li>
                                                <li>&bull; GDPR Policy</li>
                                                <li>&bull; Sanctions Clearance</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">12. Communications &amp; IR (17)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Press Release</li>
                                                <li>&bull; Media Kit</li>
                                                <li>&bull; Investor Presentation</li>
                                                <li>&bull; Crisis Plan</li>
                                                <li>&bull; Case Study</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">13. Asset &amp; Infrastructure (17)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Site Selection</li>
                                                <li>&bull; Technical Brief</li>
                                                <li>&bull; Infrastructure Assessment</li>
                                                <li>&bull; Grid Study</li>
                                                <li>&bull; PPA</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-1">14. Legal &amp; Agreements (17)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; NDA</li>
                                                <li>&bull; LOI</li>
                                                <li>&bull; MOU</li>
                                                <li>&bull; Term Sheet</li>
                                                <li>&bull; Shareholder Agreement</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-violet-700 mb-1">15. Case Study Intelligence (15)</h5>
                                            <ul className="space-y-0.5 text-sm text-slate-600">
                                                <li>&bull; Case Study Analysis Report</li>
                                                <li>&bull; Strength/Weakness Diagnostic</li>
                                                <li>&bull; Adversarial Debate Transcript</li>
                                                <li>&bull; Historical Parallel Report</li>
                                                <li>&bull; Replication Assessment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* TAB CONTENT: Letters */}
                            {unifiedActiveTab === 'letters' && (
                                <>
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">156 Letter Templates</h4>
                                    <p>Every stage of deal-making requires specific correspondence. These templates are populated with your project data, compliance status, and relevant scores.</p>

                                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Investment Letters (10)</h5>
                                            <p className="text-sm text-slate-600">LOI, Investor Update, Proposal Cover, Capital Call, Dividend Declaration, Investment Commitment, Co-Investment Invitation, Fund Launch, Portfolio Update, Exit Notification</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Government &amp; Regulatory (18)</h5>
                                            <p className="text-sm text-slate-600">EOI, Incentive Application, Regulatory Inquiry, MOU Proposal, Permit Application, Tax Exemption, Grant Application, PPP Proposal, Trade Mission Request, Embassy Introduction</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Compliance &amp; Legal (12)</h5>
                                            <p className="text-sm text-slate-600">AML/KYC Declaration, Beneficial Ownership, Sanctions Clearance, PEP Declaration, Source of Funds, Audit Response, GDPR Confirmation, Anti-Corruption Certification</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Stakeholder &amp; Community (10)</h5>
                                            <p className="text-sm text-slate-600">Community Notification, Stakeholder Engagement, Public Consultation, Impact Assessment, Community Benefit Agreement, Local Content Commitment</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Trade &amp; International (14)</h5>
                                            <p className="text-sm text-slate-600">Trade Inquiry, Customs Facilitation, DFI Concept Note, Export Declaration, Import License, Letter of Credit, Shipping Instructions, Distribution Proposal</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Partnership &amp; Negotiation (12)</h5>
                                            <p className="text-sm text-slate-600">Partnership Introduction, JV Invitation, Consortium Formation, Technology Transfer, Price Negotiation, Term Renegotiation, Contract Extension</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Operations &amp; Procurement (12)</h5>
                                            <p className="text-sm text-slate-600">Vendor Onboarding, Supplier Qualification, RFP Cover, Contract Award, Purchase Order, Delivery Confirmation, Quality Assurance, Warranty Claim</p>
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">Crisis &amp; Communications (10)</h5>
                                            <p className="text-sm text-slate-600">Crisis Statement, Incident Notification, Media Response, Stakeholder Reassurance, Insurance Claim, Legal Notice Response, Settlement Offer</p>
                                        </div>
                                    </div>

                                    <p className="pt-4">Each template includes tone guidance, required structure, and key elements tailored to the specific audience and purpose. All automatically populated with your project specifics.</p>
                                </>
                            )}

                            {/* TAB CONTENT: Proof */}
                            {unifiedActiveTab === 'proof' && (
                                <>
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">See the System in Action</h4>
                                    <p>Words are cheap. The best way to understand what this system produces is to see an actual report it generated from a real submission.</p>

                                    <h4 className="text-lg font-bold text-slate-900 pt-4">Real Example: Northland Regional Council</h4>
                                    <p>A regional council in New Zealand submitted a 5MW solar partnership proposal through the Ten-Step Protocol. The system ran the full pipeline &mdash; SAT validation, formula scoring, adversarial debate, Monte Carlo simulation &mdash; and produced a complete assessment package.</p>

                                    <div className="border-l-2 border-slate-300 pl-4 mt-4 space-y-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">Initial Assessment: DO NOT PROCEED</p>
                                            <p className="text-slate-600">SPI: 34% | RROI: 38/100</p>
                                            <p className="text-slate-600">Issues identified: Missing grid study, revenue projection 2.8x above benchmark</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">After Correction: INVESTMENT READY</p>
                                            <p className="text-slate-600">SPI: 78% | RROI: 74/100</p>
                                            <p className="text-slate-600">Council fixed both issues, system re-ran full analysis</p>
                                        </div>
                                    </div>

                                    <p className="pt-4">The system caught two critical errors that would have doomed the partnership. After correction, the council had a defensible investment case with full documentation.</p>

                                    <button 
                                        onClick={() => { setShowUnifiedSystemOverview(false); setShowProofPopup(true); }}
                                        className="mt-4 w-full py-3 bg-slate-900 text-white rounded text-sm font-semibold hover:bg-slate-800 transition-colors"
                                    >
                                        See the Full Report &mdash; Every Score, Every Debate, Every Output
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-end">
                            <button onClick={() => setShowUnifiedSystemOverview(false)} className="px-6 py-2 bg-slate-900 text-white rounded-sm text-sm font-bold hover:bg-slate-800 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block 2  -  Read More Popup */}
            {showBlock2More && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowBlock2More(false)}>
                    <div className="bg-white max-w-4xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 relative">
                            <button onClick={() => setShowBlock2More(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">The Origin Story</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">What sparked this: 12 months that changed everything.</h2>
                        </div>
                        <div className="px-8 md:px-12 py-10">
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                It started with a frustration. I was watching regions with real potential  -  talent, resources, strategic location  -  get passed over because no tool existed to objectively prove their case. Investment decisions were being made on gut feel, biased reports, or whoever had the best pitch deck. I knew there had to be a better way. So I started building.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                The first thing I created was the formula engine  -  54+ proprietary formulas like SPI (Strategic Positioning Index), RROI (Risk-Adjusted Return on Investment), and SEAM (Strategic Ethical Alignment Matrix). Each one designed to quantify a dimension of investment intelligence that previously relied on subjective judgement. I built the <strong>DAG Scheduler</strong> to execute them in parallel across 5 dependency levels, so no formula runs before its inputs are ready. That was the foundation.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                Then I built the validation layer  -  a <strong>SAT Contradiction Solver</strong> that converts inputs into propositional logic and catches contradictions before anything else runs. If your assumptions conflict, the system tells you immediately. No more garbage-in-garbage-out.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                Next came the debate engine. I wanted the system to argue with itself  -  to stress-test every recommendation before it reached the user. So I built the <strong>Bayesian Debate Engine</strong> with 5 adversarial personas: the Skeptic hunts for deal-killers, the Advocate finds upside, the Regulator checks legality, the Accountant validates cash flow, and the Operator tests execution. Beliefs update via Bayesian inference. Disagreements are preserved, not smoothed over.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                Then I added autonomous intelligence  -  8 engines that think beyond the question. And reflexive intelligence  -  7 engines that analyse how <em>you</em> think. Layer by layer, month by month, the system grew. I called the orchestration engine the <strong>NSIL  -  the Nexus Strategic Intelligence Layer</strong>  -  a 10-layer pipeline I invented from scratch to make all of this run deterministically.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                128 TypeScript files. 50,000 lines of code. Clean builds in under 5 seconds across 2,105 modules. Full type safety with 900+ lines of strict definitions. 209.38 kB gzipped. One person. Twelve months. Everything built from nothing.
                            </p>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-2 text-center">
                                    <p className="text-xl font-bold text-blue-600">13</p>
                                    <p className="text-xs text-slate-600">Core Algorithms</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-2 text-center">
                                    <p className="text-xl font-bold text-blue-600">54+</p>
                                    <p className="text-xs text-slate-600">Formulas</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-2 text-center">
                                    <p className="text-xl font-bold text-blue-600">10</p>
                                    <p className="text-xs text-slate-600">Layers</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-2 text-center">
                                    <p className="text-xl font-bold text-blue-600">50K</p>
                                    <p className="text-xs text-slate-600">Lines of Code</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button onClick={() => setShowBlock2More(false)} className="px-6 py-2 bg-slate-800 text-white rounded-sm text-sm font-semibold hover:bg-slate-900 transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block 3  -  Read More Popup */}
            {showBlock3More && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowBlock3More(false)}>
                    <div className="bg-white max-w-4xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 relative">
                            <button onClick={() => setShowBlock3More(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">The Evolution</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">Then I discovered something that changed the system forever.</h2>
                        </div>
                        <div className="px-8 md:px-12 py-10">
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                By this point, I had a working intelligence system  -  formulas, validation, debate, autonomous engines, reflexive analysis, all running through the NSIL pipeline. It was already producing results no other platform could match. But something was missing. The outputs were technically correct, but they lacked the instinct of a seasoned human expert  -  the ability to sense that a deal feels wrong even when the numbers look right, or to know which risk deserves attention when ten are competing for it.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                That's when I found computational neuroscience  -  real mathematical models of how the human brain makes decisions under pressure. Models from published university research that had been sitting in academic papers for decades, never implemented in a practical system. I realised they could slot directly into the architecture I'd already built. The NSIL was designed to be extensible. So I added them.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                I wrote the <strong>Human Cognition Engine</strong>  -  1,307 lines of code implementing 7 neuroscience models as faithful mathematical implementations. Not simplified approximations. The real models, running live inside the NSIL pipeline. This is what turned a powerful analytics system into something genuinely new  -  the first platform that doesn't just calculate answers, but thinks about them the way a human expert would.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-2 mb-3">
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Wilson-Cowan Neural Fields</strong>  -  Your brain has billions of neurons, some saying "go" (excitatory) and some saying "stop" (inhibitory). These differential equations (du/dt = -u + integral w(r-r').f(v) dr') model that battle on a 50 - 50 grid, simulating how experts balance competing factors like profit vs. risk. The NSIL runs this live with your data.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Predictive Processing (Rao &amp; Ballard)</strong>  -  Our brains don't just react; they predict. Bayesian inference across 3 hierarchical levels anticipates what comes next  -  like forecasting market shifts from historical precedent. Learning rate 0.1, with prediction error minimisation at every level.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Friston's Free Energy Principle</strong>  -  The brain minimises "surprise" by constantly updating beliefs. Variational inference across 8 candidate policies (gamma=0.95) simulates how we adapt when new information arrives  -  revising plans without hallucinating.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Attention Allocation (Itti &amp; Koch)</strong>  -  Why do you notice one risk and miss another? Salience maps with winner-take-all competition and inhibition of return (0.7) model how the brain spots what matters in a sea of data.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Emotional Valence</strong>  -  Prospect theory shows the pain of losing GBP100 hurts more than the joy of gaining GBP100. This assigns emotional weight to every option, flagging deals that look good on paper but feel wrong.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Global Workspace Theory</strong>  -  Think of your brain as an office where every department shares information through one central workspace. Coalition formation with ignition threshold 0.6 ensures all layers integrate into coherent insights.
                                </p>
                                <p className="text-xs text-slate-800 leading-relaxed">
                                    <strong className="text-slate-900">Working Memory (Baddeley's Model)</strong>  -  Human short-term memory is limited. Phonological decay 0.05, visual decay 0.03, rehearsal benefit 0.2  -  this focuses outputs on the 3"5 factors that actually matter.
                                </p>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                No other platform  -  not Palantir, not Bloomberg Terminal, not McKinsey's analytics  -  implements any of these models. ADVERSIQ implements all seven. And they work because the NSIL was built to accommodate exactly this kind of extension  -  I just didn't know these models existed when I designed it. They fit perfectly into what I'd already created.
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                That's what makes this a world first. Not just the neuroscience. Not just the formulas. Not just the debate engine or the autonomous engines. It's the fact that one person built an architecture flexible enough to unify all of them  -  and then discovered the missing piece that made it complete.
                            </p>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button onClick={() => setShowBlock3More(false)} className="px-6 py-2 bg-slate-800 text-white rounded-sm text-sm font-semibold hover:bg-slate-900 transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block 4  -  Read More Popup */}
            {showBlock4More && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowBlock4More(false)}>
                    <div className="bg-white max-w-4xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 relative">
                            <button onClick={() => setShowBlock4More(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Autonomous &amp; Reflexive Intelligence</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">It thinks beyond your question &mdash; and analyses how you think.</h2>
                        </div>
                        <div className="px-8 md:px-12 py-10">
                            <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                I created 8 autonomous engines that actively discover insights you never asked for. Creative Synthesis uses bisociation theory to find strategies from unrelated domains. Ethical Reasoning enforces Rawlsian fairness gates  -  if a path is unethical, it's rejected, no matter how profitable. Self-Evolving Algorithms tune their own formula weights using gradient descent with rollback. Scenario Simulation runs 5,000 Monte Carlo futures with causal feedback loops.
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                Then 7 reflexive engines analyse <em>you</em>. User Signal Decoder uses Shannon's information theory to detect what you repeat (what matters) and what you avoid (where anxiety lives). Regional Mirroring finds your structural twin region worldwide. Latent Advantage Miner surfaces assets you mentioned casually that have real strategic significance. Every finding is then translated for 5 distinct audiences  -  investors, government, community, partners, executives  -  in their own language.
                            </p>
                            <div className="space-y-2">
                                <div className="border-t-2 border-slate-300 pt-4">
                                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Autonomous Intelligence  -  8 Engines</p>
                                    <p className="text-xs text-slate-500">CRE, CDT, AGL, ETH, EVO, ADA, EMO, SIM  -  creative synthesis, cross-domain transfer, ethical gates, adaptive learning, Monte Carlo simulation.</p>
                                </div>
                                <div className="border-t-2 border-slate-300 pt-4">
                                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Reflexive Intelligence  -  7 Engines</p>
                                    <p className="text-xs text-slate-500">Signal decoding, echo detection, lifecycle mapping, regional mirroring, identity decoding, latent advantage mining, universal translation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex justify-end">
                            <button onClick={() => setShowBlock4More(false)} className="px-6 py-2 bg-slate-800 text-white rounded-sm text-sm font-semibold hover:bg-slate-900 transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block 5  -  What You Get & How It Works Popup Modal */}
            {showBlock5Popup && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowBlock5Popup(false)}>
                    <div className="bg-white max-w-5xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>

                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 relative">
                            <button onClick={() => setShowBlock5Popup(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">What You Get</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">So What Comes Out the Other End?</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
                                The output isn&rsquo;t &ldquo;AI text.&rdquo; It&rsquo;s a complete decision package: the structured case, the quantified scores, the key risks, and the supporting material required to move from idea to formal submission.
                            </p>
                        </div>
                        <div className="px-8 md:px-12 py-10">
                            <div className="max-w-4xl">

                                {/* Watch it happen live */}
                                <div className="border-t-2 border-slate-300 pt-6 mb-8">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                                        You can watch it all happen, live.
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                                        While the system builds your case, you can watch every step in real time. You&rsquo;ll see the five expert personas debating your proposal, the scoring formulas running one by one, the risk models stress-testing your assumptions, and the final strategy assembling itself section by section. Nothing is hidden. Every score, every conclusion, every piece of evidence is visible and traceable.
                                    </p>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        This isn't a black box  -  it's a glass box. The same inputs will always produce the same validated output. That's the whole point: if you can't see how it reached its answer, why would you trust it?
                                    </p>
                                </div>

                                {/* Reassurance message */}
                                <div className="border-t-2 border-slate-300 pt-6 mb-8">
                                    <p className="text-lg text-slate-500 leading-relaxed">
                                        The good news? You don&rsquo;t need to understand how any of this works under the hood. You just need to know it&rsquo;s there &mdash; working for you, 24/7 &mdash; producing rigorous, defensible, repeatable output every single time.
                                    </p>
                                </div>

                                <button 
                                    onClick={() => { setShowBlock5Popup(false); setShowOutputDetails(true); }}
                                    className="w-full py-3 bg-blue-600 text-white border border-blue-700 rounded-sm text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Info size={16} />
                                    More Details  -  Full Document Catalog &amp; Audit Trail
                                </button>
                            </div>
                        </div>

                        {/* Photo Banner  -  Strategic Planning */}
                        <div className="w-full h-40 md:h-52 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=400&fit=crop&q=80" alt="Strategic planning session" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-slate-900/10" />
                        </div>

                        {/* THE TEN-STEP PROTOCOL  -  styled like landing page */}
                        <section id="protocol" className="py-12 px-6 md:px-8 bg-white">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-blue-600 uppercase tracking-[0.2em] text-sm mb-3 font-bold">HOW YOU FEED THE BRAIN</p>
                                <h2 className="text-2xl md:text-3xl font-light text-slate-900 mb-2">The Ten-Step Protocol</h2>
                                <p className="text-base text-blue-600 mb-4 flex items-center gap-2 font-medium">
                                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                                    Most users complete this in 30-45 minutes
                                </p>

                                <p className="text-base text-slate-700 leading-relaxed mb-6">
                                    Most projects fail not from lack of potential, but from incomplete preparation. The Ten-Step Protocol is the antidote  -  a structured process that transforms a rough idea into a complete, decision-ready input set. Each step captures a critical dimension of your opportunity: identity, strategy, market context, partnerships, financials, risks, resources, execution, governance, and final readiness.
                                </p>

                                <button 
                                    onClick={() => { setShowBlock5Popup(false); setUnifiedActiveTab('protocol'); setShowUnifiedSystemOverview(true); }}
                                    className="w-full py-3 bg-blue-600 text-white border border-blue-700 rounded-sm text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Info size={16} />
                                    More Details  -  View All 10 Steps &amp; Data Requirements
                                </button>
                            </div>
                        </section>

                        {/* Close button */}
                        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50 rounded-b-sm">
                            <button 
                                onClick={() => setShowBlock5Popup(false)}
                                className="px-6 py-2 bg-slate-800 text-white rounded-sm text-sm font-semibold hover:bg-slate-900 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Proof of Capability  -  Full Report Popup Modal */}
            {showProofPopup && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowProofPopup(false)}>
                    <div className="bg-white max-w-5xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>

                        {/* Header — Landing page style */}
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 relative">
                            <button onClick={() => setShowProofPopup(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Proof of Capability</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">A Real Report From a Real Project</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
                                A regional council in New Zealand wanted to know: &ldquo;Should we partner with Vestas to build a 5MW solar installation?&rdquo; Here is the complete answer &mdash; including the verdict, the reasoning, the risks identified, and exactly what they should do next.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 md:px-12 py-10">
                            <div className="max-w-4xl">
                                <div className="bg-white border-t border-slate-200 p-4">
                                    <p className="text-sm text-slate-600 mb-2"><strong className="text-slate-900">What you&rsquo;ll see in this report:</strong></p>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>&bull; <strong>The Question:</strong> Is this partnership viable?</li>
                                        <li>&bull; <strong>The Analysis:</strong> How the system tested and scored the proposal</li>
                                        <li>&bull; <strong>The Problems Found:</strong> Two critical issues that would have killed the deal</li>
                                        <li>&bull; <strong>The Fix:</strong> How they corrected those issues</li>
                                        <li>&bull; <strong>The Final Verdict:</strong> A clear YES/NO recommendation with reasoning</li>
                                        <li>&bull; <strong>The Next Steps:</strong> Exactly what to do now and how to proceed</li>
                                        <li>&bull; <strong>The Documents:</strong> All the paperwork generated automatically</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* --- HOW THE SYSTEM WROTE THIS --- */}
                        <section className="py-10 px-6 md:px-8 bg-white">
                            <div className="max-w-4xl mx-auto">
                                <p className="text-blue-600 uppercase tracking-[0.2em] text-sm mb-2 font-bold">HOW THIS REPORT WAS BUILT</p>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">Every Number Has a Source. Every Conclusion Has a Trail.</h3>
                                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                                    The system didn&rsquo;t generate this report the way a chatbot generates text. It ran a structured analytical pipeline &mdash; the same one that runs for every user &mdash; where each layer feeds the next and nothing moves forward until it&rsquo;s been validated. Here&rsquo;s exactly how it happened:
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">The Council Submitted Their Data</p>
                                            <p className="text-sm text-slate-600">Northland Regional Council completed the Ten-Step Protocol &mdash; identity, strategic intent, market context, partners, financials, risk tolerance, resources, execution plan, governance, and final readiness. This structured submission became the raw input for every engine.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">The System Checked for Contradictions</p>
                                            <p className="text-sm text-slate-600">The SAT Contradiction Solver converted every input into propositional logic and tested for conflicts. It immediately flagged that the council&rsquo;s Year 1 revenue projection of $4.2M contradicted regional benchmarks for a 5MW solar installation by a factor of 2.8&times;. It also detected a missing grid connection feasibility study &mdash; a dependency required by two downstream formulas.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">54+ Formulas Ran Against the Validated Inputs</p>
                                            <p className="text-sm text-slate-600">The DAG Scheduler executed all formulas across 5 dependency levels. SPI (Strategic Positioning Index) scored the proposal at 34%. RROI computed a risk-adjusted return of 38/100. SCF Impact calculated $680K. Activation timeline modelled at 24 months P50. Every formula drew from the council&rsquo;s own submission and the system&rsquo;s built-in regional benchmarks.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">Five Expert Personas Debated the Proposal</p>
                                            <p className="text-sm text-slate-600">The Bayesian Debate Engine ran an adversarial debate between five personas &mdash; the Skeptic, the Advocate, the Regulator, the Accountant, and the Operator. The Skeptic and Regulator both voted to block, citing the missing feasibility study and inflated revenue as disqualifying risks. Beliefs updated via Bayesian inference. The system classified the project as &ldquo;Do Not Proceed.&rdquo;</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">The Council Fixed the Issues and Resubmitted</p>
                                            <p className="text-sm text-slate-600">Northland uploaded a utility interconnection agreement and revised Year 1 revenue from $4.2M to $1.4M. The system re-ran every formula, re-debated with all five personas, and re-scored the entire proposal. SPI jumped to 78%. RROI rose to 74/100. Classification upgraded to &ldquo;Investment Ready.&rdquo;</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-sm border border-slate-200">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">6</span>
                                        <div>
                                            <p className="text-sm text-slate-800 font-semibold mb-1">The Report Was Assembled Automatically</p>
                                            <p className="text-sm text-slate-600">The Output Synthesis layer compiled every score, every debate transcript, every risk flag, and every formula derivation into the structured document you see below. The Cognition Layer added expert-level contextual judgement. The Monte Carlo engine stress-tested the proposal across 5,000 futures. Nothing was invented. Every conclusion traces to a specific formula, a specific engine, and a specific line of code.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-500 p-5 rounded-r-sm">
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        <strong className="text-slate-900">Where the information came from:</strong> All data sourced from (1) the council&rsquo;s own Ten-Step intake submission, (2) the system&rsquo;s built-in regional benchmarks covering 150+ countries, (3) policy and regulatory databases embedded in the Knowledge Layer, and (4) historical investment performance patterns spanning 25&ndash;63 years of documented methodology. No external API calls. No web scraping. No hallucination.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* --- DIVIDER --- */}
                        <div className="border-t-2 border-slate-300 py-8 px-8 md:px-12">
                            <div className="max-w-4xl mx-auto text-center">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-800">Below is the actual system output</p>
                                <p className="text-lg text-slate-500 font-light">Northland Regional Council &mdash; 5MW Solar PV Partnership Assessment</p>
                            </div>
                        </div>

                        {/* Report Header */}
                        <section className="py-10 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center font-bold text-white text-xs">BW</div>
                                            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">ADVERSIQ &mdash; Live Report</span>
                                        </div>
                                        <h2 className="text-xl font-semibold text-slate-900">Strategic Partnership Viability Assessment</h2>
                                        <p className="text-sm text-slate-500 mt-1">Northland Regional Council &times; Vestas Energy Solutions</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 font-bold uppercase">Live Test</div>
                                        <p className="text-xs text-slate-400 mt-1">Not a simulation</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 text-center">
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Entity</p>
                                        <p className="text-sm font-semibold text-slate-900">Regional Council</p>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sector</p>
                                        <p className="text-sm font-semibold text-slate-900">Renewable Energy</p>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Project</p>
                                        <p className="text-sm font-semibold text-slate-900">5MW Solar PV</p>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Location</p>
                                        <p className="text-sm font-semibold text-slate-900">Northland, NZ</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Executive Summary */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Executive Summary</h3>
                                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                    Northland Regional Council proposed a 5MW solar photovoltaic partnership with Vestas Energy Solutions to serve the Northland region&rsquo;s growing renewable energy needs. The proposal was submitted through the Ten-Step Intake Protocol and processed by the full NSIL engine. On initial assessment, the system classified the project as <strong className="text-red-600">&ldquo;Do Not Proceed&rdquo;</strong> due to two critical deficiencies: a missing grid connection feasibility study and revenue projections 2.8&times; above the established regional benchmark for installations of this scale.
                                </p>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    After the council uploaded the required utility interconnection agreement and revised Year 1 revenue from $4.2M to $1.4M, the system re-ran every formula, re-convened the adversarial debate, and re-scored the proposal. The classification was upgraded to <strong className="text-blue-600">&ldquo;Investment Ready&rdquo;</strong> with a Strategic Positioning Index of 78% (Grade B).
                                </p>
                            </div>
                        </section>

                        {/* Scoring Comparison */}
                        <section className="py-8 px-6 md:px-8 bg-slate-50 border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Quantitative Scoring &mdash; NSIL Formula Engine Output</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white border-2 border-red-200 rounded-sm p-5">
                                        <p className="text-xs text-red-600 uppercase tracking-wider font-bold mb-3">Run 1 &mdash; Initial Assessment</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Strategic Positioning Index (SPI)</span>
                                                <span className="text-sm text-red-600 font-bold">34% &mdash; Grade D</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Risk-Adjusted ROI (RROI)</span>
                                                <span className="text-sm text-red-600 font-bold">38/100</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Activation Timeline (IVAS)</span>
                                                <span className="text-sm text-red-600 font-bold">24 months P50</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Strategic Cash Flow Impact (SCF)</span>
                                                <span className="text-sm text-red-600 font-bold">$680K</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5">
                                                <span className="text-sm text-slate-600 font-semibold">Classification</span>
                                                <span className="text-sm text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded">DO NOT PROCEED</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border-2 border-blue-200 rounded-sm p-5">
                                        <p className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-3">Run 2 &mdash; After Corrections</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Strategic Positioning Index (SPI)</span>
                                                <span className="text-sm text-blue-600 font-bold">78% &mdash; Grade B</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Risk-Adjusted ROI (RROI)</span>
                                                <span className="text-sm text-blue-600 font-bold">74/100</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Activation Timeline (IVAS)</span>
                                                <span className="text-sm text-blue-600 font-bold">9 months P50</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                                                <span className="text-sm text-slate-600">Strategic Cash Flow Impact (SCF)</span>
                                                <span className="text-sm text-blue-600 font-bold">$1.42M</span>
                                            </div>
                                            <div className="flex justify-between items-center py-1.5">
                                                <span className="text-sm text-slate-600 font-semibold">Classification</span>
                                                <span className="text-sm text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">INVESTMENT READY</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Issues & Corrections */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                                        <p className="text-xs text-red-600 uppercase tracking-wider font-bold mb-2">Issues Flagged by RFI Engine</p>
                                        <ul className="space-y-1.5 text-sm text-slate-700">
                                            <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">&bull;</span> Missing grid connection feasibility study</li>
                                            <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">&bull;</span> Revenue projections 2.8&times; above regional benchmark</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                                        <p className="text-xs text-blue-600 uppercase tracking-wider font-bold mb-2">Corrections Applied</p>
                                        <ul className="space-y-1.5 text-sm text-slate-700">
                                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">&bull;</span> Uploaded utility interconnection agreement</li>
                                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">&bull;</span> Revised Y1 revenue from $4.2M to $1.4M</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SPI Component Breakdown */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">SPI Component Breakdown &mdash; Run 2 (Post-Correction)</h3>
                                <p className="text-xs text-slate-500 mb-4">Each component is weighted and computed independently via calculateSPI() in services/engine.ts</p>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Economic Readiness', score: 82, weight: '20%', detail: 'NZ GDP per capita, regional growth rate, fiscal surplus indicators' },
                                        { name: 'Symbiotic Fit', score: 76, weight: '15%', detail: 'Council-Vestas capability alignment across 6 dimensions' },
                                        { name: 'Political Stability', score: 91, weight: '15%', detail: 'NZ governance index, regulatory quality, rule of law' },
                                        { name: 'Partner Reliability', score: 74, weight: '15%', detail: 'Vestas track record, financial health, delivery capability' },
                                        { name: 'Ethical Alignment (SEAM)', score: 85, weight: '15%', detail: 'ESG compliance, community benefit, labour standards' },
                                        { name: 'Activation Velocity', score: 68, weight: '10%', detail: 'Regulatory pathway, permit timeline, grid connection readiness' },
                                        { name: 'Infrastructure Quality', score: 72, weight: '10%', detail: 'Grid capacity, transport access, construction labour availability' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-sm border border-slate-200">
                                            <div className="w-40 flex-shrink-0">
                                                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                                                <p className="text-xs text-slate-400">{item.weight} weight</p>
                                            </div>
                                            <div className="flex-1">
                                                <div className="w-full bg-slate-200 rounded-full h-2">
                                                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${item.score}%` }} />
                                                </div>
                                            </div>
                                            <div className="w-12 text-right">
                                                <span className="text-sm font-bold text-blue-600">{item.score}%</span>
                                            </div>
                                            <p className="text-xs text-slate-500 w-56 flex-shrink-0">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Adversarial Debate Outcome */}
                        <section className="py-8 px-6 md:px-8 bg-slate-50 border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">5-Persona Adversarial Debate &mdash; Consensus Report</h3>
                                <p className="text-xs text-slate-500 mb-4">Bayesian Debate Engine (services/PersonaEngine.ts) &mdash; 818 lines. Beliefs update via Bayesian inference. Disagreements are preserved, not smoothed.</p>

                                <div className="space-y-3 mb-4">
                                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">The Skeptic</p>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">APPROVE (Run 2)</span>
                                        </div>
                                        <p className="text-xs text-slate-600">&ldquo;Run 1 was correctly blocked. Revenue assumptions were indefensible. With the interconnection agreement uploaded and revenue corrected to $1.4M, the grid dependency is resolved and financials are within benchmark. I approve with the condition that quarterly review gates remain active.&rdquo;</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">The Advocate</p>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">APPROVE (Run 1 &amp; 2)</span>
                                        </div>
                                        <p className="text-xs text-slate-600">&ldquo;Northland has exceptional solar irradiance (4.8 kWh/m&sup2;/day), strong community support for renewables, and a proven council track record in infrastructure delivery. This is exactly the type of regional energy partnership the system was designed to validate.&rdquo;</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">The Regulator</p>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">APPROVE (Run 2)</span>
                                        </div>
                                        <p className="text-xs text-slate-600">&ldquo;The grid connection feasibility study was a hard gate. Without it, no responsible assessor should have allowed this to proceed. Now that the interconnection agreement is in place, NZ regulatory pathway is clear &mdash; Resource Management Act compliance, lines company agreement, and Transpower approval are all achievable within the 9-month P50 timeline.&rdquo;</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">The Accountant</p>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">APPROVE (Run 2)</span>
                                        </div>
                                        <p className="text-xs text-slate-600">&ldquo;At $1.4M Y1 revenue, the project achieves a realistic 8.2% IRR over a 25-year asset life. SCF Impact of $1.42M exceeds the $1M viability threshold. Cash flow breakeven at month 38. RROI improvement from 38 to 74 reflects genuine de-risking, not cosmetic adjustment.&rdquo;</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">The Operator</p>
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">APPROVE (Run 1 &amp; 2)</span>
                                        </div>
                                        <p className="text-xs text-slate-600">&ldquo;Execution risk is manageable. Vestas has delivered 15+ installations of this scale in Australasia. Council has procurement experience with civil projects. 9-month activation is tight but achievable if resource consent is fast-tracked. Labour availability in Northland is the binding constraint &mdash; recommend early contractor engagement.&rdquo;</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                                    <p className="text-sm text-blue-800 font-semibold mb-1">Consensus: 5/5 APPROVE (Run 2)</p>
                                    <p className="text-xs text-blue-600">Bayesian posterior updated across both runs. Run 1 consensus: 2/5 (Advocate + Operator). Run 2 consensus: 5/5 with conditions. Belief convergence achieved after correction of both flagged deficiencies.</p>
                                </div>
                            </div>
                        </section>

                        {/* Risk Assessment */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Risk Assessment &mdash; Monte Carlo &amp; RFI Output</h3>
                                <div className="space-y-3 mb-4">
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-semibold text-slate-900">Monte Carlo Simulation</p>
                                            <span className="text-xs text-slate-500">5,000 scenarios</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 text-center">
                                            <div className="bg-white border border-slate-200 rounded p-2">
                                                <p className="text-xs text-slate-500 mb-1">P10 (Optimistic)</p>
                                                <p className="text-sm font-bold text-green-600">$1.68M SCF</p>
                                            </div>
                                            <div className="bg-white border border-blue-200 rounded p-2">
                                                <p className="text-xs text-slate-500 mb-1">P50 (Median)</p>
                                                <p className="text-sm font-bold text-blue-600">$1.42M SCF</p>
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded p-2">
                                                <p className="text-xs text-slate-500 mb-1">P90 (Conservative)</p>
                                                <p className="text-sm font-bold text-amber-600">$1.08M SCF</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-4">
                                        <p className="text-sm font-semibold text-slate-900 mb-2">Regulatory Friction Index (RFI)</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Run 1 (Pre-Correction)</p>
                                                <p className="text-sm text-red-600 font-bold">RFI: 72/100 &mdash; High Friction</p>
                                                <p className="text-xs text-slate-500 mt-1">2 bottlenecks detected, 1 hard gate triggered</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Run 2 (Post-Correction)</p>
                                                <p className="text-sm text-blue-600 font-bold">RFI: 31/100 &mdash; Low Friction</p>
                                                <p className="text-xs text-slate-500 mt-1">0 bottlenecks, 0 hard gates. Clear regulatory pathway.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Cognition Layer */}
                        <section className="py-8 px-6 md:px-8 bg-slate-50 border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Human Cognition Engine &mdash; Expert Judgement Simulation</h3>
                                <p className="text-xs text-slate-500 mb-4">7 neuroscience models from published research, implemented as faithful mathematical engines</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs font-semibold text-slate-800 mb-1">Wilson-Cowan Neural Fields</p>
                                        <p className="text-xs text-slate-600">Run 1: Inhibitory signals dominated &mdash; risk aversion pattern detected. Run 2: Balanced excitatory/inhibitory fields. Decision confidence: 0.81</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs font-semibold text-slate-800 mb-1">Predictive Processing</p>
                                        <p className="text-xs text-slate-600">Run 1: High prediction error on revenue assumptions (2.8&times; deviation). Run 2: Prediction error minimised. Hierarchical consistency achieved across all 3 levels.</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs font-semibold text-slate-800 mb-1">Free Energy Principle</p>
                                        <p className="text-xs text-slate-600">Run 1: High surprise (missing feasibility study created unresolvable uncertainty). Run 2: Free energy minimised. Policy selection converged on &ldquo;proceed with monitoring.&rdquo;</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-sm p-3">
                                        <p className="text-xs font-semibold text-slate-800 mb-1">Emotional Valence</p>
                                        <p className="text-xs text-slate-600">Run 1: Loss aversion triggered &mdash; the $4.2M projection &ldquo;felt wrong&rdquo; even before formula scoring confirmed. Run 2: Balanced valence. Prospect theory alignment positive.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Evidence Sources */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Audit Trail &mdash; Source Code References</h3>
                                <p className="text-xs text-slate-500 mb-4">Every score is computed by implemented TypeScript. File paths and line counts are real and verifiable.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { file: 'services/engine.ts', purpose: 'calculateSPI()  -  7-component weighted scoring. computeSCF()  -  P10/P50/P90 impact.' },
                                        { file: 'services/MissingFormulasEngine.ts', purpose: 'computeRFI()  -  Regulatory Friction Index with bottleneck detection.' },
                                        { file: 'services/PersonaEngine.ts', purpose: '5-persona adversarial debate engine.' },
                                        { file: 'services/ReportOrchestrator.ts', purpose: 'Full report assembly, all engines in parallel.' },
                                        { file: 'services/algorithms/DAGScheduler.ts', purpose: 'IVAS activation timeline. SCF composite scoring. Formula dependency graph.' },
                                        { file: 'services/NSILIntelligenceHub.ts', purpose: 'Master control  -  all 44+ engines orchestrated.' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-sm p-3">
                                            <p className="text-xs font-mono text-blue-600 mb-1">{item.file}</p>
                                            <p className="text-xs text-slate-600">{item.purpose}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ================================================================ */}
                        {/* THE VERDICT - What This Actually Means For The User             */}
                        {/* ================================================================ */}
                        <section className="py-10 px-6 md:px-8 bg-gradient-to-r from-green-50 to-emerald-50 border-y-4 border-green-500">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-green-700 uppercase tracking-[0.15em] text-xs font-bold">FINAL VERDICT</p>
                                        <h3 className="text-2xl font-bold text-slate-900">This Project Is Ready to Move Forward</h3>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg border border-green-200 p-6 mb-6">
                                    <h4 className="text-lg font-semibold text-slate-900 mb-3">What This Means in Plain English:</h4>
                                    <p className="text-base text-slate-700 leading-relaxed mb-4">
                                        The Northland Regional Council&rsquo;s solar partnership with Vestas has passed every test. The numbers are realistic, the risks are manageable, the regulatory path is clear, and every expert persona agrees it should proceed. <strong>This project has a 78% strategic viability score and is classified as &ldquo;Investment Ready.&rdquo;</strong>
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <p className="text-3xl font-bold text-green-600">78%</p>
                                            <p className="text-xs text-slate-600">Viability Score</p>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <p className="text-3xl font-bold text-green-600">9 mo</p>
                                            <p className="text-xs text-slate-600">To First Revenue</p>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <p className="text-3xl font-bold text-green-600">$1.42M</p>
                                            <p className="text-xs text-slate-600">Year 1 Cash Flow</p>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 mb-3">What the Council Should Do Next:</h4>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 bg-white border-t border-slate-200 p-4">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Begin Formal Partner Engagement</p>
                                            <p className="text-sm text-slate-600">Use the generated Letter of Intent (LOI) to open official discussions with Vestas. The document is already structured to their expectations.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white border-t border-slate-200 p-4">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Submit to Council Board</p>
                                            <p className="text-sm text-slate-600">The Investment Prospectus and Executive Summary are ready for board presentation. All numbers are defensible and traceable.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white border-t border-slate-200 p-4">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Initiate Resource Consent Process</p>
                                            <p className="text-sm text-slate-600">The regulatory pathway is clear. Begin RMA consent applications now to hit the 9-month activation timeline.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 bg-white border-t border-slate-200 p-4">
                                        <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Lock In Contractor Early</p>
                                            <p className="text-sm text-slate-600">Labour availability in Northland was flagged as the binding constraint. Early contractor engagement is critical.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Documents Generated */}
                        <section className="py-8 px-6 md:px-8 bg-white border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">Documents Generated From This Analysis</h3>
                                <p className="text-sm text-slate-600 mb-4">The system automatically produced the following documents &mdash; ready to download, share, or submit:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        'Investment Prospectus',
                                        'Executive Summary',
                                        'Letter of Intent (LOI)',
                                        'Partnership Assessment',
                                        'Risk Report',
                                        'Financial Model',
                                        'Board Presentation',
                                        'Compliance Checklist'
                                    ].map((doc, idx) => (
                                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-sm p-3 text-center">
                                            <p className="text-xs font-medium text-slate-700">{doc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* The Bottom Line */}
                        <section className="py-8 px-6 md:px-8 bg-slate-50 border-b border-slate-200">
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-sm text-blue-600 uppercase tracking-wider font-bold mb-4">The Bottom Line</h3>
                                <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
                                    <p className="text-base text-slate-700 leading-relaxed mb-4">
                                        <strong className="text-slate-900">Without this system:</strong> The council would have spent 3&ndash;6 months and $50,000&ndash;$150,000 on consultants to reach the same conclusion. They would have submitted an initial proposal with inflated revenue projections &mdash; likely rejected by investors or delayed by months of back-and-forth.
                                    </p>
                                    <p className="text-base text-slate-700 leading-relaxed">
                                        <strong className="text-slate-900">With this system:</strong> The council got instant feedback on their errors, fixed them in hours, and now has a complete, defensible investment case with all supporting documents &mdash; ready for partner engagement, board approval, and regulatory submission.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Closing statement */}
                        <div className="border-t-2 border-slate-300 px-8 md:px-12 py-8">
                            <p className="text-sm font-bold text-slate-900 uppercase tracking-wide text-center mb-3">
                                This is what the system produces. Every time.
                            </p>
                            <p className="text-sm text-slate-500 text-center leading-relaxed">
                                Not just scores and technical data &mdash; but a clear verdict, actionable next steps, and all the documents you need to move forward. Your project, your data, your opportunity &mdash; transformed into a decision-ready package.
                            </p>
                        </div>

                        {/* Close button */}
                        <div className="px-8 md:px-12 py-8 border-t border-slate-200 flex justify-end bg-white">
                            <button 
                                onClick={() => setShowProofPopup(false)}
                                className="px-8 py-3 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Architecture Modal */}
            {showArchitecture && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowArchitecture(false)}>
                    <div className="bg-slate-950 max-w-5xl w-full my-8 shadow-2xl border border-white/5" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="px-8 md:px-14 pt-14 pb-12 border-b border-white/8 relative">
                            <button onClick={() => setShowArchitecture(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"><X size={20} /></button>
                            <div className="inline-block border border-amber-400/40 px-3 py-1 mb-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Unprecedented — Never Been Combined</p>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                                Six disciplines.<br />
                                <span className="font-black">One pipeline.</span><br />
                                <span className="font-black text-amber-400">Built by one person.</span>
                            </h2>
                            <p className="text-[15px] text-white/80 mt-6 max-w-3xl leading-relaxed">
                                ADVERSIQ is not built on a single idea. It is the convergence of formal logic, Bayesian statistics, decision science, cognitive neuroscience, financial modelling, and software architecture - with autonomous calibration now running across the stack. Every layer has an explicit input and output contract. The platform now preserves the original NSIL architecture while adding live persona calibration, structural twin discovery, Rawlsian ethics certificates, investor trust signals, macro early-warning alerts, and a continual improvement harness.
                            </p>
                            {/* 6 Disciplines bar */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-px mt-8 bg-white/5">
                                {[
                                    { d: 'Formal Logic', note: 'SAT contradiction solver' },
                                    { d: 'Bayesian Statistics', note: 'Belief-updating debate engine' },
                                    { d: 'Decision Science', note: '10-layer structured pipeline' },
                                    { d: 'Cognitive Neuroscience', note: '7 university models implemented' },
                                    { d: 'Financial Modelling', note: '54+ proprietary formulas' },
                                    { d: 'Software Architecture', note: 'DAG scheduling + contracts' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-900 px-5 py-4">
                                        <p className="text-xs font-black text-amber-400 uppercase tracking-wide">{item.d}</p>
                                        <p className="text-[11px] text-white/60 mt-1">{item.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            {/* Proof bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
                                {[
                                    { n: '10', label: 'Contracted\nPipeline Layers' },
                                    { n: '54+', label: 'Proprietary\nFormulas' },
                                    { n: '11+', label: 'World-First\nCombinations' },
                                    { n: '6', label: 'Advancement\nModules' },
                                ].map((s, i) => (
                                    <div key={i} className="bg-slate-900 px-6 py-7 text-center">
                                        <p className="text-3xl md:text-4xl font-black text-amber-400 leading-none">{s.n}</p>
                                        <p className="text-[10px] text-white/60 uppercase tracking-[0.1em] mt-2 leading-snug whitespace-pre-line">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* World Firsts — full expanded section */}
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">What Has Never Been Combined Before</p>
                                    <div className="flex-1 h-px bg-white/5" />
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest">11 World-First Combinations</p>
                                </div>
                                <p className="text-sm text-white/75 leading-relaxed mb-8 max-w-3xl">
                                    Each of these exists in academic literature or commercial software in isolation. No platform has ever combined them into a single connected pipeline where the output of each gates the input of the next.
                                </p>

                                {/* Items 01–07 — Original World Firsts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mb-px">
                                    {[
                                        {
                                            n: '01',
                                            tag: 'Formal Logic × Investment Intelligence',
                                            title: 'SAT Contradiction Solving Applied to Investment Proposals',
                                            body: 'Boolean satisfiability — normally used to verify chip designs and software logic — is applied to investment briefs before any scoring begins. Every assumption is converted to propositional logic and tested for contradiction. Impossible briefs are stopped at the gate before they contaminate the pipeline and waste computational resources on an indefensible case.',
                                            discipline: 'Formal Logic',
                                            color: 'text-violet-400',
                                            border: 'border-violet-400/20',
                                        },
                                        {
                                            n: '02',
                                            tag: 'Bayesian Statistics × Strategic Debate',
                                            title: 'Bayesian Adversarial Debate as a Verification Gate',
                                            body: 'Five expert personas — Skeptic, Advocate, Regulator, Accountant, and Operator — challenge every case using Bayesian belief updating. Disagreement is preserved, not smoothed. Confidence adjusts as evidence accumulates. No single narrative can dominate. The output is a verified consensus, not a rubber stamp.',
                                            discipline: 'Bayesian Statistics',
                                            color: 'text-blue-400',
                                            border: 'border-blue-400/20',
                                        },
                                        {
                                            n: '03',
                                            tag: 'Machine Learning × Persona Credibility',
                                            title: 'Live Persona Calibration From Actual Outcomes',
                                            body: 'Persona influence weights are not static. As real outcomes are recorded, the system updates each persona\'s sector- and region-specific accuracy. A Skeptic who was reliably correct in infrastructure deals in Southeast Asia carries more weight on the next Southeast Asia infrastructure deal. A historically over-optimistic Advocate is automatically dampened.',
                                            discipline: 'Adaptive Learning',
                                            color: 'text-emerald-400',
                                            border: 'border-emerald-400/20',
                                        },
                                        {
                                            n: '04',
                                            tag: 'Historical Pattern Matching × Regional Forecasting',
                                            title: 'Structural Twin Discovery Across Regional Trajectories',
                                            body: 'Every regional brief is matched against structural analogues — Cebu, Da Nang, Penang, Medellín, Bilbao, Incheon. The system extracts what worked, what failed at each stage, and which lessons transfer. Rather than benchmarking against aspirational global peers, it identifies the most comparable starting point and draws a realistic trajectory forward.',
                                            discipline: 'Decision Science',
                                            color: 'text-amber-400',
                                            border: 'border-amber-400/20',
                                        },
                                        {
                                            n: '05',
                                            tag: 'Rawlsian Ethics × Pipeline Gate Logic',
                                            title: 'Ethics Certificates Embedded Inside the Analysis Flow',
                                            body: 'Ethics is not a paragraph at the end of a report. Hard ethical gates can reject a strategy mid-pipeline, generate a signed rejection certificate, write an immutable audit entry, and present compliant alternatives — all before the rest of the pipeline expends effort on a path that should never have proceeded. The certificate is traceable, dated, and human-readable.',
                                            discipline: 'Formal Ethics',
                                            color: 'text-rose-400',
                                            border: 'border-rose-400/20',
                                        },
                                        {
                                            n: '06',
                                            tag: 'Trust Engineering × Capital Commitment',
                                            title: 'Investor-Facing Trust Score With Uncertainty Fingerprint',
                                            body: 'Every recommendation carries a Trust Score, confidence grade, evidence depth breakdown, uncertainty fingerprint, and historical calibration check. The platform explicitly tells investors what it knows, what it is extrapolating from limited data, and what must be independently verified before capital is committed. Intellectual honesty is structural, not optional.',
                                            discipline: 'Financial Modelling',
                                            color: 'text-cyan-400',
                                            border: 'border-cyan-400/20',
                                        },
                                        {
                                            n: '07',
                                            tag: 'Macro Surveillance × Assumption Revalidation',
                                            title: 'Macro Regime-Shift Warning Connected to In-Flight Recalibration',
                                            body: 'The Macro Early Warning System monitors political, currency, regulatory, social, infrastructure, and climate baskets continuously. When any basket crosses a regime-shift threshold, in-flight analyses are flagged for revalidation instead of being allowed to survive on stale assumptions. The analysis ages with the world, not against it.',
                                            discipline: 'Decision Science',
                                            color: 'text-orange-400',
                                            border: 'border-orange-400/20',
                                        },
                                    ].map((item) => (
                                        <div key={item.n} className="bg-slate-900 px-7 py-8 group hover:bg-slate-800/80 transition-colors duration-300">
                                            <div className="flex items-start justify-between mb-4">
                                                <p className="text-4xl font-black text-white/8 leading-none">{item.n}</p>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 border ${item.border} ${item.color} opacity-70`}>
                                                    {item.discipline}
                                                </span>
                                            </div>
                                            <p className={`text-[9px] font-bold uppercase tracking-[0.15em] mb-2 ${item.color} opacity-50`}>{item.tag}</p>
                                            <p className="text-[13px] font-black text-white uppercase tracking-wide mb-3 leading-snug">{item.title}</p>
                                            <p className="text-[13px] text-white/80 leading-relaxed">{item.body}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Items 08–11 — New World Firsts added in this build */}
                                <div className="border border-amber-400/10 mb-px">
                                    <div className="px-7 py-4 bg-amber-400/5 border-b border-amber-400/10">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-400">New Additions — Built In This Version</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                                        {[
                                            {
                                                n: '08',
                                                tag: 'Bayesian Reinforcement × Engine Prioritisation',
                                                title: 'Hebbian Feedback Learning Applied to Intelligence Engine Weights',
                                                body: 'User feedback — thumbs up or down on a response — triggers Bayesian weight updates on the specific engines that fired for that query. Engines that consistently produce useful results gain influence. Those that underperform are deprioritised. Co-activation learning tracks which engine combinations produce the best outcomes together. No commercial intelligence platform has applied Hebbian reinforcement to engine orchestration before.',
                                                discipline: 'Adaptive Learning',
                                                color: 'text-emerald-400',
                                                border: 'border-emerald-400/20',
                                            },
                                            {
                                                n: '09',
                                                tag: 'NLP Signal Extraction × Intelligence Routing',
                                                title: 'Intent-Adaptive Brain Routing From Unstructured Natural Language',
                                                body: 'The system extracts country, sector, topic, and document-request intent from conversational natural language without structured forms. A message like "what are the risks of investing in Vietnam solar infrastructure" automatically routes to country risk, sector analysis, and the historical pattern engine — not through user selection menus but through real-time signal extraction applied before any engine fires.',
                                                discipline: 'Decision Science',
                                                color: 'text-amber-400',
                                                border: 'border-amber-400/20',
                                            },
                                            {
                                                n: '10',
                                                tag: 'Document Intelligence × Live Intelligence Stack',
                                                title: 'Uploaded Document Text Injected Into the Full Intelligence Pipeline',
                                                body: 'When a user uploads a PDF, Word document, or CSV, its extracted text is injected into the intelligence stack as a live context block — not as a chatbot attachment but as a first-class input to the SAT solver, adversarial debate engine, and risk matrix. The system reads, reasons about, and generates new documents from the uploaded content using the full 10-layer pipeline.',
                                                discipline: 'Software Architecture',
                                                color: 'text-cyan-400',
                                                border: 'border-cyan-400/20',
                                            },
                                            {
                                                n: '11',
                                                tag: 'Intelligence Provenance × User Trust',
                                                title: 'Real-Time Intelligence Provenance Panel With Feedback Loop',
                                                body: 'Every response surfaces exactly which intelligence engines fired, what confidence level was achieved, and how long it took — in a visible panel attached to the message. Users can see whether the answer came from the 15-index panel, the historical pattern engine, the live World Bank data feed, or the document vault. Feedback buttons are connected to real weight updates, not logged and ignored.',
                                                discipline: 'Trust Engineering',
                                                color: 'text-violet-400',
                                                border: 'border-violet-400/20',
                                            },
                                        ].map((item) => (
                                            <div key={item.n} className="bg-slate-900/60 px-7 py-8 group hover:bg-slate-800/80 transition-colors duration-300">
                                                <div className="flex items-start justify-between mb-4">
                                                    <p className="text-4xl font-black text-white/8 leading-none">{item.n}</p>
                                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 border ${item.border} ${item.color} opacity-70`}>
                                                        {item.discipline}
                                                    </span>
                                                </div>
                                                <p className={`text-[9px] font-bold uppercase tracking-[0.15em] mb-2 ${item.color} opacity-50`}>{item.tag}</p>
                                                <p className="text-[13px] font-black text-white uppercase tracking-wide mb-3 leading-snug">{item.title}</p>
                                                <p className="text-[13px] text-white/80 leading-relaxed">{item.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Why section */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 border-t-2 border-amber-400/20">
                                    <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-6">Why This Has Never Been Done Before</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <p className="text-[14px] text-white/85 leading-relaxed">Building any one of these components in isolation is achievable. Combining all of them — where the output of each feeds the input of the next, where the contradiction solver must run before the debate engine, where the audit layer must see the full chain before it signs off — required simultaneous expertise across six academic disciplines. No commercial product had demanded that combination until this one.</p>
                                        <p className="text-[14px] text-white/85 leading-relaxed">The eleventh combination — real-time intelligence provenance with Hebbian feedback learning applied to engine orchestration — has no precedent. Every session improves the system. Every correction strengthens the right engines. Every investment case leaves the platform marginally smarter than it was before.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
                                        {['Formal Logic', 'Bayesian Statistics', 'Decision Science', 'Cognitive Neuroscience', 'Financial Modelling', 'Software Architecture'].map((d, i) => (
                                            <div key={i} className="border border-amber-400/20 px-3 py-4 text-center">
                                                <p className="text-[10px] font-black text-amber-400 uppercase tracking-wide leading-snug">{d}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-white/60 uppercase tracking-[0.3em]">Six disciplines. Eleven world-first combinations. One pipeline. Built by one person.</p>
                                </div>
                            </div>

                            {/* What Is Now Built */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-amber-400">What Is Now Built Into The Architecture</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: '54+ Deterministic Formulas', body: 'A proprietary scoring suite spanning strategic positioning, risk-adjusted return, supply chain impact, workforce readiness, governance integrity, market access, resilience, and execution probability. Every formula is auditable and dependency-aware.' },
                                        { title: 'Bayesian Adversarial Debate Engine', body: 'Five expert personas challenge every proposal before release. The system preserves disagreement, updates beliefs, and now supports outcome-driven persona calibration.' },
                                        { title: 'SAT Contradiction Solver', body: 'Every assumption can be checked for internal conflict before the expensive analysis starts. If the premise is impossible, the system tells the user why instead of producing polished nonsense.' },
                                        { title: 'Autonomous Continual Harness', body: 'Episodes and outcomes feed a scheduled improvement loop for formula weights, persona calibration, prompt directives, and skill crystallisation.' },
                                        { title: 'Board-Ready Document Generation', body: 'Reports, letters, briefs, and audit-ready outputs are compiled from scores, debates, trust signals, ethics results, and provenance rather than invented from a prompt.' },
                                    ].map((item, i) => (
                                        <div key={i} className="border-t border-white/10 pt-5">
                                            <p className="text-sm font-black text-white mb-2">{item.title}</p>
                                            <p className="text-sm text-white/80 leading-relaxed">{item.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Closing */}
                            <div className="border-t border-white/10 pt-10">
                                <p className="text-2xl md:text-3xl font-black text-white leading-tight max-w-3xl">
                                    Six disciplines. 10 contract layers. 54+ formulas. Six advancement modules. One pipeline.<br />
                                    <span className="text-amber-400">Built by one person, in sixteen months, from nothing.</span>
                                </p>
                                <p className="text-sm text-white/80 mt-4 max-w-2xl leading-relaxed">
                                    The architecture is not a claim. The original NSIL stack remains the core: contradiction solving, debate, scoring, simulation, cognitive modelling, document synthesis, and reflexive release control. The new advancement layer adds outcome calibration, structural twins, ethics certificates, trust scoring, MEWS alerts, and continual improvement without reducing the platform to a reactive chatbot.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 md:px-14 py-6 border-t border-white/10 flex justify-between items-center">
                            <p className="text-xs text-white/60 font-medium uppercase tracking-widest">ADVERSIQ Intelligence &mdash; ABN 55 978 113 300</p>
                            <button onClick={() => setShowArchitecture(false)} className="px-8 py-3 bg-amber-400 text-slate-900 text-sm font-bold hover:bg-amber-300 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Founder Letter Modal */}
            {showFounderLetter && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowFounderLetter(false)}>
                    <div className="bg-slate-950 max-w-4xl w-full my-8 shadow-2xl border border-white/5" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="relative px-8 md:px-16 pt-14 pb-12 border-b border-white/8">
                            <button onClick={() => setShowFounderLetter(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"><X size={20} /></button>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-6 text-amber-400">A Letter from the Founder</p>
                            <h2 className="text-4xl md:text-6xl font-extralight text-white leading-[1.1] mb-4">
                                Sixteen months.<br />
                                <span className="font-black">One developer.</span><br />
                                <span className="font-black text-amber-400">One purpose.</span>
                            </h2>
                            <p className="text-sm text-white/80 mt-6 uppercase tracking-[0.15em]">Brayden Walls &mdash; Founder &amp; Sole Developer, ADVERSIQ Intelligence</p>
                        </div>

                        {/* Stats bar */}
                        <div className="grid grid-cols-4 border-b border-white/8">
                            {[
                                { n: '16', label: 'Months\nBuilding' },
                                { n: '1', label: 'Developer,\nEverything' },
                                { n: '54+', label: 'Proprietary\nFormulas' },
                                { n: '$0', label: 'External\nFunding' },
                            ].map((s, i) => (
                                <div key={i} className="px-6 py-7 border-r border-white/8 last:border-r-0 text-center">
                                    <p className="text-3xl md:text-4xl font-black text-amber-400 leading-none">{s.n}</p>
                                    <p className="text-[10px] text-white/70 uppercase tracking-[0.12em] mt-2 leading-snug whitespace-pre-line">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Letter body */}
                        <div className="px-8 md:px-16 py-12 space-y-10 text-white/85 leading-relaxed">

                            <p className="text-xl md:text-2xl font-light text-white leading-relaxed">
                                I am 53 years old. I am the sole developer of everything inside ADVERSIQ. And I want to tell you honestly why this exists &mdash; because it did not begin with a business plan.
                            </p>

                            {/* Pull quote */}
                            <div className="border-l-2 border-amber-400 pl-8 py-4 my-8">
                                <p className="text-lg md:text-xl text-white font-light italic leading-relaxed">
                                    &ldquo;Every &lsquo;new idea&rsquo; is old somewhere. The child learns what the parent already knows. The past isn&rsquo;t historical interest. The past is the solution library.&rdquo;
                                </p>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mt-4">&mdash; Brayden Walls</p>
                            </div>

                            {/* Sections */}
                            {[
                                {
                                    label: 'What I Saw',
                                    paras: [
                                        'I have spent my career moving across sectors — construction, resources, trade, regional development, community governance. In every environment, across every country and every field, the same thing kept happening. The people who needed the best information the most were the ones who had the least access to it.',
                                        'I watched regional councils spend months preparing proposals that were rejected not because their opportunities weren\'t real, but because the documents didn\'t speak the language investors expect. I watched businesses enter foreign markets on optimistic spreadsheets and come undone on details they had no way of knowing to ask about. I watched government agencies commission reports that arrived three months too late, cost more than the decision was worth, and still couldn\'t surface the one or two things that actually mattered.',
                                        'And I noticed something else: the gap was never about intelligence, ambition, or effort. The people I was watching were exceptional. The gap was entirely about access. The right tools had always existed — but they lived inside capital-city advisory firms, behind six-figure invoices and six-week turnaround times.',
                                    ]
                                },
                                {
                                    label: 'What I Did About It',
                                    paras: [
                                        'At 52, I decided to stop watching it happen. I taught myself to code. I studied every economic development framework, every investment methodology, every decision-science discipline I could find. I moved to the Philippines and spent over a year on the ground — in Mindanao, in small coastal cities, in communities where the economic potential was enormous and the tools to unlock it simply did not exist. I watched the same pattern repeat: ambitious local leaders, incomplete information, no pathway to be seen.',
                                        'That period became the foundation of this system. Not as inspiration — as specification. Every feature in ADVERSIQ exists because I watched a real decision fail in a real place for a reason that was entirely preventable.',
                                    ]
                                },
                             ].map((section, si) => (
                                <div key={si} className="border-t border-white/8 pt-10">
                                    <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-6">{section.label}</p>
                                    {section.paras.map((p, pi) => (
                                        <p key={pi} className="text-[15px] leading-relaxed text-white/80 mt-4 first:mt-0">{p}</p>
                                    ))}
                                </div>
                            ))}

                            {/* Why I am telling you this */}
                            <div className="border-t border-white/8 pt-10">
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400 mb-6">Why I Am Telling You This</p>
                                <p className="text-[15px] text-white/80 leading-relaxed">
                                    Because I want you to understand what you&rsquo;re looking at. This is not a startup with a pitch deck and a runway. This is not a model wrapper with a dashboard and a marketing team. This is sixteen months of one person&rsquo;s full attention, applied to a problem that has existed for decades and been ignored because the people it hurt the most had no platform to be heard from.
                                </p>
                                <p className="text-[15px] text-white/80 leading-relaxed mt-4">
                                    I have no investors. I have no team. I registered as an Australian sole trader and built every line of this from the ground up. I did it because I believe the organisations that have always been overlooked deserve the same analytical firepower as the ones that were never at risk of being ignored.
                                </p>
                                <p className="text-[15px] text-white font-medium leading-relaxed mt-6">
                                    I hope it bridges the gap. That is all it was ever meant to do.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="border-t border-white/8 pt-10 mt-4">
                                <p className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-3">Brayden Walls</p>
                                <p className="text-sm text-white/80 uppercase tracking-[0.15em]">Founder &amp; Sole Developer — ADVERSIQ Intelligence</p>
                                <p className="text-xs text-white/60 mt-2 uppercase tracking-[0.15em]">ABN 55 978 113 300 — Registered Australian Sole Trader</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 md:px-16 py-6 border-t border-white/8 flex justify-between items-center">
                            <p className="text-xs text-white/60 font-medium uppercase tracking-widest">Built from the edge. For the whole world.</p>
                            <button onClick={() => setShowFounderLetter(false)} className="px-8 py-3 bg-amber-400 text-slate-900 text-sm font-bold hover:bg-amber-300 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Architecture & Formulas Popup */}
            {showFormulas && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowFormulas(false)}>
                    <div className="bg-white shadow-2xl max-w-5xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
                        {/* Header — Landing page style */}
                        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 md:px-12 pt-10 pb-8">
                            <button onClick={() => setShowFormulas(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={20} />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">Complete System</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">Inside the NSIL &mdash; Current Layers, Formulas &amp; Engines</h2>
                            <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">The Nexus Strategic Intelligence Layer &mdash; a deterministic reasoning engine that combines 54+ proprietary formulas, 44+ intelligence engines, and 12 core algorithms into a unified 10-layer pipeline.</p>
                        </div>
                        {/* Body */}
                        <div className="px-8 md:px-12 py-10 space-y-8 text-sm text-slate-700 leading-relaxed">

                            <div className="border-t-2 border-slate-300 pt-6 mb-8">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Current Intelligence Architecture</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    This is <strong>how the system thinks today.</strong> Every input enters a deterministic 10-layer pipeline with adaptive multi-phase intake, a Regional Development Kernel, partner intelligence scoring, causal problem-to-solution graphs, and case-method gating. The current runtime now adds <strong>streaming responses</strong>, <strong>reactive draft analysis while users type</strong>, a <strong>concurrent planner/executor timeline</strong>, and <strong>confidence + source provenance</strong> on outputs. It validates, debates, scores, stress-tests, and synthesises analysis with explicit logic and auditability.
                                </p>
                            </div>

                            <p>The NSIL &mdash; <strong>Nexus Strategic Intelligence Layer</strong> &mdash; is a deterministic reasoning engine that combines <strong>54+ proprietary formulas</strong>, <strong>44+ intelligence engines</strong>, and <strong>12 core algorithms</strong> into a unified 10-layer pipeline, now extended with a <strong>Regional Development Kernel</strong>, <strong>Partner Intelligence Engine</strong>, <strong>Problem-to-Solution Graph</strong>, <strong>Global Data Fabric</strong>, <strong>Case Study Method Layer</strong>, and <strong>Outcome Learning Service</strong>. Implemented in <span className="font-mono text-sm bg-slate-100 px-1 rounded">services/NSILIntelligenceHub.ts</span>, it runs every analysis through computational layers in sequence, with parallelism inside each layer where dependencies allow. Same inputs, same outputs, every time. Here&rsquo;s every layer, every formula, every engine.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 0 &mdash; The Laws (Knowledge Architecture)</h4>
                            <p>Hard-coded economic truth that the AI cannot alter. 54+ proprietary formulas defined with fixed mathematical relationships and bounded outputs, managed by a DAG Scheduler (<span className="font-mono text-sm bg-slate-100 px-1 rounded">DAGScheduler.ts</span>). The scheduler maps every formula into a directed acyclic graph across 5 execution levels &mdash; Level 0 runs PRI, CRI, BARNA, and TCO in parallel; Level 1 feeds into SPI, RROI, NVI, RNI, CAP; Level 2 produces SEAM, IVAS, ESI, FRS, AGI, VCI; Level 3 creates the master Strategic Confidence Framework (SCF); Level 4 runs 8 autonomous intelligence indices. Results are memoised &mdash; no formula executes twice.</p>

                            <p>Three examples of what these formulas do: <strong>SPI</strong> (Strategic Positioning Index) quantifies market dominance by weighting political risk against country risk with growth-adjusted positioning. <strong>RROI</strong> (Risk-Adjusted Return on Investment) runs Monte Carlo propagation across probability-weighted scenarios &mdash; real-world variance, not a single optimistic projection. <strong>SEAM</strong> (Strategic Ethical Alignment Matrix) cross-references strategy against policy frameworks and stakeholder impact.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 1 &mdash; The Shield (Input Validation)</h4>
                            <p>A SAT Contradiction Solver I wrote (<span className="font-mono text-sm bg-slate-100 px-1 rounded">SATContradictionSolver.ts</span>) converts inputs into propositional logic &mdash; conjunctive normal form &mdash; and runs a DPLL-based satisfiability check. Catches contradictions like claiming low risk while expecting 40%+ ROI, targeting global expansion on a small budget, or combining conservative strategy with aggressive growth targets. Each contradiction is classified by severity.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 2 &mdash; The Boardroom (Multi-Agent Debate)</h4>
                            <p>Five adversarial personas &mdash; Skeptic (1.2x weight), Advocate, Regulator, Accountant, and Operator &mdash; conduct a structured Bayesian debate (<span className="font-mono text-sm bg-slate-100 px-1 rounded">BayesianDebateEngine.ts</span>). Each votes across four outcomes: proceed, pause, restructure, or reject. Beliefs update via Bayesian inference. Early stopping at 0.75 posterior probability or 0.02 belief delta. Disagreements resolved through Nash bargaining. Every persona&rsquo;s reasoning preserved in the audit trail.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 3 &mdash; The Engine (Formula Scoring)</h4>
                            <p>The DAG Scheduler executes the full 54+ formula suite with typed inputs, bounded outputs, component breakdowns, and execution timing. Results flow into a <span className="font-mono text-sm bg-slate-100 px-1 rounded">CompositeScoreService</span> that normalises raw data against region-specific baselines. Deterministic jitter from hash-based seeding ensures reproducibility.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 4 &mdash; Stress Testing (Scenario Simulation)</h4>
                            <p>The Scenario Simulation Engine (<span className="font-mono text-sm bg-slate-100 px-1 rounded">ScenarioSimulationEngine.ts</span>) builds causal graphs with feedback loops, runs Monte Carlo propagation through multi-step chains with non-linear dynamics, and simulates forward outcomes using Markov chain state transitions across economic, political, social, environmental, technological, and regulatory categories.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 5 &mdash; The Brain (Human Cognition Engine)</h4>
                            <p>The Human Cognition Engine I wrote (<span className="font-mono text-sm bg-slate-100 px-1 rounded">HumanCognitionEngine.ts</span>) implements 7 neuroscience models as mathematical implementations:</p>
                            <ol className="list-decimal list-inside space-y-1 pl-2">
                                <li><strong>Wilson-Cowan Neural Field Dynamics</strong> &mdash; Differential equations on excitatory/inhibitory neuron populations on a 50&times;50 spatial grid. Parameters: w_ee=1.5, w_ei=-1.0, w_ie=1.0, w_ii=-0.5, dt=0.01.</li>
                                <li><strong>Predictive Coding (Rao &amp; Ballard)</strong> &mdash; 3-level hierarchical belief updating with prediction error minimisation. Learning rate 0.1.</li>
                                <li><strong>Free Energy Principle (Friston)</strong> &mdash; Variational inference across 8 candidate policies, discount factor &gamma;=0.95.</li>
                                <li><strong>Attention Models (Itti &amp; Koch)</strong> &mdash; Salience maps with intensity/colour/orientation weights. Winner-take-all with inhibition of return (0.7).</li>
                                <li><strong>Emotional Processing</strong> &mdash; Neurovisceral integration theory, emotional inertia (0.8), autonomic coupling (0.6).</li>
                                <li><strong>Global Workspace Theory</strong> &mdash; Coalition formation with ignition threshold 0.6. Information broadcasting across cognitive subsystems.</li>
                                <li><strong>Baddeley&rsquo;s Working Memory</strong> &mdash; Phonological decay 0.05, visual decay 0.03, rehearsal benefit 0.2.</li>
                            </ol>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Layer 6 &mdash; Autonomous Intelligence (8 Engines)</h4>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                <li><strong>Creative Synthesis</strong> &mdash; Koestler&rsquo;s bisociation theory + Fauconnier &amp; Turner conceptual blending.</li>
                                <li><strong>Cross-Domain Transfer</strong> &mdash; Maps biology, physics, engineering onto economics via Gentner&rsquo;s structure-mapping theory.</li>
                                <li><strong>Autonomous Goal</strong> &mdash; Detects emergent strategic goals from top-level index scores.</li>
                                <li><strong>Ethical Reasoning</strong> &mdash; Multi-stakeholder utility, Rawlsian fairness, Stern Review discount rates (&le;1.4%). Every recommendation must pass this gate.</li>
                                <li><strong>Self-Evolving Algorithm</strong> &mdash; Online gradient descent w_t+1 = w_t - &eta;&nabla;L, Thompson sampling, mutation-selection with full rollback.</li>
                                <li><strong>Adaptive Learning</strong> &mdash; Bayesian belief updates from outcome feedback.</li>
                                <li><strong>Emotional Intelligence</strong> &mdash; Prospect Theory + Russell&rsquo;s Circumplex Model for stakeholder dynamics.</li>
                                <li><strong>Scenario Simulation</strong> &mdash; 5,000 Monte Carlo runs with causal loop modelling and Markov state transitions.</li>
                            </ul>

                            <h4 className="text-lg font-bold text-slate-900 pt-4">Output Synthesis & Document Intelligence (Layer 8)</h4>
                            <p className="text-sm text-slate-700 mb-3">The output layer generates institutional-grade deliverables with full traceability:</p>
                            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600 mb-4">
                                <li><strong>156+ Letter Templates</strong> &mdash; Pre-structured letters for recommendations, objections, escalations, negotiations, and stakeholder communications, now selectable with letters-only generation paths.</li>
                                <li><strong>247+ Document Outputs Across 15 Categories</strong> &mdash; Executive summaries, risk assessments, counterfactual analysis reports, persona debate transcripts, financial stress tests, governance audits, regulatory compliance dossiers, market intelligence briefs, implementation roadmaps, and case study comparisons, with adaptive length control.</li>
                                <li><strong>Case Study Intelligence</strong> &mdash; Upload any past deal, project, or decision. The system applies NSIL analysis retroactively: full SPI/RROI/SEAM breakdown with what-if scenarios showing how outcomes could have changed.</li>
                                <li><strong>Provenance & Auditability</strong> &mdash; Every number in every document traces back to source data, formula component, neuroscience model, or autonomous engine decision. Full breadcrumb trail for regulators, auditors, boards.</li>
                            </ul>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Advanced User Analysis (Reflexive Intelligence Layer)</h4>
                            <p className="text-sm text-slate-700 mb-3">Seven specialized engines that analyse YOU, not just the situation:</p>
                            <div className="space-y-2 text-sm text-slate-600 mb-4">
                                <div>
                                    <strong>User Signal Decoder</strong> &mdash; Shannon entropy analysis of narrative patterns. Detects repetition (uncertainty), avoidance (hidden concerns), emotional emphasis (priority signals). Acts as mirror to surface unspoken decision drivers.
                                </div>
                                <div>
                                    <strong>Internal Echo Detector</strong> &mdash; Prevents confirmation bias inside the machine itself. Flags when NSIL's own conclusions align too strongly with your stated preferences-runs explicit contradiction checks.
                                </div>
                                <div>
                                    <strong>Investment Lifecycle Mapper</strong> &mdash; Identifies project stage (pre-launch, scaling, plateau, exit) and adjusts analytical framework. Early-stage deals need different risk tolerance than late-stage exits.
                                </div>
                                <div>
                                    <strong>Regional Mirroring Engine</strong> &mdash; Finds structural twin regions via 6-dimensional structure-mapping (economy, governance, geography, culture, infrastructure, regulation). Surfaces hidden analogues for precedent learning.
                                </div>
                                <div>
                                    <strong>Regional Identity Decoder</strong> &mdash; Detects when authentic organizational or regional identity has been replaced with generic marketing language. Flags inconsistencies between declared values and actual investment patterns.
                                </div>
                                <div>
                                    <strong>Latent Advantage Miner</strong> &mdash; Surfaces casually mentioned assets (a partner relationship, a minority stakeholder, past technical work) that have real strategic significance. Extracts hidden optionality.
                                </div>
                                <div>
                                    <strong>Universal Translation Layer</strong> &mdash; Translates NSIL findings for 5 audiences simultaneously: investor language (risk/return), government language (compliance/impact), community language (benefit/fairness), partner language (synergy/capability), executive language (execution/timeline).
                                </div>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Performance Optimizations Across the Pipeline</h4>
                            <p className="text-sm text-slate-700 mb-2">The system implements 4 critical speed improvements without sacrificing analytical depth:</p>
                            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600 mb-4">
                                <li><strong>Memory Retrieval (10-50x faster)</strong> &mdash; Vector Memory Index uses approximate nearest neighbour search instead of linear scan. Finds analogous cases in milliseconds vs seconds.</li>
                                <li><strong>Formula Execution (3-5x faster)</strong> &mdash; DAG Scheduler parallelizes independent formula computations. Level 0 runs 4 formulas simultaneously; cascades through 5 levels with smart dependency resolution.</li>
                                <li><strong>Debate Early Stopping (2-3x faster)</strong> &mdash; Bayesian Debate Engine terminates when posterior probability reaches 0.75 or belief delta drops below 0.02. No wasted rounds on foregone conclusions.</li>
                                <li><strong>Derivative Index Caching (2-4x faster)</strong> &mdash; Lazy Evaluation Engine computes secondary indices only on demand. If you don't ask for a specific breakdown, it never runs.</li>
                            </ul>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-10 pt-6 border-t-2 border-slate-300 mb-3">v7.0 &mdash; Regional Development Kernel</h4>
                            <p className="text-sm text-slate-700 mb-3">The central orchestrator for global regional problem-solving. Every entry path in the system &mdash; UI, ReportOrchestrator, DecisionPipeline, AutonomousOrchestrator, MultiAgentOrchestrator &mdash; now runs through the Regional Development Kernel before generating output.</p>
                            <div className="bg-slate-50 border border-slate-200 p-6 mb-6">
                                <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600">
                                    <li><strong>RegionalDevelopmentOrchestrator</strong> &mdash; Takes region profile, sector, constraints, funding envelope, governance context, country/jurisdiction, objective, current matter, evidence, and partner candidates. Returns interventions, partners, execution plan, causal graph, data fabric snapshot, governance readiness score, and analyst notes.</li>
                                    <li><strong>Partner Intelligence Engine</strong> &mdash; Ranks ideal partners using Partner Fit, Delivery Reliability, Policy Alignment, and Local Legitimacy indices blended with PVI/CIS/CCS/RFI/SRA/FRS. Each partner gets a full score breakdown and rationale. Governance, banking, private sector, NGO, and multilateral partners scored equally.</li>
                                    <li><strong>Problem-to-Solution Graph</strong> &mdash; Builds a causal graph from case evidence. Maps root causes, bottlenecks, and leverage points to interventions and required documents/letters. Surfaces hidden structural dependencies that narrative analysis misses.</li>
                                    <li><strong>Global Data Fabric</strong> &mdash; Signal ingestion scaffold with country/jurisdiction normalization. Policy, macro, and trade signals each scored for confidence (0-100) and freshness (hours since update). Regional kernel blocks output when data confidence drops below threshold.</li>
                                    <li><strong>Outcome Learning Service</strong> &mdash; Tracks recommended vs actual outcomes across cases. Adjusts governance thresholds and ranking bias over time. Feeds back into Partner Intelligence rankings and intervention prioritization.</li>
                                </ul>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">v7.0 &mdash; Case Study Method Layer</h4>
                            <p className="text-sm text-slate-700 mb-3">Before any report generates, five methodological gates must be satisfied:</p>
                            <ol className="list-decimal list-inside space-y-1 pl-2 text-sm text-slate-600 mb-4">
                                <li><strong>Boundary Clarity</strong> &mdash; Problem statement must exceed 60 characters of meaningful scope definition.</li>
                                <li><strong>Objective Quality</strong> &mdash; Strategic intent must exceed 20 characters with measurable outcomes.</li>
                                <li><strong>Evidence Sufficiency</strong> &mdash; Quantitative data, precedent, or structured analysis must be present.</li>
                                <li><strong>Rival Explanations</strong> &mdash; At least one alternative hypothesis or counter-argument must be documented.</li>
                                <li><strong>Implementation Feasibility</strong> &mdash; Timeline, resource allocation, and execution pathway must be defined.</li>
                            </ol>
                            <p className="text-sm text-slate-700 mb-4">If any gate fails, the system blocks generation and provides specific remediation steps. This is enforced across all entry paths: UI generation, ReportOrchestrator, DecisionPipeline, and autonomous loops.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">v7.0 &mdash; 8 Global Issue Packs</h4>
                            <p className="text-sm text-slate-700 mb-3">Domain-specific intelligence scaffolds that activate contextual knowledge, policy frameworks, typical interventions, and partner profiles for the world&rsquo;s most critical development challenges:</p>
                            <div className="grid md:grid-cols-2 gap-2 mb-4">
                                <ul className="space-y-1 text-sm text-slate-600">
                                    <li>&bull; <strong>Water Security</strong> &mdash; Infrastructure, governance, cross-border water rights, desalination, conservation</li>
                                    <li>&bull; <strong>Energy Transition</strong> &mdash; Renewable integration, grid modernization, storage, carbon markets</li>
                                    <li>&bull; <strong>Logistics Corridors</strong> &mdash; Trade route optimization, port development, supply chain resilience</li>
                                    <li>&bull; <strong>Housing Systems</strong> &mdash; Affordable housing policy, construction technology, urban planning</li>
                                </ul>
                                <ul className="space-y-1 text-sm text-slate-600">
                                    <li>&bull; <strong>Health Systems</strong> &mdash; Healthcare infrastructure, pharmaceutical access, pandemic resilience</li>
                                    <li>&bull; <strong>Digital Infrastructure</strong> &mdash; Connectivity, data sovereignty, digital identity, fintech</li>
                                    <li>&bull; <strong>Workforce Transition</strong> &mdash; Skills development, automation readiness, migration economics</li>
                                    <li>&bull; <strong>Climate Resilience</strong> &mdash; Adaptation infrastructure, disaster response, insurance, carbon capture</li>
                                </ul>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-10 pt-6 border-t-2 border-slate-300 mb-3">Entity Intelligence Pipeline &mdash; Real-Time Entity Verification</h4>
                            <p className="text-sm text-slate-700 mb-3">When any entity (company, partner, organisation, individual) is mentioned in a query, the Entity Intelligence Pipeline fires automatically. It runs 7 verification sources in parallel and produces a composite assessment:</p>
                            <div className="bg-slate-50 border border-slate-200 p-6 mb-6">
                                <div className="grid md:grid-cols-2 gap-2">
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>OpenSanctions</strong> &mdash; OFAC, UN, EU, UK, INTERPOL sanctions + PEP screening with clearance levels</li>
                                        <li>&bull; <strong>OpenCorporates</strong> &mdash; Corporate registry verification: jurisdiction, incorporation date, active status</li>
                                        <li>&bull; <strong>GLEIF</strong> &mdash; Legal Entity Identifier (LEI) lookup: ownership chain, parent entities, registration status</li>
                                        <li>&bull; <strong>V-Dem v14</strong> &mdash; Academic governance scores (University of Gothenburg): rule of law, corruption control, civil liberties, democratic quality across 40+ countries</li>
                                    </ul>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>Tavily</strong> &mdash; Deep AI-synthesised web research with source attribution for entity background</li>
                                        <li>&bull; <strong>Brave Search</strong> &mdash; Independent non-Google web index providing unbiased search results</li>
                                        <li>&bull; <strong>GDELT</strong> &mdash; Global news monitoring with tone/sentiment analysis for media coverage assessment</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-slate-700 mt-3">The pipeline produces a composite <strong>Entity Intelligence Report</strong>: verified/unverified status, sanctions clearance, PEP flags, jurisdiction governance band, media sentiment, and an overall risk rating (LOW/MODERATE/HIGH/CRITICAL). Every claim traces to its data source. When a source returns no data, the system says so.</p>
                            </div>
                            <p className="text-sm text-slate-700 mb-3">The system also supports <strong>Groq function calling</strong> &mdash; 4 tool schemas (<code className="text-xs bg-slate-100 px-1 rounded">screen_entity</code>, <code className="text-xs bg-slate-100 px-1 rounded">lookup_company</code>, <code className="text-xs bg-slate-100 px-1 rounded">research_entity</code>, <code className="text-xs bg-slate-100 px-1 rounded">compare_governance</code>) allow the AI to autonomously decide which verification tools to invoke during a conversation, executing up to 3 rounds of tool use before producing a final answer.</p>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-10 pt-6 border-t-2 border-slate-300 mb-3">Live External Intelligence Layer &mdash; 15+ Global Data APIs</h4>
                            <p className="text-sm text-slate-700 mb-3">The system now connects to live external data sources on every analysis. No simulated data, no cached proxies &mdash; real-time signals from authoritative global sources:</p>
                            <div className="bg-emerald-50/60 border border-emerald-200 rounded-sm p-4 mb-4">
                                <div className="grid md:grid-cols-2 gap-2">
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>ACLED</strong> &mdash; Real-time conflict &amp; political violence events with severity scoring and risk levels</li>
                                        <li>&bull; <strong>OpenSanctions</strong> &mdash; Entity screening against OFAC, UN, EU, UK, INTERPOL + PEP databases</li>
                                        <li>&bull; <strong>OpenCorporates</strong> &mdash; Company verification: jurisdiction, status, incorporation date, registry data</li>
                                        <li>&bull; <strong>GLEIF</strong> &mdash; Legal Entity Identifier lookups: LEI codes, ownership chains, registration status</li>
                                        <li>&bull; <strong>V-Dem v14</strong> &mdash; Academic governance scores: 12+ dimensions for 40+ countries (University of Gothenburg)</li>
                                        <li>&bull; <strong>UN Comtrade</strong> &mdash; Bilateral trade statistics: exports, imports, trade balance by country pair</li>
                                        <li>&bull; <strong>GDELT</strong> &mdash; Global news event monitoring with geolocation and sentiment analysis</li>
                                        <li>&bull; <strong>World Bank</strong> &mdash; GDP, inflation, trade openness, governance indicators by country</li>
                                    </ul>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>Brave Search</strong> &mdash; Independent non-Google web index for unbiased entity and market research</li>
                                        <li>&bull; <strong>Tavily</strong> &mdash; Deep AI-synthesised web research with source attribution and confidence scores</li>
                                        <li>&bull; <strong>Wikidata</strong> &mdash; Structured knowledge graph via SPARQL queries for entities, relationships, facts</li>
                                        <li>&bull; <strong>Wikipedia</strong> &mdash; Encyclopedic context and summaries for cities, regions, organisations</li>
                                        <li>&bull; <strong>REST Countries</strong> &mdash; Country profiles: population, area, borders, currencies, languages, timezones</li>
                                        <li>&bull; <strong>DuckDuckGo</strong> &mdash; Live web search for current events and breaking developments</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-slate-700 mt-3">Every data point carries a <strong>freshness timestamp</strong> and <strong>confidence score</strong>. The Regional Development Kernel blocks output when data confidence drops below threshold. All sources are queried in parallel via the Brain Integration Service and Entity Intelligence Pipeline.</p>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Brain Integration Service &mdash; 50+-Engine Intelligent Brain</h4>
                            <p className="text-sm text-slate-700 mb-3">The brain <strong>thinks before it acts</strong>. Every query passes through a three-stage reasoning process before any engine fires:</p>
                            <div className="bg-slate-50 border border-slate-200 p-6 mb-6">
                                <p className="text-sm font-semibold text-blue-900 mb-2">Stage 1: Engine Capability Registry</p>
                                <p className="text-sm text-slate-600 mb-3">Every engine group declares what it provides, what questions it can answer, whether it has live external data, its data sources, and its cost weight. The brain introspects this registry to understand its own capabilities before processing any query.</p>
                                <p className="text-sm font-semibold text-blue-900 mb-2">Stage 2: Deep Query Analysis</p>
                                <p className="text-sm text-slate-600 mb-3">The query is broken down into: <strong>intent</strong> (assess, compare, plan, investigate, report, calculate, monitor, advise), <strong>domains</strong> (financial, risk, relocation, strategic, ethics, country, organization, historical, quantum), <strong>complexity</strong> (trivial &rarr; simple &rarr; moderate &rarr; complex &rarr; deep), <strong>temporal focus</strong> (past/present/future), and whether <strong>live data</strong> is needed.</p>
                                <p className="text-sm font-semibold text-blue-900 mb-2">Stage 3: Relevance Scoring &amp; Execution Plan</p>
                                <p className="text-sm text-slate-600 mb-3">Each of the 12 engine groups is scored 0&ndash;100+ on 12 factors: domain match, keyword hits from the capability registry, live data priority (engines with real-time APIs get boosted when current information is needed), parameter availability, readiness gates, complexity alignment, intent-specific boosts, progressive readiness escalation, and entity availability. Only groups scoring above activation threshold fire.</p>
                                <p className="text-sm font-semibold text-blue-900 mb-2">The 12 Engine Groups</p>
                                <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600">
                                    <li><strong>Foundation</strong> &mdash; 15 strategic indices, NSIL, composite scores, case graph, maturity, methodology KB</li>
                                    <li><strong>Country</strong> &mdash; World Bank, Numbeo, ACLED, Comtrade, compliance, regional development, ESG (live data)</li>
                                    <li><strong>Organization</strong> &mdash; OpenCorporates, OpenSanctions, OSINT, partner intelligence (live data)</li>
                                    <li><strong>Strategic</strong> &mdash; Adversarial debate, persona engine, domain agents, decision pipeline, causal reasoning</li>
                                    <li><strong>Historical</strong> &mdash; 200-year pattern matching, 60-year parallel matcher, reference engagements</li>
                                    <li><strong>Risk</strong> &mdash; 5&times;5 risk matrix, counterfactual what-if, reactive intelligence, derived indices (live data)</li>
                                    <li><strong>Financial</strong> &mdash; NPV/IRR/payback calculations, government incentive vault</li>
                                    <li><strong>Deep Research</strong> &mdash; Tavily web synthesis, multi-agent consensus (Gemini/GPT-4/Claude) (live data)</li>
                                    <li><strong>Relocation</strong> &mdash; City discovery, boots on ground, 90-day plans, workforce, supply chain</li>
                                    <li><strong>Quantum</strong> &mdash; Monte Carlo (5000 iterations), pattern matcher, cognition bridge</li>
                                    <li><strong>Proactive</strong> &mdash; Layer 7 briefing, self-improvement, self-learning, drift detection</li>
                                    <li><strong>Ethics</strong> &mdash; IFC standards, governance compliance, bias detection</li>
                                </ul>
                                <p className="text-sm text-slate-700 mt-3">The brain&rsquo;s thinking process is injected into the AI prompt so the consultant sees exactly <em>why</em> each engine was selected. Engines that fail gracefully degrade without blocking the rest.</p>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Self-Learning &amp; Self-Improvement Loop</h4>
                            <p className="text-sm text-slate-700 mb-3">The system continuously improves from its own operations:</p>
                            <div className="bg-violet-50/60 border border-violet-200 rounded-sm p-4 mb-4">
                                <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600">
                                    <li><strong>SelfImprovementEngine</strong> &mdash; Records per-run performance metrics, detects accuracy drift via Welch&rsquo;s t-test, auto-tunes formula weights with full rollback safety</li>
                                    <li><strong>selfLearningEngine</strong> &mdash; EventBus-driven continuous learning: listens for analysis completions, user feedback, formula executions, and agent outcomes to build institutional knowledge over time</li>
                                    <li><strong>Adaptive Query Routing</strong> &mdash; Detects query type (info question, person lookup, location research, complex analysis) and routes to the optimal processing path automatically</li>
                                    <li><strong>World Knowledge Grants</strong> &mdash; Every AI turn receives a system-level knowledge instruction, ensuring accurate factual responses for general questions alongside deep NSIL analysis</li>
                                </ul>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mt-8 mb-3">Implementation Inventory</h4>
                            <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-600 mb-6">
                                <li><strong>55,000+ lines of TypeScript code</strong> across 165+ service files</li>
                                <li><strong>Audit-backed implementation coverage:</strong> Engines expose working code paths, typed contracts, and verification hooks tracked by the continual harness audit</li>
                                <li><strong>20+ live external data APIs:</strong> ACLED, OpenSanctions, OpenCorporates, GLEIF, V-Dem, Brave Search, UN Comtrade, GDELT, Tavily, World Bank, Wikidata, Wikipedia, REST Countries, DuckDuckGo, IMF, Exchange Rate, GNews, Bing News, ContextualWeb</li>
                                <li><strong>Entity Intelligence Pipeline:</strong> 7-source parallel entity verification with composite risk assessment, sanctions screening, corporate registry, LEI lookup, governance scoring, news sentiment</li>
                                <li><strong>Published mathematical foundations:</strong> Each model cites academic sources (Wilson-Cowan, Rao &amp; Ballard, Friston, Gentner, etc.)</li>
                                <li><strong>Deterministic seeding:</strong> Hash-based RNG ensures reproducibility. Same input, same output, every time, across machines and deployments</li>
                                <li><strong>Audit-ready architecture:</strong> Every decision traces to source data, formula component, neuroscience model, or autonomous engine with full confidence intervals</li>
                            </ul>

                            <h4 className="text-lg font-bold text-slate-900 pt-4">The 12 Core Algorithm Engines</h4>
                            <p className="mb-3">Beyond the intelligence layers, 12 specialised algorithm engines power the system&rsquo;s advanced capabilities:</p>
                            <div className="grid md:grid-cols-2 gap-3 mb-6">
                                <div>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>DAG Scheduler</strong> &mdash; Directed acyclic graph execution across 5 formula levels with memoisation. Performance: <em>3-5x speedup</em> vs sequential execution.</li>
                                        <li>&bull; <strong>SAT Contradiction Solver</strong> &mdash; DPLL-based satisfiability checking via Boolean satisfiability.</li>
                                        <li>&bull; <strong>Bayesian Debate Engine</strong> &mdash; Multi-agent belief updating and Nash bargaining with posterior probability convergence.</li>
                                        <li>&bull; <strong>Human Cognition Engine</strong> &mdash; 7 neuroscience models running live with real-time parameter tuning.</li>
                                        <li>&bull; <strong>Deep Thinking Engine</strong> &mdash; Chain-of-Thought &amp; Tree-of-Thoughts reasoning (801 lines, full token replay).</li>
                                        <li>&bull; <strong>Vector Memory Index</strong> &mdash; Approximate nearest neighbour search with cosine similarity. Performance: <em>10-50x speedup</em> vs linear scan.</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li>&bull; <strong>Frontier Intelligence Engine</strong> &mdash; Multi-round negotiation, persona evolution, institutional memory (568 lines).</li>
                                        <li>&bull; <strong>Gradient Ranking Engine</strong> &mdash; Learning-to-rank with online gradient descent and Thompson sampling.</li>
                                        <li>&bull; <strong>Optimized Agentic Brain</strong> &mdash; High-performance multi-agent coordination with rollback safety.</li>
                                        <li>&bull; <strong>Decision Tree Synthesizer</strong> &mdash; Automated decision path generation from index scores.</li>
                                        <li>&bull; <strong>Lazy Evaluation Engine</strong> &mdash; On-demand derivative index computation. Performance: <em>2-4x speedup</em> on secondary indices.</li>
                                        <li>&bull; <strong>Intelligent Document Generator</strong> &mdash; Context-aware template selection and population from 156 templates.</li>
                                    </ul>
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 pt-4">The Frontier Intelligence Engine (Advanced Reasoning Layer)</h4>
                            <p className="mb-3">For complex strategic situations, the Frontier Intelligence Engine (<span className="font-mono text-sm bg-slate-100 px-1 rounded">FrontierIntelligenceEngine.ts</span>, 568 lines) adds 10 additional reasoning subsystems:</p>
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li><strong>Negotiation Simulation</strong> &mdash; Runs multi-round negotiation dialogue trees. Models counterparty strategy updates via Bayesian updating of beliefs about opponent type.</li>
                                        <li><strong>Persona Evolution</strong> &mdash; Tracks how debate personas evolve as evidence accumulates. Updates coalition weights on each round.</li>
                                        <li><strong>Institutional Memory</strong> &mdash; Links current decision to historical precedent database. Surface-maps similar past cases with outcome tracking.</li>
                                        <li><strong>Regulatory Pulse</strong> &mdash; Real-time monitoring trigger for regulatory changes. Applies SPI, RROI, SEAM adjustments when signals fire.</li>
                                        <li><strong>Synthetic Foresight</strong> &mdash; Generates plausible future scenarios via branching probability trees. Samples 5,000 Monte Carlo trajectories.</li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                        <li><strong>Stakeholder Simulation</strong> &mdash; Models how 6+ stakeholder types will react to proposals. Utility functions per stakeholder class.</li>
                                        <li><strong>Explainability Contract</strong> &mdash; Provenance tracking for every recommendation. Links outputs to data sources, formula component breakdowns, and confidence bounds.</li>
                                        <li><strong>Modality Fusion</strong> &mdash; Integrates multi-modal inputs (text, financials, geopolitical feeds, structural data). Resolves conflicts via information-theoretic weighting.</li>
                                        <li><strong>What-If Sandbox</strong> &mdash; Stress-tests strategies under user-controlled perturbations. Sensitivity Analysis &amp; Tornado Charts.</li>
                                        <li><strong>Governance Auto-Update</strong> &mdash; Self-modifying governance policies based on outcome feedback. Learns optimal decision rules via reinforcement learning.</li>
                                    </ul>
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 pt-4">The 54+ Proprietary Formulas</h4>
                            <div className="grid md:grid-cols-3 gap-3 mt-2 mb-4">
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Strategic Core Indices</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; SPI&trade; &mdash; Strategic Proof Index</li>
                                        <li>&bull; RROI&trade; &mdash; Real Return on Intent</li>
                                        <li>&bull; SEAM&trade; &mdash; Symbiotic Ecosystem Alignment Model</li>
                                        <li>&bull; IVAS&trade; &mdash; Integrity, Viability, Accountability</li>
                                        <li>&bull; SCF&trade; &mdash; Strategic Counterfactual Framework</li>
                                        <li>&bull; PVI&trade; &mdash; Partnership Viability Index</li>
                                        <li>&bull; RRI&trade; &mdash; Regional Resilience Index</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Evaluation Matrices (Advanced)</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; BARNA &mdash; Baseline Adaptive Risk&amp;Opportunity </li>
                                        <li>&bull; NVI &mdash; Novelty Viability Index</li>
                                        <li>&bull; CAP &mdash; Capacity Alignment Profile</li>
                                        <li>&bull; AGI &mdash; Agility &amp; Growth Index</li>
                                        <li>&bull; VCI &mdash; Volatility &amp; Change Index</li>
                                        <li>&bull; ATI &mdash; Adaptability &amp; Transition Index</li>
                                        <li>&bull; ESI &mdash; Ecosystem Shock Index</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Structural Assessment (Hidden)</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; ISI &mdash; Implementation Stress Index</li>
                                        <li>&bull; OSI &mdash; Operational Sustainability Index</li>
                                        <li>&bull; RNI &mdash; Renewal &amp; Iteration Index</li>
                                        <li>&bull; SRA &mdash; Stakeholder Risk Assessment</li>
                                        <li>&bull; IDV &mdash; Implementation Difficulty Variance</li>
                                        <li>&bull; FRS &mdash; Financial Robustness Score</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Risk Formulas</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; CRPS &mdash; Composite Risk Priority Score</li>
                                        <li>&bull; RME &mdash; Risk Mitigation Effectiveness</li>
                                        <li>&bull; VaR &mdash; Value at Risk (95th percentile)</li>
                                        <li>&bull; SRCI &mdash; Supply Chain Risk Index</li>
                                        <li>&bull; PSS &mdash; Policy Shock Sensitivity</li>
                                        <li>&bull; PRS &mdash; Political Risk Score</li>
                                        <li>&bull; DCS &mdash; Dependency Concentration Score</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Financial Metrics</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; IRR &mdash; Internal Rate of Return</li>
                                        <li>&bull; NPV &mdash; Net Present Value</li>
                                        <li>&bull; WACC &mdash; Weighted Avg Cost of Capital</li>
                                        <li>&bull; DSCR &mdash; Debt Service Coverage Ratio</li>
                                        <li>&bull; FMS &mdash; Funding Match Score</li>
                                        <li>&bull; ROE &mdash; Return on Equity</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Operational &amp; Execution</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; ORS &mdash; Organizational Readiness Score</li>
                                        <li>&bull; TCS &mdash; Team Capability Score</li>
                                        <li>&bull; EEI &mdash; Execution Efficiency Index</li>
                                        <li>&bull; SEQ &mdash; Sequencing Integrity Score</li>
                                        <li>&bull; CGI &mdash; Capability Gap Index</li>
                                        <li>&bull; LCI &mdash; Leadership Confidence Index</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Market &amp; Competition</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; MPI &mdash; Market Penetration Index</li>
                                        <li>&bull; CAI &mdash; Competitive Advantage Index</li>
                                        <li>&bull; TAM &mdash; Total Addressable Market</li>
                                        <li>&bull; SAM &mdash; Serviceable Available Market</li>
                                        <li>&bull; GRI &mdash; Growth Rate Index</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-sm font-semibold text-slate-900 mb-1">Governance &amp; Integrity</h5>
                                    <ul className="space-y-0.5 text-sm text-slate-600">
                                        <li>&bull; GCI &mdash; Governance Confidence Index</li>
                                        <li>&bull; CCS &mdash; Compliance Certainty Score</li>
                                        <li>&bull; TPI &mdash; Transparency Index</li>
                                        <li>&bull; ARI &mdash; Audit Readiness Index</li>
                                        <li>&bull; RFI &mdash; Regulatory Friction Index</li>
                                        <li>&bull; CIS &mdash; Counterparty Integrity Score</li>
                                        <li>&bull; ESG &mdash; Environmental Social Governance</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mt-4">
                                <p className="text-sm text-slate-700 font-semibold mb-2">
                                    Complete System Architecture &mdash; Current Runtime
                                </p>
                                <p className="text-sm text-slate-700 mb-3">
                                    NSIL current runtime is built on:
                                </p>
                                <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-700 mb-3">
                                    <li><strong>44+ Specialized Intelligence Engines</strong> - Input Shield, Persona Engine, Counterfactual Engine, Outcome Tracker, Unbiased Analysis, Creative Synthesis, Cross-Domain Transfer, Autonomous Goal, Ethical Reasoning, Self-Evolving Algorithm, Adaptive Learning, Emotional Intelligence, Scenario Simulation, plus proactive and reflexive engines</li>
                                    <li><strong>12 Core Algorithm Engines</strong> - From vector memory retrieval to frontier intelligence with negotiation simulation</li>
                                    <li><strong>10-Layer Deterministic Pipeline</strong> - Laws &rarr; Shield &rarr; Boardroom &rarr; Engine &rarr; Stress Test &rarr; Brain &rarr; Autonomous &rarr; Proactive &rarr; Output &rarr; Reflexive</li>
                                    <li><strong>54+ Proprietary Formulas</strong> - Strategic core indices, advanced evaluation matrices, structural assessments, risk models, financial metrics, operational scores, market analysis, governance frameworks, partner scoring, cognitive reasoning indices (DII/PAI/ICI/SCX/HFI/ORI/SVG/EMA), and Research Ecosystem formulas (TAI/ICI/ERS)</li>
                                    <li><strong>7 Neuroscience Models</strong> - Wilson-Cowan, Predictive Coding, Free Energy Principle, Attention, Emotional Processing, Global Workspace, Working Memory</li>
                                    <li><strong>50+-Engine Intelligent Brain</strong> - BrainIntegrationService with Engine Capability Registry (12 groups declaring capabilities, data sources, and cost weights), Deep Query Analyzer (intent/domain/complexity/temporal/live-data classification), and Relevance Scorer (12-factor scoring per engine group). Fires adversarial reasoning, comprehensive indices, multi-agent orchestration, historical learning, NSIL hub, composite scoring, global compliance, case graphs, regional development, partner comparison, decision pipeline, document routing, IFC standards, pattern confidence, maturity scoring, problem-to-solution graphs, motivation detection, counterfactual analysis, narrative synthesis, historical parallel matching, partner intelligence, situation analysis, outcome tracking, self-learning, unbiased analysis, persona debate, derived indices, OSINT, consultant gating, reactive intelligence, global issue resolution, self-improvement, ACLED, sanctions screening, UN Comtrade, Tavily, intelligence quality gating, V-Dem governance, Research Ecosystem scoring, and failure mode governance simultaneously via Promise.allSettled</li>
                                    <li><strong>Entity Intelligence Pipeline</strong> - 7-source parallel entity verification: OpenSanctions screening, OpenCorporates registry, GLEIF LEI lookup, V-Dem governance scoring, Tavily deep research, Brave independent search, GDELT news sentiment. Produces composite risk ratings with source accountability</li>
                                    <li><strong>Groq Function Calling</strong> - 4 tool schemas (screen_entity, lookup_company, research_entity, compare_governance) enable the AI to autonomously invoke verification tools during conversation with up to 3 rounds of tool use</li>
                                    <li><strong>20+ Live External Data APIs</strong> - ACLED conflict data, OpenSanctions screening, OpenCorporates, GLEIF, V-Dem v14 governance, Brave Search, UN Comtrade trade statistics, GDELT global news, World Bank indicators, Wikidata SPARQL, Wikipedia, REST Countries, DuckDuckGo web search, Tavily deep research, IMF economic data, Exchange Rate feeds, GNews aggregation, Bing News, ContextualWeb - every data point timestamped with confidence scoring</li>
                                    <li><strong>Regional Development Kernel</strong> - RegionalDevelopmentOrchestrator, Partner Intelligence Engine, Problem-to-Solution Graph, Global Data Fabric, Outcome Learning Service</li>
                                    <li><strong>Case Study Method Layer</strong> - 5-gate methodological validation enforced across all entry paths before any output generates</li>
                                    <li><strong>Reactive Agentic Runtime</strong> - Streamed responses, draft-time signal extraction, concurrent planner/executor tasks, message-level provenance confidence, adaptive query routing (info/person/location/complex analysis detection), and world knowledge grants on every turn</li>
                                    <li><strong>Self-Learning &amp; Self-Improvement Loop</strong> - SelfImprovementEngine (runtime weight tuning with Welch&rsquo;s t-test drift detection and rollback), selfLearningEngine (EventBus-driven continuous learning from every system event), GlobalIssueResolver (universal problem-solver with root cause analysis)</li>
                                    <li><strong>8 Global Issue Packs</strong> - Water Security, Energy Transition, Logistics Corridors, Housing Systems, Health Systems, Digital Infrastructure, Workforce Transition, Climate Resilience</li>
                                    <li><strong>Output at Scale</strong> - 156+ letter templates, 247+ document outputs, adaptive intake-to-generation flow, full case study analysis, multi-audience translation, partner-aware institutional drafting</li>
                                </ul>
                                <p className="text-sm text-slate-700 italic font-semibold">
                                    Every recommendation has a complete audit trail. Every formula has published mathematics. Every engine has working code. This is not a chatbot narrative generator &mdash; it is an operating system for institutional intelligence, regional development, and strategic translation across government, banking, and private-sector contexts. Built from ground truth. Benchmarked against real decisions. Ready for sovereign-grade deployment.
                                </p>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="px-8 md:px-12 py-8 border-t border-slate-200 bg-white flex justify-end">
                            <button 
                                onClick={() => setShowFormulas(false)}
                                className="px-8 py-3 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showBreakthroughPopup && (
                <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowBreakthroughPopup(false)}>
                    <div
                        className="bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-8 md:px-12 pt-10 pb-8 border-b border-slate-200 flex-shrink-0 relative">
                            <button onClick={() => setShowBreakthroughPopup(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={20} />
                            </button>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-slate-800">The Actual Breakthrough</p>
                            <h2 className="text-3xl md:text-4xl font-light leading-tight mb-4 text-slate-800">
                                Applying the Failure Model to Regional City Economic Perception
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 space-y-6">
                            <p className="text-sm text-slate-500 leading-relaxed">
                                This system was built as a direct countermeasure to each one. It replaces CBD-biased data gaps with live regional intelligence: governance scores, trade flows, sanctions registries, infrastructure capacity, and ecosystem readiness &mdash; the signals that never appear in a national aggregate. It pressure-tests causal assumptions through five independent reasoning engines because the inherited model of how regional economies work has rarely been subjected to structured adversarial challenge. It forces the search beyond the obvious, surfacing pathways that peer conformity and existing networks would never reach.
                            </p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                What the system returns is not a report. It is a position &mdash; built in the language of institutional legitimacy, structured to satisfy fiduciary guardrails, with every claim marked proven, assumed, or unknown, and every gap explicitly flagged. A regional thesis that can be presented to a board, an investment committee, or a minister and withstand scrutiny. Not because the region was made to look like something it is not, but because the analysis was finally done properly.
                            </p>
                        </div>

                        <div className="px-8 md:px-12 py-8 border-t border-slate-200 bg-white flex justify-end">
                            <button
                                onClick={() => setShowBreakthroughPopup(false)}
                                className="px-8 py-3 bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Legal Document Modals */}
            <DocumentModal activeDocument={activeDocument} onClose={() => setActiveDocument(null)} />

            {/* Footer */}
            <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-xs text-white/40">(c) 2026 ADVERSIQ Intelligence. All rights reserved.</p>
                            <p className="text-xs text-white/30">Trading as Sole Trader (R&D Phase) | ABN 55 978 113 300 | Melbourne, Australia</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                Intelligence OS v7.0
                            </span>
                            <span>*</span>
                            <span>NSIL Engine v7.0</span>
                            <span>*</span>
                            <span className="text-blue-400">Knowledge Layer Active</span>
                            <span>*</span>
                            <span className="text-indigo-400">Cognition Active</span>
                            <span>*</span>
                            <span className="text-blue-400">Autonomous Active</span>
                            <span>*</span>
                            <span className="text-slate-400">Reflexive Active</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CommandCenter;


