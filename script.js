console.log("Spotify Web Player Loaded");

// Elements
const playBtn = document.querySelector(".play");
const progressBar = document.querySelector(".playback-bar");
const currentTimeEl = document.querySelectorAll(".time")[0];
const durationEl = document.querySelectorAll(".time")[1];
const volumeSlider = document.querySelector("#volumn");
const prevBtn = document.querySelectorAll(".music-icons")[1];
const nextBtn = document.querySelectorAll(".music-icons")[3];
const albumPic = document.querySelector(".album-pic");
const albumTitle = document.querySelector(".abt-1");
const albumArtist = document.querySelector(".abt-2");

// Songs data
const songs = [
  {
    title: "Daylight",
    artist: "David Kushner",
    src: "assets/song1.mp3",
    cover: "Homework Assets/album_picture.jpeg",
    duration: "3:33",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "assets/song2.mp3",
    cover: "assets/card2img.jpeg",
    duration: "4:12",
  },
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

// Load initial song
function loadSong(index) {
  let song = songs[index];
  audio.src = song.src;
  albumPic.src = song.cover;
  albumTitle.textContent = song.title;
  albumArtist.textContent = song.artist;
  durationEl.textContent = song.duration;
  progressBar.value = 0;
  currentTimeEl.textContent = "00:00";
}
loadSong(currentSongIndex);

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.src = "assets/player_icon_pause.png"; // pause icon ka path
  } else {
    audio.pause();
    playBtn.src = "assets/player_icon3.png"; // play icon ka path
  }
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Seek song
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.src = "assets/player_icon_pause.png";
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.src = "assets/player_icon_pause.png";
});

// Auto next
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

// Time format helper
function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return `${mins}:${secs}`;
}
