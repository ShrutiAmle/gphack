import { useState, useEffect } from 'react'

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
}

export default function AnimatedCounter({ target, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * target)
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return (
    <span className="font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  )
}
