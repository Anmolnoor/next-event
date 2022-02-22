import router, { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../dummy-data";

const Events = () => {
	const router = useRouter();
	const events = getAllEvents();

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
};

export default Events;
