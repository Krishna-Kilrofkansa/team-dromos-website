"use client";
import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Loader.module.css"; // we’ll modularize styles

export default function Loader() {
    useEffect(() => {
        // Prevent scrolling during loader
        document.body.style.overflow = "hidden";
        
        // initial states
        gsap.set(`.${styles.bar}`, { scaleX: 1, transformOrigin: "center" });
        gsap.set(`.${styles.stageWhite}`, { autoAlpha: 1 });
        gsap.set(`.${styles.stageBlack}`, { autoAlpha: 0 });
        gsap.set(`.${styles.content}`, { autoAlpha: 0 });

        const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut" } });

        tl.to(`.${styles.loadingText}`, {
            autoAlpha: 0,
            y: 12,
            duration: 0.35,
            ease: "power2.out",
        });

        tl.to(`.${styles.bar}`, {
            scaleX: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.inOut",
            transformOrigin: "center",
        });

        tl.to({}, { duration: 0.65 });

        tl.to(`.${styles.bar}`, {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power4.inOut",
            transformOrigin: "center",
        });

        tl.add(() => {
            gsap.set(`.${styles.stageWhite}`, { autoAlpha: 0 });
            gsap.set(`.${styles.stageBlack}`, { autoAlpha: 1 });
        });

        tl.to(`.${styles.bar}`, {
            scaleX: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.inOut",
            transformOrigin: "center",
        });

        tl.to({}, { duration: 0.9 });

        tl.to(`.${styles.loader}`, {
            y: "-100%",
            duration: 0.9,
            ease: "power4.inOut",
            onComplete: () => {
                const el = document.querySelector(`.${styles.loader}`) as HTMLElement;
                if (el) el.style.display = "none";
                document.body.style.overflow = "auto";
            },
        });

        tl.to(
            `.${styles.content}`,
            { autoAlpha: 1, duration: 0.9, ease: "power2.out" },
            "-=0.3"
        );

        setTimeout(() => tl.play(), 2000);
    }, []);

    return (
        <>
            <div className={styles.loader}>
                <div className={styles.stageWhite}>
                    <Image
                        src="/dromos-black.jpg"
                        alt="Dromos Logo Black"
                        width={300}    // fallback size (overridden by CSS)
                        height={250}
                        className={styles.logo}
                        priority
                    />
                </div>
                <div className={styles.stageBlack}>
                    <Image
                        src="/dromos-white.jpg"
                        alt="Dromos Logo White"
                        width={300}
                        height={250}
                        className={styles.logo}
                        priority
                    />
                </div>

                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>

                <div className={styles.loadingText}>
                    Initialising DROMOS Hyperloop frameworks…
                </div>
            </div>

            <div className={styles.content}>
                <h1>Welcome to DROMOS Landing Page</h1>
                <p>Your page content here.</p>
            </div>
        </>
    );
}
