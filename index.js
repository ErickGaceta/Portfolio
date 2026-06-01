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