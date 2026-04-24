const SMALL_TRIANGLE_LEG = 84;
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
    x: 38,
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
    x: 248,
    y: 58,
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
    x: 514,
    y: 98,
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
    x: 174,
    y: 314,
    rotation: 7
  },
  {
    id: "academic",
    label: "Intellectual",
    tangramType: "Parallelogram",
    color: "#d2a637",
    width: SMALL_TRIANGLE_LEG * 2,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} ${SMALL_TRIANGLE_LEG},0 ${SMALL_TRIANGLE_LEG * 2},0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: 'The <strong class="accent-emphasis">intellectual environment</strong> focuses on challenge, complexity, and opportunities to engage deeply with ideas.',
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 338,
    y: 300,
    rotation: -12
  },
  {
    id: "small-a",
    label: "",
    tangramType: "Small Triangle",
    color: "#c7858a",
    width: SMALL_TRIANGLE_LEG,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} 0,0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: "",
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 566,
    y: 286,
    rotation: 18
  },
  {
    id: "small-b",
    label: "",
    tangramType: "Small Triangle",
    color: "#6f8f95",
    width: SMALL_TRIANGLE_LEG,
    height: SMALL_TRIANGLE_LEG,
    points: `0,${SMALL_TRIANGLE_LEG} 0,0 ${SMALL_TRIANGLE_LEG},${SMALL_TRIANGLE_LEG}`,
    info: "",
    learnMoreHref: "details/overview.html",
    labelX: 50,
    labelY: 42,
    x: 642,
    y: 212,
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
const homeLink = document.getElementById("home-link");
const closeImageModalButton = document.getElementById("close-image-modal");
const closeModalButton = document.getElementById("close-modal");
const resetButton = document.getElementById("reset-button");

let activeDrag = null;
let highestZ = 20;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
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
  imageModal.classList.remove("hidden");
}

function closeImageModal() {
  imageModal.classList.add("hidden");
}

function beginDrag(event, element, state) {
  const target = event.target;
  if (target.closest(".info-button") || target.closest(".rotate-handle")) {
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
  const infoButton = fragment.querySelector(".info-button");
  const rotateHandle = fragment.querySelector(".rotate-handle");

  polygon.setAttribute("points", piece.points);
  polygon.setAttribute("fill", piece.color);
  svg.setAttribute("viewBox", `0 0 ${piece.width} ${piece.height}`);
  label.textContent = piece.label;
  element.dataset.id = piece.id;
  element.style.width = `${piece.width}px`;
  element.style.height = `${piece.height}px`;
  element.style.setProperty("--label-width", `${Math.max(56, piece.width - 18)}px`);
  element.style.setProperty("--label-x", `${piece.labelX ?? 50}%`);
  element.style.setProperty("--label-y", `${piece.labelY ?? 50}%`);

  const state = {
    x: piece.x,
    y: piece.y,
    rotation: piece.rotation
  };

  applyPieceTransform(element, state);

  element.addEventListener("pointerdown", (event) => beginDrag(event, element, state));
  rotateHandle.addEventListener("pointerdown", (event) => beginRotate(event, element, state));
  if (piece.info) {
    infoButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(piece);
    });
  } else {
    element.classList.add("piece-no-info");
    infoButton.disabled = true;
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
imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
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
