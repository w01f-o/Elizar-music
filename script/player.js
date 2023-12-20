"use strict";

/**
 * Объявляем переменные для всех DOM элементов, с которыми
 * работаем
 */

const audio = document.querySelector("#audio");
const playPauseButton = document.querySelector("#js-play-pause-btn");
const prevTreckButton = document.querySelector("#js-prev-btn");
const nextTreckButton = document.querySelector("#js-next-btn");
const treckDuraion = document.querySelector(".player-controls__treckDuration");
const currentTreckTime = document.querySelector(".player-controls__treckTime");
const TreckRange = document.querySelector("#js-treck-range");
const burgerMenu = document.querySelector(".burger__menubox");
const volumeController = document.querySelector("#js-volume-controller");
const volumeIcon = document.querySelector(".volume-image");
const CurrentTreckNames = document.querySelectorAll(".active-treck__treckName");

/**
 * Оъявляем переменные для корректной работы смены
 * трека и кнопки Play/Pause
 */

let isPlaying = false;
let treckIndex = 0;

/**
 * Объявляем массив, содержащий список всех треков
 */

const playlist = [
    {treckName: "Мокрые кроссы.mp3", isNew: false},
    {treckName: "Венсдей.mp3", isNew: false},
    {treckName: "505.mp3", isNew: false},
    {treckName: "Убили негра.mp3", isNew: false},
    {treckName: "Заставлял.mp3", isNew: false},
    {treckName: "Зеркало.mp3", isNew: false},
    {treckName: "Пидор на крыльце.mp3", isNew: false},
    {treckName: "Путин.mp3", isNew: false},
    {treckName: "С хачами ебусь.mp3", isNew: false},
    {treckName: "Я ебу собак.mp3", isNew: false},
    {treckName: "BIG DICK.mp3", isNew: false},
    {treckName: "Незабудка.mp3", isNew: false},
    {treckName: "+7(952)812.mp3", isNew: false},
    {treckName: "Cristal MOET.mp3", isNew: false},
    {treckName: "SAD.mp3", isNew: false},
    {treckName: "Не отдам.mp3", isNew: true},
    {treckName: "Не забывай.mp3", isNew: true},
]

/**
 * Объявляем массив, содержащий список обложек треков
 */

const coverList = [
    "1.svg",
    "2.svg",
    "3.svg",
    "4.svg",
    "5.svg",
    "6.svg",
    "7.svg",
    "8.svg",
    "9.svg",
];

/**
 * После заргузки окна вызываем функции для
 * Установки времени трека,
 * Установки текущего трека,
 * Заполнения меню с плейлистом,
 * Установки громкости плеера
 */

window.addEventListener("load", () => {
    SetCurrentTreck();
    SetTreckTime();
    FillBurgerMenu();
    ChangeTreckVolume(volumeController.value);
});

/**
 * Функция, возращающая имя трека без расширения
 */

const CreateTreckNameWithoutExtension = (playlistItem) => {
    let TempArray = Array.from(playlistItem);
    TempArray.forEach((item, index) => {
        if (TempArray[index] === ".") {
            while (index < TempArray.length) {
                TempArray.splice(index, 1);
            }
        }
    });
    TempArray = TempArray.join("");
    return TempArray;
};

/**
 * Функция, устанавливающая имя текущего трека
 */

const SetCurrentTreckName = () => {
    CurrentTreckNames.forEach((item) => {
        item.innerHTML = CreateTreckNameWithoutExtension(playlist[treckIndex].treckName);
    });
};

/**
 * Функция, устанавливающая текущий трек
 */

const SetCurrentTreck = () => {
    audio.src = "./assets/audio/" + playlist[treckIndex].treckName;
    SetCurrentTreckName();
};

/**
 * Функция для запуска трека
 */

const PlayTreck = () => {
    audio.play();
    playPauseButton.style["backgroundImage"] = "url(./assets/img/pause.svg)";
    isPlaying = true;
};

/**
 * Функция для паузы трека
 */

const PauseTeck = () => {
    audio.pause();
    playPauseButton.style["backgroundImage"] = "url(./assets/img/play.svg)";
    isPlaying = false;
};

/**
 * Функции, для установки времени трека
 */

