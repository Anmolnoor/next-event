import axios from "axios";

const handler = async (req, res) => {
	if (req.method === "POST") {
		const emailID = req.body.emailId;
		if (!emailID || !emailID.includes("@")) {
			res.status(422).json({ message: "Invalid Email Address" });
			return;
		}

		const response = await axios.post(
			"https://next-events-8d9a1-default-rtdb.firebaseio.com/newsletter.json",
			{ email: emailID }
		);

		console.log(response);

		// const responce = await fetch(
		// 	"https://next-events-8d9a1-default-rtdb.firebaseio.com/newsletter.json",
		// 	{
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		},
		// 		method: "POST",
		// 		body: { email: emailID }
		// 	}
		// );
		// console.log({ responce });
		console.log("The email from News Letter : ", emailID);
		res.status(201).json({ message: "Signed Up!!" });
	}
};

export default handler;
