import { useRouter } from "next/router";
import Head from "next/head";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/api-util";

const Events = (props) => {
	const router = useRouter();
	const { events } = props;

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<Head>
				<title>All Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve.....'
				/>
			</Head>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
};

export default Events;

export const getStaticProps = async () => {
	const events = await getAllEvents();

	return {
		props: {
			events
		},
		revalidate: 60
	};
};
