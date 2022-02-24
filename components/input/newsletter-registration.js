import { useContext, useRef } from "react";
import { NotificationContext } from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
	const notificationCTX = useContext(NotificationContext);

	const emailHandler = useRef(notificationCTX);

	const registrationHandler = async (event) => {
		event.preventDefault();

		// fetch user input (state or refs)
		// optional: validate input
		// send valid data to API
		notificationCTX.showNotification({
			title: "Signing up...",
			message: "Registering for newsletter.",
			status: "pending"
		});

		try {
			const emailId = emailHandler.current.value;

			const res = await fetch("/api/newsletter/", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify({ emailId })
			});
			let data;
			if (res.ok) {
				data = await res.json();
			} else {
				const err = await res.json();
				throw new Error(err.message || "Something went Wrong!!");
			}
			console.log(data);

			notificationCTX.showNotification({
				title: "Success!!",
				message: "Successfully registered for newsletter!!",
				status: "success"
			});
		} catch (error) {
			notificationCTX.showNotification({
				title: "Error!!",
				message: error.message,
				status: "error"
			});
		}
	};

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={emailHandler}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
