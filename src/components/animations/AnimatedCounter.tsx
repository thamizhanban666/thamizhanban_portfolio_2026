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
      className={className}
      duration={duration}
    />
  );
}

function AnimatedCounterInner({
  end,
  suffix,
  className,
  duration,
}: {
  end: number;
  suffix: string;
  className?: string;
  duration: number;
}) {
  const { count, ref } = useCountUp(end, duration);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
