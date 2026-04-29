const SMALL_TRIANGLE_LEG = 105;
const LARGE_TRIANGLE_LEG = SMALL_TRIANGLE_LEG * 2;
const MEDIUM_TRIANGLE_LEG = Math.sqrt(2) * SMALL_TRIANGLE_LEG;

const avatars = [
  {
    imageSrc: "katie.png",
    filename: "katie.png",
    colors: ["#98bdd2", "#4d88a8"],
    description: "Katie loves engaging deeply with complex, unconventional ideas, often drawing on strong verbal and conceptual thinking, and benefits from uninterrupted time to explore concepts in depth. She works best in focused environments where she can channel her energy independently or in small groups.",
    popupImageSolid: "cat-solid.png",
    popupImageHint: "cat-hint.png"
  },
  {
    imageSrc: "james.png",
    filename: "james.png",
    colors: ["#dfb2b6", "#c7858a"],
    description: "James thrives in intense, intellectually demanding environments and prefers sustained independent work or small, idea-driven groups with similar-ability peers. He engages deeply with abstract, logical problems in math and programming and benefits from precise feedback and opportunities to extend his analytical thinking.",
    popupImageSolid: "square-solid.png",
    popupImageHint: "square-hint.png"
  },
  {
    imageSrc: "alex.png",
    filename: "alex.png",
    colors: ["#b590c2", "#8c5e9f"],
    description: "Alex thrives in high-energy, fast-paced environments and works best in active, social settings. He engages through movement, performance, and interaction-often using physical and expressive strengths-and benefits from frequent participation and opportunities to learn through doing.",
    popupImageSolid: "dancer-solid.png",
    popupImageHint: "dancer-hint.png"
  },
  {
    imageSrc: "olivia.png",
    name: "Olivia",
    colors: ["#e7cd80", "#d2a637"],
    description: "Olivia engages through strong visual-spatial and naturalistic strengths, often drawn to imaginative, game-based tasks. She works best in calm, organized environments, preferring independent or low-conflict, structured groups, and benefits from clear expectations and predictable, self-paced work.",
    popupImageSolid: "tree-solid.png",
    popupImageHint: "tree-hint.png"
  }
];

const pieces = [
  {
    id: "physical",
    label: "Physical",
    tangramType: "Large Triangle",
    color: "#d76c49",
    width: LARGE_TRIANGLE_LEG,
    height: LARGE_TRIANGLE_LEG,
    points: `0,${LARGE_TRIANGLE_LEG} 0,0 ${LARGE_TRIANGLE_LEG},${LARGE_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">physical environment</strong> includes the tangible setting, space, materials, and sensory conditions that enable or constrain engagement.',
    learnMoreHref: "details/overview.html",
    labelX: 40,
    labelY: 60,
    x: 26,
    y: 54,
    rotation: -10
  },
  {
    id: "creative",
    label: "Creative",
    tangramType: "Large Triangle",
    color: "#4d88a8",
    width: LARGE_TRIANGLE_LEG,
    height: LARGE_TRIANGLE_LEG,
    points: `0,${LARGE_TRIANGLE_LEG} 0,0 ${LARGE_TRIANGLE_LEG},${LARGE_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">instructional environment</strong> focuses on methods, pacing, choices, and ways students can show what they know.',
    learnMoreHref: "details/overview.html",
    labelX: 40,
    labelY: 60,
    x: 268,
    y: 48,
    rotation: 16
  },
  {
    id: "emotional",
    label: "Emotional",
    tangramType: "Medium Triangle",
    color: "#8c5e9f",
    width: MEDIUM_TRIANGLE_LEG,
    height: MEDIUM_TRIANGLE_LEG,
    points: `0,${MEDIUM_TRIANGLE_LEG} 0,0 ${MEDIUM_TRIANGLE_LEG},${MEDIUM_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">emotional environment</strong> supports psychological safety, self-understanding, and resilience.',
    learnMoreHref: "details/overview.html",
    labelX: 38,
    labelY: 58,
    x: 564,
    y: 76,
    rotation: -14
  },
  {
    id: "social",
    label: "Social",
    tangramType: "Square",
    color: "#3e9b6b",
    width: SMALL_TRIANGLE_LEG,
    height: SMALL_TRIANGLE_LEG,
    points: `0,0 ${SMALL_TRIANGLE_LEG},0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG} 0,${SMALL_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">social environment</strong> involves relationships, collaboration, and a sense of belonging within a learning community.',
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 40,
    x: 78,
    y: 332,
    rotation: 7
  },
  {
    id: "academic",
    label: "Academic",
    tangramType: "Parallelogram",
    canFlip: true,
    color: "#d2a637",
    width: SMALL_TRIANGLE_LEG * 2,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} ${SMALL_TRIANGLE_LEG},0 ${SMALL_TRIANGLE_LEG * 2},0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">intellectual environment</strong> focuses on challenge, complexity, and opportunities to engage deeply with ideas.',
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 314,
    y: 336,
    rotation: -12
  },
  {
    id: "small-a",
    label: "Student",
    tangramType: "Small Triangle",
    color: "#c7858a",
    width: SMALL_TRIANGLE_LEG,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} 0,0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: "",
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 548,
    y: 348,
    rotation: 18
  },
  {
    id: "small-b",
    label: "Teacher",
    tangramType: "Small Triangle",
    color: "#6f8f95",
    width: SMALL_TRIANGLE_LEG,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} 0,0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: "",
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 700,
    y: 226,
    rotation: -22
  }
];

