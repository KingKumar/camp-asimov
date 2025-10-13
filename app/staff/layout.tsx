import "../globals.css";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
