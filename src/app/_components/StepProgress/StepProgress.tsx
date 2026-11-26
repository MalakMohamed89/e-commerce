
import { Check, Mail, KeyRound, LockKeyhole } from "lucide-react";

type ResetStep = "forgetPass" | "verifycode" | "reset";

const stepOrder: ResetStep[] = [
  "forgetPass",
  "verifycode",
  "reset",
];

export default function StepProgress({
  current,
}: {
  current: ResetStep;
}) {
  const activeIndex = stepOrder.indexOf(current);

  const icons = [Mail, KeyRound, LockKeyhole];

  return (
    <div className="mx-auto flex w-full max-w-60 items-center justify-center">
      {stepOrder.map((step, index) => {
        const Icon = icons[index];

        const complete = index < activeIndex;
        const active = index === activeIndex;

        return (
          <div
            key={step}
            className="flex flex-1 items-center last:flex-none"
          >
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full ${
                active || complete
                  ? "bg-[#16a34a] text-white"
                  : "bg-[#f3f4f6] text-[#99a1af]"
              }`}
            >
              {complete ? (
                <Check className="size-4" />
              ) : (
                <Icon className="size-4" />
              )}
            </span>

            {index < stepOrder.length - 1 && (
              <span
                className={`mx-1.5 h-px flex-1 ${
                  index < activeIndex
                    ? "bg-[#16a34a]"
                    : "bg-[#d1d5dc]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
