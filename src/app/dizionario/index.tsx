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
    italian: "Coppia motrice",
    bengali: "ড্রাইভিং টর্ক বা ইঞ্জিনের ঘূর্ণন বল",
    category: "Motore",
    exampleItalian: "La coppia motrice spinge il veicolo.",
    exampleBengali: "ড্রাইভিং টর্ক গাড়িকে সামনের দিকে চালিত করে।",
  },
  {
    id: "4",
    italian: "Segnale di pericolo",
    bengali: "বিপদ সংকেত (ত্রিকোণাকার লাল বর্ডারযুক্ত সাইন)",
    category: "Segnali",
    exampleItalian: "I segnali di pericolo sono posti a 150 metri.",
    exampleBengali: "বিপদ সংকেতগুলো সাধারণত ১৫০ মিটার আগে থাকে।",
  },
  {
    id: "5",
    italian: "Precedenza",
    bengali: "অগ্রাধিকার (কাকে আগে যাওয়ার অধিকার দিতে হবে)",
    category: "Norme",
    exampleItalian: "Bisogna dare la precedenza ai veicoli che provengono da destra.",
    exampleBengali: "ডান দিক থেকে আসা যানবাহনকে অগ্রাধিকার দিতে হবে।",
  },
  {
    id: "6",
    italian: "Sorpasso",
    bengali: "ওভারটেকিং (অন্য গাড়িকে পেছনে ফেলে সামনে যাওয়া)",
    category: "Norme",
    exampleItalian: "Il sorpasso è vietato in prossimità dei dossi e delle curve.",
    exampleBengali: "উঁচু রাস্তা বা বাঁকে ওভারটেকিং করা নিষিদ্ধ।",
  },
  {
    id: "7",
    italian: "Spartitraffico",
    bengali: "রোড ডিভাইডার / ট্রাফিক বিভাজক",
    category: "Strada",
    exampleItalian: "Lo spartitraffico separa due carreggiate.",
    exampleBengali: "ডিভাইডার দুটি পৃথক ক্যারেজওয়েকে আলাদা করে।",
  },
  {
    id: "8",
    italian: "Freno di stazionamento",
    bengali: "হ্যান্ডব্রেক / পার্কিং ব্রেক",
    category: "Motore",
    exampleItalian: "Il freno a mano si usa per mantenere fermo il veicolo.",
    exampleBengali: "গাড়ি থামিয়ে রাখার জন্য হ্যান্ডব্রেক ব্যবহার করা হয়।",
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

  const categories = ["Tutti", "Strada", "Motore", "Segnali", "Norme"];

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
