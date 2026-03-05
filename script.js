// fallback если браузер не поддерживает CSS scroll animations

if (!CSS.supports("animation-timeline: view()")) {

    const poop = document.getElementById("poopImg");
    const splash = document.getElementById("splashImg");
    const bubble = document.getElementById("speechBubble");
    const section = document.querySelector(".toilet-section");

    window.addEventListener("scroll", () => {

        const rect = section.getBoundingClientRect();

        let progress = 1 - rect.top / window.innerHeight;

        progress = Math.max(0, Math.min(1, progress));

        const fall = progress * 240;

        poop.style.transform = `translate(-50%, ${fall}px)`;

        if (progress > .8) {

            splash.style.opacity = 1;
            splash.style.transform = "translateX(-50%) scale(1)";

        }

        if (progress > .9) {

            bubble.style.opacity = 1;
            bubble.style.transform = "translateY(0)";

        }

    });

}
