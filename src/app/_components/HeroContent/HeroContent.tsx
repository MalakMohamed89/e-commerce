import Image from "next/image";
import Link from "next/link";

type HeroAction = {
  label: string;
  href: string;
};

type HeroContentProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  priority?: boolean;
  contentClassName?: string;
  coloredLabel?:string;
};

export default function HeroContent({
  imageSrc = "/freshcart-hero.png",
  imageAlt = "Fresh produce at a market",
  title = "Fresh Products Delivered\nto your Door",
  description = "Get 20% off your first order",
  primaryAction = { label: "Shop Now", href: "/products" },
  secondaryAction = { label: "View Deals", href: "/products" },
  priority = false,
  contentClassName = "",
  coloredLabel="text-green-500"

}: HeroContentProps) {
  return (
    <section className="hero-slide relative flex h-full min-h-75 items-center overflow-hidden text-white">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="hero-slide__overlay absolute inset-0" />

      <div className={`hero-slide__content relative z-10 ${contentClassName}`.trim()}>
        <h1 className="mb-3 max-w-sm whitespace-pre-line text-2xl font-bold leading-tight md:text-[30px]">
          {title}
        </h1>
        <p className="mb-4 text-sm md:text-base">{description}</p>

        <div className="flex flex-wrap gap-2">
          <Link href={primaryAction.href} className={`hero-slide__primary ${coloredLabel}`}>
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href} className="hero-slide__secondary">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
