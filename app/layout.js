import { Source_Serif_4, DM_Sans } from "next/font/google";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Ask an Editor",
  description: "See your work through an editor's eyes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${dmSans.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
