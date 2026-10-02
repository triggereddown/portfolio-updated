"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export default function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutExpo curve
      const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const currentValue = Math.floor(startValue + (end - startValue) * easing);

      setCount(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
