const panels = {
  lore: {
    title: "The Queen Beyond The Veil",
    text: "A whispered dossier on the sovereign who binds fire, shadow, and forgotten scripture into a single command.",
    metaLabel: "Veil Stability",
    metaValue: "82%",
    quote: "Each opened gate remembers the hand that asked too much of it.",
  },
  rites: {
    title: "Ashen Vow Procession",
    text: "Ceremonies unfold beneath fractured arches as initiates trade memory for power and emerge rune-marked.",
    metaLabel: "Ritual Heat",
    metaValue: "49 C",
    quote: "The nave does not burn. It only decides who is allowed to remain flame-shaped.",
  },
  vault: {
    title: "The Sealed Reliquary",
    text: "Ancient relics pulse beneath obsidian glass, each one tied to a faction path, prophecy branch, and hidden endgame.",
    metaLabel: "Vault Echoes",
    metaValue: "118",
    quote: "Relics do not sleep. They wait for a worthy ruin to inherit.",
  },
};

const panelSequence = Object.keys(panels);
let panelIndex = 0;

const title = document.getElementById("panel-title");
const text = document.getElementById("panel-text");
const metaLabel = document.getElementById("meta-label");
const metaValue = document.getElementById("meta-value");
const quote = document.getElementById("panel-quote");
const navButtons = [...document.querySelectorAll(".nav-chip")];
const cycleButton = document.getElementById("cycle-panel");
const ambienceButton = document.getElementById("toggle-ambience");
const modal = document.getElementById("nexus-modal");
const openModalButton = document.getElementById("open-modal");
const motionLayers = [...document.querySelectorAll(".motion-layer")];
const revealCards = [...document.querySelectorAll(".reveal-card")];
const heroZone = document.getElementById("hero-zone");
const heroStage = document.querySelector(".hero-stage");
const scenes = [...document.querySelectorAll(".parallax-scene")];
const railLinks = [...document.querySelectorAll(".rail-link")];
const factionTabs = [...document.querySelectorAll(".faction-tab")];
const relicTabs = [...document.querySelectorAll(".relic-tab")];
const factionTitle = document.getElementById("faction-title");
const factionText = document.getElementById("faction-text");
const factionKickerA = document.getElementById("faction-kicker-a");
const factionValueA = document.getElementById("faction-value-a");
const factionKickerB = document.getElementById("faction-kicker-b");
const factionValueB = document.getElementById("faction-value-b");
const relicTitle = document.getElementById("relic-title");
const relicText = document.getElementById("relic-text");
const relicKickerA = document.getElementById("relic-kicker-a");
const relicValueA = document.getElementById("relic-value-a");
const relicKickerB = document.getElementById("relic-kicker-b");
const relicValueB = document.getElementById("relic-value-b");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger && !prefersReducedMotion);

const factionData = {
  choir: {
    title: "Ember Choir",
    text: "Choir acolytes trade memory, voice, and ceremony to awaken flame relics before any other house can bind them.",
    kickerA: "Rite Speed",
    valueA: "Fast",
    kickerB: "Relic Bias",
    valueB: "Pyre Glass",
  },
  obsidian: {
    title: "Obsidian Wing",
    text: "The Wing turns scripture into military doctrine, favoring precision strikes, sealed vows, and defensive relic grids.",
    kickerA: "Veil Impact",
    valueA: "Stable",
    kickerB: "Battle Doctrine",
    valueB: "Sentinel Lock",
  },
  silver: {
    title: "Silver Veil",
    text: "Archivists of the Silver Veil interpret living sigils to uncover alternate endings and reroute prophecy branches.",
    kickerA: "Archive Reach",
    valueA: "Deep",
    kickerB: "Gift",
    valueB: "Path Reading",
  },
};

const relicData = {
  pyre: {
    title: "Pyre Glass",
    text: "A heat-locked shard that amplifies ritual outcomes at the cost of memory drift inside the nave.",
    kickerA: "Risk",
    valueA: "High",
    kickerB: "Favored By",
    valueB: "Ember Choir",
  },
  veil: {
    title: "Veil Needle",
    text: "A silver filament used to stitch prophecy tears shut before rival houses can exploit them.",
    kickerA: "Risk",
    valueA: "Medium",
    kickerB: "Favored By",
    valueB: "Silver Veil",
  },
  crown: {
    title: "Crown Ash",
    text: "Ash gathered from failed coronations that can harden a faction route into a permanent branch.",
    kickerA: "Risk",
    valueA: "Severe",
    kickerB: "Favored By",
    valueB: "Obsidian Wing",
  },
};

function setPanel(key) {
  const panel = panels[key];
  title.textContent = panel.title;
  text.textContent = panel.text;
  metaLabel.textContent = panel.metaLabel;
  metaValue.textContent = panel.metaValue;
  quote.textContent = `"${panel.quote}"`;
  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panel === key);
  });
  panelIndex = panelSequence.indexOf(key);
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => setPanel(button.dataset.panel));
});

cycleButton.addEventListener("click", () => {
  panelIndex = (panelIndex + 1) % panelSequence.length;
  setPanel(panelSequence[panelIndex]);
});

