import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { speak, stop } from "@/utils/speechUtils";
import { useAppTheme } from "@/utils/themeContext";

interface DictionaryEntry {
  id: string;
  italian: string;
  bengali: string;
  category: string;
  exampleItalian?: string;
  exampleBengali?: string;
}

const DICTIONARY_DATA: DictionaryEntry[] = [
  // --- STRADA ---
  {
    id: "1",
    italian: "La Carreggiata",
    bengali: "ক্যারেজওয়ে / মূল সড়ক (যানবাহন চলাচলের প্রধান অংশ)",
    category: "Strada",
    exampleItalian: "La carreggiata è destinata alla circolazione dei veicoli.",
    exampleBengali: "ক্যারেজওয়ে যানবাহন চলাচলের জন্য নির্ধারিত সড়ক অংশ।",
  },
  {
    id: "2",
    italian: "Corsia di emergenza",
    bengali: "জরুরি লেন (গাড়ির ত্রুটি বা অসুস্থতার সময় ব্যবহারের লেন)",
    category: "Strada",
    exampleItalian: "La corsia di emergenza non deve essere usata per il sorpasso.",
    exampleBengali: "ওভারটেক করার জন্য জরুরি লেন ব্যবহার করা নিষিদ্ধ।",
  },
  {
    id: "3",
    italian: "Corsia di accelerazione",
    bengali: "অ্যাক্সিলারেশন লেন (হাইওয়ে বা অটোস্ট্রাডায় প্রবেশের লেন)",
    category: "Strada",
    exampleItalian: "Serve per entrare correttamente in autostrada aumentando la velocità.",
    exampleBengali: "গতি বাড়িয়ে সঠিকভাবে অটোস্ট্রাডায় প্রবেশের জন্য এই লেন ব্যবহৃত হয়।",
  },
  {
    id: "4",
    italian: "Corsia di decelerazione",
    bengali: "ডিসিলারেশন লেন (হাইওয়ে থেকে বের হওয়ার জন্য গতি কমানোর লেন)",
    category: "Strada",
    exampleItalian: "Serve per uscire dall'autostrada rallentando gradualmente.",
    exampleBengali: "ধীরে ধীরে গতি কমিয়ে অটোস্ট্রাডা থেকে বের হওয়ার জন্য এটি ব্যবহার করা হয়।",
  },
  {
    id: "5",
    italian: "Spartitraffico",
    bengali: "রোড ডিভাইডার / ট্রাফিক বিভাজক",
    category: "Strada",
    exampleItalian: "Lo spartitraffico separa due carreggiate distinte.",
    exampleBengali: "ডিভাইডার দুটি পৃথক ক্যারেজওয়েকে আলাদা করে।",
  },
  {
    id: "6",
    italian: "Banchina",
    bengali: "রাস্তার দুই পাশের ফুটপাথবিহীন প্রান্তভাগ",
    category: "Strada",
    exampleItalian: "La banchina è la parte della strada posta oltre la linea di margine.",
    exampleBengali: "বাংকিনা হলো সড়কের মার্জিন লাইনের বাইরের অংশ।",
  },
  {
    id: "7",
    italian: "Marciapiede",
    bengali: "ফুটপাত (পথচারীদের হাঁটার জন্য নির্ধারিত সুরক্ষিত অংশ)",
    category: "Strada",
    exampleItalian: "Il marciapiede è destinato al transito esclusivo dei pedoni.",
    exampleBengali: "ফুটপাত কেবল পথচারীদের চলাচলের জন্য নির্ধারিত।",
  },
  {
    id: "8",
    italian: "Attraversamento pedonale",
    bengali: "জেব্রা ক্রসিং (পথচারী পারাপার স্থান)",
    category: "Strada",
    exampleItalian: "I pedoni hanno sempre la precedenza sull'attraversamento pedonale.",
    exampleBengali: "জেব্রা ক্রসিংয়ে পথচারীদের সবসময় অগ্রাধিকার দিতে হবে।",
  },
  {
    id: "9",
    italian: "Passaggio a livello",
    bengali: "লেভেল ক্রসিং (রেললাইন ক্রসিং)",
    category: "Strada",
    exampleItalian: "È vietato sostare o fermarsi in prossimità del passaggio a livello.",
    exampleBengali: "লেভেল ক্রসিংয়ের কাছাকাছি গাড়ি থামানো বা পার্কিং করা নিষিদ্ধ।",
  },
  {
    id: "10",
    italian: "Dosso",
    bengali: "উঁচু স্পিড ব্রেকার বা রাস্তার অন্ধ ঢালু বাঁক",
    category: "Strada",
    exampleItalian: "Sul dosso la visibilità è limitata, vietato il sorpasso sulla salita.",
    exampleBengali: "দসসোতে দৃশ্যমানতা সীমিত থাকে, ওঠার সময় ওভারটেক করা নিষিদ্ধ।",
  },
  {
    id: "11",
    italian: "Cunetta",
    bengali: "রাস্তার গর্ত বা নিচু অবতল অংশ",
    category: "Strada",
    exampleItalian: "La cunetta può allagarsi facilmente in caso di forti piogge.",
    exampleBengali: "ভারী বৃষ্টির সময় কুনেত্তাতে সহজেই পানি জমে যেতে পারে।",
  },
  {
    id: "12",
    italian: "Zona a Traffico Limitato (ZTL)",
    bengali: "সীমিত ট্রাফিক জোন (অনুমোদন ছাড়া সাধারণ গাড়ির প্রবেশ নিষেধ)",
    category: "Strada",
    exampleItalian: "Nella ZTL possono circolare solo i veicoli autorizzati in determinate ore.",
    exampleBengali: "জেডটিএল-এ নির্দিষ্ট সময়ে কেবল অনুমোদিত যানবাহন চলাচল করতে পারে।",
  },
  {
    id: "13",
    italian: "Autostrada",
    bengali: "হাইওয়ে / এক্সপ্রেসওয়ে (সবুজ সাইন, সর্বোচ্চ গতি ১৩০ কিমি/ঘণ্টা)",
    category: "Strada",
    exampleItalian: "Il limite generale di velocità in autostrada è di 130 km/h.",
    exampleBengali: "অটোস্ট্রাডায় সাধারণ সর্বোচ্চ গতিসীমা ১৩০ কিমি/ঘণ্টা।",
  },
  {
    id: "14",
    italian: "Salvagente",
    bengali: "পথচারী সুরক্ষা দ্বীপ / ট্রাফিক আইল্যান্ড",
    category: "Strada",
    exampleItalian: "Il salvagente ripara i pedoni che attraversano la strada o salgono sul tram.",
    exampleBengali: "সালভাজেন্তে রাস্তা পারাপারকারী বা ট্রামে ওঠা পথচারীদের সুরক্ষা দেয়।",
  },

  // --- SEGNALI ---
  {
    id: "15",
    italian: "Segnale di pericolo",
    bengali: "বিপদ সংকেত (ত্রিকোণাকার লাল বর্ডারযুক্ত সাইন)",
    category: "Segnali",
    exampleItalian: "I segnali di pericolo sono posti normalmente a 150 metri dal pericolo.",
    exampleBengali: "বিপদ সংকেতগুলো সাধারণত বিপদের স্থান থেকে ১৫০ মিটার আগে স্থাপন করা হয়।",
  },
  {
    id: "16",
    italian: "Segnale di divieto",
    bengali: "নিষেধাজ্ঞা সংকেত (গোলাকার লাল বর্ডার)",
    category: "Segnali",
    exampleItalian: "Vietano il transito o determinate manovre a tutti o a specifici veicoli.",
    exampleBengali: "নিষেধাজ্ঞা সংকেত নির্দিষ্ট কোনো চালচলন বা গাড়ি চলাচল নিষিদ্ধ করে।",
  },
  {
    id: "17",
    italian: "Segnale di obbligo",
    bengali: "বাধ্যতামূলক সংকেত (গোলাকার নীল ব্যাকগ্রাউন্ডের সাইন)",
    category: "Segnali",
    exampleItalian: "Impongono di seguire una determinata direzione o comportamento.",
    exampleBengali: "বাধ্যতামূলক সাইন কোনো নির্দিষ্ট দিক বা আচরণ মেনে চলতে নির্দেশ দেয়।",
  },
  {
    id: "18",
    italian: "Segnale di precedenza",
    bengali: "অগ্রাধিকার সংকেত (অগ্রাধিকার দেওয়া বা পাওয়ার সাইন)",
    category: "Segnali",
    exampleItalian: "Il segnale di DARE PRECEDENZA obbliga a rallentare e dare precedenza.",
    exampleBengali: "অগ্রাধিকার ছাড়ার সাইন দেখলে গতি কমিয়ে অন্যদের আগে যেতে দিতে হয়।",
  },
  {
    id: "19",
    italian: "Pannello integrativo",
    bengali: "সহায়ক তথ্য বোর্ড (মূল সাইনবোর্ডের নিচের ছোট অতিরিক্ত সাইন)",
    category: "Segnali",
    exampleItalian: "Il pannello integrativo specifica la validità o la distanza del segnale.",
    exampleBengali: "সহায়ক বোর্ড মূল সাইনের কার্যকারিতা বা দূরত্বের তথ্য বিস্তারিত জানায়।",
  },
  {
    id: "20",
    italian: "Semaforo",
    bengali: "ট্রাফিক সিগন্যাল বাতি (লাল, হলুদ ও সবুজ)",
    category: "Segnali",
    exampleItalian: "La luce gialla fissa obbliga a sgomberare l'incrocio o a fermarsi in sicurezza.",
    exampleBengali: "স্থির হলুদ বাতি দেখলে নিরাপদ থাকলে ক্রসিং খালি করতে বা থামতে হয়।",
  },
  {
    id: "21",
    italian: "Rotatoria / Rotonda",
    bengali: "গোলচত্বর (রাউন্ডঅবাউট)",
    category: "Segnali",
    exampleItalian: "Nelle rotatorie con dare precedenza, hanno la precedenza i veicoli già all'interno.",
    exampleBengali: "গোলচত্বরে সাধারণত ভেতরের গাড়িগুলোর অগ্রাধিকার থাকে।",
  },

  // --- NORME & INCROCI ---
  {
    id: "22",
    italian: "Precedenza",
    bengali: "অগ্রাধিকার (কাকে আগে যাওয়ার অধিকার দিতে হবে)",
    category: "Norme",
    exampleItalian: "Di norma si dà la precedenza ai veicoli provenienti da destra.",
    exampleBengali: "সাধারণ নিয়ম অনুযায়ী ডান দিক থেকে আসা যানবাহনকে অগ্রাধিকার দিতে হবে।",
  },
  {
    id: "23",
    italian: "Sorpasso",
    bengali: "ওভারটেকিং (অন্য গাড়িকে পেছনে ফেলে সামনে যাওয়া)",
    category: "Norme",
    exampleItalian: "Il sorpasso è vietato in prossimità dei dossi e delle curve a visibilità ridotta.",
    exampleBengali: "উঁচু ঢালু রাস্তা বা অন্ধ বাঁকে ওভারটেকিং করা কঠোরভাবে নিষিদ্ধ।",
  },
  {
    id: "24",
    italian: "Sosta",
    bengali: "পার্কিং (গাড়ি নির্দিষ্ট স্থানে রেখে চালক চলে যাওয়া)",
    category: "Norme",
    exampleItalian: "La sosta è vietata davanti ai passi carrabili e sui marciapiedi.",
    exampleBengali: "গ্যারেজের প্রবেশমুখে বা ফুটপাতে গাড়ি পার্কিং করা সম্পূর্ণ নিষিদ্ধ।",
  },
  {
    id: "25",
    italian: "Fermata",
    bengali: "সাময়িক বিরতি (যাত্রী ওঠানামার জন্য অল্প সময়ের জন্য থামা)",
    category: "Norme",
    exampleItalian: "La fermata è consentita solo per brevissimo tempo senza allontanarsi dal veicolo.",
    exampleBengali: "গাড়ির চালক অবস্থান রেখে খুব অল্প সময়ের জন্য ফারমাতা বা বিরতি নিতে পারে।",
  },
  {
    id: "26",
    italian: "Arresto",
    bengali: "তাৎক্ষণিক থামা (ট্রাফিক জ্যাম বা লাল বাতির কারণে থামা)",
    category: "Norme",
    exampleItalian: "L'arresto del veicolo è imposto dalle condizioni del traffico o dal semaforo.",
    exampleBengali: "ট্রাফিক জ্যাম বা সিগন্যাল লাইটের কারণে গাড়ি তাৎক্ষণিকভাবে থেমে থাকে।",
  },
  {
    id: "27",
    italian: "Distanza di sicurezza",
    bengali: "নিরাপদ দূরত্ব (সামনের গাড়ি থেকে বজায় রাখা সুরক্ষা দূরত্ব)",
    category: "Norme",
    exampleItalian: "La distanza di sicurezza deve essere sempre uguale o superiore allo spazio di reazione.",
    exampleBengali: "নিরাপদ দূরত্ব সর্বদা প্রতিক্রিয়া দূরত্বের চেয়ে সমান বা বেশি হতে হবে।",
  },
  {
    id: "28",
    italian: "Tempo di reazione",
    bengali: "প্রতিক্রিয়া সময় (বিপদ দেখে ব্রেক চাপতে যে সময় লাগে, প্রায় ১ সেকেন্ড)",
    category: "Norme",
    exampleItalian: "Il tempo di reazione di un conducente attento è di circa 1 secondo.",
    exampleBengali: "একজন সচেতন চালকের প্রতিক্রিয়া সময় প্রায় ১ সেকেন্ড।",
  },
  {
    id: "29",
    italian: "Spazio di frenata",
    bengali: "ব্রেকিং দূরত্ব (ব্রেক চাপার পর গাড়ি সম্পূর্ণ থামতে যত দূর যায়)",
    category: "Norme",
    exampleItalian: "Lo spazio di frenata quadruplica se la velocità raddoppia.",
    exampleBengali: "গতি দ্বিগুণ বাড়লে ব্রেকিং দূরত্ব চারগুণ বৃদ্ধি পায়।",
  },
  {
    id: "30",
    italian: "Spazio totale di arresto",
    bengali: "মোট থামার দূরত্ব (প্রতিক্রিয়া দূরত্ব + ব্রেকিং দূরত্ব)",
    category: "Norme",
    exampleItalian: "È dato dalla somma dello spazio percorso nel tempo di reazione più lo spazio di frenata.",
    exampleBengali: "প্রতিক্রিয়া সময়ে অতিক্রান্ত দূরত্ব এবং ব্রেকিং দূরত্বের যোগফলই মোট থামার দূরত্ব।",
  },

  // --- MOTORE & MECCANICA ---
  {
    id: "31",
    italian: "Coppia motrice",
    bengali: "ড্রাইভিং টর্ক বা ইঞ্জিনের ঘূর্ণন শক্তি",
    category: "Motore",
    exampleItalian: "La coppia motrice è la forza con cui il pistone fa ruotare l'albero motore.",
    exampleBengali: "ড্রাইভিং টর্ক হলো সেই শক্তি যা পিস্টনের মাধ্যমে ক্র্যাঙ্কশ্যাফ্টকে ঘোরায়।",
  },
  {
    id: "32",
    italian: "Freno di stazionamento",
    bengali: "হ্যান্ডব্রেক / পার্কিং ব্রেক",
    category: "Motore",
    exampleItalian: "Il freno a mano blocca le ruote posteriori per tenere fermo il veicolo.",
    exampleBengali: "হ্যান্ডব্রেক পেছনের চাকা লক করে গাড়িকে পার্ক করা অবস্থায় স্থির রাখে।",
  },
  {
    id: "33",
    italian: "Frizione",
    bengali: "ক্লাচ (ইঞ্জিন এবং গিয়ারবক্সকে যুক্ত ও আলাদা করে)",
    category: "Motore",
    exampleItalian: "La frizione consente di innestare e disinnestare la trasmissione per cambiare marcia.",
    exampleBengali: "ক্লাচ গিয়ার পরিবর্তনের জন্য ইঞ্জিনের সাথে চাকার শক্তি সংযোগ বিচ্ছিন্ন ও যুক্ত করে।",
  },
  {
    id: "34",
    italian: "Albero motore",
    bengali: "ক্র্যাঙ্কশ্যাফ্ট (ইঞ্জিনের প্রধান ঘূর্ণায়মান শ্যাফ্ট)",
    category: "Motore",
    exampleItalian: "L'albero motore riceve il moto dai pistoni tramite le bielle.",
    exampleBengali: "ক্র্যাঙ্কশ্যাফ্ট পিস্টন থেকে কানেক্টিং রডের মাধ্যমে ঘূর্ণন গতি পায়।",
  },
  {
    id: "35",
    italian: "Pistone",
    bengali: "পিস্টন (ইঞ্জিন সিলিন্ডারের ভেতরে ওঠানামা করে)",
    category: "Motore",
    exampleItalian: "Il pistone scorre all'interno del cilindro spinto dalla combustione del carburante.",
    exampleBengali: "জ্বালানী দহনের চাপে পিস্টন সিলিন্ডারের ভেতরে ওঠানামা করে।",
  },
  {
    id: "36",
    italian: "Liquido di raffreddamento",
    bengali: "ইঞ্জিন কুল্যান্ট / রেডিয়েটর তরল (ইঞ্জিন ঠান্ডা রাখার পানি)",
    category: "Motore",
    exampleItalian: "Serve a mantenere il motore alla corretta temperatura di esercizio evitando il surriscaldamento.",
    exampleBengali: "ইঞ্জিন অতিরিক্ত গরম হওয়া রোধ করে সঠিক তাপমাত্রায় রাখতে এটি কাজ করে।",
  },
  {
    id: "37",
    italian: "Olio motore",
    bengali: "ইঞ্জিন অয়েল / লুব্রিকেন্ট (যন্ত্রাংশ পিচ্ছিল রাখার তেল)",
    category: "Motore",
    exampleItalian: "L'olio motore lubrifica e riduce l'attrito tra le parti meccaniche in movimento.",
    exampleBengali: "ইঞ্জিন অয়েল ঘূর্ণায়মান যন্ত্রাংশের ঘর্ষণ কমায় এবং সুরক্ষা দেয়।",
  },
  {
    id: "38",
    italian: "Pressione degli pneumatici",
    bengali: "টায়ারের বাতাসের চাপ",
    category: "Motore",
    exampleItalian: "La pressione va controllata a pneumatici freddi compresa la ruota di scorta.",
    exampleBengali: "টায়ার ঠান্ডা থাকা অবস্থায় স্পেয়ার চাকা সহ বাতাসের চাপ পরীক্ষা করতে হয়।",
  },
  {
    id: "39",
    italian: "Battistrada",
    bengali: "টায়ারের ট্রেড বা খাঁজের গভীরতা (ন্যূনতম ১.৬ মিমি)",
    category: "Motore",
    exampleItalian: "Lo spessore minimo del battistrada per le autovetture è di 1,6 mm.",
    exampleBengali: "সাধারণ গাড়ির টায়ারের খাঁজের ন্যূনতম গভীরতা ১.৬ মিলিমিটার হতে হবে।",
  },

  // --- SICUREZZA ---
  {
    id: "40",
    italian: "Cintura di sicurezza",
    bengali: "সিটবেল্ট (চালক ও সকল যাত্রীর জন্য বাধ্যতামূলক)",
    category: "Sicurezza",
    exampleItalian: "L'uso della cintura di sicurezza è obbligatorio per conducente e passeggeri anteriori e posteriori.",
    exampleBengali: "চালক সহ সামনের ও পেছনের সকল যাত্রীর সিটবেল্ট পরা আইনত বাধ্যতামূলক।",
  },
  {
    id: "41",
    italian: "Airbag",
    bengali: "এয়ারব্যাগ (জরুরি সংঘর্ষে খুলে যাওয়া সুরক্ষা কুশন)",
    category: "Sicurezza",
    exampleItalian: "L'airbag è un dispositivo di sicurezza passiva che si gonfia in caso di urto violento.",
    exampleBengali: "এয়ারব্যাগ একটি প্যাসিভ নিরাপত্তা ব্যবস্থা যা মারাত্মক সংঘর্ষের সময় স্বয়ংক্রিয়ভাবে খুলে যায়।",
  },
  {
    id: "42",
    italian: "Casco protettivo",
    bengali: "সেফটি হেলমেট (মোটরসাইকেল চালকদের বাধ্যতামূলক)",
    category: "Sicurezza",
    exampleItalian: "Il casco deve essere di tipo omologato e sempre allacciato correttamente.",
    exampleBengali: "হেলমেট অনুমোদিত মানের হতে হবে এবং সঠিকভাবে লক করে পরতে হবে।",
  },
  {
    id: "43",
    italian: "Giubbotto catarifrangente",
    bengali: "রিফ্লেক্টিভ সেফটি জ্যাকেট (ফ্লুরোসেন্ট ভেস্ট)",
    category: "Sicurezza",
    exampleItalian: "È obbligatorio indossarlo quando si scende dal veicolo fermo di notte fuori dai centri abitati.",
    exampleBengali: "শহরের বাইরে রাতে নষ্ট গাড়ি থেকে নামার সময় এই জ্যাকেট পরা বাধ্যতামূলক।",
  },
  {
    id: "44",
    italian: "Segnale mobile di pericolo (Triangolo)",
    bengali: "জরুরি সতর্কীকরণ ত্রিভুজ সাইন (৫০/১০০ মিটার পেছনে বসানো)",
    category: "Sicurezza",
    exampleItalian: "Va posto ad almeno 50 metri dal veicolo fermo su strade extraurbane e a 100 metri in autostrada.",
    exampleBengali: "হাইওয়েতে গাড়ি নষ্ট হলে অন্তত ৫০ বা ১০০ মিটার পেছনে ত্রিভুজটি বসাতে হয়।",
  },
  {
    id: "45",
    italian: "Aquaplaning",
    bengali: "অ্যাকোয়াপ্ল্যানিং (বৃষ্টির পানিতে টায়ার পিচ্ছিল হয়ে গ্রিপ হারানো)",
    category: "Sicurezza",
    exampleItalian: "L'aquaplaning fa galleggiare le ruote sullo strato d'acqua facendo perdere il controllo dello sterzo.",
    exampleBengali: "রাস্তায় জমে থাকা পানিতে চাকা ভেসে স্টিয়ারিং নিয়ন্ত্রণহীন হয়ে পড়াকে অ্যাকোয়াপ্ল্যানিং বলে।",
  },
  {
    id: "46",
    italian: "Tasso alcolemico",
    bengali: "রক্তে অ্যালকোহলের মাত্রা (নতুনদের জন্য ০.০ g/l)",
    category: "Sicurezza",
    exampleItalian: "Per i neopatentati nei primi 3 anni il tasso alcolemico deve essere zero (0,0 g/l).",
    exampleBengali: "প্রথম ৩ বছর নব্য চালকদের জন্য রক্তে অ্যালকোহলের মাত্রা শূন্য (০.০) থাকা বাধ্যতামূলক।",
  },
  {
    id: "47",
    italian: "Soccorso stradale (112)",
    bengali: "জরুরি সড়ক উদ্ধার ও অ্যাম্বুলেন্স সহায়তা (ইউরোপীয় নম্বর ১১২)",
    category: "Sicurezza",
    exampleItalian: "In caso di incidente grave con feriti bisogna chiamare subito il 112.",
    exampleBengali: "আহত ব্যক্তি সহ গুরুতর দুর্ঘটনায় দ্রুত ১১২ নম্বরে ফোন করে সহায়তা নিতে হবে।",
  },

  // --- LUCI & DISPOSITIVI ---
  {
    id: "48",
    italian: "Luci anabbaglianti",
    bengali: "লো-বিম হেডলাইট (সাধারণ রাতের আলো বা সুড়ঙ্গের ভেতরের আলো)",
    category: "Luci",
    exampleItalian: "Le luci anabbaglianti si usano sempre in galleria e da mezz'ora dopo il tramonto.",
    exampleBengali: "টানেল বা সুড়ঙ্গে এবং সূর্যাস্তের ৩০ মিনিট পর থেকে লো-বিম লাইট ব্যবহার করতে হয়।",
  },
  {
    id: "49",
    italian: "Luci abbaglianti",
    bengali: "হাই-বিম হেডলাইট (দূরবর্তী তীব্র আলো)",
    category: "Luci",
    exampleItalian: "Vanno spente quando si incrociano o si seguono altri veicoli per non abbagliarli.",
    exampleBengali: "সামনের বা পেছনের গাড়িকে অন্ধ না করার জন্য হাই-বিম লাইট সাথে সাথে নিভিয়ে লো-বিম করতে হয়।",
  },
  {
    id: "50",
    italian: "Luci di posizione",
    bengali: "পার্কিং বা অবস্থান নির্দেশক আলো",
    category: "Luci",
    exampleItalian: "Rendono visibile la sagoma e le dimensioni del veicolo agli altri utenti.",
    exampleBengali: "অন্যান্য চালকদের কাছে গাড়ির অবস্থান ও আকার স্পষ্টভাবে বোঝাতে পজিশন লাইট জ্বলে।",
  },
  {
    id: "51",
    italian: "Indicatori di direzione (Frecce)",
    bengali: "ইন্ডিকেটর লাইট (ডানে বা বামে মোড় নেওয়ার সংকেত বাতি)",
    category: "Luci",
    exampleItalian: "È obbligatorio azionare le frecce con anticipo prima di ogni cambio di corsia o svolta.",
    exampleBengali: "লেন পরিবর্তন বা মোড় নেওয়ার আগে পর্যাপ্ত সময় পূর্বে ইন্ডিকেটর দিতে হবে।",
  },
  {
    id: "52",
    italian: "Luci di emergenza (Quattro frecce)",
    bengali: "হ্যাজার্ড লাইট (জরুরি চার বাতি একসাথে জ্বলা)",
    category: "Luci",
    exampleItalian: "Si usano in caso di arresto improvviso, veicolo in avaria o coda improvvisa.",
    exampleBengali: "হঠাৎ গাড়ি বিকল হলে, জরুরি ব্রেকিং বা ট্রাফিক জ্যামে হ্যাজার্ড লাইট জ্বালাতে হয়।",
  },

  // --- PATENTE & DOCUMENTI ---
  {
    id: "53",
    italian: "Patente a punti",
    bengali: "পয়েন্টভিত্তিক ড্রাইভিং লাইসেন্স (শুরুতে ২০ পয়েন্ট থাকে)",
    category: "Patente",
    exampleItalian: "Ogni patente ha una dotazione iniziale di 20 punti che si perdono violando il codice della strada.",
    exampleBengali: "প্রতিটি লাইসেন্সে শুরুতে ২০ পয়েন্ট থাকে, ট্রাফিক নিয়ম ভাঙলে পয়েন্ট কাটা যায়।",
  },
  {
    id: "54",
    italian: "Neopatentato",
    bengali: "নতুন লাইসেন্সধারী (প্রথম ৩ বছর বিশেষ গতির নিয়ম প্রযোজ্য)",
    category: "Patente",
    exampleItalian: "Per i primi 3 anni il limite in autostrada è di 100 km/h e 90 km/h sulle extraurbane.",
    exampleBengali: "প্রথম ৩ বছর অটোস্ট্রাডায় ১০০ কিমি এবং প্রধান সড়কে ৯০ কিমি সর্বোচ্চ গতিসীমা থাকে।",
  },
  {
    id: "55",
    italian: "Carta di circolazione (Libretto)",
    bengali: "গাড়ির রেজিস্ট্রেশন বই / ব্লু-বুক",
    category: "Patente",
    exampleItalian: "Attesta l'idoneità tecnica del veicolo alla circolazione e i dati del proprietario.",
    exampleBengali: "গাড়ির কারিগরি ফিটনেস এবং মালিকের তথ্য এই নথিতে সংরক্ষিত থাকে।",
  },
  {
    id: "56",
    italian: "Certificato di assicurazione",
    bengali: "গাড়ির ইন্স্যুরেন্স বা বীমা সার্টিফিকেট",
    category: "Patente",
    exampleItalian: "L'assicurazione RCA è obbligatoria per legge per poter circolare sulla strada.",
    exampleBengali: "রাস্তায় গাড়ি চালানোর জন্য আরসিএ (RCA) বীমা থাকা আইনত বাধ্যতামূলক।",
  },
  {
    id: "57",
    italian: "Revisione periodica",
    bengali: "গাড়ির পর্যায়ক্রমিক ফিটনেস পরীক্ষা (৪ বছর পর, তারপর প্রতি ২ বছর পর)",
    category: "Patente",
    exampleItalian: "La prima revisione si effettua dopo 4 anni dall'immatricolazione, poi ogni 2 anni.",
    exampleBengali: "নতুন গাড়ির প্রথম রিভিশন ৪ বছর পর এবং এরপর প্রতি ২ বছর পর পর করতে হয়।",
  },
  {
    id: "58",
    italian: "Foglio Rosa",
    bengali: "লার্নার ড্রাইভিং পারমিট (ড্রাইভিং শেখার গোলাপী অনুমতিপত্র)",
    category: "Patente",
    exampleItalian: "Consente di guidare affiancati da un istruttore o persona con patente da almeno 10 anni.",
    exampleBengali: "কমপক্ষে ১০ বছর লাইসেন্স থাকা অভিজ্ঞ চালককে পাশে বসিয়ে গাড়ি শেখার অনুমতি দেয়।",
  },
];

