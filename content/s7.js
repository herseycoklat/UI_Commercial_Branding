/* content/s7.js — teks Sesi 7: teori, kenapa penting, contoh empat kasus, contoh Concept Card sembilan baris. Dibangun 26 Nov 2026.
 * Satu sumber (konvensi 46, butir 114):
 *  - Teori per halaman = teks slide R deck S7-Testing_the_Card_v3.14.pptx, kata per kata, dibangkitkan dari pptx
 *    (hlm. 2 = slide 7 · hlm. 4 = slide 8 · hlm. 5 = slide 9 · hlm. 3 = slide 11 · hlm. 6 = slide 12 · hlm. 7 = slide 13 ·
 *    hlm. 8 = slide 14 · hlm. 9 = slide 15 + contoh slide 16). Satu perubahan: slide 15 "On Thu 10 Dec you get 3 questions"
 *    → "With feedback 2 you get 3 questions" (tool tanpa tanggal kursus, konvensi 41).
 *    Contoh Old Spice/Peloton (slide 7–9) dan satu kasus per halaman opsional (slide 11–14) ikut di teori, persis slide.
 *  - Contoh empat kasus (panel contoh) = worked example S7 v3.4 (Jumbo, GoFood, Marvel, LEGO Technic), dibangkitkan dari pptx:
 *    hlm. 2, 4, 5, 9 + kartu sembilan baris (slide 10) + Check Before You Submit (slide 11). Halaman opsional di WE sengaja
 *    kosong, jadi contohnya hanya di teori (dari deck). Tanggal kasus 2027 diizinkan (caseDates); tanpa kata Gate.
 *  - "Kenapa halaman ini penting" = pelajaran skrip kelas S7 v1.7 (Old Spice, Peloton, slide 5) + rantai S1–S7.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var D = {
"theory": {
"2": {
"html": "<p><b>What this page answers:</b> how you will find out whether your card and its bet are true, with the number written before you look.</p><p class='thh'><b>HOW · TWO SHOWN, THREE YOU WRITE, ONE OPTIONAL</b></p><ul><li>SHOWN, NOT TYPED. THE BET WE TEST and its CATEGORY: row 1 of your three bets, Session 5, page 8. FOR WHOM: from your card. To change them, change them there. Your other two bets wait for a later test.</li></ul><ol><li>WHO WE ASK. People who match FOR WHOM, and how many. Not your team, not your friends.</li><li>WHAT WE ASK THEM TO DO. One action on the DO or PAY rung. Usually your WHAT WE ASK YOU TO DO row. If that action cannot prove the bet wrong, choose one that can and write the gap in this box. If you then change the card, log it on page 4: your own reasoning is WEAK evidence.</li><li>OUR PREDICTION. &quot;___ of ___ will ___.&quot; Written before the test, never after.</li></ol><ul><li>RESULT (optional). &quot;Not tested yet&quot; is a valid answer. A class result is labelled practice.</li><li>Row 9 of your card (the bet) is for the team: hide it from the person you test.</li></ul><p class='thh'><b>ONE LADDER: SAY · DO · PAY</b></p><ul><li>SAY — what people tell you: &quot;I&#x27;d buy it&quot;, a like, a comment.</li><li>DO — a small step that is easy to undo: a click, a sign-up, coming to a free event, a refundable deposit.</li><li>PAY — giving something they would lose if they back out: money, time they booked, a phone number to be contacted, a recommendation to a friend.</li><li>What people do tells you more than what they say. The closer a test gets to a real purchase, the stronger the evidence.</li></ul><p class='thh'><b>WHY THE NUMBER COMES FIRST</b></p><ul><li>A prediction written after the result is a confirmation, not a test. Without a number, any result can be read as success.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>Asking people whether they like it. That is SAY, and it tells you they are polite. Ask them to do something.</li><li>Asking classmates and calling it evidence. A class test is practice: your classmates are not your FOR WHOM.</li></ul><p class='thex'><b>EXAMPLE · OLD SPICE, 2010 · CLASS RECONSTRUCTION + REPORTED RESULTS</b> · page 2, box by box. Sand = shown from your pages.</p><div class='tscroll'><table class='wbtable ro ex'><thead><tr><th>BOX</th><th>EXAMPLE</th></tr></thead><tbody><tr><th>THE BET WE TEST · CATEGORY</th><td>Women who buy their partner&#x27;s body wash will switch to Old Spice because the ad speaks to them. Desirability.</td></tr><tr><th>WHO WE ASK</th><td>Women who buy body wash for the man in their life. Not the men who use it.</td></tr><tr><th>WHAT WE ASK THEM TO DO</th><td>Buy Old Spice body wash on the next shopping trip (PAY). Views and likes are only SAY: they cannot prove this bet wrong.</td></tr><tr><th>OUR PREDICTION</th><td>Sales up 15%: the agency&#x27;s goal, set before launch. Class version: your L2 vote.</td></tr><tr><th>RESULT (OPTIONAL)</th><td>Body-wash sales up 107% in the last month (reported by the campaign). Your L3 vote: practice.</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 Key Topics and §7; Bland & Osterwalder (2019); Session 6 deck, slide 12 (SAY/DO/PAY). Old Spice: bet, who and action are our class reconstruction; 15% goal: Wieden+Kennedy case page (wk.com); sales: as on slide 3 (Tuten & Solomon, SAGE; reported, not independently verified). Jumbo example: your worked-example file, page 2."
},
"4": {
"html": "<p><b>What this page answers:</b> what you changed because of evidence, and how strong that evidence is.</p><p class='thh'><b>HOW · ONE ROW PER CHANGE</b></p><ul><li>BEFORE — the old line, and the page it lives on.</li><li>AFTER — the new line.</li><li>EVIDENCE — what made you change it. It can come from your card&#x27;s class test (if your card was tested), your weekly feedback, a pattern you saw on other teams&#x27; cards, or your own test. A fix from the chain check on page 9, or your own reasoning, is always WEAK.</li><li>STRONG / WEAK — required on every row.</li><li>No evidence, no row. &quot;We like it better&quot; is a preference, not evidence.</li></ul><p class='thh'><b>STRONG FINDING OR WEAK SIGNAL</b></p><ul><li>Strong finding: people did or paid something, they are outside your team, and the pattern showed up more than once.</li><li>Weak signal: only words, one source, friends, or a class practice test.</li><li>A weak signal is not thrown away. It is enough to fix a line on your card. It is not enough to change your strategy: it is the reason for your next test.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>A row with no evidence, or a preference called evidence.</li><li>Changing the positioning because of one comment.</li><li>Zero rows: nothing was tested, or nothing was heard.</li></ul><p class='thh'><b>CHANGE ONLY WHAT THE EVIDENCE SUPPORTS</b></p><ul><li>A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK.</li><li>A big change (audience, positioning, price) needs a strong finding.</li><li>When one finding is strong, change the one thing it supports, not everything around it.</li><li>No strong finding for a big change? Write it in WHAT WE COULDN&#x27;T FIX YET (page 9).</li></ul><p class='thex'><b>EXAMPLE · OLD SPICE 2010 + PELOTON 2019 · CLASS RECONSTRUCTION</b> · a big change from a strong finding, a small fix from a weak signal, and a row that is not allowed.</p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>LINE</th><th>BEFORE</th><th>AFTER</th><th>EVIDENCE</th><th>STRONG / WEAK</th></tr></thead><tbody><tr><th>Old Spice · WHERE (Session 6)</th><td>TV and online spots</td><td>Same message, same audience; add real-time reply videos online (July 2010)</td><td>Body-wash sales up 107% in the last month (reported by the campaign): people paid, outside the team. Why they added the replies: our reading.</td><td>STRONG</td></tr><tr><th>Peloton · card, PRICE row</th><td>$2,245 for the bike</td><td>$2,245, with a 30-day home trial</td><td>The worry in today&#x27;s L6 vote (e.g. &quot;too much to risk on a gift&quot;): classmates, words only</td><td>WEAK</td></tr><tr><th>Peloton · card, MAIN MESSAGE</th><td>Give a gift that changes their year</td><td>✗ &quot;A gift for yourself&quot;</td><td>Online backlash; shares fell 9% in a day: SAY, maybe not FOR WHOM. A big change needs STRONG</td><td>✗ NOT A ROW: page 9 box</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 Detailed Activities (experiment review; strategy revision); §7; Bland & Osterwalder (2019). Old Spice sales: as on slide 3 (Tuten & Solomon, SAGE; reported by the campaign, not independently verified). Reply videos: Wieden+Kennedy case page (wk.com). Peloton: slide 4 sources (Dec 2019). GoFood example: your worked-example file, page 4."
},
"5": {
"html": "<p><b>What this page answers:</b> who keeps the brand the same after this course ends.</p><p class='thh'><b>HOW · THREE ROWS</b></p><ol><li>WHO DECIDES IF THE MAIN MESSAGE CHANGES. One name.</li><li>WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS. The owner of each code is shown from Session 4, page 6 (Brand Codes Inventory). To change an owner, change it there.</li><li>WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES. Required if you work alone.</li></ol><p class='thh'><b>ONE DECISION, ONE NAME</b></p><ul><li>Two names means nobody decides. &quot;The team&quot; is not an owner.</li></ul><p class='thh'><b>THE LINE THE SYLLABUS DRAWS (§15)</b></p><ul><li>Product Manager/Business students &quot;must not … unilaterally dictate creative execution&quot;. Strategy is yours; creative execution belongs to the creative stream, and each must ask the other.</li><li>Working alone? Row 3 still needs a name: a lecturer, a classmate from a creative stream, or a future collaborator. Otherwise the §15 line has nobody on the other side.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>&quot;The team&quot; in any row.</li><li>An owner on this page who is not the owner on Session 4 page 6.</li><li>Row 3 left empty on a solo project.</li></ul><p class='thex'><b>EXAMPLE · OLD SPICE 2010 + PELOTON 2019 · CLASS RECONSTRUCTION</b> · famous brands rarely show who decides. Your team must.</p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>ROW</th><th>OLD SPICE / PELOTON · WHAT THE PUBLIC KNOWS</th><th>YOUR TEAM WOULD WRITE · ILLUSTRATIVE</th></tr></thead><tbody><tr><th>1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES</th><td>Peloton kept its ad running through the backlash. Someone decided: who? UNKNOWN.</td><td>Nadia Larasati (PM). Not &quot;the team&quot;, not &quot;Nadia and Bima&quot;.</td></tr><tr><th>2 · WHERE THE MASTER FILE LIVES, AND WHICH VERSION COUNTS</th><td>Old Spice: the codes we see are the Old Spice Man and &quot;Hello, ladies&quot;. Where the files live: UNKNOWN.</td><td>Google Drive /Brand/Master. File name code_[name]_v[n]; the highest n counts. Owners: shown from Session 4, page 6.</td></tr><tr><th>3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES</th><td>Old Spice: Wieden+Kennedy Portland, the agency. Who approved each of the 180+ reply videos? UNKNOWN.</td><td>Bima Prasetyo (Visual Communication stream). Working alone? Your lecturer, by name.</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 SLO and Key Topics; §15; Keller & Swaminathan (2020); Wheeler (2017). Old Spice: Wikipedia, \"The Man Your Man Could Smell Like\" (agency, 2006); D&AD Old Spice Response case. Peloton: slide 4 sources (Dec 2019). Right column: illustrative names, not a case. LEGO Technic example: your worked-example file, page 5."
},
"3": {
"html": "<p class='thh'><b>WHY</b></p><ul><li>Page 4 says STRONG or WEAK; this page shows why. Without it, a STRONG on page 4 is only a claim.</li></ul><p class='thh'><b>HOW TO FILL</b></p><ol><li>One row per finding: what you saw or heard (class test, weekly feedback, your own test).</li><li>The rung (SAY, DO or PAY), and who: how many out of how many.</li><li>STRONG or WEAK, and what it does not prove. Not tested yet? Write NOT YET.</li></ol><p class='thh'><b>THE RULE</b></p><ul><li>All rows STRONG is almost always wrong. All rows WEAK is not a failure: it is a finding about your evidence.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>A finding without &quot;how many out of how many&quot;.</li></ul><p class='thh'><b>EXAMPLE · IRON MAN BEFORE RELEASE · TEACHING SCENARIO</b></p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>FINDING</th><th>RUNG</th><th>WHO, HOW MANY</th><th>STRONG / WEAK</th><th>WHAT IT DOES NOT PROVE</th></tr></thead><tbody><tr><th>Non-readers can say what the film is about after the trailer</th><td>SAY</td><td>7 of 10, one round of trailer conversations</td><td>WEAK</td><td>That they will buy a ticket</td></tr><tr><th>Non-readers book an advance ticket</th><td>PAY</td><td>UNKNOWN until the checkout question runs (marketing lead)</td><td>NOT YET</td><td>—</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 In-Class Tools; Detailed Activities, experiment review. Marvel: Session 7 worked example (teaching scenario)."
},
"6": {
"html": "<p class='thh'><b>WHY</b></p><ul><li>Page 5 names three owners. This page covers every other kind of decision, so nothing waits for &quot;someone&quot;.</li></ul><p class='thh'><b>HOW TO FILL</b></p><ol><li>Start with the three printed rows: main message, a creative asset, price. Add one more if you need it.</li><li>One name per column: who decides, who is consulted before, who does the work, who is told after. For the main message, DECIDES matches page 5, row 1.</li><li>Check the §15 line: creative calls are decided by the creative side; the PM is consulted.</li></ol><p class='thh'><b>THE RULE</b></p><ul><li>One decision, one decider. Consultation that is not written down usually does not happen.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>The PM in the DECIDES column of every row.</li></ul><p class='thh'><b>EXAMPLE · JUMBO BEFORE CINEMA RELEASE · TEACHING SCENARIO</b></p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>DECISION</th><th>DECIDES</th><th>CONSULTED BEFORE</th><th>DOES THE WORK</th><th>TOLD AFTER</th></tr></thead><tbody><tr><th>Main message changes</th><td>PM</td><td>Director</td><td>Social lead</td><td>Distributor</td></tr><tr><th>A character image in a post</th><td>Director (creative stream)</td><td>PM</td><td>Social lead</td><td>Community lead</td></tr><tr><th>Price of the school screening offer</th><td>PM</td><td>Producer</td><td>Community lead</td><td>Partner schools</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 Key Topics (decision rights); §15. The four roles are a common project-management pattern, not a syllabus term. Jumbo: Session 7 worked example (teaching scenario)."
},
"7": {
"html": "<p class='thh'><b>WHY</b></p><ul><li>A crisis gives you hours, not days. Writing your first 24 hours now means nobody improvises in public.</li></ul><p class='thh'><b>HOW TO FILL</b></p><ol><li>Read your Session 3 promises (page 5, shown on this page). What could break each one in public?</li><li>For each risk: the first sign, the first 24 hours (what, where, by when), who decides, one spokesperson.</li><li>Check: DECIDES matches page 5, row 1.</li></ol><p class='thh'><b>THE RULE</b></p><ul><li>Risks to trust, not to the schedule (those stay on Session 6 page 10). If no promise breaks, it is not a reputation risk. &quot;We will clarify&quot; is not a first response.</li></ul><p class='thh'><b>COMMON MISTAKE</b></p><ul><li>A schedule or budget risk written as a reputation risk. Two spokespersons.</li></ul><p class='thh'><b>EXAMPLE · GOFOOD PILOT DISTRICT · TEACHING SCENARIO</b></p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>RISK</th><th>PROMISE IT BREAKS</th><th>FIRST SIGN</th><th>FIRST 24 HOURS</th><th>DECIDES</th><th>SPOKESPERSON</th></tr></thead><tbody><tr><th>A checked merchant gets a public food-safety complaint</th><td>Session 3 page 5, row 4: &quot;we checked these places first&quot;</td><td>A rider&#x27;s post with photos in the district group</td><td>Pause the merchant on the list; post what was checked and when; call the rider</td><td>GoFood product lead</td><td>Comms lead</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 Key Topics (crisis and reputation risk); Quelch & Jocz (2020), context only. GoFood: Session 7 worked example (teaching scenario)."
},
"8": {
"html": "<p class='thh'><b>WHY</b></p><ul><li>A number measured once is a guess. This page turns your Session 6 numbers into a habit: one person counts the same way, on a schedule.</li></ul><p class='thh'><b>WHAT IT DOES</b></p><ul><li>Indicator, baseline, target and source come from Session 6, page 9. You add three columns: METHOD (exactly how it is counted), FREQUENCY (how often), OWNER (one person).</li></ul><p class='thh'><b>HOW TO FILL</b></p><ol><li>The rows are printed: target, early signal, revenue, brand. Copy indicator, baseline, target and source from Session 6, page 9.</li><li>Add METHOD, FREQUENCY and OWNER.</li><li>Brand row: say whether you measure recognition, recall or association.</li></ol><p class='thh'><b>BRAND INDICATORS</b></p><ul><li>Recognition: people know you when shown. Recall: they name you without help, the harder test. Association: the words that come to mind.</li></ul><p class='thh'><b>THE RULE</b></p><ul><li>A new number may only replace a baseline that counts the same thing. &quot;Periodically&quot; is not a frequency; &quot;the team&quot; is not an owner.</li></ul><p class='thh'><b>EXAMPLE · LEGO TECHNIC FLAGSHIP · TEACHING SCENARIO</b></p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>INDICATOR</th><th>BASELINE</th><th>TARGET</th><th>METHOD</th><th>SOURCE</th><th>FREQUENCY</th><th>OWNER</th></tr></thead><tbody><tr><th>Target · Pre-orders</th><td>1,400 (last flagship, illustrative)</td><td>1,600 by Sun 21 Feb 2027</td><td>Paid pre-orders on LEGO.com + two shops</td><td>Order system</td><td>Weekly in the window</td><td>Brand manager</td></tr><tr><th>Early signal · &quot;Notify me&quot; sign-ups</th><td>UNKNOWN (brand manager pulls it)</td><td>—</td><td>Sign-ups on the set page</td><td>Set page</td><td>Daily before the window</td><td>Brand manager</td></tr><tr><th>Brand · association: &quot;it works&quot;</th><td>UNKNOWN</td><td>8 of 10 buyers</td><td>Ask 10 buyers what the set promised</td><td>Post-build email</td><td>Monthly from release</td><td>Brand manager</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 Detailed Activities (KPI dashboard: \"baseline, target, method, source, frequency, and responsible person for each major indicator\"); Keller (1993), Journal of Marketing; Rowles (2022). LEGO Technic: Session 7 worked example (teaching scenario; last flagship figure illustrative)."
},
"9": {
"html": "<p class='small muted'>WORKBOOK PAGE 9 · SYLLABUS: FINAL-DOSSIER CHECKLIST + FINAL PITCH REVISION PLAN</p><p><b>What this page answers:</b> does your whole story hold together, from the problem to the ask? Your pitch view, checked step by step.</p><p class='thh'><b>HOW TO WORK ON IT</b></p><ol><li>Page 9 shows your pitch view: the one story you hand in, the one a client or investor would read. Seven steps pulled from your pages in Sessions 1–7, plus your brand identity. You don&#x27;t type it again.</li><li>At each step, answer the question: ✓ or ✗. A ✗ means: go to the session named and fix that page. Page 9 updates by itself.</li><li>For every fix, write one row in your Strategy Revision Log (page 4, slide 8). A fix found by this check is WEAK evidence: enough for a small fix, never for a big change.</li></ol><p class='thh'><b>WHAT WE COULDN&#x27;T FIX YET</b></p><ul><li>One box at the bottom: only the steps still ✗. Which step, why, and what you will do, by when. A big change with no strong finding goes here, not on page 4.</li></ul><p class='thh'><b>YOUR DEFENCE</b></p><ul><li>With feedback 2 you get 3 questions from your own pages, Sessions 1–7; one asks about this chain. An honest ✗ is easier to defend than a ✓ you can&#x27;t prove.</li></ul><p class='thex'><b>THE EIGHT QUESTIONS</b> · Iron Man&#x27;s pitch view, checked against them: slide 16.</p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>STEP → WHERE TO FIX</th><th>ASK YOURSELF</th></tr></thead><tbody><tr><th>1 · The problem → Session 1</th><td>Is your problem still a problem for the people in step 2?</td></tr><tr><th>2 · Who, and how we know → Session 2</th><td>Is your card&#x27;s FOR WHOM your primary audience from Session 2, with an insight behind it?</td></tr><tr><th>3 · Why us → Session 3</th><td>Does every promise in your positioning have a REAL proof?</td></tr><tr><th>4 · The money story → Session 5</th><td>Is the price on your card your Session 5 price, and above your survival line?</td></tr><tr><th>5 · The road to the audience → Session 6</th><td>Is the ask in your message the same action as the top of your KPI tree?</td></tr><tr><th>6 · What we tested and changed → Session 7</th><td>Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?</td></tr><tr><th>7 · The ask and what&#x27;s next → Sessions 5 and 7</th><td>Is your open bet written down, with one name who decides?</td></tr><tr><th>8 · Brand identity (not in the pitch view) → Session 4</th><td>Do your name and brand codes still promise what your positioning promises?</td></tr></tbody></table></div><p class='thh'><b>Example: Iron Man&#x27;s pitch view, checked</b></p><p class='thex'><b>EXAMPLE · IRON MAN BEFORE RELEASE · TEACHING SCENARIO</b> · read across: what the pitch view says, then ✓ or ✗ against the question on slide 15.</p><div class='tscroll'><table class='wbtable ro'><thead><tr><th>STEP → WHERE TO FIX</th><th>IRON MAN&#x27;S PITCH VIEW SAYS</th><th>✓ / ✗</th></tr></thead><tbody><tr><th>1 · The problem → Session 1</th><td>No box-office proof that a lesser-known character can headline a film</td><td>✓</td></tr><tr><th>2 · Who, and how we know → Session 2</th><td>General moviegoers who don&#x27;t know the character, and doubt it can carry a film</td><td>✓</td></tr><tr><th>3 · Why us → Session 3</th><td>The superhero film that works completely on its own; an optional short scene after the credits</td><td>✓</td></tr><tr><th>4 · The money story → Session 5</th><td>The cinema&#x27;s ticket price; film two depends on film one reaching about $450M worldwide</td><td>✗ the price is fine, but film two needs about $450M from film one: still a bet</td></tr><tr><th>5 · The road to the audience → Session 6</th><td>Cinemas near you, opening weekend. The ask: book an opening-weekend ticket</td><td>✓</td></tr><tr><th>6 · What we tested and changed → Session 7</th><td>12 of 40 non-readers will buy an advance ticket (written first); not tested yet. One revision row, WEAK</td><td>✓ number written first; the page-4 row&#x27;s evidence comes from people (non-readers, weekly feedback)</td></tr><tr><th>7 · The ask and what&#x27;s next → Sessions 5 and 7</th><td>Open bet: non-readers buy a ticket for a hero they don&#x27;t know. The film-two decision: &quot;studio head with finance&quot;</td><td>✗ &quot;studio head with finance&quot; is two names</td></tr><tr><th>8 · Brand identity (not in the pitch view) → Session 4</th><td>Helmet silhouette in red and gold; &quot;A Marvel Studios film&quot; locked to the title</td><td>✓</td></tr></tbody></table></div><div class='tscroll'><table class='wbtable ro ex'><thead><tr><th>BOX</th><th>EXAMPLE</th></tr></thead><tbody><tr><th>WHAT WE COULDN&#x27;T FIX YET</th><td>Step 4 · Film one must reach about $450M worldwide for film two; that stays a bet until opening weekend (finance reads it). Step 7 · &quot;Studio head with finance&quot; is two names. One name needs the studio head to say yes, and that yes has not come yet; asked before the final check.</td></tr></tbody></table></div>",
"src": "Syllabus Session 7 In-Class Tools (Final-Dossier Checklist); Session Output #10 (final pitch revision plan). The eight questions and the pitch view are this course's design. Iron Man: Session 7 worked example, page 9, teaching scenario. The eight questions: slide 15."
}
},
"cases": {
"jumbo": {
"kicker": "SESSION 7 WORKED EXAMPLE · JUMBO BEFORE CINEMA RELEASE",
"carried": "Carried in: the Session 6 card (families with primary-school children; \"A family film made in Indonesia, at world-class quality.\"; join your child's school screening). Session 5, page 8, row 1 bets that parents will pay for the cinema rather than wait for streaming. Brand-code owners come from Session 4, page 6.",
"how": "Follow one thread: the bet on page 2, the change on page 4, the names on page 5. All three meet on the card (slide 10), which now has a ninth row.\nIn Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.\nThe honest weak spot: the card asks for a free screening (DO), but the bet is about paying. Page 2 says so and tests PAY instead.\nPages 3, 6, 7 and 8 are optional and are not filled in this example. Each one has a filled example in the Session 7 deck (slides 11–14). Page 9, the final check, is core and is filled.",
"note": "TEACHING SCENARIO: before cinema release, school-screening plan. Every result, count, quote, date and owner is made up for teaching. None is Visinema's data, plan or agreement.",
"p2": {
"sub": "The card asks for a free screening (DO). The bet is about paying, so the test asks for PAY.",
"boxes": {
"THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED": "Parents will pay for the cinema rather than wait for streaming.  Category: Desirability.",
"FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED": "Indonesian families with primary-school children; the child asks, the parent pays.",
"WHO WE ASK": "40 parents of primary-school children, from two class-parents groups. Not our team, not our friends.",
"WHAT WE ASK THEM TO DO · DO OR PAY": "Pay a Rp50,000 deposit per family to pre-book opening-weekend seats; it is not refunded if they don't come (PAY). Not the card's free school screening (DO): that cannot prove this bet wrong, and the gap is a finding.",
"OUR PREDICTION · BEFORE THE TEST": "12 of 40 will pay the deposit.",
"RESULT (OPTIONAL)": "Not tested yet."
},
"tables": [],
"notice": "The prediction is written before anyone is asked. \"Not tested yet\" is an honest result; a number written afterwards would not be. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1."
},
"p4": {
"sub": "One small change from a weak signal. The positioning is left alone.",
"boxes": {
"STRONG FINDING OR WEAK SIGNAL": "A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK. A big change (audience, positioning, price) needs a strong finding.",
"REJECTED COUNTS THE SAME AS SUPPORTED": "A result that proved your bet wrong tells you what to stop doing. A row that says \"we were wrong, so we changed it\" is the most professional row on the page."
},
"tables": [
[
[
"LINE · WHERE IT LIVES",
"BEFORE",
"AFTER",
"EVIDENCE",
"STRONG / WEAK"
],
[
"Session 3, Promise → Proof, row 2 (World-class quality) → card, WHY BELIEVE IT",
"\"Made by Visinema Studios, an Indonesian studio, with Indonesian writers in the credits; years in production\"",
"\"…years in production, shown in the studio's behind-the-scenes post\" (post PLANNED: social lead, before the first invitation)",
"Class practice test (TEACHING SCENARIO): 6 of 10 voters asked \"how do I know it's world-class?\" Words, classmates, one round.",
"WEAK"
]
]
],
"notice": "A weak signal fixed one line on the card. It was not enough to change the positioning, so the positioning stays."
},
"p5": {
"sub": "Three rows, one name where a decision is made.",
"boxes": {
"NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)": "Positioning · the main message · the character silhouette",
"MAY ADAPT (OPTIONAL)": "Posts per platform · the school invitation wording · seasonal material"
},
"tables": [
[
[
"ROW",
"OUR ANSWER"
],
[
"1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES",
"PM"
],
[
"2 · WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS",
"Shared drive Jumbo/Brand/Master. Version rule: code_[name]_v[n]; the highest n in Master counts. Owners shown from Session 4, page 6: silhouette → art director · palette → art director · sonic signature → composer, via the marketing lead (UNKNOWN: not on file yet)"
],
[
"3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES",
"Art director"
]
]
],
"notice": "The PM decides the message; the art director must be asked before any asset changes. Strategy and creative execution each have one name."
},
"p9": {
"sub": "Seven steps and the brand, checked. One step is still ✗, and it goes in the box.",
"boxes": {
"WHAT WE COULDN'T FIX YET": "Step 3 · Why us: \"world-class\" has no proof a parent can see yet; the behind-the-scenes post is PLANNED. Social lead publishes it before the first school invitation, then this step turns ✓."
},
"tables": [
[
[
"STEP → WHERE TO FIX",
"YOUR PITCH VIEW SAYS",
"ASK YOURSELF",
"✓ / ✗",
"IF ✗: WHERE WE FIXED IT"
],
[
"1 · The problem → Session 1",
"Families wait for streaming; a local animated film gets one opening weekend to prove itself",
"Is your problem still a problem for the people in step 2?",
"✓",
"—"
],
[
"2 · Who, and how we know → Session 2",
"Families with primary-school children: the child asks, the parent pays",
"Is your card's FOR WHOM your primary audience from Session 2, with an insight behind it?",
"✓",
"—"
],
[
"3 · Why us → Session 3",
"Made to world-class standards by an Indonesian studio; the proof is a behind-the-scenes post, still PLANNED",
"Does every promise in your positioning have a REAL proof?",
"✗",
"→ box below"
],
[
"4 · The money story → Session 5",
"Free for families; the school books the screening at Rp2,500,000; cinema tickets at the cinema's price",
"Is the price on your card your Session 5 price, and above your survival line?",
"✓",
"—"
],
[
"5 · The road to the audience → Session 6",
"School screenings first. The ask: join your child's school screening",
"Is the ask in your message the same action as the top of your KPI tree?",
"✓",
"—"
],
[
"6 · What we tested and changed → Session 7",
"12 of 40 parents will pay a Rp50,000 deposit (written first); not tested yet. One revision row, WEAK",
"Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?",
"✓",
"—"
],
[
"7 · The ask and what's next → Sessions 5 and 7",
"Open bet: parents will pay for the cinema rather than wait for streaming. One name decides the message: the PM",
"Is your open bet written down, with one name who decides?",
"✓",
"—"
],
[
"8 · Brand identity (not in the pitch view) → Session 4",
"\"Visinema presents Jumbo\"; fixed silhouette and palette; sound identity UNKNOWN, with an owner",
"Do your name and brand codes still promise what your positioning promises?",
"✓",
"—"
]
]
],
"notice": "One ✗ left, with what will be done, by when. A page with every step ✓ would be less believable, not more."
},
"card": [
[
"Name",
"Jumbo",
"Your project name"
],
[
"FOR WHOM",
"Indonesian families with primary-school children",
"Session 2, page 4"
],
[
"MAIN MESSAGE",
"A family film made in Indonesia, at world-class quality.",
"Session 6, page 5"
],
[
"positioning",
"The animated family film made by an Indonesian studio to world-class production standards",
"Session 3, page 2"
],
[
"WHY BELIEVE IT",
"Made by Visinema Studios, an Indonesian studio, with Indonesian writers in the credits; years in production, shown in the studio's behind-the-scenes post (PLANNED)",
"Session 3, Promise → Proof, REAL rows"
],
[
"WHERE",
"At your child's school: a Saturday-morning screening before the film opens",
"Session 6, page 4, access"
],
[
"PRICE",
"Free for families: the school books the screening (Rp2,500,000). Cinema tickets at the cinema's price",
"Session 5, page 4"
],
[
"WHAT WE ASK YOU TO DO",
"Join your child's school screening before the film opens",
"Session 6, page 9, step 1"
],
[
"WHAT WE'RE BETTING ON",
"Parents will pay for the cinema rather than wait for streaming.",
"Session 5, page 8 (your three bets), row 1"
]
],
"cardNotice": "WHY BELIEVE IT changed on page 4 and points to a post that is still PLANNED. Until it is published, a parent still cannot check \"world-class\". In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.",
"check": [
[
"Page 2 (test plan)",
"Is there a bet, people from FOR WHOM, a DO or PAY action that can prove the bet wrong, and a number written before the test?",
"YES",
"Bet from Session 5; 40 parents outside the team; a PAY action that can prove the bet wrong, with the gap to the card written; 12 of 40 written before the test."
],
[
"Page 4 (revision log)",
"Does every change have evidence, marked strong or weak, and is each change the size its evidence allows?",
"YES",
"One row, evidence marked WEAK, and only a small change made."
],
[
"Page 5 (governance)",
"One name per decision, one master file and version rule, and a name for who must be asked before a creative asset changes?",
"YES",
"One name per decision; master file and version rule; owners match Session 4, page 6; the sonic signature is UNKNOWN with an owner."
],
[
"Page 9 (pitch view)",
"Is every step ✓ or ✗, each fixed ✗ fixed at its page, and every ✗ left in the box with why and by when?",
"YES",
"Eight steps marked; the one ✗ (proof still PLANNED) is in the box with what will be done, by when."
],
[
"The Concept Card",
"Do all nine rows come from their pages, and is row 9 kept from the person you test?",
"NOT YET",
"Every row comes from its page, but the proof behind \"world-class\" is still PLANNED. Fix: publish the post before the first invitation (social lead)."
]
],
"checkSub": "The four core pages and the card, read the way your submission is read. YES or NOT YET, with the evidence.",
"defence": "Your three defence questions come from your own pages, Sessions 1–7. An honest ✗ in the page 9 box is easier to defend than a ✓ you can't prove."
},
"gojek": {
"kicker": "SESSION 7 WORKED EXAMPLE · GOFOOD PILOT DISTRICT",
"carried": "Carried in: the Session 6 card (existing GoRide riders; \"The app you already trust now brings the food too.\"; place your first food order). Session 5, page 8, row 1 bets that riders order without a voucher, at a basket above about Rp63,000. Brand-code owners come from Session 4, page 6.",
"how": "Follow one thread: the bet on page 2, the changes on page 4, the names on page 5. All three meet on the card (slide 10), which now has a ninth row.\nIn Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.\nThis is the one case with a result: the bet was wrong. Page 4 shows why a REJECTED bet is worth as much as a SUPPORTED one.\nPages 3, 6, 7 and 8 are optional and are not filled in this example. Each one has a filled example in the Session 7 deck (slides 11–14). Page 9, the final check, is core and is filled.",
"note": "TEACHING SCENARIO: every result, count, date and owner is made up for teaching. None is Gojek's data, plan or agreement. The pilot dates are an estimate.",
"p2": {
"sub": "The test adds the basket line, because a small order cannot prove the bet.",
"boxes": {
"THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED": "Riders order without a voucher, at a basket above about Rp63,000.  Category: Desirability.",
"FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED": "Existing GoRide riders in Jakarta; buyer and user are the same person.",
"WHO WE ASK": "Existing GoRide riders in the pilot district who have never ordered food. Not our staff.",
"WHAT WE ASK THEM TO DO · DO OR PAY": "Place a first food order above about Rp63,000 in the two no-voucher weeks (PAY). The card asks for any first order; this test adds the basket line, because a small order cannot prove the bet.",
"OUR PREDICTION · BEFORE THE TEST": "1,000 of the 1,200 planned first orders will still come without a voucher.",
"RESULT (OPTIONAL)": "TEACHING SCENARIO: about half came, both weeks. REJECTED (see page 4)."
},
"tables": [],
"notice": "The prediction was written before the pilot, so the result could prove it wrong. It did. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1."
},
"p4": {
"sub": "One small change from a weak signal, one big change because the bet was wrong.",
"boxes": {
"STRONG FINDING OR WEAK SIGNAL": "A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK. A big change (audience, positioning, price) needs a strong finding.",
"REJECTED COUNTS THE SAME AS SUPPORTED": "A result that proved your bet wrong tells you what to stop doing. A row that says \"we were wrong, so we changed it\" is the most professional row on the page."
},
"tables": [
[
[
"LINE · WHERE IT LIVES",
"BEFORE",
"AFTER",
"EVIDENCE",
"STRONG / WEAK"
],
[
"Card, PRICE row (Session 5, page 4)",
"\"Food at the merchant's price, plus a delivery fee by distance, the same as a GoRide trip\"",
"\"Food at the merchant's price, plus the delivery fee shown on the merchant card before you order\"",
"In a small practice test, 7 of 10 riders asked about the fee before anything else (words, one district)",
"WEAK"
],
[
"Session 6, page 9, step 1 (our Session 5 row 1 bet)",
"\"1,200 first orders without a voucher\"",
"\"1,200 first orders above about Rp63,000, with a capped first-order voucher\"",
"No-voucher pilot weeks 1 and 2: first orders fell by about half both weeks (counted orders, outside the team). Our bet was wrong: REJECTED",
"STRONG"
]
]
],
"notice": "Row 2 says \"we were wrong, so we changed it\". It changes one thing the finding supports (the target), not the positioning or the audience."
},
"p5": {
"sub": "Three rows; one code still has no candidate, and says so.",
"boxes": {
"NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)": "Positioning · the main message · the Gojek green, icon and \"Go\" pattern",
"MAY ADAPT (OPTIONAL)": "Banner wording per campaign · merchant photos · seasonal offers"
},
"tables": [
[
[
"ROW",
"OUR ANSWER"
],
[
"1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES",
"GoFood product lead"
],
[
"2 · WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS",
"Gojek design system, folder /GoFood/Master. Version rule: one file per code with its date in the name; the newest file in Master counts. Owners shown from Session 4, page 6: green and icon → design lead · \"Go\" pattern → brand lead · tracker → product designer · voice → GoFood product lead · food signal → product designer (UNKNOWN: no candidate yet)"
],
[
"3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES",
"Design lead"
]
]
],
"notice": "The food signal is still UNKNOWN, with its owner from Session 4. A governance page can name a gap; it cannot hide one."
},
"p9": {
"sub": "One ✗ was fixed at its page. Two are still ✗, because the bet was wrong.",
"boxes": {
"WHAT WE COULDN'T FIX YET": "Step 5 · The ask names any first order; the KPI counts only orders above about Rp63,000. Product lead decides whether the ask names the basket, before the final check. Step 7 · The rejected bet needs a new one in Session 5, page 8, row 1 (product lead, before the final check)."
},
"tables": [
[
[
"STEP → WHERE TO FIX",
"YOUR PITCH VIEW SAYS",
"ASK YOURSELF",
"✓ / ✗",
"IF ✗: WHERE WE FIXED IT"
],
[
"1 · The problem → Session 1",
"Whether ride trust carries over to food, and whether orders make money, is unproven",
"Is your problem still a problem for the people in step 2?",
"✓",
"—"
],
[
"2 · Who, and how we know → Session 2",
"Existing GoRide riders in Jakarta: already in the app, so they cost nothing to reach",
"Is your card's FOR WHOM your primary audience from Session 2, with an insight behind it?",
"✓",
"—"
],
[
"3 · Why us → Session 3",
"Lives inside the app you already use: address and GoPay saved, drivers nearby, merchants checked first",
"Does every promise in your positioning have a REAL proof?",
"✓",
"—"
],
[
"4 · The money story → Session 5",
"Merchant's price, plus the delivery fee shown on the merchant card before you order; pays only above about Rp63,000",
"Is the price on your card your Session 5 price, and above your survival line?",
"✓",
"Was ✗: the fee wording. Fixed on the card's PRICE row; logged on page 4, row 1"
],
[
"5 · The road to the audience → Session 6",
"The GoFood tab. The ask: place your first food order. KPI top: 1,200 first orders above about Rp63,000",
"Is the ask in your message the same action as the top of your KPI tree?",
"✗",
"→ box below"
],
[
"6 · What we tested and changed → Session 7",
"Predicted 1,000 of 1,200 without a voucher; about half came: REJECTED. Target changed (STRONG)",
"Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?",
"✓",
"—"
],
[
"7 · The ask and what's next → Sessions 5 and 7",
"Open bet: the one the pilot rejected; no new bet written yet. Message decided by the GoFood product lead",
"Is your open bet written down, with one name who decides?",
"✗",
"→ box below"
],
[
"8 · Brand identity (not in the pitch view) → Session 4",
"Gojek green, icon and \"Go\" pattern; the food signal is UNKNOWN, with an owner",
"Do your name and brand codes still promise what your positioning promises?",
"✓",
"—"
]
]
],
"notice": "A REJECTED bet leaves two ✗ on page 9. That is the chain working: the test changed the story, and page 9 shows where."
},
"card": [
[
"Name",
"GoFood",
"Your project name"
],
[
"FOR WHOM",
"Existing GoRide riders in Jakarta",
"Session 2, page 4"
],
[
"MAIN MESSAGE",
"The app you already trust now brings the food too.",
"Session 6, page 5"
],
[
"positioning",
"The food-ordering service that lives inside the app they already use",
"Session 3, page 2"
],
[
"WHY BELIEVE IT",
"Your address and GoPay are already saved; the drivers are already nearby; every merchant on the list was checked first",
"Session 3, Promise → Proof, REAL rows"
],
[
"WHERE",
"The GoFood tab in the Gojek app you already use, in the pilot district",
"Session 6, page 4, access"
],
[
"PRICE",
"Food at the merchant's price, plus the delivery fee shown on the merchant card before you order",
"Session 5, page 4"
],
[
"WHAT WE ASK YOU TO DO",
"Place your first food order from the GoFood tab",
"Session 6, page 9, step 1"
],
[
"WHAT WE'RE BETTING ON",
"Riders order without a voucher, at a basket above about Rp63,000.",
"Session 5, page 8 (your three bets), row 1"
]
],
"cardNotice": "The PRICE row changed on page 4. The bet in row 9 is the one the pilot rejected: next round it gets rewritten in Session 5, not on the card. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.",
"check": [
[
"Page 2 (test plan)",
"Is there a bet, people from FOR WHOM, a DO or PAY action that can prove the bet wrong, and a number written before the test?",
"YES",
"Bet from Session 5; riders outside the team; a PAY action with the basket line; the prediction written before the pilot; result recorded as REJECTED."
],
[
"Page 4 (revision log)",
"Does every change have evidence, marked strong or weak, and is each change the size its evidence allows?",
"YES",
"Two rows: WEAK for wording, STRONG for the target. Each change is the size its evidence allows."
],
[
"Page 5 (governance)",
"One name per decision, one master file and version rule, and a name for who must be asked before a creative asset changes?",
"YES",
"One name per decision; master file and version rule; owners match Session 4, page 6; the food signal is UNKNOWN with an owner."
],
[
"Page 9 (pitch view)",
"Is every step ✓ or ✗, each fixed ✗ fixed at its page, and every ✗ left in the box with why and by when?",
"YES",
"Eight steps marked; one ✗ fixed at its page and logged; two ✗ in the box, each with what will be done, by when."
],
[
"The Concept Card",
"Do all nine rows come from their pages, and is row 9 kept from the person you test?",
"YES",
"Every row comes from its page; PRICE shows the change from page 4."
]
],
"checkSub": "The four core pages and the card, read the way your submission is read. YES or NOT YET, with the evidence.",
"defence": "Your three defence questions come from your own pages, Sessions 1–7. An honest ✗ in the page 9 box is easier to defend than a ✓ you can't prove."
},
"marvel": {
"kicker": "SESSION 7 WORKED EXAMPLE · IRON MAN BEFORE RELEASE",
"carried": "Carried in: the Session 6 card (general moviegoers who don't know the character; \"You don't need to know anything to start here.\"; book an opening-weekend ticket). Session 5, page 8, row 1 bets that moviegoers who don't read comics will buy a ticket for a hero they don't know. Brand-code owners come from Session 4, page 6.",
"how": "Follow one thread: the bet on page 2, the change on page 4, the names on page 5. All three meet on the card (slide 10), which now has a ninth row.\nIn Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.\nSession 5 planned ten trailer conversations: that is SAY. Page 2 raises the same bet to PAY.\nPages 3, 6, 7 and 8 are optional and are not filled in this example. Each one has a filled example in the Session 7 deck (slides 11–14). Page 9, the final check, is core and is filled.",
"note": "TEACHING SCENARIO of Marvel Studios before Iron Man's release. Every result, count, quote and owner is made up for teaching.",
"p2": {
"sub": "Session 5 planned conversations (SAY). This test asks for a ticket (PAY).",
"boxes": {
"THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED": "Moviegoers who don't read comics will buy a ticket for a hero they don't know.  Category: Desirability.",
"FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED": "General moviegoers who don't know the character.",
"WHO WE ASK": "40 moviegoers who have never read a comic, at two cinemas, after a trailer screening. Not studio staff.",
"WHAT WE ASK THEM TO DO · DO OR PAY": "Buy an advance ticket on the spot (PAY). Session 5 planned ten trailer conversations, which is SAY; this test raises the same bet to PAY. The card asks for the same action.",
"OUR PREDICTION · BEFORE THE TEST": "12 of 40 will buy an advance ticket.",
"RESULT (OPTIONAL)": "Not tested yet: the trailer screenings run 8 weeks before opening."
},
"tables": [],
"notice": "Same bet as Session 5, higher rung. Conversations can stay as background; they cannot prove the bet wrong. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1."
},
"p4": {
"sub": "One wording change from a weak signal.",
"boxes": {
"STRONG FINDING OR WEAK SIGNAL": "A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK. A big change (audience, positioning, price) needs a strong finding.",
"REJECTED COUNTS THE SAME AS SUPPORTED": "A result that proved your bet wrong tells you what to stop doing. A row that says \"we were wrong, so we changed it\" is the most professional row on the page."
},
"tables": [
[
[
"LINE · WHERE IT LIVES",
"BEFORE",
"AFTER",
"EVIDENCE",
"STRONG / WEAK"
],
[
"Session 6, page 5, reason 2 → card, WHY BELIEVE IT",
"\"There's more, if you want it. A short tease after the credits.\"",
"\"Optional: a short scene after the credits.\"",
"Weekly feedback, and a class practice (TEACHING SCENARIO): 3 of 5 non-readers read it as \"more films to watch\". Words, one round.",
"WEAK"
]
]
],
"notice": "A wording fix is small enough for a weak signal. Whether non-readers actually buy is still the page-2 test."
},
"p5": {
"sub": "Three rows; creative calls stay with the art director.",
"boxes": {
"NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)": "Positioning · the main message · the helmet silhouette · no universe art in public",
"MAY ADAPT (OPTIONAL)": "Trailer cut-downs per platform · social tone per channel · seasonal posters"
},
"tables": [
[
[
"ROW",
"OUR ANSWER"
],
[
"1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES",
"Studio head"
],
[
"2 · WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS",
"Studio server /IronMan/Master/Codes. Version rule: code_[name]_v[n]; the highest n in Master counts. Owners shown from Session 4, page 6: helmet silhouette → art director · voice → marketing lead · palette → art director · sonic signature → music supervisor (UNKNOWN: not on file yet)"
],
[
"3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES",
"Art director; for licensed products, also the licensing lead"
]
]
],
"notice": "\"No universe art in public\" sits on the never-changes side: it protects the promise that you can start here."
},
"p9": {
"sub": "Two steps are still ✗. Both go in the box, with why and by when.",
"boxes": {
"WHAT WE COULDN'T FIX YET": "Step 4 · Film one must reach about $450M worldwide for film two; that stays a bet until opening weekend (finance reads it). Step 7 · \"Studio head with finance\" is two names. One name needs the studio head to say yes, and that yes has not come yet; asked before the final check."
},
"tables": [
[
[
"STEP → WHERE TO FIX",
"YOUR PITCH VIEW SAYS",
"ASK YOURSELF",
"✓ / ✗",
"IF ✗: WHERE WE FIXED IT"
],
[
"1 · The problem → Session 1",
"No box-office proof that a lesser-known character can headline a film",
"Is your problem still a problem for the people in step 2?",
"✓",
"—"
],
[
"2 · Who, and how we know → Session 2",
"General moviegoers who don't know the character, and doubt it can carry a film",
"Is your card's FOR WHOM your primary audience from Session 2, with an insight behind it?",
"✓",
"—"
],
[
"3 · Why us → Session 3",
"The superhero film that works completely on its own; an optional short scene after the credits",
"Does every promise in your positioning have a REAL proof?",
"✓",
"—"
],
[
"4 · The money story → Session 5",
"The cinema's ticket price; film two depends on film one reaching about $450M worldwide",
"Is the price on your card your Session 5 price, and above your survival line?",
"✗",
"→ box below"
],
[
"5 · The road to the audience → Session 6",
"Cinemas near you, opening weekend. The ask: book an opening-weekend ticket",
"Is the ask in your message the same action as the top of your KPI tree?",
"✓",
"—"
],
[
"6 · What we tested and changed → Session 7",
"12 of 40 non-readers will buy an advance ticket (written first); not tested yet. One revision row, WEAK",
"Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?",
"✓",
"—"
],
[
"7 · The ask and what's next → Sessions 5 and 7",
"Open bet: non-readers buy a ticket for a hero they don't know. The film-two decision: \"studio head with finance\"",
"Is your open bet written down, with one name who decides?",
"✗",
"→ box below"
],
[
"8 · Brand identity (not in the pitch view) → Session 4",
"Helmet silhouette in red and gold; \"A Marvel Studios film\" locked to the title",
"Do your name and brand codes still promise what your positioning promises?",
"✓",
"—"
]
]
],
"notice": "Step 7 waits for one person's yes; step 4 waits for the release. Neither can be fixed today, and the box says why."
},
"card": [
[
"Name",
"Iron Man",
"Your project name"
],
[
"FOR WHOM",
"General moviegoers who don't know the character",
"Session 2, page 4"
],
[
"MAIN MESSAGE",
"You don't need to know anything to start here.",
"Session 6, page 5"
],
[
"positioning",
"The superhero film that works completely on its own",
"Session 3, page 2"
],
[
"WHY BELIEVE IT",
"The story needs no earlier film; an optional short scene after the credits",
"Session 3, Promise → Proof, REAL rows"
],
[
"WHERE",
"Cinemas near you, opening weekend; book in your ticket app",
"Session 6, page 4, access"
],
[
"PRICE",
"The cinema's ticket price (set by the cinema)",
"Session 5, page 4"
],
[
"WHAT WE ASK YOU TO DO",
"Book an opening-weekend ticket",
"Session 6, page 9, step 1"
],
[
"WHAT WE'RE BETTING ON",
"Moviegoers who don't read comics will buy a ticket for a hero they don't know.",
"Session 5, page 8 (your three bets), row 1"
]
],
"cardNotice": "WHY BELIEVE IT now says \"optional\" first, from page 4. It is REAL, but a buyer can only check it after watching. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.",
"check": [
[
"Page 2 (test plan)",
"Is there a bet, people from FOR WHOM, a DO or PAY action that can prove the bet wrong, and a number written before the test?",
"YES",
"Bet from Session 5; non-readers outside the studio; raised from SAY to PAY; 12 of 40 written before the test; \"not tested yet\" stated."
],
[
"Page 4 (revision log)",
"Does every change have evidence, marked strong or weak, and is each change the size its evidence allows?",
"YES",
"One row, WEAK, a wording change only."
],
[
"Page 5 (governance)",
"One name per decision, one master file and version rule, and a name for who must be asked before a creative asset changes?",
"YES",
"One name per decision; master file and version rule; owners match Session 4, page 6; the sonic signature is UNKNOWN with an owner."
],
[
"Page 9 (pitch view)",
"Is every step ✓ or ✗, each fixed ✗ fixed at its page, and every ✗ left in the box with why and by when?",
"YES",
"Eight steps marked; two ✗ in the box, each with why and when."
],
[
"The Concept Card",
"Do all nine rows come from their pages, and is row 9 kept from the person you test?",
"YES",
"Every row comes from its page; WHY BELIEVE IT shows the page-4 change."
]
],
"checkSub": "The four core pages and the card, read the way your submission is read. YES or NOT YET, with the evidence.",
"defence": "Your three defence questions come from your own pages, Sessions 1–7. An honest ✗ in the page 9 box is easier to defend than a ✓ you can't prove."
},
"lego": {
"kicker": "SESSION 7 WORKED EXAMPLE · LEGO TECHNIC FLAGSHIP",
"carried": "Carried in: the Session 6 card (existing Technic hobbyists; \"Advanced should mean it works — not that it costs more.\"; pre-order the flagship). Session 5, page 8, row 1 bets that hobbyists will pay the flagship premium once they've watched each function working. Brand-code owners come from Session 4, page 6.",
"how": "Follow one thread: the bet on page 2, the change on page 4, the names on page 5. All three meet on the card (slide 10), which now has a ninth row.\nIn Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.\nA normal pre-order can be cancelled, so it is DO. Page 2 asks for a deposit that is not refunded, so the test can prove the bet wrong.\nPages 3, 6, 7 and 8 are optional and are not filled in this example. Each one has a filled example in the Session 7 deck (slides 11–14). Page 9, the final check, is core and is filled.",
"note": "TEACHING SCENARIO: every result, count, date and owner is made up for teaching. None is the LEGO Group's data, plan or agreement. Release Mon 22 Feb 2027 is an estimate.",
"p2": {
"sub": "A pre-order can be cancelled (DO). The test asks for a deposit that is not refunded (PAY).",
"boxes": {
"THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED": "Hobbyists will pay the flagship premium once they've watched each function working.  Category: Desirability.",
"FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED": "Existing Technic hobbyists; buyer and user are the same person.",
"WHO WE ASK": "60 experienced Technic builders from two hobbyist forums. Not LEGO staff, not our friends.",
"WHAT WE ASK THEM TO DO · DO OR PAY": "Watch the reviewer demo, then pay a Rp500,000 deposit towards the flagship that is not refunded (PAY). A normal pre-order can be cancelled, which is DO, so it cannot prove this bet wrong.",
"OUR PREDICTION · BEFORE THE TEST": "15 of 60 will pay the deposit.",
"RESULT (OPTIONAL)": "Not tested yet: the demo is PLANNED for the week of Mon 25 Jan 2027."
},
"tables": [],
"notice": "The test cannot run before its proof exists. The result stays \"not tested yet\" until the demo is held. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1."
},
"p4": {
"sub": "One small change from a weak signal; the demo is still the real test.",
"boxes": {
"STRONG FINDING OR WEAK SIGNAL": "A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK. A big change (audience, positioning, price) needs a strong finding.",
"REJECTED COUNTS THE SAME AS SUPPORTED": "A result that proved your bet wrong tells you what to stop doing. A row that says \"we were wrong, so we changed it\" is the most professional row on the page."
},
"tables": [
[
[
"LINE · WHERE IT LIVES",
"BEFORE",
"AFTER",
"EVIDENCE",
"STRONG / WEAK"
],
[
"Session 6, page 4, evaluate step: the set page",
"\"Function list on the set page\" (PLANNED)",
"\"Function-per-tier list published on the set page, with the demo week shown\"",
"Class practice test (TEACHING SCENARIO): \"can I see it work?\" was the first question from 7 of 10 voters. Words, classmates.",
"WEAK"
]
]
],
"notice": "The list can go up now; it is a small change. The positioning waits for the demo, which is a strong test, not a class signal."
},
"p5": {
"sub": "Three rows; the parent-link rule has one owner.",
"boxes": {
"NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)": "Positioning · the main message · the beam shape · the parent mark on the pack front",
"MAY ADAPT (OPTIONAL)": "Build videos per platform · forum replies · event displays"
},
"tables": [
[
[
"ROW",
"OUR ANSWER"
],
[
"1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES",
"Brand manager"
],
[
"2 · WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS",
"Design system folder /Technic/Master/Codes. Version rule: code_[name]_v[n]; the highest n in Master counts. Owners shown from Session 4, page 6: beam shape → design lead · motion image → marketing lead · parent-link rule → brand manager"
],
[
"3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES",
"Design lead; for licensed sets, also the licensing lead"
]
]
],
"notice": "Row 2's owners are the ones on Session 4, page 6. Row 3 has two names because licensed sets need both; the decision in row 1 still has one."
},
"p9": {
"sub": "The step that holds the positioning is still ✗: its proof is a demo that has not happened.",
"boxes": {
"WHAT WE COULDN'T FIX YET": "Step 3 · The proof is the reviewer demo, PLANNED for the week of Mon 25 Jan 2027 (marketing lead). Step 4 · The mould threshold is UNKNOWN; finance with design models it before the pre-order window."
},
"tables": [
[
[
"STEP → WHERE TO FIX",
"YOUR PITCH VIEW SAYS",
"ASK YOURSELF",
"✓ / ✗",
"IF ✗: WHERE WE FIXED IT"
],
[
"1 · The problem → Session 1",
"Will hobbyists pay a premium for real function, and read the step as discipline?",
"Is your problem still a problem for the people in step 2?",
"✓",
"—"
],
[
"2 · Who, and how we know → Session 2",
"Existing Technic hobbyists; buyer and user are the same person",
"Is your card's FOR WHOM your primary audience from Session 2, with an insight behind it?",
"✓",
"—"
],
[
"3 · Why us → Session 3",
"Every added function can be watched working before you buy; the reviewer demo is PLANNED",
"Does every promise in your positioning have a REAL proof?",
"✗",
"→ box below"
],
[
"4 · The money story → Session 5",
"Rp6,500,000; the mould threshold that makes it pay is UNKNOWN",
"Is the price on your card your Session 5 price, and above your survival line?",
"✗",
"→ box below"
],
[
"5 · The road to the audience → Session 6",
"Pre-order on LEGO.com or two specialist shops. The ask: pre-order. KPI top: 1,600 pre-orders",
"Is the ask in your message the same action as the top of your KPI tree?",
"✓",
"—"
],
[
"6 · What we tested and changed → Session 7",
"15 of 60 builders will pay a Rp500,000 deposit (written first); not tested yet. One revision row, WEAK",
"Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?",
"✓",
"—"
],
[
"7 · The ask and what's next → Sessions 5 and 7",
"Open bet: hobbyists pay the premium once they've watched each function. One name decides: the brand manager",
"Is your open bet written down, with one name who decides?",
"✓",
"—"
],
[
"8 · Brand identity (not in the pitch view) → Session 4",
"Liftarm beam shape; the LEGO mark stays on the pack front; flagship tier name UNKNOWN",
"Do your name and brand codes still promise what your positioning promises?",
"✓",
"—"
]
]
],
"notice": "Both ✗ wait for something that has not happened yet. Writing them down with a date is the fix you can make now."
},
"card": [
[
"Name",
"LEGO Technic flagship",
"Your project name"
],
[
"FOR WHOM",
"Existing Technic hobbyists; buyer and user are the same person",
"Session 2, page 4"
],
[
"MAIN MESSAGE",
"Advanced should mean it works — not that it costs more.",
"Session 6, page 5"
],
[
"positioning",
"The building set where every added function can be watched working before you buy",
"Session 3, page 2"
],
[
"WHY BELIEVE IT",
"Every extra rupiah buys a function (the function-per-tier list); still a LEGO set, with decades of fit tolerance",
"Session 3, Promise → Proof, REAL rows"
],
[
"WHERE",
"Pre-order on LEGO.com or at two specialist hobby shops, Mon 1 – Sun 21 Feb 2027",
"Session 6, page 4, access"
],
[
"PRICE",
"Rp6,500,000",
"Session 5, page 4"
],
[
"WHAT WE ASK YOU TO DO",
"Pre-order the flagship before the window closes",
"Session 6, page 9, step 1"
],
[
"WHAT WE'RE BETTING ON",
"Hobbyists will pay the flagship premium once they've watched each function working.",
"Session 5, page 8 (your three bets), row 1"
]
],
"cardNotice": "The positioning still promises \"watched working before you buy\", and the demo is still PLANNED. Row 9 bets on that same demo. In Session 6 your card had eight rows. In Session 7 it gets a ninth, for the team only: the bet from Session 5, page 8, row 1.",
"check": [
[
"Page 2 (test plan)",
"Is there a bet, people from FOR WHOM, a DO or PAY action that can prove the bet wrong, and a number written before the test?",
"YES",
"Bet from Session 5; forum builders outside LEGO; a PAY deposit, with the DO gap to the card written; 15 of 60 written before the test."
],
[
"Page 4 (revision log)",
"Does every change have evidence, marked strong or weak, and is each change the size its evidence allows?",
"YES",
"One row, WEAK, a small change; the big question left to the demo."
],
[
"Page 5 (governance)",
"One name per decision, one master file and version rule, and a name for who must be asked before a creative asset changes?",
"YES",
"One name in row 1; master file and version rule; owners match Session 4, page 6."
],
[
"Page 9 (pitch view)",
"Is every step ✓ or ✗, each fixed ✗ fixed at its page, and every ✗ left in the box with why and by when?",
"NOT YET",
"Eight steps marked and both ✗ in the box, but the step that holds the positioning stays ✗ until the demo is held."
],
[
"The Concept Card",
"Do all nine rows come from their pages, and is row 9 kept from the person you test?",
"NOT YET",
"Every row comes from its page, but the positioning's proof is still PLANNED. Fix: hold the demo before the pre-order window (marketing lead, week of Mon 25 Jan 2027)."
]
],
"checkSub": "The four core pages and the card, read the way your submission is read. YES or NOT YET, with the evidence.",
"defence": "Your three defence questions come from your own pages, Sessions 1–7. An honest ✗ in the page 9 box is easier to defend than a ✓ you can't prove."
}
}
};
  var T = D.theory, C = D.cases;
  var NAMES = { jumbo: "Jumbo (before cinema release)", gojek: "Gojek / GoFood (pilot district)", marvel: "Disney/Marvel (Iron Man, before release)", lego: "LEGO Technic" };
  var CHIPS = { jumbo: "Jumbo", gojek: "Gojek / GoFood", marvel: "Disney/Marvel", lego: "LEGO Technic" };
  var K = { bet: "THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED", forwhom: "FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED",
    who: "WHO WE ASK", action: "WHAT WE ASK THEM TO DO · DO OR PAY", prediction: "OUR PREDICTION · BEFORE THE TEST", result: "RESULT (OPTIONAL)" };
  function tbl(label, rows) { return { label: label, cols: rows[0], rows: rows.slice(1) }; }
  function build(k, n) {
    var X = C[k], P = X["p" + n], ex = { name: NAMES[k], sub: P.sub, caveat: X.note, values: {} }, V = ex.values;
    if (n === 2) {
      ex.before = [{ label: "HOW TO USE THIS EXAMPLE", value: X.how }, { label: "CARRIED IN", value: X.carried }];
      Object.keys(K).forEach(function (id) { V["s7.p2." + id] = P.boxes[K[id]] || ""; });
    } else if (n === 4) {
      V["s7.p4.rows"] = tbl("STRATEGY REVISION LOG", P.tables[0]);
    } else if (n === 5) {
      var r = P.tables[0].slice(1);
      V["s7.p5.decides"] = r[0][1]; V["s7.p5.master"] = r[1][1]; V["s7.p5.ask_before"] = r[2][1];
      V["s7.p5.never"] = P.boxes["NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)"] || ""; V["s7.p5.adapt"] = P.boxes["MAY ADAPT (OPTIONAL)"] || "";
    } else if (n === 9) {
      /* tabel delapan langkah seperti WE (tanpa kolom ASK YOURSELF: pertanyaannya sudah ada di tiap langkah di atas) */
      var t9 = P.tables[0].map(function (row) { return [row[0], row[1], row[3], row[4]]; });
      ex.before = [{ label: "THE PITCH VIEW, CHECKED STEP BY STEP", value: tbl("", t9) }];
      V["s7.p9.cant"] = P.boxes["WHAT WE COULDN'T FIX YET"] || "";
    }
    ex.notice = P.notice;
    return ex;
  }
  function examples(n) { var o = {}; ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) { o[k] = build(k, n); }); return o; }
  function cardExamples() {
    var o = {};
    ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) {
      var X = C[k];
      o[k] = { chip: CHIPS[k], name: NAMES[k], how: X.how, rows: X.card, cardNotice: X.cardNotice,
        checkHead: "CHECK BEFORE YOU SUBMIT · " + X.checkSub, check: X.check, defence: X.defence, note: X.note };
    });
    return o;
  }
  function th(n, title) { return { title: "Page " + n + " · " + title, src: T[n].src, html: T[n].html }; }
  function opt(min) { return "<p><b class='k'>Halaman ini boleh dilewati.</b> " + min + " Tidak wajib dan tidak dinilai sendiri; kalau diisi, feedback membacanya dan pertanyaan defence boleh menanyakannya.</p>"; }

  CB.content.S7 = {
    caseDates: true, /* tanggal kasus 2027 di contoh WE dan slide 14 (LEGO); audit hanya menolak tanggal Nov/Des tanpa tahun */
    pages: {
      /* ================= hlm. 2 — Experiment Report Card (slide 7 · R1) ================= */
      2: {
        theory: th(2, "Experiment Report Card"),
        callout: "<b>ONE LADDER</b>&nbsp;&nbsp; <b>SAY</b> what people tell you.&nbsp; <b>DO</b> a small step that is easy to undo: a click, a sign-up, a free event, a refundable deposit.&nbsp; <b>PAY</b> giving something they would lose if they back out: money, time they booked, a phone number to be contacted, a recommendation.",
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> enam sesi kemarin kalian menulis apa yang kalian <b>percaya</b>; semuanya masih klaim. Page 2 adalah rencana untuk mencari tahu apakah klaim itu benar: taruhan baris 1 Sesi 5 diuji ke orang di baris FOR WHOM, dengan aksi DO atau PAY, dan angka ditulis <b>sebelum</b> melihat hasil. Old Spice mengajarkan dua hal: FOR WHOM adalah yang memutuskan membeli, belum tentu yang memakai; dan jutaan views itu SAY dalam skala besar, bukan bukti.</p>" +
          "<p>Uji di kelas adalah <b>latihan, bukan bukti</b>: teman sekelas bukan FOR WHOM-mu. Belum sempat menguji ke orang sungguhan? Tulis <b>Not tested yet</b> di RESULT. Itu jawaban jujur dan tidak mengurangi nilai; yang mengurangi nilai adalah hasil yang dikarang. Page 2 dibaca lagi di langkah 6 pitch view (page 9).</p>",
        examples: examples(2)
      },
      /* ================= hlm. 3 — Evidence Strength Matrix (slide 11 · R4, opsional) ================= */
      3: { theory: th(3, "Evidence Strength Matrix"), why: opt("Minimumnya sudah ada di page 4 (revision log), kolom STRONG / WEAK.") },
      /* ================= hlm. 4 — Strategy Revision Log (slide 8 · R2) ================= */
      4: {
        theory: th(4, "Strategy Revision Log"),
        callout: "<b>STRONG FINDING OR WEAK SIGNAL</b> · A small change (wording, an added fact on the card) may come from a weak signal, if the row says WEAK. A big change (audience, positioning, price) needs a strong finding.<br><b>REJECTED COUNTS THE SAME AS SUPPORTED</b> · A result that proved your bet wrong tells you what to stop doing. A row that says \"we were wrong, so we changed it\" is the most professional row on the page.",
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> silabus S7 meminta strategi direvisi <b>berdasarkan bukti</b>, bukan selera. Aturannya satu kalimat: <b>bukti lemah memperbaiki satu baris, bukti kuat mengubah satu hal yang didukungnya, tanpa bukti tidak ada baris.</b> Peloton: kritik ramai dan saham turun 9% itu SAY, mungkin bukan dari FOR WHOM, jadi tidak cukup untuk mengganti pesan utama. Ramai belum tentu bukti.</p>" +
          "<p>Perbaikan yang kamu temukan sendiri lewat cek page 9 juga dicatat di sini, dan selalu <b>WEAK</b>. Perubahan besar yang belum punya temuan kuat tidak masuk page 4: tulis di kotak WHAT WE COULDN'T FIX YET (page 9). Kartu tidak diubah langsung: ubah halaman asalnya, kartunya ikut berubah, lalu catat di sini. Page 4 juga salah satu bahan Leadership Log-mu.</p>",
        examples: examples(4)
      },
      /* ================= hlm. 5 — Brand Governance Matrix (slide 9 · R3) ================= */
      5: {
        theory: th(5, "Brand Governance Matrix"),
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> sesudah kursus selesai, siapa yang menjaga brand tetap sama? Peloton tetap menayangkan iklannya di tengah kritik: siapa yang memutuskan? Old Spice membalas orang di Twitter dengan 180+ video: siapa yang menyetujui tiap video sebelum tayang? Brand besar pun jarang membuka jawabannya (UNKNOWN). Kalian tidak boleh begitu: <b>satu keputusan, satu nama</b>. \"The team\" bukan nama; dua nama berarti tidak ada yang memutus.</p>" +
          "<p>Baris 2 memakai pemilik kode dari Sesi 4 page 6 (tampil di atas): kalau pemiliknya salah, ubah di sana. Baris 3 menjaga batas silabus §15: strategi milikmu, eksekusi kreatif milik creative stream. Kerja sendiri? Baris 3 tetap butuh satu nama, boleh dosen.</p>",
        examples: examples(5)
      },
      /* ================= hlm. 6 — Decision-Rights Matrix (slide 12 · R5, opsional) ================= */
      6: { theory: th(6, "Decision-Rights Matrix"), why: opt("Minimumnya sudah ada di page 5 (governance), baris 1 dan 3.") },
      /* ================= hlm. 7 — Brand Risk Register (slide 13 · R6, opsional) ================= */
      7: { theory: th(7, "Brand Risk Register"), why: opt("Minimumnya sudah ada di page 5 (governance), baris 1: siapa yang memutus. Promise → Proof Sesi 3 tampil di atas: setiap risiko di sini mematahkan salah satu janji itu.") },
      /* ================= hlm. 8 — KPI Dashboard (slide 14 · R7, opsional) ================= */
      8: { theory: th(8, "KPI Dashboard"), why: opt("Minimumnya sudah ada di Sesi 6, page 9 (KPI tree), yang tampil di atas.") },
      /* ================= hlm. 9 — Your pitch view: the final check (slide 15 · R8 + slide 16 · R9) ================= */
      9: {
        theory: th(9, "Your pitch view: the final check"),
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> ini <b>tugas akhir</b> kalian. Pitch view adalah satu cerita yang kalian serahkan, yang dibaca klien atau investor: tujuh langkah dari masalah sampai ajakan, ditarik otomatis dari halaman Sesi 1–7, ditambah identitas brand Sesi 4. Kalian tidak mengetik ulang. Tugasnya: di tiap langkah jawab pertanyaannya, <b>✓ atau ✗</b>.</p>" +
          "<p>✗ berarti: perbaiki di halaman asal (tautan \"ubah di halaman asal\" di tiap langkah), page 9 ikut berubah, lalu catat satu baris di page 4 dengan bukti WEAK, dan tulis di mana kamu memperbaikinya. Perbaikan besar yang belum punya bukti kuat jangan dipaksa: tulis di kotak <b>WHAT WE COULDN'T FIX YET</b>, apa yang akan dilakukan dan kapan. Halaman yang semuanya ✓ justru kurang dipercaya: ✗ yang jujur lebih mudah dipertahankan daripada ✓ yang tidak bisa dibuktikan.</p>" +
          "<p>Setiap putaran feedback membaca rantai yang sama, dan tiga pertanyaan defence diambil dari halaman kalian sendiri, Sesi 1–7; satu menanyakan rantai ini.</p>",
        examples: examples(9)
      }
    },
    /* ================= Concept Card sembilan baris ================= */
    card: {
      intro: "<p><b class='k'>Concept Card</b> dirakit otomatis dari halamanmu: tidak ada yang diketik di sini. Di Sesi 6 kartumu punya delapan baris. Di Sesi 7 kartu mendapat <b>baris kesembilan, khusus tim</b>: WHAT WE'RE BETTING ON, taruhan baris 1 dari Session 5, page 8 (your three bets). Baris ini sama dengan taruhan di page 2.</p>" +
        "<p>Kenapa disembunyikan dari orang yang diuji? Kalau orang itu melihat tebakan kita, ia menjawab tebakan kita, bukan bereaksi pada kartunya. Karena itu: <b>Unduh PDF kartu</b> = delapan baris, untuk ditunjukkan ke orang yang dites; <b>PDF kartu tim</b> = sembilan baris. Di <b>Layar penuh</b>, baris 9 tersembunyi sampai kamu menekan <b>Show the bet</b>, sesudah hasil uji.</p>" +
        "<p>Baris kosong tampil <b>not filled yet</b>: isi di halaman asalnya (tautan di tiap baris). Untuk mengubah satu baris, ubah halamannya, lalu catat perubahannya di page 4.</p>",
      examples: cardExamples()
    }
  };
})();
