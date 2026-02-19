# Implementation Plan - Website Update

## Objective
Update the Dromos website with a redesigned Navbar, new "About" and "Join Us" sections, and integrate them into the main application.

## Tasks

1.  **Asset Management**
    *   Rename public images to safe filenames (kebab-case) to avoid URL encoding issues:
        *   `who are we.jpg` -> `who-are-we.jpg`
        *   `what we offer.jpg` -> `what-we-offer.jpg`
        *   `join the purpose.jpg` -> `join-the-purpose.jpg`
    *   Update references in components.

2.  **Navbar Redesign**
    *   Verify and polish `Navbar.tsx`.
    *   Ensure Menu Toggle is on the LEFT.
    *   Ensure Logo is on the RIGHT.
    *   Ensure Menu is hidden by default and opens a full-screen overlay.

3.  **Create/Update About Section (`About.tsx`)**
    *   Combine "Who We Are" content with "Achievements".
    *   Use `who-are-we.jpg`.
    *   Integrate the "Global Recognition" achievements (Trophy, etc.) into this section, possibly merging valid visual elements from the existing `Achievements.tsx`.

4.  **Create/Update Join Us Section (`JoinUs.tsx`)**
    *   Ensure it contains "Join the Purpose" (Mission/Intro) and "What We Offer" (Benefits).
    *   Use `join-the-purpose.jpg` and `what-we-offer.jpg`.
    *   Styling: Ensure premium look with glassmorphism/gradients.

5.  **Integration (`App.tsx`)**
    *   Import `About` and `JoinUs`.
    *   Structure the page: Hero -> About -> Team -> JoinUs -> Footer.
    *   Remove separate `Achievements` component if fully merged.

6.  **Verification**
    *   Run build.
    *   Verify responsive design (mobile/desktop).
