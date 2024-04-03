<?php
function countdown_banner_admin_page()
{
	add_submenu_page(
		"themes.php",
		"Event Countdown Banner",
		"Event Countdown Banner",
		"manage_options",
		"event-countdown-banner",
		"countdown_banner_admin_page_callback",
	);
}

add_action("admin_menu", "countdown_banner_admin_page");

function countdown_banner_admin_page_callback()
{
	$admin_page_js = plugin_dir_url(__FILE__) . "../build/admin/admin-page.js";
	$colour_picker_js =
		plugin_dir_url(__FILE__) . "../build/admin/colour-picker.js";
	$admin_page_css =
		plugin_dir_url(__FILE__) . "../build/admin/admin-page.css";
	$admin_page_js_path =
		plugin_dir_path(__FILE__) . "../build/admin/admin-page.js";
	$colour_picker_js_path =
		plugin_dir_path(__FILE__) . "../build/admin/colour-picker.js";
	$admin_page_css_path =
		plugin_dir_path(__FILE__) . "../build/admin/admin-page.css";
	$admin_page_js_version = filemtime($admin_page_js_path);
	$colour_picker_js_version = filemtime($colour_picker_js_path);
	$admin_page_css_version = filemtime($admin_page_css_path);
	wp_enqueue_script(
		"event-countdown-admin-js",
		$admin_page_js,
		["wp-element"],
		$admin_page_js_version,
		true,
	);
	wp_enqueue_style(
		"event-countdown-admin-css",
		$admin_page_css,
		[],
		$admin_page_css_version,
	);
	wp_enqueue_style("wp-color-picker");
	wp_enqueue_script(
		"fsd-b-js",
		$colour_picker_js,
		["wp-color-picker"],
		$colour_picker_js_version,
		true,
	);
	$nonce = wp_create_nonce("wp_rest");

	if (
		isset($_POST["nonce"]) &&
		wp_verify_nonce($_POST["nonce"], "your_nonce_action")
	) {
	}
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
		"nonce" => $nonce,
	];

	wp_localize_script("event-countdown-admin-js", "php_vars", $data);
}
