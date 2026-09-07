import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PATENTE_CATEGORIES, CategoryItem } from "@/data/patenteData";
import { useAppTheme } from "@/utils/themeContext";

export default function ScegliCategoriaScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useAppTheme();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === PATENTE_CATEGORIES.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(PATENTE_CATEGORIES.map((c) => c.id));
    }
  };

  const handleCardPress = (category: CategoryItem) => {
    router.push({
      pathname: "/argomenti/scheda",
      params: { categoryId: category.id },
    });
  };

  const renderIllustration = (type: CategoryItem["illustrationType"], tag: string) => {
    switch (type) {
      case "road":
        return (
          <View className="w-full h-40 bg-slate-900 rounded-2xl overflow-hidden p-2.5 items-center justify-between relative shadow-inner border border-slate-700">
            {/* Title Tag */}
            <View className="items-center z-10 bg-slate-950/70 px-4 py-0.5 rounded-full border border-slate-700/80">
              <Text className="text-base font-black text-amber-400 tracking-wider">
                LA <Text className="text-amber-400">STRADA</Text>
              </Text>
            </View>

            {/* Road Cross Section Graphical Simulation */}
            <View className="w-full flex-row items-end justify-between px-2 mb-1">
              {/* Sidewalk */}
              <View className="items-center">
                <Text className="text-[7px] text-slate-300 font-bold mb-1">MARCIAPIEDE</Text>
                <View className="w-6 h-12 bg-slate-600 rounded-t items-center justify-center border-t border-slate-400">
                  <Ionicons name="walk" size={12} color="#f8fafc" />
                </View>
              </View>

              {/* Lane 1 with Red Bus */}
              <View className="items-center">
                <View className="w-9 h-14 bg-red-600 rounded-lg items-center justify-center shadow-md border border-red-400">
                  <Ionicons name="bus" size={16} color="#ffffff" />
                </View>
                <Text className="text-[7px] text-slate-400 font-bold mt-1">CORSIA</Text>
              </View>

              {/* Median / Spartitraffico */}
              <View className="items-center">
                <Text className="text-[7px] text-emerald-400 font-bold mb-1">SPARTITRAFFICO</Text>
                <View className="w-3 h-16 bg-emerald-600 rounded-full border border-emerald-400 shadow-sm" />
              </View>

              {/* Lane 2 with Yellow Car */}
              <View className="items-center">
                <View className="w-9 h-14 bg-amber-400 rounded-lg items-center justify-center shadow-md border border-amber-300">
                  <Ionicons name="car" size={18} color="#1e293b" />
                </View>
                <Text className="text-[7px] text-slate-400 font-bold mt-1">CARREGGIATA</Text>
              </View>

              {/* Shoulder / Banchina */}
              <View className="items-center">
                <Text className="text-[7px] text-slate-300 font-bold mb-1">BANCHINA</Text>
                <View className="w-6 h-12 bg-slate-700 rounded-t border-t border-slate-500" />
              </View>
            </View>

            {/* Bottom indicator line */}
            <View className="w-full h-2 bg-white/20 rounded-full flex-row justify-between items-center px-1">
              <View className="h-3 w-1 bg-white rounded-full" />
              <Text className="text-[8px] text-slate-200 font-black tracking-widest">STRADA</Text>
              <View className="h-3 w-1 bg-white rounded-full" />
            </View>
          </View>
        );

      case "danger":
        return (
          <View className="w-full h-40 bg-slate-900 rounded-2xl overflow-hidden p-2.5 items-center justify-center relative border border-slate-700 shadow-inner">
            <View className="absolute top-2.5 z-10 bg-slate-950/80 px-4 py-0.5 rounded-full border border-slate-700">
              <Text className="text-xs font-black text-amber-400 tracking-wider">
                SEGNALI DI PERICOLO
              </Text>
            </View>

            {/* Danger Warning Signs Montage */}
            <View className="flex-row items-center justify-center flex-wrap gap-2.5 mt-5">
              <View className="w-11 h-11 border-2 border-red-600 bg-white items-center justify-center shadow rounded-sm">
                <Ionicons name="warning" size={18} color="#dc2626" />
              </View>
              <View className="w-11 h-11 border-2 border-red-600 bg-white items-center justify-center shadow rounded-sm">
                <Ionicons name="train" size={18} color="#dc2626" />
              </View>
              <View className="w-11 h-11 border-2 border-red-600 bg-white items-center justify-center shadow rounded-sm">
                <Ionicons name="people" size={18} color="#dc2626" />
              </View>
              <View className="w-11 h-11 border-2 border-red-600 bg-white items-center justify-center shadow rounded-sm">
                <Ionicons name="car" size={18} color="#dc2626" />
              </View>
            </View>
          </View>
        );

      case "prohibition":
        return (
          <View className="w-full h-40 bg-slate-900 rounded-2xl overflow-hidden p-2.5 items-center justify-center relative border border-slate-700 shadow-inner">
            <View className="absolute top-2.5 z-10 bg-slate-950/80 px-4 py-0.5 rounded-full border border-slate-700">
              <Text className="text-xs font-black text-amber-400 tracking-wider">
                SEGNALI DI DIVIETO
              </Text>
            </View>

            {/* Prohibition Signs Montage */}
            <View className="flex-row items-center justify-center flex-wrap gap-3 mt-5">
              <View className="w-12 h-12 rounded-full border-4 border-red-600 bg-white items-center justify-center shadow">
                <View className="w-7 h-2 bg-red-600 rounded-full" />
              </View>
              <View className="w-12 h-12 rounded-full border-4 border-red-600 bg-white items-center justify-center shadow">
                <Ionicons name="bicycle" size={18} color="#dc2626" />
              </View>
              <View className="w-12 h-12 rounded-full border-4 border-red-600 bg-white items-center justify-center shadow">
                <Ionicons name="close" size={24} color="#dc2626" />
              </View>
            </View>
          </View>
        );

      default:
        return (
          <View className="w-full h-40 bg-slate-800 rounded-2xl items-center justify-center">
            <Text className="text-white font-bold">{tag}</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      {/* Header matching Screenshot 1 */}
      <View
        className="px-4 pt-2 pb-3.5 flex-row items-center shadow-md"
        style={{
          backgroundColor: "#22c55e",
          elevation: 4,
        }}
      >
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
        <Text className="text-white text-xl font-black ml-2 tracking-wide flex-1">
          Scegli Categoria
        </Text>
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

      <View className="flex-1 w-full max-w-xl mx-auto px-4">
        {/* Top Control Buttons: Unselect All | Select | Select All */}
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => setSelectedIds([])}
            className="flex-1 mx-1 py-2.5 rounded-full items-center justify-center active:scale-95 border"
            style={{
              backgroundColor: colors.pillBg,
              borderColor: colors.cardBorder,
            }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: colors.pillText }}
            >
              Unselect All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => alert("Seleziona categoria per studiare")}
            className="flex-1 mx-1 py-2.5 rounded-full items-center justify-center active:scale-95 border"
            style={{
              backgroundColor: colors.pillBg,
              borderColor: colors.cardBorder,
            }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: colors.pillText }}
            >
              Select
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleSelectAll}
            className="flex-1 mx-1 py-2.5 rounded-full items-center justify-center active:scale-95 border"
            style={{
              backgroundColor: colors.pillBg,
              borderColor: colors.cardBorder,
            }}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: colors.pillText }}
            >
              Select All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1"
        >
          {PATENTE_CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() => handleCardPress(item)}
              className="w-full rounded-3xl p-4 mb-4 border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.cardBorder,
                shadowColor: isDarkMode ? "#000" : "#64748b",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isDarkMode ? 0.4 : 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* Category Title */}
              <Text
                className="text-base font-black mb-3"
                style={{ color: colors.textPrimary }}
                numberOfLines={1}
              >
                {item.number}) {item.title}
              </Text>

              {/* Illustration Image / Road Graphics */}
              {renderIllustration(item.illustrationType, item.tag)}

              {/* Progress Title & Stats */}
              <View className="mt-3.5">
                <Text
                  className="text-center text-xs font-bold mb-1.5"
                  style={{ color: colors.textMuted }}
                >
                  Progresso
                </Text>

                {/* Metrics: Corrette | Errori | Non risposte | Totale */}
                <View className="flex-row items-center justify-between px-2 mb-2">
                  <View className="items-center">
                    <Text className="text-[11px] text-slate-400 font-semibold">
                      Corrette
                    </Text>
                    <Text className="text-xs font-black text-emerald-600">
                      {item.corrette}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-[11px] text-slate-400 font-semibold">
                      Errori
                    </Text>
                    <Text className="text-xs font-black text-red-500">
                      {item.errori}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-[11px] text-slate-400 font-semibold">
                      Non risposte
                    </Text>
                    <Text
                      className="text-xs font-black"
                      style={{ color: colors.textSecondary }}
                    >
                      {item.nonRisposte}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-[11px] text-slate-400 font-semibold">
                      Totale
                    </Text>
                    <Text
                      className="text-xs font-black"
                      style={{ color: colors.textSecondary }}
                    >
                      {item.totale}
                    </Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View
                  className="w-full h-3 rounded-full overflow-hidden border"
                  style={{
                    backgroundColor: isDarkMode ? "#27272a" : "#e2e8f0",
                    borderColor: isDarkMode ? "#3f3f46" : "#cbd5e1",
                  }}
                >
                  <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${
                        item.totale > 0
                          ? ((item.corrette + item.errori) / item.totale) * 100
                          : 0
                      }%`,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
