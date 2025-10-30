"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function TeamGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const images = gsap.utils.toArray(".gallery-image");
        
        images.forEach((img: any, index) => {
            gsap.fromTo(img, {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 1,
                    toggleActions: "play none none reverse"
                }
            });

            // Parallax effect
            gsap.to(img, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }, []);

    const galleryImages = [
        "/hyperloop.png",
        "/hyperloop.png", 
        "/hyperloop.png",
        "/hyperloop.png",
        "/hyperloop.png",
        "/hyperloop.png"
    ];

    return (
        <section className="py-20 bg-background-secondary/20">
            <div className="container mx-auto px-6">
                <h2 className="text-h1 font-orbitron font-bold text-center mb-16 text-primary">Team Gallery</h2>
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="gallery-image relative overflow-hidden rounded-lg group">
                            <Image
                                src={src}
                                alt={`Team ${index + 1}`}
                                width={400}
                                height={300}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}