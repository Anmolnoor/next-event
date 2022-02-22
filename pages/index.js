import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";

const FeaturedEvents = () => {
	const featuredEvents = getFeaturedEvents();
	return (
		<div>
			<center>
				<EventList items={featuredEvents} />
			</center>
		</div>
	);
};

export default FeaturedEvents;
