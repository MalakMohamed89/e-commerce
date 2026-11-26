
import { Mail, LockKeyhole, ShieldCheck } from "lucide-react";

export default function RecoveryArtwork() {
  return (
    <div className="relative isolate aspect-[1.6] w-full overflow-hidden rounded-2xl bg-linear-to-br from-[#f0fdf4] via-[#f7fdf9] to-[#f3f4f6] shadow-md shadow-[#101828]/10">

      <span className="absolute left-[6%] top-[8%] size-24 rounded-full bg-[#dcfce7]/65" />

      <span className="absolute right-[13%] top-[17%] size-16 rounded-full bg-[#dcfce7]/60" />

      <span className="absolute bottom-[12%] right-[8%] size-32 rounded-full bg-[#dcfce7]/55" />

      <div className="absolute inset-0 flex items-center justify-center">

        <span className="absolute left-[31%] top-[38%] grid size-14 -rotate-12 place-items-center rounded-xl bg-white text-[#16a34a] shadow-lg">
          <Mail className="size-5" />
        </span>

        <span className="relative z-10 grid size-28 rotate-3 place-items-center rounded-[28px] bg-white shadow-xl">
          <span className="grid size-20 place-items-center rounded-[22px] bg-[#dcfce7]">
            <LockKeyhole className="size-9 text-[#16a34a]" />
          </span>
        </span>

        <span className="absolute right-[30%] top-[40%] grid size-14 rotate-12 place-items-center rounded-xl bg-white text-[#16a34a] shadow-lg">
          <ShieldCheck className="size-5" />
        </span>

      </div>

      <div className="absolute bottom-[27%] left-1/2 flex -translate-x-1/2 items-center gap-2">
        <i className="size-3 rounded-full bg-[#4ade80]" />
        <i className="size-3 rounded-full bg-[#22c55e]" />
        <i className="size-3 rounded-full bg-[#16a34a]" />
      </div>

    </div>
  );
}
