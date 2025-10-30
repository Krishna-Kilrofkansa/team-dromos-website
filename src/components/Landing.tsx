"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Zap, Flame, Cog, Brain, Megaphone, Wrench } from "lucide-react";

import CustomCursor from "./CustomCursor";
import ParticleBackground from "./ParticleBackground";
import HorizontalLoop from "./HorizontalLoop";
import TeamGallery from "./TeamGallery";
import IconGrid from "./IconGrid";
import MiniWheelMenu from "./MiniWheelMenu";

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const mainRef = useRef(null);


    useEffect(() => {
        // Full screen image reveal effect
        const createImageReveal = () => {
            const revealContainer = document.createElement('div');
            revealContainer.className = 'fixed inset-0 z-40 pointer-events-none';
            revealContainer.innerHTML = `
                <div class="absolute inset-0 bg-background transform scale-0">
                    <img src="/hyperloop.png" alt="Pod Rendering" class="w-full h-full object-cover" />
                </div>
            `;
            document.body.appendChild(revealContainer);

            const revealBg = revealContainer.querySelector('div');
            
            gsap.to(revealBg, {
                scale: 1,
                duration: 2,
                ease: "power4.inOut",
                delay: 3,
                onComplete: () => {
                    gsap.to(revealBg, {
                        scale: 0,
                        duration: 1.5,
                        ease: "power4.inOut",
                        delay: 2,
                        onComplete: () => revealContainer.remove()
                    });
                }
            });
        };

        // Trigger image reveal after initial load
        setTimeout(createImageReveal, 4000);

        const ctx = gsap.context(() => {
            // Hero mask reveal animation with filter effect
            gsap.fromTo(".hero-title", {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                filter: "blur(10px)"
            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power4.inOut",
                delay: 0.5
            });

            gsap.fromTo(".hero-subtitle", {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                filter: "blur(5px)"
            }, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.8
            });

            // 3D Slider Cards Carousel animation
            gsap.fromTo(".carousel-card", {
                rotateY: 45,
                z: -100,
                opacity: 0
            }, {
                rotateY: 0,
                z: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 1.2
            });

            // Floating icons animation
            gsap.to(".floating-icon", {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                stagger: 0.2
            });

            // Scroll-triggered animations
            gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
                gsap.fromTo(section.children, {
                    y: 100,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Subsystem cards animation
            gsap.utils.toArray<HTMLElement>(".subsystem-card").forEach((card, index) => {
                gsap.fromTo(card, {
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    rotateY: index % 2 === 0 ? -15 : 15
                }, {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });

            // Achievement cards stacking animation
            gsap.utils.toArray<HTMLElement>(".achievement-card").forEach((card, index) => {
                gsap.fromTo(card, {
                    y: 100 + (index * 20),
                    opacity: 0,
                    scale: 0.8
                }, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".achievements-section",
                        start: "top 70%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, mainRef);

        return () => {
            ctx.revert();
        };
    }, []);

    const subsystems = [
        {
            icon: Flame,
            title: "Thermal and Safety",
            goal: "Ensure the pod operates safely and efficiently under all conditions.",
            features: ["Cooling systems", "Fire protection", "Insulation", "Pod safety protocols"]
        },
        {
            icon: Zap,
            title: "Electrical",
            goal: "Power the pod.",
            features: ["Wiring and circuitry", "Power distribution", "Battery systems", "Stable electrical performance"]
        },
        {
            icon: Cog,
            title: "Propulsion",
            goal: "Drive the pod forward — literally.",
            features: ["Linear Synchronous Motors", "Thrust optimization", "Speed control", "High-performance motion"]
        },
        {
            icon: Wrench,
            title: "Mechanical",
            goal: "Design, analyze, and build the physical structure of the pod.",
            features: ["Chassis", "Suspension", "Brakes", "CAD, FEA, and hands-on manufacturing"]
        },
        {
            icon: Brain,
            title: "Embedded Systems",
            goal: "Build the brain of the pod.",
            features: ["Microcontrollers", "Sensors", "Control logic", "Communication systems"]
        },
        {
            icon: Megaphone,
            title: "Management & Marketing",
            goal: "Be the voice and vision of the team.",
            features: ["Operations and timelines", "Budgeting and sponsorships", "Outreach, branding, and promotions"]
        }
    ];

    const achievements = [
        {
            icon: "🥈",
            title: "2nd place",
            subtitle: "2025 Global Hyperloop Competition",
            description: "Largest in Asia, third-largest worldwide"
        },
        {
            icon: "🥇",
            title: "1st place",
            subtitle: "Levitation category",
            description: "Excellence in magnetic levitation systems"
        },
        {
            icon: "🏅",
            title: "Certificate of Excellence",
            subtitle: "Innovative electrical systems",
            description: "Recognition for outstanding engineering"
        }
    ];

    const galleryImages = [
        "/hyperloop.png",
        "/hyperloop.png",
        "/hyperloop.png",
        "/hyperloop.png"
    ];

    return (
        <>
            <CustomCursor />
            <ParticleBackground />
            <MiniWheelMenu />

            <main className="bg-background text-text-primary overflow-x-hidden relative" ref={mainRef}>
                {/* Hero Section */}
                <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                    {/* Enhanced Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent-neon/5" />
                    <div className="absolute inset-0">
                        {[...Array(100)].map((_, i) => (
                            <div
                                key={i}
                                className="floating-icon absolute rounded-full opacity-20"
                                style={{
                                    width: `${Math.random() * 4 + 1}px`,
                                    height: `${Math.random() * 4 + 1}px`,
                                    background: Math.random() > 0.5 ? '#00AEEF' : '#00ffff',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`
                                }}
                            />
                        ))}
                    </div>
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'linear-gradient(rgba(0,174,239,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="hero-title font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text text-transparent leading-tight">
                            {"We're more than just a team —"}<br />{"we're a" }<span className="relative inline-block">
                                movement
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-neon/20 blur-lg animate-pulse"></div>
                            </span>.
                        </div>
                        <div className="hero-subtitle text-lg md:text-xl lg:text-2xl text-text-secondary/80 max-w-4xl mx-auto mb-16 font-inter leading-relaxed">
                            A collective of <span className="text-primary font-medium">thinkers</span>, <span className="text-accent-neon font-medium">tinkerers</span>, and <span className="text-primary font-medium">trailblazers</span> building the future of high-speed transportation.
                        </div>
                        
                        {/* 3D Slider Cards Carousel */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto perspective-1000">
                            {[
                                { name: "Competitions", icon: "🏆", desc: "Global recognition" },
                                { name: "Innovation", icon: "💡", desc: "Cutting-edge tech" },
                                { name: "Teamwork", icon: "🤝", desc: "Collaborative spirit" },
                                { name: "Purpose", icon: "🎯", desc: "Driven mission" }
                            ].map((item, index) => (
                                <div 
                                    key={item.name}
                                    className="carousel-card group relative p-8 bg-gradient-to-br from-background-secondary/60 to-background-tertiary/40 backdrop-blur-md border border-primary/30 rounded-xl hover:border-primary/60 transition-all duration-500 hover:shadow-glow-cyan transform-gpu hover:-translate-y-2"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="text-4xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <div className="font-space text-lg font-bold text-primary mb-2">{item.name}</div>
                                    <div className="text-text-secondary text-sm">{item.desc}</div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-50 group-hover:opacity-100 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who We Are */}
                <section id="about" className="py-32 reveal-section relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text relative">
                                    Who are we?
                                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-primary to-accent-neon rounded-full" />
                                </h2>
                                <div className="space-y-4 text-text-secondary text-lg">
                                    <p>
                                        Dromos is a passionate team of young engineers and scientists working to reshape the future of transport through advanced Hyperloop technology.
                                    </p>
                                    <p>
                                        We earned 2nd place at the 2025 Global Hyperloop Competition, the largest in Asia and third-largest worldwide.
                                    </p>
                                    <p>
                                        We also took 1st place in the Levitation category and received a Certificate of Excellence for our innovative electrical systems.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <Image
                                    src="/hyperloop.png"
                                    alt="Hyperloop Pod"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow-glass"
                                />
                            </div>
                        </div>
                        
                        {/* Horizontal Loop Gallery */}
                        <div className="mt-16">
                            <h3 className="text-h2 font-space font-bold text-center mb-8 text-primary">Lab · Design · Test</h3>
                            <HorizontalLoop images={galleryImages} />
                        </div>
                    </div>
                </section>

                {/* Team Overview */}
                <section id="awards" className="py-32 bg-gradient-to-br from-background-secondary/40 to-background/60 achievements-section relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent-neon/5" />
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-4 text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text">🏆 Team Overview</h2>
                        <p className="text-center text-text-secondary text-lg mb-16 max-w-3xl mx-auto">
                            Dromos is a passionate team of young engineers and scientists working to reshape the future of transport through advanced Hyperloop technology.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="achievement-card group relative p-8 bg-gradient-to-br from-background/70 to-background-secondary/50 backdrop-blur-md border border-primary/30 rounded-2xl text-center hover:border-primary/60 transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-3 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-neon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{achievement.icon}</div>
                                    <h3 className="text-2xl font-space font-bold mb-3 text-primary group-hover:text-accent-neon transition-colors duration-300">{achievement.title}</h3>
                                    <p className="text-text-secondary mb-3 font-medium">{achievement.subtitle}</p>
                                    <small className="text-text-muted leading-relaxed">{achievement.description}</small>
                                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent-neon/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                        
                        {/* Additional highlights */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="achievement-card p-6 bg-background/30 backdrop-blur-sm border border-primary/20 rounded-lg">
                                <h4 className="text-lg font-space font-bold mb-2 text-primary flex items-center">
                                    🔧 <span className="ml-2">Expertise</span>
                                </h4>
                                <p className="text-text-secondary">Across propulsion, aerodynamics, electronics, and control systems</p>
                            </div>
                            <div className="achievement-card p-6 bg-background/30 backdrop-blur-sm border border-primary/20 rounded-lg">
                                <h4 className="text-lg font-space font-bold mb-2 text-primary flex items-center">
                                    🌱 <span className="ml-2">Mission</span>
                                </h4>
                                <p className="text-text-secondary">Safe, efficient, scalable solutions for sustainable mobility</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subsystems */}
                <section id="systems" className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-secondary/20 to-transparent" />
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-4 text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text">🔥 Subsystems</h2>
                        <p className="text-center text-text-secondary/80 mb-16 max-w-2xl mx-auto text-lg">Each subsystem represents precision engineering and innovation working in perfect harmony</p>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {subsystems.map((subsystem, index) => {
                                const IconComponent = subsystem.icon;
                                return (
                                    <div key={index} className="subsystem-card group relative p-8 bg-gradient-to-br from-background-secondary/60 to-background/40 backdrop-blur-md border border-primary/30 rounded-2xl hover:border-primary/60 transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-2 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-accent-neon/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                        <div className="flex items-center mb-6 relative z-10">
                                            <div className="p-4 bg-gradient-to-br from-primary/20 to-accent-neon/10 rounded-xl mr-4 group-hover:from-primary/30 group-hover:to-accent-neon/20 transition-all duration-300 group-hover:scale-110">
                                                <IconComponent className="w-8 h-8 text-primary group-hover:text-accent-neon transition-colors duration-300" />
                                            </div>
                                            <h3 className="text-2xl font-space font-bold text-primary group-hover:text-accent-neon transition-colors duration-300">{subsystem.title}</h3>
                                        </div>
                                        <p className="text-text-secondary mb-6 font-medium text-lg leading-relaxed relative z-10">{subsystem.goal}</p>
                                        <ul className="space-y-3 relative z-10">
                                            {subsystem.features.map((feature, idx) => (
                                                <li key={idx} className="text-text-muted flex items-center group-hover:text-text-secondary transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent-neon rounded-full mr-4 animate-pulse group-hover:scale-125 transition-transform duration-300" />
                                                    <span className="font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent-neon/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                
                {/* Team Gallery */}
                <TeamGallery />

                {/* Join the Purpose */}
                <section id="team" className="py-32 bg-gradient-to-br from-background-secondary/40 to-background/60 reveal-section relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-neon/5 via-transparent to-primary/5" />
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text text-center">Join the purpose</h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">
                            We offer the ride of a lifetime — Real-world engineering · Global exposure · Hands-on innovation · A space to grow, fail, learn, and lead.
                        </p>
                        
                        {/* Icon Grid Follow Mouse Effect */}
                        <div className="mb-12">
                            <IconGrid />
                        </div>
                        
                        <button className="group relative px-12 py-4 bg-gradient-to-r from-primary to-accent-neon text-background font-space font-bold rounded-xl hover:from-accent-neon hover:to-primary transition-all duration-500 hover:shadow-glow-cyan transform hover:scale-105 overflow-hidden">
                            <span className="relative z-10">Apply Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-neon to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="py-12 border-t border-primary/20 relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-8">
                            <p className="text-xl md:text-2xl font-orbitron text-transparent bg-gradient-to-r from-primary via-accent-neon to-primary bg-clip-text mb-6 animate-text-glow">
                                {'"The name is DROMOS. Driven by purpose, powered by passion."'}
                            </p>
                        </div>
                        <div className="flex justify-center space-x-8 mb-8">
                            <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 transform">LinkedIn</a>
                            <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 transform">Instagram</a>
                            <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 transform">YouTube</a>
                        </div>
                        <div className="text-center text-text-muted">
                            <p>© 2025 DROMOS. All rights reserved.</p>
                        </div>
                    </div>
                    
                    {/* Subtle particle motion background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                </footer>
            </main>
        </>
    );
}