let arco = document.getElementById('juego'),
    informacion = document.getElementById('informacion'),
    menu = document.getElementById('menu'),
    mensaje = document.getElementById('mens'),
    reiniciar = document.getElementById('reset'),
    btnJugar = document.getElementById('jugar'),
    img0 = document.getElementById('img_0'),
    img1 = document.getElementById('img_1'),
    img2 = document.getElementById('img_2'),
    colsMarcador = document.getElementById('colsMarcador'),
    btnJuegos = document.getElementById('btnJuego'),
    marca = document.getElementById('marcador'),
    atajadas = document.getElementById('atajadas'),
    goles = 0;
    ataja = 0;
    contadorTiros = 1,
    contadorAtajadas = 1,
    tiros = 5,
    bol = true,
    ganar = document.getElementById('ganastes');
   
mensajeInfo('dispara');

for(let btn of btnJuegos.children){
  btn.addEventListener('click', ()=> {
    disparo(btn.id);
  });
}

colsMarcador.setAttribute('colspan', tiros + 1);
for (let x = 1; x <= tiros; x++) {
  marca.insertAdjacentHTML('beforeend', `<td id="item${x}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg></td>`);
  atajadas.insertAdjacentHTML('beforeend', `<td id="itemA${x}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg></td>`);
}

reiniciar.addEventListener('click', ()=>{
  location. reload();
});

btnJugar.addEventListener('click', e => {
  e.target.parentElement.setAttribute('hidden', '');
  informacion.removeAttribute('hidden');

  setTimeout(()=>{
    informacion.setAttribute('hidden', '');
    arco.removeAttribute('hidden');
  }, 5000);
});

function limpiar() {
  img0.src = "img/arco.png";
  img1.src = "img/arco.png";
  img2.src = "img/arco.png";
}
function arquero_centro() {
  img0.src = "img/arco.png";
  img1.src = "img/gk.png";
  img2.src = "img/arco.png";
}
function recargar() {
  arquero_centro();
  mensajeInfo('dispara');
}
function ganarSiempre(rand, num, info){
  if (info) {
    if ( (num == 0 && rand == num) || (num == 1 && rand == num)) {
      return ++rand;
    }
    else if (num == 2 && rand == num) {
      return --rand;
    } 
  }else{
    return num;
  }
  return rand;
}
function btnDes(e){
  for(let btn of btnJuegos.children){
    e == true ? btn.disabled = true: btn.disabled = false;
  }
}
function marcador(mark, e){
  if (e) {
    document.getElementById(mark).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>`;
  }else{
    document.getElementById(mark).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>`;
  }
}
function mensajeInfo(mensa){
  switch(mensa){
    case 'gol':
      mensaje.innerHTML = "GOAL!!!!!!!";
      break;
    case 'atajada':
      mensaje.innerHTML = "Gran atajada!";
      break;
    case 'dispara':
      mensaje.innerHTML = "Dispara!";
      break;
    case 'ataja':
      mensaje.innerHTML = "Ataja!";
      break;
  }
}

