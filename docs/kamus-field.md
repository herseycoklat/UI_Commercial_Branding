# Kamus field workbook app

*Dibuat otomatis oleh `tools/kamus_field.py` dari `sessions/*.js` dan `tools/field-ids.lock.json`. Jangan diedit tangan.*

Lokasi data di file JSON mahasiswa (`cb-student/1`): `sessions.<Sesi>.current[<ID>]`. Versi yang di-Submit: `sessions.<Sesi>.versions[n].fields[<ID>]`. Leadership Log: `leadership_log.entries` (bukan field sesi).

Kolom **Peran**: `HAL INTI` = dihitung di cek kelengkapan dan dibaca penilai mingguan; `opsional` = boleh dilewati. Kolom **Kunci**: `ya` = ID sudah dirilis, tidak boleh dihapus, diganti nama, atau diganti tipe.

## S1 · Commercial Brand Audit

Hal inti: 1. Main problem (hlm. 7 (atas))

Terkunci: ya, 32 ID

| Hlm | ID | Label | Tipe | Peran | Kunci |
|---|---|---|---|---|---|
| 2 | `s1.p2.b1_product_truth` | 1 · PRODUCT TRUTH | longtext | opsional | ya |
| 2 | `s1.p2.b2_current_audience` | 2 · CURRENT AUDIENCE | longtext | opsional | ya |
| 2 | `s1.p2.b3_identity_assets` | 3 · IDENTITY ASSETS | longtext | opsional | ya |
| 2 | `s1.p2.b4_current_perception` | 4 · CURRENT PERCEPTION | longtext | opsional | ya |
| 2 | `s1.p2.b5_touchpoints_today` | 5 · TOUCHPOINTS TODAY | longtext | opsional | ya |
| 2 | `s1.p2.b6_competitors_benchmarks` | 6 · COMPETITORS & BENCHMARKS | longtext | opsional | ya |
| 2 | `s1.p2.b7_evidence_on_hand` | 7 · EVIDENCE ON HAND | longtext | opsional | ya |
| 2 | `s1.p2.b8_gaps` | 8 · GAPS & RISKS | longtext | opsional | ya |
| 3 | `s1.p3.b1_core_product` | 1 · CORE PRODUCT | longtext | opsional | ya |
| 3 | `s1.p3.b2_user_experience` | 2 · USER EXPERIENCE | longtext | opsional | ya |
| 3 | `s1.p3.b3_emotional_benefit` | 3 · EMOTIONAL BENEFIT | longtext | opsional | ya |
| 3 | `s1.p3.b4_social_benefit` | 4 · SOCIAL BENEFIT | longtext | opsional | ya |
| 3 | `s1.p3.b5_commercial_objective` | 5 · COMMERCIAL OBJECTIVE | longtext | opsional | ya |
| 3 | `s1.p3.b6_brand_meaning` | 6 · BRAND MEANING | longtext | opsional | ya |
| 4 | `s1.p4.internal_high` | INTERNAL · HIGH POWER | longtext | opsional | ya |
| 4 | `s1.p4.external_high` | EXTERNAL · HIGH POWER | longtext | opsional | ya |
| 4 | `s1.p4.internal_low` | INTERNAL · LOW POWER | longtext | opsional | ya |
| 4 | `s1.p4.external_low` | EXTERNAL · LOW POWER | longtext | opsional | ya |
| 5 | `s1.p5.touchpoints` | Brand Touchpoint Inventory | table | opsional | ya |
| 6 | `s1.p6.audience_clarity` | Audience clarity | score | opsional | ya |
| 6 | `s1.p6.differentiation` | Differentiation | score | opsional | ya |
| 6 | `s1.p6.identity_consistency` | Identity consistency | score | opsional | ya |
| 6 | `s1.p6.commercial_viability` | Commercial viability | score | opsional | ya |
| 6 | `s1.p6.distribution_readiness` | Distribution readiness | score | opsional | ya |
| 6 | `s1.p6.evidence_quality` | Evidence quality | score | opsional | ya |
| 7 | `s1.p7.problem1` | PROBLEM 1 | trace | HAL INTI | ya |
| 7 | `s1.p7.problem2` | PROBLEM 2 | trace | opsional | ya |
| 7 | `s1.p7.problem3` | PROBLEM 3 | trace | opsional | ya |
| 7 | `s1.p7.req_designer` | From our DESIGNER / ARTIST | longtext | opsional | ya |
| 7 | `s1.p7.req_engineer` | From our ENGINEER / TECHNICAL | longtext | opsional | ya |
| 7 | `s1.p7.req_content` | From our CONTENT / PRODUCTION | longtext | opsional | ya |
| 8 | `s1.p8.log` | Decision Log | list | opsional | ya |

