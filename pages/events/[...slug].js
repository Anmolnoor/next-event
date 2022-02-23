import Head from "next/head";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/ui/error-alert";
import Button from "../../components/events/ui/Button";
import { getFilteredEvents } from "../../helpers/api-util";
import { useRouter } from "next/router";

const EventBySlug = (props) => {
	const router = useRouter();

	const filterData = router.query.slug;

	const { hasError, events, date } = props;

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name='description' content={`A liat of filtered events.`} />
		</Head>
	);

	if (!events) {
		return (
			<div>
				{pageHeadData}
				<p className='center'>Loading.....</p>;
			</div>
		);
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (hasError) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid Filter. Please adjust your values</p>;
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	// const filteredEvents = getFilteredEvents({
	// 	year: numYear,
	// 	month: numMonth
	// });

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				name='description'
				content={`All events for ${numMonth}/${numYear}.`}
			/>
		</Head>
	);

	if (!events || events.length === 0) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const dates = new Date(date.numYear, date.numMonth - 1);

	return (
		<Fragment>
			{pageHeadData}
			<ResultTitle date={dates} />
			<EventList items={events} />
		</Fragment>
	);
};

export default EventBySlug;

export const getServerSideProps = async (context) => {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numMonth > 12 ||
		numMonth < 1 ||
		numYear > 2023 ||
		numYear < 2021
	) {
		return {
			props: {
				hasError: true
			}
			// notFound: true
			// redirect: {
			// 	destination: '/error'
			// }
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	return {
		props: {
			events: filteredEvents,
			date: {
				year: numYear,
				month: numMonth
			}
		}
	};
};
