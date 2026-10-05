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