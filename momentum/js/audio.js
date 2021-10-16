'use strict';

const playlist = [
    {
        title: 'Aqua Caelestis',
        src: 'assets/sounds/Aqua Caelestis.mp3',
        duration: '00:40',
    },
    {
        title: 'River Flows In You',
        src: 'assets/sounds/River Flows In You.mp3',
        duration: '01:37',
    },
    {
        title: 'Ennio Morricone',
        src: 'assets/sounds/Ennio Morricone.mp3',
        duration: '01:37',
    },
    {
        title: 'Summer Wind',
        src: 'assets/sounds/Summer Wind.mp3',
        duration: '01:51',
    },
];

const audioPlayer = () => {
    const audio = document.querySelector('audio');
    const playButton = document.querySelector('.play');
    const progressBar = document.querySelector('.progress');
    const seek = document.querySelector('.seek');
    const volumeButton = document.querySelector('.mute');
    const volume = document.querySelector('.volume');
    const duration = document.querySelector('.duration');
    const cur_time = document.querySelector('.cur-time');
    const trackName = document.querySelector('.track-name');
    const playNext = document.querySelector('.play-next');
    const playPrev = document.querySelector('.play-prev');
    const playListContainer = document.querySelector('.play-list');

    let songIndex = 0;
    let playing = false; // можно без ключа!!!

    function togglePlay() {
        if (!playing) {
            audio.play();
            playing = true;
        } else {
            audio.pause();
            playing = false;
        }
    }

    function updatePlayButton() {
        console.log('playing ', playing);
        playListContainer.querySelectorAll('.track-btn').forEach((btn) => {
            btn.classList.remove('pause');
        });
        if (playing) {
            playListContainer.querySelector(`[data-id="${songIndex}"]`).classList.add('pause');
            playButton.classList.add('pause');
        } else {
            playButton.classList.remove('pause');
        }
    }

    function updateProgress() {
        seek.value = Math.floor(audio.currentTime);
        progressBar.value = Math.floor(audio.currentTime);
    }

    function skipAhead(event) {
        const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
        audio.currentTime = skipTo;
        progressBar.value = skipTo;
        seek.value = skipTo;
    }

    function updateVolume() {
        if (audio.muted) {
            audio.muted = false;
        }

        audio.volume = volume.value;
    }

    function updateVolumeIcon() {
        if (audio.muted || audio.volume === 0) {
            volumeButton.classList.add('unmute');
        } else {
            volumeButton.classList.remove('unmute');
        }
    }

    function toggleMute() {
        audio.muted = !audio.muted;

        if (audio.muted) {
            volume.setAttribute('data-volume', volume.value);
            volume.value = 0;
        } else {
            volume.value = volume.dataset.volume;
        }
    }

    function formatTime(timeInSeconds) {
        const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

        return {
            minutes: result.substr(3, 2),
            seconds: result.substr(6, 2),
        };
    }

    function updateTimeElapsed() {
        const time = formatTime(Math.round(audio.currentTime));
        cur_time.textContent = `${time.minutes}:${time.seconds}`;
    }

    function nextTrack() {
        songIndex++;
        if (songIndex > playlist.length - 1) {
            songIndex = 0;
        }
        playing = true;
        load();
    }

    function previousTrack() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = playlist.length - 1;
        }
        playing = true;
        load();
    }

    function createPlaylist() {
        let html = '';
        playlist.forEach((e, i) => {
            html += '<li class="play-item"><button class="track-btn player-icon play" data-id="' + i + '"></button><span>' + e.title + '</span><span class="item-duration">' + e.duration + '</span></li>';
        });
        console.log('playlist_html ', html);
        playListContainer.innerHTML = html;
        playListContainer.querySelectorAll('li')[0].classList.add('active');
    }

    function load() {
        audio.src = playlist[songIndex].src;
        audio.load();
        trackName.textContent = playlist[songIndex].title;
        duration.textContent = playlist[songIndex].duration;
    }

    function rebind() {
        // можно накидывать класс active и подсвечивать текущий трек, пока не перешли на следующий
        playListContainer.querySelector('li.active').classList.remove('active');
        playListContainer.querySelectorAll('li')[songIndex].classList.add('active');

        audio.currentTime = 0;
        updateTimeElapsed();
        trackName.textContent = playlist[songIndex].title;
        const audioDuration = Math.round(audio.duration);
        seek.setAttribute('max', audioDuration);
        progressBar.setAttribute('max', audioDuration);
        if (playing) {
            audio.play();
        }
    }

    function init() {
        createPlaylist();
        load();
        volume.value = 0.5; // можно захардкодить в инпут
    }

    // init!!!
    init();

    playButton.addEventListener('click', togglePlay);
    playNext.addEventListener('click', nextTrack);
    playPrev.addEventListener('click', previousTrack);
    audio.addEventListener('play', updatePlayButton);
    audio.addEventListener('pause', updatePlayButton);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('timeupdate', updateTimeElapsed);
    audio.addEventListener('volumechange', updateVolumeIcon);
    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('loadedmetadata', rebind);
    seek.addEventListener('input', skipAhead);
    volume.addEventListener('input', updateVolume);
    volumeButton.addEventListener('click', toggleMute);
    playListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('track-btn')) {
            // переписать в отдельную ф-ю
            if (event.target.dataset.id == songIndex) {
                togglePlay();
            } else {
                songIndex = event.target.dataset.id;
                playing = true;
                load();
            }
        }
    });
};

audioPlayer();
