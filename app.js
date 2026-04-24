const SMALL_TRIANGLE_LEG = 105;
const LARGE_TRIANGLE_LEG = SMALL_TRIANGLE_LEG * 2;
const MEDIUM_TRIANGLE_LEG = Math.sqrt(2) * SMALL_TRIANGLE_LEG;

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
    info: 'The <strong class="accent-emphasis">creative environment</strong> emphasizes curiosity, problem finding, and flexible, original thinking.',
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
    label: "Intellectual",
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
    label: "Child",
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
const imageModal = document.getElementById("image-modal");
const imageModalCard = document.getElementById("image-modal-card");
const imageModalPreview = document.getElementById("image-modal-title");
const imageToggleLink = document.getElementById("image-toggle-link");
const homeLink = document.getElementById("home-link");
const closeImageModalButton = document.getElementById("close-image-modal");
const closeModalButton = document.getElementById("close-modal");
const resetButton = document.getElementById("reset-button");

let activeDrag = null;
let highestZ = 20;
let imageModalDrag = null;
let imageModalShowingHint = false;

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
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function openImageModal() {
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

function toggleImageModalHint() {
  imageModalShowingHint = !imageModalShowingHint;
  imageModalPreview.src = imageModalShowingHint ? "house-solve.png" : "house-solid.png";
  imageToggleLink.textContent = imageModalShowingHint ? "hide" : "hint";
}

function centerImageModalCard() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = Math.min(420, viewportWidth - 40);
  const cardHeight = Math.min(380, viewportHeight - 40);
  imageModalCard.style.left = `${Math.max(20, (viewportWidth - cardWidth) / 2)}px`;
  imageModalCard.style.top = `${Math.max(20, (viewportHeight - cardHeight) / 2)}px`;
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

function beginDrag(event, element, state) {
  const target = event.target;
  if (target.closest(".rotate-handle") || target.closest(".flip-handle")) {
    return;
  }

  const labelElement = element.querySelector(".piece-label");
  if (!isPointerOnVisibleShape(event, element, state) && !isPointerOnLabel(event, labelElement)) {
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

  activeDrag.element.classList.remove("dragging", "rotating");
  activeDrag = null;
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
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

homeLink.addEventListener("click", openImageModal);
closeImageModalButton.addEventListener("click", closeImageModal);
imageToggleLink.addEventListener("click", toggleImageModalHint);
imageModalCard.addEventListener("pointerdown", beginImageModalDrag);
document.addEventListener("pointermove", updateImageModalDrag);
document.addEventListener("pointerup", endImageModalDrag);
document.addEventListener("pointercancel", endImageModalDrag);
window.addEventListener("resize", () => {
  if (!imageModal.classList.contains("hidden") && !imageModalDrag) {
    centerImageModalCard();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeImageModal();
    endInteraction();
  }
});

resetButton.addEventListener("click", buildPieces);

buildPieces();
