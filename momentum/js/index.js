'use strict';

console.log(`
    Score 150/150
[+] Часы и календарь (15)
[+] Приветствие (10)
[+] Смена фонового изображения (20)
[+] Виджет погоды (15)
[+] Виджет цитата дня (10)
[+] Аудиоплеер (15)
[+] Продвинутый аудиоплеер (реализуется без использования библиотек) (20)
[+] Перевод приложения на два языка (en/ru) (15)
[+] Получение фонового изображения от API (10)
[+] Настройки приложения (20)
`);

let opt = {
    name: false,
    city: false,
    language: 'ru',
    source_img: 'github',
    tags_img: false,
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
        en: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
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
            p: 'Tags supported only Unsplash or Flickr. A comma-delimited list of tags. Photos with one or more of the tags listed will be returned',
        },
        ru: {
            h3: 'Настройки',
            h4_1: 'Показать',
            h4_2: 'Язык',
            h4_3: 'Изображения',
            show_list: ['Время', 'Дата', 'Приветствие', 'Цитата дня', 'Прогноз погоды', 'Аудиоплеер'],
            lang_list: ['Английский', 'Русский'],
            label: 'Теги',
            p: 'Теги доступны только для Unsplash или Flickr. Список тегов, разделенных запятыми, позволяют получить фотографии с одним или несколькими из перечисленных тегов',
        },
    },
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
//audio
const audio = document.querySelector('audio');
let playing = false; // можно без ключа!!! (audio.paused вернет true или false)

const regEx = /^[a-zA-Z\s]+$|^[а-яА-Я\s]+$/iu;

let timeOfDay = false; // время суток

const getRandomNum = (num) => {
    return Math.floor(Math.random() * num);
};

let randomNum = getRandomNum(20) + 1; // номер слайда для bg

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
    const currentDate = date.toLocaleDateString(`${opt.language}-${opt.language.toUpperCase()}`, options);
    dateToday.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
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
    if (opt.name) {
        name.value = opt.name;
    } else {
        name.setAttribute('placeholder', translation.placeholder[opt.language]);
    }
};

const renderContent = (selector, obj) => {
    document.querySelectorAll(selector).forEach((el) => {
        let key = el.getAttribute(selector.slice(1, -1));
        let content = get_content_from_key(key, obj);

        if (content) {
            if (el.textContent != content) {
                el.textContent = content;
            }
        }
    });
};

const setWeather = (data) => {
    if (opt.city !== city.value) {
        opt.city = city.value;
    }
    const weather = {
        class: `weather-icon owf owf-${data.weather[0].id}`,
        error: ' ',
        temperature: `${Math.ceil(data.main.temp)}°C`,
        description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
        wind: `${translation.weather[opt.language].wind} ${Math.ceil(data.wind.speed)} ${translation.weather[opt.language].metrics}`,
        humidity: `${translation.weather[opt.language].humidity} ${data.main.humidity} %`,
    };
    console.log('wether ', weather);

    renderContent('[data-wkey]', weather);
    weatherIcon.className = weather.class;
};

const renderWeatherError = (msg) => {
    document.querySelectorAll('[data-wkey]').forEach((el) => {
        if (el.textContent.length > 0) {
            el.textContent = '';
        }
        if (el.classList.contains('weather-error')) {
            el.textContent = msg;
        }
    });
    weatherIcon.className = 'weather-icon owf';
};

async function getData(url, cb, cbe) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(url, data);
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

const setBg = (src) => {
    const img = new Image();
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
    img.onerror = () => {
        if (!body.style.backgroundImage) {
            body.style.backgroundImage = 'url("../assets/img/bg.jpg")';
        }
        console.log('img not found 404');
    };
    img.src = src;
};

const getLinkToGitHub = () => {
    let numImg = randomNum;
    if (numImg < 10) {
        numImg = String(randomNum).padStart(2, 0);
    }
    const src = `https://raw.githubusercontent.com/brodozer/stage1-tasks/assets/images/${timeOfDay}/${numImg}.jpg`;
    console.log('gitHub ', src);
    setBg(src);
};

