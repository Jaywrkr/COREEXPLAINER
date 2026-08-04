import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { ThemeToggle } from "@/components/explainer/ThemeToggle";
import { VersionChangelog } from "@/components/explainer/VersionChangelog";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoreSolutions Technical Explainer",
  description:
    "Explicaciones visuales e interactivas de conceptos técnicos complejos para clientes de CoreSolutions.",
};

// Runs before hydration, as the first thing in <body>, so the correct
// theme is set before first paint (no flash of the wrong theme). Keep in
// sync with STORAGE_KEY in src/lib/theme/ThemeProvider.tsx.
const themeInitScript = `(function(){try{var s=localStorage.getItem('core-explainer-theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className="bg-core-bg text-core-text font-sans antialiased">
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <ThemeToggle />
          <VersionChangelog />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
