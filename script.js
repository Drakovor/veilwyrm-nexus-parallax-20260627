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
const descentSection = document.getElementById("descent");
const pilgrimageSection = document.getElementById("pilgrimage");
const walkNodes = [...document.querySelectorAll(".walk-node")];
const pilgrimageNodes = [...document.querySelectorAll(".pilgrimage-node")];
const scenes = [...document.querySelectorAll(".parallax-scene")];
const railLinks = [...document.querySelectorAll(".rail-link")];
const commandSection = document.getElementById("command");
const reviewSection = document.getElementById("review");
const factionTabs = [...document.querySelectorAll(".faction-tab")];
const relicTabs = [...document.querySelectorAll(".relic-tab")];
const modeTabs = [...document.querySelectorAll(".mode-tab")];
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
const modeTitle = document.getElementById("mode-title");
const modeText = document.getElementById("mode-text");
const modeKickerA = document.getElementById("mode-kicker-a");
const modeValueA = document.getElementById("mode-value-a");
const modeKickerB = document.getElementById("mode-kicker-b");
const modeValueB = document.getElementById("mode-value-b");
const missionList = document.querySelector(".mission-list");
const pulseTrack = document.querySelector(".pulse-track");
const arcSteps = [...document.querySelectorAll(".arc-step")];
const commandPhases = [...document.querySelectorAll(".command-phase")];
const pilgrimageTitle = document.getElementById("pilgrimage-title");
const pilgrimageText = document.getElementById("pilgrimage-text");
const pilgrimageKickerA = document.getElementById("pilgrimage-kicker-a");
const pilgrimageValueA = document.getElementById("pilgrimage-value-a");
const pilgrimageKickerB = document.getElementById("pilgrimage-kicker-b");
const pilgrimageValueB = document.getElementById("pilgrimage-value-b");
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

const modeData = {
  solo: {
    title: "Solo Arc",
    text: "Personal exploration leans into puzzles, reputation routes, secret relics, and private progression that still matters when the whole community wakes up.",
    kickerA: "Primary Loop",
    valueA: "Puzzle Hunts",
    kickerB: "Best For",
    valueB: "Off-stream nights",
    missions: [
      {
        type: "Prediction",
        title: "Guess the next cathedral rupture",
        text: "Players commit to a prophecy lane before the next live event reshapes the map.",
      },
      {
        type: "Creative Trial",
        title: "Design a house sigil mutation",
        text: "Entries earn favor, unlock cosmetics, and can become canon to the current season.",
      },
      {
        type: "Faction Raid",
        title: "Recover a relic shard before rivals do",
        text: "Shared progress pulls the whole faction closer to a timed server-wide reveal.",
      },
    ],
    pulses: [
      "Profile and faction standing persist between sessions.",
      "Private discoveries add hidden leverage before the public chapter turns.",
      "Solo progress becomes proof of devotion when the world opens wider.",
    ],
    activeStep: "solo",
  },
  cabal: {
    title: "Faction Cabal",
    text: "This layer is where the product becomes social: houses coordinate raids, defend theories, and build long-running identities that outsiders can instantly read.",
    kickerA: "Primary Loop",
    valueA: "House Missions",
    kickerB: "Best For",
    valueB: "Community loyalty",
    missions: [
      {
        type: "Council Vote",
        title: "Choose the next rival house to sabotage",
        text: "Each vote changes which narrative lane gets blocked, weakened, or opened next.",
      },
      {
        type: "Creative Canon",
        title: "Forge a faction banner for the season",
        text: "Winning visuals enter the world permanently and raise the house prestige score.",
      },
      {
        type: "Co-op Trial",
        title: "Decode a split prophecy in teams",
        text: "Fragments are distributed across members so cooperation becomes the mechanic, not just the theme.",
      },
    ],
    pulses: [
      "Faction reputation becomes a public ladder outsiders can follow at a glance.",
      "Long-term group choices decide which relic pools and endings stay available.",
      "Collective wins give the stream real stakes before it even starts.",
    ],
    activeStep: "cabal",
  },
  live: {
    title: "Live Pulse",
    text: "When broadcast starts, stored allegiance, missions, and predictions ignite into visible outcomes so the stream feels like a climax instead of the whole product.",
    kickerA: "Primary Loop",
    valueA: "World Events",
    kickerB: "Best For",
    valueB: "Peak participation",
    missions: [
      {
        type: "Vote Storm",
        title: "Trigger a route split in real time",
        text: "Crowd choices can punish a faction, unlock a chamber, or alter the ritual path on stage.",
      },
      {
        type: "Relic Drop",
        title: "Spend stored favor for a one-night advantage",
        text: "Off-stream reputation cashes out into handicaps, boosts, and rare interactive moments.",
      },
      {
        type: "Canon Shock",
        title: "Crown one community creation as official",
        text: "The most active contributors can reshape what the audience sees next across the whole experience.",
      },
    ],
    pulses: [
      "Broadcast moments inherit weight from everything players already did.",
      "Live decisions resolve rivalries that were built off-stream, not invented on the spot.",
      "The outside viewer finally sees a world with memory, consequences, and factions already in motion.",
    ],
    activeStep: "live",
  },
};