const board = document.getElementById("board");
const pieceTemplate = document.getElementById("piece-template");
const modal = document.getElementById("info-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalLink = document.getElementById("modal-link");
const introLink = document.getElementById("intro-link");
const introLearnMoreButton = document.getElementById("intro-learn-more-button");
const modalLinkCopy = document.getElementById("modal-link-copy");
const modalContinueCopy = document.getElementById("modal-continue-copy");
const modalContinueLink = document.getElementById("modal-continue-link");
const imageModal = document.getElementById("image-modal");
const imageModalCard = document.getElementById("image-modal-card");
const imageModalPreview = document.getElementById("image-modal-title");
const imageToggleLink = document.getElementById("image-toggle-link");
const avatarStrip = document.getElementById("avatar-strip");
const avatarModal = document.getElementById("avatar-modal");
const avatarModalCard = document.getElementById("avatar-modal-card");
const avatarModalPortrait = document.getElementById("avatar-modal-portrait");
const avatarModalTitle = document.getElementById("avatar-modal-title");
const avatarModalBody = document.getElementById("avatar-modal-body");
const avatarModalImageWrap = document.getElementById("avatar-modal-image-wrap");
const avatarModalImage = document.getElementById("avatar-modal-image");
const avatarImageToggleLink = document.getElementById("avatar-image-toggle-link");
const closeAvatarModalButton = document.getElementById("close-avatar-modal");
const homeLink = document.getElementById("home-link");
const closeImageModalButton = document.getElementById("close-image-modal");
const closeModalButton = document.getElementById("close-modal");
const resetButton = document.getElementById("reset-button");
const solveButton = document.getElementById("solve-button");
const solveOverlay = document.getElementById("solve-overlay");
const solveOverlayImage = document.getElementById("solve-overlay-image");
const moveStartSound = document.getElementById("move-start-sound");
const moveEndSound = document.getElementById("move-end-sound");
const resetSound = document.getElementById("reset-sound");
const solveSound = document.getElementById("solve-sound");
const missSound = document.getElementById("miss-sound");
const clickSound = new Audio("click.mp3");
const rotateSound = new Audio("block-drag.mp3");
moveStartSound.volume = 0.28;
moveEndSound.volume = 0.28;
resetSound.volume = 0.28;
solveSound.volume = 0.28;
missSound.volume = 0.28;
clickSound.preload = "auto";
clickSound.volume = 0.28;
rotateSound.preload = "auto";
rotateSound.volume = 0.12;

let activeDrag = null;
let highestZ = 20;
let imageModalDrag = null;
let imageModalShowingHint = false;
let avatarModalDrag = null;
let avatarModalShowingHint = false;
let activeAvatar = null;
let activeSolveImage = "";
let hasShownFirstSolveMessage = false;

function labelFromFilename(filename) {
  const stem = filename.replace(/\.[^.]+$/, "");
  return stem ? stem.charAt(0).toUpperCase() + stem.slice(1) : "";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function parsePoints(pointsText) {
  return pointsText.split(" ").map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });
}

