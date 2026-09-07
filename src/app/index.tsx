import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAppTheme } from "@/utils/themeContext";

interface ModuleItem {
  id: string;
  title: string;
  subtitle: string;
  type: "laptop" | "topics" | "eclass" | "challenge" | "exam" | "dictionary";
  badge?: string;
}

const MODULES: ModuleItem[] = [
  {
    id: "test",
    title: "Test",
    subtitle: "Test",
    type: "laptop",
  },
  {
    id: "argomenti",
    title: "ARGOMENTI",
    subtitle: "TOPICS",
    type: "topics",
  },
  {
    id: "eclass",
    title: "E-Class",
    subtitle: "E-Class",
    type: "eclass",
  },
  {
    id: "sfida",
    title: "Sfida",
    subtitle: "Challenge",
    type: "challenge",
  },
  {
    id: "esame",
    title: "Scheda Esame",
    subtitle: "Exam Test",
    type: "exam",
  },
  {
    id: "dizionario",
    title: "Dizionario",
    subtitle: "Dictionary",
    type: "dictionary",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useAppTheme();
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [howToVisible, setHowToVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const handleCardPress = (item: ModuleItem) => {
    if (item.id === "argomenti") {
      router.push("/argomenti" as any);
    } else if (item.id === "dizionario") {
      router.push("/dizionario" as any);
    } else {
      setSelectedModule(item);
    }
  };

  const renderModuleIcon = (type: ModuleItem["type"]) => {
    switch (type) {
      case "laptop":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* Styled Laptop Graphic */}
            <View className="items-center">
              <View className="w-24 h-16 bg-slate-800 rounded-t-xl border-2 border-slate-700 p-1 shadow-md justify-center items-center relative overflow-hidden">
                <View className="w-full h-full bg-slate-100 rounded-lg items-center justify-center p-1">
                  <View className="flex-row items-center justify-between w-full px-1 mb-1">
                    <View className="w-2 h-2 rounded-full bg-red-400" />
                    <View className="w-2 h-2 rounded-full bg-emerald-400" />
                  </View>
                  <Ionicons name="car-sport" size={22} color="#2563eb" />
                  <View className="w-10 h-1 bg-blue-200 rounded-full mt-1" />
                </View>
              </View>
              {/* Laptop base */}
              <View className="w-28 h-2.5 bg-slate-400 rounded-b-md shadow-md border-t border-slate-300 items-center justify-center">
                <View className="w-8 h-0.5 bg-slate-600 rounded-full" />
              </View>
            </View>
          </View>
        );

      case "topics":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* Graduation Cap on Books Graphic */}
            <View className="items-center relative">
              {/* Mortarboard / Cap */}
              <View className="z-10 items-center -mb-2">
                <View
                  style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 28,
                    borderRightWidth: 28,
                    borderBottomWidth: 15,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: "#1e3a8a",
                  }}
                />
                <View className="w-9 h-3 bg-blue-950 rounded-b shadow-sm" />
                {/* Gold Tassel */}
                <View className="absolute -right-3 top-2 w-1 h-4 bg-amber-400 rounded-full" />
              </View>
              {/* Stack of Books */}
              <View className="w-20 h-4 bg-amber-500 rounded-sm shadow-sm -mb-0.5 border-b border-amber-600" />
              <View className="w-22 h-4 bg-emerald-500 rounded-sm shadow-sm -mb-0.5 border-b border-emerald-600" />
              <View className="w-24 h-4.5 bg-blue-600 rounded-sm shadow border-b border-blue-700" />
            </View>
          </View>
        );

      case "eclass":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* E-Class mobile & presentation illustration */}
            <View className="flex-row items-end justify-center">
              {/* Left Student */}
              <View className="items-center mr-1">
                <View className="w-4 h-4 rounded-full bg-amber-400 mb-0.5 shadow-xs" />
                <View className="w-5 h-8 bg-amber-600 rounded-t-md" />
              </View>
              {/* Center Smartboard/Phone */}
              <View className="w-14 h-22 bg-slate-900 rounded-xl p-1 border border-slate-700 items-center justify-center shadow-md">
                <View className="w-full h-full bg-slate-50 rounded-lg p-1 items-center justify-between">
                  <View className="w-full bg-red-500 rounded px-0.5 py-0.5">
                    <Text className="text-[7px] text-white font-black text-center">E-LEARNING</Text>
                  </View>
                  <Ionicons name="play-circle" size={18} color="#ef4444" />
                  <View className="w-full h-1 bg-slate-200 rounded-full" />
                </View>
              </View>
              {/* Right Teacher */}
              <View className="items-center ml-1">
                <View className="w-4 h-4 rounded-full bg-rose-400 mb-0.5 shadow-xs" />
                <View className="w-5 h-8 bg-rose-500 rounded-t-md" />
              </View>
            </View>
          </View>
        );

      case "challenge":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* Sfida / Challenge celebratory vector */}
            <View className="relative items-center justify-center">
              {/* Confetti dots */}
              <View className="absolute -top-3 -left-3 w-2 h-2 rounded-full bg-yellow-400" />
              <View className="absolute -top-2 right-1 w-1.5 h-1.5 rounded-full bg-rose-400" />
              <View className="absolute top-2 -right-4 w-2 h-2 rounded-full bg-blue-400" />
              <View className="absolute top-1 -left-4 w-1.5 h-1.5 rounded-full bg-emerald-400" />

              {/* Two high-fiving figures */}
              <View className="flex-row items-center justify-center">
                <View className="items-center mr-1">
                  <Ionicons name="person" size={26} color="#0284c7" />
                </View>
                <Ionicons name="flash" size={22} color="#eab308" />
                <View className="items-center ml-1">
                  <Ionicons name="person" size={26} color="#475569" />
                </View>
              </View>
              {/* Trophy icon below */}
              <View className="mt-1 bg-amber-100 rounded-full px-2.5 py-0.5 flex-row items-center border border-amber-300">
                <Ionicons name="trophy" size={13} color="#d97706" />
                <Text className="text-[9px] font-black text-amber-700 ml-1">TOP</Text>
              </View>
            </View>
          </View>
        );

      case "exam":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* Scheda Esame graphic */}
            <View className="items-center">
              <View
                className="w-20 h-20 rounded-2xl border p-2 shadow-sm justify-between"
                style={{
                  backgroundColor: isDarkMode ? "#1e1b4b" : "#eef2ff",
                  borderColor: isDarkMode ? "#3730a3" : "#c7d2fe",
                }}
              >
                <View className="flex-row items-center justify-between border-b pb-1 border-indigo-200">
                  <Text className="text-[9px] font-black text-indigo-900">ESAME</Text>
                  <Ionicons name="checkmark-circle" size={12} color="#16a34a" />
                </View>
                <View className="items-center my-0.5">
                  <Ionicons name="person-circle" size={24} color="#6366f1" />
                </View>
                <View className="flex-row justify-between w-full">
                  <View className="w-6 h-1 bg-indigo-300 rounded-full" />
                  <View className="w-6 h-1 bg-indigo-300 rounded-full" />
                </View>
              </View>
            </View>
          </View>
        );

      case "dictionary":
        return (
          <View className="items-center justify-center h-28 w-full">
            {/* 3D Red Dictionary on Smartphone */}
            <View className="items-center">
              {/* 3D Dictionary Book */}
              <View className="w-14 h-18 bg-red-600 rounded-r-lg rounded-l-xs p-1.5 shadow-md border-l-4 border-l-red-900 z-10 items-center justify-center">
                <Text className="text-[8px] text-white font-bold mb-1">Dizionario</Text>
                <View className="bg-white px-2 py-0.5 rounded shadow-xs">
                  <Text className="text-[10px] font-black text-red-600">A-Z</Text>
                </View>
              </View>
              {/* Base under dictionary */}
              <View className="w-22 h-4 bg-slate-300 rounded-md -mt-2 shadow-sm border border-slate-400" />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      {/* Top App Header with Italian Brand Green Background */}
      <View
        className="px-5 pt-2 pb-3.5 flex-row items-center justify-between shadow-md"
        style={{
          backgroundColor: "#22c55e",
          elevation: 4,
        }}
      >
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-2.5 border border-white/30">
            <Ionicons name="car-sport" size={18} color="#ffffff" />
          </View>
          <View>
            <Text className="text-white text-xl font-black tracking-wide">
              Tmm Patente
            </Text>
            <Text className="text-emerald-100 text-[10px] font-bold -mt-0.5">
              Patente B • Italiano & বাংলা
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setStatsVisible(true)}
          className="w-9 h-9 rounded-full bg-white/20 items-center justify-center border border-white/40 active:bg-white/30"
        >
          <Ionicons name="stats-chart" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 w-full max-w-xl mx-auto px-4 pt-3">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
          className="flex-1"
        >
          {/* 2-Column Grid of Main Modules */}
          <View className="flex-row flex-wrap justify-between">
            {MODULES.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.82}
                onPress={() => handleCardPress(item)}
                className="w-[48%] rounded-3xl p-4 mb-4 items-center justify-between border"
                style={{
                  height: 198,
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.cardBorder,
                  shadowColor: isDarkMode ? "#000" : "#64748b",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: isDarkMode ? 0.4 : 0.08,
                  shadowRadius: 10,
                  elevation: 3,
                }}
              >
                {/* Module Illustration Icon */}
                <View className="w-full items-center justify-center flex-1">
                  {renderModuleIcon(item.type)}
                </View>

                {/* Module Titles */}
                <View className="items-center mt-1 w-full">
                  <Text
                    className="text-base font-black text-center"
                    style={{ color: colors.textPrimary }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className="text-xs font-semibold text-center mt-0.5"
                    style={{ color: colors.textMuted }}
                    numberOfLines={1}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Floating Bottom Navigation Bar with Pixel-Perfect Light & Dark Mode Icons */}
      <View
        className="absolute bottom-5 left-4 right-4 items-center"
        pointerEvents="box-none"
      >
        <View
          className="w-full max-w-xl flex-row items-center justify-around py-2.5 px-3 rounded-full border"
          style={{
            backgroundColor: colors.dockBackground,
            borderColor: colors.dockBorder,
            shadowColor: isDarkMode ? "#000000" : "#94a3b8",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: isDarkMode ? 0.6 : 0.15,
            shadowRadius: 16,
            elevation: 10,
          }}
        >
          {/* 1. Stats Icon Button */}
          <TouchableOpacity
            onPress={() => setStatsVisible(true)}
            className="w-11 h-11 rounded-full items-center justify-center border active:scale-95"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#fef3c7",
              borderColor: isDarkMode ? "#3f3f46" : "#fde68a",
            }}
          >
            <Ionicons
              name="bar-chart"
              size={20}
              color={isDarkMode ? "#fbbf24" : "#d97706"}
            />
          </TouchableOpacity>

          {/* 2. Day / Night Theme Toggle Button */}
          <TouchableOpacity
            onPress={toggleTheme}
            className="w-11 h-11 rounded-full items-center justify-center border active:scale-95"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#2563eb",
              borderColor: isDarkMode ? "#334155" : "#1d4ed8",
              shadowColor: "#2563eb",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={20}
              color={isDarkMode ? "#facc15" : "#ffffff"}
            />
          </TouchableOpacity>

          {/* 3. Search Floating Button */}
          <TouchableOpacity
            onPress={() => setSearchVisible(true)}
            className="w-11 h-11 rounded-full items-center justify-center border active:scale-95"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#f1f5f9",
              borderColor: isDarkMode ? "#3f3f46" : "#e2e8f0",
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color={isDarkMode ? "#f8fafc" : "#0f172a"}
            />
          </TouchableOpacity>

          {/* 4. QR Code Scanner */}
          <TouchableOpacity
            onPress={() => alert("📷 QR Scanner: Scansiona il codice del libro Patente")}
            className="w-11 h-11 rounded-full items-center justify-center border active:scale-95"
            style={{
              backgroundColor: isDarkMode ? "#27272a" : "#f1f5f9",
              borderColor: isDarkMode ? "#3f3f46" : "#e2e8f0",
            }}
          >
            <Ionicons
              name="qr-code-outline"
              size={20}
              color={isDarkMode ? "#f8fafc" : "#0f172a"}
            />
          </TouchableOpacity>

          {/* 5. "HOW TO?" Help Badge */}
          <TouchableOpacity
            onPress={() => setHowToVisible(true)}
            className="px-3.5 py-2 rounded-full items-center justify-center shadow-sm active:scale-95"
            style={{
              backgroundColor: "#f97316",
            }}
          >
            <Text className="text-[10px] font-black text-white tracking-wider">
              HOW TO ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Module Detail Modal */}
      <Modal
        visible={!!selectedModule}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedModule(null)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setSelectedModule(null)}
        >
          <Pressable
            className="w-full rounded-t-3xl p-6"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="w-12 h-1.5 rounded-full self-center mb-4"
              style={{ backgroundColor: colors.cardBorder }}
            />

            {selectedModule && (
              <View>
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text
                      className="text-2xl font-black"
                      style={{ color: colors.textPrimary }}
                    >
                      {selectedModule.title}
                    </Text>
                    <Text className="text-sm font-bold text-emerald-600 mt-0.5">
                      {selectedModule.subtitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedModule(null)}
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: colors.pillBg }}
                  >
                    <Ionicons
                      name="close"
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  className="text-sm mb-6 leading-6"
                  style={{ color: colors.textSecondary }}
                >
                  Benvenuto nella sezione {selectedModule.title}. Qui puoi
                  esercitarti con i quiz della patente B, simulare schede esame e
                  studiare gli argomenti con traduzione in bengalese e pronuncia vocale.
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    const mod = selectedModule;
                    setSelectedModule(null);
                    if (mod?.id === "argomenti") {
                      router.push("/argomenti" as any);
                    } else if (mod?.id === "dizionario") {
                      router.push("/dizionario" as any);
                    } else {
                      router.push("/argomenti" as any);
                    }
                  }}
                  className="w-full bg-[#22c55e] py-4 rounded-2xl items-center justify-center shadow-md active:bg-[#16a34a]"
                >
                  <Text className="text-white text-base font-black">
                    Inizia Ora (Start)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Search Modal */}
      <Modal
        visible={searchVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSearchVisible(false)}
      >
        <SafeAreaView className="flex-1 bg-black/70 justify-start p-4">
          <View
            className="w-full rounded-3xl p-5 shadow-2xl"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-lg font-black"
                style={{ color: colors.textPrimary }}
              >
                Cerca Quiz / Argomento
              </Text>
              <TouchableOpacity onPress={() => setSearchVisible(false)}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <View
              className="flex-row items-center px-3.5 py-2.5 rounded-2xl border"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
              }}
            >
              <Ionicons name="search" size={20} color={colors.textMuted} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Cerca parole, segnali, quiz..."
                placeholderTextColor={colors.textMuted}
                className="flex-1 ml-2 text-sm"
                style={{ color: colors.textPrimary }}
                autoFocus
              />
            </View>

            {searchQuery.length > 0 && (
              <View className="mt-4">
                <Text
                  className="text-xs font-bold"
                  style={{ color: colors.textMuted }}
                >
                  Risultati per "{searchQuery}":
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSearchVisible(false);
                    router.push("/argomenti/domande" as any);
                  }}
                  className="mt-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800"
                >
                  <Text className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    🔍 Quiz correlati: "{searchQuery}"
                  </Text>
                  <Text className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Tocca per aprire le domande e traduzioni
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* "HOW TO?" Modal */}
      <Modal
        visible={howToVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHowToVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setHowToVisible(false)}
        >
          <Pressable
            className="w-full rounded-t-3xl p-6"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="w-12 h-1.5 rounded-full self-center mb-4"
              style={{ backgroundColor: colors.cardBorder }}
            />

            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text
                  className="text-xl font-black"
                  style={{ color: colors.textPrimary }}
                >
                  💡 কীভাবে ব্যবহার করবেন? (How To Use)
                </Text>
                <Text className="text-xs font-bold text-emerald-600 mt-0.5">
                  Tmm Patente Guide
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setHowToVisible(false)}
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.pillBg }}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View className="space-y-3 mb-6">
              <View className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mb-2">
                <Text className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  1. ARGOMENTI (বিষয়ভিত্তিক কুইজ):
                </Text>
                <Text className="text-xs text-emerald-950 dark:text-emerald-200 mt-0.5">
                  ক্যাটাগরি সিলেক্ট করে Italian প্রশ্ন ও বাংলা অর্থ সহ V/F কুইজ প্র্যাকটিস করুন।
                </Text>
              </View>

              <View className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 mb-2">
                <Text className="text-xs font-bold text-blue-800 dark:text-blue-300">
                  2. ভয়েস প্লেব্যাক (Voice Audio):
                </Text>
                <Text className="text-xs text-blue-950 dark:text-blue-200 mt-0.5">
                  🔊 বাটনে ট্যাপ করলে ইতালিয়ান এবং 🇧🇩 বাংলা অর্থ স্পষ্ট কণ্ঠে শুনতে পারবেন।
                </Text>
              </View>

              <View className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <Text className="text-xs font-bold text-purple-800 dark:text-purple-300">
                  3. Dizionario (ইতালিয়ান-বাংলা ডিকশনারি):
                </Text>
                <Text className="text-xs text-purple-950 dark:text-purple-200 mt-0.5">
                  লাইসেন্স সম্পর্কিত সকল শব্দের ইতালিয়ান ও বাংলা অর্থ সার্চ করে শুনুন।
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setHowToVisible(false)}
              className="w-full bg-[#22c55e] py-3.5 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white text-sm font-black">
                বুঝেছি (Got It)
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Stats Modal */}
      <Modal
        visible={statsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStatsVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setStatsVisible(false)}
        >
          <Pressable
            className="w-full rounded-t-3xl p-6"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="w-12 h-1.5 rounded-full self-center mb-4"
              style={{ backgroundColor: colors.cardBorder }}
            />

            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text
                  className="text-xl font-black"
                  style={{ color: colors.textPrimary }}
                >
                  📊 আপনার অগ্রগতি (Progress & Stats)
                </Text>
                <Text className="text-xs font-bold text-emerald-600 mt-0.5">
                  Patente B Preparazione
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setStatsVisible(false)}
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.pillBg }}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between mb-6">
              <View className="flex-1 mr-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 items-center">
                <Text className="text-2xl font-black text-emerald-600">85%</Text>
                <Text className="text-xs font-bold text-emerald-800 dark:text-emerald-300">সঠিক উত্তর</Text>
              </View>
              <View className="flex-1 ml-2 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 items-center">
                <Text className="text-2xl font-black text-blue-600">546</Text>
                <Text className="text-xs font-bold text-blue-800 dark:text-blue-300">মোট কুইজ</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setStatsVisible(false)}
              className="w-full bg-[#22c55e] py-3.5 rounded-2xl items-center justify-center shadow-md"
            >
              <Text className="text-white text-sm font-black">
                বন্ধ করুন (Close)
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}