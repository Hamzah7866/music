let title = document.getElementById('title');
const audio = document.getElementById('audio');
let time = document.getElementById('time');

let play = document.getElementById('play');
let pause = document.getElementById('pause');

let bar = document.getElementById('bar');
let innerbar = document.getElementById('innerbar')

let forward = document.getElementById('forward');
let backward = document.getElementById('backward');

innerbar.style.display = 'none';
let a = false;

let seekBar = document.getElementById('range');

let songList = [
    { track: 'song1.mp3', title: 'aaj-ki-raat' },
    { track: 'song2.mp3', title: 'Pa-soo-di' },
    { track: 'song3.mp3', title: 'mon-jya' },
    { track: 'song4.mp3', title: 'ja-waan' },
    { track: 'song5.mp3', title: 'dil-wa-le' }
]
let redBar;
let playingMinute;
let currentTime;
let trackId;
for (let i = 0; i < songList.length; i++) {
    let music = document.createElement('div');
    let count = 0;
    music.addEventListener('click', () => {
        count = i;
        forwardAndBackward()
    });
    music.classList.add('titleStyle')
    music.textContent = (i + 1).toString() + '. ' + songList[i].title;
    title.appendChild(music);

    let duration = 0;
    let fullMinute = '00:00';
    audio.addEventListener('loadeddata', () => {
        duration = Math.floor(audio.duration);
        fullMinute = totalCount(duration);
    });

    audio.addEventListener('timeupdate', () => {
        currentTime = Math.floor(audio.currentTime);
        playingMinute = totalCount(currentTime);
        let combinationMinute = playingMinute + ' / ' + fullMinute;
        time.textContent = combinationMinute;
        barFun(audio.duration, audio.currentTime)
    })

    let barFun = (currentbar1, currentbar2) => {
        redBar = (400 / currentbar1) * currentbar2;
        innerbar.style.width = redBar.toString() + 'px';
        innerbar.style.display = 'block';

    }

    let totalCount = (total) => {
        let minute = Math.floor(total / 60);
        let second = total % 60;

        let m = minute < 10 ? '0' + minute.toString() : minute;
        let s = second < 10 ? '0' + second.toString() : second;
        return m + ':' + s;
    }


    play.addEventListener('click', () => {
        if (!audio.src || currentTime === 0) {
            count = 0;
            trackId = songList[count].track;
            audio.src = trackId;
        }

        a = true;
        audio.play();
        playandpause();
    })

    pause.addEventListener('click', () => {
        audio.pause();
        a = false;
        playandpause()
    })

    let playandpause = () => {
        if (a == true) {
            play.style.display = 'none';
            pause.style.display = 'inline';
        } else {
            play.style.display = 'inline';
            pause.style.display = 'none';
        }
    }

    let forwardAndBackward = () => {
        trackId = songList[count].track;
        audio.src = trackId;
        a = true;
        audio.play();
        playandpause()
    }

    forward.addEventListener('click', () => {
        if (count == songList.length - 1) {
            return;
        } else {
            count += 1;
            forwardAndBackward();
        }

    })

    backward.addEventListener('click', () => {
        if (count == 0) {
            return;
        } else {
            count -= 1;
            forwardAndBackward();
        }

    })

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
    });

    seekBar.addEventListener('input', () => {
        const seekTime = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    })

    audio.addEventListener('ended', () => {
        if (count < songList.length - 1) {
            count += 1
            forwardAndBackward();
        }

    })
}

//restOfTheCode