function isPointInPolygon(point, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersects = ((yi > point.y) !== (yj > point.y))
      && (point.x < ((xj - xi) * (point.y - yi)) / ((yj - yi) || 0.00001) + xi);

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function isPointerOnVisibleShape(event, element, state) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const localX = event.clientX - rect.left;
  const localY = event.clientY - rect.top;
  const radians = -state.rotation * (Math.PI / 180);
  const dx = localX - centerX;
  const dy = localY - centerY;

  const unrotatedPoint = {
    x: dx * Math.cos(radians) - dy * Math.sin(radians) + centerX,
    y: dx * Math.sin(radians) + dy * Math.cos(radians) + centerY
  };

  if (state.flipped) {
    unrotatedPoint.x = (centerX * 2) - unrotatedPoint.x;
  }

  return isPointInPolygon(unrotatedPoint, state.piece.polygonPoints);
}

function isPointerOnLabel(event, labelElement) {
  if (!labelElement || !labelElement.textContent?.trim()) {
    return false;
  }

  const rect = labelElement.getBoundingClientRect();
  return event.clientX >= rect.left
    && event.clientX <= rect.right
    && event.clientY >= rect.top
    && event.clientY <= rect.bottom;
}

function normalizeDegrees(degrees) {
  let normalized = degrees % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

function applyPieceTransform(element, state) {
  element.style.left = `${state.x}px`;
  element.style.top = `${state.y}px`;
  element.style.setProperty("--rotation", `${state.rotation}deg`);
  element.style.setProperty("--flip-scale", state.flipped ? "-1" : "1");
  element.style.transform = `rotate(${state.rotation}deg)`;
}

function constrainPiece(state, element) {
  const boardRect = board.getBoundingClientRect();
  const size = element.getBoundingClientRect();
  state.x = clamp(state.x, 0, boardRect.width - size.width);
  state.y = clamp(state.y, 0, boardRect.height - size.height);
}

function bringToFront(element) {
  highestZ += 1;
  element.style.zIndex = String(highestZ);
}

function openModal(piece) {
  modalTitle.textContent = piece.label;
  modalBody.innerHTML = piece.info;
  modalLink.href = piece.learnMoreHref;
  modalLinkCopy.classList.remove("hidden");
  modalContinueCopy.classList.add("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function openOverviewWindow(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function openFirstSolveModal() {
  modalTitle.textContent = "Feeling frustrated?";
  modalBody.textContent = "Getting the five environments right for a student rarely happens immediately. It requires ongoing attention, adjustment, and persistence.";
  modalLinkCopy.classList.add("hidden");
  modalContinueCopy.classList.remove("hidden");
  modal.classList.remove("hidden");

  if (missSound) {
    missSound.currentTime = 0;
    missSound.play().catch(() => {});
  }
}

function showSolveOverlay(imageSrc) {
  activeSolveImage = imageSrc;
  solveOverlayImage.src = imageSrc;
  board.classList.add("showing-solution");
  solveOverlay.classList.remove("hidden");

  if (solveSound) {
    solveSound.currentTime = 0;
    solveSound.play().catch(() => {});
  }
}

function hideSolveOverlay() {
  activeSolveImage = "";
  board.classList.remove("showing-solution");
  solveOverlay.classList.add("hidden");
}

function deriveSolveImageFromSource(imageSrc) {
  if (!imageSrc) {
    return "";
  }

  return imageSrc.replace(/-solid\.(png|jpg|jpeg|gif)$/i, "-solve.$1");
}

function resetIfSolveTargetChanges(nextSolveImage) {
  if (activeSolveImage && nextSolveImage && activeSolveImage !== nextSolveImage) {
    buildPieces();
  }
}

function openImageModal() {
  resetIfSolveTargetChanges("house-solve.png");
  closeAvatarModal();
  imageModalShowingHint = false;
  imageModalPreview.src = "house-solid.png";
  imageToggleLink.textContent = "hint";
  centerImageModalCard();
  imageModal.classList.remove("hidden");
}

function closeImageModal() {
  imageModal.classList.add("hidden");
  imageModalCard.classList.remove("dragging");
  imageModalDrag = null;
}

function openAvatarModal(avatar) {
  resetIfSolveTargetChanges(deriveSolveImageFromSource(avatar.popupImageSolid));
  closeImageModal();
  activeAvatar = avatar;
  avatarModalShowingHint = false;
  avatarModalTitle.textContent = avatar.name;
  avatarModalBody.textContent = avatar.description;
  avatarModalPortrait.style.setProperty("--avatar-top", avatar.colors[0]);
  avatarModalPortrait.style.setProperty("--avatar-bottom", avatar.colors[1]);
  avatarModalPortrait.classList.toggle("avatar-image-backed", Boolean(avatar.imageSrc));
  avatarModalPortrait.style.setProperty("--avatar-image", avatar.imageSrc ? `url("${avatar.imageSrc}")` : "none");
  if (avatar.popupImageSolid) {
    avatarModalImageWrap.classList.remove("hidden");
    avatarModalImage.src = avatar.popupImageSolid;
    avatarImageToggleLink.textContent = "hint";
  } else {
    avatarModalImageWrap.classList.add("hidden");
  }
  centerAvatarModalCard();
  avatarModal.classList.remove("hidden");
}

function closeAvatarModal() {
  avatarModal.classList.add("hidden");
  avatarModalCard.classList.remove("dragging");
  avatarModalDrag = null;
  activeAvatar = null;
}

function getActiveSolveImage() {
  if (!imageModal.classList.contains("hidden")) {
    return "house-solve.png";
  }

  if (!avatarModal.classList.contains("hidden") && activeAvatar?.popupImageSolid) {
    return deriveSolveImageFromSource(activeAvatar.popupImageSolid);
  }

  return "";
}

function solveCurrentPattern() {
  const imageSrc = getActiveSolveImage();
  if (!imageSrc) {
    return;
  }

  if (!hasShownFirstSolveMessage) {
    hasShownFirstSolveMessage = true;
    openFirstSolveModal();
    return;
  }

  showSolveOverlay(imageSrc);
}

function toggleImageModalHint() {
  imageModalShowingHint = !imageModalShowingHint;
  imageModalPreview.src = imageModalShowingHint ? "house-hint.png" : "house-solid.png";
  imageToggleLink.textContent = imageModalShowingHint ? "hide" : "hint";
}

function toggleAvatarModalHint() {
  if (!activeAvatar?.popupImageSolid || !activeAvatar?.popupImageHint) {
    return;
  }

  avatarModalShowingHint = !avatarModalShowingHint;
  avatarModalImage.src = avatarModalShowingHint ? activeAvatar.popupImageHint : activeAvatar.popupImageSolid;
  avatarImageToggleLink.textContent = avatarModalShowingHint ? "hide" : "hint";
}

function centerImageModalCard() {
  const viewportHeight = window.innerHeight;
  const cardHeight = Math.min(260, viewportHeight - 40);
  imageModalCard.style.left = "44px";
  imageModalCard.style.top = `${Math.max(20, (viewportHeight - cardHeight) / 2)}px`;
}

function centerAvatarModalCard() {
  avatarModalCard.style.left = "44px";
  avatarModalCard.style.top = "56px";
}

function beginImageModalDrag(event) {
  if (event.target.closest(".modal-close") || event.target.closest(".image-toggle-link")) {
    return;
  }

  const rect = imageModalCard.getBoundingClientRect();
  imageModalDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };

  imageModalCard.classList.add("dragging");
  imageModalCard.setPointerCapture(event.pointerId);
}

function updateImageModalDrag(event) {
  if (!imageModalDrag || imageModalDrag.pointerId !== event.pointerId) {
    return;
  }

  const maxLeft = Math.max(20, window.innerWidth - imageModalCard.offsetWidth - 20);
  const maxTop = Math.max(20, window.innerHeight - imageModalCard.offsetHeight - 20);
  const left = clamp(event.clientX - imageModalDrag.offsetX, 20, maxLeft);
  const top = clamp(event.clientY - imageModalDrag.offsetY, 20, maxTop);

  imageModalCard.style.left = `${left}px`;
  imageModalCard.style.top = `${top}px`;
}

function endImageModalDrag(event) {
  if (!imageModalDrag || (event && imageModalDrag.pointerId !== event.pointerId)) {
    return;
  }

  imageModalCard.classList.remove("dragging");
  imageModalDrag = null;
}

function beginAvatarModalDrag(event) {
  if (event.target.closest(".modal-close") || event.target.closest(".avatar-image-toggle-link")) {
    return;
  }

  const rect = avatarModalCard.getBoundingClientRect();
  avatarModalDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };

  avatarModalCard.classList.add("dragging");
  avatarModalCard.setPointerCapture(event.pointerId);
}

