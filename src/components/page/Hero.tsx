const FALLBACK_BACKGROUND = "/images/university-of-montana.jpg";

export interface PageHeroProps {
  title: string;
  description?: string;
  backgroundImage?: string;
}

export function PageHero({
  title,
  description,
  backgroundImage = FALLBACK_BACKGROUND,
}: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[200px] flex-col items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat px-4 py-16 text-white before:absolute before:inset-0 before:bg-black/50 before:content-['']"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-white/90 md:text-xl">{description}</p>
        )}
      </div>
    </section>
  );
}
