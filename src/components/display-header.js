import React, { useEffect, useState } from "react";

export default function DisplayHeader() {
	let startDateTime;
	let post_url;
	let post_title;
	if (php_vars.startDateTime) {
		startDateTime = php_vars.startDateTime;
		post_url = php_vars.post_url;
		post_title = php_vars.post_title;
		document
			.getElementById("ech-timer")
			.style.setProperty(
				"--ech-background-colour",
				php_vars.background_colour,
			);
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-text-colour", php_vars.text_colour);
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-card-colour", php_vars.card_colour);
		document
			.getElementById("ech-timer")
			.style.setProperty(
				"--ech-separator-text",
				`"${php_vars.separator_text}"`,
			);
	} else {
		startDateTime = new Date().getTime() + 100000000;
		post_url = "example-event";
		post_title = "Example Event";
	}

	const [daysLeft, setDaysLeft] = useState(0);
	const [hoursLeft, setHoursLeft] = useState(0);
	const [minsLeft, setMinsLeft] = useState(0);
	const [secsLeft, setSecsLeft] = useState(0);

	useEffect(() => {
		var jsDate = new Date(startDateTime);
		var now = new Date();
		var diff = jsDate.getTime() - now.getTime();
		var days = Math.floor(diff / (1000 * 60 * 60 * 24));
		diff -= days * (1000 * 60 * 60 * 24);
		var hours = Math.floor(diff / (1000 * 60 * 60));
		diff -= hours * (1000 * 60 * 60);
		var mins = Math.floor(diff / (1000 * 60));
		diff -= mins * (1000 * 60);
		var secs = Math.floor(diff / 1000);
		setDaysLeft(days);
		setHoursLeft(hours);
		setMinsLeft(mins);
		setSecsLeft(secs);
		setInterval(function () {
			secs--;
			if (secs < 0) {
				secs = 59;
				mins--;
				if (mins < 0) {
					mins = 59;
					hours--;
					if (hours < 0) {
						hours = 23;
						days--;
					}
				}
			}
			setDaysLeft(days);
			setHoursLeft(hours);
			setMinsLeft(mins);
			setSecsLeft(secs);
		}, 1000);
	}, []);

	useEffect(() => {
		const header = document.querySelector(".countdown-header-locked");
		const timer = document.querySelector(".event-countdown-timer");
		if (header && timer) {
			timer.style.height = `${header.offsetHeight}px`;
		}
	});

	return (
		<a className="event-link" href={`/event/${post_url}`}>
			<div className="countdown-header">
				<div className="days-div countdown-timers">
					<span className="days-left time-left" id="days-left">
						{daysLeft < 10 ? `0${daysLeft}` : daysLeft}
					</span>
					<span className="days">Days</span>
				</div>
				<div className="hours-div countdown-timers">
					<span className="hours-left time-left" id="hours-left">
						{hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}
					</span>
					<span className="hours">Hours</span>
				</div>
				<div className="mins-div countdown-timers">
					<span className="mins-left time-left" id="mins-left">
						{minsLeft < 10 ? `0${minsLeft}` : minsLeft}
					</span>
					<span className="mins">Mins</span>
				</div>
				<div className="secs-div countdown-timers">
					<span className="secs-left time-left" id="sec-left">
						{secsLeft < 10 ? `0${secsLeft}` : secsLeft}
					</span>
					<span className="secs">Secs</span>
				</div>
				<div className="event-title-div">
					<span className="event-title"> Until {post_title}</span>
				</div>
			</div>
		</a>
	);
}
