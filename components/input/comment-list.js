import classes from "./comment-list.module.css";

function CommentList(props) {
	const { comments } = props;
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			{comments.map((el) => {
				return (
					<li key={el.id}>
						<p>{el.text}</p>
						<div>
							By <address>{el.name}</address>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default CommentList;
