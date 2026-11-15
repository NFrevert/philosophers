// Audio-Spieler
const player = document.getElementById("audioPlayer");
// Alle Songs
const tracks = document.querySelectorAll(".track");

let currentTrack = null;

tracks.forEach(track => {
  const play = track.querySelector(".play");
  const pause = track.querySelector(".pause");
  const stopp = track.querySelector(".stopp");
  const toggleLyrics = track.querySelector(".toggleLyrics");
  const lyrics = track.querySelector(".lyrics");

  const source = track.dataset.src;

  play.addEventListener("click", () => {
    // Anderen Song stoppen
    if (currentTrack !== track) {
      player.pause();
      player.currentTime = 0;

      player.src = source;
      currentTrack = track;
    }

    player.play();
  });

  pause.addEventListener("click", () => {
    // pause
    player.pause();
  });

  stopp.addEventListener("click", () => {
    // stopp
    player.pause();
    player.currentTime = 0;
    currentTrack = null;
    player.removeAttribute("src");
    player.load();
  });

  toggleLyrics.addEventListener("click", () => {
    alert("Test!");
    if(lyrics.classList.contains('visible'))
    {
      lyrics.classList.add(['hidden']);
      lyrics.classList.remove(['visible']);
    } else {
      
      lyrics.classList.add(['visible']);
      lyrics.classList.remove(['hidden']);
    }
  });
})