function updateAvatarModalDrag(event) {
  if (!avatarModalDrag || avatarModalDrag.pointerId !== event.pointerId) {
    return;
  }

  const maxLeft = Math.max(20, window.innerWidth - avatarModalCard.offsetWidth - 20);
  const maxTop = Math.max(20, window.innerHeight - avatarModalCard.offsetHeight - 20);
  const left = clamp(event.clientX - avatarModalDrag.offsetX, 20, maxLeft);
  const top = clamp(event.clientY - avatarModalDrag.offsetY, 20, maxTop);

  avatarModalCard.style.left = `${left}px`;
  avatarModalCard.style.top = `${top}px`;
}

function endAvatarModalDrag(event) {
  if (!avatarModalDrag || (event && avatarModalDrag.pointerId !== event.pointerId)) {
    return;
  }

  avatarModalCard.classList.remove("dragging");
  avatarModalDrag = null;
}

function buildAvatarStrip() {
  avatars.forEach((avatar) => {
    avatar.name = avatar.filename ? labelFromFilename(avatar.filename) : avatar.name;

    const chip = document.createElement("div");
    chip.className = "avatar-chip";

    const portrait = document.createElement("div");
    portrait.className = "avatar-portrait";
    portrait.style.setProperty("--avatar-top", avatar.colors[0]);
    portrait.style.setProperty("--avatar-bottom", avatar.colors[1]);
    portrait.classList.toggle("avatar-image-backed", Boolean(avatar.imageSrc));
    portrait.style.setProperty("--avatar-image", avatar.imageSrc ? `url("${avatar.imageSrc}")` : "none");

    const nameButton = document.createElement("button");
    nameButton.className = "avatar-name";
    nameButton.type = "button";
    nameButton.textContent = avatar.name;
    nameButton.addEventListener("click", () => {
      playClickSound();
      openAvatarModal(avatar);
    });

    chip.appendChild(portrait);
    chip.appendChild(nameButton);
    avatarStrip.appendChild(chip);
  });
}

