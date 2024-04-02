<?php
// If uninstall is not called from WordPress, exit
if (!defined("WP_UNINSTALL_PLUGIN")) {
	exit();
}

// Delete options from the options table
delete_option("countdown_banner_selected_tribe_event");
delete_option("countdown_banner_display_banner");
delete_option("countdown_banner_lock_banner");
delete_option("countdown_banner_background_colour");
delete_option("countdown_banner_text_colour");
delete_option("countdown_banner_card_colour");
delete_option("countdown_banner_layout");
delete_option("countdown_banner_separator");

// For site options in Multisite
delete_site_option("countdown_banner_selected_tribe_event");
delete_site_option("countdown_banner_display_banner");
delete_site_option("countdown_banner_lock_banner");
delete_site_option("countdown_banner_background_colour");
delete_site_option("countdown_banner_text_colour");
delete_site_option("countdown_banner_card_colour");
delete_site_option("countdown_banner_layout");
delete_site_option("countdown_banner_separator");
