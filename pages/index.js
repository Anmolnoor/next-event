import React from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";

const FeaturedEvents = (props) => {
	const { featuredEvents } = props;
	return (
		<div>
			<center>
				<EventList items={featuredEvents} />
			</center>
		</div>
	);
};

export default FeaturedEvents;

export const getStaticProps = async () => {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			featuredEvents: featuredEvents
		},
		revalidate: 1800
	};
};
