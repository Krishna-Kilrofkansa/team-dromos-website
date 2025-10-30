import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const gsapAnimations = {
  heroMaskReveal: () => ({
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power4.inOut",
    stagger: 0.1
  }),
  
  slideInFromLeft: () => ({
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }),
  
  slideInFromRight: () => ({
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }),
  
  fadeInUp: () => ({
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }),
  
  scaleIn: () => ({
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  })
}