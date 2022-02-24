import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../store/notification-context";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
	const notificationCTX = useContext(NotificationContext);

	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(async () => {
		if (showComments) {
			setIsLoading(true);
			const res = await fetch("/api/comments/" + eventId);
			const data = await res.json();
			setComments(data.comments);
			setIsLoading(false);
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	const addCommentHandler = async (commentData) => {
		notificationCTX.showNotification({
			title: "Commenting",
			message: "Comment has been posted!!",
			status: "pending"
		});

		// send data to API

		try {
			const res = await fetch(`/api/comments/${eventId}`, {
				method: "POST",
				body: JSON.stringify(commentData),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await res.json();
			setComments((props) => [...props, data.comment]);
			notificationCTX.showNotification({
				title: "Commented!!",
				message: "Successfully Commented!!",
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
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? "Hide" : "Show"} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isLoading && <CommentList comments={comments} />}
			{showComments && isLoading && <p>Loading...</p>}
		</section>
	);
}

export default Comments;
