import Link from "next/link";

export default function StaffPortalPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Portal</h1>
        <form action="/api/staff/logout" method="POST">
          <button
            className="px-4 py-2 rounded-xl font-semibold"
            style={{ backgroundColor: "#7AA2F7", color: "#081b17" }}
          >
            Sign out
          </button>
        </form>
      </div>

      <p className="mt-2 text-neutral-400">
        Internal resources for instructors and mentors.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">Training Modules</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li><Link href="/staff/modules/ethos" className="underline">Camp Ethos & Teaching Mindset</Link></li>
            <li><Link href="/staff/modules/compliance" className="underline">AB 506 & Youth Protection</Link></li>
            <li><Link href="/staff/modules/lab" className="underline">Lab Certification: Laser, 3D, Solder</Link></li>
            <li><Link href="/staff/modules/ftc" className="underline">REV Control Hub + Java (FTC)</Link></li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">SOPs & Checklists</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li><a href="/parent-packet.pdf" target="_blank" className="underline">Parent Packet (PDF)</a></li>
            <li><a href="/safety-plan.pdf" target="_blank" className="underline">Safety Plan (PDF)</a></li>
            <li><a href="/sops/laser-cutter.pdf" target="_blank" className="underline">Laser Cutter SOP</a></li>
            <li><a href="/sops/soldering.pdf" target="_blank" className="underline">Soldering SOP</a></li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6 md:col-span-2" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">Daily Operations</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li>Attendance & headcount at 9:00, 12:45, 3:30</li>
            <li>PPE & tool badge checks at lab entry</li>
            <li>Li-ion charging: supervised, labeled packs only</li>
            <li>Cleanup & lockout: 3D / laser / solder stations</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
