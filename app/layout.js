import "./styles/globals.css";

export const metadata = {
  title: "MatchAI - Find Scholarships",
  description: "AI-powered scholarship matching platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}