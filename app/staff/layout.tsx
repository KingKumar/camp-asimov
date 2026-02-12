// app/staff/layout.tsx
import "../globals.css";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  // No <html>/<body> here  -  that's only for the root layout.
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-white antialiased">
      {children}
    </div>
  );
}
