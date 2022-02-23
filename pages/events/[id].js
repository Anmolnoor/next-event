import React, { Fragment } from "react";
// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/events/ui/error-alert";

const EventById = (props) => {
	// const router = useRouter();

	// const id = router.query.id;
	// const event = getEventById(id);

	const { event } = props;

	if (!event) {
		return (
			<div className='center'>
				<p>Loading...!!</p>
			</div>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name='description' content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
};

export default EventById;

export const getStaticProps = async (context) => {
	const eventId = context.params.id;
	const event = await getEventById(eventId);

	return {
		props: {
			event
		},
		revalidate: 30
	};
};

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const paths = events.map((event) => ({ params: { id: event.id } }));
	return {
		paths: paths,
		fallback: "blocking"
	};
};
