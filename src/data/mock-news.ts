import type { NewsItem } from "./types";

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    slug: "hyderabad-heavy-rains-waterlogging-alert-traffic-advisory",
    titleTe: "హైదరాబాద్‌లో పలుచోట్ల కుండపోత వర్షం.. ప్రధాన రహదారులపై స్తంభించిన ట్రాఫిక్",
    shortSummaryTe: "హైదరాబాద్ నగరంలోని మాదాపూర్, గచ్చిబౌలి, కూకట్‌పల్లి, బంజారాహిల్స్ పరిసరాల్లో శుక్రవారం సాయంత్రం భారీ వర్షం కురిసింది. లోతట్టు ప్రాంతాలు జలమయమయ్యాయి. ఐటీ కారిడార్‌లో వాహనాలు నెమ్మదిగా కదులుతున్నాయి. జీహెచ్‌ఎంసీ, డీఆర్‌ఎఫ్ బృందాలు రంగంలోకి దిగాయి. అత్యవసరమైతే తప్ప ప్రజలు బయటకు రావద్దని అధికారులు సూచించారు.",
    fullContentTe: `హైదరాబాద్ నగరంలో శుక్రవారం సాయంత్రం వాతావరణం ఒక్కసారిగా మారిపోయింది. పలు ప్రాంతాల్లో ఉరుములు, మెరుపులతో కూడిన భారీ వర్షం కురిసింది. సుమారు రెండు గంటలపాటు ఎడతెరిపి లేకుండా కురిసిన వర్షానికి రహదారులు నదులను తలపించాయి.

ప్రధానంగా మాదాపూర్, గచ్చిబౌలి, రాయదుర్గం, హైటెక్ సిటీ, కూకట్‌పల్లి, మియాపూర్, బంజారాహిల్స్, జూబ్లీహిల్స్, పంజాగుట్ట, సికింద్రాబాద్ పరిసర ప్రాంతాల్లో కుండపోత వర్షం నమోదైంది. రోడ్లపై భారీగా వరద నీరు చేరడంతో సాయంత్రం వేళ ఆఫీసుల నుంచి ఇళ్లకు వెళ్లే వాహనదారులు తీవ్ర ఇబ్బందులు పడ్డారు. ఐటీ కారిడార్‌లో కిలోమీటర్ల మేర ట్రాఫిక్ నిలిచిపోయింది.

సమాచారం అందుకున్న జీహెచ్‌ఎంసీ డీఆర్‌ఎఫ్ (డిజాస్టర్ రెస్పాన్స్ ఫోర్స్) బృందాలు వెంటనే సహాయక చర్యలు చేపట్టాయి. డ్రైనేజీ మ్యాన్‌హోల్స్ వద్ద పేరుకుపోయిన చెత్తాచెదారాన్ని తొలగించి వరద నీరు సాఫీగా వెళ్లేలా చర్యలు తీసుకుంటున్నారు. అత్యవసరమైతే తప్ప ప్రజలు ఇళ్ల నుంచి బయటకు రావద్దని నగర మేయర్, ట్రాఫిక్ పోలీసులు విజ్ఞప్తి చేశారు. ఏదైనా సహాయం కోసం జీహెచ్‌ఎంసీ కంట్రోల్ రూమ్ నంబర్లకు ఫోన్ చేయాలని అధికారులు తెలిపారు.`,
    title: "Heavy Downpour Lashes Hyderabad; Traffic Crawls Across Key Arteries",
    shortDescription: "Incessant heavy rains triggered waterlogging across IT corridor and central Hyderabad as disaster response teams swung into action.",
    content: "Heavy rains lashed multiple parts of Hyderabad causing localized waterlogging and heavy evening traffic snarls.",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "హైదరాబాద్ ఐటీ కారిడార్‌లో కురుస్తున్న భారీ వర్షం దృశ్యం.",
    videoUrl: "https://www.youtube.com/watch?v=kYJ3hJzVl58",
    publishedAt: "2026-09-26T19:30:00Z",
    publishedDate: "2026-09-26",
    publishedTime: "19:30",
    views: 18450,
    likes: 1420,
    shares: 612,
    status: "published",
    author: "రాజేష్ గౌడ్",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-2",
    slug: "andhra-pradesh-amaravati-capital-construction-restarts-world-bank-funds",
    titleTe: "అమరావతి పునర్నిర్మాణానికి వేగంగా అడుగులు.. ప్రపంచ బ్యాంకు నిధుల విడుదలకు గ్రీన్ సిగ్నల్",
    shortSummaryTe: "ఆంధ్రప్రదేశ్ రాజధాని అమరావతి నిర్మాణ పనులను వేగవంతం చేసేందుకు ప్రభుత్వం కీలక నిర్ణయం తీసుకుంది. ప్రపంచ బ్యాంకు, ఏడీబీ సంయుక్తంగా అందించే ₹15,000 కోట్ల రుణ ప్రక్రియ తుది దశకు చేరింది. సీడ్ యాక్సిస్ రోడ్లు, శాసనసభ, హైకోర్టు భవనాల పెండింగ్ పనులను త్వరలోనే ప్రారంభించేందుకు సీఆర్డీయే సన్నాహాలు ముమ్మరం చేసింది.",
    fullContentTe: `ఆంధ్రప్రదేశ్ ప్రజా రాజధాని అమరావతి అభివృద్ధి పనులు పునఃప్రారంభానికి సర్వం సిద్ధమవుతోంది. ప్రపంచ బ్యాంకు, ఏషియన్ డెవలప్‌మెంట్ బ్యాంక్ (ఏడీబీ) ప్రతినిధి బృందాలు రాజధాని ప్రాంతంలో ఇప్పటికే సమగ్ర అధ్యయనాన్ని పూర్తి చేశాయి. మొదటి విడతలో ₹15,000 కోట్ల నిధుల విడుదలకు సూత్రప్రాయంగా ఆమోదం తెలిపాయి.

ఈ నిధులతో రాజధానిలో ప్రధాన మౌలిక వసతులైన ట్రంక్ రోడ్లు, తాగునీరు, భూగర్భ డ్రైనేజీ, విద్యుత్ గ్రిడ్ల నిర్మాణాన్ని యుద్ధప్రాతిపదికన పూర్తి చేయాలని ప్రభుత్వం లక్ష్యంగా పెట్టుకుంది. అలాగే గతంలో నిలిచిపోయిన ఎమ్మెల్యేలు, ఐఏఎస్ అధికారుల క్వార్టర్లు, హైకోర్టు, శాసనసభ భవనాల పనులకు కొత్త టెండర్లు పిలిచేందుకు సీఆర్డీయే కసరత్తు పూర్తి చేసింది.

రాజధాని కోసం భూములిచ్చిన రైతులకు కౌలు చెల్లింపుల ప్రక్రియను కూడా ప్రభుత్వం వేగవంతం చేసింది. వచ్చే మూడేళ్లలో అమరావతిని గ్లోబల్ సిటీగా తీర్చిదిద్దడమే తమ ప్రభుత్వ ధ్యేయమని సీఎం చంద్రబాబు నాయుడు సమీక్ష సమావేశంలో స్పష్టం చేశారు.`,
    title: "Amaravati Capital Works Gain Speed as Multilateral Funding Finalized",
    shortDescription: "World Bank and ADB funding mechanism finalizes ₹15,000 crore package for Amaravati infrastructure push.",
    content: "Construction works in Andhra Pradesh capital Amaravati are set to resume in full swing with international funding.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "అమరావతి రాజధాని పరిపాలనా భవనాల నిర్మాణ ప్రాంగణం.",
    videoUrl: null,
    publishedAt: "2026-09-26T17:15:00Z",
    publishedDate: "2026-09-26",
    publishedTime: "17:15",
    views: 14200,
    likes: 1890,
    shares: 840,
    status: "published",
    author: "వెంకటేశ్వరరావు",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-3",
    slug: "isro-pushpak-reusable-launch-vehicle-successful-runway-landing",
    titleTe: "ఇస్రో మరో ఘనత.. స్వదేశీ స్పేస్‌ప్లేన్ 'పుష్పక్' రన్‌వే ల్యాండింగ్ విజయవంతం",
    shortSummaryTe: "భారత అంతరిక్ష పరిశోధన సంస్థ (ఇస్రో) సరికొత్త రికార్డు సృష్టించింది. పునర్వినియోగ రాకెట్ 'పుష్పక్' (RLV) రన్‌వేపై స్వయంచాలకంగా దిగి చరిత్రకెక్కింది. కర్ణాటకలోని చిత్రదుర్గ ఎయిర్‌స్ట్రిప్‌లో వాయుసేన హెలికాప్టర్ ద్వారా గాల్లోకి తీసుకెళ్లి వదిలిపెట్టగా, అది సురక్షితంగా రన్‌వేను తాకింది. దీంతో భవిష్యత్తులో అంతరిక్ష యాత్రల ఖర్చు భారీగా తగ్గనుంది.",
    fullContentTe: `అంతరిక్ష ప్రయోగాల్లో ప్రపంచాన్ని ఆశ్చర్యపరుస్తున్న ఇస్రో శాస్త్రవేత్తలు మరో మైలురాయిని అధిగమించారు. చిత్రదుర్గలోని ఏరోనాటికల్ టెస్ట్ రేంజ్ (ఏటీఆర్) లో శనివారం నిర్వహించిన పునర్వినియోగ ప్రయోగ నౌక (RLV) పుష్పక్ ల్యాండింగ్ పరీక్ష సంపూర్ణంగా విజయవంతమైంది.

భారత వాయుసేనకు చెందిన చినూక్ హెలికాప్టర్ సహాయంతో పుష్పక్ నౌకను 4.5 కిలోమీటర్ల ఎత్తుకు తీసుకెళ్లి గాలిలోకి విడుదల చేశారు. గంటకు వందల కిలోమీటర్ల వేగంతో కిందకు దూసుకొచ్చిన ఈ స్పేస్‌ప్లేన్.. తనలోని అధునాతన నేవిగేషన్, రాడార్లు, కంప్యూటర్ల సాయంతో గాలి దిశను అంచనా వేసుకుంటూ రన్‌వేపై అత్యంత కచ్చితత్వంతో దిగింది.

ఈ విజయంతో రాకెట్ ప్రయోగ వ్యయం 70 నుంచి 80 శాతం వరకు తగ్గే అవకాశం ఉందని ఇస్రో చైర్మన్ ఎస్.సోమనాథ్ తెలిపారు. భవిష్యత్తులో ఉపగ్రహాలను కక్ష్యలోకి చేర్చి, తిరిగి భూమికి సురక్షితంగా చేరుకునే సామర్థ్యాన్ని భారత్ సాధించిందని దేశవ్యాప్తంగా ప్రశంసలు వెల్లువెత్తుతున్నాయి.`,
    title: "ISRO Scripts History: Reusable Spaceplane Pushpak Lands Perfectly on Runway",
    shortDescription: "Autonomous touchdown of Pushpak RLV at Chitradurga test range paves path for low-cost space access.",
    content: "ISRO achieved a massive technological milestone with the successful runway landing test of reusable space vehicle Pushpak.",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "చిత్రదుర్గ రన్‌వేపై సురక్షితంగా ల్యాండ్ అయిన పుష్పక్ నౌక.",
    videoUrl: "https://www.youtube.com/watch?v=5VmyO9wZrnE",
    publishedAt: "2026-09-26T14:40:00Z",
    publishedDate: "2026-09-26",
    publishedTime: "14:40",
    views: 28900,
    likes: 3840,
    shares: 1690,
    status: "published",
    author: "కె. చంద్రశేఖర్",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-4",
    slug: "telangana-mega-dsc-teacher-recruitment-results-announced",
    titleTe: "తెలంగాణ మెగా డీఎస్సీ తుది ఫలితాలు విడుదల.. 11 వేల ఉపాధ్యాయ కొలువులు భర్తీ",
    shortSummaryTe: "తెలంగాణ విద్యాశాఖ మెగా డీఎస్సీ-2026 తుది ఫలితాలను అధికారికంగా విడుదల చేసింది. రాష్ట్రవ్యాప్తంగా 11,062 ఉపాధ్యాయ పోస్టులకు అర్హులైన అభ్యర్థుల మెరిట్ జాబితాను వెబ్‌సైట్‌లో అందుబాటులో ఉంచారు. వచ్చే వారం నుంచే సర్టిఫికెట్ల పరిశీలన నిర్వహించి, విజయదశమి నాటికి నియామక పత్రాలు అందజేయాలని ప్రభుత్వం నిర్ణయించింది.",
    fullContentTe: `లక్షలాది మంది నిరుద్యోగ అభ్యర్థులు ఎంతగానో ఎదురుచూస్తున్న తెలంగాణ మెగా డీఎస్సీ తుది ఫలితాలు ఎట్టకేలకు విడుదలయ్యాయి. సచివాలయంలో నిర్వహించిన మీడియా సమావేశంలో ముఖ్యమంత్రి రేవంత్ రెడ్డి, విద్యాశాఖ ఉన్నతాధికారులు ఫలితాలను ఆవిష్కరించారు.

రాష్ట్రవ్యాప్తంగా ఉన్న ప్రభుత్వ, జిల్లా పరిషత్ పాఠశాలల్లో ఖాళీగా ఉన్న స్కూల్ అసిస్టెంట్, ఎస్జీటీ, భాషా పండితులు, పీఈటీ పోస్టులను ఈ డీఎస్సీ ద్వారా భర్తీ చేస్తున్నారు. పరీక్ష రాసిన అభ్యర్థులు తమ హాల్ టికెట్ నంబర్ ఆధారంగా అధికారిక పోర్టల్‌లో ఫలితాలను పరిశీలించుకోవచ్చు.

ఎంపికైన అభ్యర్థులకు అక్టోబర్ మొదటి వారం నుంచి జిల్లా కేంద్రాల్లో ధ్రువపత్రాల పరిశీలన చేపట్టనున్నారు. ఎలాంటి అవకతవకలకు తావులేకుండా పారదర్శకంగా కౌన్సెలింగ్ పూర్తి చేసి, దసరా పండుగ కానుకగా ఉపాధ్యాయులకు ఆర్డర్లు అందజేస్తామని విద్యాశాఖ మంత్రి వెల్లడించారు.`,
    title: "Telangana Mega DSC Final Results Declared for 11,062 Teacher Vacancies",
    shortDescription: "Merit lists published online with certificate verification slated ahead of Dasara appointment order distribution.",
    content: "Telangana government released the results of the Mega DSC examination for recruitment of teachers across state schools.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "ఉపాధ్యాయ ఉద్యోగాల ఫలితాల విడుదల సందర్భంగా అభ్యర్థుల హర్షం.",
    videoUrl: null,
    publishedAt: "2026-09-26T11:20:00Z",
    publishedDate: "2026-09-26",
    publishedTime: "11:20",
    views: 31200,
    likes: 4120,
    shares: 2450,
    status: "published",
    author: "సురేష్ రెడ్డి",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-5",
    slug: "visakhapatnam-railway-zone-headquarters-foundation-stone-laying",
    titleTe: "విశాఖ కేంద్రంగా సౌత్ కోస్ట్ రైల్వే జోన్.. త్వరలోనే ప్రధాన కార్యాలయ నిర్మాణ పనుల ప్రారంభం",
    shortSummaryTe: "ఉత్తరాంధ్ర ప్రజల చిరకాల స్వప్నమైన విశాఖపట్నం సౌత్ కోస్ట్ రైల్వే జోన్ ప్రధాన కార్యాలయ నిర్మాణానికి మార్గం సుగమమైంది. రైల్వే శాఖ కేటాయించిన భూమిలో అత్యాధునిక జోనల్ కాంప్లెక్స్ నిర్మాణానికి టెండర్లు ఖరారయ్యాయి. వచ్చే నెలలో కేంద్ర రైల్వే మంత్రి శంకుస్థాపన చేయనున్నారు. దీంతో ప్రాంతీయ కనెక్టివిటీ గణనీయంగా మెరుగుపడనుంది.",
    fullContentTe: `విశాఖపట్నం కేంద్రంగా సౌత్ కోస్ట్ రైల్వే (SCoR) జోన్ కార్యకలాపాలు ఊపందుకున్నాయి. ప్రధాన కార్యాలయ భవన సముదాయం నిర్మాణానికి కేంద్ర రైల్వే మంత్రిత్వ శాఖ ఇప్పటికే ₹106 కోట్లను మంజూరు చేసింది. ముడసర్లోవ సమీపంలో గుర్తించిన 52 ఎకరాల స్థలంలో నిర్మాణ పనులు త్వరలోనే ప్రారంభం కానున్నాయి.

ఈ ప్రాజెక్టు ద్వారా వాల్తేరు డివిజన్ పునర్వ్యవస్థీకరణ పూర్తి కానుంది. ఉత్తరాంధ్రతో పాటు ఉమ్మడి గోదావరి జిల్లాల ప్రయాణికులకు కొత్త రైళ్లు, వేగవంతమైన ప్రయాణ సదుపాయాలు అందుబాటులోకి వస్తాయి. విశాఖపట్నం పోర్టు, గంగవరం పోర్టుల నుంచి సరుకు రవాణా మరింత సమర్థవంతంగా సాగనుంది.

వచ్చే రెండేళ్లలో జోనల్ కార్యాలయం నిర్మాణాన్ని పూర్తి చేయడమే కాకుండా, నగరంలో అమృత్ భారత్ పథకం కింద విశాఖపట్నం ప్రధాన రైల్వే స్టేషన్ ఆధునీకరణను అంతర్జాతీయ స్థాయి ప్రమాణాలతో చేపడుతున్నారు.`,
    title: "South Coast Railway Zone HQ Construction in Vizag Set to Commence",
    shortDescription: "Tenders finalized for state-of-the-art Zonal Headquarters complex in Visakhapatnam.",
    content: "Indian Railways cleared the decks for commencement of work on South Coast Railway Zone headquarters in Visakhapatnam.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "విశాఖపట్నం రైల్వే స్టేషన్ ఆధునీకరణ నమూనా దృశ్యం.",
    videoUrl: null,
    publishedAt: "2026-09-25T18:00:00Z",
    publishedDate: "2026-09-25",
    publishedTime: "18:00",
    views: 12100,
    likes: 1100,
    shares: 430,
    status: "published",
    author: "ప్రసాదమూర్తి",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-6",
    slug: "tollywood-ss-rajamouli-mahesh-babu-globetrotting-action-film-update",
    titleTe: "మహేష్ బాబు - రాజమౌళి పాన్ వరల్డ్ మూవీ.. ఆఫ్రికా అడవుల్లో భారీ షెడ్యూల్ ప్లాన్",
    shortSummaryTe: "సూపర్‌స్టార్ మహేష్ బాబు, అగ్ర దర్శకుడు ఎస్.ఎస్. రాజమౌళి కాంబినేషన్‌లో తెరకెక్కనున్న అంతర్జాతీయ సాహసోపేత చిత్రం (SSMB29) ప్రీ ప్రొడక్షన్ పనులు పూర్తయ్యాయి. అమెజాన్, ఆఫ్రికా అటవీ ప్రాంతాల్లో తొలి షెడ్యూల్ చిత్రీకరణకు చిత్ర బృందం సిద్ధమవుతోంది. హాలీవుడ్ ప్రముఖ సాంకేతిక నిపుణులు ఈ భారీ బడ్జెట్ ప్రాజెక్ట్‌లో పాలుపంచుకుంటున్నారు.",
    fullContentTe: `ఆర్ఆర్ఆర్ సంచలన విజయం తర్వాత దర్శకధీరుడు రాజమౌళి తెరకెక్కిస్తున్న తదుపరి ప్రాజెక్ట్‌పై ప్రపంచవ్యాప్తంగా భారీ అంచనాలు నెలకొన్నాయి. మహేష్ బాబు హీరోగా ఇండియానా జోన్స్ తరహాలో సాగే ఈ అడ్వెంచర్ థ్రిల్లర్‌కు సంబంధించి కీలక అప్‌డేట్ వెలువడింది.

సినిమాకు సంబంధించి వర్క్‌షాప్‌లు పూర్తయ్యాయని, మహేష్ బాబు సరికొత్త మేకోవర్‌తో కనిపించనున్నారని చిత్ర వర్గాలు వెల్లడించాయి. కథా రచయిత విజయేంద్ర ప్రసాద్ అందించిన స్క్రిప్ట్ ఆధారంగా కెన్యా, టాంజానియా, దక్షిణ అమెరికాలోని దట్టమైన అడవుల్లో కీలక సన్నివేశాలు షూట్ చేయనున్నారు.

ఈ చిత్రంలో పలువురు హాలీవుడ్ నటులు కూడా నటించనున్నారు. అంతర్జాతీయ నిర్మాణ సంస్థలతో భాగస్వామ్యం కుదుర్చుకున్న ఈ భారీ ప్రాజెక్ట్ షూటింగ్ నవంబర్ నుంచి లాంఛనంగా ప్రారంభం కానుంది.`,
    title: "SSMB29: SS Rajamouli & Mahesh Babu Action Adventure Schedules Africa Leg",
    shortDescription: "Pre-production wrapped for the global safari-adventure thriller as international crew joins shoot.",
    content: "Director SS Rajamouli and actor Mahesh Babu are gearing up for the shoot of their highly anticipated globetrotting action film.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "సినిమాటోగ్రఫీ కెమెరా సెటప్ మరియు నిర్మాణ సన్నాహాలు.",
    videoUrl: "https://www.youtube.com/watch?v=J---aiyznGQ",
    publishedAt: "2026-09-25T15:30:00Z",
    publishedDate: "2026-09-25",
    publishedTime: "15:30",
    views: 45200,
    likes: 6720,
    shares: 3120,
    status: "published",
    author: "కిరణ్ కుమార్",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-7",
    slug: "polavaram-project-diaphragm-wall-construction-progress-review",
    titleTe: "పోలవరం డయాఫ్రమ్ వాల్ నిర్మాణానికి ముహూర్తం ఖరారు.. కేంద్రం నుంచి నిధుల సర్దుబాటు",
    shortSummaryTe: "ఆంధ్రప్రదేశ్ జీవనాడి పోలవరం ప్రాజెక్టు డయాఫ్రమ్ వాల్ నూతన నిర్మాణ పనులకు కేంద్ర జలసంఘం ఆమోదం తెలిపింది. గత వరదల్లో దెబ్బతిన్న భాగాన్ని తొలగించి, పటిష్టమైన ఆధునిక సాంకేతికతతో కొత్త గోడను నిర్మించనున్నారు. ఇందుకోసం కేంద్రం ఇప్పటికే మొదటి విడత రీయింబర్స్‌మెంట్ నిధులను విడుదల చేసింది.",
    fullContentTe: `పోలవరం భారీ నీటిపారుదల ప్రాజెక్టును త్వరితగతిన పూర్తి చేసేందుకు ప్రభుత్వం సంకల్పించింది. గతంలో గోదావరికి వచ్చిన వరదల తాకిడికి ప్రధాన ఆనకట్ట కింద ఉన్న డయాఫ్రమ్ వాల్ తీవ్రంగా దెబ్బతిన్న సంగతి తెలిసిందే. అంతర్జాతీయ నిపుణులు, సీడబ్ల్యూసీ బృందం పరిశీలన అనంతరం పాత వాల్‌ను సరిదిద్దడం కంటే కొత్త డయాఫ్రమ్ వాల్ నిర్మించడమే సురక్షితమని తేల్చారు.

దీనికి సంబంధించి ₹990 కోట్ల వ్యయంతో పనులు ప్రారంభించేందుకు రంగం సిద్ధమైంది. నవంబర్ నుంచి గోదావరిలో నీటి ప్రవాహం తగ్గగానే పనులు ప్రారంభించి, వచ్చే వర్షాకాలం నాటికి డయాఫ్రమ్ వాల్‌ను పూర్తి చేయాలని సీఎండీ ఇంజనీర్లను ఆదేశించారు.

కేంద్ర ఆర్థిక శాఖ నుంచి పోలవరం అడ్వాన్స్ నిధులు విడుదల కావడంతో ఆర్థిక ఇబ్బందులు తొలగిపోయాయి. డయాఫ్రమ్ వాల్ పూర్తయితే ప్రధాన ఈసీఆర్‌ఎఫ్ (ఎర్త్ కమ్ రాక్‌ఫిల్) డ్యామ్ నిర్మాణం శరవేగంగా సాగనుంది.`,
    title: "Polavaram Project: New Diaphragm Wall Works Cleared by Central Water Commission",
    shortDescription: "Reconstruction of damaged underground cutoff wall approved with dedicated central funding.",
    content: "Crucial infrastructure works at the Polavaram irrigation multipurpose project in Andhra Pradesh have been fast-tracked.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "పోలవరం ప్రాజెక్టు స్పిల్‌వే మరియు గేట్ల పరిశీలన దృశ్యం.",
    videoUrl: null,
    publishedAt: "2026-09-25T10:10:00Z",
    publishedDate: "2026-09-25",
    publishedTime: "10:10",
    views: 16800,
    likes: 1980,
    shares: 720,
    status: "published",
    author: "గోపీకృష్ణ",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-8",
    slug: "indian-cricket-team-icc-rankings-number-one-all-three-formats",
    titleTe: "ఐసీసీ ర్యాంకింగ్స్‌లో భారత జట్టు సరికొత్త రికార్డు.. అన్ని ఫార్మాట్లలోనూ నంబర్ వన్ స్థానం",
    shortSummaryTe: "అంతర్జాతీయ క్రికెట్ మండలి (ఐసీసీ) విడుదల చేసిన తాజా ర్యాంకింగ్స్‌లో టీమిండియా అగ్రస్థానాన్ని నిలబెట్టుకుంది. టెస్ట్, వన్డే, టీ20 మూడు ఫార్మాట్లలోనూ ఒకే సమయంలో నంబర్ వన్ జట్టుగా నిలిచి ప్రపంచ రికార్డు సృష్టించింది. యువ ఆటగాళ్ల నిలకడైన ప్రతిభ, కెప్టెన్సీ వ్యూహాలతో జట్టు అద్భుత విజయాలను నమోదు చేస్తోంది.",
    fullContentTe: `భారత క్రికెట్ జట్టు అరుదైన మైలురాయిని అధిగమించింది. ఐసీసీ ప్రకటించిన తాజా టెస్ట్, వన్డే, టీ20 ర్యాంకింగ్స్‌లో భారత్ మూడింటిలోనూ టాప్ పొజిషన్‌లో కొనసాగుతోంది. ప్రపంచ క్రికెట్ చరిత్రలో ఒకే జట్టు సుదీర్ఘ కాలం పాటు మూడు ఫార్మాట్లలో ఏకకాలంలో అగ్రపీఠంపై ఉండటం ఇదే ప్రథమం.

స్వదేశంలోనూ, విదేశీ గడ్డపైనా భారత జట్టు వరుసగా సాధించిన సిరీస్ విజయాలు ఈ ఘనతకు కారణమయ్యాయి. బౌలింగ్ విభాగంలో జస్‌ప్రీత్ బుమ్రా, కుల్దీప్ యాదవ్ రాణిస్తుండగా, బ్యాటింగ్‌లో యశస్వి జైస్వాల్, శుభ్‌మన్ గిల్ వంటి యువ తారలు పరుగుల వరద పారిస్తున్నారు.

ఈ ఘనత సాధించిన భారత ఆటగాళ్లకు, కోచింగ్ సిబ్బందికి బీసీసీఐ అధ్యక్షుడు, కార్యదర్శి అభినందనలు తెలిపారు. రాబోయే ప్రపంచ టెస్ట్ ఛాంపియన్‌షిప్ ఫైనల్‌లోనూ ఇదే జోరును కొనసాగించాలని అభిమానులు ఆశిస్తున్నారు.`,
    title: "Team India Creates History: Ranks Number One Across All Three ICC Formats",
    shortDescription: "Unprecedented dominance in Test, ODI, and T20 international cricket standings confirmed.",
    content: "Indian men's cricket team maintained the top position across all formats in the latest ICC team rankings update.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "మైదానంలో సంబరాలు చేసుకుంటున్న భారత క్రికెట్ జట్టు క్రీడాకారులు.",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    publishedAt: "2026-09-24T20:45:00Z",
    publishedDate: "2026-09-24",
    publishedTime: "20:45",
    views: 38900,
    likes: 5420,
    shares: 1980,
    status: "published",
    author: "వంశీ కృష్ణ",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-9",
    slug: "hyderabad-musi-riverfront-development-beautification-project",
    titleTe: "మూసీ సుందరీకరణ ప్రాజెక్టుకు శ్రీకారం.. లండన్ థేమ్స్ నది తరహాలో రివర్‌ఫ్రంట్ డెవలప్‌మెంట్",
    shortSummaryTe: "హైదరాబాద్ నడిబొడ్డున ఉన్న మూసీ నదికి పునర్జీవనం పోసేందుకు తెలంగాణ ప్రభుత్వం బృహత్తర ప్రాజెక్టును ప్రారంభించింది. నది వెంట 55 కిలోమీటర్ల మేర చెత్త, మురుగునీటి శుద్ధి కోసం ఎస్టీపీలు ఏర్పాటు చేస్తున్నారు. నది ఇరువైపులా గ్రీన్ కారిడార్లు, సైక్లింగ్ ట్రాక్‌లు, పర్యాటక కేంద్రాలను అభివృద్ధి చేయనున్నారు.",
    fullContentTe: `చారిత్రక హైదరాబాద్ నగరానికి మణిహారంగా ఉన్న మూసీ నది రూపురేఖలు మారనున్నాయి. మూసీ రివర్‌ఫ్రంట్ డెవలప్‌మెంట్ అథారిటీ ఆధ్వర్యంలో నది ప్రక్షాళన మరియు సుందరీకరణ పనులకు ముఖ్యమంత్రి శంకుస్థాపన చేశారు. లండన్‌లోని థేమ్స్ నది, సియోల్‌లోని చియోంగ్‌జియాన్ తరహాలో మూసీని అంతర్జాతీయ స్థాయి పర్యాటక ప్రాంతంగా తీర్చిదిద్దనున్నారు.

మొదటి దశలో నదిలోకి వచ్చి చేరే మురుగునీటిని 100 శాతం శుద్ధి చేసేందుకు 39 ఆధునిక మురుగునీటి శుద్ధి కర్మాగారాలను (STP) పూర్తి చేస్తున్నారు. ఆ తర్వాత శుద్ధ జలాన్ని నదిలోకి మళ్లించి నిరంతరం నీరు ప్రవహించేలా చర్యలు తీసుకుంటారు.

బాపూఘాట్ నుంచి ప్రతాపసింగారం వరకు నది ఇరువైపులా ఎక్స్‌ప్రెస్‌వే, రిటైల్ మాల్స్, పర్యావరణ ఉద్యానవనాలను నిర్మించనున్నారు. ఈ ప్రాజెక్టుతో హైదరాబాద్ నగర పర్యావరణ సమతుల్యత గణనీయంగా మెరుగుపడుతుందని అధికారులు పేర్కొన్నారు.`,
    title: "Musi Riverfront Rejuvenation: Hyderabad Unveils Eco-Tourism Master Plan",
    shortDescription: "55-km corridor planned with advanced sewerage treatment, riverbank parks, and transit links.",
    content: "Telangana state government kicked off comprehensive riverfront revitalization project for the Musi river in Hyderabad.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "నదీ తీర పర్యావరణ సుందరీకరణ కాన్సెప్ట్ డిజైన్.",
    videoUrl: null,
    publishedAt: "2026-09-24T16:20:00Z",
    publishedDate: "2026-09-24",
    publishedTime: "16:20",
    views: 15400,
    likes: 1680,
    shares: 610,
    status: "published",
    author: "శ్రీనివాసరావు",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-10",
    slug: "tirupati-laddu-prasadam-purity-pure-cow-ghee-quality-controls",
    titleTe: "తిరుమల లడ్డూ ప్రసాదం తయారీలో అత్యున్నత ప్రమాణాలు.. కల్తీకి తావులేకుండా టీటీడీ కఠిన నిబంధనలు",
    shortSummaryTe: "తిరుమల శ్రీవారి భక్తులకు అందజేసే ప్రసిద్ధ లడ్డూ ప్రసాదం తయారీలో స్వచ్ఛతను మరింత పటిష్టం చేసేందుకు టీటీడీ కొత్త విధివిధానాలను అమలులోకి తెచ్చింది. నెయ్యి నాణ్యతను ఎప్పటికప్పుడు పరీక్షించేందుకు తిరుమలలోనే అత్యాధునిక ఎన్‌డీడీబీ ల్యాబ్‌ను ఏర్పాటు చేశారు. ప్రతి ట్యాంకర్‌ను క్షుణ్ణంగా తనిఖీ చేసిన తర్వాతే వినియోగిస్తున్నారు.",
    fullContentTe: `కలియుగ వైకుంఠమైన తిరుమల వెంకటేశ్వర స్వామి దివ్య ప్రసాదాల తయారీలో స్వచ్ఛత, పవిత్రతలకు అత్యున్నత ప్రాధాన్యతనిస్తున్నట్లు తిరుమల తిరుపతి దేవస్థానం (టీటీడీ) ప్రకటించింది. స్వామివారి లడ్డూ ప్రసాదానికి ఉపయోగించే ఆవు నెయ్యి కొనుగోలులో పూర్తి పారదర్శకత పాటిస్తున్నారు.

నేషనల్ డెయిరీ డెవలప్‌మెంట్ బోర్డు (ఎన్‌డీడీబీ) సహకారంతో తిరుమలలో అత్యాధునిక టెస్టింగ్ ప్రయోగశాలను ఏర్పాటు చేశారు. నెయ్యిలో ఎలాంటి కల్తీలను, వృక్ష సంబంధిత లేదా జంతు కొవ్వులను సెకన్లలో గుర్తించే పరికరాలను అందుబాటులోకి తెచ్చారు.

భక్తుల నమ్మకాన్ని, మనోభావాలను కాపాడటమే తమ తొలి కర్తవ్యమని టీటీడీ ఈవో తెలిపారు. లడ్డూ పోటులో పని చేసే కార్మికులకు ఆధ్యాత్మిక వాతావరణంలో శిక్షణ ఇస్తూ, నాణ్యతా ప్రమాణాలు ఏమాత్రం తగ్గకుండా శ్రీవారి ప్రసాదాలను నిరంతరం పంపిణీ చేస్తున్నారు.`,
    title: "Tirumala Laddu Prasadam: TTD Enforces Stringent Purity & Advanced Testing Labs",
    shortDescription: "On-site NDDB quality testing laboratory operationalized to ensure 100% pure cow ghee in prasadam.",
    content: "Tirumala Tirupati Devasthanams instituted strict testing and procurement protocols for the world-famous laddu prasadam.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "తిరుమల శ్రీవారి ఆలయ గోపురం మరియు ప్రాంగణం.",
    videoUrl: null,
    publishedAt: "2026-09-24T12:00:00Z",
    publishedDate: "2026-09-24",
    publishedTime: "12:00",
    views: 29800,
    likes: 4920,
    shares: 2100,
    status: "published",
    author: "రామానుజాచార్యులు",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-11",
    slug: "india-semiconductor-fabrication-plant-trial-production-begins",
    titleTe: "భారత తొలి వాణిజ్య సెమీకండక్టర్ చిప్ తయారీ కేంద్రంలో ట్రయల్ రన్స్ ప్రారంభం",
    shortSummaryTe: "ఎలక్ట్రానిక్స్ తయారీ రంగంలో భారత్ చరిత్రాత్మక ముందడుగు వేసింది. దేశంలోనే మొట్టమొదటి 28 నానోమీటర్ల సెమీకండక్టర్ ఫ్యాబ్రికేషన్ ప్లాంట్‌లో ట్రయల్ ప్రొడక్షన్ మొదలైంది. ఆటోమొబైల్స్, మొబైల్ ఫోన్లు, రక్షణ పరికరాల్లో ఉపయోగించే స్వదేశీ చిప్‌లను ఇక్కడ తయారు చేయనున్నారు. దీంతో విదేశాలపై చిప్‌ల ఆధారపడటం భారీగా తగ్గనుంది.",
    fullContentTe: `భారతదేశ సాంకేతిక సార్వభౌమత్వంలో సరికొత్త శకం ఆరంభమైంది. ఇండియా సెమీకండక్టర్ మిషన్ కింద ₹91,000 కోట్ల భారీ పెట్టుబడితో నిర్మించిన సెమీకండక్టర్ ఫ్యాబ్ క్లీన్‌రూమ్‌లో తొలి వేఫర్ ప్రాసెసింగ్ ట్రయల్స్ విజయవంతంగా మొదలయ్యాయి.

తైవాన్‌కు చెందిన ప్రముఖ సాంకేతిక భాగస్వాములతో కలిసి ఏర్పాటు చేసిన ఈ పరిశ్రమ ద్వారా ఏటా వేల మిలియన్ల చిప్‌లు ఉత్పత్తి కానున్నాయి. ఇవి ప్రధానంగా కార్ల ఇంజిన్ కంట్రోలర్లు, 5జీ టెలికాం పరికరాలు, శాటిలైట్ వ్యవస్థలలో వినియోగించబడతాయి.

భవిష్యత్ అవసరాల దృష్ట్యా హైదరాబాద్, బెంగళూరు, అహ్మదాబాద్ వంటి నగరాల్లో చిప్ డిజైనింగ్ ఎకోసిస్టమ్ శరవేగంగా విస్తరిస్తోంది. వచ్చే ఐదేళ్లలో గ్లోబల్ సెమీకండక్టర్ మార్కెట్‌లో భారత్ కీలక సరఫరాదారుగా అవతరించనుందని కేంద్ర ఐటీ శాఖ మంత్రి ప్రకటించారు.`,
    title: "India's First Commercial Semiconductor Fabrication Plant Begins Trial Production",
    shortDescription: "Cleanroom wafer processing commences marking sovereign milestone in domestic electronics hardware.",
    content: "India's landmark 28nm semiconductor fabrication facility entered trial qualification phase, slashing electronics import dependence.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "సెమీకండక్టర్ చిప్ వేఫర్ ప్రాసెసింగ్ క్లీన్‌రూమ్ పరికరాలు.",
    videoUrl: "https://www.youtube.com/watch?v=0plX4BfMv-s",
    publishedAt: "2026-09-23T19:15:00Z",
    publishedDate: "2026-09-23",
    publishedTime: "19:15",
    views: 21500,
    likes: 2430,
    shares: 890,
    status: "published",
    author: "అర్జున్ రావు",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-12",
    slug: "reserve-bank-of-india-digital-rupee-offline-upi-cross-border-payments",
    titleTe: "డిజిటల్ రూపాయికి మరింత ఊపు.. ఇంటర్నెట్ లేకపోయినా యూపీఐ చెల్లింపులు సాధ్యం",
    shortSummaryTe: "రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా (ఆర్బీఐ) రిటైల్ డిజిటల్ రూపాయిలో విప్లవాత్మక ఫీచర్లను ప్రవేశపెట్టింది. మొబైల్ నెట్‌వర్క్ లేదా ఇంటర్నెట్ లేని ప్రాంతాల్లో కూడా డిజిటల్ కరెన్సీ టోకెన్ల ద్వారా నేరుగా లావాదేవీలు నిర్వహించుకునే ఆఫ్‌లైన్ విధానాన్ని అందుబాటులోకి తెచ్చింది. అలాగే విదేశీ పర్యటనల్లోనూ కరెన్సీ మార్పిడి లేకుండా నేరుగా చెల్లింపులు చేయవచ్చు.",
    fullContentTe: `దేశంలో నగదు రహిత లావాదేవీలను సరికొత్త శిఖరాలకు చేర్చేందుకు రిజర్వ్ బ్యాంక్ సెంట్రల్ బ్యాంక్ డిజిటల్ కరెన్సీ (CBDC) ని మరింత బలోపేతం చేసింది. ఈ-రూపాయి (e₹-R) యాప్ ద్వారా సాధారణ క్యూఆర్ కోడ్లను స్కాన్ చేసి నేరుగా బ్యాంక్ అకౌంట్ సంబంధం లేకుండా వాలెట్ టు వాలెట్ లావాదేవీలు చేసుకోవచ్చు.

తాజాగా ప్రవేశపెట్టిన ఆఫ్‌లైన్ టెక్నాలజీ వల్ల గ్రామీణ ప్రాంతాల్లో, విమాన ప్రయాణాల్లో, నెట్‌వర్క్ లేని కొండ ప్రాంతాల్లో కూడా చెల్లింపులు సులభంగా జరిగిపోతాయి. బ్లూటూత్, ఎన్‌ఎఫ్‌సీ ఆధారిత సురక్షిత ఎన్‌క్రిప్షన్ ద్వారా ఈ సదుపాయం పనిచేస్తుంది.

యూఏఈ, సింగపూర్, మారిషస్ వంటి దేశాలలో భారతీయ డిజిటల్ రూపాయి చెల్లింపులు నేరుగా స్థానిక కరెన్సీలోకి కన్వర్ట్ అయ్యేలా అంతర్జాతీయ ఒప్పందాలు కుదిరాయి. దీంతో సాధారణ పౌరులకు విదేశీ మారక ద్రవ్య రుసుములు గణనీయంగా ఆదా కానున్నాయి.`,
    title: "RBI Expands Retail Digital Rupee: Offline Payments and Instant Cross-Border Rails",
    shortDescription: "Offline cryptographic tokens enable seamless payments in zero-network zones alongside international UPI QR access.",
    content: "Reserve Bank of India introduced offline peer-to-peer settlement features to the retail Digital Rupee wallet ecosystem.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "డిజిటల్ పేమెంట్ స్కానర్ మరియు స్మార్ట్‌ఫోన్ లావాదేవీ.",
    videoUrl: null,
    publishedAt: "2026-09-23T14:30:00Z",
    publishedDate: "2026-09-23",
    publishedTime: "14:30",
    views: 18900,
    likes: 2100,
    shares: 940,
    status: "published",
    author: "పద్మినీ ప్రియదర్శిని",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-13",
    slug: "vande-bharat-sleeper-train-trial-runs-hyderabad-visakhapatnam",
    titleTe: "వందే భారత్ స్లీపర్ రైలు ట్రయల్స్ విజయవంతం.. హైదరాబాద్-విశాఖ మధ్య రాత్రి ప్రయాణం సులువు",
    shortSummaryTe: "భారతీయ రైల్వే ప్రతిష్టాత్మకంగా రూపొందించిన సరికొత్త 'వందే భారత్ స్లీపర్' రైలు ట్రయల్ రన్స్ విజయవంతంగా ముగిశాయి. గంటకు 160 కిలోమీటర్ల వేగంతో ప్రయాణించే ఈ అత్యాధునిక ఎక్స్‌ప్రెస్ రైలును త్వరలోనే హైదరాబాద్ - విశాఖపట్నం మధ్య ప్రారంభించనున్నారు. విమాన ప్రయాణాన్ని తలపించే సదుపాయాలు ఇందులో కొలువుదీరాయి.",
    fullContentTe: `రాత్రిపూట సుదూర ప్రాంతాలకు ప్రయాణించే ప్రయాణికులకు సరికొత్త అనుభూతిని అందించేందుకు వందే భారత్ స్లీపర్ రైలు సిద్ధమైంది. చెన్నైలోని ఐసీఎఫ్ కర్మాగారంలో రూపొందించిన ఈ రైలులో మొదటిసారిగా ఏరోడైనమిక్ నోస్ కోన్, ఆటోమేటిక్ డోర్లు, శబ్దం రాని ప్యానెల్స్ అమర్చారు.

సికింద్రాబాద్ నుంచి విశాఖపట్నం మధ్య సుమారు 700 కిలోమీటర్ల దూరాన్ని ఈ రైలు కేవలం ఎనిమిదిన్నర గంటల్లోనే చేరుకుంటుంది. రాత్రి 10 గంటలకు సికింద్రాబాద్‌లో ఎక్కితే తెల్లవారుజామున 6:30 గంటలకల్లా విశాఖపట్నం చేరుకోవచ్చు.

ప్రతి బెర్త్ వద్ద ప్రత్యేక రీడింగ్ లైట్లు, ఛార్జింగ్ సాకెట్లు, విస్తారమైన లెగ్‌స్పేస్, బయో వాక్యూమ్ టాయిలెట్లు ఉన్నాయి. వచ్చే నెల నుంచి ప్రయాణికులకు ఈ రైలు సేవలు అందుబాటులోకి రానున్నాయని దక్షిణ మధ్య రైల్వే అధికారులు తెలిపారు.`,
    title: "Vande Bharat Sleeper Express Completes High-Speed Trials Ahead of Launch",
    shortDescription: "Hyderabad-Visakhapatnam overnight express set to compress transit time to under 8.5 hours.",
    content: "Indian Railways successfully concluded speed qualification trials for the flagship Vande Bharat Sleeper train rake.",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "ట్రాక్‌పై వేగంగా దూసుకెళ్తున్న వందే భారత్ సూపర్ ఫాస్ట్ రైలు.",
    videoUrl: null,
    publishedAt: "2026-09-22T18:10:00Z",
    publishedDate: "2026-09-22",
    publishedTime: "18:10",
    views: 26300,
    likes: 3510,
    shares: 1420,
    status: "published",
    author: "రమేష్ బాబు",
    readTime: "2 నిమిషాల పఠనం",
  },
  {
    id: "news-14",
    slug: "andhra-pradesh-ai-university-skill-development-hubs",
    titleTe: "ఏపీలో దేశంలోనే తొలి ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) యూనివర్సిటీ ఏర్పాటుకు నిర్ణయం",
    shortSummaryTe: "ఆంధ్రప్రదేశ్ ప్రభుత్వం విద్యార్థులకు ఆధునిక సాంకేతికతను అందించేందుకు విశాఖపట్నం వేదికగా ప్రత్యేక ఏఐ విశ్వవిద్యాలయాన్ని ఏర్పాటు చేయాలని నిర్ణయించింది. ప్రపంచ ప్రఖ్యాత ఐటీ సంస్థలు, గ్లోబల్ రీసెర్చ్ సెంటర్ల భాగస్వామ్యంతో మెషిన్ లెర్నింగ్, రోబోటిక్స్, డేటా సైన్స్ రంగాలలో అంతర్జాతీయ స్థాయి డిగ్రీ కోర్సులను ప్రారంభించనున్నారు.",
    fullContentTe: `భవిష్యత్ పరిశ్రమల అవసరాలకు అనుగుణంగా యువతను తీర్చిదిద్దేందుకు ఆంధ్రప్రదేశ్ ప్రభుత్వం ప్రతిష్టాత్మక అడుగు వేసింది. విశాఖపట్నంలో ప్రపంచ స్థాయి ప్రమాణాలతో 'ఆంధ్రప్రదేశ్ ఇంటర్నేషనల్ ఏఐ యూనివర్సిటీ'ని ఏర్పాటు చేయనున్నట్లు ఐటీ శాఖ మంత్రి నారా లోకేష్ ప్రకటించారు.

ఈ విశ్వవిద్యాలయంలో గూగుల్, మైక్రోసాఫ్ట్, ఎన్విడియా వంటి అగ్రశ్రేణి టెక్నాలజీ కంపెనీలతో భాగస్వామ్య పరిశోధనా కేంద్రాలు కొలువుదీరనున్నాయి. బీటెక్, ఎంటెక్ కోర్సులతో పాటు హెల్త్‌కేర్, అగ్రికల్చర్, క్లైమేట్ సైన్స్‌లో ఏఐ అప్లికేషన్లపై స్పెషలైజ్డ్ డిగ్రీలను అందించనున్నారు.

రాష్ట్రంలోని అన్ని ప్రభుత్వ పాఠశాలలు, ఇంజనీరింగ్ కళాశాలలకు ఈ యూనివర్సిటీ నోడల్ సెంటర్‌గా వ్యవహరిస్తూ డిజిటల్ పాఠ్యాంశాలను పర్యవేక్షిస్తుంది. ఈ నిర్ణయంతో ఆంధ్రప్రదేశ్ గ్లోబల్ టెక్నాలజీ హబ్‌గా ఎదుగుతుందని విద్యావేత్తలు హర్షం వ్యక్తం చేస్తున్నారు.`,
    title: "Andhra Pradesh Announces Country's First Dedicated AI University in Vizag",
    shortDescription: "Global technology partnerships anchored to deliver advanced degrees in Machine Learning and Robotics.",
    content: "The Government of Andhra Pradesh has approved the blueprint for establishing a premier Artificial Intelligence University in Visakhapatnam.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "కృత్రిమ మేధ మరియు డేటా సైన్స్ పరిశోధన ప్రయోగశాల.",
    videoUrl: null,
    publishedAt: "2026-09-22T13:40:00Z",
    publishedDate: "2026-09-22",
    publishedTime: "13:40",
    views: 17200,
    likes: 2150,
    shares: 880,
    status: "published",
    author: "మాధవి లత",
    readTime: "3 నిమిషాల పఠనం",
  },
  {
    id: "news-15",
    slug: "telangana-rythu-bharosa-crop-insurance-direct-benefit-transfer",
    titleTe: "తెలంగాణలో రైతు భరోసా నిధుల జమ.. నేరుగా రైతుల ఖాతాల్లోకి ఎకరానికి ₹7,500",
    shortSummaryTe: "తెలంగాణ ప్రభుత్వం వానాకాలం సీజన్ రైతు భరోసా ఆర్థిక సహాయాన్ని అర్హులైన రైతుల బ్యాంకు ఖాతాల్లో డీబీటీ పద్ధతిలో జమ చేయడం ప్రారంభించింది. ఎకరానికి ₹7,500 చొప్పున సుమారు 65 లక్షల మంది రైతులకు లబ్ధి చేకూరనుంది. సాగులో ఉన్న భూములకే నిధులు పారదర్శకంగా అందుతున్నాయని వ్యవసాయ శాఖ అధికారులు వెల్లడించారు.",
    fullContentTe: `రైతాంగానికి సాగు పెట్టుబడి సాయం అందించే లక్ష్యంతో తెలంగాణ ప్రభుత్వం 'రైతు భరోసా' పథకం నిధుల పంపిణీని ప్రారంభించింది. తొలిరోజు ఒక ఎకరం వరకు భూమి ఉన్న చిన్న, సన్నకారు రైతుల ఖాతాల్లోకి నగదు నేరుగా జమ అయ్యింది. దశలవారీగా వారం రోజుల్లో రైతులందరికీ సహాయం అందజేయనున్నారు.

గతంలో ఉన్న నిబంధనలను సవరించి, వాస్తవంగా పంటలు సాగు చేస్తున్న రైతులకే ఈ పథకం అందేలా డిజిటల్ సర్వే ద్వారా లబ్ధిదారుల జాబితాను రూపొందించారు. కొండలు, గుట్టలు, రియల్ ఎస్టేట్ వెంచర్లకు ఇచ్చే చెల్లింపులను తొలగించడం ద్వారా ప్రజా ధనం దుర్వినియోగం కాకుండా కట్టుదిట్టమైన చర్యలు తీసుకున్నారు.

ఈ నిధులతో రైతులు విత్తనాలు, ఎరువులు కొనుగోలు చేసుకోవడానికి ఎంతగానో తోడ్పడుతుందని రైతు సంఘాల నాయకులు తెలిపారు. ఏదైనా సమస్య ఉంటే సంప్రదించడానికి వ్యవసాయ విస్తరణ అధికారులు (ఏఈఓ) గ్రామాల్లో అందుబాటులో ఉంటారు.`,
    title: "Telangana Disburses Rythu Bharosa: ₹7,500 Per Acre Credited Directly to Farmers",
    shortDescription: "Over 65 lakh farming families benefit under monsoon crop input assistance scheme.",
    content: "Telangana state initiated the direct benefit transfer of Rythu Bharosa agricultural support funds to eligible farmers.",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1600&q=80",
    imageCaption: "పచ్చని వరి పొలంలో సంతోషంగా ఉన్న తెలుగు రైతు.",
    videoUrl: null,
    publishedAt: "2026-09-21T16:00:00Z",
    publishedDate: "2026-09-21",
    publishedTime: "16:00",
    views: 19800,
    likes: 2750,
    shares: 1120,
    status: "published",
    author: "లక్ష్మీనారాయణ",
    readTime: "2 నిమిషాల పఠనం",
  },
];
