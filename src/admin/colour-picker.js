jQuery(document).ready(function ($) {
	$(".ech-colour-field").wpColorPicker();
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === "childList") {
				$(mutation.addedNodes)
					.find(".ech-colour-field")
					.wpColorPicker();
			}
		});
	});
	observer.observe(document.body, { childList: true, subtree: true });
});
