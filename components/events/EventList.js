import React from "react";
import EventItem from "./EventItem";

import classes from "./event-list.module.css";

const EventList = (props) => {
	const { items } = props;
	return (
		<ul className={classes.list}>
			{items.map((el, i) => {
				return (
					<EventItem
						key={i}
						id={el.id}
						title={el.title}
						location={el.location}
						date={el.date}
						image={el.image}
					/>
				);
			})}
		</ul>
	);
};

export default EventList;
