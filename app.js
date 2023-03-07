const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector("#color")
const colorOption = Array.from(document.getElementsByClassName("color-option"));

const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);

lineWidth.addEventListener("change", changeLineWidth);
color.addEventListener("change", changeColor);
colorOption.forEach((color) => color.addEventListener("click", changeColorOption));