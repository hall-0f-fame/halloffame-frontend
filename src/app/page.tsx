import CounterSection from "@/components/CounterSection";
import Leaderboard from "@/components/Leaderboard";
import SubmitScore from "@/components/SubmitScore";

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="pt-24 pb-12 text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
          LEGENDS
        </h1>
        <p className="text-xl text-white/50 max-w-2xl mx-auto">
          Eternalize your achievements on the Stacks blockchain. Compete for the crown.
        </p>
      </div>

      <CounterSection />

      <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto">
        <Leaderboard />
        <SubmitScore />
      </div>
    </div>
  );
}