const pilgrimageData = {
  profile: {
    title: "Join As More Than A Viewer",
    text: "The full product starts before the stream: outsiders arrive through visual intrigue, then discover a profile loop, faction identity, reputation economy, and live consequences waiting underneath.",
    kickerA: "Current Layer",
    valueA: "Profile Oath",
    kickerB: "Why It Hooks",
    valueB: "Curiosity becomes identity",
  },
  faction: {
    title: "Faction Choice Gives The World Shape",
    text: "Houses make the project legible fast. They create belonging, rivalry, aesthetics, and a reason for players to return even when nothing is airing live.",
    kickerA: "Current Layer",
    valueA: "Faction Bond",
    kickerB: "Why It Hooks",
    valueB: "Belonging becomes tension",
  },
  reputation: {
    title: "Reputation Turns Mystery Into Progression",
    text: "Predictions, creative canon, puzzles, and raids become a visible status fabric that outsiders can understand and insiders can fight to improve.",
    kickerA: "Current Layer",
    valueA: "Reputation Weave",
    kickerB: "Why It Hooks",
    valueB: "Contribution becomes power",
  },
  live: {
    title: "Live Events Cash Out Stored Meaning",
    text: "When broadcast begins, the stream inherits everything players already did. Votes, sabotage, boosts, routes, and canon shocks finally hit the stage.",
    kickerA: "Current Layer",
    valueA: "Live Reckoning",
    kickerB: "Why It Hooks",
    valueB: "Memory becomes spectacle",
  },
};

let currentMode = "";
let currentPilgrimage = "";

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

function setMode(key) {
  const item = modeData[key];
  if (!item || !modeTitle || !modeText || !missionList || !pulseTrack) {
    return;
  }

  if (currentMode === key) {
    return;
  }

  currentMode = key;

  modeTitle.textContent = item.title;
  modeText.textContent = item.text;
  modeKickerA.textContent = item.kickerA;
  modeValueA.textContent = item.valueA;
  modeKickerB.textContent = item.kickerB;
  modeValueB.textContent = item.valueB;

  missionList.innerHTML = item.missions
    .map(
      (mission) => `
        <article class="mission-item">
          <span class="mission-type">${mission.type}</span>
          <h4>${mission.title}</h4>
          <p>${mission.text}</p>
        </article>
      `
    )
    .join("");

  pulseTrack.innerHTML = item.pulses
    .map(
      (pulse, index) => `
        <article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${pulse}</p>
        </article>
      `
    )
    .join("");

  modeTabs.forEach((tab) => {
    const isActive = tab.dataset.mode === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  arcSteps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.step === item.activeStep);
  });

  commandPhases.forEach((phase) => {
    phase.classList.toggle("is-active", phase.dataset.phase === key);
  });
}

function setPilgrimage(key) {
  const item = pilgrimageData[key];
  if (!item || !pilgrimageTitle || !pilgrimageText) {
    return;
  }

  if (currentPilgrimage === key) {
    return;
  }

  currentPilgrimage = key;
  pilgrimageTitle.textContent = item.title;
  pilgrimageText.textContent = item.text;
  pilgrimageKickerA.textContent = item.kickerA;
  pilgrimageValueA.textContent = item.valueA;
  pilgrimageKickerB.textContent = item.kickerB;
  pilgrimageValueB.textContent = item.valueB;

  pilgrimageNodes.forEach((node) => {
    node.classList.toggle("is-active", node.dataset.pilgrimage === key);
  });
}

factionTabs.forEach((tab) => {
  tab.addEventListener("click", () => setFaction(tab.dataset.faction));
});

relicTabs.forEach((tab) => {
  tab.addEventListener("click", () => setRelic(tab.dataset.relic));
});

