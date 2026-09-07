import React, { useState, useEffect } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  PATENTE_CATEGORIES,
  CategoryItem,
  SchedaItem,
  QuestionItem,
} from "@/data/patenteData";
import { speak, stop } from "@/utils/speechUtils";
import { useAppTheme } from "@/utils/themeContext";

export default function VereEFalseScreen() {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useAppTheme();
  const params = useLocalSearchParams();
  const categoryId = (params.categoryId as string) || "cat-1";
  const schedaId = (params.schedaId as string) || "scheda-1-1";

  const category =
    PATENTE_CATEGORIES.find((c) => c.id === categoryId) || PATENTE_CATEGORIES[0];
  const scheda =
    category.schede.find((s) => s.id === schedaId) || category.schede[0];

  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});
  const [showTranslations, setShowTranslations] = useState<{ [key: string]: boolean }>({});
  const [bookmarks, setBookmarks] = useState<{ [key: string]: boolean }>({});
  const [selectedInfoQuestion, setSelectedInfoQuestion] = useState<QuestionItem | null>(null);
  const [selectedNoteQuestion, setSelectedNoteQuestion] = useState<QuestionItem | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean | null }>({});

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  const toggleAudio = (q: QuestionItem, lang: string = "it-IT") => {
    const audioKey = `${q.id}-${lang}`;
    if (activeAudioId === audioKey) {
      stop();
      setActiveAudioId(null);
      setAudioProgress((prev) => ({ ...prev, [q.id]: 0 }));
    } else {
      stop();
      setActiveAudioId(audioKey);
      setAudioProgress((prev) => ({ ...prev, [q.id]: 0 }));

      const textToSpeak = lang === "bn-BD" ? q.bengaliTranslation : q.italianText;

      speak(textToSpeak, {
        language: lang,
        rate: lang === "bn-BD" ? 0.95 : 0.9,
        onProgress: (pct) => {
          setAudioProgress((prev) => ({ ...prev, [q.id]: pct }));
        },
        onDone: () => {
          setActiveAudioId(null);
          setAudioProgress((prev) => ({ ...prev, [q.id]: 0 }));
        },
        onError: () => {
          setActiveAudioId(null);
          setAudioProgress((prev) => ({ ...prev, [q.id]: 0 }));
        },
      });
    }
  };

  const toggleTranslation = (qId: string) => {
    setShowTranslations((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleBookmark = (qId: string) => {
    setBookmarks((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const playSequence = (index: number) => {
    if (index >= scheda.questions.length) {
      setActiveAudioId(null);
      return;
    }

    const currentQ = scheda.questions[index];
    setActiveAudioId(currentQ.id);
    setAudioProgress({ [currentQ.id]: 0 });

    speak(currentQ.italianText, {
      language: "it-IT",
      rate: 0.9,
      onProgress: (pct) => {
        setAudioProgress((prev) => ({ ...prev, [currentQ.id]: pct }));
      },
      onDone: () => {
        setAudioProgress((prev) => ({ ...prev, [currentQ.id]: 0 }));
        setTimeout(() => {
          playSequence(index + 1);
        }, 500);
      },
      onError: () => {
        setActiveAudioId(null);
      },
    });
  };

  const playAll = () => {
    if (activeAudioId) {
      stop();
      setActiveAudioId(null);
      setAudioProgress({});
    } else if (scheda.questions.length > 0) {
      playSequence(0);
    }
  };

  const handleAnswer = (qId: string, answer: boolean) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const saveNote = () => {
    if (selectedNoteQuestion) {
      setNotes((prev) => ({
        ...prev,
        [selectedNoteQuestion.id]: currentNoteText,
      }));
      setSelectedNoteQuestion(null);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      {/* Header matching Screenshot 3 */}
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
                router.replace({
                  pathname: "/argomenti/scheda",
                  params: { categoryId },
                } as any);
              }
            }}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-white/20"
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-black ml-2 tracking-wide">
            Vere e False
          </Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={toggleTheme}
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center mr-2 border border-white/30"
          >
            <Ionicons
              name={isDarkMode ? "sunny" : "moon"}
              size={18}
              color="#ffffff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/dizionario" as any)}
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center border border-white/30"
          >
            <Ionicons name="book-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 w-full max-w-xl mx-auto px-4">
        {/* Top Dropdowns & Filter Selectors */}
        <View className="mt-3 mb-2">
          {/* Chapter Selector */}
          <View
            className="w-full rounded-2xl p-2.5 mb-2 border flex-row items-center justify-between"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            }}
          >
            <Text
              className="text-xs font-bold flex-1 mr-2"
              style={{ color: colors.textPrimary }}
              numberOfLines={1}
            >
              Capitolo {category.number}) {category.title}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={colors.textMuted}
            />
          </View>

          {/* Subtopic / Page Selector & Close */}
          <View className="flex-row items-center justify-between">
            <View
              className="flex-1 rounded-2xl p-2.5 mr-2 border flex-row items-center justify-between"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.cardBorder,
              }}
            >
              <Text
                className="text-xs font-bold flex-1 mr-2"
                style={{ color: colors.textPrimary }}
                numberOfLines={1}
              >
                Pagina {scheda.number}) {scheda.title}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.textMuted}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace({
                    pathname: "/argomenti/scheda",
                    params: { categoryId },
                  } as any);
                }
              }}
              className="w-9 h-9 rounded-full items-center justify-center shadow-xs active:scale-95 border"
              style={{
                backgroundColor: colors.pillBg,
                borderColor: colors.cardBorder,
              }}
            >
              <Ionicons
                name="close"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Questions Cards List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          className="flex-1"
        >
          {scheda.questions.map((q) => {
            const isPlayingItalian =
              activeAudioId === `${q.id}-it-IT` || activeAudioId === q.id;
            const isPlayingBengali = activeAudioId === `${q.id}-bn-BD`;
            const isPlaying = isPlayingItalian;
            const progress = audioProgress[q.id] || 0;
            const showTranslation = showTranslations[q.id];
            const isBookmarked = bookmarks[q.id];
            const userAnswer = userAnswers[q.id];
            const hasNote = !!notes[q.id];

            return (
              <View
                key={q.id}
                className="w-full rounded-3xl p-4 mb-4 border"
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
                {/* Question Row: Index + Italian Text + V/F status */}
                <View className="flex-row items-start justify-between">
                  <Text
                    className="text-sm font-black mr-2"
                    style={{ color: colors.textMuted }}
                  >
                    {q.number}
                  </Text>

                  {/* Italian Statement with Underline styling */}
                  <View className="flex-1 mr-3">
                    <Text
                      className="text-[15px] font-semibold leading-6"
                      style={{
                        color: colors.textPrimary,
                        textDecorationLine: "underline",
                      }}
                    >
                      {q.italianText}
                    </Text>

                    {/* Bengali Translation Badge / Box */}
                    {showTranslation && (
                      <View
                        className="mt-3 p-3.5 rounded-2xl border-2 shadow-sm"
                        style={{
                          backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
                          borderColor: isDarkMode ? "#059669" : "#6ee7b7",
                        }}
                      >
                        <View
                          className="flex-row items-center justify-between mb-2 pb-1.5 border-b"
                          style={{
                            borderColor: isDarkMode ? "#047857" : "#a7f3d0",
                          }}
                        >
                          <Text
                            className="text-[11px] font-black"
                            style={{
                              color: isDarkMode ? "#6ee7b7" : "#065f46",
                            }}
                          >
                            🇧🇩 বাংলা অনুবাদ (Bengali):
                          </Text>
                          <TouchableOpacity
                            onPress={() => toggleAudio(q, "bn-BD")}
                            className="flex-row items-center px-3 py-1 rounded-full shadow-xs active:scale-95"
                            style={{
                              backgroundColor:
                                activeAudioId === `${q.id}-bn-BD`
                                  ? "#f59e0b"
                                  : "#16a34a",
                            }}
                          >
                            <Ionicons
                              name={
                                activeAudioId === `${q.id}-bn-BD`
                                  ? "volume-high"
                                  : "volume-medium"
                              }
                              size={14}
                              color="#ffffff"
                            />
                            <Text className="text-[10px] font-black text-white ml-1">
                              {activeAudioId === `${q.id}-bn-BD`
                                ? "বাংলা বলছে..."
                                : "🔊 বাংলা শুনুন"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          className="text-sm font-bold leading-6"
                          style={{
                            color: isDarkMode ? "#ecfdf5" : "#064e3b",
                          }}
                        >
                          {q.bengaliTranslation}
                        </Text>
                      </View>
                    )}

                    {/* User Note Badge if present */}
                    {hasNote && (
                      <View
                        className="mt-2 p-2 rounded-xl border"
                        style={{
                          backgroundColor: isDarkMode ? "#451a03" : "#fffbeb",
                          borderColor: isDarkMode ? "#92400e" : "#fde68a",
                        }}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{
                            color: isDarkMode ? "#fcd34d" : "#92400e",
                          }}
                        >
                          📝 আপনার নোট: {notes[q.id]}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Big V (Green) or F (Red) Status */}
                  {!quizMode ? (
                    <View className="items-center justify-center pl-1">
                      <Text
                        className="text-3xl font-black"
                        style={{
                          color: q.isTrue ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {q.isTrue ? "V" : "F"}
                      </Text>
                    </View>
                  ) : (
                    /* Interactive Quiz Buttons */
                    <View className="flex-col gap-1.5 pl-1">
                      <TouchableOpacity
                        onPress={() => handleAnswer(q.id, true)}
                        className="w-9 h-8 rounded-xl items-center justify-center border shadow-xs active:scale-95"
                        style={{
                          backgroundColor:
                            userAnswer === true
                              ? q.isTrue
                                ? "#22c55e"
                                : "#ef4444"
                              : colors.pillBg,
                          borderColor:
                            userAnswer === true
                              ? q.isTrue
                                ? "#16a34a"
                                : "#dc2626"
                              : colors.cardBorder,
                        }}
                      >
                        <Text
                          className="text-sm font-black"
                          style={{
                            color:
                              userAnswer === true ? "#ffffff" : "#16a34a",
                          }}
                        >
                          V
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleAnswer(q.id, false)}
                        className="w-9 h-8 rounded-xl items-center justify-center border shadow-xs active:scale-95"
                        style={{
                          backgroundColor:
                            userAnswer === false
                              ? !q.isTrue
                                ? "#22c55e"
                                : "#ef4444"
                              : colors.pillBg,
                          borderColor:
                            userAnswer === false
                              ? !q.isTrue
                                ? "#16a34a"
                                : "#dc2626"
                              : colors.cardBorder,
                        }}
                      >
                        <Text
                          className="text-sm font-black"
                          style={{
                            color:
                              userAnswer === false ? "#ffffff" : "#dc2626",
                          }}
                        >
                          F
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Interactive Action Icons Row with High-Contrast Light & Dark Colors */}
                <View
                  className="flex-row items-center justify-end gap-3 mt-3.5 pt-2.5 border-t"
                  style={{ borderColor: colors.cardBorder }}
                >
                  {/* 1. Italian Voice Audio */}
                  <TouchableOpacity
                    onPress={() => toggleAudio(q, "it-IT")}
                    className="w-8 h-8 rounded-full items-center justify-center shadow-xs active:scale-95"
                    style={{
                      backgroundColor: isPlaying ? "#16a34a" : "#2563eb",
                    }}
                  >
                    <Ionicons
                      name={isPlaying ? "volume-high" : "volume-medium"}
                      size={18}
                      color="#ffffff"
                    />
                  </TouchableOpacity>

                  {/* 2. Bookmark */}
                  <TouchableOpacity
                    onPress={() => toggleBookmark(q.id)}
                    className="p-1 active:scale-95"
                  >
                    <Ionicons
                      name={isBookmarked ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={isBookmarked ? "#16a34a" : colors.textMuted}
                    />
                  </TouchableOpacity>

                  {/* 3. Sticky Note */}
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedNoteQuestion(q);
                      setCurrentNoteText(notes[q.id] || "");
                    }}
                    className="p-1 active:scale-95"
                  >
                    <Ionicons
                      name="document-text"
                      size={20}
                      color={hasNote ? "#0284c7" : colors.textMuted}
                    />
                  </TouchableOpacity>

                  {/* 4. Teacher Explanation */}
                  <TouchableOpacity
                    onPress={() => setSelectedInfoQuestion(q)}
                    className="w-7 h-7 rounded-full items-center justify-center overflow-hidden border active:scale-95"
                    style={{
                      backgroundColor: "#1e293b",
                      borderColor: "#10b981",
                    }}
                  >
                    <Ionicons name="person" size={15} color="#ffffff" />
                  </TouchableOpacity>

                  {/* 5. Bengali / Language Translation Button */}
                  <TouchableOpacity
                    onPress={() => toggleTranslation(q.id)}
                    className="p-1 rounded-lg active:scale-95 border"
                    style={{
                      backgroundColor: showTranslation
                        ? isDarkMode
                          ? "#3b0764"
                          : "#f3e8ff"
                        : "transparent",
                      borderColor: showTranslation
                        ? "#a855f7"
                        : "transparent",
                    }}
                  >
                    <MaterialIcons
                      name="translate"
                      size={20}
                      color={showTranslation ? "#a855f7" : colors.textMuted}
                    />
                  </TouchableOpacity>

                  {/* 6. Info / Details Icon */}
                  <TouchableOpacity
                    onPress={() => setSelectedInfoQuestion(q)}
                    className="p-1 active:scale-95"
                  >
                    <Ionicons
                      name="information-circle"
                      size={22}
                      color="#0284c7"
                    />
                  </TouchableOpacity>
                </View>

                {/* Audio Player Bar matching Screenshot 3 */}
                <View
                  className="flex-row items-center mt-3 rounded-full py-1.5 px-3 border"
                  style={{
                    backgroundColor: colors.pillBg,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleAudio(q, "it-IT")}
                    className="w-8 h-8 rounded-full items-center justify-center mr-3 shadow-xs active:scale-95"
                    style={{
                      backgroundColor: isPlaying ? "#16a34a" : "#334155",
                    }}
                  >
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={15}
                      color="#ffffff"
                    />
                  </TouchableOpacity>

                  {/* Track line with green dot scrubber */}
                  <View
                    className="flex-1 h-2 rounded-full justify-center relative"
                    style={{
                      backgroundColor: isDarkMode ? "#3f3f46" : "#cbd5e1",
                    }}
                  >
                    <View
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                    <View
                      className="w-4 h-4 bg-emerald-500 rounded-full absolute -top-1 border-2 border-white shadow-sm"
                      style={{
                        left: `${Math.max(0, Math.min(94, progress))}%`,
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Floating Bottom Bar matching Screenshot 3 */}
      <View
        className="absolute bottom-4 left-4 right-4 items-center"
        pointerEvents="box-none"
      >
        <View
          className="w-full max-w-xl flex-row items-center justify-between py-2 px-3 rounded-full border"
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
          {/* 1. Play All Button */}
          <TouchableOpacity
            onPress={playAll}
            className="flex-row items-center px-3.5 py-2 rounded-full bg-[#16a34a] shadow-xs active:scale-95"
          >
            <Ionicons name="play-circle" size={18} color="#ffffff" />
            <Text className="text-xs font-black text-white ml-1.5">
              Play All
            </Text>
          </TouchableOpacity>

          {/* 2. Global Translation Toggle for all questions */}
          <TouchableOpacity
            onPress={() => {
              const allShown = Object.values(showTranslations).some(Boolean);
              const newState: { [key: string]: boolean } = {};
              scheda.questions.forEach((q) => {
                newState[q.id] = !allShown;
              });
              setShowTranslations(newState);
            }}
            className="p-2 rounded-full active:scale-95 border"
            style={{
              backgroundColor: isDarkMode ? "#3b0764" : "#f3e8ff",
              borderColor: isDarkMode ? "#6b21a8" : "#d8b4fe",
            }}
          >
            <MaterialIcons
              name="g-translate"
              size={20}
              color={isDarkMode ? "#c084fc" : "#9333ea"}
            />
          </TouchableOpacity>

          {/* 3. Interactive Quiz Mode Toggle Button */}
          <TouchableOpacity
            onPress={() => setQuizMode(!quizMode)}
            className="flex-row items-center px-4 py-2 rounded-full shadow-sm active:scale-95"
            style={{
              backgroundColor: quizMode ? "#f59e0b" : "#22c55e",
            }}
          >
            <Text className="text-xs font-black text-white mr-1">
              {quizMode ? "STUDY" : "QUIZ"}
            </Text>
            <Ionicons
              name={quizMode ? "book" : "chevron-forward"}
              size={14}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Info / Teacher Explanation Modal */}
      <Modal
        visible={!!selectedInfoQuestion}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedInfoQuestion(null)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center p-4"
          onPress={() => setSelectedInfoQuestion(null)}
        >
          <View
            className="w-full max-w-lg mx-auto rounded-3xl p-5 shadow-2xl"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="flex-row items-center justify-between mb-3 pb-2 border-b"
              style={{ borderColor: colors.cardBorder }}
            >
              <Text
                className="text-base font-black"
                style={{ color: colors.textPrimary }}
              >
                Dettagli Quiz ({selectedInfoQuestion?.isTrue ? "VERO" : "FALSO"})
              </Text>
              <TouchableOpacity onPress={() => setSelectedInfoQuestion(null)}>
                <Ionicons
                  name="close"
                  size={22}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <Text
              className="text-sm mb-3 leading-6 font-semibold"
              style={{ color: colors.textPrimary }}
            >
              {selectedInfoQuestion?.italianText}
            </Text>

            <View
              className="p-3 rounded-2xl border mb-3"
              style={{
                backgroundColor: isDarkMode ? "#064e3b" : "#ecfdf5",
                borderColor: isDarkMode ? "#059669" : "#6ee7b7",
              }}
            >
              <Text
                className="text-xs font-black mb-1"
                style={{ color: isDarkMode ? "#6ee7b7" : "#065f46" }}
              >
                🇧🇩 বাংলা অর্থ:
              </Text>
              <Text
                className="text-xs font-medium leading-5"
                style={{ color: isDarkMode ? "#ecfdf5" : "#064e3b" }}
              >
                {selectedInfoQuestion?.bengaliTranslation}
              </Text>
            </View>

            <View
              className="p-3 rounded-2xl border"
              style={{
                backgroundColor: isDarkMode ? "#1e1b4b" : "#eef2ff",
                borderColor: isDarkMode ? "#3730a3" : "#c7d2fe",
              }}
            >
              <Text
                className="text-xs font-black mb-1"
                style={{ color: isDarkMode ? "#a5b4fc" : "#3730a3" }}
              >
                👨‍🏫 Spiegazione / শিক্ষক ব্যাখ্যা ও ট্রিক:
              </Text>
              <Text
                className="text-xs font-medium leading-5"
                style={{ color: isDarkMode ? "#e0e7ff" : "#1e1b4b" }}
              >
                {selectedInfoQuestion?.explanation}
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Notes Modal */}
      <Modal
        visible={!!selectedNoteQuestion}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedNoteQuestion(null)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center p-4"
          onPress={() => setSelectedNoteQuestion(null)}
        >
          <View
            className="w-full max-w-lg mx-auto rounded-3xl p-5 shadow-2xl"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <View
              className="flex-row items-center justify-between mb-3 pb-2 border-b"
              style={{ borderColor: colors.cardBorder }}
            >
              <Text
                className="text-base font-black"
                style={{ color: colors.textPrimary }}
              >
                📝 নোট যোগ করুন (Add Personal Note)
              </Text>
              <TouchableOpacity onPress={() => setSelectedNoteQuestion(null)}>
                <Ionicons
                  name="close"
                  size={22}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              value={currentNoteText}
              onChangeText={setCurrentNoteText}
              placeholder="আপনার প্রয়োজনীয় নোট বা মনে রাখার ট্রিক লিখুন..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={4}
              className="p-3 rounded-2xl border mb-4 text-sm"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBorder,
                color: colors.textPrimary,
              }}
            />

            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                onPress={() => setSelectedNoteQuestion(null)}
                className="px-4 py-2 rounded-xl"
                style={{ backgroundColor: colors.pillBg }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: colors.pillText }}
                >
                  বাতিল
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveNote}
                className="px-5 py-2 rounded-xl bg-[#22c55e]"
              >
                <Text className="text-xs font-black text-white">
                  সংরক্ষণ করুন (Save)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
