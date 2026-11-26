import type { IconType } from "react-icons";

type FeatureCardProps = {
  icon: IconType;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBg,
}: FeatureCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
      <span
        className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`size-5 ${iconColor}`} />
      </span>
      <div className="leading-tight">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}