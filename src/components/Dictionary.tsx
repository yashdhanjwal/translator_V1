"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, Bookmark, History, Loader2 } from "lucide-react";
import { getDefinition } from "@/lib/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface DictionaryResult {
  word: string;
  phonetic?: string;
  phonetics: Array<{ text?: string; audio?: string }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
    synonyms: string[];
    antonyms: string[];
  }>;
}

export function Dictionary() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useLocalStorage<string[]>("dict-history", []);
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("dict-bookmarks", []);

  const handleSearch = async (e?: React.FormEvent, searchWord?: string) => {
    if (e) e.preventDefault();
    const query = searchWord || word;
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    try {
      const data = await getDefinition(query);
      if (data) {
        setResult(data);
        if (!history.includes(query)) {
          setHistory([query, ...history.slice(0, 19)]);
        }
      } else {
        setError("No definitions found for this word.");
        setResult(null);
      }
    } catch {
      setError("An error occurred. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (w: string) => {
    if (bookmarks.includes(w)) {
      setBookmarks(bookmarks.filter((b) => b !== w));
    } else {
      setBookmarks([w, ...bookmarks]);
    }
  };

  const playAudio = () => {
    if (!result) return;
    const audioUrl = result.phonetics?.find((p) => p.audio)?.audio;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(result.word);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6"
    >
      <div className="bg-card text-card-foreground rounded-2xl shadow-xl border p-6 md:p-8">
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            placeholder="Search for a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-primary text-lg text-foreground"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <button
            type="submit"
            disabled={isLoading || !word.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-red-500"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              key={result.word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-4xl font-bold capitalize mb-2">{result.word}</h2>
                  <div className="flex items-center gap-4 text-brand-primary font-medium">
                    {result.phonetic && <span>{result.phonetic}</span>}
                    <button
                      onClick={playAudio}
                      className="p-2 hover:bg-brand-primary/10 rounded-full transition-colors"
                    >
                      <Volume2 size={24} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(result.word)}
                  className={`p-3 rounded-xl border transition-colors ${bookmarks.includes(result.word) ? 'bg-brand-primary text-white border-brand-primary' : 'hover:bg-muted'}`}
                >
                  <Bookmark size={24} fill={bookmarks.includes(result.word) ? "currentColor" : "none"} />
                </button>
              </div>

              {result.meanings.map((meaning, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="italic font-bold text-lg text-muted-foreground">{meaning.partOfSpeech}</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  <ul className="space-y-4">
                    {meaning.definitions.map((def, i) => (
                      <li key={i} className="space-y-2">
                        <p className="text-lg leading-relaxed">{def.definition}</p>
                        {def.example && (
                          <p className="text-muted-foreground border-l-4 pl-4 italic">&quot;{def.example}&quot;</p>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-6 mt-4">
                    {meaning.synonyms?.length > 0 && (
                      <div className="space-x-2">
                        <span className="font-semibold">Synonyms:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {meaning.synonyms.slice(0, 5).map((s) => (
                            <button key={s} onClick={() => { setWord(s); handleSearch(undefined, s); }} className="text-brand-primary hover:underline text-sm">{s}</button>
                          ))}
                        </div>
                      </div>
                    )}
                    {meaning.antonyms?.length > 0 && (
                      <div className="space-x-2">
                        <span className="font-semibold text-red-500">Antonyms:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {meaning.antonyms.slice(0, 5).map((s) => (
                            <button key={s} onClick={() => { setWord(s); handleSearch(undefined, s); }} className="text-red-500 hover:underline text-sm">{s}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {!result && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
              <div>
                <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-muted-foreground">
                  <History size={20} /> Recent Searches
                </h3>
                {history.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {history.map(h => (
                      <button key={h} onClick={() => { setWord(h); handleSearch(undefined, h); }} className="px-3 py-1 bg-muted rounded-full hover:bg-brand-primary/10 transition-colors capitalize">
                        {h}
                      </button>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground italic">No search history yet.</p>}
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-muted-foreground">
                  <Bookmark size={20} /> Bookmarks
                </h3>
                {bookmarks.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {bookmarks.map(b => (
                      <button key={b} onClick={() => { setWord(b); handleSearch(undefined, b); }} className="px-3 py-1 bg-muted rounded-full hover:bg-brand-primary/10 transition-colors capitalize">
                        {b}
                      </button>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground italic">No bookmarked words.</p>}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
