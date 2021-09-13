/* Variables */
const formulario = document.querySelector('#cotizar-seguro');
const resultado = document.querySelector('#resultado');

/* Events Listeners */
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    ui.llenarSelect();
    formulario.addEventListener('submit', cotizarSeguro);
  });
}


/* Prototypes */
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  const diferencia = new Date().getFullYear() - this.year;
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  if (this.tipo === 'basico') {
    cantidad *= 1.35;
  } else {
    cantidad *= 1.50;
  }

  return Math.round(cantidad);
}

function UI() { };

UI.prototype.llenarSelect = () => {

  const selectYear = document.querySelector('#year');
  const max = new Date().getFullYear();
  const min = max - 10;
  for (let i = max; i >= min; i--) {
    const option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    selectYear.appendChild(option);
  }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

  const div = document.createElement('div');
  div.textContent = mensaje;
  div.classList.add('mensaje', 'mt-10');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }

  resultado.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 1500);
}

UI.prototype.mostrarResultado = (seguro, cantidad) => {

  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  const { marca, year, tipo } = seguro;

  const cotizacion = document.createElement('div');
  cotizacion.classList.add('mt-10');

  let textoMarca

  switch (marca) {
    case '1':
      textoMarca = 'Americano'
      break;
    case '2':
      textoMarca = 'Asiatico'
      break;
    case '3':
      textoMarca = 'Europeo'
      break;

      return textoMarca;
  }

  cotizacion.innerHTML = `
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal">${cantidad}</span></p>  
  `;

  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';
  ui.mostrarMensaje('Cotizando...', 'exito')
  setTimeout(() => {
    spinner.style.display = 'none';
    resultado.appendChild(cotizacion);
  }, 1500);

}

const ui = new UI();
/* Funciones */

function cotizarSeguro(e) {
  e.preventDefault();


  const marca = document.querySelector('#marca').value;
  const year = document.querySelector('#year').value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;


  if (marca === '' || year === '' || tipo === '') {
    ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }


  const seguro = new Seguro(marca, year, tipo);
  const cantidad = seguro.cotizarSeguro();
  ui.mostrarResultado(seguro, cantidad);
}

