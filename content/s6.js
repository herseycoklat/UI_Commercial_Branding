/* content/s6.js — teks Sesi 6: teori, kenapa penting, contoh empat kasus, contoh Concept Card. Dibangun 17 Nov 2026.
 * Satu sumber:
 *  - Teori per halaman = teks slide R deck S6-How_the_Brand_Meets_People_v6.pptx = doc 87b (slide 7–18) + lapisan doc 87c (v5 → v6):
 *    hlm. 4 = R1 · hlm. 5 = R2 · hlm. 9 = R3 · Concept Card = R4 · hlm. 2 = R6 · hlm. 3 = R7 · hlm. 6 = R8 · hlm. 7 = R9 · hlm. 8 = R10 ·
 *    hlm. 10 = R11. Kotak contoh Jumbo di slide R = contoh (sudah ada utuh di panel contoh), jadi tidak diulang di teori.
 *    R4 "the REAL row" ditulis "the REAL rows" (selaras workbook dan WE, butir 86). R4 tanpa tanggal kursus.
 *  - "Kenapa halaman ini penting" = pelajaran "What Clubhouse teaches" skrip kelas S6 v1 (bagian 1–2) + rantai doc 73.
 *  - Contoh: data worked example S6 v3 apa adanya — Jumbo dari claude/90 (objek JUMBO), GoFood/Marvel/LEGO dari claude/90a.
 *    NOTICE per halaman = `notice`; `how` sampul = pengantar panel contoh. Jumbo = SEBELUM rilis bioskop (konvensi 47).
 *    Tanggal kasus 2027 adalah bagian contoh (diizinkan, content.caseDates); tanpa tanggal minggu kursus, tanpa kata Gate.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var OPT = "Pages 2, 3, 6, 7, 8 and 10 are optional. They are filled here so you can see them, not because you must.";

  /* ================= data worked example S6 v3 (verbatim) ================= */
  var JUMBO = {
    carried: "Carried in: Indonesian families with primary-school children are the primary audience; the child asks, the parent pays (Session 2). Positioning: the animated family film made by an Indonesian studio to world-class production standards. Promise → Proof: \"Made in Indonesia\" and \"World-class quality\" are REAL; \"A story for the whole family\" is UNKNOWN (Session 3). Ticketing is PRIMARY, a school screening costs a school Rp2,500,000, and row 1 bets that parents will pay for the cinema rather than wait for streaming (Session 5).",
    how: "This is Jumbo BEFORE its cinema release: a plan built around school screenings. It is not the 2025 release you saw in class. That card said \"The film you want your kids to watch…\"; before release, the message can only go as far as the REAL proof: \"A family film made in Indonesia, at world-class quality.\" After release, families proved the rest, and the message grew.\nFollow one thread across the three core pages: one mother on page 4, one message on page 5, one number on page 9. All three meet on the Concept Card (slide 11). The card has one honest weakness; the last slide names it.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION: a school-screening scenario built for teaching. Every figure, date, status and owner is an assumption, not Visinema's data, plan or agreement. Release Thu 18 Mar 2027 is an estimate.",
    sub: { 2: "One sentence, one contradiction kept on purpose.", 3: "One funnel, every number marked as an assumption.", 4: "Ibu Rina, 38, a Jakarta mother with a Grade 3 son.", 5: "One message, two reasons, one ask. The third promise is UNKNOWN, so it is not a reason.", 6: "The distributor owns the paid line; the team owns the rest.", 7: "Release Thu 18 Mar 2027 is an estimate; the distributor sets it.", 8: "A team of four. Nineteen MUST hours.", 9: "The same four steps as Jumbo and Clubhouse in class.", 10: "Three risks, each with a warning sign and an owner. Risk 1 is our Session 5 row 1." },
    p2: { b: [["1 · GOAL", "About 120 families with primary-school children join a school screening by Wed 17 Mar 2027."], ["2 · AUDIENCE", "Indonesian families with primary-school children; the child asks, the parent pays (Session 2)."], ["3 · THE MONEY LINE", "Ticketing is PRIMARY (Session 5). Each school screening brings Rp2,500,000 from the school."], ["4 · DATE", "Release Thu 18 Mar 2027: an estimate, the distributor sets it. Pre-launch from Mon 25 Jan."],
        ["5 · MAIN MESSAGE", "\"A family film made in Indonesia, at world-class quality.\" (page 5)"], ["6 · CHANNELS", "Character posts (owned) · school newsletter and class groups (shared) · distributor boosts (paid)."], ["7 · HOURS", "19 MUST hours a week ÷ 4 people ≈ 5 per person (page 8)."], ["8 · TOP NUMBER", "About 120 families at a school screening by Wed 17 Mar 2027 (page 9). Matches box 1."]],
      sentence: "\"We want families with primary-school children to join a school screening and then book a seat, reached through their schools, and we will know by this number: about 120 families at a school screening by Wed 17 Mar 2027.\"",
      contra: "\"We sell the film in cinemas, but we measure ourselves by schools.\" Kept on the page on purpose: page 9 adds a ticket revenue row, UNKNOWN until the distributor gives a screen count.",
      notice: "The contradiction is not fixed, and that is fine. It is written down, and page 9 carries the number that will settle it." },
    p3: { rows: [["Awareness", "Get the school's screening invitation in the class group", "240 families", "GUESS"], ["Consideration", "Attend a school screening", "120 families", "GUESS"], ["Conversion", "Buy opening-weekend tickets", "60 families", "COMPARABLE"], ["Retention", "The school rebooks next year", "2 of 3 schools", "GUESS"], ["Advocacy", "Post a family photo in the class group", "20 families", "GUESS"]],
      box: ["WHERE MOST PEOPLE STOP, AND WHY WE THINK SO", "Invitation → screening, and screening → ticket: half each time. Page 4 shows one reason: the invitation reaches the group too late to plan a Saturday. All numbers are assumed until the first screening is held."],
      notice: "Consideration here (120 families) is the same number as the target on page 9. The funnel and the tree count the same people." },
    p4: { shown: "Indonesian families with primary-school children; the child asks, the parent pays.",
      person: "Ibu Rina, 38, a Jakarta mother with a Grade 3 son. She first meets Jumbo on her son's phone.",
      steps: [["discover", "Son's phone: a short character clip", "Watches the clip her son shows her", "The clip ends before the title shows"],
        ["evaluate", "The class parents' group", "Asks whether anyone has seen it", "No one she trusts has seen it"],
        ["access", "The school hall, a Saturday morning", "Gets the screening date and place from the school's invitation", "The invitation reaches the group too late to plan"],
        ["purchase", "Ticket app, after the screening", "Books opening-weekend seats for the family", "The app asks for a log-in first"],
        ["experience", "The cinema, opening weekend", "Watches again with the whole family", "The younger sibling is bored after 40 minutes"],
        ["share", "The class parents' group", "Sends a family photo", "Nothing easy to share"]],
      fix: "Discover step: add a two-second title card to every clip, so the child can say what to ask for. Owner: social lead. From Mon 25 Jan 2027, the first post. Checked against the other steps: it changes nothing after discover.",
      notice: "The walk does not stop at purchase. Experience and share are where the next family comes from." },
    p5: { shown: "Positioning: \"…Jumbo is the animated family film made by an Indonesian studio to world-class production standards, because it has been in production for years at Visinema Studios.\" REAL rows: (1) Made in Indonesia · (2) World-class quality. Not REAL: (3) Feels Indonesian, (4) A story for the whole family, both UNKNOWN.",
      main: "\"A family film made in Indonesia, at world-class quality.\"",
      rows: [["Reason 1 · Made here", "Made by Indonesian people, at an Indonesian studio, for Indonesian families.", "Row 1, Made in Indonesia (REAL): Visinema Studios, an Indonesian studio; Indonesian writers named in the credits."],
        ["Reason 2 · Built to world-class standards", "Years of careful work, not a rushed local film.", "Row 2, World-class quality (REAL): years of production and the production companies' credits. Real, but not yet shown publicly."]],
      ask: "Join your child's school screening before the film opens. The same action as page 9, step 1.",
      test: "Read to a parent of a Grade 3 child: both reasons keep \"made in Indonesia, at world-class quality\": YES. \"A story for the whole family\" stays out: its Session 3 row is UNKNOWN.",
      notice: "Why not the class card's message? \"Courage, friendship and family love\" is the promise \"A story for the whole family\", still UNKNOWN before release. After release, families proved it, and the message grew. Write only as far as your proof." },
    p6: { rows: [["Paid · rented", "Distributor boosts on opening-weekend showtimes (purchase)", "The distributor's budget; amount UNKNOWN (PM asks by Mon 11 Jan 2027)"],
        ["Owned · we control it", "Character posts and the school newsletter (discover)", "Social lead, 7 h/week"],
        ["Earned · others talk", "Parent and teacher reviews after screenings (evaluate)", "Community lead, 4 h/week"],
        ["Shared · the community makes it", "Class parents share the invitation and post photos (access, share)", "Rp1,800,000 for three screenings; community lead, 6 h/week"]],
      notice: "No row says \"free\". The owned and shared rows cost hours, each with a name." },
    p7: { rows: [["Dates", "Mon 25 Jan – Wed 17 Mar 2027", "Thu 18 – Sun 21 Mar", "Mon 22 Mar – Sun 2 May"],
        ["What happens", "Weekly character posts; three school screenings", "Opening-weekend push; Sunday screening", "Discussion packs; next-year school offer"],
        ["Owner + hours / week", "Social lead 7 h · community lead 10 h", "Social lead 7 h · PM 6 h", "Community lead 6 h · PM 2 h"],
        ["WAITING ON", "Trailer edit waits for the composer agreement (producer, Mon 11 Jan 2027)", "Paid boosts wait for the distributor's approval (PM)", "Merchandise waits for the goods-class filing decision (PM)"]],
      from: "Release Thu 18 Mar 2027, an estimate; the distributor sets it. The screenings must finish the day before.",
      notice: "Each WAITING ON line names what it waits for and who chases it." },
    p8: { rows: [["Character posts", "Rp0", "7", "HIGH", "MUST"], ["School screening coordination", "Rp1,800,000", "6", "HIGH", "MUST"], ["Distributor coordination", "Rp0", "6", "HIGH", "MUST"],
        ["Trailer edit (waiting on the score)", "Rp0, in-house", "8", "MEDIUM", "SHOULD"], ["Daily feed on a second platform", "Rp0", "9", "LOW", "CUT"], ["Full media kit", "Rp3,000,000 (GUESS)", "10", "LOW", "CUT"]],
      test: "MUST: 7 + 6 + 6 = 19 hours ÷ 4 people ≈ 5 per person per week. Well under about 20.",
      cut: "The daily feed first. It makes posts nobody can tie to a screening or a booking.",
      notice: "Two lines are CUT even though the hours would fit. Prioritising is about effect, not only about time." },
    p9: { s: [["1 · TARGET", "About 120 families with primary-school children join a school screening by Wed 17 Mar 2027."], ["2 · BREAK IT DOWN", "Three screenings, about one school every 2–3 weeks from Mon 25 Jan. Assume about 40 families per screening."],
        ["3 · WHAT DRIVES IT", "Schools that say yes: 3 in the Jakarta cluster. The one-page school offer reaching the principal; the invitation reaching the class group two weeks ahead."], ["4 · EARLY SIGNAL", "Parents replying to the invitation within a week. Baseline UNKNOWN: the PM counts after the first invitation."]],
      check: [["Conversion", "Families at a screening (step 1), and schools scheduled (step 3)."], ["Revenue", "Rp2,500,000 per screening × 3 = Rp7,500,000 from schools (Session 5 price). Ticket revenue UNKNOWN until the distributor gives a screen count (PM, Mon 11 Jan 2027)."], ["Brand", "After each screening, ask 10 parents what the film promised. Counted when they say \"made in Indonesia\" (PM)."]],
      notice: "The top number counts families, the people on the card, not schools. Schools are what drives it, so they sit on step 3." },
    p10: { shown: "Row 1: parents will pay for the cinema rather than wait for streaming. Row 2 (name row): the title is still ours to register for clothes and toys. Row 3: an affordable promotion budget still buys enough screens in week one.",
      rows: [["Parents do not book: a child asking is not a parent paying (Session 5, row 1)", "Fewer than two schools confirmed by Fri 15 Jan 2027", "If below two, offer screenings to community groups nearby and re-test the message", "PM"],
        ["Score agreement not signed", "Unsigned on Mon 11 Jan 2027", "If unsigned, the trailer runs without the score", "Producer"],
        ["Goods-class decision not on record (Session 5, row 2)", "No filing decision on record", "If none, merchandise waits and its hours go to schools", "PM"]],
      notice: "Two of the three risks come straight from Session 5. Bets do not disappear on launch day; they become things to watch." },
    card: [["Name", "Jumbo", "Your project name"], ["FOR WHOM", "Indonesian families with primary-school children", "Session 2, page 4"], ["MAIN MESSAGE", "A family film made in Indonesia, at world-class quality.", "Session 6, page 5"],
      ["positioning", "The animated family film made by an Indonesian studio to world-class production standards", "Session 3, page 2"],
      ["WHY BELIEVE IT", "Made by Visinema Studios, an Indonesian studio, with Indonesian writers in the credits; years in production", "Session 3, Promise → Proof, REAL rows"],
      ["WHERE", "At your child's school: a Saturday-morning screening before the film opens", "Session 6, page 4, access"],
      ["PRICE", "Free for families: the school books the screening (Rp2,500,000). Cinema tickets at the cinema's price", "Session 5, page 4"],
      ["WHAT WE ASK YOU TO DO", "Join your child's school screening before the film opens", "Session 6, page 9, step 1"]],
    cardNotice: "Read the card as a parent would. \"World-class\" is the biggest word on it, and the proof behind it is the one only the team can see today. The card in the class deck (slide 1) is Jumbo after release: its message grew once families proved it.",
    check: [["Page 4 (journey)", "Why does one person move forward or stop?", "YES", "One person from the Session 2 audience; six steps through to share; one fix with an owner and a date, checked against the other steps."],
      ["Page 5 (message)", "What does the audience hear, and why believe it?", "YES", "Main message = the Session 3 roof; two reasons, each pointing to a REAL row; the UNKNOWN promise left out; one ask = page 9, step 1."],
      ["Page 9 (KPI tree)", "Which number says it worked, and which warns early?", "YES", "Four steps; the target counts families; Conversion, Revenue and Brand covered; two UNKNOWNs, each with who and when."],
      ["The Concept Card", "Does every row come from its page, and do the eight rows tell one story?", "NOT YET", "Every row is filled from its page. But WHY BELIEVE IT rests on \"world-class\", proved only inside the studio. Fix: publish one behind-the-scenes post before the first invitation (social lead)."]],
    open: "reply-rate baseline (PM, after the first invitation) · ticket revenue (PM, Mon 11 Jan 2027) · the distributor's paid budget (PM, Mon 11 Jan 2027) · public proof of \"world-class\" (social lead, before the first invitation).",
    checkNotice: "Three core pages say YES and the card says NOT YET. Both are true: a page can be complete while the card shows a promise the audience cannot check yet. That gap is exactly what a card test reads."
  };

  var GOJEK = {
    carried: "Carried in: existing GoRide riders in Jakarta are the primary audience (Session 2). Positioning: the food-ordering service that lives inside the app they already use. Promise → Proof: one-tap ordering, drivers nearby and the checked merchant list are REAL; \"reliable food delivery\" is UNKNOWN (Session 3). Commission is PRIMARY; a family basket earns about +Rp16,500, a single item loses about Rp7,250, break-even is a basket of about Rp63,000 (Session 5).",
    how: "Follow one thread across the three core pages: one rider on page 4, one message on page 5, one number on page 9. All three meet on the Concept Card (slide 11).\nThe honest weakness here is on page 9: the target counts every first order, while Session 5 says a single-item order loses money. The last slide names it and the fix.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION: every figure, date, status and owner is built for teaching. None is Gojek's data, plan or agreement. The pilot dates are an estimate.",
    sub: { 2: "One sentence, one contradiction kept on purpose: we grow by orders, and some orders lose money.", 3: "One funnel. Conversion here is the target on page 9.", 4: "Raka, 27, a Jakarta office worker who books GoRide most mornings.", 5: "One message, three reasons, one ask. The food promise is UNKNOWN, so it is not a reason.", 6: "The biggest channel is one we control. Its cost is home-screen space, not rupiah.", 7: "Pilot start Mon 11 Jan 2027 is an estimate; the GoFood product lead confirms it.", 8: "A team of six. Sixteen MUST hours.", 9: "Four steps. The target counts first orders; the check finds the problem.", 10: "Three risks, all three from our Session 5 bets." },
    p2: { b: [["1 · GOAL", "1,200 existing GoRide riders in the pilot district place a first GoFood order without a voucher, by Sun 7 Mar 2027."], ["2 · AUDIENCE", "Existing GoRide riders in Jakarta; buyer and user are the same person (Session 2)."], ["3 · THE MONEY LINE", "Commission is PRIMARY (Session 5): about 20% + Rp1,000 per order, paid by the merchant."], ["4 · DATE", "Pilot Mon 11 Jan – Sun 7 Mar 2027: an estimate, the product lead confirms it."],
        ["5 · MAIN MESSAGE", "\"The app you already trust now brings the food too.\" (page 5)"], ["6 · CHANNELS", "GoFood tab and capped push (owned) · merchant word of mouth (earned) · referral card (shared)."], ["7 · HOURS", "16 MUST hours a week ÷ 6 people ≈ 3 per person (page 8)."], ["8 · TOP NUMBER", "1,200 first orders without a voucher by Sun 7 Mar 2027 (page 9). Matches box 1."]],
      sentence: "\"We want existing GoRide riders in the pilot district to place a first food order without a voucher, reached through the app they already open, and we will know by this number: 1,200 first orders by Sun 7 Mar 2027.\"",
      contra: "\"We grow by orders, but Session 5 says a single-item order loses about Rp7,250.\" Kept visible: page 9 adds a second line for orders above about Rp63,000.",
      notice: "The contradiction is the Session 5 survival line seen from the growth side. Writing it here is what sends page 9 looking for it." },
    p3: { rows: [["Awareness", "Opens the GoFood tab while booking a ride", "12,000 riders", "GUESS"], ["Consideration", "Opens a merchant menu", "4,000 riders", "GUESS"], ["Conversion", "Places a first order without a voucher", "1,200 riders", "GUESS"], ["Retention", "Orders again within 30 days", "420 riders (35%)", "GUESS"], ["Advocacy", "Shares a merchant with a friend", "120 riders", "GUESS"]],
      box: ["WHERE MOST PEOPLE STOP, AND WHY WE THINK SO", "Tab → menu: two in three never open a menu. Page 4 shows one reason: the home screen is crowded with three services. Every number is a GUESS until the pilot starts."],
      notice: "Conversion here (1,200 riders) is the same number as the target on page 9. The funnel and the tree count the same people." },
    p4: { shown: "Existing GoRide riders in Jakarta; buyer and user are the same person.",
      person: "Raka, 27, a Jakarta office worker who books GoRide most mornings. He first meets GoFood on his home screen.",
      steps: [["discover", "Gojek home screen, after booking a ride", "Sees the GoFood tab next to GoRide", "The home screen is crowded with three services"],
        ["evaluate", "The merchant list in the tab", "Checks whether his usual warung is there", "Only 50 merchants; his warung is missing"],
        ["access", "The GoFood tab, pilot district, lunchtime", "Enters his saved address and sees the fee", "The fee appears only after the address"],
        ["purchase", "GoPay checkout", "Pays for one rice dish and an iced tea in one tap", "A single item feels expensive with the fee"],
        ["experience", "His office lobby, 30 minutes later", "Takes the food from the driver", "The food arrives cold in the rain"],
        ["share", "The office chat group", "Tells colleagues the warung is on GoFood", "No reason to share"]],
      fix: "Access step: show the fee by distance on the merchant card, before the address. Owner: growth lead. From the pilot start, Mon 11 Jan 2027. Checked against the other steps: the single-item cost shows earlier at purchase. That is honest, not a break.",
      notice: "The purchase friction is the Session 5 survival line seen from the rider's side. The walk makes it visible; it does not solve it." },
    p5: { shown: "Positioning: \"…GoFood is the food-ordering service that lives inside the app they already use, because their address, their payment method, and the drivers are already there today.\" REAL rows: (1) one-tap ordering · (2) drivers already nearby · (4) we checked these places first. Not REAL: (3) reliable food delivery, UNKNOWN.",
      main: "\"The app you already trust now brings the food too.\"",
      rows: [["Reason 1 · Nothing new to set up", "Your address and GoPay are already in the app.", "Row 1, one-tap ordering (REAL): saved addresses and GoPay, live in production today."],
        ["Reason 2 · The drivers are already nearby", "The same drivers who take you to work bring lunch.", "Row 2, drivers already nearby (REAL): GoRide fleet density in the pilot district."],
        ["Reason 3 · We checked these places first", "A short list you can trust, not a long one you can't.", "Row 4 (REAL): the 50-merchant launch list, vetted before launch. Valid only while the list keeps growing."]],
      ask: "Place your first food order from the GoFood tab. The same action as page 9, step 1.",
      test: "Read to a GoRide rider: all three reasons keep \"inside the app you already use\": YES. \"Reliable food delivery\" stays out: its Session 3 row is UNKNOWN.",
      notice: "Three REAL reasons, and none of them says the food arrives right. That promise is the UNKNOWN row, so it stays off the card." },
    p6: { rows: [["Paid · rented", "Paid social for a district launch (discover)", "Rp20,000,000 per launch: CUT on page 8, it waits for the basket mix"],
        ["Owned · we control it", "The GoFood tab and a capped push, one a week per rider (discover, evaluate)", "Growth lead, 5 h/week; home-screen space argued monthly with GoRide and GoPay"],
        ["Earned · others talk", "Merchants and drivers telling each other (evaluate)", "Merchant ops, inside 8 h/week of outlet visits"],
        ["Shared · the community makes it", "Riders share a dish through a referral card (share)", "Rp5,000 per referral (GUESS); growth lead, 3 h/week"]],
      notice: "We didn't write \"free\" for the tab. It costs space on a home screen shared with two sibling services." },
    p7: { rows: [["Dates", "Mon 14 Dec 2026 – Sun 10 Jan 2027", "Mon 11 Jan – Sun 7 Mar 2027 (pilot)", "Mon 8 Mar – Sun 4 Apr 2027"],
        ["What happens", "Merchant onboarding; signage printed; fee on the merchant card", "Tab banner live; capped push; one no-voucher week", "Read contribution, not orders; choose the next districts"],
        ["Owner + hours / week", "Merchant ops 8 h · product lead 6 h", "Growth lead 8 h · ops lead 6 h", "Finance lead 3 h · growth lead 4 h"],
        ["WAITING ON", "Paid district launches wait for the basket mix (finance lead, within 2 weeks of the pilot start)", "The no-voucher week waits for signage in its area (merchant ops)", "New districts wait for the contribution read, not the order count (finance lead)"]],
      from: "Pilot start Mon 11 Jan 2027, an estimate; the GoFood product lead confirms it.",
      notice: "The first WAITING ON line is the money question from Session 5. Growth spending waits for it on the calendar, not in someone's head." },
    p8: { rows: [["GoFood tab placement", "Rp0", "2", "HIGH", "MUST"], ["Merchant onboarding", "Rp0", "8", "HIGH", "MUST"], ["Basket-mix count and dashboard", "Rp0", "6", "HIGH", "MUST"],
        ["Merchant signage", "Rp3,600,000", "6", "MEDIUM", "SHOULD"], ["Weekly capped push", "Rp0", "5", "MEDIUM", "SHOULD"], ["Paid social for a district launch", "Rp20,000,000", "4", "LOW", "CUT"]],
      test: "MUST: 2 + 8 + 6 = 16 hours ÷ 6 people ≈ 3 per person per week. Well under about 20.",
      cut: "Paid social first. It buys orders before we know which orders pay.",
      notice: "The cut is not about hours: it is the survival line again. Spending to grow orders waits until the basket mix is counted." },
    p9: { s: [["1 · TARGET", "1,200 existing GoRide riders in the pilot district place a first GoFood order without a voucher, by Sun 7 Mar 2027."], ["2 · BREAK IT DOWN", "Eight pilot weeks from Mon 11 Jan: about 150 first orders a week."],
        ["3 · WHAT DRIVES IT", "Riders who open the tab after booking a ride; 50 checked merchants; the fee shown on the merchant card (page 4)."], ["4 · EARLY SIGNAL", "The share of first orders above about Rp63,000. Baseline UNKNOWN: the finance lead counts the basket mix within 2 weeks of the pilot start."]],
      check: [["Conversion", "First orders without a voucher (step 1)."], ["Revenue", "About 20% + Rp1,000 per order (Session 5). Positive only above a basket of about Rp63,000, so revenue counts those orders; total UNKNOWN until the basket mix is counted (finance lead)."], ["Brand", "Ask 10 riders after their first order why they tried it. Counted when they say \"it's in the app I already use\" (GoFood product lead)."]],
      notice: "The check finds what the target hides: a single-item first order counts the same as a family basket, but it loses money." },
    p10: { shown: "Row 1: riders order without a voucher, at a basket above about Rp63,000. Row 2 (name row): the combined \"GoFood\" mark can be registered under Gojek. Row 3: our real basket mix keeps the average order above zero.",
      rows: [["Orders depend on vouchers (Session 5, row 1)", "Orders fall more than 40% (GUESS) in the no-voucher week", "If they fall, rewrite the growth plan before funding it", "Growth lead"],
        ["Small baskets dominate (Session 5, row 3)", "Average contribution per order negative in pilot weeks 1–2", "If negative, write a minimum-basket rule before any new district", "Finance lead"],
        ["\"GoFood\" mark not cleared (Session 5, row 2)", "No written answer from legal counsel within 2 weeks", "If none, no co-branded packaging with the mark", "GoFood product lead"]],
      notice: "All three risks are the Session 5 bets, now with a sign you would see first. Bets do not disappear on launch day." },
    card: [["Name", "GoFood", "Your project name"], ["FOR WHOM", "Existing GoRide riders in Jakarta", "Session 2, page 4"], ["MAIN MESSAGE", "The app you already trust now brings the food too.", "Session 6, page 5"],
      ["positioning", "The food-ordering service that lives inside the app they already use", "Session 3, page 2"],
      ["WHY BELIEVE IT", "Your address and GoPay are already saved; the drivers are already nearby; every merchant on the list was checked first", "Session 3, Promise → Proof, REAL rows"],
      ["WHERE", "The GoFood tab in the Gojek app you already use, in the pilot district", "Session 6, page 4, access"],
      ["PRICE", "Food at the merchant's price, plus a delivery fee by distance, the same as a GoRide trip", "Session 5, page 4"],
      ["WHAT WE ASK YOU TO DO", "Place your first food order from the GoFood tab", "Session 6, page 9, step 1"]],
    cardNotice: "Every row comes from a REAL line on its page. What a rider still cannot read on this card is whether the food arrives right: that promise is UNKNOWN, and the card does not make it.",
    check: [["Page 4 (journey)", "Why does one person move forward or stop?", "YES", "One rider from the Session 2 audience; six steps through to share; one fix with an owner and a date, checked against the other steps."],
      ["Page 5 (message)", "What does the audience hear, and why believe it?", "YES", "Main message = the Session 3 roof; three reasons, each pointing to a REAL row; the UNKNOWN food promise left out; one ask = page 9, step 1."],
      ["Page 9 (KPI tree)", "Which number says it worked, and which warns early?", "NOT YET", "Four steps and all three checks. But the target counts every first order, and Session 5 says a single item loses about Rp7,250. Fix: keep the ask, and add a second line, first orders above about Rp63,000 (finance lead, once the basket mix is counted)."],
      ["The Concept Card", "Does every row come from its page, and do the eight rows tell one story?", "YES", "Every row is filled from its page; the price row is the same delivery-fee logic as a GoRide trip, which keeps the positioning."]],
    open: "basket mix (finance lead, within 2 weeks of the pilot start) · page 9 second line (finance lead) · no-voucher baseline (growth lead) · the \"GoFood\" mark (legal counsel, within 2 weeks).",
    checkNotice: "A target can be complete and still count the wrong thing. The tree was right to start from people; the check is what showed which people pay."
  };

  var MARVEL = {
    carried: "Carried in: general moviegoers who don't know the character are the primary audience (Session 2). Positioning: the superhero film that works completely on its own. Promise → Proof: \"You can start here\" and \"More to come, if you want it\" are REAL; \"Worth your ticket\" is UNKNOWN (Session 3). Ticketing is PRIMARY; film one needs roughly $450M worldwide before it can fund film two, and the comparator band sits far below (Session 5).",
    how: "Follow one thread across the three core pages: one moviegoer on page 4, one message on page 5, one number on page 9. All three meet on the Concept Card (slide 11).\nThis case has no calendar dates: the distributor sets the opening, so the plan counts back in weeks. The honest weakness is on page 5: one reason could sound like homework. The last slide names it.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION of Marvel Studios before Iron Man's release. Figures marked reported or secondary are public (see speaker notes); every other figure, status and owner is built for teaching. Costs are in US dollars, as in Session 5.",
    sub: { 2: "One sentence, one contradiction: the money line needs film two, the top number counts film one.", 3: "One funnel. Two stages can't be counted yet, and say so.", 4: "Arga, 29, a Jakarta designer who has never read a comic.", 5: "One message, two reasons, one ask. \"Worth your ticket\" is UNKNOWN, so it is not a reason.", 6: "Every channel that carries money belongs to the distributor. Costs in US dollars.", 7: "No dates: the distributor sets the opening, so the plan counts back in weeks.", 8: "A team of four. Fourteen MUST hours. Costs in US dollars.", 9: "Four steps. The early signal is our Session 5 row 1 test.", 10: "Three risks, all three from our Session 5 bets." },
    p2: { b: [["1 · GOAL", "Moviegoers who don't read comics help bring 450,000 advance tickets before opening day."], ["2 · AUDIENCE", "General moviegoers who don't know the character (Session 2)."], ["3 · THE MONEY LINE", "Ticketing is PRIMARY (Session 5). Film one needs roughly $450M worldwide to fund film two."], ["4 · DATE", "Opening weekend, set by the distributor. The plan counts back from it in weeks."],
        ["5 · MAIN MESSAGE", "\"You don't need to know anything to start here.\" (page 5)"], ["6 · CHANNELS", "Trailer and key art via the distributor (paid) · comics and conventions (owned) · reviews (earned)."], ["7 · HOURS", "14 MUST hours a week ÷ 4 people ≈ 3.5 per person (page 8)."], ["8 · TOP NUMBER", "450,000 advance tickets before opening day (page 9). Matches box 1."]],
      sentence: "\"We want moviegoers who don't read comics to book an opening-weekend ticket, reached through the trailer and the film page, and we will know by this number: 450,000 advance tickets before opening day.\"",
      contra: "\"Our money line needs film two, but our top number counts only film one.\" Kept visible: page 10 carries the pause rule for film two (Session 5, row 3).",
      notice: "The contradiction is the slate problem from Session 5. It cannot be solved on this page, so it is carried to page 10 with an owner." },
    p3: { rows: [["Awareness", "Watches the trailer to the end", "3,000,000 viewers", "GUESS"], ["Consideration", "Opens the film page, or asks a friend about it", "1,200,000 viewers", "GUESS"], ["Conversion", "Buys an advance ticket", "450,000 tickets", "GUESS"], ["Retention", "Opens the next-film teaser", "UNKNOWN (marketing lead, after opening)", "—"], ["Advocacy", "Recommends it in a group chat", "UNKNOWN (marketing lead, after opening)", "—"]],
      box: ["WHERE MOST PEOPLE STOP, AND WHY WE THINK SO", "Trailer → film page. Page 4 shows one reason: the trailer assumes you know who Iron Man is. The last two stages cannot be counted before opening, so they say UNKNOWN with an owner instead of a number."],
      notice: "Conversion here (450,000) is the target on page 9. Two empty counts with an owner are more honest than two invented ones." },
    p4: { shown: "General moviegoers who don't know the character.",
      person: "Arga, 29, a Jakarta designer who has never read a comic and goes to the cinema with a friend on Saturdays.",
      steps: [["discover", "A cinema, before another film", "Sees the trailer", "The trailer assumes he knows who Iron Man is"],
        ["evaluate", "The film page and reviews", "Asks a friend whether he needs to know the comics first", "The reviews talk about the comics"],
        ["access", "Ticket app, Saturday showtimes", "Finds an opening-weekend showing near him", "Only one evening showing nearby (the distributor decides)"],
        ["purchase", "Ticket app", "Books two seats at the cinema's price", "Booking weeks ahead feels risky for a hero he doesn't know"],
        ["experience", "The cinema, opening weekend", "Watches the film with his friend", "He waits through the credits without knowing why"],
        ["share", "Friends' group chat", "Tells the group whether it was worth it", "Nothing easy to share"]],
      fix: "Evaluate step: put \"You don't need to know anything to start here\" at the top of the film page. Owner: publicity lead. Live 8 weeks before opening. Checked against the other steps: access stays the distributor's decision, and the page says so.",
      notice: "The frictions are the ones a comic reader would never notice. That is why the walk follows a non-reader." },
    p5: { shown: "Positioning: \"…Iron Man is the superhero film that works completely on its own, because it is a self-contained origin story carried by a lead performance that assumes you know nothing.\" REAL rows: (1) you can start here · (3) more to come, if you want it. Not REAL: (2) worth your ticket, UNKNOWN.",
      main: "\"You don't need to know anything to start here.\"",
      rows: [["Reason 1 · A story that starts now", "No earlier film, no comics: it begins here.", "Row 1, you can start here (REAL): the script needs no earlier film. Real, but only visible after watching."],
        ["Reason 2 · There's more, if you want it", "A short tease after the credits.", "Row 3 (REAL): a post-credits tease designed to cost nothing to ignore."]],
      ask: "Book an opening-weekend ticket. The same action as page 9, step 1.",
      test: "Read to a moviegoer who never read a comic: reason 1 keeps \"start here\": YES. Reason 2 can sound like homework (\"more films to watch\"): NOT YET. Fix the words so \"optional\" is heard first.",
      notice: "Two reasons, not three: \"worth your ticket\" has no proof before a general audience sees the film. And a REAL row can still be worded against the promise." },
    p6: { rows: [["Paid · rented", "Trailer boosts and key art (discover)", "The distributor's marketing budget; our share UNKNOWN (finance asks the distributor)"],
        ["Owned · we control it", "Comics, publishing pages and conventions (evaluate)", "Publishing lead, 8 h/week"],
        ["Earned · others talk", "Reviews after press screenings (evaluate)", "Publicity lead, 4 h/week"],
        ["Shared · the community makes it", "Fan costumes and posts at conventions (share)", "Community lead, 4 h/week; booth CUT on page 8"]],
      notice: "The only channel we direct is the smallest. It is staffed for what it protects: a reason to come back if film one disappoints." },
    p7: { rows: [["Dates", "8 weeks before opening → opening eve", "Opening weekend and the week after", "Weeks 2–12 after opening"],
        ["What happens", "Film-page line (page 4); publishing and convention pages; press screenings", "Opening read against the pause rule", "Second-week read; licensee sell-through"],
        ["Owner + hours / week", "Publishing lead 8 h · publicity lead 6 h", "Publicity lead 2 h · studio head 2 h", "Studio head 2 h · community lead 4 h"],
        ["WAITING ON", "Trailer wide release waits for the distributor's date (publicity lead)", "Boosts wait for the distributor's budget split (finance)", "Film two waits for the pause rule (studio head with finance)"]],
      from: "Opening weekend, set by the distributor. Without a date, the plan counts back in weeks.",
      notice: "A calendar without dates is still a calendar, as long as every line has an owner and knows what it waits for." },
    p8: { rows: [["Publishing and convention pages", "$0 (staffed)", "8", "HIGH", "MUST"], ["Film-page line and press materials", "$0 (staffed)", "4", "HIGH", "MUST"], ["Opening read against the pause rule", "$0", "2", "HIGH", "MUST"],
        ["Trailer cut-downs", "Distributor's budget", "6", "MEDIUM", "SHOULD"], ["Community Q&A livestream", "$0", "4", "MEDIUM", "COULD"], ["Convention booth", "$50,000 (GUESS)", "6", "LOW", "CUT"]],
      test: "MUST: 8 + 4 + 2 = 14 hours ÷ 4 people ≈ 3.5 per person per week. Well under about 20.",
      cut: "The convention booth. It reaches people who already read the comics, not our primary audience.",
      notice: "The cut follows the audience: the booth serves the secondary audience, and the plan is for the primary one." },
    p9: { s: [["1 · TARGET", "Moviegoers who don't read comics help bring 450,000 advance tickets before opening day (GUESS)."], ["2 · BREAK IT DOWN", "Eight weeks of pre-sale: about 56,000 a week on average; expect most in the last two weeks."],
        ["3 · WHAT DRIVES IT", "Trailer viewers who end with \"I'd go\"; showtimes the distributor gives; the film-page line (page 4)."], ["4 · EARLY SIGNAL", "In ten trailer conversations, how many non-readers can say what the film is about (Session 5, row 1). Baseline UNKNOWN: the marketing lead runs them before the wide release."]],
      check: [["Conversion", "Advance tickets (step 1). The share bought by non-readers is UNKNOWN (marketing lead, a one-question survey at checkout)."], ["Revenue", "Ticket price set by the cinema; cinemas keep about half (GUESS, Session 5). Film one needs roughly $450M worldwide; the pause rule sets where film two stops (studio head with finance)."], ["Brand", "After opening weekend, ask 10 viewers: \"Did you need to know anything first?\" Counted when they say no (publicity lead)."]],
      notice: "The early signal is the Session 5 row 1 test, used again. One conversation answers two pages." },
    p10: { shown: "Row 1: moviegoers who don't read comics will buy a ticket for a hero they don't know. Row 2 (name row): \"Iron Man\" can be held as a mark for toys and clothing. Row 3: film one earns enough to fund film two.",
      rows: [["Non-readers don't come (Session 5, row 1)", "Fewer than 6 in 10 trailer conversations can say what the film is about", "If below, recut the trailer opening before the wide release", "Marketing lead"],
        ["Film one lands inside the comparator band (Session 5, row 3)", "Advance tickets below 40% of 450,000 two weeks before opening", "If below, the pause rule applies: no public promise of film two", "Studio head with finance"],
        ["Mark not held for goods (Session 5, row 2)", "No answer on classes 25 and 28 from studio legal counsel within 2 weeks", "If none, licensees ship without the name on the product", "Studio legal counsel"]],
      notice: "Risk 2 is the contradiction from page 2. The pause rule is written now, so nobody argues it away after the opening weekend." },
    card: [["Name", "Iron Man", "Your project name"], ["FOR WHOM", "General moviegoers who don't know the character", "Session 2, page 4"], ["MAIN MESSAGE", "You don't need to know anything to start here.", "Session 6, page 5"],
      ["positioning", "The superhero film that works completely on its own", "Session 3, page 2"],
      ["WHY BELIEVE IT", "The story needs no earlier film; more is there only if you want it", "Session 3, Promise → Proof, REAL rows"],
      ["WHERE", "Cinemas near you, opening weekend; book in your ticket app", "Session 6, page 4, access"],
      ["PRICE", "The cinema's ticket price (set by the cinema)", "Session 5, page 4"],
      ["WHAT WE ASK YOU TO DO", "Book an opening-weekend ticket", "Session 6, page 9, step 1"]],
    cardNotice: "WHY BELIEVE IT is REAL, but a buyer can only check it after watching. Before the ticket, the trailer has to carry that proof.",
    check: [["Page 4 (journey)", "Why does one person move forward or stop?", "YES", "One non-reader from the Session 2 audience; six steps through to share; one fix with an owner and a date; the distributor's decisions named as theirs."],
      ["Page 5 (message)", "What does the audience hear, and why believe it?", "NOT YET", "Main message = the Session 3 roof; two REAL reasons; the UNKNOWN promise left out. But reason 2 can sound like homework. Fix: \"Optional: a short scene after the credits\" (publicity lead, before the film page goes live)."],
      ["Page 9 (KPI tree)", "Which number says it worked, and which warns early?", "YES", "Four steps; Conversion, Revenue and Brand covered; two UNKNOWNs, each with who and when."],
      ["The Concept Card", "Does every row come from its page, and do the eight rows tell one story?", "YES", "Every row is filled from its page; the price row says plainly that the cinema sets it."]],
    open: "share of non-reader buyers (marketing lead) · trailer-conversation baseline (marketing lead, before the wide release) · the distributor's budget split (finance) · reason 2 wording (publicity lead).",
    checkNotice: "The NOT YET is about words, not proof: the row is REAL and the reason still works against the promise. Read every line as your audience hears it."
  };

  var LEGO = {
    carried: "Carried in: existing Technic hobbyists are the primary audience; buyer and user are the same person (Session 2). Positioning: the building set where every added function can be watched working before you buy. Promise → Proof: the reviewer demo is PLANNED; \"price buys function\" and \"still a LEGO set\" are REAL (Session 3). Direct sales is PRIMARY; the flagship sells at Rp6,500,000 and the mould pays only after about 7,150 boxes (Session 5).",
    how: "Follow one thread across the three core pages: one builder on page 4, one message on page 5, one number on page 9. All three meet on the Concept Card (slide 11).\nThe honest weakness is on the card: the positioning promises you can watch every function work, but that proof is PLANNED, so it cannot be a reason yet. The last slide names it.\n" + OPT,
    note: "ILLUSTRATIVE RECONSTRUCTION: every figure, date, status and owner is built for teaching. None is the LEGO Group's data, plan or agreement. Release Mon 22 Feb 2027 is an estimate.",
    sub: { 2: "One sentence, one contradiction: we count pre-orders, the mould counts the year.", 3: "One funnel. Three numbers come from the last flagship (illustrative).", 4: "Hendra, 41, an experienced Technic builder who bought the last flagship.", 5: "One message, two reasons, one ask. The demo is PLANNED, so it is not a reason yet.", 6: "The paid line is cut; the earned line carries the proof.", 7: "Release Mon 22 Feb 2027 is an estimate; licence renewals come first.", 8: "A team of four. Seventeen MUST hours.", 9: "Four steps. The revenue check reads pre-orders against the mould.", 10: "Three risks. Risk 1 is the proof the card is missing." },
    p2: { b: [["1 · GOAL", "1,600 experienced Technic builders pre-order the flagship by Sun 21 Feb 2027."], ["2 · AUDIENCE", "Existing Technic hobbyists; buyer and user are the same person (Session 2)."], ["3 · THE MONEY LINE", "Direct sales is PRIMARY (Session 5): about Rp2,100,000 per flagship before the mould; the mould pays after about 7,150 boxes."], ["4 · DATE", "Release Mon 22 Feb 2027: an estimate. Pre-orders Mon 1 – Sun 21 Feb."],
        ["5 · MAIN MESSAGE", "\"Advanced should mean it works — not that it costs more.\" (page 5)"], ["6 · CHANNELS", "LEGO.com pre-order page (owned) · reviewer demo and forums (earned) · hobbyist events (shared)."], ["7 · HOURS", "17 MUST hours a week ÷ 4 people ≈ 4 per person (page 8)."], ["8 · TOP NUMBER", "1,600 pre-orders by Sun 21 Feb 2027 (page 9). Matches box 1."]],
      sentence: "\"We want experienced Technic builders to pre-order the flagship, reached through reviewers and their own community, and we will know by this number: 1,600 pre-orders by Sun 21 Feb 2027.\"",
      contra: "\"We count pre-orders, but the mould needs about 7,150 boxes in the year.\" Kept visible: page 9 shows pre-orders as a share of the threshold.",
      notice: "A good launch number can still be a small share of what the business needs. Writing both on one page keeps that in view." },
    p3: { rows: [["Awareness", "Watches a build clip in a hobbyist channel", "40,000 builders", "MEASURED (last flagship, illustrative)"], ["Consideration", "Opens the set page and reads the function list", "8,000 builders", "COMPARABLE"], ["Conversion", "Pre-orders the flagship", "1,600 builders", "COMPARABLE (last: 1,400)"], ["Retention", "Buys the next line within a year", "31% of buyers", "MEASURED (CRM, illustrative)"], ["Advocacy", "Posts a finished build", "300 builders", "GUESS"]],
      box: ["WHERE MOST PEOPLE STOP, AND WHY WE THINK SO", "Clip → set page. Page 4 shows one reason: the clip is a teaser, and no function is shown working. That is the PLANNED demo again."],
      notice: "Conversion here (1,600) is the target on page 9. A line with a history can show MEASURED rows; each is still labelled illustrative." },
    p4: { shown: "Existing Technic hobbyists; buyer and user are the same person.",
      person: "Hendra, 41, an experienced Technic builder who bought the last flagship and reads a hobbyist forum at lunch.",
      steps: [["discover", "A hobbyist forum thread", "Sees a short clip of the new mechanism", "The clip is a teaser; no function is shown working"],
        ["evaluate", "The set page on LEGO.com", "Reads the function list against the price", "The list doesn't say what each function adds to the price"],
        ["access", "Pre-order page, or one of two specialist shops", "Finds the pre-order window and the shops", "The window isn't on the set page"],
        ["purchase", "Checkout, or shop pickup", "Pre-orders at Rp6,500,000", "The price next to the mid-range set"],
        ["experience", "Build nights at home", "Builds it over a week", "A missing part"],
        ["share", "The forum and a hobbyist event", "Posts the finished build", "No easy way to share at events"]],
      fix: "Evaluate step: publish the function-per-tier list on the set page, the fix Session 3 already named. Owner: brand manager. Before the pre-order window, Mon 1 Feb 2027. Checked against the other steps: the price looks clearer at purchase, not lower.",
      notice: "The fix comes straight from Session 3: a REAL proof the buyer couldn't see becomes one they can." },
    p5: { shown: "Positioning: \"…the Technic flagship is the building set where every added function can be watched working before you buy, because a pre-launch reviewer demo will show each mechanism moving (PLANNED).\" REAL rows: (2) price buys function · (3) still a LEGO set. Not REAL: (1) watched working before you buy, PLANNED.",
      main: "\"Advanced should mean it works — not that it costs more.\"",
      rows: [["Reason 1 · Priced by function", "Every extra rupiah buys a function, not a sticker.", "Row 2, price buys function (REAL): the internal cost-to-function mapping. Only visible once the function-per-tier list is published (page 4)."],
        ["Reason 2 · Still a LEGO set", "More complex, and it still fits like every set you own.", "Row 3, still a LEGO set (REAL): decades of fit tolerance, inherited from the LEGO name."]],
      ask: "Pre-order the flagship before the window closes. The same action as page 9, step 1.",
      test: "Read to a Technic hobbyist: both reasons keep \"it works, not that it costs more\": YES. The strongest reason, watching each function work, is missing: its row is PLANNED.",
      notice: "The positioning's own promise is not a reason yet. A PLANNED proof becomes a reason the day the demo is held, not before." },
    p6: { rows: [["Paid · rented", "Retargeting for pre-order abandoners (purchase)", "Rp15,000,000: CUT on page 8"],
        ["Owned · we control it", "LEGO.com pre-order page and the newsletter (access)", "Brand manager, 6 h/week"],
        ["Earned · others talk", "Reviewer demo, forum and press reviews (evaluate)", "Marketing lead, 8 h/week; Rp4,000,000 for review units (GUESS)"],
        ["Shared · the community makes it", "Hobbyist event builds and photos (share)", "Rp4,500,000 travel for three events; community lead, 9 h/week"]],
      notice: "The earned line carries the proof the card is missing. That is why it is staffed and the paid line is not." },
    p7: { rows: [["Dates", "Mon 4 – Sun 31 Jan 2027", "Mon 1 – Sun 21 Feb 2027 (pre-orders); release Mon 22 Feb", "Mon 22 Feb – Sun 18 Apr 2027"],
        ["What happens", "Set page with the function list (page 4); reviewer demo, PLANNED, week of Mon 25 Jan; build videos", "Pre-order page live; three event previews; shop push", "Sell-through read against the mould threshold; community Q&A"],
        ["Owner + hours / week", "Brand manager 6 h · marketing lead 8 h · community lead 10 h", "Brand manager 6 h · community lead 9 h · trade marketing 4 h", "Brand manager 3 h · community lead 5 h"],
        ["WAITING ON", "No mould until both licence renewals are confirmed (licensing lead, Mon 4 Jan 2027)", "If the demo slips, the page goes live with the demo marked PLANNED (marketing lead)", "Next year's flagship waits for the threshold read, Mon 19 Apr 2027 (finance with design)"]],
      from: "Release Mon 22 Feb 2027, an estimate. The licence renewals are the only item that can move it on their own.",
      notice: "The demo has a week on the calendar and a rule for when it slips. A PLANNED proof needs both." },
    p8: { rows: [["Pre-order page and set page", "Rp0", "6", "HIGH", "MUST"], ["Reviewer demo (PLANNED)", "Rp4,000,000", "8", "HIGH", "MUST"], ["Sell-through read against the threshold", "Rp0", "3", "HIGH", "MUST"],
        ["Build-video series", "Rp12,000,000", "10", "HIGH", "SHOULD"], ["Hobbyist event previews", "Rp4,500,000", "9", "MEDIUM", "SHOULD"], ["Paid retargeting", "Rp15,000,000", "3", "LOW", "CUT"]],
      test: "MUST: 6 + 8 + 3 = 17 hours ÷ 4 people ≈ 4 per person per week. Well under about 20.",
      cut: "Paid retargeting. It reaches people already on our own list, and it stops the day the money stops.",
      notice: "The demo is MUST because the positioning rests on it. The biggest rupiah line is only SHOULD." },
    p9: { s: [["1 · TARGET", "1,600 experienced Technic builders pre-order the flagship by Sun 21 Feb 2027."], ["2 · BREAK IT DOWN", "A three-week window from Mon 1 Feb: about 530 a week. The last flagship took 1,400 (illustrative)."],
        ["3 · WHAT DRIVES IT", "The reviewer demo held before the window (PLANNED); the function-per-tier list (page 4); two specialist shops."], ["4 · EARLY SIGNAL", "\"Notify me\" sign-ups on the set page before the window. Baseline UNKNOWN: the brand manager pulls the last flagship's count within 2 weeks."]],
      check: [["Conversion", "Pre-orders (step 1)."], ["Revenue", "Rp6,500,000 at retail, about Rp2,100,000 per set before the mould (Session 5). 1,600 pre-orders ≈ 22% of the 7,150-box threshold; the year must bring the rest."], ["Brand", "Ask 10 buyers after the build: \"Did each function work the way the page said?\" Counted when they say yes (brand manager)."]],
      notice: "The revenue check puts the launch number next to the mould. 1,600 is a good launch and still only a fifth of what the year needs." },
    p10: { shown: "Row 1: hobbyists will pay the flagship premium once they've watched each function working. Row 2 (name row): \"Technic\" is covered in classes 28 and 41, and a tier name is still free. Row 3: the flagship sells 8,000 boxes, past the mould threshold of about 7,150.",
      rows: [["Demo not held before the window (Session 5, row 1)", "No demo date fixed by Mon 11 Jan 2027", "If none, the page goes live with the demo marked PLANNED and the card's promise is shrunk", "Marketing lead"],
        ["Flagship misses the threshold (Session 5, row 3)", "Pre-orders below 1,000 by Sun 14 Feb 2027", "If below, no second run; the next mould waits for the read", "Finance with design"],
        ["Licence renewal slips (page 7)", "Renewal unconfirmed on Mon 4 Jan 2027", "If unconfirmed, no mould commitment; the set moves to the unlicensed line", "Licensing lead"]],
      notice: "Risk 1 and the card's NOT YET are the same thing seen twice: a promise waiting for its proof." },
    card: [["Name", "LEGO Technic flagship", "Your project name"], ["FOR WHOM", "Existing Technic hobbyists; buyer and user are the same person", "Session 2, page 4"], ["MAIN MESSAGE", "Advanced should mean it works — not that it costs more.", "Session 6, page 5"],
      ["positioning", "The building set where every added function can be watched working before you buy", "Session 3, page 2"],
      ["WHY BELIEVE IT", "Every extra rupiah buys a function (the function-per-tier list); still a LEGO set, with decades of fit tolerance", "Session 3, Promise → Proof, REAL rows"],
      ["WHERE", "Pre-order on LEGO.com or at two specialist hobby shops, Mon 1 – Sun 21 Feb 2027", "Session 6, page 4, access"],
      ["PRICE", "Rp6,500,000", "Session 5, page 4"],
      ["WHAT WE ASK YOU TO DO", "Pre-order the flagship before the window closes", "Session 6, page 9, step 1"]],
    cardNotice: "Read the small positioning line under the main message: \"watched working before you buy\". Nothing in WHY BELIEVE IT lets a buyer watch anything yet.",
    check: [["Page 4 (journey)", "Why does one person move forward or stop?", "YES", "One builder from the Session 2 audience; six steps through to share; one fix with an owner and a date, taken from Session 3."],
      ["Page 5 (message)", "What does the audience hear, and why believe it?", "YES", "Main message = the Session 3 roof; two REAL reasons; the PLANNED promise left out; one ask = page 9, step 1."],
      ["Page 9 (KPI tree)", "Which number says it worked, and which warns early?", "YES", "Four steps; Conversion, Revenue (against the mould) and Brand covered; one UNKNOWN with who and when."],
      ["The Concept Card", "Does every row come from its page, and do the eight rows tell one story?", "NOT YET", "Every row is filled from its page. But the positioning promises \"watched working before you buy\", and WHY BELIEVE IT can't show that. Fix: hold the reviewer demo before the window (marketing lead, week of Mon 25 Jan 2027)."]],
    open: "reviewer demo date (marketing lead) · \"notify me\" baseline (brand manager, within 2 weeks) · licence renewals (licensing lead, Mon 4 Jan 2027) · function-per-tier list (brand manager, before Mon 1 Feb 2027).",
    checkNotice: "Three pages say YES and the card says NOT YET, like Jumbo: the card is where a promise and its proof sit side by side."
  };

  var DATA = { jumbo: JUMBO, gojek: GOJEK, marvel: MARVEL, lego: LEGO };
  var NAMES = { jumbo: "Jumbo (before cinema release)", gojek: "Gojek / GoFood", marvel: "Disney/Marvel (Iron Man)", lego: "LEGO Technic" };
  var CHIPS = { jumbo: "Jumbo", gojek: "Gojek / GoFood", marvel: "Disney/Marvel", lego: "LEGO Technic" };

  /* ================= contoh: dibangun dari data di atas ================= */
  function tbl(label, cols, rows) { return { label: label, cols: cols, rows: rows }; }
  function build(k, n) {
    var D = DATA[k], P = D["p" + n], ex = { name: NAMES[k], sub: D.sub[n], caveat: D.note, values: {} }, V = ex.values;
    if (n === 2) {
      ["goal", "audience", "money", "date", "message", "channels", "hours", "top"].forEach(function (id, i) { V["s6.p2." + id] = P.b[i][1]; });
      V["s6.p2.sentence"] = P.sentence; V["s6.p2.contra"] = P.contra;
    } else if (n === 3) {
      V["s6.p3.funnel"] = tbl("AUDIENCE FUNNEL", ["STAGE", "WHAT THE PERSON DOES: A BEHAVIOUR YOU COULD SEE", "HOW MANY", "ORIGIN"], P.rows);
      V["s6.p3.drop"] = { label: P.box[0], text: P.box[1] };
    } else if (n === 4) {
      ex.before = [{ label: "HOW TO USE THIS EXAMPLE", value: D.how }, { label: "CARRIED IN FROM SESSIONS 2, 3 AND 5", value: D.carried },
        { label: "PRIMARY AUDIENCE · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED", value: P.shown }];
      V["s6.p4.person"] = P.person;
      V["s6.p4.journey"] = tbl("SIX STEPS", ["STEP", "WHERE IT HAPPENS", "WHAT THEY DO, THINK OR ASK", "WHAT COULD STOP THEM"], P.steps.map(function (r) { return [r[0].toUpperCase()].concat(r.slice(1)); }));
      V["s6.p4.fix"] = P.fix;
    } else if (n === 5) {
      ex.before = (k === "jumbo" ? [{ label: "HOW TO USE THIS EXAMPLE", value: D.how }] : []).concat([{ label: "YOUR POSITIONING AND YOUR REAL PROMISE → PROOF ROWS · SESSION 3 · SHOWN, NOT RETYPED", value: P.shown }]);
      V["s6.p5.main"] = P.main;
      V["s6.p5.reasons"] = tbl("REASONS", ["REASON (SUPPORTING MESSAGE)", "WHAT IT SAYS", "PROOF: WHICH REAL ROW OF YOUR SESSION 3 PROMISE → PROOF"], P.rows);
      V["s6.p5.ask"] = P.ask; V["s6.p5.test"] = P.test;
    } else if (n === 6) {
      V["s6.p6.media"] = tbl("MEDIA MAP", ["MEDIA", "ROLE: DOING WHAT, FOR WHICH STEP", "COST: RUPIAH, OR HOURS WITH A NAME"], P.rows);
    } else if (n === 7) {
      V["s6.p7.from"] = P.from;
      V["s6.p7.calendar"] = tbl("CAMPAIGN CALENDAR", ["", "PRE-LAUNCH", "LAUNCH", "POST-LAUNCH"], P.rows);
    } else if (n === 8) {
      V["s6.p8.rows"] = tbl("BUDGET PRIORITY MATRIX", ["ACTIVITY", "RUPIAH", "HOURS / WEEK", "EFFECT ON YOUR TOP NUMBER", "PRIORITY"], P.rows);
      V["s6.p8.test"] = P.test; V["s6.p8.cut"] = P.cut;
    } else if (n === 9) {
      ["target", "breakdown", "drivers", "signal"].forEach(function (id, i) { V["s6.p9." + id] = { label: P.s[i][0], text: P.s[i][1] }; });
      V["s6.p9.check"] = tbl("THEN CHECK: DOES YOUR TREE COVER ALL THREE?", ["CHECK", "WHERE IT SITS IN YOUR TREE, OR UNKNOWN + WHO + WHEN"], P.check);
    } else if (n === 10) {
      ex.before = [{ label: "YOUR THREE BETS · SESSION 5, PAGE 8 · SHOWN, NOT RETYPED", value: P.shown }];
      V["s6.p10.risks"] = tbl("LAUNCH RISKS", ["RISK: WHAT HAPPENS", "EARLY-WARNING SIGN", "IF X, THEN Y", "OWNER"], P.rows);
    }
    ex.notice = P.notice;
    return ex;
  }
  function examples(n) { var o = {}; ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) { o[k] = build(k, n); }); return o; }
  function cardExamples() {
    var o = {};
    ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) {
      var D = DATA[k];
      o[k] = { chip: CHIPS[k], name: NAMES[k], how: k === "jumbo" ? D.how : "", rows: D.card, cardNotice: D.cardNotice, check: D.check, open: D.open, checkNotice: D.checkNotice, note: D.note };
    });
    return o;
  }
  function opt(min) { return "<p><b class='k'>Halaman ini boleh dilewati.</b> " + min + "</p>"; }
  function mistake(t) { return "<p><b>Common mistake:</b> " + t + "</p>"; }

  CB.content.S6 = {
    caseDates: true, /* tanggal kasus 2027 di contoh (doc 91); tools/audit.py hanya menolak tanggal Nov/Des tanpa tahun (minggu kursus) */
    pages: {
      /* ================= hlm. 2 — Go-to-Market Canvas (R6) ================= */
      2: {
        theory: { title: "Page 2 · Go-to-Market Canvas", src: "Syllabus Session 6 In-Class Tool (Go-to-Market Canvas); Kotler, Keller & Chernev (2022). Jumbo: Session 6 worked example, p.2 (illustrative).",
          html: "<p><b>What it answers:</b> your <b>whole plan in one sentence</b>: who does what, by when, and how you will know.</p>" +
            "<p><b>Fill it when:</b> your team needs to agree on <b>one direction</b>, or the plan feels scattered.</p>" +
            "<p><b>How:</b> boxes 1–4 first (goal, audience, money line, date). Boxes 5–8 last, after your other pages exist. Then read all eight aloud as one sentence and write <b>one place where the plan contradicts itself</b>.</p>" +
            "<p><b>Minimum already in:</b> <b>page 9</b> top number (your goal), Session 2 audience, Session 5 price.</p>" + mistake("“Go viral” as a goal. No number, it is a wish; no date, a mood.") },
        why: opt("Minimumnya sudah ada di page 9 (KPI tree), audiens Sesi 2, dan harga Sesi 5. Kotak 2, 3, 5 dan 8 tampil dari halaman asalnya; isi kalau tim perlu sepakat satu arah."),
        examples: examples(2)
      },
      /* ================= hlm. 3 — Audience Funnel (R7) ================= */
      3: {
        theory: { title: "Page 3 · Audience Funnel", src: "Syllabus Session 6 Key Topics (audience funnel); Kotler, Keller & Chernev (2022); Rowles (2022). Jumbo: worked example p.3 (illustrative); the counts are assumptions added for teaching.",
          html: "<p><b>What it answers:</b> <b>how many</b> people move forward, and where most stop.</p>" +
            "<p><b>Fill it when:</b> you have numbers or estimates per stage, or need to show where your money comes in.</p>" +
            "<p><b>How:</b> five stages: awareness → consideration → conversion → retention → advocacy. For each, write <b>what the person does</b> (a behaviour you could see) and <b>how many</b>. Tag each number <b>MEASURED, COMPARABLE or GUESS</b>.</p>" +
            "<p><b>Not the same as page 4:</b> the funnel <b>counts many people</b>; the journey <b>follows one</b>. The funnel shows where people drop; the journey shows why.</p>" +
            "<p><b>Minimum already in:</b> page 4 + page 9, step 2.</p>" + mistake("“They feel curious.” You cannot count it. “They open the trailer link” you can.") },
        why: opt("Minimumnya sudah ada di page 4 (journey) dan page 9 (KPI tree), langkah 2."),
        examples: examples(3)
      },
      /* ================= hlm. 4 — Customer Journey Map (R1) ================= */
      4: {
        theory: { title: "Page 4 · Customer Journey Map", src: "Syllabus Session 6 (discover, evaluate, access, purchase, experience, share or recommend); Lemon & Verhoef (2016), Journal of Marketing. Jumbo: Session 6 worked example, p.4 (illustrative).",
          html: "<p><b>What this page answers:</b> <b>why</b> one person moves forward or stops.</p>" +
            "<p><b>How:</b> (1) Pick <b>one person</b> from your primary audience (Session 2) and give her a name. (2) Walk her through <b>six steps</b>. For each, write where it happens, what she thinks or asks, and what could stop her. (3) Choose <b>one friction</b> to fix: what changes, who does it, by when.</p>" +
            "<p><b>Goes on the card:</b> your <b>access</b> step becomes the row <b>Where</b>.</p>" +
            mistake("Drawing it for \"everyone\", or stopping at purchase. If the walk ends at purchase, you drew a sales funnel, not a journey.") +
            "<p class='small muted'>The examples below are Jumbo <b>before</b> its cinema release: a plan built around school screenings. The card at the start of class was Jumbo after release. Same brand, different situation, so a different target and message.</p>" },
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> produk macet kalau orang tidak pernah bertemu dengannya. Halaman ini menggambar jalan <b>satu orang</b>, audiens utamamu dari Sesi 2, dari tidak tahu sampai mengajak orang lain.</p>" +
          "<p><b>What Clubhouse teaches.</b> (1) <b>Gambar untuk satu orang.</b> Clubhouse kehilangan audiensnya saat menggambar ulang jalannya untuk semua orang. (2) <b>Di setiap langkah, tanya apa yang bisa membuatnya berhenti.</b> Untuk audiens asli Clubhouse: langkah experience. (3) <b>Perbaiki satu friksi, lalu cek langkah lain.</b> Clubhouse memperbaiki access dan merusak experience orang yang paling setia.</p>" +
          "<p>Langkah <b>access</b>-mu menjadi baris <b>WHERE</b> di Concept Card. Audiens di atas halaman masih kosong? Isi dulu Sesi 2: kartumu dirakit dari situ.</p>",
        examples: examples(4)
      },
      /* ================= hlm. 5 — Message and Content Matrix (R2, v6) ================= */
      5: {
        theory: { title: "Page 5 · Message and Content Matrix", src: "Syllabus Session 3 (message hierarchy: master message, supporting messages, proof points, calls to action); Keller & Swaminathan (2020). Jumbo: Session 6 worked example, p.5 (illustrative); proofs: Session 3 worked example, Promise → Proof (REAL rows).",
          html: "<p><b>What this page answers:</b> what your primary audience <b>hears</b>, and why they should <b>believe</b> it.</p>" +
            "<p><b>How:</b> (1) <b>One main message</b>, from the promise in your positioning (Session 3). (2) <b>2–3 reasons</b> (supporting messages). Each points to a proof from your Session 3 Promise → Proof, REAL row. (3) <b>One ask</b>: the same action as the top of your KPI Tree on page 9.</p>" +
            "<p><b>The test:</b> read each line to your primary audience. Does it still keep the promise in your positioning?</p>" +
            "<p><b>Goes on the card:</b> main message → the <b>big row</b>. Proof → <b>Why believe it</b>. Ask → <b>What we ask you to do</b>.</p>" +
            mistake("Writing for everyone, or inventing a new message. A message with no link to Session 3 is a new strategy written at the last minute.") +
            "<p><b>Before release.</b> <i>The card on slide 1 of the class deck is after release: its message grew once families proved it. Before release, write only as far as your REAL proof.</i></p>" },
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> produk macet kalau orang tidak paham apa yang ditawarkan. Pesan utama tidak dibuat baru: ia turun dari janji di positioning Sesi 3, dan setiap reason menunjuk satu baris REAL Promise → Proof. Baris REAL itu satu-satunya sumber <b>WHY BELIEVE IT</b> di kartu.</p>" +
          "<p><b>What Clubhouse teaches.</b> (1) <b>Tulis untuk audiens utamamu, bukan untuk semua orang.</b> Pesan Clubhouse 2021 bicara ke seluruh dunia; orang yang paling setia mendengar \"bukan untuk kami\". (2) <b>Pengalamanmu juga mengucapkan pesan.</b> Clubhouse tidak pernah menulis \"eksklusif\"; undangannya yang mengatakannya.</p>" +
          "<p><b>ONE ASK</b> = langkah 1 page 9 (KPI tree), aksi yang sama. Pesan utama menjadi baris besar kartu; ajakan menjadi <b>WHAT WE ASK YOU TO DO</b>.</p>",
        examples: examples(5)
      },
      /* ================= hlm. 6 — Media Map (R8) ================= */
      6: {
        theory: { title: "Page 6 · Paid–Owned–Earned–Shared Media Map", src: "Syllabus Session 6 Key Topics (paid, owned, earned, shared · channel roles · KOL strategy); Rowles (2022), Digital Branding. Jumbo: worked example p.6 (illustrative).",
          html: "<p><b>What it answers:</b> <b>which channels</b>, doing what, at what cost.</p>" +
            "<p><b>Fill it when:</b> you use more than two channels, or rely on ads, a partner or a KOL.</p>" +
            "<p><b>How:</b> put each channel under <b>Paid</b> (rented), <b>Owned</b> (you control), <b>Earned</b> (others talk) or <b>Shared</b> (your community makes things). Give each a <b>role</b>: doing what, for which step. Give each a <b>cost</b>: rupiah, or <b>hours with a name</b>.</p>" +
            "<p><b>At student scale:</b> the real budget is hours. A community leader in your niche beats a celebrity.</p>" +
            "<p><b>Minimum already in:</b> page 4, discover and access steps.</p>" + mistake("“Instagram” with no role, or “free” with no hours.") },
        why: opt("Minimumnya sudah ada di page 4 (journey), langkah discover dan access."),
        callout: "<b>AT STUDENT SCALE</b> · The real budget is hours. A community leader in your niche beats a celebrity. Partners from Session 5 page 5 (partners) belong here only if they do something at launch.",
        examples: examples(6)
      },
      /* ================= hlm. 7 — Campaign Calendar (R9) ================= */
      7: {
        theory: { title: "Page 7 · Campaign Calendar", src: "Syllabus Session 6 Key Topics (campaign calendar); syllabus §13: high-cost production and paid promotion wait for approval. Jumbo: worked example p.7 (illustrative).",
          html: "<p><b>What it answers:</b> <b>what happens which week</b>, and who owns it.</p>" +
            "<p><b>Fill it when:</b> you have a launch date or milestone, and more than two people working.</p>" +
            "<p><b>How:</b> work backwards from the date: <b>pre-launch, launch, post-launch</b>. Every line gets <b>one owner and hours per week</b>. Add a <b>WAITING ON</b> row: what cannot start yet, what it waits for, and by when.</p>" +
            "<p><b>Minimum already in:</b> page 4: your one fix, with who and when.</p>" + mistake("Everything in launch week, or a line with no owner. A calendar line with no owner is a wish.") },
        why: opt("Minimumnya sudah ada di page 4 (journey): satu fix, dengan siapa dan kapan."),
        examples: examples(7)
      },
      /* ================= hlm. 8 — Budget Priority Matrix (R10) ================= */
      8: {
        theory: { title: "Page 8 · Budget Priority Matrix", src: "Syllabus Session 6 Key Topics (budget prioritisation). 20 hours is this course's working limit, not a syllabus figure. Jumbo: worked example p.8 (illustrative).",
          html: "<p><b>What it answers:</b> <b>what you cut</b>, so the plan fits the hours you really have.</p>" +
            "<p><b>Fill it when:</b> your plan needs more hours than your team has.</p>" +
            "<p><b>How:</b> list each activity with rupiah <b>and</b> hours per week. Rate its effect on your top number (HIGH, MEDIUM, LOW). Label it <b>MUST, SHOULD, COULD or CUT</b>. Add up the MUST hours, divide by the number of people.</p>" +
            "<p><b>Our working limit:</b> about <b>20 hours per person per week</b>, before other classes. A course rule of thumb, not a syllabus rule.</p>" +
            "<p><b>Minimum already in:</b> page 4: one fix with an owner.</p>" + mistake("Nothing marked CUT. A plan with nothing cut has not been prioritised.") },
        why: opt("Minimumnya sudah ada di page 4 (journey): satu fix dengan pemilik."),
        examples: examples(8)
      },
      /* ================= hlm. 9 — KPI Tree (R3, v6) ================= */
      9: {
        theory: { title: "Page 9 · KPI Tree", src: "Syllabus Session 6 Key Topics (commercial metrics); syllabus §11 rubric; Doerr (2018), Measure What Matters; Rowles (2022). Jumbo: worked example p.9 in four steps (illustrative; 40 families per screening is an assumption).",
          html: "<p><b>What this page answers:</b> <b>which number</b> says it worked, and which earlier numbers <b>warn you</b> in time.</p>" +
            "<p><b>How · four steps:</b> (1) <b>Start from the target:</b> who · does what (your ask on page 5) · how many · by when. (2) <b>Break it down</b> per week or per day. (3) <b>Find what drives it.</b> (4) <b>Watch an early signal:</b> a number that moves before the result.</p>" +
            "<p><b>Then check:</b> does your tree cover <b>Conversion</b>, <b>Revenue</b> (from your Session 5 price) and <b>Brand</b> (a plan to measure it is enough)? <b>UNKNOWN</b> is fine, with who finds out and by when.</p>" +
            "<p><b>Goes on the card:</b> the top number → <b>What we ask you to do</b>.</p>" +
            mistake("Putting the biggest number on top, or an output (“post 20 times”) instead of what people do.") },
        why: "<p><b class='k'>Kenapa halaman ini penting:</b> produk macet kalau tim menghitung angka yang salah. Clubhouse mengumumkan angka besar (pengguna mingguan, valuasi, room yang ramai), padahal yang penting adalah berapa orang yang <b>masih aktif</b>. <b>Measure what matters</b>: bukan angka terbesar, tapi angka yang membantu kalian bertindak lebih awal.</p>" +
          "<p>Mulai dari <b>target</b>, lalu turun ke angka per minggu, cari pendorongnya, dan pasang satu sinyal awal: empat langkah yang sama untuk Jumbo dan Clubhouse di kelas. Langkah 1 menghitung <b>orang di kartu</b> yang melakukan ajakan page 5 (message). Baris Revenue mulai dari harga Sesi 5 (tampil di atas); baris Brand cukup rencana cara mengukur.</p>",
        examples: examples(9)
      },
      /* ================= hlm. 10 — Launch Risk & Contingency (R11) ================= */
      10: {
        theory: { title: "Page 10 · Launch Risk & Contingency", src: "Syllabus Session 6, Session Output component 11 (risk and contingency plan); Session 5 page 8 (your three bets). Jumbo: worked example p.10 (illustrative).",
          html: "<p><b>What it answers:</b> if something goes wrong, <b>how you will see it coming</b>, and <b>what you will do</b>.</p>" +
            "<p><b>Fill it when:</b> bets on your Session 5 page 8 are still untested, or the plan depends on someone outside the team.</p>" +
            "<p><b>How:</b> for each risk: what happens, the <b>early-warning sign</b>, an <b>“if X, then Y”</b>, and an owner. Start from your Session 5 bets; they do not disappear on launch day.</p>" +
            "<p><b>Minimum already in:</b> page 9: every UNKNOWN has who finds out and when.</p>" + mistake("A list of fears with no “then”. A risk without a plan is only a worry.") },
        why: opt("Minimumnya sudah ada di page 9 (KPI tree): setiap UNKNOWN punya siapa dan kapan. Tiga taruhan Sesi 5 (page 8, your three bets) tampil di atas: mulai dari situ."),
        examples: examples(10)
      }
    },
    /* ================= Concept Card (R4) ================= */
    card: {
      intro: "<p><b class='k'>Concept Card</b> dirakit otomatis dari halamanmu: tidak ada yang diketik di sini. Tiga baris berwarna datang dari halaman inti Sesi 6; sisanya dari Sesi 2, 3 dan 5. Baris kosong tampil <b>not filled yet</b>: isi halaman asalnya (tautan di tiap baris). Positioning ditulis kecil di bawah pesan utama, bukan untuk dibaca orang, tapi supaya kamu bisa cek: <b>pesannya masih setia pada positioning atau tidak</b>.</p>" +
        "<div class='tscroll'><table class='wbtable ro'><thead><tr><th>Row on the card</th><th>Comes from</th><th>If it is empty</th></tr></thead><tbody>" +
        "<tr><th>Name</th><td>Your project name</td><td>Write it in the tool</td></tr>" +
        "<tr><th>For whom</th><td>Session 2, page 4: your primary audience</td><td>Go back to Session 2</td></tr>" +
        "<tr><th>MAIN MESSAGE</th><td>Session 6, <b>page 5</b>: your one main message</td><td>Write page 5</td></tr>" +
        "<tr><th>positioning (small)</th><td>Session 3, page 2: your positioning statement</td><td>Go back to Session 3</td></tr>" +
        "<tr><th>Why believe it</th><td>Session 3, Promise → Proof: the REAL rows</td><td>Go back to Session 3</td></tr>" +
        "<tr><th>WHERE</th><td>Session 6, <b>page 4</b>: your access step</td><td>Write page 4</td></tr>" +
        "<tr><th>Price</th><td>Session 5, page 4: your price</td><td>Go back to Session 5</td></tr>" +
        "<tr><th>WHAT WE ASK YOU TO DO</th><td>Session 6, <b>page 9</b>: your top number</td><td>Write page 9</td></tr>" +
        "</tbody></table></div>" +
        "<p>An empty row shows <b>“not filled yet”</b>. The card is built from your pages: to change a row, change its page. Up to five of the most complete cards are tested in the offline class.</p>" +
        "<p class='small muted'>Concept Card specification, Session 6 class script. The three highlighted rows come from today's core pages. Di kelas offline: <b>DO</b> = langkah kecil yang gampang dibatalkan; <b>PAY</b> = memberi sesuatu yang hilang kalau mundur (uang, waktu yang dipesan, nomor HP untuk dihubungi, rekomendasi). Latihan, bukan bukti: teman sekelas bukan audiens targetmu.</p>",
      examples: cardExamples()
    }
  };
})();
