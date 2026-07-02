const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

function scrollSpy(sections, navLinks, options = {}) {
    const offset = options.offset ?? 50;
    const activeClass = options.activeClass ?? "active";

    function update() {
        const scrollTop = window.scrollY;

        let activeId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const height = section.offsetHeight;

            if (
                scrollTop > (top - offset) &&
                scrollTop < (top + height)
            ) {
                activeId = section.id;
            }
        });

        if (!activeId) return;

        navLinks.forEach(link => {
            link.classList.remove(activeClass);

            const href = link.getAttribute("href");
            if (href === `#${activeId}`) {
                link.classList.add(activeClass);
            }
        });
    }

    window.addEventListener("scroll", update, { passive: true });

    // initial run
    update();

    // optional return for manual control
    return {
        refresh: update
    };
}

scrollSpy(sections, navLinks, {
    offset: 100,
    activeClass: "active"
});

window.addEventListener("scroll", () => {
    document.body.style.setProperty(
        "--scroll",
        window.scrollY + "px"
    );
});

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    document.body.style.setProperty("--x", x);
    document.body.style.setProperty("--y", y);
});

function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// close when clicking outside modal content
window.onclick = function (event) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

const screenshots = [
        './assets/screenshots/1.png',
        './assets/screenshots/2.png',
        './assets/screenshots/3.png',
        './assets/screenshots/4.png',
        './assets/screenshots/5.png',
        './assets/screenshots/6.png',
        './assets/screenshots/7.png',
        './assets/screenshots/8.png',
        './assets/screenshots/9.png',
        './assets/screenshots/10.png',
        './assets/screenshots/11.png',
        './assets/screenshots/12.png',
    ];

    let currentScreenshot = 0;

    function openScreenshotModal(e) {
        e.preventDefault();
        buildThumbs();
        showScreenshot(0);
        document.getElementById('screenshotModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeScreenshotModal() {
        document.getElementById('screenshotModal').style.display = 'none';
        document.body.style.overflow = '';
    }

    function showScreenshot(i) {
        currentScreenshot = (i + screenshots.length) % screenshots.length;
        document.getElementById('screenshotMain').src = screenshots[currentScreenshot];
        document.getElementById('screenshotIndex').textContent = currentScreenshot + 1;

        document.querySelectorAll('.screenshot-thumbs img').forEach((thumb, idx) => {
            thumb.classList.toggle('active-thumb', idx === currentScreenshot);
        });
    }

    function changeScreenshot(dir) {
        showScreenshot(currentScreenshot + dir);
    }

    function buildThumbs() {
        const container = document.getElementById('screenshotThumbs');
        if (container.childElementCount) return; // build once

        document.getElementById('screenshotTotal').textContent = screenshots.length;

        screenshots.forEach((src, idx) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Screenshot ${idx + 1}`;
            img.onclick = () => showScreenshot(idx);
            container.appendChild(img);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('screenshotModal');
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') changeScreenshot(1);
            if (e.key === 'ArrowLeft') changeScreenshot(-1);
            if (e.key === 'Escape') closeScreenshotModal();
        }
    });

    // Click outside content to close
    document.getElementById('screenshotModal').addEventListener('click', (e) => {
        if (e.target.id === 'screenshotModal') closeScreenshotModal();
    });