const getLinkToUnsplash = () => {
    let tags = opt.tags_img;
    if (!tags) {
        tags = timeOfDay;
    }
    console.log('tags ', tags);
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=D-_tpaRbofPn1ERX9-E04Cyae7pDAFoNAgYIKk_URuw`;
    getData(
        url,
        function (data) {
            setBg(data.urls.regular);
        },
        function (data) {
            console.log('unsplash API ', data.errors[0]);
        }
    );
};

let flickrImgs = [];

const getLinkToFlickr = () => {
    let tags = opt.tags_img;
    if (!tags) {
        tags = timeOfDay;
    }
    console.log('tags ', tags);
    if (flickrImgs.length == 0) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f063269120ed7bae71ee949ba30d6d60&tags=${tags}&extras=url_l&format=json&nojsoncallback=1`;
        getData(url, function (data) {
            if (data.stat === 'ok') {
                flickrImgs = data.photos.photo;
                setBg(flickrImgs[getRandomNum(flickrImgs.length)].url_l);
            } else {
                console.log('flickr API', data.message);
            }
        });
    } else {
        setBg(flickrImgs[getRandomNum(flickrImgs.length)].url_l);
    }
};

const sourcePicture = (source) => {
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

const setTags = () => {
    if (opt.tags_img) {
        tags.value = opt.tags_img;
    }
};

const getTags = () => {
    const value = tags.value.trim();
    if (value.length > 0) {
        opt.tags_img = value;
        flickrImgs = [];
        sourcePicture(opt.source_img);
    }
};

const getSlideNext = () => {
    randomNum = randomNum + 1 > 20 ? 1 : randomNum + 1;
    sourcePicture(opt.source_img);
};

const getSlidePrev = () => {
    randomNum = randomNum - 1 == 0 ? 20 : randomNum - 1;
    sourcePicture(opt.source_img);
};

const getWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${opt.language}&appid=a7456a1378b5bf993ba3b65764589120&units=metric`;
    getData(url, setWeather, function (data) {
        console.log('openweather API', data.message);
        renderWeatherError(translation.weather[opt.language].errors.found);
        //renderWeatherError(data.message); // всегда на английском
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
    document.querySelectorAll('[data-skey]').forEach(function (el) {
        let key = el.getAttribute('data-skey'); //show.time
        let content = get_content_from_key(key, opt);

        if (content) {
            el.classList.add('on');
            document.getElementById(el.dataset.id).classList.add('show');
        }
    });
    // language and picture settings
    document.getElementById(opt.language).classList.add('on');
    document.getElementById(opt.source_img).classList.add('on');
};

const renderMenu = function (translation) {
    renderContent('[data-ckey]', translation);

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
    if (id === 'player') {
        if (!audio.paused) {
            audio.pause();
            playing = false;
        }
    }
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

// some_function.bind(this, event, arg2, arg,3) передача нескольких аргументов в обработчик событий

const setActiveRadio = (e) => {
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

const menuLanguage = (e) => {
    if (setActiveRadio(e)) {
        renderMenu(translation.menu[opt.language]);
        getWeather();
        getQuotes();
        setName();
        setCity();
    }
};

const menuPicture = (e) => {
    if (setActiveRadio(e)) {
        sourcePicture(opt.source_img);
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
    renderMenu(translation.menu[opt.language]);
    settings_menu(opt);
    showTime();
    setName();
    setCity();
    setTags();
    getWeather();
    getQuotes();
    sourcePicture(opt.source_img);
};

// listeners

window.addEventListener('beforeunload', setLocalStorage); // перезапсись значения в ls перед перезагрузкой или закрытием страницы
window.addEventListener('load', init); // забираем опции и инитим приложение
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
updateQuote.addEventListener('click', showQuotes);
settings.addEventListener('click', toggleMenu);
showList.addEventListener('click', showWidget);
langList.addEventListener('click', menuLanguage);
sourceList.addEventListener('click', menuPicture);
tags.addEventListener('change', getTags);

name.addEventListener('change', () => {
    opt.name = name.value;
});
city.addEventListener('change', () => {
    let value = city.value;
    if (value.length == 0) {
        renderWeatherError(translation.weather[opt.language].errors.empty);
    } else if (!regEx.test(value)) {
        renderWeatherError(translation.weather[opt.language].errors.invalid);
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
