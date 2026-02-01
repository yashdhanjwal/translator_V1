import { languages } from "@/lib/languages";
export default function LanguagesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Languages Supported</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {languages.filter(l => l.code !== "auto").map((l) => (
          <div key={l.code} className="p-4 rounded-xl border bg-white dark:bg-zinc-900 flex items-center justify-center text-center hover:border-brand-primary transition-colors">
            <span className="font-medium">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
