import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Home() {
  return (
    <div className="bg-background dark:bg-background min-h-screen p-10">
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-bold text-foreground dark:text-foreground">
          Hello World
        </h1>
        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
