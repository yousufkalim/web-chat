import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
	const [message, setMessage] = useState({ name: "", message: "" });
	const [chat, setChat] = useState([]);

	// Listening for a new message
	useEffect(() => {
		socket.on("message", (payload) => {
			setChat([...chat, payload]);
		});
	});

	// Handle Input
	const handleInput = (e) => {
		setMessage({ ...message, [e.target.name]: e.target.value });
	};

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit("message", message);
		setMessage({ name: "", message: "" });
	};

	// Render
	return (
		<div className="App">
			<h1>Web Chat</h1>
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="name"
							placeholder="name"
							onChange={handleInput}
							value={message.name}
						/>
						<textarea
							name="message"
							cols="30"
							rows="10"
							placeholder="Enter your message"
							onChange={handleInput}
							value={message.message}
						></textarea>
						<button type="submit">Send</button>
					</form>
				</div>
				<br />
				<br />
				<div>
					{chat.map((msg) => {
						return (
							<div>
								<b>{msg.name}:&nbsp;</b>
								<span>{msg.message}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default App;
