interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleColor?: string;
  subtitleColor?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center", // Default alignment is center
  titleColor = "text-gray-900", // Default title color
  subtitleColor = "text-gray-600", // Default subtitle color
}: SectionTitleProps) {
  return (
    <div className={`text-${align} mb-12 lg:mb-16`}>
      {/* Subtitle (optional) */}
      {subtitle && (
        <p
          className={`text-lg font-medium ${subtitleColor} dark:text-gray-300 mb-2`}
        >
          {subtitle}
        </p>
      )}
      {/* Main Title */}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${titleColor} dark:text-white`}
      >
        {title}
      </h2>
      {/* Decorative Line (optional) */}
      <div
        className={`mt-4 mx-auto ${
          align === "center" ? "w-16" : "w-10"
        } h-1 bg-primary-600 dark:bg-primary-500 rounded-full`}
      ></div>
    </div>
  );
}
