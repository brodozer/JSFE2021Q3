'use strict';

// const momentum = {
//     opt: {
//         name: 'введите ваше Имя',
//         city: 'Минск',
//         language: 'ru',
//         source_img: 'gitHub',
//         show_hide: {
//             time: true,
//             date: true,
//             greeting: true,
//             quote: true,
//             whether: true,
//             player: true,
//         },
//     },
//     time: document.querySelector('.time'),
//     dateToday: document.querySelector('.date'),
//     showDate: function (date) {
//         const _t = this;
//         console.log('language ', _t.opt);
//         const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
//         const currentDate = date.toLocaleDateString(`${_t.opt.language}-${_t.opt.language.charAt(0).toUpperCase() + _t.opt.language.slice(1)}`, options);
//         _t.dateToday.textContent = currentDate;
//     },

//     showTime: function () {
//         const _t = this;
//         const date = new Date();
//         const currentTime = date.toLocaleTimeString();
//         console.log('currentTime ', currentTime);
//         console.log('time ', _t.time);
//         _t.time.textContent = currentTime;
//         _t.showDate(date);
//         setInterval(_t.showTime, 1000);
//     },
//     init: function () {
//         const _t = this;
//         _t.showTime();
//     },
// };

// momentum.init();

// добавить ф-ю которая будет на ините забирать из localstorage настройки приложения
// на смену языка делать ребинд приложения!!!
// переписать в объект?

// source_img - gitHub, unsplash, flickr

let opt = {
    name: false,
    city: false,
    language: 'ru',
    source_img: 'github',
    tags_img: 'nature',
    url_img: false,
    show: {
        time: true,
        date: true,
        greeting: true,
        quote: true,
        weather: true,
        player: true,
    },
};

const translation = {
    weather: {
        en: {
            wind: 'Wind speed',
            humidity: 'Humidity',
            metrics: 'm/s',
            errors: {
                invalid: 'Enter correct name city',
                empty: 'Enter name city',
                found: 'City not found',
            },
        },
        ru: {
            wind: 'Скорость ветра',
            humidity: 'Влажность',
            metrics: 'м/с',
            errors: {
                invalid: 'Введите корректное название города',
                empty: 'Введите название города',
                found: 'Город не найден',
            },
        },
    },
    city: {
        en: 'Minsk',
        ru: 'Минск',
    },
    placeholder: {
        en: '[enter your Name]',
        ru: '[введите ваше Имя]',
    },
    greeting: {
        en: ['Good night', 'Good morning', 'Good day', 'Good evening'],
        ru: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
    },
    menu: {
        en: {
            h3: 'Settings',
            h4_1: 'Show',
            h4_2: 'Language',
            h4_3: 'Photos',
            show_list: ['Time', 'Date', 'Greeting', 'Quotes', 'Weather', 'Audio'],
            lang_list: ['English', 'Russian'],
            label: 'Tags',
            p: 'Tags supported only Unsplash or Flickr. A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character',
        },
        ru: {
            h3: 'Настройки',
            h4_1: 'Показать',
            h4_2: 'Язык',
            h4_3: 'Изображения',
            show_list: ['Время', 'Дата', 'Приветствие', 'Цитата дня', 'Прогноз погоды', 'Аудиоплеер'],
            lang_list: ['Английский', 'Русский'],
            label: 'Теги',
            p: 'Теги доступны только для Unsplash или Flickr. Список тегов, разделенных запятыми, позволяют получить фотографии с одним или несколькими из перечисленных тегов. Вы можете исключить результаты, соответствующие тегу, поставив перед ним символ -',
        },
    },
};

const getRandomNum = (num) => {
    return Math.floor(Math.random() * num);
};

