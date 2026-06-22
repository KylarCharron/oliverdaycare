// app/game/page.tsx
"use client";

import Image from "next/image";

export default function GamePage() {
  const catStats = [
    { name: "Hunger", value: 74 },
    { name: "Fatigue", value: 45 },
    { name: "Boredom", value: 32 },
    { name: "Intelligence", value: 68 },
    { name: "Happiness", value: 80 },
    { name: "Bond", value: 65 },
  ];

  const menuItems = [
    {
      title: "Activities",
      subtitle: "Play, train & explore",
      icon: "🐾",
    },
    {
      title: "Social",
      subtitle: "Meet & chat",
      icon: "💬",
    },
    {
      title: "Customize",
      subtitle: "Style your cat",
      icon: "🐱",
    },
    {
      title: "Store",
      subtitle: "Shop & upgrades",
      icon: "🛍️",
    },
    {
      title: "Leaderboard",
      subtitle: "See where you rank!",
      icon: "📈",
    }
  ];

  return (
    <div className="min-h-screen bg-[#16181d] text-white">
      {/* HEADER */}
      <header className="h-24 bg-[#efeee9] text-black flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl">
            🪙
          </div>

          <div>
            <div className="font-bold text-2xl">0</div>
            <div className="text-gray-600">COINS</div>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-widest">
          OLIVER DAYCARE
        </h1>

        <div className="flex items-center gap-6">
          <span className="text-xl">Hi, Kylar!</span>

          <button className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800">
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-[1600px] mx-auto p-10">
        <div className="grid grid-cols-[350px_1fr_380px] gap-8 items-center">
          {/* LEFT MENU */}
          <div className="space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.title}
                className="w-full text-left bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-yellow-400 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl mb-2">
                      {item.icon} {item.title}
                    </div>

                    <div className="text-gray-400 text-lg">
                      {item.subtitle}
                    </div>
                  </div>

                  <span className="text-3xl">›</span>
                </div>
              </button>
            ))}
          </div>

          {/* CENTER SECTION */}
          <div>
            {/* CAT INFO */}
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-4 mb-3">
                <h2 className="text-5xl font-bold">Oli</h2>

                <span className="bg-green-700/50 px-4 py-2 rounded-xl">
                  Common
                </span>

                <span className="text-pink-400 text-xl">
                  ❤️ 100 / 100
                </span>
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                {["Playful", "Curious", "Gentle", "Smart"].map((trait) => (
                  <span
                    key={trait}
                    className="bg-white/10 px-4 py-2 rounded-xl"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* CAT IMAGE */}
            <div className="bg-black/20 border border-white/20 rounded-[30px] overflow-hidden shadow-2x1">
              <div className="aspect-square relative">
                <Image
                  src="/cats/defaultcat.png"
                  alt="Cat"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* DAILY BONUS */}
            <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">
                  🎁 DAILY BONUS
                </div>

                <div className="text-gray-400">
                  Play today and earn extra coins!
                </div>
              </div>

              <button className="bg-green-700 hover:bg-green-600 px-6 py-3 rounded-xl">
                Claim Reward
              </button>
            </div>
          </div>

          {/* RIGHT STATS */}
          <div className="space-y-4">
            {catStats.map((stat) => (
              <div
                key={stat.name}
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-xl">{stat.name}</span>

                  <span className="text-gray-300">
                    {stat.value}/100
                  </span>
                </div>

                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-yellow-500 to-orange-400 rounded-full"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}