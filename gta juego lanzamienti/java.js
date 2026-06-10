let fechaObjetivo = new Date(2026, 11, 19);
let terminado = false;

function actualizar() {
  let ahora = new Date();
  let diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0 && !terminado) {
    document.getElementById("tiempo").textContent = "0d 0h 0m 0s";
    document.getElementById("lanzamiento").classList.add("apagada");

    alert(" ¡NO ESPERES MAS!");
    lanzarConfeti();

    terminado = true;
    return;
  }

  let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  let horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  let segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("tiempo").textContent =
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(actualizar, 1000);
actualizar();

function lanzarConfeti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let piezas = [];

  for (let i = 0; i < 150; i++) {
    piezas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 50
    });
  }

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    piezas.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
      ctx.fill();

      p.y += 2;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(dibujar);
  }

  dibujar();
}
