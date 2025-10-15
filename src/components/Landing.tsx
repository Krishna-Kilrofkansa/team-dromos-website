"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./Landing.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const mainRef = useRef(null);

    useEffect(() => {
        // Create background glitter container
        const glitterContainer = document.createElement('div');
        glitterContainer.className = styles.glitterContainer;
        document.body.appendChild(glitterContainer);

        // Create background glitter particles
        const createGlitter = () => {
            const glitter = document.createElement('div');
            glitter.className = styles.glitter;
            glitter.style.left = Math.random() * window.innerWidth + 'px';
            glitter.style.top = Math.random() * window.innerHeight + 'px';
            glitter.style.animationDelay = Math.random() * 3 + 's';
            glitterContainer.appendChild(glitter);

            gsap.fromTo(glitter, 
                { opacity: 0, scale: 0 },
                { 
                    opacity: Math.random() * 0.8 + 0.2,
                    scale: Math.random() * 1.5 + 0.5,
                    duration: Math.random() * 2 + 1,
                    ease: "power2.out"
                }
            );

            gsap.to(glitter, {
                opacity: 0,
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 3 + 2,
                ease: "power2.out",
                onComplete: () => {
                    glitter.remove();
                    createGlitter(); // Create new glitter
                }
            });
        };

        // Create initial glitter particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createGlitter(), Math.random() * 3000);
        }

        const ctx = gsap.context(() => {
            // Hero entrance animation
            gsap.fromTo(
                `.${styles.logo}`,
                { scale: 0, rotation: 180, opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
            );
            
            gsap.fromTo(
                `.${styles.title}`,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power3.out" }
            );
            
            gsap.fromTo(
                `.${styles.subtitle}`,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
            );
            
            gsap.fromTo(
                `.${styles.ctaButton}`,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, delay: 0.9, ease: "back.out(1.7)" }
            );

            // Floating animation for hero elements
            gsap.to(`.${styles.logo}`, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });

            // Feature cards hover animations
            document.querySelectorAll(`.${styles.featureCard}`).forEach((card) => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
                });
            });

            // Scroll-triggered animations with enhanced effects
            const sections = [
                { selector: `.${styles.about}`, direction: "left" },
                { selector: `.${styles.features}`, direction: "up" },
                { selector: `.${styles.tech}`, direction: "right" },
                { selector: `.${styles.team}`, direction: "up" },
                { selector: `.${styles.achievements}`, direction: "left" },
                { selector: `.${styles.gallery}`, direction: "up" },
                { selector: `.${styles.join}`, direction: "right" },
                { selector: `.${styles.contact}`, direction: "up" },
            ];

            sections.forEach(({ selector, direction }) => {
                const getInitialProps = () => {
                    switch (direction) {
                        case "left": return { x: -100, y: 0 };
                        case "right": return { x: 100, y: 0 };
                        case "up": return { x: 0, y: 50 };
                        default: return { x: 0, y: 50 };
                    }
                };

                gsap.fromTo(
                    `${selector} > *`,
                    { ...getInitialProps(), opacity: 0 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: selector,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // Parallax effect for images
            gsap.utils.toArray(`.${styles.image}`).forEach((img) => {
                gsap.to(img, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }, mainRef);

        return () => {
            ctx.revert();
            if (glitterContainer.parentNode) {
                glitterContainer.parentNode.removeChild(glitterContainer);
            }
        };
    }, []);

    return (
        <main className={styles.container} ref={mainRef}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}></div>
                <div className={styles.heroContent}>
                    <Image
                        src="/dromos-white.jpg"
                        alt="DROMOS Logo"
                        width={150}
                        height={150}
                        className={styles.logo}
                    />
                    <h1 className={styles.title}>🏅 Team Dromos</h1>
                    <p className={styles.subtitle}>
                        A group of young engineers and scientists working on Hyperloop technology — the future of high-speed transportation.
                    </p>
                    <button className={styles.ctaButton}>Explore Our Vision</button>
                </div>
            </section>

            {/* About */}
            <section className={styles.about}>
                <div>
                    <h2 className={styles.sectionTitle}>
                        Our Mission
                    </h2>
                    <p>
                        🌱 To develop safe, efficient, and scalable solutions for sustainable mobility.
                        We are a team of young engineers and scientists dedicated to advancing Hyperloop technology
                        and shaping the future of high-speed transportation.
                    </p>
                </div>
                <Image
                    src="/hyperloop.png"
                    alt="Hyperloop Pod"
                    width={600}
                    height={400}
                    className={styles.image}
                />
            </section>

            {/* Features */}
            <section className={styles.features}>
                <h2 className={styles.sectionTitle}>🔧 Areas of Expertise</h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <h3>⚡️ Propulsion</h3>
                        <p>
                            Advanced propulsion systems for high-speed transportation,
                            optimizing efficiency and performance.
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>🌪️ Aerodynamics</h3>
                        <p>
                            Cutting-edge aerodynamic design to minimize drag and
                            maximize speed in low-pressure environments.
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>⚡ Electronics</h3>
                        <p>
                            Innovative electrical systems and power management
                            for reliable, high-performance operation.
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>🎛️ Control Systems</h3>
                        <p>
                            Sophisticated control algorithms and safety systems
                            for autonomous operation and passenger safety.
                        </p>
                    </div>
                </div>
            </section>

            {/* Technology */}
            <section className={styles.tech}>
                <Image
                    src="/pod-blueprint.png"
                    alt="Hyperloop Blueprint"
                    width={600}
                    height={450}
                    className={styles.image}
                />
                <div>
                    <h2 className={styles.sectionTitle}>Proprietary Technology</h2>
                    <p>
                        Our system features a state-of-the-art propulsion system, passive
                        magnetic levitation for frictionless travel, and a robust tube
                        infrastructure designed for maximum safety and efficiency.
                    </p>
                </div>
            </section>

            {/* Team */}
            <section className={styles.team}>
                <h2 className={styles.sectionTitle}>Meet the Team</h2>
                <div className={styles.teamGrid}>
                    <div className={styles.teamCard}>
                        <Image src="/team1.jpg" alt="Team Member" width={200} height={200} />
                        <h3>Jane Doe</h3>
                        <p>Lead Engineer</p>
                    </div>
                    <div className={styles.teamCard}>
                        <Image src="/team2.jpg" alt="Team Member" width={200} height={200} />
                        <h3>John Smith</h3>
                        <p>Systems Designer</p>
                    </div>
                    {/* More members */}
                </div>
            </section>

            {/* Achievements */}
            <section className={styles.achievements}>
                <h2 className={styles.sectionTitle}>🏆 Our Achievements</h2>
                <div className={styles.achievementsGrid}>
                    <div className={styles.achievementCard}>
                        <h3>🥈 2nd Place</h3>
                        <p>Global Hyperloop Competition 2025</p>
                        <small>🌏 Largest in Asia, 3rd largest globally</small>
                    </div>
                    <div className={styles.achievementCard}>
                        <h3>🥇 1st Place</h3>
                        <p>Levitation Category</p>
                        <small>Excellence in magnetic levitation systems</small>
                    </div>
                    <div className={styles.achievementCard}>
                        <h3>📜 Certificate of Excellence</h3>
                        <p>Innovative Electrical Systems</p>
                        <small>Recognition for outstanding engineering</small>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className={styles.gallery}>
                <h2 className={styles.sectionTitle}>Gallery</h2>
                <div className={styles.galleryGrid}>
                    <Image src="/gallery1.jpg" alt="Prototype" width={300} height={200} />
                    <Image src="/gallery2.jpg" alt="Event" width={300} height={200} />
                    {/* More images */}
                </div>
            </section>

            {/* Join Us */}
            <section className={styles.join}>
                <h2 className={styles.sectionTitle}>Join Us</h2>
                <p>
                    We are always looking for passionate innovators to help us redefine
                    the future of transport. Come build the hyperloop with us!
                </p>
                <button className={styles.ctaButton}>Apply Now</button>
            </section>

            {/* Contact */}
            <section className={styles.contact}>
                <h2 className={styles.sectionTitle}>Contact Us</h2>
                <form className={styles.contactForm}>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <textarea placeholder="Message" rows={5}></textarea>
                    <button type="submit" className={styles.ctaButton}>
                        Send
                    </button>
                </form>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2025 DROMOS. All rights reserved.</p>
                <div className={styles.socialLinks}>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </footer>
        </main>
    );
}