function beginDrag(event, element, state) {
  const target = event.target;
  if (target.closest(".rotate-handle") || target.closest(".flip-handle")) {
    return;
  }

  const rect = element.getBoundingClientRect();
  activeDrag = {
    mode: "move",
    element,
    state,
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };

  element.classList.add("dragging");
  bringToFront(element);
  element.setPointerCapture(event.pointerId);

  if (moveStartSound) {
    moveStartSound.currentTime = 0;
    moveStartSound.play().catch(() => {});
  }
}

function beginRotate(event, element, state) {
  event.stopPropagation();

  const boardRect = board.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  const centerX = rect.left - boardRect.left + rect.width / 2;
  const centerY = rect.top - boardRect.top + rect.height / 2;
  const angle = Math.atan2(event.clientY - boardRect.top - centerY, event.clientX - boardRect.left - centerX);

  activeDrag = {
    mode: "rotate",
    element,
    state,
    pointerId: event.pointerId,
    centerX,
    centerY,
    startPointerAngle: angle,
    startRotation: state.rotation
  };

  element.classList.add("rotating");
  bringToFront(element);
  element.setPointerCapture(event.pointerId);

  if (rotateSound) {
    rotateSound.loop = true;
    rotateSound.currentTime = 0;
    rotateSound.play().catch(() => {});
  }
}

function updateMove(event) {
  const { element, state, offsetX, offsetY } = activeDrag;
  const boardRect = board.getBoundingClientRect();
  state.x = event.clientX - boardRect.left - offsetX;
  state.y = event.clientY - boardRect.top - offsetY;
  constrainPiece(state, element);
  applyPieceTransform(element, state);
}

function updateRotate(event) {
  const { state, centerX, centerY, startPointerAngle, startRotation } = activeDrag;
  const boardRect = board.getBoundingClientRect();
  const currentAngle = Math.atan2(event.clientY - boardRect.top - centerY, event.clientX - boardRect.left - centerX);
  const deltaDegrees = (currentAngle - startPointerAngle) * (180 / Math.PI);
  state.rotation = Math.round(normalizeDegrees(startRotation + deltaDegrees));
  applyPieceTransform(activeDrag.element, state);
}

function endInteraction() {
  if (!activeDrag) {
    return;
  }

  const wasMove = activeDrag.mode === "move";
  const wasRotate = activeDrag.mode === "rotate";
  activeDrag.element.classList.remove("dragging", "rotating");
  activeDrag = null;

  if (wasMove && moveEndSound) {
    moveEndSound.currentTime = 0;
    moveEndSound.play().catch(() => {});
  }

  if (wasRotate && rotateSound) {
    rotateSound.pause();
    rotateSound.currentTime = 0;
  }
}

