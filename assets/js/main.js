/*
	Simple interactions for the portfolio:
	- remove preload state after initial render
	- reveal sections/cards on scroll
	- keep header navigation synced with the visible section
*/

(function () {
	const body = document.body;
	const revealItems = document.querySelectorAll(".reveal");
	const sections = document.querySelectorAll("main section[id]");
	const navLinks = document.querySelectorAll('#header nav a[href^="#"]');

	window.addEventListener("load", function () {
		window.setTimeout(function () {
			body.classList.remove("is-preload");
		}, 120);
	});

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.16,
				rootMargin: "0px 0px -40px 0px",
			}
		);

		revealItems.forEach((item) => revealObserver.observe(item));

		const navObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					const currentId = entry.target.getAttribute("id");
					navLinks.forEach((link) => {
						const isActive = link.getAttribute("href") === "#" + currentId;
						link.classList.toggle("is-active", isActive);
					});
				});
			},
			{
				threshold: 0.45,
				rootMargin: "-20% 0px -35% 0px",
			}
		);

		sections.forEach((section) => navObserver.observe(section));
	} else {
		revealItems.forEach((item) => item.classList.add("visible"));
	}
})();
