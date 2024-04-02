<?php
/**
 * Plugin Name: Event Countdown Header
 * Description: Adds a countdown timer for a specific event to the header of every page. Allows colour customisation of the banner
 * Version: 1.1.0
 * Author: Jamie Speller
 * Author URI: mailto:plugins@xhem.al?subject=Event%20Countdown%20Header
 */

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

function error_notice()
{
	$url =
		"plugin-install.php?tab=plugin-information&plugin=the-events-calendar&TB_iframe=true";
	$title = "The Events Calendar";
	printf(
		'<div class="error CTEC_Msz"><p>' . esc_html(__('%1$s %2$s', "tecc1")),
		esc_html(
			__("To use Event Countdown Header, install and activate", "tecc1"),
		),
		sprintf(
			'<a href="%s" class="thickbox" title="%s">%s</a>',
			esc_url($url),
			esc_html($title),
			esc_html($title),
		) . "</p></div>",
	);
}

if (!function_exists("is_plugin_active")) {
	include_once ABSPATH . "wp-admin/includes/plugin.php";
}
if (!is_plugin_active("the-events-calendar/the-events-calendar.php")) {
	deactivate_plugins(plugin_basename(__FILE__));
	add_action("admin_notices", "error_notice");
} else {
	plugin_activated();
}

function plugin_activated()
{
	require_once plugin_dir_path(__FILE__) . "/admin/admin-page.php";
	require_once plugin_dir_path(__FILE__) . "/admin/settings-link.php";

	$selected_post = get_option("countdown_banner_selected_tribe_event", "-1");
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

	if ($selected_post != "-1") {
		$selected_post_id = get_post($selected_post)->ID;
		$post_title = get_post($selected_post_id)->post_title;
		$post_url = get_post_field("post_name", $selected_post_id);
		$post_meta = get_post_meta($selected_post);
		$startDateTime = $post_meta["_EventStartDate"][0];
		$data = [
			"post_url" => $post_url,
			"startDateTime" => $startDateTime,
			"post_title" => $post_title,
			"display_banner" => $display_banner,
			"lock_banner" => $lock_banner,
			"background_colour" => $background_colour,
			"text_colour" => $text_colour,
			"card_colour" => $card_colour,
			"layout" => $layout,
			"separator_text" => $separator_text,
		];
		$today = new DateTime();
		if ($display_banner === "on" && new DateTime($startDateTime) > $today) {
			if (!is_admin()) {
				wp_enqueue_script(
					"event-countdown-js",
					plugin_dir_url(__FILE__) .
						"build/event-countdown-header.js",
					["wp-element"],
					1,
					true,
				);
				wp_localize_script("event-countdown-js", "php_vars", $data);
				wp_enqueue_style(
					"event-countdown-css",
					plugin_dir_url(__FILE__) .
						"build/event-countdown-header.css",
				);
			}
		}
	}
}