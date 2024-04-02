import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./countdown-header.css";
import DisplayHeader from "./components/display-banner";

function EventCountdownHeader() {
	var lockHeader = php_vars.lock_banner;

	return (
		<div
			className={`${php_vars.layout} ${lockHeader === "on" ? "countdown-header-locked" : ""}`}
		>
			<DisplayHeader />
		</div>
	);
}

var header = document.querySelector("header");
if (header) {
	var headerDiv = document.createElement("div");
	headerDiv.className = "event-countdown-timer";
	headerDiv.id = "ech-timer";
	header.insertBefore(headerDiv, header.firstChild);
	createRoot(headerDiv).render(<EventCountdownHeader />);
}
