<?php

add_filter(
	"plugin_action_links_event-countdown-banner/event-countdown-banner.php",
	"ech_settings_link",
);
function ech_settings_link($links)
{
	$url = esc_url(
		add_query_arg(
			"page",
			"event-countdown-banner",
			get_admin_url() . "themes.php",
		),
	);
	$settings_link = "<a href='$url'>" . __("Settings") . "</a>";
	array_push($links, $settings_link);
	return $links;
}
