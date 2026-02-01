"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Volume2, ArrowLeftRight, Loader2, Check, X, AlertCircle } from "lucide-react";
import { languages } from "@/lib/languages";
import { translateText, getGrammarSuggestions } from "@/lib/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface HistoryItem {
  id: number;
  input: string;
  output: string;
  from: string;
  to: string;
  timestamp: string;
}

export function Translator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [, setHistory] = useLocalStorage<HistoryItem[]>("translate-history", []);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setOutputText("");
      setSuggestions([]);
      return;
    }
    setIsLoading(true);

    // Grammar suggestions
    if (fromLang === "en" || fromLang === "auto") {
      setSuggestions(getGrammarSuggestions(inputText));
    } else {
      setSuggestions([]);
    }

    try {
      const result = await translateText(inputText, fromLang, toLang);
      setOutputText(result);

      if (result) {
        const newHistory: HistoryItem = {
          id: Date.now(),
          input: inputText,
          output: result,
          from: fromLang,
          to: toLang,
          timestamp: new Date().toISOString()
        };
        setHistory((prev) => [newHistory, ...prev.slice(0, 19)]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, fromLang, toLang, setHistory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText.trim()) {
        handleTranslate();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputText, fromLang, toLang, handleTranslate]);

  const swapLanguages = () => {
    if (fromLang === "auto") return;
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speak = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "auto" ? "en" : lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center gap-2 flex-1">
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer hover:text-brand-primary"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="dark:bg-zinc-900">{l.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={swapLanguages}
            disabled={fromLang === "auto"}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors disabled:opacity-30"
          >
            <ArrowLeftRight size={18} />
          </button>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer hover:text-brand-primary"
            >
              {languages.filter(l => l.code !== "auto").map((l) => (
                <option key={l.code} value={l.code} className="dark:bg-zinc-900">{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          <div className="relative p-4 md:p-6">
            <textarea
              placeholder="Enter text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 md:h-60 bg-transparent resize-none focus:outline-none text-lg"
            />

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm flex items-start gap-2 text-blue-700 dark:text-blue-300"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold">Suggestion:</span>
                    <ul className="list-disc list-inside">
                      {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => speak(inputText, fromLang)}
                disabled={!inputText}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-30"
              >
                <Volume2 size={20} />
              </button>
              <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
            </div>
            {inputText && (
              <button
                onClick={() => setInputText("")}
                className="absolute top-4 right-4 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative p-4 md:p-6 bg-zinc-50/50 dark:bg-zinc-800/20">
            {isLoading ? (
              <div className="flex items-center justify-center h-40 md:h-60">
                <Loader2 className="animate-spin text-brand-primary" size={32} />
              </div>
            ) : (
              <div className="w-full h-40 md:h-60 text-lg overflow-auto whitespace-pre-wrap">
                {outputText || <span className="text-muted-foreground italic">Translation will appear here...</span>}
              </div>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speak(outputText, toLang)}
                  disabled={!outputText}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-30"
                >
                  <Volume2 size={20} />
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-30 relative"
                >
                  {copied ? <Check size={20} className="text-brand-primary" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
