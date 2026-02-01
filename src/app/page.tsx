"use client";

import { useState } from "react";
import { Translator } from "@/components/Translator";
import { Dictionary } from "@/components/Dictionary";
import { Languages, Book } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"translator" | "dictionary">("translator");

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-300px)]">
      <section className="py-12 md:py-20 px-4 text-center bg-gradient-to-b from-brand-primary/10 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Free Online Tools <br className="hidden md:block" />
            <span className="text-brand-primary">by Yash Dhanjwal</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Professional-grade translation and dictionary tools for global communication. Fast, secure, and always free.
          </p>
          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl w-fit mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab("translator")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === "translator"
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-brand-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Languages size={20} />
              <span className="font-semibold">Translator</span>
            </button>
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === "dictionary"
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-brand-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Book size={20} />
              <span className="font-semibold">Dictionary</span>
            </button>
          </div>
        </motion.div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto">
          {activeTab === "translator" ? <Translator /> : <Dictionary />}
        </div>
      </section>
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <Languages size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">100+ Languages</h3>
              <p className="text-muted-foreground">Translate between more than 100 languages with high accuracy and speed.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <Book size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Dictionary</h3>
              <p className="text-muted-foreground">Get detailed definitions, examples, and synonyms for any English word.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  ✨
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">Always Free</h3>
              <p className="text-muted-foreground">Our tools are 100% free for everyone, from students to professionals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
