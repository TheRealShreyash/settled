import { Heart, User } from "lucide-react";

interface HeaderProps {
  shortlistCount: number;
  onShortlistClick: () => void;
}

export default function Header({
  shortlistCount,
  onShortlistClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-white">Settle</h1>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#explore"
              className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              Explore
            </a>
            <button
              onClick={onShortlistClick}
              className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Heart size={18} />
              Shortlist
              {shortlistCount > 0 && (
                <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {shortlistCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <User className="text-gray-300" size={20} />
        </button>
      </nav>
    </header>
  );
}