function createPiece(piece) {
  const fragment = pieceTemplate.content.cloneNode(true);
  const element = fragment.querySelector(".piece");
  const polygon = fragment.querySelector(".piece-polygon");
  const svg = fragment.querySelector(".piece-svg");
  const label = fragment.querySelector(".piece-label");
  const rotateHandle = fragment.querySelector(".rotate-handle");
  const flipHandle = fragment.querySelector(".flip-handle");

  polygon.setAttribute("points", piece.points);
  polygon.setAttribute("fill", piece.color);
  svg.setAttribute("viewBox", `0 0 ${piece.width} ${piece.height}`);
  label.textContent = piece.label;
  element.dataset.id = piece.id;
  piece.polygonPoints = parsePoints(piece.points);
  element.style.width = `${piece.width}px`;
  element.style.height = `${piece.height}px`;
  element.style.setProperty("--label-width", `${Math.max(56, piece.width - 18)}px`);
  element.style.setProperty("--label-x", `${piece.labelX ?? 50}%`);
  element.style.setProperty("--label-y", `${piece.labelY ?? 50}%`);

  const state = {
    piece,
    x: piece.x,
    y: piece.y,
    rotation: piece.rotation,
    flipped: false
  };

  applyPieceTransform(element, state);

  element.addEventListener("pointerdown", (event) => beginDrag(event, element, state));
  if (rotateHandle) {
    rotateHandle.addEventListener("pointerdown", (event) => beginRotate(event, element, state));
  }

  if (piece.canFlip && flipHandle) {
    flipHandle.addEventListener("click", (event) => {
      event.stopPropagation();
      state.flipped = !state.flipped;
      applyPieceTransform(element, state);
    });
  } else {
    element.classList.add("piece-no-flip");
    if (flipHandle) {
      flipHandle.disabled = true;
    }
  }

  if (!piece.label) {
    element.classList.add("piece-no-label");
  }

  board.appendChild(fragment);
}

function buildPieces() {
  board.querySelectorAll(".piece").forEach((node) => node.remove());
  hideSolveOverlay();
  closeModal();
  highestZ = 20;
  pieces.forEach(createPiece);
}

document.addEventListener("pointermove", (event) => {
  if (!activeDrag || activeDrag.pointerId !== event.pointerId) {
    return;
  }

  if (activeDrag.mode === "move") {
    updateMove(event);
    return;
  }

  updateRotate(event);
});

document.addEventListener("pointerup", endInteraction);
document.addEventListener("pointercancel", endInteraction);
document.addEventListener("lostpointercapture", endInteraction, true);

closeModalButton.addEventListener("click", closeModal);
introLink.addEventListener("click", (event) => {
  event.preventDefault();
  playClickSound();
  openOverviewWindow(event.currentTarget.href);
});
introLearnMoreButton.addEventListener("click", () => {
  playClickSound();
  openOverviewWindow("details/overview.html");
});
modalLink.addEventListener("click", (event) => {
  event.preventDefault();
  playClickSound();
  openOverviewWindow(event.currentTarget.href);
});
modalContinueLink.addEventListener("click", (event) => {
  event.preventDefault();
  playClickSound();
  closeModal();
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

if (homeLink) {
  homeLink.addEventListener("click", openImageModal);
}
closeImageModalButton.addEventListener("click", closeImageModal);
imageToggleLink.addEventListener("click", (event) => {
  playClickSound();
  toggleImageModalHint(event);
});
imageModalCard.addEventListener("pointerdown", beginImageModalDrag);
closeAvatarModalButton.addEventListener("click", closeAvatarModal);
avatarImageToggleLink.addEventListener("click", (event) => {
  playClickSound();
  toggleAvatarModalHint(event);
});
avatarModalCard.addEventListener("pointerdown", beginAvatarModalDrag);
document.addEventListener("pointermove", updateImageModalDrag);
document.addEventListener("pointerup", endImageModalDrag);
document.addEventListener("pointercancel", endImageModalDrag);
document.addEventListener("pointermove", updateAvatarModalDrag);
document.addEventListener("pointerup", endAvatarModalDrag);
document.addEventListener("pointercancel", endAvatarModalDrag);
window.addEventListener("resize", () => {
  if (!imageModal.classList.contains("hidden") && !imageModalDrag) {
    centerImageModalCard();
  }
  if (!avatarModal.classList.contains("hidden") && !avatarModalDrag) {
    centerAvatarModalCard();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeImageModal();
    closeAvatarModal();
    endInteraction();
  }
});

resetButton.addEventListener("click", () => {
  if (resetSound) {
    resetSound.currentTime = 0;
    resetSound.play().catch(() => {});
  }
  buildPieces();
});
solveButton.addEventListener("click", solveCurrentPattern);

buildAvatarStrip();
buildPieces();
