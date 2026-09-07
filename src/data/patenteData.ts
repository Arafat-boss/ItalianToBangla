export interface QuestionItem {
  id: string;
  number: number;
  italianText: string;
  bengaliTranslation: string;
  isTrue: boolean; // true = V (Vero), false = F (Falso)
  explanation?: string;
  audioDuration?: number;
}

export interface SchedaItem {
  id: string;
  number: number;
  title: string;
  corrette: number;
  errori: number;
  nonRisposte: number;
  totale: number;
  questions: QuestionItem[];
}

export interface CategoryItem {
  id: string;
  number: number;
  title: string;
  tag: string;
  illustrationType: "road" | "danger" | "prohibition" | "precedence" | "police" | "motor";
  corrette: number;
  errori: number;
  nonRisposte: number;
  totale: number;
  schede: SchedaItem[];
}

export const PATENTE_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    number: 1,
    title: "Comune: MOTORE ENDOTERMICO E RESI...",
    tag: "LA STRADA",
    illustrationType: "road",
    corrette: 0,
    errori: 0,
    nonRisposte: 64,
    totale: 64,
    schede: [
      {
        id: "scheda-1-1",
        number: 1,
        title: "Coppia motrice",
        corrette: 0,
        errori: 0,
        nonRisposte: 4,
        totale: 4,
        questions: [
          {
            id: "q-1",
            number: 1,
            italianText:
              "La coppia motrice è generata dalla forza con la quale il pistone mette in rotazione l’albero motore attraverso la manovella",
            bengaliTranslation:
              "ড্রাইভিং টর্ক বা কাপল সেই শক্তি দ্বারা উৎপন্ন হয় যার মাধ্যমে পিস্টন কানেক্টিং রডের মাধ্যমে ক্র্যাঙ্কশ্যাফ্টকে ঘোরায়।",
            isTrue: true,
            explanation: "Vero: Il pistone trasmette il moto rotatorio all'albero motore tramite la biella/manovella.",
          },
          {
            id: "q-2",
            number: 2,
            italianText:
              "La coppia di un motore endotermico è il prodotto tra la forza che spinge il pistone e il braccio di manovella",
            bengaliTranslation:
              "একটি ইঞ্জিন টর্ক হলো পিস্টনকে ধাক্কা দেওয়া বল এবং ক্র্যাঙ্ক বাহুর দূরত্বের গুণফল।",
            isTrue: true,
            explanation: "Vero: La coppia (Torque) = Forza × Braccio della manovella.",
          },
          {
            id: "q-3",
            number: 3,
            italianText:
              "La coppia motrice è generata dalla forza applicata dal sistema frenante sui mozzi delle ruote",
            bengaliTranslation:
              "ব্রেকিং সিস্টেম চাকার হাবে যে শক্তি প্রয়োগ করে তার মাধ্যমে ড্রাইভিং টর্ক তৈরি হয়।",
            isTrue: false,
            explanation: "Falso: Il sistema frenante serve a rallentare/fermare, non a generare la coppia motrice del motore.",
          },
          {
            id: "q-4",
            number: 4,
            italianText:
              "La potenza del motore aumenta sempre con il diminuire del numero di giri dell'albero motore",
            bengaliTranslation:
              "ক্র্যাঙ্কশ্যাফ্টের ঘূর্ণন গতি (RPM) কমলে ইঞ্জিনের ক্ষমতা সর্বদা বৃদ্ধি পায়।",
            isTrue: false,
            explanation: "Falso: La potenza generalmente cresce al salire dei giri fino al regime di potenza massima.",
          },
        ],
      },
      {
        id: "scheda-1-2",
        number: 2,
        title: "Curve di coppia e di potenza del motore",
        corrette: 0,
        errori: 0,
        nonRisposte: 10,
        totale: 10,
        questions: [
          {
            id: "q-2-1",
            number: 1,
            italianText:
              "La curva di potenza indica la potenza erogata dal motore al variare del numero di giri",
            bengaliTranslation:
              "পাওয়ার কার্ভ ইঞ্জিনের আরপিএম (RPM) পরিবর্তনের সাথে সাথে সরবরাহকৃত ক্ষমতা নির্দেশ করে।",
            isTrue: true,
            explanation: "Vero: Mostra l'andamento della potenza in funzione dei giri/min.",
          },
          {
            id: "q-2-2",
            number: 2,
            italianText:
              "Al regime di coppia massima si ottiene il minor rendimento del motore e il massimo consumo specifico",
            bengaliTranslation:
              "সর্বোচ্চ টর্ক রেজিমে ইঞ্জিনের সর্বনিম্ন দক্ষতা এবং সর্বোচ্চ নির্দিষ্ট জ্বালানী খরচ পাওয়া যায়।",
            isTrue: false,
            explanation: "Falso: Al regime di coppia massima il rendimento è ottimale con consumi specifici minimi.",
          },
        ],
      },
      {
        id: "scheda-1-3",
        number: 3,
        title: "Curve di coppia e di potenza del motore",
        corrette: 0,
        errori: 0,
        nonRisposte: 7,
        totale: 7,
        questions: [
          {
            id: "q-3-1",
            number: 1,
            italianText:
              "Il regime di rotazione economico si trova generalmente in prossimità del regime di coppia massima",
            bengaliTranslation:
              "অর্থনৈতিক ঘূর্ণন গতি (সবুজ জোন) সাধারণত সর্বোচ্চ টর্কের কাছাকাছি থাকে।",
            isTrue: true,
            explanation: "Vero: Zona verde del contagiri dove il consumo è più efficiente.",
          },
        ],
      },
      {
        id: "scheda-1-4",
        number: 4,
        title: "Campo di stabilità - uso delle marce",
        corrette: 0,
        errori: 0,
        nonRisposte: 8,
        totale: 8,
        questions: [
          {
            id: "q-4-1",
            number: 1,
            italianText:
              "L'uso corretto del cambio di velocità consente di mantenere il motore nel campo di funzionamento ottimale",
            bengaliTranslation:
              "গিয়ারের সঠিক ব্যবহার ইঞ্জিনকে তার সর্বোত্তম কার্যক্ষমতার সীমার মধ্যে রাখতে সাহায্য করে।",
            isTrue: true,
            explanation: "Vero: Permette di guidare in sicurezza risparmiando carburante.",
          },
        ],
      },
    ],
  },
  {
    id: "cat-2",
    number: 2,
    title: "Comune: FRENI RALLENTATORI E ITS",
    tag: "SEGNALI DI PERICOLO",
    illustrationType: "danger",
    corrette: 0,
    errori: 0,
    nonRisposte: 302,
    totale: 302,
    schede: [
      {
        id: "scheda-2-1",
        number: 1,
        title: "Segnali di pericolo - Generalità",
        corrette: 0,
        errori: 0,
        nonRisposte: 25,
        totale: 25,
        questions: [
          {
            id: "q-2-1-1",
            number: 1,
            italianText:
              "I segnali di pericolo sono di norma posti a 150 metri dal punto di inizio del pericolo",
            bengaliTranslation:
              "বিপদ সংকেতগুলো সাধারণত বিপদের স্থান থেকে ১৫০ মিটার পূর্বে স্থাপন করা হয়।",
            isTrue: true,
            explanation: "Vero: La distanza standard di preavviso per i segnali di pericolo è 150 m.",
          },
          {
            id: "q-2-1-2",
            number: 2,
            italianText:
              "Il segnale di pericolo impone sempre di arrestare completamente la marcia del veicolo",
            bengaliTranslation:
              "বিপদ সংকেত দেখলে গাড়ি সবসময় সম্পূর্ণ থামিয়ে দিতে বাধ্য করে।",
            isTrue: false,
            explanation: "Falso: Richiede di moderare la velocità e prestare attenzione, non di fermarsi sempre.",
          },
        ],
      },
    ],
  },
  {
    id: "cat-3",
    number: 3,
    title: "Comune: CAMBIO E DINAMICHE VEICOLO",
    tag: "SEGNALI DI DIVIETO",
    illustrationType: "prohibition",
    corrette: 0,
    errori: 0,
    nonRisposte: 180,
    totale: 180,
    schede: [
      {
        id: "scheda-3-1",
        number: 1,
        title: "Segnali di divieto - Generalità",
        corrette: 0,
        errori: 0,
        nonRisposte: 30,
        totale: 30,
        questions: [
          {
            id: "q-3-1-1",
            number: 1,
            italianText:
              "I segnali di divieto vietano il transito o determinate manovre a tutti o a specifiche categorie di veicoli",
            bengaliTranslation:
              "নিষেধাজ্ঞা সংকেতগুলো সমস্ত বা নির্দিষ্ট শ্রেণীর যানবাহনের চলাচল বা নির্দিষ্ট কোনো কৌশল নিষিদ্ধ করে।",
            isTrue: true,
            explanation: "Vero: Regolano i divieti di transito, sosta o manovra.",
          },
        ],
      },
    ],
  },
];