const body = document.body;
const time = body.querySelector('.time');
const dateToday = body.querySelector('.date');
const greeting = body.querySelector('.greeting');
const name = body.querySelector('.name');
const city = body.querySelector('.city');
const slidePrev = body.querySelector('.slide-prev');
const slideNext = body.querySelector('.slide-next');
// weather
const weatherIcon = body.querySelector('.weather-icon');
const temperature = body.querySelector('.temperature');
const weatherDescription = body.querySelector('.weather-description');
const wind = body.querySelector('.wind');
const humidity = body.querySelector('.humidity');
const weatherError = body.querySelector('.weather-error');
// quote
const quote = body.querySelector('.quote');
const author = body.querySelector('.author');
const updateQuote = body.querySelector('.change-quote');
// lists
const showList = body.querySelector('.show-list');
const langList = body.querySelector('.lang-list');
const sourceList = body.querySelector('.source-list');
// settings
const menu = body.querySelector('.menu');
const settings = body.querySelector('.settings-icon');
const tags = body.querySelector('.tags');

const regEx = /^[a-zA-Z\s]+$|^[а-яА-Я\s]+$/iu;

let timeOfDay = false; // время суток
let randomNum = getRandomNum(20) + 1; // номер слайда для bg

const writeLocalStorage = (key, value) => {
    opt[key] = value;
    localStorage.momentum = JSON.stringify(opt);
};

const setLocalStorage = () => {
    localStorage.momentum = JSON.stringify(opt);
};

const getLocalStorage = () => {
    if (localStorage.momentum) {
        opt = JSON.parse(localStorage.momentum);
    }
};

const showDate = (date) => {
    const options = { month: 'long', weekday: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString(`${opt.language}-${opt.language.charAt(0).toUpperCase() + opt.language.slice(1)}`, options);
    dateToday.textContent = currentDate;
};

const showGreeting = (date) => {
    const hours = date.getHours();
    const index = Math.floor(hours / 6);
    const greetingText = translation.greeting[opt.language][index];
    timeOfDay = translation.greeting.en[index].slice(5);
    greeting.textContent = greetingText;
};

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate(date);
    showGreeting(date);
    setTimeout(showTime, 1000);
};

const setName = () => {
    // будем запускать каждый раз после смены языка
    if (opt.name) {
        name.value = opt.name;
    } else {
        name.setAttribute('placeholder', translation.placeholder[opt.language]);
    }
};

const viewWeather = (data) => {
    if (opt.city !== city.value) {
        opt.city = city.value;
    }
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = '';
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    wind.textContent = `${translation.weather[opt.language].wind} ${Math.ceil(data.wind.speed)} ${translation.weather[opt.language].metrics}`;
    humidity.textContent = `${translation.weather[opt.language].humidity} ${data.main.humidity} %`;
};

async function getData(url, cb, cbe) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            cb(data);
        } else {
            if (cbe) {
                cbe(data);
            }
        }
    } catch (err) {
        throw new Error(err);
    }
}

const showWeatherError = (msg) => {
    weatherError.textContent = msg;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
};

const setBg = (src) => {
    if (opt.url_img !== src) {
        opt.url_img = src;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
};

const getLinkToGitHub = () => {
    if (randomNum < 10) {
        randomNum = String(randomNum).padStart(2, 0);
    }
    const src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
    console.log(src);
    setBg(src);
};

const getLinkToUnsplash = () => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${opt.tags_img}&client_id=D-_tpaRbofPn1ERX9-E04Cyae7pDAFoNAgYIKk_URuw`;
    getData(
        url,
        function (data) {
            setBg(data.urls.regular);
        },
        function (data) {
            console.log('unsplash ', data.errors[0]);
        }
    );
};

let flickrImgs = [];

const getLinkToFlickr = () => {
    if (flickrImgs.length == 0) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f063269120ed7bae71ee949ba30d6d60&tags=${opt.tags_img}&extras=url_l&format=json&nojsoncallback=1`;
        getData(url, function (data) {
            if (data.stat === 'ok') {
                flickrImgs = data.photos.photo;
                setBg(flickrImgs[getRandomNum(flickrImgs.length)].url_l);
            } else {
                console.log('flickr ', data.message);
            }
        });
    } else {
        setBg(flickrImgs[getRandomNum(flickrImgs.length)].url_l);
    }
};

const soursePicture = (source) => {
    if (source === 'github') {
        getLinkToGitHub();
        tags.disabled = true;
    } else if (source === 'unsplash') {
        getLinkToUnsplash();
        tags.disabled = false;
    } else {
        getLinkToFlickr();
        tags.disabled = false;
    }
};

