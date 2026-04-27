const specimenData = {
  scenes: {
    kicker: "Scenes & Maps",
    title: "Backdrops for village-scale interfaces",
    copy: "Use wide scenes for first-viewport atmosphere, map backgrounds for operational dashboards, and controls or markers for location-aware panels.",
    image: "../src/assets/orchard-vale/scenes/wide-16x9/scene-orchard-vale-village-wide-16x9.webp"
  },
  frames: {
    kicker: "Frames & Panels",
    title: "Reusable structure for cards, rails, and controls",
    copy: "Backplates, ribbons, corners, rivets, and dividers form the Orchard Vale layout language without forcing every screen into a fantasy illustration.",
    image: "../src/assets/orchard-vale/backplates/backplates-contact-sheet.png"
  },
  heraldry: {
    kicker: "Heraldry",
    title: "Marks for identity, status, and authority",
    copy: "Crests work well for app identity and departments; seals work well for approval states, review status, urgency, and trust moments.",
    image: "../src/assets/orchard-vale/heraldry/heraldry-contact-sheet.png"
  },
  icons: {
    kicker: "Icons & Motifs",
    title: "Small symbols for product actions and domains",
    copy: "Use 32px icons for controls and status. Use 96px motifs for richer cards, empty-state accents, feature categories, and navigation groups.",
    image: "../src/assets/orchard-vale/motifs/motifs-contact-sheet.png"
  },
  data: {
    kicker: "Data Visualization",
    title: "Dashboard parts with a handcrafted finish",
    copy: "These assets frame data without replacing it. Pair SVG ornaments with semantic HTML, CSS charts, canvas, or real chart libraries.",
    image: "../src/assets/orchard-vale/data-viz/data-viz-contact-sheet.png"
  },
  textures: {
    kicker: "Textures",
    title: "Material surfaces for the whole theme",
    copy: "Layer paper, wood, brass, and signboard textures under restrained color overlays so screens stay readable but never flat.",
    image: "../src/assets/orchard-vale/textures/texture-contact-sheet.png"
  },
  recipes: {
    kicker: "UI Recipes",
    title: "Composed components for front-end screens",
    copy: "These are small examples of how the asset families combine into notices, metrics, task cards, empty states, and dashboard modules.",
    image: "../src/assets/orchard-vale/empty-states/empty-states-contact-sheet.png"
  }
};

const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const specimenKicker = document.querySelector("#specimen-kicker");
const specimenTitle = document.querySelector("#specimen-title");
const specimenCopy = document.querySelector("#specimen-copy");
const specimenImage = document.querySelector("#specimen-image");
const specimenViewer = document.querySelector(".specimen-viewer");
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const placeholderImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function selectTab(tabId) {
  const data = specimenData[tabId];
  if (!data) return;

  tabButtons.forEach((button) => {
    const selected = button.dataset.tab === tabId;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    const selected = panel.dataset.panel === tabId;
    panel.hidden = !selected;
    panel.classList.toggle("is-active", selected);
  });

  specimenKicker.textContent = data.kicker;
  specimenTitle.textContent = data.title;
  specimenCopy.textContent = data.copy;
  specimenImage.src = data.image;
  specimenImage.alt = `${data.kicker} preview`;
  specimenViewer.scrollTo({ top: 0, left: 0 });
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectTab(button.dataset.tab));
  button.addEventListener("keydown", (event) => {
    const currentIndex = tabButtons.indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabButtons.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabButtons.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      tabButtons[nextIndex].focus();
      selectTab(tabButtons[nextIndex].dataset.tab);
    }
  });

  button.tabIndex = index === 0 ? 0 : -1;
});

function getImageCaption(image) {
  const cardTitle = image.closest("article")?.querySelector("h3")?.textContent;
  return cardTitle || image.alt || "Orchard Vale asset preview";
}

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "";
  lightboxCaption.textContent = getImageCaption(image);
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = placeholderImage;
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".tab-panels img, #specimen-image").forEach((image) => {
  image.classList.add("zoomable-image");
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Open larger preview: ${getImageCaption(image)}`);
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});
