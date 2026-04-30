import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tim Baker | Principal Full-Stack Engineer",
  description: "I design and deliver secure, scalable digital products that improve operations, accelerate growth, and create measurable business value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
