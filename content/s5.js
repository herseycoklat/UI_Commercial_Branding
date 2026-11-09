/* content/s5.js — teks Sesi 5: teori, kenapa penting, deeper read, contoh empat kasus. Dibangun 9 Nov 2026.
 * Satu sumber (doc 82 §1, keputusan Fai 9 Nov butir 11 dan 13): teks teori per halaman = teks slide R deck
 * S5-Where_Does_the_Money_Come_From_v3.pptx (skrip gabungan v1, claude/Week4-Sesi5-skrip-gabungan-v1*.md):
 *   hlm. 2 = R1–R4 · hlm. 4 = R5–R7 · hlm. 8 = R8–R11 · hlm. 3 = R13 · hlm. 5 = R14 · hlm. 6 = R15 · hlm. 7 = R16 · hlm. 9 = R17
 *   · R12 = ringkasan halaman opsional (callout hlm. 3). Deeper read = slide T yang disetujui (T3, T6–T8, T12–T13).
 *   "Kenapa halaman ini penting" = SAY slide T1 / T5 / T11 (disetujui, dipakai apa adanya). Kotak "Filling page N in the HTML tool"
 *   = teks slide T4 / T10 / T14.
 * Contoh: data worked example S5 v3 apa adanya — Jumbo dari claude/84 (objek JUMBO), GoFood/Marvel/LEGO dari claude/84a
 *   (objek GOJEK, MARVEL, LEGO). Field `values` dibangun dari data itu oleh fungsi build() di bawah, supaya teks tidak diketik dua kali.
 *   Semua contoh = ILLUSTRATIVE RECONSTRUCTION. Tanpa tanggal kalender, tanpa kata Gate.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  /* ================= data worked example (verbatim) ================= */
  var Q = {
    p2: "For everything we give, can we point to the money that pays for it?",
    p4: "Is our price compared with what people already pay, and does one customer cover their cost?",
    p8: "What must be true, and how will we find out before it's too late?",
    chain: "Does page 8 come from what we marked earlier?"
  };
  var OPT = "Pages 3, 5, 6, 7 and 9 are optional. They are filled here so you can see them, not because you must.";

  var JUMBO = {
    key: "Jumbo",
    carried: "Carried in: Indonesian families with primary-school children are the primary audience; the child asks, the parent pays (Session 2). Positioning: the animated family film made by an Indonesian studio to world-class production standards; promise: a film made in Indonesia, at a quality that needs no apology (Session 3). The title is public and registered for entertainment only; the silhouette and palette have named owners (Session 4).",
    how: "Follow one thread across the three core pages. Page 2 finds a clash: merchandise money with nobody to make it. Page 4 labels every number (MEASURED, COMPARABLE, GUESS, UNKNOWN) and shows one survival line that works and one that can't be finished yet. Page 8 turns it into three bets: row 1 is tested with real parents before Session 7, and the name row is a check with a name and a date.\nPages 3, 5, 6, 7 and 9 are optional. They are filled here so you can see them, not because you must.",
    note: "ILLUSTRATIVE RECONSTRUCTION: every figure, status and owner here is built for teaching. None is Visinema's data, agreement or filing.",
    sub: {
      2: "Customer Segments and Value Propositions come from Sessions 2 and 3; the clash is resolved in writing.",
      3: "Two options. The second is rejected for a positioning reason, not a money reason.",
      4: "Four prices, four origins. Only two of them are ours to set.",
      5: "Every row written from the partner's side. Two rows are ASPIRATIONAL on purpose.",
      6: "The channel carrying most of the money is the one we control least.",
      7: "Six assets, two borrowed. Every open row has an action and an owner.",
      8: "Three rows. Row 1 is tested with real parents; the name row is a check.",
      9: "Milestone 1 contains no production and no promotion. It is all proving."
    },
    p2: { problem: "We don't know if ordinary Indonesian parents believe local animation can match imported quality; we have no outside-audience evidence yet. (Session 1)",
      KP: "National distributor · cinema exhibitors · schools · one family-brand co-promotion · Visinema as endorsing studio · streaming platform, after the cinema run · merchandise licensee: TO BE APPOINTED",
      KA: "Secure week-one screens through the distributor · weekly character content · deliver the co-promotion · run school screenings",
      KR: "The film · character IP · Visinema's endorsement · voice cast · the title: registered for entertainment, NOT for goods",
      VP: "Families who doubt a local film can match an imported one: an animated family film made in Indonesia, at a quality that needs no apology. The paying parent: 100 minutes everyone watches together. Schools: a relevant programme day.",
      CR: "One-off at the cinema. Ongoing only on our own channels (social lead, 6–8 hours a week). Schools: every year.",
      CH: "Cinema chains via the distributor → streaming after the cinema run → school screenings → merchandise via a licensee",
      CS: "Primary: Indonesian families with primary-school children; the child asks, the parent pays (Session 2). Secondary: schools. Later: streaming households.",
      COST: "Production (already spent) · promotion: GROWS with screens · cinema's share of each ticket: GROWS with the audience · music licences · social-content hours",
      REV: "PRIMARY: ticketing. Then: streaming licence · co-promotion · merchandise royalty (only if it works) · soundtrack (minor)",
      clash: "Revenue Streams has a merchandise royalty; Key Partners has no licensee to make it. What we did: kept the line, made it conditional and later (only once the title is registered for goods), and carried the name to page 8 (your three bets) as our name row.",
      sentence: "Families get a family film made in Indonesia, at world-class quality, through cinema chains, paying per ticket, while our promotion cost grows with every screen.",
      notice: "Read across, not down. The clash only shows because revenue and partners sit on one page; resolve it in writing instead of tidying it away." },
    p3: { A: ["Families pay once at the cinema. A streaming platform pays a licence fee after the cinema run. Merchandise follows only if the release works.", "Enough screens in week one for word of mouth to start (the cinema decides screens weekly). A platform still wants the film after the run. Promotion is affordable before any money arrives.", "Week-one screen counts of similar local animated releases; one distributor conversation on budgets. This is our viability row on page 8 (your three bets)."],
      B: ["Licence the finished film to a streaming platform for a fixed fee before release. Little or no cinema run.", "A platform pays enough to cover production, and we accept there will be no public box-office result.", "Rejected for positioning, not money. B is the safer option. But our claim is that an Indonesian studio can make a family film at world-class quality, and that needs a visible public release to be believed."],
      labelA: "OPTION A · CINEMA FIRST (CHOSEN)", labelB: "OPTION B · STREAMING DEAL FIRST (REJECTED)",
      primary: "\"We are primarily a TICKETING business, because our positioning needs a visible public release; a quiet release cannot prove it.\" The streaming fee is priced by the box office, the co-promotion is sold on the release, and merchandise exists only if the release works.",
      notice: "A positioning sentence written weeks ago just rejected the safer option. That is what positioning is for." },
    p4: { rows: [["Cinema ticket", "SET BY THE CINEMA: not ours", "Weekday and weekend national-chain prices, publicly listed", "Lower end of comparable local animated releases", "Price: COMPARABLE (public listings). Volume: COMPARABLE, to confirm with the distributor"],
        ["School screening package", "Rp2,500,000 per screening", "What schools already budget for an external programme day", "12 screenings in six months", "Price: COMPARABLE (one school + two published rates). Volume: GUESS"],
        ["Character tee", "Rp150,000", "Printed tees around campus and malls: Rp90,000–120,000", "200 in the first three months", "Price: COMPARABLE (five shops checked). Volume: GUESS"],
        ["Co-promotion package", "UNKNOWN", "No reference we trust yet", "One partner, one release window", "UNKNOWN. Action: ask the distributor for two comparable fees. Owner: PM, within 2 weeks"]],
      line: "Our character tee is ABOVE the reference, because the character design is exclusive and our positioning promises a film made by an Indonesian studio to world-class standards. The cinema ticket is set by the cinema, so it sits AT the reference.",
      survival: "School screening: Rp2,500,000 in, about Rp600,000 out (travel, licence admin, host) plus 8 hours of our time. Positive, and still positive at 12 screenings. Merchandise: not finished. The licensee's share is unknown because there is no licensee yet, so we wrote UNKNOWN, owner PM, instead of inventing a margin.",
      notice: "The co-promotion row is the one to copy for an honest UNKNOWN: it still has an action, an owner and a time limit." },
    p5: { rows: [["Distributor", "Screens, bookings, promotion advice", "A fee and a share of a title with a ready family audience", "CONTACTED"],
        ["Cinema exhibitors", "Screens and showtimes, including weekend family matinees", "Content for the hardest slot to fill: weekend daytime family sessions", "IDENTIFIED: reached through the distributor"],
        ["Schools", "Word of mouth; trust with parents", "An affordable, relevant programme day with a discussion pack", "CONTACTED: one school, priced on page 4 (pricing)"],
        ["Family-brand co-promotion", "Media and in-store presence we could never buy", "A wholesome local title, plus character assets for their campaign", "IDENTIFIED: two candidates passed the brand-fit filter"],
        ["Streaming platform", "A licence fee and long-tail reach after the cinema run", "A local family title with a proven result", "ASPIRATIONAL: on purpose, later, from a stronger position"],
        ["Merchandise licensee", "Making, selling and stock risk", "Character rights, once the title is registered for goods", "ASPIRATIONAL: waits on the name row, page 8 (your three bets)"]],
      box: ["THE BRAND-FIT FILTER WE ADDED", "A co-promotion partner must not contradict the world-class half of our positioning: no partner whose own price position is \"the cheapest in its category\". The filter removed one of four candidates."],
      notice: "ASPIRATIONAL is used twice, for two reasons: one is timing (we will be stronger later), one is a dependency (we are not allowed yet)." },
    p6: { rows: [["Cinema chains", "Highest", "Promotion up front, plus the cinema's share of each ticket; both grow with screens", "LOW: screens re-decided weekly"],
        ["Streaming, after the run", "High, long-lived", "A share or a flat fee", "NONE: placement is the platform's"],
        ["School screenings", "Low, but repeatable", "About 8 hours per screening (community lead)", "HIGH"],
        ["Merchandise retail", "Medium, depends on the licensee", "Licensee's margin: UNKNOWN", "LOW"],
        ["Own social channels", "Smallest today, the only one that compounds", "6–8 hours a week (social lead)", "HIGH"]],
      box: ["THE FINDING, AND WHAT WE CHANGED", "Our money depends on weekly decisions by people outside the team, and the two channels we fully control carry almost no money. So our own channel got a named owner and costed hours now, before we need it."],
      notice: "We wrote NONE for the platform, not LOW. Rounding NONE up to LOW changes what the page is for." },
    p7: { rows: [["Character designs", "Studio art team", "Visinema, under employment terms", "Owned; contract wording TO CHECK (producer, 2 weeks)", "Low, if the contracts say what we believe"],
        ["Screenplay", "Credited writer", "Visinema", "Owned, commissioned in writing", "Low"],
        ["Original score", "Composer", "NOT YET AGREED", "Work-for-hire or licence? Action: read or sign an agreement (producer, 2 weeks)", "Medium: every reuse in trailers and merchandise"],
        ["Title \"Jumbo\"", "—", "Visinema", "Registered for entertainment (class 41, Session 4 check). NOT filed for clothes and toys. Action: class search, then a filing decision (PM, 2 weeks)", "HIGH: first to file wins"],
        ["Logo font", "Licensed font", "Font company", "Personal use only; commercial use NOT CHECKED. Action: buy the licence or change the font (design lead, 2 weeks)", "Medium, cheap to fix now"],
        ["Voice performances", "Cast", "Film use agreed; other reuse NOT YET AGREED", "Action: add a reuse clause at the next cast meeting (producer)", "Medium"]],
      box: ["THE LINK TO OUR MONEY", "The merchandise royalty depends on the title being registered for clothes and toys, which isn't filed yet, in a first-to-file system. That is our name row on page 8 (your three bets)."],
      notice: "Trademark statuses here are illustrative, not verified filings. Copy the structure and the honesty, not the statuses." },
    p8: { rows: [["1 · TESTED BEFORE SESSION 7", "Desirability", "We bet parents will pay for the cinema rather than wait for streaming. If we're wrong: a child asking is not a parent paying, and ticket sales, our PRIMARY, fall short.", "Ten short interviews with parents outside the team", "PM, before Session 7"],
        ["2 · NAME ROW (A CHECK)", "Legal", "We bet the title is still ours to register for clothes and toys. If we're wrong: another company files first, and the merchandise line and any licensee disappear.", "Search the title in DJKI's trademark database (classes 25 and 28), then decide whether to file", "PM, within 2 weeks"],
        ["3", "Viability", "We bet an affordable promotion budget still buys enough cinema screens in week one. If we're wrong: admissions fall short and ticketing, our PRIMARY, is what fails.", "One conversation with the distributor about budgets and ticket sales of similar local films", "Producer, within 2 weeks"]],
      notOn: "NOT ON THIS PAGE, AND WHY · the composer agreement (an action on page 7, IP) · the merchandise licensee (waits on row 2) · 200 tees (a GUESS that only matters once row 2 is settled) · the co-promotion fee (an action on page 4, pricing).",
      notice: "Row 1 was picked because it can be tested with real parents in two weeks and the answer would change a decision. The name row is not tested on anyone: one person checks it, by a date." },
    p9: { m: [["MILESTONE 1 · MONTHS 0–2: PROVE", "Run the ten parent interviews (row 1). Settle ownership: the title search and filing decision, the composer agreement, the font licence. Nothing here is production; all of it is proving."],
        ["MILESTONE 2 · MONTHS 2–4: RELEASE", "Release. Track real ticket sales against page 4 (pricing), and record the week-one screens we were actually given. The model meets its first real number."],
        ["MILESTONE 3 · MONTHS 4–12: BUILD", "Negotiate streaming with a box-office result in hand. Approach licensees only if the title is registered for goods; if neither of two licensees is interested by month 3, drop merchandise."]],
      notice: "The release, the thing everyone wants to plan first, is placed second. Cheap checks come first." },
    check: [["Page 2 (canvas)", "For everything we give, can we point to the money that pays for it?", "YES", "Customer Segments and Value Propositions trace to Sessions 2 and 3; PRIMARY = ticketing; one clash written with what we did."],
      ["Page 4 (pricing)", "Is our price compared with what people already pay, and does one customer cover their cost?", "YES", "Four rows, four origins; the tee is ABOVE the reference, with a positioning reason; school screening positive; merchandise UNKNOWN with an owner."],
      ["Page 8 (your three bets)", "What must be true, and how will we find out before it's too late?", "YES", "Three rows; row 1 tested with real parents before Session 7; the name row is a check (PM, within 2 weeks)."],
      ["The chain", "Does page 8 come from what we marked earlier?", "YES", "Row 1 ← our Session 1 problem; row 2 ← the page 2 clash and our Session 4 name; row 3 ← our PRIMARY on page 2."]],
    open: "STILL OPEN, EACH WITH AN OWNER · co-promotion fee (PM) · licensee's share of merchandise (PM) · composer agreement (producer) · font licence (design lead). Open is fine; ownerless is not."
  };

  var GOJEK = {
    key: "Gojek",
    carried: "Carried in: existing GoRide riders in Jakarta are the primary audience (Session 2). Positioning: the food-ordering service that lives inside the app they already use; promise: anything new inside Gojek works the same way rides already do (Session 3). Branded house: one name, one trust account; the combined \"GoFood\" mark is not searched yet (Session 4).",
    how: "Follow one thread across the three core pages. Page 2 has three segments, and only two of them pay us. Page 4 shows a survival line that is positive for a family basket and negative for a single item, so more orders is not automatically good news. Page 8 turns it into three bets: row 1 is tested with real riders before Session 7, and the name row is a check with a name and a date.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION: every figure, rate, status and owner here is built for teaching. None is Gojek's data, agreement or filing.",
    sub: {
      2: "Customer Segments and Value Propositions come from Sessions 2 and 3. Three segments: two pay us, one is paid by us.",
      3: "Two options that raise similar money. The second is rejected for a positioning reason.",
      4: "Four rows, four origins. Two of the rates are set by someone else.",
      5: "Every row written from the partner's side. The rider evidence is still open.",
      6: "The reverse of Jumbo: our biggest channel is one we fully control.",
      7: "Six assets. The link-to-money test comes back clean.",
      8: "Three rows. Row 1 is tested with real riders; the name row is a check.",
      9: "Milestone 1 contains no growth spending. It is all measuring."
    },
    p2: { problem: "We don't know if people who trust Gojek for rides will actually trust the same app with their food orders; that trust transfer is assumed, not proven. (Session 1)",
      KP: "Merchants, from warungs to chains · driver-partners · GoPay and the banks behind it · co-promotion brands: filtered first (page 5, partners) · cloud kitchens: later",
      KA: "Match orders to nearby drivers · onboard merchants · run promos and driver incentives · handle failed orders (owner: customer ops)",
      KR: "The Gojek name and its trust · driver density in Jakarta · the merchant list · saved addresses and GoPay · the home screen",
      VP: "Riders who want food with the same effort as booking a ride: the food-ordering service that lives inside the app they already use. Merchants: orders without hiring drivers. Drivers: jobs between rides.",
      CR: "Per order, no contract. Continuity comes from the saved address and the GoPay balance, not from points. Chains get an account manager.",
      CH: "The GoFood entry in the Gojek app → push and in-app messages → merchant stickers → district launches",
      CS: "Primary: existing GoRide riders in Jakarta (Session 2); buyer and user are the same person. Also on the canvas: merchants (pay us) and drivers (we pay them).",
      COST: "Driver incentive: GROWS with every order · promo vouchers: GROW with orders · support for failed orders: GROWS · merchant onboarding hours · payment processing",
      REV: "PRIMARY: commission on each completed order (the merchant pays). Then: our share of the delivery fee · promoted merchant placement · voucher packs (minor)",
      clash: "Value Propositions promise food that works like a ride; Key Activities had nothing for the moment an order fails, and in a branded house that failure lands on GoRide and GoPay too. What we did: added failed-order handling as an activity with an owner (customer ops).",
      sentence: "Riders get food inside the app they already use, through the GoFood entry on their home screen, paying per order, while our driver incentive grows with every order.",
      notice: "Read the three segments together: two pay us, one is paid by us, and the one we pay is the cost that grows with every order." },
    p3: { A: ["Merchants pay a commission on each completed order. The rider pays the food price plus a delivery fee by distance, and nothing else at checkout.", "Merchants get enough extra orders to accept the commission. Each order still makes money at the basket sizes we actually get (page 4, pricing).", "Contribution per order by basket size, from pilot-district orders. This is our viability row on page 8 (your three bets)."],
      B: ["Cut the merchant commission and add a visible service fee to the rider's bill at checkout.", "Riders accept a new line on the bill at the exact moment they decide whether the order is worth it.", "Rejected for positioning, not money: both raise similar amounts. Our promise is that anything new works the way rides do, and a ride has no surprise fee at the end."],
      labelA: "OPTION A · MERCHANT COMMISSION (CHOSEN)", labelB: "OPTION B · RIDER SERVICE FEE (REJECTED)",
      primary: "\"We are primarily a COMMISSION business, because we are paid only when the order we enabled arrives, which keeps us and the merchant pointed the same way.\" The delivery-fee share, promoted placement and voucher packs all grow from the same orders. The commission band is platform policy, not a GoFood decision.",
      notice: "Two options that raise the same money are not the same model. The difference is where the rider feels it, and the positioning decided where." },
    p4: { rows: [["Commission per order", "SET BY PLATFORM POLICY: a band, not ours", "What merchants already give other marketplaces", "Pilot-district orders per merchant per day", "Rate: about 20% + Rp1,000, the standard scheme Gojek has named publicly (COMPARABLE). Volume: COMPARABLE (pilot orders, illustrative)"],
        ["Delivery fee to the rider", "By distance, the same as a GoRide trip", "The GoRide fare for the same distance, already in the rider's head", "Average trip distance per district", "Price: COMPARABLE (our own ride fares). Volume: COMPARABLE"],
        ["Average basket", "Rp150,000 family · Rp25,000 single item", "What riders pay at the counter of the same warung", "The mix of the two: UNKNOWN", "Basket sizes: GUESS. Mix: UNKNOWN. Action: count it from pilot orders. Owner: finance lead, within 2 weeks"],
        ["Driver incentive per order", "Rp12,000, set weekly by district", "No outside reference: it follows driver supply", "Every order carries one", "GUESS, and the largest cost on the page"]],
      line: "Our delivery fee is AT the reference, because our positioning is that GoFood lives inside the app riders already use: the same distance should cost what a ride already costs them. The commission is set by platform policy, so it isn't ours to place.",
      survival: "Family basket: Rp31,000 commission − Rp12,000 driver incentive − about Rp2,500 payment and support = about +Rp16,500. Single item: Rp6,000 − Rp12,000 − about Rp1,250 = about −Rp7,250. Break-even is a basket of about Rp63,000, so our mix decides whether growth helps. The mix is UNKNOWN (finance lead).",
      notice: "A negative line at small baskets is not a failure of the model; not knowing where zero sits would be. The driver incentive is marked GUESS on purpose: it is the biggest number and the least evidenced." },
    p5: { rows: [["Warung merchants", "Menu, kitchen and the food itself", "Orders they couldn't reach, with no drivers to hire", "CONTACTED: pilot district (illustrative)"],
        ["Chain merchants", "Several outlets and consistent menus", "A second storefront with no new rent", "CONTACTED: through account managers"],
        ["Driver-partners", "Vehicles, time and street knowledge", "Paid jobs between rides, in the app they already use", "CONTACTED: but no interviews with riders outside the team yet"],
        ["GoPay and its banks", "Payment, settlement, fraud checks", "Transactions that keep the balance in the app", "IDENTIFIED: terms handled by the parent"],
        ["Co-promotion brands", "Media spend and samples in the bag", "A basket at the moment of purchase", "IDENTIFIED: two passed the filter below"],
        ["Cloud kitchens", "Kitchens where demand has no supply", "Order flow from day one, which we can't promise yet", "ASPIRATIONAL: waits on the basket mix, page 4 (pricing)"]],
      box: ["THE PARTNER FILTER WE ADDED", "In a branded house, a partner's mistake reads as ours on the same screen. So: no co-promotion partner whose own delivery we can't see. A sample that arrives wrong is read as GoFood arriving wrong. One of three candidates failed."],
      notice: "The driver row is CONTACTED and still carries an open item. Status describes the relationship, not the evidence; keep the two apart." },
    p6: { rows: [["GoFood entry in the Gojek app", "Highest: riders already have the app", "No acquisition cost. The real cost is home-screen space shared with GoRide and GoPay, argued monthly (GoFood product lead)", "HIGH"],
        ["Push and in-app messages", "High and immediate", "Rider patience, shared by every Gojek service: capped at an agreed frequency (marketing lead)", "HIGH"],
        ["Merchant stickers and signage", "Medium, local", "Print plus about 3 hours per merchant, GUESS (ops lead)", "HIGH"],
        ["Paid social for district launches", "Medium, buyable", "Rupiah per launch; it stops working when the payment stops", "LOW"],
        ["Drivers talking to merchants", "Low each, large together", "Driver goodwill, spent elsewhere when incentives fall", "MEDIUM"]],
      box: ["THE FINDING, AND WHAT IT COSTS THAT ISN'T MONEY", "The opposite of Jumbo: our biggest channel is one we fully control. We still didn't write \"free\". It costs attention on a shared home screen, decided monthly against two sibling services."],
      notice: "Same matrix, opposite shape to Jumbo. Both teams found their real exposure in the cost column, not by adding more rows." },
    p7: { rows: [["\"GoFood\" combined mark and logo", "—", "Gojek", "NOT SEARCHED (Session 4 check). Action: legal counsel searches the combined mark and confirms the filing route (asked by the GoFood product lead, 2 weeks)", "Medium: \"Food\" alone can't be protected"],
        ["Gojek parent mark", "—", "Gojek", "Assumed registered; legal counsel confirms with the row above", "Low: it is what GoFood borrows"],
        ["App screens and ordering code", "In-house product team", "Gojek, under employment terms", "Owned. Open-source parts listed with their licences", "Low"],
        ["Merchant menu photos", "Merchants or Gojek photographers", "Mixed", "Listing use: covered. Campaign use: NOT YET AGREED. Action: add a reuse clause at the next agreement revision (legal)", "Medium: campaigns, not revenue"],
        ["Order and route data", "Generated by use", "Gojek, under platform terms", "Internal use covered. Selling insights to merchants: basis UNKNOWN (product lead, before any build)", "Medium: a future line, not today's"],
        ["Campaign music and stock footage", "Licensed suppliers", "Suppliers", "Licensed per campaign; scope checked at the brief", "Low"]],
      box: ["THE LINK TO OUR MONEY", "Does any line of money depend on a right we don't hold? Commission needs only the merchant agreement; promoted placement uses photos under the listing licence we have. So no: the open rows touch campaigns and a future product, not today's money."],
      notice: "Seeing the test pass is as useful as seeing it fail. The question is not \"is anything open?\" but \"does money depend on something open?\"" },
    p8: { rows: [["1 · TESTED BEFORE SESSION 7", "Desirability", "We bet riders will order food in the app without a voucher, at a basket above about Rp63,000. If we're wrong: we pay to grow orders that lose money, and commission, our PRIMARY, never covers the driver incentive.", "Ten short interviews with GoRide riders outside the team about their last food order: what, how much, voucher or not", "GoFood product lead, before Session 7"],
        ["2 · NAME ROW (A CHECK)", "Legal", "We bet the combined \"GoFood\" mark and logo can be registered under the Gojek family. If we're wrong: anyone can trade on \"food\" next to our green, and the branded house leaks.", "Legal counsel searches the combined mark in DJKI's database and confirms the filing route", "GoFood product lead with legal counsel, within 2 weeks"],
        ["3", "Viability", "We bet our real basket mix keeps the average order above zero. If we're wrong: every extra order makes the loss larger.", "Count pilot-district orders by basket size and compute the line on page 4 (pricing)", "Finance lead, within 2 weeks"]],
      notOn: "NOT ON THIS PAGE, AND WHY · merchant photo reuse (an action on page 7, IP; no money depends on it) · cloud kitchens (wait on row 3) · peak-hour driver supply (an ops measure, not a bet yet) · home-screen space (a monthly decision, page 6, channels).",
      notice: "Rows 1 and 3 look alike and aren't: row 1 asks whether riders order this way; row 3 asks whether the orders we already have make money. Merged, you couldn't tell which one broke." },
    p9: { m: [["MILESTONE 1 · MONTHS 0–2: PROVE", "Run the ten rider interviews (row 1). Count orders by basket size and publish the number (row 3). Get the trademark answer (row 2). No district-launch spending until row 3 has an answer."],
        ["MILESTONE 2 · MONTHS 2–4: MEASURE", "Run one week without vouchers in one district and read the drop in orders. Measure unassigned orders at lunch and dinner peaks. The model meets numbers we didn't choose."],
        ["MILESTONE 3 · MONTHS 4–12: GROW", "Grow only in districts and basket sizes proven positive. Open promoted placement with a cap per district. If orders collapse without vouchers, rewrite the growth plan before funding it."]],
      notice: "Growth spending is placed last on purpose. Spending to win orders before knowing which orders pay looks like progress on every dashboard while it happens." },
    check: [["Page 2 (canvas)", Q.p2, "YES", "Customer Segments and Value Propositions trace to Sessions 2 and 3; PRIMARY = commission; three segments with who pays whom; one clash written with what we did."],
      ["Page 4 (pricing)", Q.p4, "YES", "Four rows, four origins; two rates marked as not ours; the delivery fee is AT the reference with a positioning reason; survival line written both ways, break-even basket stated, mix UNKNOWN with an owner."],
      ["Page 8 (your three bets)", Q.p8, "YES", "Three rows; row 1 tested with real riders before Session 7; the name row is a check (product lead with legal counsel, within 2 weeks)."],
      ["The chain", Q.chain, "YES", "Row 1 ← our Session 1 problem (trust transfer, untested); row 2 ← our Session 4 name check; row 3 ← the survival line on page 4 (pricing)."]],
    open: "STILL OPEN, EACH WITH AN OWNER · basket mix (finance lead) · merchant photo reuse (legal) · order-data basis (product lead) · home-screen space (GoFood product lead).",
    checkNotice: "Every answer is YES, and the survival line is still negative for a single item. Both are true: a page is finished when the honest number is written, not when the number is good."
  };

  var MARVEL = {
    key: "Marvel",
    carried: "Carried in: general moviegoers who don't know the character are the primary audience (Session 2). Positioning: the superhero film that works completely on its own; promise: you can start here (Session 3). Endorsed brand, with the universe layer kept off public materials; \"Iron Man\" is UNKNOWN in the film and goods classes (Session 4).",
    how: "Follow one thread across the three core pages. Page 2 finds two boxes describing the same characters in two roles: what we own, and what secures the loan. Page 4 writes a survival line that is negative across the whole comparator band. Page 8 turns it into three bets: row 1 is tested with real moviegoers before Session 7, and row 3 is a rule written before release, not after.\nThis case also has one honest NOT YET on the last slide. Pages 3, 5, 6, 7 and 9 are optional; they are filled here so you can see them.",
    note: "ILLUSTRATIVE RECONSTRUCTION of Marvel Studios before Iron Man's release. Figures marked reported or secondary data are public (sources in the worked example's speaker notes); every other figure, status and owner is built for teaching.",
    sub: {
      2: "Customer Segments and Value Propositions come from Sessions 2 and 3; two boxes describe the same asset.",
      3: "Two options. The chosen one keeps the upside and carries the downside.",
      4: "Four rows. The cinema sets the ticket; the firmest number is a cost.",
      5: "Every row written from the partner's side. One row records what we can't use.",
      6: "Every channel that carries money belongs to someone else.",
      7: "Six assets. The characters that fund the slate also secure the loan.",
      8: "Three rows. Row 1 is tested with non-readers; row 3 is a rule to write now.",
      9: "Milestone 1 contains no production. It writes the rule the plan is missing."
    },
    p2: { problem: "We have no box-office evidence that a lesser-known Marvel character can headline a film; we rely on comic sales, not film demand. (Session 1)",
      KP: "Distributor (Paramount) · cinemas, through the distributor · toy and clothing licensees · lenders behind the slate facility · studios holding Spider-Man and X-Men: NOT AVAILABLE",
      KA: "Deliver film one on budget · plan the next films while film one is unproven · time licensing to the release · keep the universe off posters (S4 rule)",
      KR: "Iron Man film rights · film rights to ten other characters, pledged for the facility · the comic library · creative leadership",
      VP: "Moviegoers who want a blockbuster without homework: the superhero film that works completely on its own; you can start here. Licensees: a character with film-scale marketing. Distributor: a tentpole without production risk.",
      CR: "One-off at the cinema. Ongoing with licensees. Ongoing with the audience ONLY if a second film exists.",
      CH: "Cinemas via the distributor → home video → TV → toys and clothing at retail → comics and conventions (owned)",
      CS: "Primary: general moviegoers who don't know the character (Session 2). Secondary: comic readers, who come anyway. Also paying: licensees and the distributor.",
      COST: "Making film one (about $150M, reported) · marketing (about $75M, reported), shared with the distributor · interest on the facility: runs whether or not the film works · development of later films",
      REV: "PRIMARY: ticketing, after the distribution fee. Then: licensing royalties · home video · TV · later, sequels",
      clash: "Key Resources list ten characters as what we own; Cost Structure has a facility secured against those same characters. A weak film one hits revenue and collateral at once. What we did: we couldn't resolve it on this page, so we carried it to page 8 (your three bets) as row 3.",
      sentence: "Moviegoers get a superhero film they can start with, through cinemas, paying per ticket, while interest on the facility runs whether or not the film works.",
      notice: "This clash isn't a missing box: it is two boxes describing the same asset in two roles. Only reading across shows it." },
    p3: { A: ["Make the films ourselves with a facility secured against other characters' film rights, and pay a studio to distribute. We keep the upside, the sequels and the licensing.", "Film one earns enough to make film two fundable. Licensees commit before the result is known. The facility stays available for a slate, not one film.", "The comparator band (Hellboy, Blade) against the survival line on page 4 (pricing). This is row 3 on page 8 (your three bets)."],
      B: ["License each character to an established studio for a fee and a small share, carrying no production risk.", "Someone else wants each character, and we accept that they decide what the character becomes and who it's for.", "Rejected for positioning, not money. A studio renting the character decides who the film is for; our claim, a film that works completely on its own, needs us to make that decision."],
      labelA: "OPTION A · MAKE THE FILMS OURSELVES (CHOSEN)", labelB: "OPTION B · KEEP LICENSING CHARACTERS OUT (REJECTED)",
      primary: "\"We are primarily a TICKETING business for now, because our positioning has to be proven in one film anyone can start with.\" Royalties, home video and TV follow the same release. The distributor sets the date, cinemas set the screens, and licensees commit before anyone knows if the film works.",
      notice: "Choosing the option with a real downside obliges you to describe the downside. B had none to write; A does, and it is row 3." },
    p4: { rows: [["Cinema ticket", "SET BY THE CINEMA: not ours", "Summer-release prices, publicly listed", "Admissions at the low end of the comparator band", "Price: COMPARABLE (public listings). Volume: COMPARABLE (Hellboy, Blade; secondary data)"],
        ["Licensing royalty", "A percentage of licensee wholesale, by category", "The standard character-licensing band, which licensees know better than we do", "Launch wave only; later waves depend on film one", "COMPARABLE (illustrative). Timing fixed: products ship with the release"],
        ["Home video and TV windows", "Set by window convention and buyers", "What comparable titles earned in the same windows", "One cycle per film", "COMPARABLE (illustrative), and it follows the box office"],
        ["Slate facility", "Interest on drawn funds: the one price we negotiated", "Secured-lending rates at the time", "Drawn across the slate", "Contracted: the nearest thing to MEASURED. It runs whether or not film one works"]],
      line: "Our royalty is AT the standard band, because licensees know the band and won't pay above it for a character they don't know yet. The cinema ticket is set by the cinema, so it sits AT the reference.",
      survival: "Film one: about $150M to make and about $75M to market (reported). If cinemas keep about half of every ticket (GUESS), the film needs roughly $450M worldwide before it can fund film two. The comparator band, Hellboy $99.8M and Blade $131.2M (secondary data), sits far below that line: negative across the whole band.",
      notice: "The firmest number on this page is an interest rate, and it keeps running when everything else pauses. A page whose firmest number is a cost is telling you where the risk lives." },
    p5: { rows: [["Distributor (Paramount)", "Release dates, cinema relationships, marketing muscle", "A fee and a summer tentpole, without the production risk", "CONTACTED: terms for the first films"],
        ["Cinemas", "Screens and summer dates", "A four-quadrant title in the strongest weeks of the year", "IDENTIFIED: reached through the distributor"],
        ["Toy and clothing licensees", "Making, selling and stock risk", "A character with film-scale marketing, on shelves the same month", "CONTACTED: launch wave committed before the result (illustrative)"],
        ["Lenders behind the facility", "The money that makes self-financing possible", "Interest, and security over ten characters' film rights", "CONTACTED: page 7 (IP) shows what they hold"],
        ["Comic readers and conventions", "The only audience we reach without buying access", "Early sight of what's coming", "CONTACTED: owned"],
        ["Studios holding Spider-Man and X-Men", "Nothing available to us", "Nothing we can offer them", "ASPIRATIONAL: recorded so the gap stays visible"]],
      box: ["WHY WE KEPT A ROW WE CAN'T USE", "The crossover plan is drawn from a character list. A list that silently leaves out the unavailable characters will be read later as a list of options. A row saying \"not available\" prevents that mistake."],
      notice: "Recording what you can't have is part of a partnership map. The row with no real GET is doing more work than most of the rows with one." },
    p6: { rows: [["Cinemas, via the distributor", "Highest by far", "Distribution fee, our share of marketing, and the cinema's share of every ticket", "LOW: dates and screens are theirs"],
        ["Toys and clothing at retail", "High, visible for months", "Licensee and retail margin; our cost is approvals", "LOW: shelf space decided before opening"],
        ["Home video and TV", "High, long-lived", "Window terms set by convention and buyers", "NONE: we supply, they schedule"],
        ["Comics and conventions", "Smallest, by far", "Editorial and event hours (publishing lead)", "HIGH: the only one we direct"],
        ["Trailers and key art", "High when the distributor pushes them", "Production cost, and a slot in a schedule we don't set", "MEDIUM"]],
      box: ["THE FINDING, AND WHY THE SMALLEST CHANNEL IS FUNDED", "Every channel that carries money is controlled by a partner who decides before our result is known. Comics and conventions are the smallest, and the only one that still reaches someone if film one disappoints. So it is staffed now."],
      notice: "A channel can be worth funding for what it protects rather than what it earns. Say so out loud instead of defending a line nobody can justify on revenue." },
    p7: { rows: [["Iron Man film rights", "—", "Marvel", "Owned; reacquired from New Line (2005). Not part of the facility's security", "Low: the one character we hold free and clear"],
        ["Film rights to ten other characters", "—", "Marvel", "Held, AND pledged as security for the slate facility", "HIGH: the asset that funds the plan is the one at risk if it misses"],
        ["\"Iron Man\" name and helmet as marks", "—", "Marvel", "Classes 41, 25, 28: UNKNOWN (Session 4 check). Action: studio legal counsel searches (2 weeks)", "HIGH for the royalty line"],
        ["Spider-Man, X-Men", "—", "Film rights at Sony and Fox", "NOT AVAILABLE under current agreements", "A limit: it bounds which crossovers can exist"],
        ["Cast options for later films", "Cast", "NOT YET AGREED beyond film one", "Action: negotiate before any public promise of a sequel (business affairs)", "HIGH for later films, not for film one"],
        ["Original score", "Composer", "Commissioned", "Film and trailer use held; merchandise use TO CONFIRM (music supervisor)", "Low"]],
      box: ["THE LINK TO OUR MONEY", "The royalty line depends on marks that are UNKNOWN in the goods classes: that is our name row. The slate depends on characters that also secure the loan, so a weak film one hits revenue and collateral at once: that is row 3."],
      notice: "Rows on page 2 (canvas) and page 7 (IP) describe the same characters in two roles. Spotting that one asset plays two parts is the skill this case teaches." },
    p8: { rows: [["1 · TESTED BEFORE SESSION 7", "Desirability", "We bet moviegoers who don't read comics will buy a ticket for a hero they don't know. If we're wrong: box office lands inside the comparator band, and ticketing, our PRIMARY, can't fund film two.", "Show the trailer to ten moviegoers outside the team who don't read comics; ask what the film is about and whether they'd buy a ticket", "Marketing lead, before Session 7"],
        ["2 · NAME ROW (A CHECK)", "Legal", "We bet \"Iron Man\" can be held as a mark for toys and clothing, not only for film. If we're wrong: the licensing royalty on page 3 (revenue models) has nothing to license.", "Search \"Iron Man\" in DJKI's database in classes 25 and 28, with class 41 from Session 4", "Studio legal counsel, within 2 weeks"],
        ["3", "Viability", "We bet film one earns enough to fund film two. If we're wrong: the slate stalls, and the facility secured against ten characters' film rights comes under pressure at the same moment.", "Write one rule now: the box-office result at which film two is paused, checked against the comparator band", "Studio head with finance, within 2 weeks"]],
      notOn: "NOT ON THIS PAGE, AND WHY · cast options (an action on page 7, IP; it matters for film two, not film one) · the second licensee wave (waits on row 1) · production capacity (a planning check, not a bet) · the royalty reason (a fix on page 4, pricing).",
      notice: "Row 3 is a check, not an experiment: a film can't be tested before it exists. What a team can do before release is write the rule, so nobody argues it away after the opening weekend." },
    p9: { m: [["MILESTONE 1 · MONTHS 0–2: PROVE", "Run the ten trailer conversations with non-readers (row 1). Get the class search (row 2). Write the pause rule for film two (row 3). Nothing here is production; all of it is the reasoning the plan is missing."],
        ["MILESTONE 2 · MONTHS 2–4: RELEASE", "Release film one. Read the opening against the comparator band and against the rule, and read retail sell-through against the licensee launch wave. The first real number in a plan built on comparators."],
        ["MILESTONE 3 · MONTHS 4–12: BUILD", "Greenlight film two only against the written rule, not the mood of the week after release. Negotiate cast options before any public promise. Open the second licensee wave on terms that depend on the result."]],
      notice: "Milestone 1 isn't preparation for the plan; it's the part of the plan that is missing. The rule has to exist before the opening weekend, or it will be argued away after." },
    check: [["Page 2 (canvas)", Q.p2, "YES", "Customer Segments and Value Propositions trace to Sessions 2 and 3; PRIMARY = ticketing; one clash (the same characters as resource and collateral) carried to page 8 (your three bets) as row 3."],
      ["Page 4 (pricing)", Q.p4, "NOT YET", "Four rows, four origins; survival line written and negative across the comparator band. But the royalty's AT reason comes from the licensing market, not our positioning. Fix: rewrite it from \"works completely on its own\", or mark it GUESS (licensing lead, within 2 weeks)."],
      ["Page 8 (your three bets)", Q.p8, "YES", "Three rows; row 1 tested with non-readers before Session 7; the name row is a check (studio legal counsel, within 2 weeks); row 3 is a rule with one owner."],
      ["The chain", Q.chain, "YES", "Row 1 ← our Session 1 problem and Session 2 audience; row 2 ← our Session 4 name check; row 3 ← the clash on page 2 (canvas) and the negative survival line on page 4 (pricing)."]],
    open: "STILL OPEN, EACH WITH AN OWNER · royalty reason, NOT YET (licensing lead) · cast options for later films (business affairs) · score merchandise use (music supervisor) · second licensee wave (consumer products).",
    checkNotice: "One NOT YET, and it is the most common one: a price reason borrowed from the market instead of the positioning. It is cheap to fix, and it is the first line a reader checks."
  };

  var LEGO = {
    key: "LEGO Technic",
    carried: "Carried in: existing Technic hobbyists are the primary audience; buyer and user are the same person (Session 2). Positioning: the building set where every added function can be watched working before you buy; the reviewer demo is PLANNED, not held (Session 3). A sub-brand with the LEGO mark on the pack; the flagship tier has no name yet (Session 4).",
    how: "Follow one thread across the three core pages. Page 2 finds a clash between a stated discipline and an assumed expansion. Page 4 has the clearest survival line of the four cases, because the product is sold per box, and its threshold is set by the mould, not the royalty. Page 8 turns it into three bets: row 1 is tested with real hobbyists before Session 7, and the name row is a check with a name and a date.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION: every figure, rate, status and owner here is built for teaching. None is the LEGO Group's data, agreement or filing.",
    sub: {
      2: "Customer Segments and Value Propositions come from Sessions 2 and 3; the clash became a number.",
      3: "Two options for the premium tier. The rejected one has the better margin.",
      4: "Sold per box, so this is the clearest survival line of the four, and the mould sets it.",
      5: "Every row written from the partner's side. One ASPIRATIONAL row we will never pursue.",
      6: "The only case where a high-control channel carries real money.",
      7: "Six assets, and one permanent weakness named plainly.",
      8: "Three rows. Row 1 is tested with real hobbyists; the name row is a check.",
      9: "Milestone 1 commits no mould. It is all proving."
    },
    p2: { problem: "We don't know if enough people will pay a premium price for significantly more complexity; our current sales data is for the existing line, not this step up. (Session 1)",
      KP: "Licensed vehicle brand for the flagship · toy and department retail · specialist hobby shops · moulding and production · hobbyist event organisers · the LEGO parent, as endorser and rule-setter",
      KA: "Plan the line yearly, with a cap on flagships · judge each new mould against a threshold · manage licence renewals · run reviewer demos",
      KR: "The LEGO mark and fit standard · Technic elements and moulds · vehicle-brand licences · design team · the community",
      VP: "Experienced builders who doubt a higher price means more real engineering: the building set where every added function can be watched working before you buy. Gift buyers: a premium box that needs no explaining.",
      CR: "Repeat purchase within the line, no subscription. Continuity comes from the community and the expectation of a yearly flagship.",
      CH: "LEGO.com and brand stores (owned) → toy retail → hobby shops → hobbyist events → resale (not ours)",
      CS: "Primary: existing Technic hobbyists; buyer and user are the same person (Session 2). Secondary: teen builders graduating up. Seasonal: gift buyers.",
      COST: "Moulds: high and fixed, paid before a single box sells · licence royalty on flagships: GROWS with units · retail margin: GROWS with units · packaging · design hours",
      REV: "PRIMARY: direct sales of sets. Then: the licensed flagship at a premium · spare parts service · outbound brand licensing (minor)",
      clash: "Key Activities claim a cap on flagships; Revenue Streams quietly assumed a wider flagship range each year. Both can't be true, and the second is how this line got into trouble before. What we did: capped flagships per year and tied each new mould to the threshold on page 4 (pricing).",
      sentence: "Hobbyists get a set whose every function they can watch working, through LEGO.com and hobby retail, paying once per box, while each new mould is paid before any box sells.",
      notice: "The clash sat in two boxes that never touch: a value in one, an assumption in the other. Writing the cap as a number is what made it a decision." },
    p3: { A: ["A capped number of flagship sets each year, built around a licensed vehicle and sold at a premium. A broad unlicensed mid-range carries the volume.", "The licensed vehicle still means something to hobbyists. The royalty leaves each set above its mould threshold. The cap holds against the yearly pressure to add one more.", "Sell-through by tier against the threshold at the end of the launch window; renewal dates confirmed before a mould is committed."],
      B: ["Drop the vehicle licences and build the premium tier on original designs only, keeping the royalty.", "Hobbyists pay the premium for the mechanism alone, with no real machine to compare it to.", "Rejected for positioning, not money, and B has the better margin. Our claim is that every function can be watched working; a licensed real machine is the shortest proof that it works like the real thing."],
      labelA: "OPTION A · LICENSED FLAGSHIP TIER (CHOSEN)", labelB: "OPTION B · ORIGINAL DESIGNS ONLY (REJECTED)",
      primary: "\"We are primarily a DIRECT SALES business, because the buyer is the builder and the value is delivered once, in the box.\" The flagship sets the price ceiling and the reputation; the mid-range pays for the shared moulds. Retailers set shelf space and licensors set renewals; the cap is ours.",
      notice: "The rejected option is the more profitable one on paper. Across the four cases, the option a positioning sentence rejects is often the one that looks better in a spreadsheet." },
    p4: { rows: [["Licensed flagship set", "Rp6,500,000 at retail", "Our previous flagship and competitor premium sets, both known to hobbyists", "8,000 sets in the first year", "Price: GUESS (illustrative); check two official listings. Volume: COMPARABLE (previous flagship's sell-through)"],
        ["Mid-range unlicensed set", "The band this line has held for years", "The band the buyer already carries", "The volume tier", "COMPARABLE: the most stable row on the page"],
        ["Spare parts", "Per element, at service price", "What hobbyists already pay for the same elements on resale sites", "Low and steady", "COMPARABLE. Priced to be fair, not to earn"],
        ["Licence royalty", "10% of wholesale: a COST, not a price", "Standard vehicle-licensing bands", "Flagships only", "GUESS (illustrative). Negotiated per licensor and term"]],
      line: "Our flagship is ABOVE the reference, because our positioning promises that every added function can be watched working before you buy: the premium pays for a function you can see, not for more pieces. Spare parts sit AT the resale reference, on purpose.",
      survival: "Per flagship: about Rp4,000,000 from the channel − Rp400,000 royalty − Rp1,200,000 production − Rp300,000 packaging = Rp2,100,000 before the mould (all GUESS). The mould costs about Rp15 billion, so the set pays only after about 7,150 boxes. We assumed 8,000: positive, but only just.",
      notice: "The threshold is set by the mould, not the royalty, which is the part most teams get backwards. And 8,000 against 7,150 is a thin margin: that is row 3 on page 8 (your three bets)." },
    p5: { rows: [["Licensed vehicle brand", "A real machine worth copying faithfully, and a name buyers respect", "Royalty, and their engineering shown to people who care", "CONTACTED: multi-year, renewal dates diarised (illustrative)"],
        ["Toy and department retail", "Widest reach and gift-season footfall", "A premium line with a yearly rhythm", "CONTACTED: shelf space negotiated each season"],
        ["Specialist hobby shops", "Credibility, and staff who can explain a mechanism", "Margin on a line their customers already ask for", "IDENTIFIED: high intent, under-used"],
        ["Moulding and production", "Tooling capacity and the tolerances the mechanism needs", "Long, predictable runs", "CONTACTED: the mould cost on page 4 (pricing) comes from here"],
        ["Hobbyist event organisers", "Access to the people who decide the line's reputation", "Early sight and build support", "CONTACTED: the cheapest real relationship here"],
        ["Resale sellers", "Visible demand after a set retires", "Nothing from us, and nothing we can withhold", "ASPIRATIONAL in name only: we decided not to build this one"]],
      box: ["THE ONE PARTNER DECISION WORTH NAMING", "Resale is the only row with no real GET, and we won't change that: controlling resale would make us a price-setter where our credibility comes from not being one. The row stays so page 6 (channels) can't forget it."],
      notice: "An ASPIRATIONAL row you've decided never to pursue should say so. Otherwise a reader next year treats it as an opportunity nobody got round to." },
    p6: { rows: [["LEGO.com and brand stores", "Medium", "Fulfilment and store hours, fully costed; no retail margin given away", "HIGH"],
        ["Toy and department retail", "Highest, especially in gift season", "Retail margin on every box, plus placement terms", "LOW: shelf space decided before launch"],
        ["Specialist hobby shops", "Small, highest intent", "Margin, plus about 4 hours per shop per season (trade marketing)", "HIGH"],
        ["Hobbyist events", "Smallest reach, largest influence", "Event and build-support hours (community lead)", "HIGH"],
        ["Resale of retired sets", "Large and growing", "No cost to us; it sets the felt value of every set we retire", "NONE: we chose not to intervene"]],
      box: ["THE FINDING, AND WHAT IT CHANGES", "Unlike the other three cases, our high-control channels carry real money. The exposure is elsewhere: a market we don't touch prices every set we retire. So the retirement calendar is now a pricing decision, not an inventory one."],
      notice: "Four cases, four different shapes on this page. Fill the cost and control columns honestly and your own exposure shows up without anyone naming it." },
    p7: { rows: [["LEGO parent mark", "—", "The LEGO Group", "Held in the relevant classes", "Low: it is what we borrow and must not damage"],
        ["\"Technic\" line name", "—", "The LEGO Group", "Assumed under the parent's registrations (Session 4). Action: parent legal team confirms classes 28 and 41 (brand manager asks, 2 weeks)", "Low, once confirmed"],
        ["Flagship tier name", "—", "NOT YET CHOSEN", "Nothing to register yet. Action: choose it from the function list, then search classes 28 and 41 (brand manager)", "Medium: a tier with no name can't be protected"],
        ["Element and mould designs", "In-house design team", "The LEGO Group", "Current designs held. The original brick patents expired long ago: others make compatible parts legally", "ACCEPTED AND PERMANENT: see the box"],
        ["Licensed vehicle marks", "Licensors", "Licensors, not us", "LICENSED per set and term. Action: confirm the next two renewals before any mould (licensing lead)", "Medium: scheduled, not open"],
        ["Fan builds and instructions", "The community", "The community", "Governed by a published fair-play policy, not by enforcement", "Low"]],
      box: ["THE LINK TO OUR MONEY", "The flagship premium depends on vehicle licences we don't own: current, renewals diarised, no mould inside an unconfirmed window. The expired patents are permanent; our answer is the mechanism, the licence and the community, which a cloned part doesn't deliver."],
      notice: "A weakness that can't be fixed isn't a failure if it is named and the answer is something other than hope. What fails is a dependency nobody named." },
    p8: { rows: [["1 · TESTED BEFORE SESSION 7", "Desirability", "We bet hobbyists will pay the flagship premium once they've watched each function working. If we're wrong: they read it as more pieces for more money, and direct sales, our PRIMARY, fall short of the mould threshold.", "Show a working prototype video to five hobbyists outside the team; ask what they paid for their last set and what they'd pay for this one", "PM, before Session 7"],
        ["2 · NAME ROW (A CHECK)", "Legal", "We bet \"Technic\" is covered in classes 28 and 41 under the parent's marks, and a tier name is still free. If we're wrong: the flagship ships under a name we can't stop others using.", "Brand manager asks the parent legal team for a written answer naming the classes", "Brand manager, within 2 weeks"],
        ["3", "Viability", "We bet the flagship sells 8,000 boxes, past the mould threshold of about 7,150. If we're wrong: a set at a premium price loses money, the failure this line has had before.", "Model the threshold with the moulding partner's real quote before the mould is committed", "Finance with design, within 2 weeks"]],
      notOn: "NOT ON THIS PAGE, AND WHY · licence renewals (an action on page 7, IP; scheduled) · gift-season shelf space (negotiated each year, page 5, partners) · resale prices (a pricing decision, page 6, channels) · the tier name itself (waits on row 2).",
      notice: "Row 1 was picked because five real hobbyists can answer it in two weeks, and the answer would change the price. The name row is not tested on anyone: one person checks it, by a date." },
    p9: { m: [["MILESTONE 1 · MONTHS 0–2: PROVE", "Run the five hobbyist conversations (row 1). Get the written trademark answer (row 2). Model the threshold with a real quote (row 3) and confirm the next two licence renewals. No mould is committed yet."],
        ["MILESTONE 2 · MONTHS 2–4: COMMIT", "Commit the mould only if rows 1 and 3 hold. Hold the PLANNED reviewer demo so each function is seen moving before pre-orders open."],
        ["MILESTONE 3 · MONTHS 4–12: LAUNCH", "Launch. Read sell-through against the threshold, not against last year. Set next year's flagship count with the cap rule, not the mood of a good season."]],
      notice: "The mould comes after the proving, because it is the only cost that can't be undone. Everything else can be adjusted; a mould can't be un-cut." },
    check: [["Page 2 (canvas)", Q.p2, "YES", "Customer Segments and Value Propositions trace to Sessions 2 and 3; PRIMARY = direct sales; one clash resolved by turning a value into a number (the cap)."],
      ["Page 4 (pricing)", Q.p4, "YES", "Four rows, four origins; the flagship is ABOVE the reference with a positioning reason; survival line computed: positive only after about 7,150 boxes, against an assumed 8,000."],
      ["Page 8 (your three bets)", Q.p8, "YES", "Three rows; row 1 tested with real hobbyists before Session 7; the name row is a check (brand manager, within 2 weeks)."],
      ["The chain", Q.chain, "YES", "Row 1 ← our Session 1 problem and the PLANNED demo from Session 3; row 2 ← our Session 4 name check; row 3 ← the thin margin on page 4 (pricing)."]],
    open: "STILL OPEN, EACH WITH AN OWNER · reviewer demo, PLANNED (marketing lead) · next two licence renewals (licensing lead) · flagship price check (PM) · flagship tier name (brand manager).",
    checkNotice: "Every answer is YES, and the margin over the threshold is thin. A YES means the honest number is written down, not that the number is comfortable."
  };

  var DATA = { jumbo: JUMBO, gojek: GOJEK, marvel: MARVEL, lego: LEGO };
  var NAMES = { jumbo: "Jumbo", gojek: "Gojek / GoFood", marvel: "Disney/Marvel (Iron Man)", lego: "LEGO Technic" };
  var CHECK_NOTICE = "Every answer here is YES, and four things are still open. Both are true at once: a page is finished when every open item has an owner, not when nothing is open.";

  /* ================= contoh: dibangun dari data di atas ================= */
  function strip(s, head) { return s.indexOf(head) === 0 ? s.slice(head.length) : s; }
  function build(k, n) {
    var D = DATA[k], ex = { name: NAMES[k], sub: D.sub[n], caveat: D.note, values: {} }, V = ex.values, P = D["p" + n];
    if (n === 2) {
      ex.before = [{ label: "CARRIED IN FROM SESSIONS 2–4", value: D.carried }, { label: "HOW TO USE THIS EXAMPLE", value: D.how },
        { label: "OUR SESSION 1 MAIN PROBLEM · SHOWN, NOT RETYPED", value: P.problem }];
      V["s5.p2.kp"] = P.KP; V["s5.p2.ka"] = P.KA; V["s5.p2.kr"] = P.KR; V["s5.p2.vp"] = P.VP; V["s5.p2.cr"] = P.CR;
      V["s5.p2.ch"] = P.CH; V["s5.p2.cs"] = P.CS; V["s5.p2.cost"] = P.COST; V["s5.p2.rev"] = P.REV;
      V["s5.p2.clash"] = { label: "ONE CLASH IN OUR CANVAS, AND WHAT WE DID", text: P.clash }; V["s5.p2.sentence"] = P.sentence;
    } else if (n === 3) {
      var hd = ["HOW IT WORKS: ", "WHAT MUST BE TRUE: ", "WHAT EVIDENCE WOULD SETTLE IT: "];
      V["s5.p3.a"] = { label: P.labelA, items: P.A.map(function (x, i) { return hd[i] + x; }) };
      V["s5.p3.b"] = { label: P.labelB, items: P.B.map(function (x, i) { return hd[i] + x; }) };
      V["s5.p3.primary"] = P.primary;
    } else if (n === 4) {
      V["s5.p4.rows"] = { label: "PRICING TABLE", cols: ["WHAT IS PRICED", "THE FIGURE", "REFERENCE PRICE", "VOLUME ASSUMED", "ORIGIN: MEASURED / COMPARABLE / GUESS / UNKNOWN"], rows: P.rows };
      V["s5.p4.line"] = P.line; V["s5.p4.survival"] = P.survival;
    } else if (n === 5) {
      V["s5.p5.partners"] = { label: "PARTNERS", cols: ["PARTNER", "WHAT THEY GIVE", "WHAT THEY GET", "STATUS: CONTACTED / IDENTIFIED / ASPIRATIONAL"], rows: P.rows };
      V["s5.p5.next"] = { label: P.box[0], text: P.box[1] };
    } else if (n === 6) {
      V["s5.p6.channels"] = { label: "CHANNELS", cols: ["CHANNEL", "REACH", "COST: RUPIAH, PERCENT, OR HOURS", "CONTROL: HIGH / MEDIUM / LOW / NONE"], rows: P.rows };
      V["s5.p6.finding"] = { label: P.box[0], text: P.box[1] };
    } else if (n === 7) {
      V["s5.p7.assets"] = { label: "ASSETS", cols: ["ASSET", "CREATOR", "OWNER", "LICENCE STATUS", "RISK: WHAT BREAKS"], rows: P.rows };
      V["s5.p7.money"] = { label: P.box[0], text: P.box[1] };
    } else if (n === 8) {
      V["s5.p8.bets"] = { label: "YOUR BRAND'S THREE BETS", cols: ["ROW", "KIND", "WE BET THAT… IF WE'RE WRONG…", "HOW WE TEST OR CHECK IT", "WHO / WHEN"], rows: P.rows, keys: ["row1", "row2", "row3"] };
      ex.after = [{ label: "NOT ON THIS PAGE, AND WHY", value: strip(P.notOn, "NOT ON THIS PAGE, AND WHY · ") },
        { label: "CHECK BEFORE YOU SUBMIT (the three core pages and the chain, YES or NOT YET)", value: { cols: ["PAGE", "WHAT IT CHECKS", "OUR ANSWER", "EVIDENCE"], rows: D.check } },
        { label: "STILL OPEN, EACH WITH AN OWNER", value: strip(D.open, "STILL OPEN, EACH WITH AN OWNER · ") + " — " + (D.checkNotice || CHECK_NOTICE) }];
    } else if (n === 9) {
      ["m1", "m2", "m3"].forEach(function (m, i) { V["s5.p9." + m] = { label: P.m[i][0], text: P.m[i][1] }; });
    }
    ex.notice = P.notice;
    return ex;
  }
  function examples(n) { var o = {}; ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) { o[k] = build(k, n); }); return o; }

  var SRC_BMC = "Osterwalder & Pigneur (2010), Business Model Generation · workbook p.2 · Jumbo: Session 5 worked example, p.2 (illustrative reconstruction, not Visinema's figures)";
  function filling(n, cards) {
    return "<p><b>Filling " + n + " in the HTML tool</b></p><ol class='fillsteps'>" + cards.map(function (c) { return "<li><b>" + c[0] + ":</b> " + c[1] + "</li>"; }).join("") + "</ol>";
  }

  CB.content.S5 = {
    pages: {
      /* ================= hlm. 2 — Business Model Canvas (R1–R4) ================= */
      2: {
        theory: {
          title: "Read this first · the nine boxes, the clash, and what to do with it",
          src: SRC_BMC,
          html: `
<p><b>The nine boxes, one by one: the left side</b></p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Box</th><th>What it is</th><th>Common mistake</th><th>Jumbo (illustrative)</th></tr></thead><tbody>
<tr><th>Key Partners</th><td>Outside people or companies who do what you can't or won't</td><td>A list of famous names you have no way to reach</td><td>National distributor, cinema exhibitors, schools, one family-brand co-promotion; merchandise licensee to be appointed</td></tr>
<tr><th>Key Activities</th><td>What your team must do again and again for the model to work</td><td>Listing every task; or the activity your claim needs is missing</td><td>Secure week-one screens through the distributor; weekly character content; deliver the co-promotion; run school screenings</td></tr>
<tr><th>Key Resources</th><td>What you must have, including the intangible: the name, IP, access</td><td>Only physical things; forgetting who owns the name</td><td>The film, character IP, Visinema's endorsement, voice cast; the title held for entertainment, <b>not for goods</b></td></tr>
<tr><th>Cost Structure</th><td>Your three largest costs, and which grow as the audience grows</td><td>Leaving out unpaid hours; not marking what grows</td><td>Production (already spent); promotion, <b>grows with screens</b>; cinema's share of each ticket; music licences; social-content hours</td></tr>
</tbody></table></div>
<p><b>Hours are a cost.</b> An activity with no invoice still costs someone's time: write it.</p>
<p><b>The nine boxes, one by one: the customer side</b></p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Box</th><th>What it is</th><th>Common mistake</th><th>Jumbo (illustrative)</th></tr></thead><tbody>
<tr><th>Customer Segments</th><td>Who you serve, copied from Session 2. Buyer and user differ? Write both</td><td>A new, bigger audience written here without new evidence</td><td>Indonesian families with primary-school children; the child asks, the parent pays. Then schools; later, streaming households</td></tr>
<tr><th>Value Propositions</th><td>What each segment actually receives, from your Session 3 positioning and promise</td><td>Listing features instead of what each segment gets</td><td>Families who doubt a local film can match an imported one: a family film made in Indonesia, at a quality that needs no apology. The parent: 100 minutes everyone watches together</td></tr>
<tr><th>Customer Relationships</th><td>One-off or ongoing, and who keeps it going</td><td>"Community" with no name against it</td><td>One-off at the cinema; ongoing only on our own channels (social lead, 6–8 hours a week); schools every year</td></tr>
<tr><th>Channels</th><td>How they find it, buy it, receive it</td><td>Only "Instagram"; no buying or receiving step</td><td>Cinema chains via the distributor → streaming after the cinema run → schools → merchandise via a licensee</td></tr>
<tr><th>Revenue Streams</th><td>Where money enters. More than one is fine; mark one PRIMARY</td><td>A list with no PRIMARY: a wish list, not a model</td><td><b>PRIMARY: ticketing.</b> Then streaming licence, co-promotion, merchandise royalty, soundtrack (minor)</td></tr>
</tbody></table></div>
<p><b>What a clash looks like: four examples.</b> A clash is two boxes that cannot both be true at the same time. Each box looks fine alone; side by side, one of them has to give.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Clash</th><th>One box says</th><th>Another box says</th><th>Why both can't be true</th><th>One way to fix it</th></tr></thead><tbody>
<tr><th>Premium vs ads</th><td>Value Propositions: "premium and exclusive"</td><td>Revenue Streams: "advertising"</td><td>Ads pay only with a big crowd; exclusive means few people</td><td>Keep exclusive and sell to one premium sponsor, or drop "exclusive"</td></tr>
<tr><th>Claim vs work</th><td>Value Propositions: "community is our strength"</td><td>Key Activities: no community work at all</td><td>A claim with no activity behind it is an intention, not a model</td><td>Add a weekly community activity with a name against it, or drop the claim</td></tr>
<tr><th>Money vs partner (Jumbo)</th><td>Revenue Streams: merchandise royalty</td><td>Key Partners: no licensee</td><td>Nobody exists yet to make and sell the merchandise</td><td>Keep the line, move it later, make it depend on registering the title for goods</td></tr>
<tr><th>Give vs charge (Sevel)</th><td>Value Propositions: hours in a seat</td><td>Revenue Streams: a margin per item</td><td>The value is given per hour; the money comes per item</td><td>Charge for the seat, as Point Coffee does, or stop making the seat the reason to come</td></tr>
</tbody></table></div>
<p><b>Finding your clash, and what to do with it</b></p>
<ol>
<li><b>Where to look.</b> Put these pairs side by side: <i>Value Propositions ↔ Revenue Streams</i> (is what you give the thing they pay for?) · <i>Value Propositions ↔ Key Activities</i> (is there work behind every claim?) · <i>Revenue Streams ↔ Key Partners</i> (does someone exist to make each line of money?) · <i>Revenue Streams ↔ Cost Structure</i> (does a cost grow faster than the money?).</li>
<li><b>What to do with it.</b> Pick one, and write it down: <i>Change one box</i> (drop the claim, or change how you charge) · <i>Keep it, but make it conditional and later</i> (Jumbo kept merchandise, but only after the title is registered for goods) · <i>Carry it to page 8 (your three bets)</i> (if you can't fix it yet, write it there as one of your three bets).</li>
<li><b>If it clashes with your positioning.</b> Usually the canvas is wrong, not the positioning. Your Session 3 positioning was built on audience evidence and tested; the canvas is new. So fix the canvas first. Only if you have new evidence that the positioning is wrong, go back to Session 3 and change it there, so both pages say the same thing.</li>
</ol>
<p>Every canvas has at least one clash. If you can't find yours, you filled the page; you haven't read it yet.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> di halaman ini kalian menaruh seluruh bisnis proyek kalian di satu halaman. Yang dicek satu: untuk semua yang kalian berikan ke pelanggan, bisa tidak kalian tunjuk uang mana yang membayarnya.</p>
<p>Caranya tiga langkah. Satu, salin yang sudah kalian punya: masalah dari Sesi 1, audiens dari Sesi 2, positioning dari Sesi 3. Dua, isi tujuh kotak lainnya. Tiga, baca semuanya sebagai satu kalimat, lalu cari di mana tabrakannya.</p>
<p>Contohnya kalimat Sevel: anak muda mendapat berjam-jam tempat duduk, membayar per barang, sementara Sevel membayar sewa per jam. Setiap kotak terlihat benar sendiri-sendiri. Kalimatnya yang menunjukkan tabrakan. Halaman ini dipakai lagi di page 8 (your three bets) dan di Sesi 6 (KPI Tree, baris revenue).</p>`,
        deeper: {
          summary: "Deeper read — nine ways money comes in; mark one PRIMARY",
          html: `
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Model</th><th>Example</th><th>Trap</th></tr></thead><tbody>
<tr><th>Direct sales</th><td>LEGO Technic: you buy the set once</td><td>After the sale, the relationship ends</td></tr>
<tr><th>Subscription</th><td>Netflix: a monthly fee</td><td>You owe them something new every month</td></tr>
<tr><th>Advertising</th><td>YouTube: free videos; creators get 55% of the ad money</td><td>Needs a big audience before it pays</td></tr>
<tr><th>Sponsorship</th><td>Esports tournament + title sponsor: <b>the audience is what's sold</b></td><td>The wrong sponsor damages your position</td></tr>
<tr><th>Licensing</th><td>Marvel: Spider-Man's film rights were held by Sony</td><td>Only works if you clearly own what you rent out</td></tr>
<tr><th>Commission</th><td>GoFood: about 20% + Rp1,000 of each restaurant order</td><td>Needs two sides: buyers and sellers</td></tr>
<tr><th>Freemium</th><td>Spotify: free with ads; most money comes from Premium</td><td>What they pay for must really matter</td></tr>
<tr><th>Ticketing</th><td>Jumbo: a cinema ticket</td><td>Tied to a place, a date, a capacity</td></tr>
<tr><th>Merchandising</th><td>Jumbo: a character tee</td><td>Follows a brand people already love</td></tr>
</tbody></table></div>
<p><b>Jumbo:</b> PRIMARY: theatrical ticketing. Then: streaming licence, co-promotion; merchandise only if it works.</p>
<p>Choose the PRIMARY by asking how your audience <b>already pays</b> for things like this, not which option sounds most modern. Not sure yet? That is allowed this week, as long as you write what you would need to know first.</p>
<p class="small muted">Sources: syllabus Session 5 · YouTube Official Blog · Bisnis.com (2021–22), GoFood · Spotify reporting · Marvel: S5 sources · Jumbo: worked example (illustrative).</p>`
        },
        callout: filling("page 2", [
          ["1 · Already there", "Your S1 main problem, S2 audience (Customer Segments) and S3 positioning (Value Propositions) are shown, read-only. To change them, go back to their own page."],
          ["2 · You write", "The other seven boxes. In Cost Structure, mark which costs grow with the audience. In Revenue Streams, mark one PRIMARY."],
          ["3 · One contradiction", "Write one clash you found in your own canvas, and what you will do about it. Every canvas has one."]]),
        examples: examples(2)
      },

      /* ================= hlm. 3 — Revenue Model Comparison (R13; R12 sebagai pengantar halaman opsional) ================= */
      3: {
        theory: {
          title: "Page 3 · Revenue Model Comparison",
          src: "Workbook p.3 · Jumbo: Session 5 worked example, p.3 (illustrative)",
          html: `
<p><b>What it answers:</b> of two ways to make money, which is PRIMARY, and why not the other.</p>
<p><b>Fill it when:</b> you are torn between two models, e.g. tickets first or a streaming deal first.</p>
<p><b>How:</b> two options side by side: how money comes in, what must be true, what evidence would settle it. The second may be the one you reject, with the reason written.</p>
<p><b>Minimum already in:</b> page 2 (canvas), Revenue Streams: one PRIMARY, with a reason.</p>
<p><b>Common mistake:</b> choosing the option that "sounds modern", or writing only one option.</p>
<p><b>Jumbo (illustrative):</b> two options, one rejected for a positioning reason, not a money reason.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th></th><th>A · Cinema first (chosen)</th><th>B · Streaming deal first (rejected)</th></tr></thead><tbody>
<tr><th>How money comes in</th><td>Tickets at the cinema; a streaming fee after the run; merchandise only if it works</td><td>A platform pays a fixed fee before release; little or no cinema run</td></tr>
<tr><th>What must be true</th><td>Enough screens in week one; a platform still wants it later</td><td>A platform pays enough to cover production</td></tr>
<tr><th>Why</th><td>Our positioning needs a public release to prove an Indonesian studio can make it at world-class quality</td><td>Safer money, but no public result to prove the positioning</td></tr>
</tbody></table></div>
<p>Jumbo's PRIMARY: "We are primarily a ticketing business, because our positioning needs a visible public release."</p>`
        },
        why: `<p><b class='k'>Halaman ini boleh dilewati.</b> Minimumnya sudah ada di page 2 (canvas): satu PRIMARY dengan alasan. Isi halaman ini kalau kamu ragu di antara dua model.</p>`,
        callout: `<p><b>Five pages you may skip.</b> Optional means: the minimum of each page is already on your core pages (last column). Fill it only when you need it.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Page</th><th>What it answers</th><th>Fill it when</th><th>Its minimum is already in</th></tr></thead><tbody>
<tr><th>3 · Revenue Model Comparison</th><td>Which way of making money is PRIMARY, and why not the other</td><td>You are torn between two models</td><td>Page 2 (canvas), Revenue Streams: one PRIMARY, with a reason</td></tr>
<tr><th>5 · Partnership Ecosystem Map</th><td>Who gives you what, and what they get back</td><td>A line of money depends on a partner</td><td>Page 2 (canvas), Key Partners. A partner you don't have yet is a bet on page 8 (your three bets)</td></tr>
<tr><th>6 · Distribution Channel Matrix</th><td>How far each channel reaches, what it costs, how much you control</td><td>Your main channel belongs to someone else</td><td>Page 2 (canvas), Channels. A "free" channel costs hours: put them in Cost Structure</td></tr>
<tr><th>7 · IP Asset Inventory</th><td>Who made and who owns each asset</td><td>You will license, sell merchandise, or use borrowed music, fonts or AI images</td><td>Page 8 (your three bets): at least one row on the name and key asset. Theory: page 8, copyright and trademark</td></tr>
<tr><th>9 · Roadmap</th><td>In what order you will test things</td><td>After the course, or for a longer project</td><td>Page 8 (your three bets), row 1: what you test first</td></tr>
</tbody></table></div>`,
        examples: examples(3)
      },

      /* ================= hlm. 4 — Pricing Assumption Sheet (R5–R7) ================= */
      4: {
        theory: {
          title: "Read this first · the pricing table, the origin column, the survival line",
          src: "Workbook p.4 and p.8 · syllabus Session 5: pricing logic, unit economics at an introductory level · Jumbo: Session 5 worked example, p.4 (illustrative)",
          html: `
<p><b>How to fill the pricing table.</b> The pricing page has a table with five columns. Each row is one thing you sell. Here is one finished row from Jumbo, then what to write in each column.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th></th><th>What is priced</th><th>The figure</th><th>Reference price</th><th>Volume assumed</th><th>Origin</th></tr></thead><tbody>
<tr><th>Jumbo's row (illustrative)</th><td>Character tee</td><td>Rp150,000</td><td>Printed tees around campus and malls: Rp90,000–120,000</td><td>200 tees in the first three months</td><td>Price: COMPARABLE (five shops checked). Volume: GUESS</td></tr>
<tr><th>Write</th><td>One thing people pay for: a ticket, a unit, a package, a sponsor slot</td><td>Your price. If someone else decides it, write "set by ___"</td><td>The price people already know for something similar</td><td>How many, and over what period</td><td>Where the number came from (below)</td></tr>
<tr><th>Not this</th><td>"Our product", with no unit</td><td>A price you don't control, written as if you do</td><td>Blank, or your own cost</td><td>A number with no period</td><td>Everything marked MEASURED</td></tr>
</tbody></table></div>
<p><b>Jumbo's other rows:</b> cinema ticket (figure: <b>set by the cinema</b>), school screening package (Rp2,500,000), co-promotion package (UNKNOWN).</p>
<p><b>The Origin column: can we trust this number?</b> In the last column of the pricing table, every number gets one of four labels, so anyone reading it knows where it came from.</p>
<ul>
<li><b>MEASURED:</b> you counted it yourself. Example: pre-orders you actually received; answers from your own survey.</li>
<li><b>COMPARABLE:</b> someone similar's public number. Jumbo: cinema ticket prices from public chain listings.</li>
<li><b>GUESS:</b> your best estimate, written plainly as a guess. Jumbo: 200 tees in three months, no basis yet. It becomes a candidate for page 8 (your three bets).</li>
<li><b>UNKNOWN:</b> you can't even guess yet, so write the action. Jumbo: co-promotion fee. Action: ask the distributor for two comparable fees. Owner: PM. With a date.</li>
</ul>
<p>GUESS and UNKNOWN rows are not failures: they become candidates for page 8 (your three bets). A table where everything is MEASURED is almost always wrong.</p>
<p><b>The survival line in full.</b> The receipt for one customer, with every piece written out:</p>
<p class="formula"><b>Money one customer brings</b> (price × how often they buy) <b>− Cost to win them</b> (promotion, discounts, ads, hours) <b>− Cost to serve them</b> (making, delivering, the platform's share, hours) <b>= the survival line</b> (positive or negative?).</p>
<p><b>Tip · if you don't sell one thing to one customer.</b> Free to watch or use (a film, a webcomic, a free app)? Do the receipt per viewer or per user. Money in: sponsor or ad money for one viewer. Money out: what it costs to reach and serve one viewer. Paid with something other than money? Write what they give (an email, their time, a recommendation) and what one of those is worth to you. Not sure? Write GUESS.</p>
<p><b>Example · Jumbo: one receipt finished, one not yet.</b> School screening, finished: in Rp2,500,000, out about Rp600,000 + 8 hours. Positive, and still positive at 12 screenings. Merchandise, not yet: in Rp150,000 per tee; out: the licensee's share is "?", because there is no licensee yet. So Jumbo wrote UNKNOWN, owner: PM, instead of inventing a number.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> di sini kalian melakukan dua hal: menetapkan harga, lalu mengecek apakah satu pelanggan menutup biayanya sendiri.</p>
<p>Tiga langkah. Satu, cari angka yang sudah ada di kepala pembeli: reference price. Kalian sudah punya bahannya di baris Price Competitor Matrix Sesi 2. Dua, putuskan harga kalian di atas, sama, atau di bawah angka itu, dan alasannya. Alasannya datang dari positioning Sesi 3. Tiga, cek satu pelanggan: uang yang masuk dikurangi uang yang keluar untuk dia. Itu survival line.</p>
<p>Kursi yang sama, Sevel menghargainya seperti minimarket, Point Coffee seperti kafe. Survival line Sevel negatif: bahkan saat penuh setiap malam, uangnya tidak bisa membayar biayanya. Halaman ini dipakai lagi di page 8 (your three bets) dan di KPI Tree Sesi 6.</p>`,
        deeper: {
          summary: "Deeper read — three ways to set a price, and two ways to price a show (Netflix vs Prime)",
          html: `
<p><b>Three ways to set a price</b></p>
<ul>
<li><b>Cost-plus:</b> your cost plus a margin. Example (illustrative): a tee costs Rp60,000 to print; sell at Rp90,000 for a 50% margin. Easy to defend, but the buyer doesn't care what it cost you.</li>
<li><b>Value-based:</b> what the buyer feels it is worth. Needs your Session 2 evidence: what did your audience say it is worth to them? The most profitable, the hardest to prove.</li>
<li><b>Reference price:</b> the number already in their head. Jumbo: printed tees around campus and malls cost about Rp90,000–120,000. You never price from zero.</li>
</ul>
<p><b>Price is a positioning statement.</b> BELOW says "the cheaper version". ABOVE says "worth more, and here's why". Jumbo: character tee at Rp150,000: <b>ABOVE</b> the reference, because the character design is exclusive. The reason comes from the S3 positioning (made by an Indonesian studio to world-class standards), not from the cost.</p>
<p><b>Both work: standalone vs the whole package</b> (class's reading, from public facts)</p>
<ul>
<li><b>Standalone · Netflix:</b> the price is the product. Every rise has to be earned by what is on screen. It stands alone against the reference, so positioning must justify it.</li>
<li><b>The whole package · Amazon:</b> the video's price disappears inside a Prime membership. Another box pays for it: shopping. Same logic as Point Coffee: a feature paid for by another revenue line.</li>
</ul>
<p>Which one wins? <b>UNKNOWN.</b> Both work today, each in its own way.</p>
<p><b>Tip · when you set your own price.</b> Selling it on its own, like Netflix? Compare your price with the reference, and write why it is worth that much. Putting it in a package, like a ticket that includes a tee? Write which part brings in the money and which part is given away inside it.</p>
<p class="small muted">Sources: syllabus Session 5 Key Topics (pricing logic, packaging and bundling) · Netflix US plans, via TechAdvisor and BGR · Prime prices, via DealNews · Bezos at Code Conference, via Business Insider · Cost-plus figures: a generic illustration.</p>`
        },
        callout: filling("page 4", [
          ["1 · Already there", "The Price row of your S2 Competitor Matrix is shown next to the reference column. No reference yet? Write GUESS."],
          ["2 · You write", "A row for each thing you price. Then one line: our price is ABOVE / AT / BELOW the reference, because ___. Not paid with money? Write what they give."],
          ["3 · Survival line", "Money one customer brings minus the cost to win and serve them. Write the result, even if it's a GUESS."]]),
        examples: examples(4)
      },

      /* ================= hlm. 5 — Partnership Ecosystem Map (R14) ================= */
      5: {
        theory: {
          title: "Page 5 · Partnership Ecosystem Map",
          src: "Workbook p.5 · Jumbo: Session 5 worked example, p.5 (illustrative)",
          html: `
<p><b>What it answers:</b> who gives you what, and what they get back.</p>
<p><b>Fill it when:</b> a line of money depends on a partner: a distributor, a venue, a sponsor, a school.</p>
<p><b>How:</b> write every row from the partner's side: "they would do this because they get ___"; status CONTACTED, IDENTIFIED or ASPIRATIONAL.</p>
<p><b>Minimum already in:</b> page 2 (canvas), Key Partners; a partner you don't have yet is a bet on page 8 (your three bets).</p>
<p><b>Common mistake:</b> a list of famous names with no "what they get".</p>
<p><b>Jumbo (illustrative):</b> five of its six partners; two are ASPIRATIONAL on purpose.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Partner</th><th>They give</th><th>They get</th><th>Status</th></tr></thead><tbody>
<tr><th>Distributor</th><td>Screens, bookings, promotion advice</td><td>A fee and a share of a title with a ready family audience</td><td>CONTACTED</td></tr>
<tr><th>Schools</th><td>Word of mouth; trust with parents</td><td>An affordable, relevant programme day</td><td>CONTACTED</td></tr>
<tr><th>Family-brand co-promotion</th><td>Media and in-store presence</td><td>A wholesome local title for their campaign</td><td>IDENTIFIED</td></tr>
<tr><th>Streaming platform</th><td>A licence fee after the cinema run</td><td>A local family title with a proven result</td><td>ASPIRATIONAL: later, from a stronger position</td></tr>
<tr><th>Merchandise licensee</th><td>Making and selling the products</td><td>Character rights, once the name is registered for goods</td><td>ASPIRATIONAL: waits on the name</td></tr>
</tbody></table></div>`
        },
        why: `<p><b class='k'>Halaman ini boleh dilewati.</b> Minimumnya sudah ada di page 2 (canvas), Key Partners. Isi kalau satu jalur uang bergantung pada partner. Partner yang belum kamu punya bisa jadi taruhan di page 8 (your three bets).</p>`,
        examples: examples(5)
      },

      /* ================= hlm. 6 — Distribution Channel Matrix (R15) ================= */
      6: {
        theory: {
          title: "Page 6 · Distribution Channel Matrix",
          src: "Workbook p.6 · Jumbo: Session 5 worked example, p.6 (illustrative)",
          html: `
<p><b>What it answers:</b> for each channel: how far it reaches, what it costs, how much you control.</p>
<p><b>Fill it when:</b> your main channel belongs to someone else: a cinema chain, a platform, a marketplace.</p>
<p><b>How:</b> four to six rows; cost in rupiah, percent, or hours with a name; control HIGH, MEDIUM, LOW or NONE; at least one HIGH-control channel.</p>
<p><b>Minimum already in:</b> page 2 (canvas), Channels; a "free" channel costs hours: put them in Cost Structure.</p>
<p><b>Common mistake:</b> writing "free" for Instagram; it costs hours every week, from someone.</p>
<p><b>Jumbo (illustrative):</b> the channel that brings most money is the one they control least.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Channel</th><th>Reach</th><th>Cost</th><th>Control</th></tr></thead><tbody>
<tr><th>Cinema chains</th><td>Highest</td><td>Promotion up front, plus the cinema's share of each ticket</td><td>LOW: screens re-decided weekly</td></tr>
<tr><th>Streaming, after the run</th><td>High, long-lived</td><td>A share or a flat fee</td><td>NONE</td></tr>
<tr><th>School screenings</th><td>Low, but repeatable</td><td>About 8 hours per screening</td><td>HIGH</td></tr>
<tr><th>Merchandise retail</th><td>Medium</td><td>Licensee's margin: UNKNOWN</td><td>LOW</td></tr>
<tr><th>Own social channels</th><td>Smallest today</td><td>6–8 hours a week, named owner</td><td>HIGH</td></tr>
</tbody></table></div>
<p>What Jumbo changed: its own channel got a named owner and costed hours now, before it is needed.</p>`
        },
        why: `<p><b class='k'>Halaman ini boleh dilewati.</b> Minimumnya sudah ada di page 2 (canvas), Channels. Kanal yang "gratis" tetap memakan jam kerja: tulis jamnya di Cost Structure.</p>`,
        examples: examples(6)
      },

      /* ================= hlm. 7 — IP Asset Inventory (R16) ================= */
      7: {
        theory: {
          title: "Page 7 · IP Asset Inventory",
          src: "Workbook p.7 · Jumbo: Session 5 worked example, p.7 (illustrative) · not legal advice",
          html: `
<p><b>What it answers:</b> who made, and who owns, each asset you use: made and borrowed.</p>
<p><b>Fill it when:</b> you will license, sell merchandise, or use borrowed music, fonts, stock or AI images.</p>
<p><b>How:</b> one row per asset: creator, owner (or NOT YET AGREED), licence status, what breaks if it's wrong; every open row gets one action and one name.</p>
<p><b>Minimum already in:</b> page 8 (your three bets): at least one row on the name and key asset. Theory: page 8 (copyright, trademark and licence).</p>
<p><b>Common mistake:</b> inventing an owner instead of writing NOT YET AGREED.</p>
<p><b>Jumbo:</b> the asset table is in the page 8 theory (copyright). The question that matters most:</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>The question</th><th>Jumbo's answer</th></tr></thead><tbody>
<tr><th>Which line of money depends on owning something you don't yet own?</th><td>The merchandise royalty depends on the title registered for clothes and toys, which isn't filed yet</td></tr>
<tr><th>What breaks if it's wrong?</th><td>Another company can file first. The merchandise line disappears, and no licensee can be approached</td></tr>
<tr><th>What goes to page 8 (your three bets)?</th><td>The name row: class search and a filing decision, PM, with a date</td></tr>
</tbody></table></div>`
        },
        why: `<p><b class='k'>Halaman ini boleh dilewati.</b> Minimumnya sudah ada di page 8 (your three bets): minimal satu baris tentang nama dan aset utama. Isi kalau kamu akan melisensikan, menjual merchandise, atau memakai musik, font, stok, atau gambar AI milik orang lain.</p>`,
        examples: examples(7)
      },

      /* ================= hlm. 8 — Your Brand's Three Bets (R8–R11) ================= */
      8: {
        theory: {
          title: "Read this first · how to write one bet, where bets come from, who owns what",
          src: "Workbook p.8 · Bland & Osterwalder (2019), Testing Business Ideas · UU No. 28/2014 tentang Hak Cipta · UU No. 20/2016 tentang Merek · WIPO (2017), Making a Mark · Jumbo: Session 5 worked example, p.7–8 (illustrative) · not legal advice",
          html: `
<p><b>How to write one bet.</b> Page 8 (your three bets) has one row per bet, three rows at most. Here is Jumbo's row 1, then what to write in each column.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th></th><th>Kind</th><th>The bet, and if it's wrong</th><th>How we test or check it</th><th>Who / when</th></tr></thead><tbody>
<tr><th>Jumbo's row 1 (illustrative)</th><td>Desirability</td><td>We bet parents will pay for the cinema rather than wait for streaming. If wrong: a child asking is not a parent paying, and ticket sales, our PRIMARY, fall short</td><td>Ten short interviews with parents outside the team</td><td>PM, before Session 7</td></tr>
<tr><th>Write</th><td>Desirability, viability, feasibility or legal</td><td>"We bet that ___. If we're wrong, ___." The consequence, not just a name</td><td>One concrete action you can do before the date</td><td>One person's name and one date</td></tr>
<tr><th>Not this</th><td>No kind</td><td>"Market risk" or "competition", with no consequence</td><td>"We will monitor it"</td><td>"The team", "soon"</td></tr>
</tbody></table></div>
<p><b>Jumbo's other two rows:</b> the <b>name row</b> (the title still ours to register for clothes and toys; check: a class search and a filing decision) and a <b>viability row</b> (the promotion budget buys enough week-one screens; check: one distributor conversation).</p>
<p><b>Where your bets come from, and how to pick row 1</b></p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>From</th><th>What you marked</th><th>Example bet</th></tr></thead><tbody>
<tr><th>Today · page 4 (pricing)</th><td>A number marked GUESS</td><td>Jumbo: "We bet we can sell 200 tees in three months."</td></tr>
<tr><th>Today · page 4 (pricing)</th><td>A survival line that is negative or unknown</td><td>Sevel: "We bet people who sit for hours will also spend enough."</td></tr>
<tr><th>Today · page 2 (canvas)</th><td>The clash you found in your canvas</td><td>Jumbo: "We bet a licensee will want to make our merchandise."</td></tr>
<tr><th>Session 3 · Promise → Proof</th><td>A promise still UNKNOWN or PLANNED</td><td>"We bet our audience will believe a promise we haven't proven yet."</td></tr>
<tr><th>Session 4 · Brand codes</th><td>A code with no owner, and your project name</td><td>Jumbo: "We bet the title is still ours to register for goods."</td></tr>
</tbody></table></div>
<p><b>How to pick row 1:</b> it can be tested with real people in the next two weeks. The answer would change a decision. It's about whether people want it or pay for it. <b>Legal rows are different:</b> checks, not tests: who checks, and by when.</p>
<p><b>Copyright: what you made, and what you borrowed.</b> <i>What it protects:</i> the work: a script, character drawings, music, photos, footage, code, a video game. <i>How you get it:</i> automatically, once the work exists in a real form; no registration needed. <i>Who owns it:</i> the person who made it, unless a written agreement says otherwise.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Jumbo's assets (illustrative)</th><th>Made or borrowed</th><th>Who owns it</th><th>What to do</th></tr></thead><tbody>
<tr><th>Character designs</th><td>Made, by the studio's art team</td><td>Visinema, under employment terms</td><td>Re-read the contracts to confirm</td></tr>
<tr><th>Screenplay</th><td>Made, commissioned in writing</td><td>Visinema</td><td>Nothing: settled in writing</td></tr>
<tr><th>Original score</th><td>Made, by the composer</td><td><b>NOT YET AGREED</b></td><td>Sign an agreement before any reuse in trailers or merchandise</td></tr>
<tr><th>Logo font</th><td>Borrowed: a licensed font</td><td>The font company</td><td>Free for personal use only: buy a commercial licence or change the font</td></tr>
<tr><th>Voice performances</th><td>Made, by the cast</td><td>Film use agreed; <b>other reuse not agreed</b></td><td>Add a reuse clause before games or merchandise</td></tr>
</tbody></table></div>
<p><b>Inside your team:</b> one member draws the characters. Who owns them: <b>the artist, or the team?</b> Write one paragraph you all sign now. <b>Music from the internet, stock photos, AI-generated images:</b> treat as UNKNOWN until you've checked the licence. (UU No. 28/2014 tentang Hak Cipta, Pasal 1 angka 1 and Pasal 40.)</p>
<p><b>Trademark and licence: the name, and renting it out.</b></p>
<ul>
<li><b>Trademark</b> protects the NAME and LOGO, per class of goods or services. You must register it (DJKI in Indonesia); the first to file owns it. Jumbo: the title is held for entertainment, not for clothes and toys.</li>
<li><b>Licence</b> is renting a right to someone else: what for, where, how long. Only the owner can license. Jumbo: no merchandise licence until the title is registered for goods.</li>
</ul>
<p>On page 8 (your three bets), the name row looks like this: "We bet the title is still ours to register for clothes and toys." Check: search DJKI's database, decide whether to file. PM, with a date. Remember Bensu: the face of a brand is not the owner of its name.</p>
<p class="small muted">An introduction so you know when to ask a professional; not legal advice.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> di sini kalian menuliskan apa yang harus benar supaya brand kalian bertahan, dan bagaimana kalian tahu sebelum terlambat.</p>
<p>Tiga langkah. Satu, ambil dari yang sudah kalian tandai sendiri. Dari halaman hari ini: GUESS di halaman harga, tabrakan di kanvas. Dari hal inti sesi sebelumnya: promise Sesi 3 yang belum terbukti, dan nama proyek kalian. Hampir tidak ada yang baru di halaman ini. Dua, baris 1 adalah taruhan yang kalian uji ke orang sungguhan selama dua minggu ke depan, di luar kelas. Caranya kita bahas di akhir Sesi 6, hasilnya dibawa ke Sesi 7. Tiga, minimal satu baris soal siapa pemilik nama proyek kalian.</p>
<p>Taruhan ketiga Sevel, "kami boleh terus memakai nama ini", ternyata bergantung pada pihak lain: 7-Eleven Inc.</p>`,
        deeper: {
          summary: "Deeper read — four kinds of bet (Jumbo), and who owns the name \"Bensu\"",
          html: `
<p>Write each bet as: <b>"We bet that ___. If we're wrong, ___."</b> Then say how you'll find out.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Kind</th><th>Question</th><th>Jumbo bets that</th><th>How we'll find out</th></tr></thead><tbody>
<tr><th>Desirability</th><td>Will people want it?</td><td>Parents will pay for the cinema rather than wait for streaming</td><td>Ten short interviews with parents outside the team (Jumbo's row 1: tested with real parents)</td></tr>
<tr><th>Viability</th><td>Does the money work?</td><td>An affordable promotion budget still buys enough cinema screens in week one</td><td>One talk with the distributor about budgets and ticket sales of similar local films</td></tr>
<tr><th>Feasibility</th><td>Can we actually make and deliver it?</td><td>We can find a licensee to make and sell the merchandise; we can't make clothes and toys ourselves</td><td>Approach two possible licensees. If neither is interested by month 3, drop merchandise</td></tr>
<tr><th>Legal</th><td>Are we allowed to?</td><td>The title is still ours to register for clothes and toys</td><td>Search the title in DJKI's trademark database, then decide whether to file (Jumbo's name row: not tested on customers, checked by one person, by a date)</td></tr>
</tbody></table></div>
<p><b>Geprek Bensu in three steps</b> (public facts)</p>
<ol>
<li><b>The face.</b> Ruben Onsu becomes the brand ambassador of "I Am Geprek Bensu", a business of PT Ayam Geprek Benny Sujono. "Bensu" = BENny SUjono.</li>
<li><b>The filing.</b> The company files its name first, in class 43 (restaurants). Ruben opens his own "Geprek Bensu" and files six marks a few months later.</li>
<li><b>The court.</b> The Supreme Court rejects Ruben's appeal. The company owns the name; Ruben's six marks are cancelled: similar to the company's name, filed later, and in bad faith.</li>
</ol>
<p><b>Class's reading: the face of a brand is not the owner of its name.</b> Being famous, or the name sounding like yours, decides nothing. Who filed first, in good faith, does. Your team: who is the face? Who will file the name?</p>
<p class="small muted">Sources: Bisnis.com (2020); Kontan (2020); Putusan MA 575 K/Pdt.Sus-HKI/2020, filing dates as cited in Jurnal Unpam; Jurnal Untar, bad faith. Jumbo: worked example, p.8 (illustrative).</p>`
        },
        callout: filling("page 8", [
          ["1 · Already there", "A list of candidates. From today: a GUESS on page 4 (pricing), a negative survival line, the clash on page 2 (canvas). From earlier core pages: an S3 promise not yet proven, an S4 brand code with no owner, your project's name."],
          ["2 · You write, 3 rows at most", "For each: the kind, \"we bet that… if we're wrong…\", how you'll test or check it, who and by when. Row 1 is marked \"tested before Session 7\"."],
          ["3 · The name row", "At least one row on who owns your project's name and your key asset. It's a check: a name and a date."]]),
        examples: examples(8)
      },

      /* ================= hlm. 9 — Roadmap (R17) ================= */
      9: {
        theory: {
          title: "Page 9 · Roadmap",
          src: "Workbook p.9 · Jumbo: Session 5 worked example, p.9 (illustrative)",
          html: `
<p><b>What it answers:</b> in what order you will test things over six to twelve months.</p>
<p><b>Fill it when:</b> after the course, or for a longer project with real money at stake.</p>
<p><b>How:</b> three milestones; milestone 1 tests row 1 from page 8 (your three bets): no production, no promotion; then what becomes possible once you know.</p>
<p><b>Minimum already in:</b> page 8 (your three bets), row 1: what you test first.</p>
<p><b>Common mistake:</b> putting the launch or production first, on top of a guess nobody has checked.</p>
<p><b>Jumbo:</b> the release everyone wants to plan first is placed second.</p>
<div class="tscroll"><table class="wbtable ro"><thead><tr><th>Milestone</th><th>What Jumbo does</th></tr></thead><tbody>
<tr><th>1 · Months 0–2: prove</th><td>Interview parents (row 1). Settle ownership: the title for goods, the composer, the font. Nothing is production; all of it is proving</td></tr>
<tr><th>2 · Months 2–4: release</th><td>Track real ticket sales against the page 4 (pricing) assumption. The model meets its first real number</td></tr>
<tr><th>3 · Months 4–12: build</th><td>Negotiate streaming with a box-office result in hand. Merchandise only if the title is registered</td></tr>
</tbody></table></div>
<p>A roadmap is an order of testing, not an order of building.</p>`
        },
        why: `<p><b class='k'>Halaman ini boleh dilewati.</b> Minimumnya sudah ada di page 8 (your three bets), baris 1: yang kamu uji lebih dulu.</p>`,
        callout: "<b>THE RULE</b> · A roadmap is an order of TESTING, not an order of building. Milestone 1 tests row 1 from page 8 (your three bets).",
        examples: examples(9)
      }
    },
    /* Mode kelas (deck T2/T4, T10, T14 · pratinjau HTML tool): s5.html?kelas=1&… */
    kelasLinks: [
      { step: "T2 · page 2 · Jumbo: copy, clash, one sentence", q: "hlm=2&kasus=jumbo&sorot=cs,vp,clash,sentence&urut=1" },
      { step: "T4 · page 2 · Jumbo canvas (full)", q: "hlm=2&kasus=jumbo" },
      { step: "T10 · page 4 · Jumbo pricing table + ABOVE/AT + survival line", q: "hlm=4&kasus=jumbo&sorot=rows,line,survival&urut=1" },
      { step: "T14 · page 8 · Jumbo three bets", q: "hlm=8&kasus=jumbo&sorot=row1,row2,row3&urut=1" },
      { step: "Q&A · page 8 · GoFood (contoh lain)", q: "hlm=8&kasus=gojek" },
      { step: "Q&A · page 4 · Marvel (satu NOT YET)", q: "hlm=4&kasus=marvel" },
      { step: "Q&A · page 4 · LEGO Technic (survival line paling jelas)", q: "hlm=4&kasus=lego" }
    ]
  };
})();