export default function DizionarioScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Custom translation input
  const [customText, setCustomText] = useState("");
  const [customTranslated, setCustomTranslated] = useState("");

  const categories = [
    "Tutti",
    "Strada",
    "Segnali",
    "Norme",
    "Motore",
    "Sicurezza",
    "Luci",
    "Patente",
  ];

  const filteredWords = DICTIONARY_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "Tutti" || item.category === selectedCategory;
    const matchesSearch =
      item.italian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bengali.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const playVoice = (id: string, text: string, lang: "it-IT" | "bn-BD") => {
    if (activeSpeakingId === `${id}-${lang}`) {
      stop();
      setActiveSpeakingId(null);
    } else {
      stop();
      setActiveSpeakingId(`${id}-${lang}`);
      speak(text, {
        language: lang,
        onDone: () => setActiveSpeakingId(null),
        onError: () => setActiveSpeakingId(null),
      });
    }
  };

  const handleCustomTranslate = () => {
    if (!customText.trim()) return;
    const match = DICTIONARY_DATA.find((d) =>
      d.italian.toLowerCase().includes(customText.toLowerCase().trim())
    );
    if (match) {
      setCustomTranslated(match.bengali);
    } else {
      setCustomTranslated(`${customText} (ইতালিয়ান ড্রাইভিং লাইসেন্স টার্ম)`);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View
        className="px-4 pt-2 pb-3.5 flex-row items-center justify-between shadow-md"
        style={{
          backgroundColor: "#22c55e",
          elevation: 4,
        }}
      >
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-white/20"
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-black ml-2 tracking-wide">
            Dizionario & Traduzione
          </Text>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 items-center justify-center border border-white/30"
        >
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={18}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 w-full max-w-xl mx-auto px-4 pt-3">
        {/* Search Bar with live filter */}
        <View
          className="flex-row items-center px-3.5 py-2.5 rounded-2xl border mb-3"
          style={{
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            shadowColor: isDarkMode ? "#000" : "#64748b",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.3 : 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cerca parole (Italiano o বাংলা)..."
            placeholderTextColor={colors.textMuted}
            className="flex-1 ml-2 text-sm"
            style={{ color: colors.textPrimary }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-3 max-h-10"
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              className="px-4 py-1.5 rounded-full mr-2 border active:scale-95"
              style={{
                backgroundColor:
                  selectedCategory === cat ? "#16a34a" : colors.pillBg,
                borderColor:
                  selectedCategory === cat ? "#15803d" : colors.cardBorder,
              }}
            >
              <Text
                className="text-xs font-black"
                style={{
                  color: selectedCategory === cat ? "#ffffff" : colors.pillText,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Live Instant Translator Box */}
        <View
          className="p-3.5 rounded-2xl border mb-3.5"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
            shadowColor: isDarkMode ? "#000" : "#64748b",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.3 : 0.05,
            shadowRadius: 5,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xs font-black text-emerald-600">
              🌐 দ্রুত অনুবাদ ও উচ্চারণ (Instant Translator):
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <TextInput
              value={customText}
              onChangeText={setCustomText}
              placeholder="যেকোনো ইতালিয়ান শব্দ লিখুন..."
              placeholderTextColor={colors.textMuted}
              className="flex-1 p-2.5 rounded-xl border text-xs"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.textPrimary,
              }}
            />
            <TouchableOpacity
              onPress={handleCustomTranslate}
              className="px-3.5 py-2.5 bg-[#22c55e] rounded-xl items-center justify-center shadow-xs active:scale-95"
            >
              <Text className="text-xs font-black text-white">অনুবাদ</Text>
            </TouchableOpacity>
          </View>

          {customTranslated.length > 0 && (
            <View
              className="mt-2.5 p-2.5 rounded-xl border flex-row items-center justify-between"
              style={{
                backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
                borderColor: isDarkMode ? "#059669" : "#6ee7b7",
              }}
            >
              <Text
                className="text-xs font-bold flex-1 mr-2"
                style={{ color: isDarkMode ? "#ecfdf5" : "#064e3b" }}
              >
                👉 {customTranslated}
              </Text>
              <TouchableOpacity
                onPress={() => playVoice("custom-bn", customTranslated, "bn-BD")}
                className="px-2.5 py-1 bg-emerald-600 rounded-full flex-row items-center active:scale-95"
              >
                <Ionicons name="volume-high" size={12} color="#ffffff" />
                <Text className="text-[10px] font-black text-white ml-1">শুনুন</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Dictionary Entries List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1"
        >
          {filteredWords.map((entry) => {
            const isSpeakingItalian = activeSpeakingId === `${entry.id}-it-IT`;
            const isSpeakingBengali = activeSpeakingId === `${entry.id}-bn-BD`;

            return (
              <View
                key={entry.id}
                className="w-full rounded-3xl p-4 mb-3.5 border"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                  shadowColor: isDarkMode ? "#000" : "#64748b",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: isDarkMode ? 0.3 : 0.07,
                  shadowRadius: 7,
                  elevation: 2,
                }}
              >
                {/* Italian Header + Italian Voice Button */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-1 mr-2">
                    <Text
                      className="text-base font-black"
                      style={{ color: colors.textPrimary }}
                    >
                      🇮🇹 {entry.italian}
                    </Text>
                    <Text className="text-[10px] font-bold text-emerald-600">
                      Tag: {entry.category}
                    </Text>
                  </View>

                  {/* Italian Voice Speaker */}
                  <TouchableOpacity
                    onPress={() =>
                      playVoice(entry.id, entry.italian, "it-IT")
                    }
                    className="flex-row items-center px-3 py-1.5 rounded-full shadow-xs active:scale-95"
                    style={{
                      backgroundColor: isSpeakingItalian ? "#16a34a" : "#2563eb",
                    }}
                  >
                    <Ionicons
                      name={isSpeakingItalian ? "volume-high" : "volume-medium"}
                      size={14}
                      color="#ffffff"
                    />
                    <Text className="text-[10px] font-black text-white ml-1">
                      {isSpeakingItalian ? "চলছে..." : "ইতালিয়ান শুনুন"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Bengali Translation Box + Bengali Voice Button */}
                <View
                  className="p-3 rounded-2xl border mb-2"
                  style={{
                    backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
                    borderColor: isDarkMode ? "#059669" : "#6ee7b7",
                  }}
                >
                  <View className="flex-row items-center justify-between mb-1">
                    <Text
                      className="text-[10px] font-black"
                      style={{ color: isDarkMode ? "#6ee7b7" : "#065f46" }}
                    >
                      🇧🇩 বাংলা অর্থ:
                    </Text>

                    {/* Bengali Voice Speaker */}
                    <TouchableOpacity
                      onPress={() =>
                        playVoice(entry.id, entry.bengali, "bn-BD")
                      }
                      className="flex-row items-center px-3 py-1 rounded-full active:scale-95"
                      style={{
                        backgroundColor: isSpeakingBengali ? "#d97706" : "#16a34a",
                      }}
                    >
                      <Ionicons
                        name={
                          isSpeakingBengali ? "volume-high" : "volume-medium"
                        }
                        size={12}
                        color="#ffffff"
                      />
                      <Text className="text-[9px] font-black text-white ml-1">
                        {isSpeakingBengali ? "বলছে..." : "বাংলা শুনুন"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    className="text-sm font-bold leading-5"
                    style={{ color: isDarkMode ? "#ecfdf5" : "#064e3b" }}
                  >
                    {entry.bengali}
                  </Text>
                </View>

                {/* Example sentence if present */}
                {entry.exampleItalian && (
                  <View
                    className="pt-2 border-t"
                    style={{ borderColor: colors.cardBorder }}
                  >
                    <Text
                      className="text-xs font-medium italic"
                      style={{ color: colors.textMuted }}
                    >
                      💡 {entry.exampleItalian}
                    </Text>
                    <Text className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                      👉 {entry.exampleBengali}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