## S2 · Audience & Market Evidence Pack

Hal inti: 2. Primary audience (hlm. 4); 3. Insight (hlm. 5); 4. Competitors (hlm. 6)

Terkunci: ya, 34 ID

| Hlm | ID | Label | Tipe | Peran | Kunci |
|---|---|---|---|---|---|
| 2 | `s2.p2.fact` | FACT | list | opsional | ya |
| 2 | `s2.p2.interpretation` | INTERPRETATION | list | opsional | ya |
| 2 | `s2.p2.guess` | GUESS | list | opsional | ya |
| 3 | `s2.p3.category` | FIRST, NAME THE CATEGORY YOU ARE COMPETING IN | parts | opsional | ya |
| 3 | `s2.p3.segments` | Segmentation Matrix | segments | opsional | ya |
| 4 | `s2.p4.scores` | Audience Priority Score | segscore | opsional | ya |
| 4 | `s2.p4.primary` | PRIMARY AUDIENCE (highest total): | longtext | HAL INTI | ya |
| 4 | `s2.p4.secondary` | SECONDARY AUDIENCE (runner-up, to activate later): | longtext | opsional | ya |
| 5 | `s2.p5.jobs` | CUSTOMER · JOBS | longtext | HAL INTI | ya |
| 5 | `s2.p5.pains` | CUSTOMER · PAINS | longtext | HAL INTI | ya |
| 5 | `s2.p5.gains` | CUSTOMER · GAINS | longtext | HAL INTI | ya |
| 5 | `s2.p5.products_services` | PRODUCT · PRODUCTS & SERVICES | longtext | HAL INTI | ya |
| 5 | `s2.p5.pain_relievers` | PRODUCT · PAIN RELIEVERS | longtext | HAL INTI | ya |
| 5 | `s2.p5.gain_creators` | PRODUCT · GAIN CREATORS | longtext | HAL INTI | ya |
| 5 | `s2.p5.insight` | INSIGHT SENTENCE | parts | HAL INTI | ya |
| 5 | `s2.p5.but_source` | BUT comes from a pain someone SAID to us  /  BUT is our assumption (ci | enum | HAL INTI | ya |
| 6 | `s2.p6.matrix` | Competitor Benchmark Matrix | table | HAL INTI | ya |
| 7 | `s2.p7.axes` | Perceptual (Positioning) Map | parts | opsional | ya |
| 7 | `s2.p7.points` | Perceptual (Positioning) Map | map2d | opsional | ya |
| 7 | `s2.p7.quadrant_notes` | QUADRANT NOTES | longtext | opsional | ya |
| 8 | `s2.p8.test_first` | HIGH IMPORTANCE · LOW CERTAINTY | longtext | opsional | ya |
| 8 | `s2.p8.monitor` | HIGH IMPORTANCE · HIGH CERTAINTY | longtext | opsional | ya |
| 8 | `s2.p8.test_later` | LOW IMPORTANCE · LOW CERTAINTY | longtext | opsional | ya |
| 8 | `s2.p8.ignore` | LOW IMPORTANCE · HIGH CERTAINTY | longtext | opsional | ya |
| 9 | `s2.p9.q1_warmup` | 1 · Warm-up about THEM | text | opsional | ya |
| 9 | `s2.p9.q2_past` | 2 · Past behaviour | text | opsional | ya |
| 9 | `s2.p9.q3_pain` | 3 · The pain | text | opsional | ya |
| 9 | `s2.p9.q4_workaround` | 4 · The workaround | text | opsional | ya |
| 9 | `s2.p9.q5_decision` | 5 · The decision | text | opsional | ya |
| 9 | `s2.p9.q6_close` | 6 · The open close | text | opsional | ya |
| 9 | `s2.p9.q_extra` | Pertanyaan 7–8 (opsional) | list | opsional | ya |
| 9 | `s2.p9.riskiest_assumption` | OUR RISKIEST ASSUMPTION (from page 8) | copytext | opsional | ya |
| 9 | `s2.p9.validation_method` | VALIDATION METHOD | longtext | opsional | ya |
| 9 | `s2.p9.interviews` | Interview notes | list | opsional | ya |

## S3 · Brand Strategy Platform

Hal inti: 5. Positioning (hlm. 2); 6. Promise → Proof (hlm. 5 (bagian bawah))

Terkunci: ya, 28 ID

| Hlm | ID | Label | Tipe | Peran | Kunci |
|---|---|---|---|---|---|
| 2 | `s3.p2.draft` | Brand Positioning Statement | parts | HAL INTI | ya |
| 2 | `s3.p2.sources` | JEJAK SUMBER TIAP BLANK (tambahan app) | sources | HAL INTI | ya |
| 2 | `s3.p2.final` | OUR STATEMENT (YOUR VERSION → SYNCED) | longtext | HAL INTI | ya |
| 2 | `s3.p2.test` | THE TEST | longtext | HAL INTI | ya |
| 3 | `s3.p3.parity` | WHAT WE MUST MATCH (parity) | longtext | opsional | ya |
| 3 | `s3.p3.difference` | WHERE WE WIN (difference) | longtext | opsional | ya |
| 4 | `s3.p4.purpose` | PURPOSE | longtext | opsional | ya |
| 4 | `s3.p4.vision` | VISION | longtext | opsional | ya |
| 4 | `s3.p4.mission` | MISSION | longtext | opsional | ya |
| 4 | `s3.p4.values` | VALUES | longtext | opsional | ya |
| 4 | `s3.p4.essence` | ESSENCE | longtext | opsional | ya |
| 4 | `s3.p4.promise` | PROMISE | longtext | opsional | ya |
| 4 | `s3.p4.personality` | PERSONALITY | longtext | opsional | ya |
| 4 | `s3.p4.rtb` | REASONS TO BELIEVE | longtext | opsional | ya |
| 5 | `s3.p5.sliders` | Brand Personality Spectrum & Promise–Proof Matrix | sliders | opsional | ya |
| 5 | `s3.p5.why_placed` | WHY WE PLACED IT THERE | lines | opsional | ya |
| 5 | `s3.p5.promise_proof` | PROMISE → PROOF | list | HAL INTI | ya |
| 6 | `s3.p6.roof` | MASTER MESSAGE (the roof) | longtext | opsional | ya |
| 6 | `s3.p6.pillar1` | PILLAR 1 | longtext | opsional | ya |
| 6 | `s3.p6.pillar2` | PILLAR 2 | longtext | opsional | ya |
| 6 | `s3.p6.pillar3` | PILLAR 3 | longtext | opsional | ya |
| 6 | `s3.p6.proof1` | PROOF POINT | longtext | opsional | ya |
| 6 | `s3.p6.proof2` | PROOF POINT | longtext | opsional | ya |
| 6 | `s3.p6.proof3` | PROOF POINT | longtext | opsional | ya |
| 6 | `s3.p6.cta` | CALL TO ACTION (the door) | longtext | opsional | ya |
| 6 | `s3.p6.origins` | ASAL DAN BUKTI TIAP PILAR (tambahan app) | origins | opsional | ya |
| 7 | `s3.p7.reviews` | FORM PENILAI (diisi oleh penilai, bukan pemilik file) | reviews | opsional | ya |
| 7 | `s3.p7.plans` | RINGKASAN DAN RENCANA (dihitung otomatis) | plans | opsional | ya |

## S4 · Cross-Stream Brand Identity and Experience Brief

Hal inti: 7. Touchpoints (hlm. 8); 8. Brand codes (hlm. 6); 9. Brief (hlm. 5)

Terkunci: ya, 39 ID

| Hlm | ID | Label | Tipe | Peran | Kunci |
|---|---|---|---|---|---|
| 2 | `s4.p2.parent` | PARENT / STUDIO NAME | longtext | opsional | ya |
| 2 | `s4.p2.product` | PRODUCT / TITLE | longtext | opsional | ya |
| 2 | `s4.p2.subnames` | SUB-NAMES, EXTENSIONS, EVENTS | longtext | opsional | ya |
| 2 | `s4.p2.model` | OUR MODEL | enum | opsional | ya |
| 2 | `s4.p2.model_why` | Brand Architecture Map | parts | opsional | ya |
| 2 | `s4.p2.flows` | WHAT FLOWS IN, WHAT COULD FLOW OUT | parts | opsional | ya |
| 3 | `s4.p3.meaningful` | MEANINGFUL | score | opsional | ya |
| 3 | `s4.p3.distinctive` | DISTINCTIVE & FINDABLE | score | opsional | ya |
| 3 | `s4.p3.pronounceable` | PRONOUNCEABLE | score | opsional | ya |
| 3 | `s4.p3.protectable` | PROTECTABLE | score | opsional | ya |
| 3 | `s4.p3.growth` | ROOM TO GROW | score | opsional | ya |
| 3 | `s4.p3.mitigation` | MITIGATION FOR EVERY SCORE OF 1–2 | longtext | opsional | ya |
| 4 | `s4.p4.djki` | DJKI DATABASE | status | opsional | ya |
| 4 | `s4.p4.web` | GOOGLE & WEB | status | opsional | ya |
| 4 | `s4.p4.appstores` | APP STORES | status | opsional | ya |
| 4 | `s4.p4.handles` | SOCIAL HANDLES & DOMAIN | status | opsional | ya |
| 4 | `s4.p4.languages` | MEANING IN OTHER LANGUAGES | status | opsional | ya |
| 4 | `s4.p4.actions` | WHAT WE WILL DO ABOUT IT | list | opsional | ya |
| 5 | `s4.p5.objective` | OBJECTIVE | longtext | HAL INTI | ya |
| 5 | `s4.p5.audience` | AUDIENCE | longtext | HAL INTI | ya |
| 5 | `s4.p5.positioning` | POSITIONING TO EXPRESS | copytext | HAL INTI | ya |
| 5 | `s4.p5.tone` | PERSONALITY & TONE OF VOICE | longtext | HAL INTI | ya |
| 5 | `s4.p5.mandatory` | MANDATORY ELEMENTS | longtext | HAL INTI | ya |
| 5 | `s4.p5.prohibited` | PROHIBITED ELEMENTS | longtext | HAL INTI | ya |
| 5 | `s4.p5.accessibility` | ACCESSIBILITY REQUIREMENTS | longtext | HAL INTI | ya |
| 5 | `s4.p5.rejected` | A LINE WE REJECTED → REWROTE | parts | HAL INTI | ya |
| 6 | `s4.p6.have` | CODES WE ALREADY HAVE | longtext | HAL INTI | ya |
| 6 | `s4.p6.need` | CODES WE STILL NEED | longtext | HAL INTI | ya |
| 6 | `s4.p6.owners` | OWNER OF EACH CODE | longtext | HAL INTI | ya |
| 6 | `s4.p6.nologo` | THE NO-LOGO TEST | longtext | HAL INTI | ya |
| 7 | `s4.p7.visual` | VISUAL | status | opsional | ya |
| 7 | `s4.p7.verbal` | VERBAL | status | opsional | ya |
| 7 | `s4.p7.sonic` | SONIC | status | opsional | ya |
| 7 | `s4.p7.motion` | MOTION | status | opsional | ya |
| 7 | `s4.p7.spatial` | SPATIAL | status | opsional | ya |
| 7 | `s4.p7.interactive` | INTERACTIVE / BEHAVIOURAL | status | opsional | ya |
| 8 | `s4.p8.matrix` | Touchpoint Consistency Matrix | table | HAL INTI | ya |
| 9 | `s4.p9.criteria` | Creative Approval Checklist — Gate 3 Check | list | opsional | ya |
| 9 | `s4.p9.creative_question` | QUESTION FROM YOUR CREATIVE STREAM | creativeq | opsional | ya |

## S5 · Commercialization Blueprint

Hal inti: 10. Business Model Canvas (hlm. 2); 11. Pricing + survival line (hlm. 4); 12. Your three bets (hlm. 8)

Terkunci: BELUM

| Hlm | ID | Label | Tipe | Peran | Kunci |
|---|---|---|---|---|---|
| 2 | `s5.p2.kp` | KEY PARTNERS | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.ka` | KEY ACTIVITIES | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.kr` | KEY RESOURCES | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.vp` | VALUE PROPOSITIONS · S3 | shown | HAL INTI | TIDAK |
| 2 | `s5.p2.cr` | CUSTOMER RELATIONSHIPS | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.ch` | CHANNELS | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.cs` | CUSTOMER SEGMENTS · S2 | shown | HAL INTI | TIDAK |
| 2 | `s5.p2.cost` | COST STRUCTURE · MARK WHAT GROWS | list | HAL INTI | TIDAK |
| 2 | `s5.p2.rev` | REVENUE STREAMS · MARK ONE PRIMARY | list | HAL INTI | TIDAK |
| 2 | `s5.p2.rev_unsure` | Belum bisa memilih PRIMARY? (tambahan app) | longtext | HAL INTI | TIDAK |
| 2 | `s5.p2.clash` | ONE CLASH IN OUR CANVAS, AND WHAT WE WILL DO | parts | HAL INTI | TIDAK |
| 2 | `s5.p2.sentence` | OUR CANVAS AS ONE SENTENCE | longtext | HAL INTI | TIDAK |
| 3 | `s5.p3.a` | OPTION A | parts | opsional | TIDAK |
| 3 | `s5.p3.b` | OPTION B | parts | opsional | TIDAK |
| 3 | `s5.p3.primary` | OUR PRIMARY MODEL | longtext | opsional | TIDAK |
| 4 | `s5.p4.rows` | WHAT IS PRICED · THE FIGURE · REFERENCE PRICE · VOLUME ASSUMED · ORIGI | list | HAL INTI | TIDAK |
| 4 | `s5.p4.line` | OUR PRICE AGAINST THE REFERENCE: ABOVE / AT / BELOW, BECAUSE… | status | HAL INTI | TIDAK |
| 4 | `s5.p4.survival` | THE SURVIVAL LINE · ONE CUSTOMER, ONE RECEIPT | status | HAL INTI | TIDAK |
| 5 | `s5.p5.partners` | PARTNER · WHAT THEY GIVE · WHAT THEY GET · STATUS | list | opsional | TIDAK |
| 5 | `s5.p5.next` | AT LEAST ONE ROW CONTACTED OR IDENTIFIED | longtext | opsional | TIDAK |
| 6 | `s5.p6.channels` | CHANNEL · REACH · COST · CONTROL | list | opsional | TIDAK |
| 6 | `s5.p6.finding` | AT LEAST ONE HIGH-CONTROL CHANNEL; IF YOU HAVE NONE, THAT IS A FINDING | longtext | opsional | TIDAK |
| 7 | `s5.p7.assets` | ASSET · CREATOR · OWNER · LICENCE STATUS · RISK | list | opsional | TIDAK |
| 7 | `s5.p7.money` | WHICH LINE OF MONEY DEPENDS ON OWNING SOMETHING YOU DON'T YET OWN? | longtext | opsional | TIDAK |
| 8 | `s5.p8.bets` | ROW · KIND · WE BET THAT… IF WE'RE WRONG… · HOW WE TEST OR CHECK IT ·  | list | HAL INTI | TIDAK |
| 9 | `s5.p9.m1` | MILESTONE 1 · months 0 to ___ | parts | opsional | TIDAK |
| 9 | `s5.p9.m2` | MILESTONE 2 · months ___ to ___ | parts | opsional | TIDAK |
| 9 | `s5.p9.m3` | MILESTONE 3 · months ___ to 12 | parts | opsional | TIDAK |

