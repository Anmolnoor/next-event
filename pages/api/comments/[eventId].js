import axios from "axios";

// const comments = [
// 	{
// 		id: "c1",
// 		comment: "This is a comment c1.",
// 		address: "Anmol Noor"
// 	},
// 	{
// 		id: "c2",
// 		comment: "This is a comment c2.",
// 		address: "Anmol Noor"
// 	},
// 	{
// 		id: "c3",
// 		comment: "This is a comment c3.",
// 		address: "Anmol Noor"
// 	}
// ];

const handler = async (req, res) => {
	const eventId = req.query.eventId;

	if (req.method === "POST") {
		const { email, name, text } = req.body;
		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim === "" ||
			!text ||
			text.trim === ""
		) {
			res.status(422).json({ message: "Invalid input" });
			return;
		}

		const newComment = {
			id: new Date().toISOString(),
			eventId,
			email,
			text,
			name
		};

		const response = await axios.post(
			"https://next-events-8d9a1-default-rtdb.firebaseio.com/comments.json",
			{
				id: new Date().toISOString(),
				eventId,
				email,
				text,
				name
			}
		);

		console.log(response);

		console.log(newComment);
		res.status(201).json({ message: "Added Comments!!", comment: newComment });
	} else if (req.method === "GET") {
		const response = await axios(
			"https://next-events-8d9a1-default-rtdb.firebaseio.com/comments.json"
		);
		// const data = await response.json();
		console.log(response);
		const items = response.data;
		const comments = [];
		for (let key in items) {
			comments.push(items[key]);
		}
		res.status(200).json({ comments });
	}
};

export default handler;
