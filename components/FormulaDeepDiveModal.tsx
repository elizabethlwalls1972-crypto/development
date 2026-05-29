import React from 'react';
import { X, BookOpen } from 'lucide-react';

type FormulaDeepDiveModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const FormulaDeepDiveModal: React.FC<FormulaDeepDiveModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-900">Brayden Walls * BW Global Advisory - Full Technical Brief &amp; System Audit</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Hero summary + actions */}
                    <section className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
                        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Governed Reasoning</span>
                            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">21-Formula Suite</span>
                            <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Explainable & Traceable</span>
                            <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Live Documents</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">BWGA AI - Technical Proof &amp; Comparative Brief</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Prepared for funding partners, strategic partners, government, institutions, banks, enterprises. Prepared by BW Global Advisory (BWGA) - Founding Architect: Brayden Walls.</p>
                                <p className="text-slate-600 text-sm leading-relaxed">System: BWGA AI + NSIL (Nexus Strategic Intelligence Layer) with the Agentic Brain. Sovereign-grade, explainable, auditable, continuously learning; not a black box.</p>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href="/docs/NSIL_FORMULAS_FULL.md"
                                    className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Open Full Methodology &amp; 21 Formulas
                                </a>
                                <button
                                    disabled
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 bg-slate-50 cursor-not-allowed"
                                    title="PDF export coming via export pipeline"
                                >
                                    Download Brief (PDF soon)
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <p className="text-xs font-bold text-blue-900 mb-1">Claim</p>
                            <p className="text-sm text-blue-900">World-first governed reasoning platform treating mandates as living simulations.</p>
                        </div>
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                            <p className="text-xs font-bold text-emerald-900 mb-1">Outcome</p>
                            <p className="text-sm text-emerald-900">Adversarial debate a' counterfactuals a' explainable scores a' traceable recommendations a' live deliverables.</p>
                        </div>
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <p className="text-xs font-bold text-amber-900 mb-1">Why New</p>
                            <p className="text-sm text-amber-900">Agentic AI for judgment under explicit governance with auditable why-chains and 21-formula suite.</p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Category Definition</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">Governed Strategic Intelligence: computable intent, adversarial reasoning, counterfactual stress tests, explainable scoring, live documents, and full traceability.</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Novelty</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li><span className="font-semibold">Intent Computation:</span> Machine-legible mandates without losing richness.</li>
                                <li><span className="font-semibold">Governed Reasoning (NSIL):</span> Validate → Debate → Counterfactuals → Score → Synthesize → Deliver.</li>
                                <li><span className="font-semibold">Agentic Brain:</span> Owns the case, anticipates questions, surfaces contradictions, learns continuously.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Architecture Proofs</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Control-plane (governance/orchestration) separated from data-plane (inputs/exports).</li>
                                <li>Explainability contracts: definitions, drivers, pressure points, assumptions, citations.</li>
                                <li>Traceability: debate transcripts, contradiction flags, counterfactuals, rationales, provenance.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">21-Formula Suite</h4>
                            <p className="text-slate-600 text-sm mb-2">Primary engines: SPI(TM), RROI(TM), SEAM(TM), IVAS(TM), SCF(TM). Plus 16 indices for alignment, risk, viability, capacity, velocity, resilience.</p>
                            <p className="text-slate-600 text-sm">Purpose: expose fragility, leverage, and misalignment - not mere prediction.</p>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-800 mb-2">Proof by Collapse (Scenario)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                            <div className="space-y-1">
                                <p className="font-semibold text-slate-800">Legacy Fails</p>
                                <p>Consulting: static PDFs, slow recalculation.</p>
                                <p>BI Dashboards: visualization without governed reasoning.</p>
                                <p>LLM Copilots: unstructured, non-traceable.</p>
                                <p>Spreadsheets: brittle, non-reactive.</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-slate-800">Nexus Path</p>
                                <p>Governed debate → counterfactuals → explainable scores → live documents that update instantly.</p>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Governance &amp; Explainability</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Adversarial Shield (sanctions/compliance/ethics checks).</li>
                                <li>Multi-perspective debate (Skeptic, Advocate, Regulator, Accountant, Operator).</li>
                                <li>Counterfactual Lab with explicit deltas.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Document Factory (Live)</h4>
                            <p className="text-slate-600 text-sm">Change one variable; risks, scores, timelines, and instrument drafts recompute. A BW Consultant guides with evidence-linked outputs.</p>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-800 mb-3">Comparative Matrix</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-bold text-slate-800 mb-2">Legacy</p>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                    <li>Consulting: static, slow, no live governance.</li>
                                    <li>BI/Analytics: visuals without adversarial checks.</li>
                                    <li>LLM Copilots: non-traceable, no formula explainability.</li>
                                    <li>Spreadsheets: fragile under change.</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-bold text-slate-800 mb-2">BWGA AI</p>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                    <li>Governed reasoning (NSIL) + Agentic execution.</li>
                                    <li>Counterfactuals + 21-formula explainable scoring.</li>
                                    <li>Traceable why-chain and provenance.</li>
                                    <li>Live documents that recalc instantly.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Defensibility</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>IP boundary: governance protocols + formula suite + orchestration primitives.</li>
                                <li>Audit posture: provenance, explainability contracts; advisory outputs need professional validation.</li>
                                <li>Falsifiability: if contradictions aren't caught, scores aren't explainable, or docs aren't live, the claim fails.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Limits &amp; Posture</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Decision-support; users retain accountability.</li>
                                <li>Live connectors recommended for institutional deployment.</li>
                                <li>Human oversight for binding commitments.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-800 mb-2">Deployment &amp; Readiness</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                            <li>Modular architecture ready for auth, tenancy, immutable logs.</li>
                            <li>Deterministic payload assembly; simulation harness for repeatability.</li>
                            <li>Roadmap: score calibration and narrative evaluation.</li>
                            <li>Health endpoint /api/health; suggested SLOs 99.5%+ uptime, P95 &lt; 300ms non-AI.</li>
                            <li>Environments: npm run dev/dev:server/dev:all; build/start; local offline servers.</li>
                        </ul>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Testing &amp; Quality</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Simulation harness for payload completeness and runtime capture.</li>
                                <li>Recommended: unit tests for scoring, regression tests for schema, snapshot tests for templates, security red-team tests.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Risks &amp; Priorities</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Priority 1: authn/authz, replace file storage with DB + tenancy, immutable audit logging.</li>
                                <li>Priority 2: formalize scoring documentation and evaluation harnesses.</li>
                                <li>Priority 3: connector framework with caching and provenance.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Target Users</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>Government &amp; Policy: national/regional strategy.</li>
                                <li>Companies: SME to multinational.</li>
                                <li>Banks &amp; DFIs: explainable confidence and compliance.</li>
                                <li>Regional Agencies &amp; NGOs: equitable, region-first growth.</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                            <h4 className="text-sm font-bold text-slate-800 mb-2">Partnership &amp; Integration</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                <li>White-label regional deployments.</li>
                                <li>Data partnerships with governments/institutions.</li>
                                <li>Workflow partnerships (consultancies, accelerators, banks).</li>
                                <li>Institutional integrations (banks, funds, DFIs) consuming scoring outputs.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-4">
                        <h4 className="text-sm font-bold text-slate-800 mb-2">Appendices &amp; Addendum</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                            <ul className="list-disc list-inside space-y-1">
                                <li>Appendix A - Backend API Catalog</li>
                                <li>Appendix B - Environment Variables</li>
                                <li>Appendix C - Evidence Sources</li>
                                <li>Appendix D - Terminology</li>
                                <li>A1) System Inventory</li>
                                <li>A2) API Surface</li>
                                <li>A3) Report Lifecycle</li>
                                <li>A4) Security &amp; Privacy Narrative</li>
                                <li>A5) Compliance &amp; Auditability</li>
                            </ul>
                            <ul className="list-disc list-inside space-y-1">
                                <li>A6) Enterprise Hardening Blueprint</li>
                                <li>A7) Partner Value Proposition</li>
                                <li>A8) Suggested 20-page PDF Layout</li>
                                <li>A9) Engine Specs (SPI, RROI, SEAM, IVAS, SCF)</li>
                                <li>A10) Data Provenance &amp; Evidence Design</li>
                                <li>A11) Document Generation Pipeline</li>
                                <li>A12) Performance &amp; Scalability</li>
                                <li>A13) Audit Checklist</li>
                                <li>A14) Partnership Packaging</li>
                            </ul>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <a href="/BW_NEXUS_AI_FULL_TECHNICAL_BRIEF_AND_AUDIT.md" className="text-blue-700 text-sm font-semibold hover:underline">Open Full Technical Brief</a>
                            <span className="text-slate-500 text-sm">|</span>
                            <a href="/docs/NSIL_FORMULAS_FULL.md" className="text-blue-700 text-sm font-semibold hover:underline">See NSIL Formula Suite</a>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormulaDeepDiveModal;

