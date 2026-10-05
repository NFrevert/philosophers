const sparks = document.getElementById('sparks');

    /* Bild klickbar machen */
    document.getElementById('clickLayer').addEventListener('click', () => {
        // Seite "freezen"
        document.body.style.pointerEvents = 'none';

        // Zoom starten
        document.getElementById('pageContent').classList.add('zoom');

        // Fade starten
        document.getElementById('fadeOverlay').classList.add('active');

        // Nach 3 Sekunden weiterleiten
        setTimeout(() => {
            window.location.href = './html/aboutus.html';
        }, 3000);
    });

    /* Türspalt klickbar */
    document.getElementById('door-gap').addEventListener('click', () => {
      window.location.href = './html/aboutus.html';
    });

    /* Funken erzeugen */
    function createSpark() {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      spark.style.left = Math.random() * window.innerWidth + 'px';
      spark.style.top = (Math.random() * window.innerHeight) + 'px';

      const size = Math.random() * 4 + 2;
      spark.style.width = size + 'px';
      spark.style.height = size + 'px';

      const drift = (Math.random() - 0.5) * 80;
      spark.style.setProperty('--drift-x', drift + 'px');

      const speed = 1.6 + Math.random() * 1.2;
      spark.style.animationDuration = speed + 's';

      sparks.appendChild(spark);

      setTimeout(() => spark.remove(), speed * 1000);
    }

    setInterval(createSpark, 120);

    
const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const content = document.getElementById("pageContent");
const music = document.getElementById("bgMusic");
const openText = document.getElementById("hoverText-1");
const theText = document.getElementById("hoverText-2");
const gateText = document.getElementById("hoverText-3");
const button = document.getElementById('toggleAudio');


document.body.addEventListener("click", () => {
  toggleAudio();
  startExperience();
}, { once: true });

function startExperience() {
content.style.filter = "blur(0px)";
welcome.style.opacity = "0";
welcome.style.transition = "opacity 1s";
openText.style.animation = "portalText 6s infinite";
setTimeout(() => {
theText.style.animation = "portalText 6s infinite";
}, 2000);
setTimeout(() => {
gateText.style.animation = "portalText 6s infinite";
}, 4000);

setTimeout(() => {
welcome.style.display = "none";

}, 1000);
}

function toggleAudio() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
  updateButton();
}


function updateButton() {
button.textContent = music.paused ? '🎵' : '🔇';
}

button.addEventListener('click', toggleAudio);