ambienceButton.addEventListener("click", () => {
  document.body.classList.toggle("ambience-shifted");
  if (hasGsap) {
    ScrollTrigger.refresh();
  }
});

openModalButton.addEventListener("click", () => {
  if (typeof modal.showModal === "function") {
    modal.showModal();
  }
});

function setActiveRail(targetId) {
  railLinks.forEach((link) => {
    link.classList.toggle("is-current", link.dataset.target === targetId);
  });
}

railLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById(link.dataset.target)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

function setFaction(key) {
  const item = factionData[key];
  factionTitle.textContent = item.title;
  factionText.textContent = item.text;
  factionKickerA.textContent = item.kickerA;
  factionValueA.textContent = item.valueA;
  factionKickerB.textContent = item.kickerB;
  factionValueB.textContent = item.valueB;
  factionTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.faction === key);
  });
}

function setRelic(key) {
  const item = relicData[key];
  relicTitle.textContent = item.title;
  relicText.textContent = item.text;
  relicKickerA.textContent = item.kickerA;
  relicValueA.textContent = item.valueA;
  relicKickerB.textContent = item.kickerB;
  relicValueB.textContent = item.valueB;
  relicTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.relic === key);
  });
}

factionTabs.forEach((tab) => {
  tab.addEventListener("click", () => setFaction(tab.dataset.faction));
});

relicTabs.forEach((tab) => {
  tab.addEventListener("click", () => setRelic(tab.dataset.relic));
});

function initRevealFallback() {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealCards.forEach((card) => revealObserver.observe(card));
  } else {
    revealCards.forEach((card) => card.classList.add("is-visible"));
  }
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActiveRail(visibleEntries[0].target.id);
      }
    },
    { threshold: [0.25, 0.45, 0.65] }
  );

  [heroZone, ...scenes, document.getElementById("review")].filter(Boolean).forEach((section) => {
    sectionObserver.observe(section);
  });
}

function initPointerDepth() {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function updatePointer(clientX, clientY) {
    targetX = (clientX / window.innerWidth - 0.5) * 2;
    targetY = (clientY / window.innerHeight - 0.5) * 2;
  }

  function animatePointer() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    motionLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      layer.style.setProperty("--move-x", `${currentX * depth}px`);
      layer.style.setProperty("--move-y", `${currentY * depth}px`);
    });

    requestAnimationFrame(animatePointer);
  }

  window.addEventListener("pointermove", (event) => {
    updatePointer(event.clientX, event.clientY);
  });

  window.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  animatePointer();
}

function initGsapParallax() {
  document.body.classList.add("has-gsap");
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 901px)", () => {
    const heroTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: heroZone,
        start: "top top",
        end: "+=240%",
        pin: heroStage,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          document.documentElement.style.setProperty("--hero-progress", self.progress.toFixed(4));
        },
      },
    });

    heroTimeline
      .to(".hero-base", { yPercent: -12, scale: 1.23, filter: "saturate(1.2) contrast(1.08) brightness(0.82)" }, 0)
      .to(".mist-rear", { yPercent: -38, xPercent: 6, scale: 1.22, opacity: 0.86 }, 0)
      .to(".cathedral-halo", { yPercent: -28, scale: 1.3, opacity: 0.94 }, 0)
      .to(".mist-front", { yPercent: -72, xPercent: -14, scale: 1.42, opacity: 0.78 }, 0)
      .to(".embers", { yPercent: -98, xPercent: -12, scale: 1.36, opacity: 1 }, 0)
      .to(".hero-copy", { y: -150, x: 20, autoAlpha: 0.72 }, 0)
      .to(".oracle-panel", { y: -270, x: -54, scale: 0.94, autoAlpha: 0.86 }, 0)
      .to(".sigil-column", { y: -210, autoAlpha: 0.48 }, 0)
      .to(".scroll-meter", { y: -90, autoAlpha: 0.42 }, 0);

    return () => {
      document.documentElement.style.setProperty("--hero-progress", "0");
    };
  });

  scenes.forEach((scene) => {
    const bg = scene.querySelector(".scene-bg");
    const mist = scene.querySelector(".scene-mist");
    const cards = scene.querySelectorAll(".reveal-card");

    if (bg) {
      gsap.fromTo(
        bg,
        { yPercent: -9, xPercent: -2, scale: 1.08 },
        {
          yPercent: 9,
          xPercent: 3,
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    if (mist) {
      gsap.fromTo(
        mist,
        { yPercent: 18, xPercent: -8, scale: 1.06 },
        {
          yPercent: -36,
          xPercent: 9,
          scale: 1.24,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 58, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 98%",
            end: "top 70%",
            scrub: 0.7,
          },
        }
      );
    });
  });

  gsap.from(".review-card", {
    y: 70,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".review-section",
      start: "top 68%",
      toggleActions: "play none none reverse",
    },
  });

  ScrollTrigger.refresh();
}

if (hasGsap) {
  initGsapParallax();
} else {
  initRevealFallback();
}

if (!prefersReducedMotion) {
  initPointerDepth();
}

setFaction("choir");
setRelic("pyre");
