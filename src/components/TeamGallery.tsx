import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Select all the gallery image containers (these are HTML Elements, not strings)
        const imageWrappers = gsap.utils.toArray<HTMLElement>(".gallery-image", container);

        // --- Animation 1: Staggered Fade-in on Scroll ---
        // This is more efficient than creating a ScrollTrigger for each image.
        gsap.fromTo(imageWrappers, {
            y: 100,
            opacity: 0,
            scale: 0.8
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2, // Animates each image 0.2s after the previous one
            scrollTrigger: {
                trigger: container, // Use the main container as the single trigger
                start: "top 80%",   // Start when the container is 80% in view
                toggleActions: "play none none none" // Play the animation once
            }
        });

        // --- Animation 2: Parallax effect for each image ---
        // This part needs to be individual as each image scrolls independently.
        imageWrappers.forEach(wrapper => {
            // Target the actual <img> tag inside the wrapper for the parallax effect
            const imageEl = wrapper.querySelector('img');
            if (!imageEl) return;

            gsap.to(imageEl, {
                yPercent: -20, // A smaller value is often less jarring for parallax
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top bottom", // Starts when the top of the wrapper hits the bottom of the screen
                    end: "bottom top",   // Ends when the bottom of the wrapper hits the top of the screen
                    scrub: true          // Smoothly links the animation to the scrollbar
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
        <section id="gallery" className="py-32 bg-gradient-to-b from-background to-background-secondary/40">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text">
                    Team Gallery
                </h2>
                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryImages.map((src, index) => (
                        <div key={index} className="gallery-image relative overflow-hidden rounded-2xl shadow-glass group">
                            <img
                                src={src}
                                alt={`Team gallery image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}