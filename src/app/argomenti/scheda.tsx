import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PATENTE_CATEGORIES, SchedaItem } from "@/data/patenteData";
import { useAppTheme } from "@/utils/themeContext";

export default function ScegliSchedaScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useAppTheme();
  const params = useLocalSearchParams();
  const categoryId = (params.categoryId as string) || "cat-1";

  const [currentCategory, setCurrentCategory] = useState(
    PATENTE_CATEGORIES.find((c) => c.id === categoryId) || PATENTE_CATEGORIES[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSchedaPress = (scheda: SchedaItem) => {
    router.push({
      pathname: "/argomenti/domande",
      params: {
        categoryId: currentCategory.id,
        schedaId: scheda.id,
      },
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      {/* Header matching Screenshot 2 */}
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
              router.replace("/argomenti" as any);
            }
          }}
          className="w-10 h-10 items-center justify-center rounded-full active:bg-white/20"
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-black ml-2 tracking-wide flex-1">
          Scegli Scheda
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
        {/* Category Dropdown Selector matching Screenshot 2 */}
        <TouchableOpacity
          onPress={() => setDropdownOpen(true)}
          className="mt-3 w-full rounded-2xl p-3.5 border flex-row items-center justify-between"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
            shadowColor: isDarkMode ? "#000" : "#64748b",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.3 : 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text
            className="text-sm font-black flex-1 mr-2"
            style={{ color: colors.textPrimary }}
            numberOfLines={1}
          >
            {currentCategory.number}) {currentCategory.title}
          </Text>
          <Ionicons
            name="chevron-down"
            size={18}
            color={colors.textMuted}
          />
        </TouchableOpacity>

        {/* Top Control Buttons: Unselect All | Select | Select All */}
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => alert("Unselect All")}
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
            onPress={() => alert("Select scheda")}
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
            onPress={() => alert("Select All")}
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

        {/* Sub-topics / Schede List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1"
        >
          {currentCategory.schede.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() => handleSchedaPress(item)}
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
              {/* Scheda Title and Book-Lens Icon */}
              <View className="flex-row items-start justify-between mb-3">
                <Text
                  className="text-sm font-black flex-1 mr-3"
                  style={{ color: colors.textPrimary }}
                  numberOfLines={2}
                >
                  {item.number}) {item.title}
                </Text>

                {/* Book & Magnifying Glass Graphic */}
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center border"
                  style={{
                    backgroundColor: isDarkMode ? "#1e1b4b" : "#eef2ff",
                    borderColor: isDarkMode ? "#3730a3" : "#c7d2fe",
                  }}
                >
                  <Ionicons name="book-outline" size={16} color="#6366f1" />
                </View>
              </View>

              {/* Progress Title & Stats */}
              <View className="mt-1">
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

      {/* Category Selection Dropdown Modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center p-4"
          onPress={() => setDropdownOpen(false)}
        >
          <View
            className="w-full max-w-lg mx-auto rounded-3xl p-5 shadow-2xl"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="flex-row items-center justify-between mb-4 pb-2 border-b"
              style={{ borderColor: colors.cardBorder }}
            >
              <Text
                className="text-lg font-black"
                style={{ color: colors.textPrimary }}
              >
                Seleziona Categoria
              </Text>
              <TouchableOpacity onPress={() => setDropdownOpen(false)}>
                <Ionicons
                  name="close"
                  size={22}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {PATENTE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  setCurrentCategory(cat);
                  setDropdownOpen(false);
                }}
                className="p-3.5 mb-2 rounded-2xl flex-row items-center justify-between border"
                style={{
                  backgroundColor:
                    currentCategory.id === cat.id
                      ? isDarkMode
                        ? "#064e3b"
                        : "#ecfdf5"
                      : colors.pillBg,
                  borderColor:
                    currentCategory.id === cat.id
                      ? "#10b981"
                      : colors.cardBorder,
                }}
              >
                <Text
                  className="text-sm font-bold flex-1 mr-2"
                  style={{
                    color:
                      currentCategory.id === cat.id
                        ? isDarkMode
                          ? "#34d399"
                          : "#047857"
                        : colors.textPrimary,
                  }}
                  numberOfLines={1}
                >
                  {cat.number}) {cat.title}
                </Text>
                {currentCategory.id === cat.id && (
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
