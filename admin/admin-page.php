<?php
function countdown_header_admin_page()
{
	add_submenu_page(
		"themes.php",
		"Event Countdown Header",
		"Event Countdown Header",
		"manage_options",
		"event-countdown-header",
		"countdown_header_admin_page_callback",
	);
}

add_action("admin_menu", "countdown_header_admin_page");

function countdown_header_admin_page_callback()
{
	wp_enqueue_script(
		"event-countdown-admin-js",
		plugin_dir_url(__FILE__) . "../build/admin/admin-page.js",
		["wp-element"],
		null,
		true,
	);
	wp_enqueue_style(
		"event-countdown-admin-css",
		plugin_dir_url(__FILE__) . "../build/admin/admin-page.css",
	);
	wp_enqueue_style("wp-color-picker");
	wp_enqueue_script(
		"fsd-b-js",
		plugin_dir_url(__FILE__) . "../build/admin/colour-picker.js",
		["wp-color-picker"],
		false,
		true,
	);

	if (isset($_POST["tribe_events_post_type"])) {
		$selected_post =
			$_POST["tribe_events_post_type"] == "none"
				? -1
				: $_POST["tribe_events_post_type"];
		update_option("countdown_banner_selected_tribe_event", $selected_post);
		update_option(
			"countdown_banner_display_banner",
			isset($_POST["display_banner"]) && $_POST["display_banner"] === "on"
				? "on"
				: "off",
		);
		update_option(
			"countdown_banner_lock_banner",
			isset($_POST["lock_banner"]) && $_POST["lock_banner"] === "on"
				? "on"
				: "off",
		);
		update_option(
			"countdown_banner_background_colour",
			$_POST["background_colour"],
		);
		update_option("countdown_banner_text_colour", $_POST["text_colour"]);
		if (isset($_POST["card_colour"])) {
			update_option(
				"countdown_banner_card_colour",
				$_POST["card_colour"],
			);
		}
		if (isset($_POST["separator_text"])) {
			update_option(
				"countdown_banner_separator",
				$_POST["separator_text"],
			);
		}
		update_option("countdown_banner_layout", $_POST["layout"]);
	}

	$posts = get_posts([
		"post_type" => "tribe_events",
		"post_status" => "publish",
		"numberposts" => -1,
	]);

	$selected_post = get_option("countdown_banner_selected_tribe_event", "");
	$display_banner = get_option("countdown_banner_display_banner", "off");
	$lock_banner = get_option("countdown_banner_lock_banner", "off");
	$background_colour = get_option(
		"countdown_banner_background_colour",
		"#0a0000",
	);
	$text_colour = get_option("countdown_banner_text_colour", "#ffffff");
	$card_colour = get_option("countdown_banner_card_colour", "#FF0000");
	$layout = get_option("countdown_banner_layout", "default");
	$separator_text = get_option("countdown_banner_separator", "|");
	$post_meta = [];
	$tribe_meta = [];

	foreach ($posts as $post) {
		$eventStartDate = get_post_meta($post->ID, "_EventStartDate", true);
		$eventStartDate = new DateTime($eventStartDate);
		$today = new DateTime();
		if ($eventStartDate > $today) {
			$post_meta[] = $post;
			$tribe_meta[] = get_post_meta($post->ID);
		}
	}

	$data = [
		"posts" => $posts,
		"postMeta" => $post_meta,
		"tribeMeta" => $tribe_meta,
		"selectedPost" => $selected_post,
		"displayBanner" => $display_banner,
		"lockBanner" => $lock_banner,
		"backgroundColour" => $background_colour,
		"textColour" => $text_colour,
		"cardColour" => $card_colour,
		"layout" => $layout,
		"separatorText" => $separator_text,
	];

	wp_localize_script("event-countdown-admin-js", "php_vars", $data);
}