const SetTime = (targetTime, targetOutput) => {
    let minutes = Math.floor(targetTime / 60);
    let seconds = targetTime % 60;
    if (!isNaN(minutes) && !isNaN(seconds)) {
        targetOutput.innerHTML = `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }
};

const SetTreckTime = () => {
    let audioLength = Math.round(audio.duration);
    TreckRange.max = audioLength;
    SetTime(audioLength, treckDuraion);
};

const UpdateTreckTime = () => {
    let CurrentAudioTime = Math.round(audio.currentTime);
    TreckRange.value = audio.currentTime;
    SetTime(CurrentAudioTime, currentTreckTime);
};

const ChangeTreckTime = () => {
    if (!isNaN(audio.currentTime) && !isNaN(TreckRange.value)) {
        audio.currentTime = Math.floor(TreckRange.value);
    }
};

/**
 * Функция для заполнения меню с плейлистом
 */

const FillBurgerMenu = () => {
    playlist.forEach((item, index) => {
        let burger_item = document.createElement("div");
        let treck_cover = document.createElement("img");
        let treck_name = document.createElement("div");
        burger_item.className = "burger__item";
        treck_cover.className = "treck-cover";
        treck_name.className = "treck-name";
        const setTreckCover = (index) => {
            index = index % coverList.length;

            treck_cover.src = "./assets/img/treck-cover/" + coverList[index];
        };
        setTreckCover(index);
        treck_name.innerHTML = CreateTreckNameWithoutExtension(item.treckName);
        burger_item.append(treck_cover);
        burger_item.append(treck_name);
        if (item.isNew) {
            let newTreckTitle = document.createElement('div');
            newTreckTitle.className = 'new-treck';
            newTreckTitle.innerHTML = 'New';
            burger_item.append(newTreckTitle);
        }
        burgerMenu.append(burger_item);
        burger_item.addEventListener("click", () => {
            treckIndex = index;
            SetCurrentTreck();
            PlayTreck();
        });
    });
};

/**
 * Функция для авто-запуска следующего трека
 */

const AutoPlayNext = () => {
    if (
        audio.currentTime === audio.duration &&
        treckIndex < playlist.length - 1
    ) {
        setTimeout(() => {
            treckIndex++;
            SetCurrentTreck();
            PlayTreck();
        }, 1000);
    } else if (
        audio.currentTime === audio.duration &&
        !(treckIndex < playlist.length - 1)
    ) {
        setTimeout(() => {
            treckIndex = 0;
            SetCurrentTreck();
            PlayTreck();
        }, 1000);
    }
};

/**
 * Функция для регулировки громкости
 */

const ChangeTreckVolume = (volume) => {
    if (!isNaN(volume) && isFinite(volume)) {
        audio.volume = parseFloat(volume);
        if (audio.volume <= 1 && audio.volume > 0.75) {
            volumeIcon.style["backgroundImage"] = "url(./assets/img/mute100.svg)";
        } else if (audio.volume <= 0.75 && audio.volume > 0.5) {
            volumeIcon.style["backgroundImage"] = "url(./assets/img/mute75.svg)";
        } else if (audio.volume <= 0.5 && audio.volume > 0.25) {
            volumeIcon.style["backgroundImage"] = "url(./assets/img/mute50.svg)";
        } else if (audio.volume <= 0.25 && audio.volume > 0) {
            volumeIcon.style["backgroundImage"] = "url(./assets/img/mute25.svg)";
        } else if (audio.volume === 0) {
            volumeIcon.style["backgroundImage"] = "url(./assets/img/mute.svg)";
        }
    }
};

/**
 * Обработка нажатий на кнопки Play/Pause,
 * и переключения треков
 */

playPauseButton.addEventListener("click", () => {
    if (!isPlaying) {
        PlayTreck();
    } else {
        PauseTeck();
    }
});

nextTreckButton.addEventListener("click", () => {
    if (treckIndex < playlist.length - 1) {
        treckIndex++;
        SetCurrentTreck();
        PlayTreck();
    } else {
        treckIndex = 0;
        SetCurrentTreck();
        PlayTreck();
    }
});

prevTreckButton.addEventListener("click", () => {
    if (treckIndex > 0) {
        treckIndex--;
        SetCurrentTreck();
        PlayTreck();
    } else {
        treckIndex = playlist.length - 1;
        SetCurrentTreck();
        PlayTreck();
    }
});

/**
 * Обработка изменения текущего времени трека
 */

TreckRange.addEventListener("input", () => {
    ChangeTreckTime();
});

/**
 * Время трека устанавливается только после того,
 * как аудио загружится и будет доступно к запуску
 */

audio.addEventListener("loadedmetadata", () => {
    SetTreckTime();
});

/**
 * Обработка изменения времени трека
 */

audio.addEventListener("timeupdate", () => {
    UpdateTreckTime();
    AutoPlayNext();
});

/**
 * Обработка изменения громкости
 */

volumeController.addEventListener("input", () => {
    ChangeTreckVolume(volumeController.value);
});