const getTags = () => {
    const value = tags.value;
    if (value.length > 0) {
        opt.tags_img = value;
        flickrImgs = [];
        soursePicture(opt.source_img);
    }
};

const getSlideNext = () => {
    randomNum = randomNum + 1 > 20 ? 1 : randomNum + 1;
    soursePicture(opt.source_img);
};

const getSlidePrev = () => {
    randomNum = randomNum - 1 == 0 ? 20 : randomNum - 1;
    soursePicture(opt.source_img);
};

const getWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${opt.language}&appid=a7456a1378b5bf993ba3b65764589120&units=metric`;
    getData(url, viewWeather, function (data) {
        console.log('openweather ', data.message);
        //showWeatherError(translation.weather[opt.language].errors.found);
        showWeatherError(data.message); // всегда на английском
    });
};

let quotes = [];

const showQuotes = () => {
    let i = getRandomNum(quotes[opt.language].length);
    let q = quotes[opt.language][i];
    quote.textContent = q.text;
    author.textContent = q.author;
};

const getQuotes = () => {
    const url = 'js/quotes.json';
    getData(url, function (data) {
        quotes = data[0];
        showQuotes(quotes);
    });
};

const setCity = () => {
    if (opt.city) {
        city.value = opt.city;
    } else {
        city.value = translation.city[opt.language];
    }
};

const get_content_from_key = function (key, content_object) {
    const o_key = key;
    let content;
    key = key.split('.');

    if (key.length === 2) {
        content = content_object[key[0]][key[1]];
    } else if (key.length === 3) {
        content = content_object[key[0]][key[1]][key[2]];
    } else {
        content = content_object[key[0]];
    }

    console.log('get_content_from_key ', o_key, content);
    return content;
};

const settings_menu = (opt) => {
    // вызывать только на ините
    document.querySelectorAll('[data-skey]').forEach(function (el) {
        let key = el.getAttribute('data-skey'); //show.time
        let content = get_content_from_key(key, opt);

        if (content) {
            el.classList.add('on');
            document.getElementById(el.dataset.id).classList.add('show');
        }
    });
    document.getElementById(opt.language).classList.add('on');
    document.getElementById(opt.source_img).classList.add('on');
};

const render_content = function (translation) {
    // передавать этот объект translation.menu[opt.language]
    // вызывать на ините
    document.querySelectorAll('[data-ckey]').forEach(function (el) {
        let key = el.getAttribute('data-ckey');
        let content = get_content_from_key(key, translation);

        if (content) {
            if (el.textContent != content) {
                el.textContent = content;
            }
        }
    });
    document.querySelectorAll('[data-lkey]').forEach(function (list) {
        let key = list.getAttribute('data-lkey');
        let settingName = list.querySelectorAll('.setting-name');
        let content = get_content_from_key(key, translation);
        if (content) {
            settingName.forEach((el, i) => {
                if (el.textContent != content[i]) el.textContent = content[i];
            });
        }
    });
};

// обработать кнопки в меню

const showWidget = (e) => {
    let target = e.target.closest('.slide-toggle');
    target.classList.toggle('on');
    let id = target.dataset.id;
    if (opt.show[id]) {
        opt.show[id] = false;
    } else {
        opt.show[id] = true;
    }
    document.getElementById(id).classList.toggle('show');
    // если нужно скрыть блок полностью!!! display: none; opacity: 0
    // if (target.classList.contains('has-toggle')) {
    //     target.classList.remove('has-toggle');
    //     target.classList.toggle('on');
    //     let id = target.dataset.id;
    //     if (opt.show[id]) {
    //         opt.show[id] = false;
    //     } else {
    //         opt.show[id] = true;
    //     }

    //     setTimeout(function () {
    //         const el = document.getElementById(id);
    //         if (!el.classList.contains('hide')) {
    //             el.classList.add('hide');
    //             setTimeout(function () {
    //                 el.classList.add('hide-display');
    //                 target.classList.add('has-toggle');
    //             }, 400);
    //         } else {
    //             el.classList.remove('hide-display');
    //             setTimeout(function () {
    //                 el.classList.remove('hide');
    //                 target.classList.add('has-toggle');
    //             }, 400);
    //         }
    //     }, 0);
    // }
    // запускать в зависимости от ключа в опциях

    // const fadeOut = (el) => {
    //     let opacity = 1;
    //     const timer = setInterval(() => {
    //         if (opacity <= 0.1) {
    //             clearInterval(timer);
    //             el.style.display = 'none';
    //         }
    //         el.style.opacity = opacity;
    //         opacity -= opacity * 0.1;
    //     }, 10);
    // };

    // const fadeIn = (el) => {
    //     let opacity = 0.01;
    //     el.style.display = 'block';

    //     const timer = setInterval(function () {
    //         if (opacity >= 1) {
    //             clearInterval(timer);
    //         }

    //         el.style.opacity = opacity;
    //         opacity += opacity * 0.1;
    //     }, 10);
    // };
};

// найти родителей переключения языка фоновой картинки и виджетов
// накинуть атрибут в котором указать имя ф-и,
// или закинуть ее в cb вторым параметром

// some_function.bind(this, event, arg2, arg,3) передача нескольких аргументов в обработчик событий

// повесить событие change на инпут для тегов и каждый раз запускать setBg

const setActiveRadio = (e) => {
    // вызывать при смене языка и источника картинок
    let target = e.target.closest('.radio-toggle');
    if (!target.classList.contains('on')) {
        target.closest('.settings-list').querySelector('.on').classList.remove('on');
        target.classList.add('on');
        opt[target.dataset.key] = target.id;
        return true;
    } else {
        return false;
    }
};

const setLanguage = (e) => {
    if (setActiveRadio(e)) {
        render_content(translation.menu[opt.language]);
        getWeather();
        getQuotes();
        setName();
        setCity();
    }
};

const getPicture = (e) => {
    if (setActiveRadio(e)) {
        soursePicture(opt.source_img);
    }
};

const hideMenu = (e) => {
    if (!menu.contains(e.target) && e.target !== settings) {
        toggleMenu(e);
    }
};

const toggleMenu = (e) => {
    //e.stopPropagation();
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        document.removeEventListener('click', hideMenu);
    } else {
        menu.classList.add('show');
        document.addEventListener('click', hideMenu);
    }
};

const init = () => {
    getLocalStorage();
    render_content(translation.menu[opt.language]);
    settings_menu(opt);
    showTime();
    setName();
    setCity();
    getWeather();
    getQuotes();
    if (opt.url_img) {
        setBg(opt.url_img);
    } else {
        soursePicture(opt.source_img);
    }
};

// listeners

window.addEventListener('beforeunload', setLocalStorage); // перезапсись значения в ls перед перезагрузкой или закрытием страницы
window.addEventListener('load', init); // забираем опции и инитим приложение
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
updateQuote.addEventListener('click', showQuotes);
settings.addEventListener('click', toggleMenu);
showList.addEventListener('click', showWidget);
langList.addEventListener('click', setLanguage);
sourceList.addEventListener('click', getPicture);
tags.addEventListener('change', getTags);

name.addEventListener('change', () => {
    opt.name = name.value;
});
city.addEventListener('change', () => {
    let value = city.value;
    if (value.length == 0) {
        showWeatherError(translation.weather[opt.language].errors.empty);
    } else if (!regEx.test(value)) {
        showWeatherError(translation.weather[opt.language].errors.invalid);
    } else {
        getWeather();
        //opt.city = value;
    }
});
city.addEventListener('keydown', (event) => {
    if ('1234567890'.indexOf(event.key) != -1) {
        event.preventDefault();
    }
});

// document.addEventListener('click', (e) => {
//     if (!menu.contains(e.target) && menu.classList.contains('show') && e.target !== settings) {
//         menu.classList.remove('show');
//     }
// });

// кнопку настроек достать из div

// на ините забирать placeholder для name ... если en - enter your Name - ru - введите ваше Имя
// при смене языка в настройках делать rebind и перезаписывать placeholder, если поле имя false

// добавить описания для тегов

//A comma-delimited list of tags. Photos with one or more of the tags listed will be returned. You can exclude results that match a term by prepending it with a - character.
//max 20
