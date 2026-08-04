interface ProgressDotsProps {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

export function ProgressDots({ count, current, onSelect }: ProgressDotsProps) {
  return (
    <div className="mt-5 flex gap-1" role="tablist" aria-label="Progreso de la explicación">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`Ir al paso ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-[2px] flex-1 cursor-pointer border-none p-0 transition-colors ${
            index === current ? "bg-core-accent" : "bg-core-border/[0.14]"
          }`}
        />
      ))}
    </div>
  );
}