function disparo(dir) {
  limpiar();
  var gk = parseInt(Math.random() * 3); //0 izq 1 cen 2 der
  btnDes(true);
  switch (dir) {
    case "izq":
      if ((contadorTiros + 1) == tiros && goles == 0) {
        gk = ganarSiempre(gk, 0, true);
      }
      if (gk == 0) {
        img0.src = "img/gk_l_tapo.png";
        mensajeInfo('atajada');

        marcador(`item${contadorTiros}`, false);
      } else {
        switch (gk) {
          case 1:
            img1.src = "img/gk.png";
            break;
          case 2:
            img2.src = "img/gk_r.png";
            break;
        }
        img0.src = "img/gol.png";
        mensajeInfo('gol');
        goles++;
        marcador(`item${contadorTiros}`, true);
      }
      break;

    case "cen":
      if ((contadorTiros + 1) == tiros && goles == 0) {
        gk = ganarSiempre(gk, 1, true);
      }
      if (gk == 1) {
        img1.src = "img/gk_c_tapo.png";
        mensajeInfo('atajada');
        marcador(`item${contadorTiros}`, false);
      } else {
        switch (gk) {
          case 0:
            img0.src = "img/gk_l.png";
            break;
          case 2:
            img2.src = "img/gk_r.png";
            break;
        }
        img1.src = "img/gol.png";
        mensajeInfo('gol');
        goles++;
        marcador(`item${contadorTiros}`, true);
      }
      break;

    case "der":
      if ((contadorTiros + 1) == tiros && goles == 0) {
        gk = ganarSiempre(gk, 2, true);
      }
      if (gk == 2) {
        img2.src = "img/gk_r_tapo.png";
        mensajeInfo('atajada');
        marcador(`item${contadorTiros}`, false);
      } else {
        switch (gk) {
          case 0:
            img0.src = "img/gk_l.png";
            break;
          case 1:
            img1.src = "img/gk.png";
            break;
        }
        img2.src = "img/gol.png";
        mensajeInfo('gol');
        goles++;
        marcador(`item${contadorTiros}`, true);
      }
      break;
  }
  setTimeout(()=>{
    arquero_centro();
    btnDes(false);
    mensajeInfo('dispara');
    if (contadorTiros == tiros) {
      mensajeInfo('ataja');
      atajar();
      btnDes(true);
    }else{
      ++contadorTiros;
    }
  }, 1000);
};

function atajar(){
  btnDes(true);
  
  img0.addEventListener('click', tapar);
  img1.addEventListener('click', tapar);
  img2.addEventListener('click', tapar);
}

function tapar(e){
  let gk = parseInt(Math.random() * 3),
      img = e.target;

  if (bol) {
    limpiar();
    if(img.id == 'img_0'){
      if (((contadorAtajadas + 3) == tiros && ataja == 0) || ((contadorAtajadas + 1) == tiros && ataja == 1)) {
        gk = ganarSiempre(gk, 0, false);
      }
      if (gk == 0) {
        img0.src = "img/gk_l_tapo.png";
        mensajeInfo('atajada');
        ataja++;
        marcador(`itemA${contadorAtajadas}`, true);
      }else{
        img0.src = "img/gk_l.png";
        mensajeInfo('gol');
        if (gk == 1) {
          img1.src = "img/gol.png";
        }else{
          img2.src = "img/gol.png";
        }
        marcador(`itemA${contadorAtajadas}`, false);
      }
    }else if (img.id == 'img_1') {
      if (((contadorAtajadas + 3) == tiros && ataja == 0) || ((contadorAtajadas + 1) == tiros && ataja == 1)) {
        gk = ganarSiempre(gk, 1, false);
      }
      if (gk == 1) {
        img1.src = "img/gk_c_tapo.png";
        mensajeInfo('atajada');
        ataja++;
        marcador(`itemA${contadorAtajadas}`, true);
      }else{
        img1.src = "img/gk.png";
        mensajeInfo('gol');
        if (gk == 0) {
          img0.src = "img/gol.png";
        }else{
          img2.src = "img/gol.png";
        }
        marcador(`itemA${contadorAtajadas}`, false);
      }
    }else{
      if (((contadorAtajadas + 3) == tiros && ataja == 0) || ((contadorAtajadas + 1) == tiros && ataja == 1)) {
        gk = ganarSiempre(gk, 2, false);
      }
      if (gk == 2) {
        img2.src = "img/gk_r_tapo.png";
        mensajeInfo('atajada');
        ataja++;
        marcador(`itemA${contadorAtajadas}`, true);
      }else{
        img2.src = "img/gk_r.png";
        mensajeInfo('gol');
        if (gk == 0) {
          img0.src = "img/gol.png";
        }else{
          img1.src = "img/gol.png";
        }
        marcador(`itemA${contadorAtajadas}`, false);
      }
    }
    bol = false;
    setTimeout(()=>{
      if (contadorAtajadas != tiros) {
        contadorAtajadas++;
      }else{
        ganastes();
      }
      arquero_centro();
      mensajeInfo('ataja');
      bol = true;
    }, 1000);
  }

}

function ganastes(){
  arco.setAttribute('hidden', '');
  ganar.removeAttribute('hidden');
}