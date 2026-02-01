export async function translateText(text: string, from: string, to: string) {
  if (!text.trim()) return "";

  try {
    // Primary: Google Translate (gtx)
    const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(googleUrl);
    if (response.ok) {
      const data = await response.json();
      return data[0].map((item: [string, string, string, string]) => item[0]).join("");
    }
    throw new Error("Google Translate failed");
  } catch (error) {
    console.warn("Primary API failed, trying fallback...", error);
    try {
      // Fallback: MyMemory API
      const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from === "auto" ? "en" : from}|${to}`;
      const response = await fetch(fallbackUrl);
      if (response.ok) {
        const data = await response.json();
        return data.responseData.translatedText;
      }
    } catch (fallbackError) {
      console.error("Fallback API also failed:", fallbackError);
    }
    throw error;
  }
}

export async function getDefinition(word: string) {
  if (!word.trim()) return null;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Dictionary lookup failed");
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Dictionary API Error:", error);
    throw error;
  }
}

// Basic grammar suggestions (Rule-based for common mistakes)
export function getGrammarSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  if (!text) return suggestions;

  // This is a very basic placeholder for grammar suggestions
  if (text.toLowerCase().includes(" i ")) {
    suggestions.push("Remember to capitalize 'I'");
  }

  return suggestions;
}
