export default function MarqueeBar() {
  const items = [
    "SEBA AFFILIATED",
    "MATHURAPUR, CHARAIDEO, ASSAM",
    "NURTURING MINDS SINCE 2001",
    "EXCELLENCE IN EDUCATION",
    "EST. 2001",
    "SEBA AFFILIATED",
    "MATHURAPUR, CHARAIDEO, ASSAM",
    "NURTURING MINDS SINCE 2001",
    "EXCELLENCE IN EDUCATION",
    "EST. 2001",
  ];

  return (
    <div className="relative overflow-hidden border-y border-[--color-border] bg-white py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-8 label-text !text-xs !text-primary shrink-0 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="mx-8 label-text !text-xs !text-primary shrink-0 flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
