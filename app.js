const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector("#color")
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const imgInput = document.querySelector("#img-file");
const textInput = document.querySelector("#text");
const saveBtn = document.querySelector("#save-image");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function endPainting() {
  isPainting = false;
}

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

function changeColor(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function changeColorOption(event) {
  const colorSelect = event.target.dataset.color;
  ctx.strokeStyle = colorSelect;
  ctx.fillStyle = colorSelect;
  color.value = colorSelect;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
  console.log(isFilling);
}

function changMode() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyBtnClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserBtnClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    imgInput.value = null;
  }
}

function onDoubleClick(event) {
  console.dir(event.target);
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text === "") {
  }
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "48px serif"
  ctx.strokeText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);
canvas.addEventListener("click", changMode);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", changeLineWidth);
color.addEventListener("change", changeColor);
colorOption.forEach((color) => color.addEventListener("click", changeColorOption));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyBtnClick);
eraserBtn.addEventListener("click", onEraserBtnClick);
imgInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
