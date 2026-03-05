"use client";
import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  className,
  duration = 2000,
}: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const numericEnd = parseInt(match[1], 10);
  const suffix = match[2];

  return (
    <AnimatedCounterInner
      end={numericEnd}
      suffix={suffix}
      finalValue={value}
      className={className}
      duration={duration}
    />
  );
}

function AnimatedCounterInner({
  end,
  suffix,
  finalValue,
  className,
  duration,
}: {
  end: number;
  suffix: string;
  finalValue: string;
  className?: string;
  duration: number;
}) {
  const { count, ref } = useCountUp(end, duration);

  return (
    <span
      ref={ref}
      className={`${className ?? ""} tabular-nums inline-grid`}
    >
      {/* Invisible placeholder reserves final width — prevents layout shift */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {finalValue}
      </span>
      {/* Visible animated value overlaid on same grid cell */}
      <span className="col-start-1 row-start-1">
        {count}
        {suffix}
      </span>
    </span>
  );
}
