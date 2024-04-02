import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./admin-page.css";
import "../countdown-header.css";
import logo from "../images/ECH-logo.png";
import cardLayout from "../images/card-layout.png";
import textStackedLayout from "../images/text-stacked-layout.png";
import textWithSeparatorLayout from "../images/text-with-separator-layout.png";
import DisplayHeader from "../components/display-banner";

function AdminPage() {
	const [backgroundColour, setBackgroundColour] = useState(
		php_vars.backgroundColour,
	);
	const [textColour, setTextColour] = useState(php_vars.textColour);
	const [cardColour, setCardColour] = useState(php_vars.cardColour);
	const [layout, setLayout] = useState(php_vars.layout);
	const [separatorText, setSeparatorText] = useState(php_vars.separatorText);
	const posts = php_vars.postMeta;
	const selectedPost = php_vars.selectedPost;
	const displayBanner = php_vars.displayBanner;
	const lockBanner = php_vars.lockBanner;

	useEffect(() => {
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-background-colour", backgroundColour);
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-text-colour", textColour);
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-card-colour", cardColour);
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-separator-text", `"${separatorText}"`);
		const checkStyleUpdate = setInterval(() => {
			const wpPickerOpen = document.querySelector(".wp-picker-open");
			if (wpPickerOpen) {
				const grandparent = wpPickerOpen.parentElement?.parentElement;
				if (
					grandparent?.classList.contains("background-colour-picker")
				) {
					const style = window.getComputedStyle(wpPickerOpen);
					const previewBackgroundColour =
						style.getPropertyValue("background-color");
					document
						.getElementById("ech-timer")
						.style.setProperty(
							"--ech-background-colour",
							previewBackgroundColour,
						);
				}
				if (grandparent?.classList.contains("text-colour-picker")) {
					const style = window.getComputedStyle(wpPickerOpen);
					const previewBackgroundColour =
						style.getPropertyValue("background-color");
					document
						.getElementById("ech-timer")
						.style.setProperty(
							"--ech-text-colour",
							previewBackgroundColour,
						);
				}
				if (grandparent?.classList.contains("card-colour-picker")) {
					const style = window.getComputedStyle(wpPickerOpen);
					const previewBackgroundColour =
						style.getPropertyValue("background-color");
					document
						.getElementById("ech-timer")
						.style.setProperty(
							"--ech-card-colour",
							previewBackgroundColour,
						);
				}
			}
		}, 50);

		return () => {
			clearInterval(checkStyleUpdate);
		};
	}, []);

	useEffect(() => {
		document
			.getElementById("ech-timer")
			.style.setProperty("--ech-separator-text", `"${separatorText}"`);
	}, [separatorText]);

	return (
		<div className="ech-admin">
			<div className="admin-header">
				<h1>Event Countdown Header Settings</h1>
				{/* <img
					src={logo}
					alt="Event Countdown Header Logo"
					// width="250"
					height="250"
				/> */}
			</div>
			<form method="post" className="choose-post-form">
				<input type="hidden" name="nonce" value={php_vars.nonce} />
				<div className="post-section">
					<h3>Choose a post to display in the header</h3>
					<div className="post-list">
						<label
							htmlFor="tribe_events_post_type"
							className="label-name"
						>
							Post name
						</label>
						<select
							name="tribe_events_post_type"
							defaultValue={selectedPost}
							className="select"
						>
							<option value="none">None</option>
							{posts.map((post, index) => (
								<option key={index} value={post.ID}>
									{post.post_title}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="display-section">
					<h3>Display options</h3>
					<div className="display-options">
						<label className="label-option">
							<span className="label-title">Display Banner</span>
							<div className="switch">
								<input
									type="checkbox"
									name="display_banner"
									defaultChecked={displayBanner === "on"}
								/>
								<span className="slider round"></span>
							</div>
						</label>
						<label className="label-option">
							<span className="label-title">
								Lock Banner to Top
							</span>
							<div className="switch">
								<input
									type="checkbox"
									name="lock_banner"
									defaultChecked={lockBanner === "on"}
								/>
								<span className="slider round"></span>
							</div>
						</label>
					</div>
				</div>
				<div className="layout-section">
					<h3>Layout options</h3>
					<div className="layout-options">
						<label className="image-radio-button">
							<input
								checked={layout === "default"}
								onChange={(e) => setLayout(e.target.value)}
								type="radio"
								name="layout"
								value="default"
								className="image-radio-input"
							/>
							<span className="image-radio-image">
								<img
									src={cardLayout}
									value="default"
									alt="Card Layout"
									width="300"
								/>
							</span>
						</label>
						<label className="image-radio-button">
							<input
								checked={layout === "text-stacked"}
								onChange={(e) => setLayout(e.target.value)}
								type="radio"
								name="layout"
								value="text-stacked"
								className="image-radio-input"
							/>
							<span className="image-radio-image">
								<img
									src={textStackedLayout}
									value="stacked-text"
									alt="Stacked text layout"
									width="300"
								/>
							</span>
						</label>
						<label className="image-radio-button">
							<input
								checked={layout === "text-separator"}
								onChange={(e) => setLayout(e.target.value)}
								type="radio"
								name="layout"
								value="text-separator"
								className="image-radio-input"
							/>
							<span className="image-radio-image">
								<img
									src={textWithSeparatorLayout}
									value="separator-text"
									alt="Inline text with separator layout"
									width="300"
								/>
							</span>
						</label>
					</div>
				</div>
				<div className="style-section">
					<h3>Style options</h3>
					<div className="style-options">
						<div className="style-inputs">
							<label
								htmlFor="background_colour"
								className="label-name"
							>
								Background Colour
							</label>
							<div className="background-colour-picker">
								<input
									type="text"
									name="background_colour"
									value={backgroundColour}
									onChange={(e) =>
										setBackgroundColour(e.target.value)
									}
									className="ech-colour-field"
								/>
							</div>
						</div>
						<div className="style-inputs">
							<label htmlFor="text_colour" className="label-name">
								Text Colour
							</label>
							<div className="text-colour-picker">
								<input
									type="text"
									name="text_colour"
									value={textColour}
									onChange={(e) =>
										setTextColour(e.target.value)
									}
									className="ech-colour-field"
								/>
							</div>
						</div>
						{layout === "default" || layout === "text-separator" ? (
							<div className="style-inputs">
								<label
									htmlFor="card_colour"
									className="label-name"
								>
									{layout === "default"
										? "Card Colour"
										: "Separator Colour"}
								</label>
								<div className="card-colour-picker">
									<input
										type="text"
										name="card_colour"
										value={cardColour}
										onChange={(e) =>
											setCardColour(e.target.value)
										}
										className="ech-colour-field"
									/>
								</div>
							</div>
						) : null}
						{layout === "text-separator" ? (
							<div className="style-inputs">
								<label
									htmlFor="separator_text"
									className="label-name"
								>
									Separator Text
								</label>
								<input
									type="text"
									name="separator_text"
									className="separator-text"
									value={separatorText}
									onChange={(e) =>
										setSeparatorText(e.target.value)
									}
									autoComplete="off"
								></input>
							</div>
						) : null}
					</div>
				</div>
				<input className="submit-btn" type="submit" value="Save" />
			</form>
			<div className="preview-section">
				<h3>Preview</h3>
				<h5>Styling may slightly vary based on theme</h5>
				<div className="event-countdown-timer" id="ech-timer">
					<div className={layout}>
						<DisplayHeader />
					</div>
				</div>
			</div>
		</div>
	);
}

const wpbody = document.getElementById("wpbody");
const rootDiv = document.createElement("div");
rootDiv.className = "event-countdown-admin";
wpbody.appendChild(rootDiv);
createRoot(rootDiv).render(<AdminPage />);
