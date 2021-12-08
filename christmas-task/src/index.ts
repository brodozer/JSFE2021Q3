// import '~materialize-css/dist/js/materialize.min';
import * as noUiSlider from 'nouislider';
// import noUiSlider from 'nouislider';
import './styles.scss';
import Component from './components/component';

const component = new Component();
component.hello();
console.log('start');

// const body = document.body;
const yearSlider: noUiSlider.TargetElement =
  document.getElementById('year-slider');
const countSlider: noUiSlider.TargetElement =
  document.getElementById('count-slider');
const yearStart = document.querySelector('.year-start');
const yearEnd = document.querySelector('.year-end');
const countStart = document.querySelector('.count-start');
const countEnd = document.querySelector('.count-end');

noUiSlider
  .create(countSlider, {
    start: [1, 12],
    connect: true,
    step: 1,
    orientation: 'horizontal',
    range: {
      min: 1,
      max: 12,
    },
  })
  .on('update', (values: string[], handle: number) => {
    [countStart, countEnd][handle].innerHTML = values[handle].slice(0, -3);
  });

noUiSlider
  .create(yearSlider, {
    start: [1940, 2020],
    connect: true,
    step: 10,
    orientation: 'horizontal',
    range: {
      min: 1940,
      max: 2020,
    },
  })
  .on('update', (values: string[], handle: number) => {
    [yearStart, yearEnd][handle].innerHTML = values[handle].slice(0, -3);
  });

const btnReset = document.querySelector('.btn-filter-reset');
btnReset.addEventListener('click', () => {
  countSlider.noUiSlider.reset();
  yearSlider.noUiSlider.reset();
});

const balls = document.querySelector('.balls');
const card = `<div class="card">
              <div class="card-image">
                <img src="assets/toys/1.png" />
                <a class="btn-flat btn-favorite"
                  ><i class="material-icons">favorite_border</i></a
                >
              </div>
              <div class="card-content">
                <span class="card-title">Большой шар с рисунком</span>
                <ul class="collection">
                  <li class="collection-item">
                    <span>Кол-во:</span><span>2</span>
                  </li>
                  <li class="collection-item">
                    <span>Год покупки:</span><span>1960</span>
                  </li>
                  <li class="collection-item">
                    <span>Форма:</span><span>шар</span>
                  </li>
                  <li class="collection-item">
                    <span>Цвет:</span><span>желтый</span>
                  </li>
                  <li class="collection-item">
                    <span>Размер</span><span>большой</span>
                  </li>
                </ul>
              </div>
            </div>`;
let html = '';
for (let i = 0; i < 12; i += 1) {
  html += card;
}
balls.innerHTML = html;

const favoriteBolls = document.querySelector('.favorites-bolls');
const cardBoll = `
                <div class="card-boll">
                  <span class="count">2</span>
                  <img src="./assets/toys/10.png" alt="" />
                </div>`;
let htmlCards = '';
for (let b = 0; b < 20; b += 1) {
  htmlCards += cardBoll;
}
favoriteBolls.innerHTML = htmlCards;