modeTabs.forEach((tab) => {
  tab.setAttribute("aria-selected", String(tab.classList.contains("is-active")));
  tab.addEventListener("click", () => setMode(tab.dataset.mode));
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

  [heroZone, descentSection, ...scenes, pilgrimageSection, commandSection, reviewSection].filter(Boolean).forEach((section) => {
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

    document.documentElement.style.setProperty("--pointer-x", `${50 + currentX * 12}%`);
    document.documentElement.style.setProperty("--pointer-y", `${38 + currentY * 9}%`);

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
        snap: {
          snapTo: [0, 0.18, 0.42, 0.68, 1],
          duration: { min: 0.18, max: 0.5 },
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

    if (descentSection && walkNodes.length) {
      const descentTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: descentSection,
          start: "top top",
          end: "+=240%",
          pin: ".descent-stage",
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.25, 0.5, 0.75, 1],
            duration: { min: 0.2, max: 0.55 },
          },
        },
      });

      walkNodes.forEach((node, index) => {
        gsap.set(node, {
          "--node-z": "-1400px",
          "--node-tilt": "18deg",
          "--node-scale": 0.72,
          "--node-opacity": 0,
        });

        const start = index * 0.22;
        descentTimeline
          .to(
            node,
            {
              "--node-z": "-180px",
              "--node-tilt": "6deg",
              "--node-scale": 0.92,
              "--node-opacity": 1,
            },
            start
          )
          .to(
            node,
            {
              "--node-z": "520px",
              "--node-tilt": "-8deg",
              "--node-scale": 1.16,
              "--node-opacity": 0,
            },
            start + 0.18
          );
      });
    }

    if (pilgrimageSection && pilgrimageNodes.length) {
      const pilgrimageKeys = pilgrimageNodes.map((node) => node.dataset.pilgrimage).filter(Boolean);
      const pilgrimageTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pilgrimageSection,
          start: "top top",
          end: "+=230%",
          pin: ".pilgrimage-stage",
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.33, 0.66, 1],
            duration: { min: 0.18, max: 0.45 },
          },
          onUpdate: (self) => {
            const index = Math.min(
              pilgrimageKeys.length - 1,
              Math.round(self.progress * (pilgrimageKeys.length - 1))
            );
            setPilgrimage(pilgrimageKeys[index]);
          },
        },
      });

      pilgrimageTimeline
        .fromTo(".pilgrimage-core", { yPercent: 14, scale: 0.92 }, { yPercent: -8, scale: 1.04 }, 0)
        .fromTo(".orb-ring-a", { rotate: 0, scale: 0.56 }, { rotate: 90, scale: 0.68 }, 0)
        .fromTo(".orb-ring-b", { rotate: 22, scale: 0.84 }, { rotate: 132, scale: 0.98 }, 0)
        .fromTo(".orb-ring-c", { rotate: -18, scale: 1.08 }, { rotate: 82, scale: 1.18 }, 0)
        .fromTo(".pilgrimage-node:nth-child(1)", { xPercent: -16, yPercent: -10, rotateY: 14 }, { xPercent: 10, yPercent: 10, rotateY: -8 }, 0)
        .fromTo(".pilgrimage-node:nth-child(2)", { xPercent: 16, yPercent: -10, rotateY: -14 }, { xPercent: -10, yPercent: 10, rotateY: 8 }, 0)
        .fromTo(".pilgrimage-node:nth-child(3)", { xPercent: -12, yPercent: 12, rotateY: 10 }, { xPercent: 12, yPercent: -10, rotateY: -8 }, 0)
        .fromTo(".pilgrimage-node:nth-child(4)", { xPercent: 12, yPercent: 12, rotateY: -10 }, { xPercent: -12, yPercent: -10, rotateY: 8 }, 0)
        .fromTo(".pilgrimage-ledger", { yPercent: 18, autoAlpha: 0.6 }, { yPercent: -12, autoAlpha: 1 }, 0);
    }

    if (commandSection) {
      const commandKeys = Object.keys(modeData);
      const commandTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: commandSection,
          start: "top top",
          end: "+=230%",
          pin: ".command-stage",
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.18, max: 0.42 },
          },
          onUpdate: (self) => {
            document.documentElement.style.setProperty("--command-progress", self.progress.toFixed(4));
            const index = Math.min(commandKeys.length - 1, Math.round(self.progress * (commandKeys.length - 1)));
            setMode(commandKeys[index]);
          },
        },
      });

      commandTimeline
        .fromTo(".command-ledger", { yPercent: 10, xPercent: -4 }, { yPercent: -8, xPercent: 3 }, 0)
        .fromTo(".command-shell", { yPercent: 12 }, { yPercent: -6 }, 0)
        .fromTo(".command-phase", { x: -14, autoAlpha: 0.45 }, { x: 0, autoAlpha: 1, stagger: 0.06 }, 0.05)
        .fromTo(".progression-arc", { yPercent: 16 }, { yPercent: -6 }, 0.16)
        .fromTo(".command-panel", { rotateX: -4, yPercent: 10 }, { rotateX: 2, yPercent: -10, stagger: 0.08 }, 0.08);
    }

    return () => {
      document.documentElement.style.setProperty("--hero-progress", "0");
      document.documentElement.style.setProperty("--command-progress", "0");
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
setPilgrimage("profile");
setMode("solo");
