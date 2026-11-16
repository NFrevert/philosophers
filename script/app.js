const contentBox = document.querySelector(".content-box");

async function loadPage(page, pushState = true) {

    const response = await fetch(`html/${page}.html`);

    if (!response.ok) {
        contentBox.innerHTML =
            "<h1>404</h1>";
        return;
    }

    contentBox.classList.add("hidden");

    // Warten bis Fade-Out fertig
    await new Promise(resolve => setTimeout(resolve, 300));

    const html = await response.text();

    contentBox.innerHTML = html;

    // Reflow erzwingen
    void contentBox.offsetWidth;

    // Fade-In
    contentBox.classList.remove("hidden");


    setActiveMenu(page);

    if(page === 'music')
    {
        enableAudio();
    }

    if (pushState) {
        history.pushState(
            { page },
            "",
            `#${page}`
        );
    }
}

// Set the active menu item based on the current page
function setActiveMenu(currentPage) {

    document.querySelectorAll(".navigation a")
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === currentPage
            );

        });
}

// Navigation
document
    .querySelectorAll(".navigation a")
    .forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const page = link.dataset.page;

            loadPage(page);

        });

    });

// Browser-Back-Button
window.addEventListener("popstate", e => {

    const page =
        e.state?.page ||
        "home";

    loadPage(page, false);

});

// Initial page load
const initialPage =
    location.hash.replace("#", "") ||
    "aboutus";

loadPage(initialPage, false);

function enableAudio() {
    // Audio-Spieler
const player = document.getElementById("audioPlayer");
// Alle Songs
const tracks = document.querySelectorAll(".track");

let currentTrack = null;

tracks.forEach(track => {
  const play = track.querySelector(".play");
  const pause = track.querySelector(".pause");
  const stop = track.querySelector(".stop");
  const toggleLyrics = track.querySelector(".toggleLyrics");
  const lyrics = track.querySelector(".lyrics");
  const loading = track.querySelector(".track-loading");
  const button = track.querySelector("button");
  let hasLoaded = false;

  const source = track.dataset.src;

  function allButtonsInactive() {
    tracks.forEach(t => {
        const btn = t.querySelector("button");
        if(btn) {
            btn.classList.remove("active");
        }
    });
  }

  function buttonActive() {
    allButtonsInactive();
    setTimeout(() => {
        button.classList.add("active");
    }, 100);
  }

  play.addEventListener("click", () => {
    buttonActive();
    if(!hasLoaded) {
        hasLoaded = true;
        
        loading.style.display = "block";
        loading.style.maxHeight = "0";

        requestAnimationFrame(() => {
            loading.classList.add(['active']);
            loading.style.maxHeight = loading.scrollHeight + "px";
        })

        loading.classList.add(['active']);
        setTimeout(() => {
            loading.style.maxHeight = loading.scrollHeight + "px";

            requestAnimationFrame(() => {
                loading.classList.remove(['active']);
                loading.style.maxHeight = "0";
            })
        }, 3000)
    }

    // Anderen Song stopen
    if (currentTrack !== track) {
      allButtonsInactive();
      player.pause();
      player.currentTime = 0;

      player.src = source;
      currentTrack = track;
    }

    player.play();
  });

  pause.addEventListener("click", () => {
    allButtonsInactive();
    // pause
    player.pause();
  });

  stop.addEventListener("click", () => {
    // stopp
    player.pause();
    player.currentTime = 0;
    currentTrack = null;
    player.removeAttribute("src");
    player.load();
  });

  toggleLyrics.addEventListener("click", () => {
    if(lyrics.classList.contains('open'))
    {
        lyrics.style.maxHeight = (lyrics.scrollHeight + 20) + "px";
        
        requestAnimationFrame(() => {
            lyrics.classList.remove(['open']);
            lyrics.style.maxHeight = "0";
        })
        
    } else {
        lyrics.style.display = "block";
        lyrics.style.maxHeight = "0";

        requestAnimationFrame(() => {
            lyrics.classList.add(['open']);
            lyrics.style.maxHeight = (lyrics.scrollHeight + 20) + "px";
        })
    }
  });
})
}