import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/events/ui/error-alert";
import Button from "../../components/events/ui/Button";
import { getFilteredEvents } from "../../dummy-data";

const EventBySlug = () => {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) {
		return <p className='center'>Loading.....</p>;
	}

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
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid Filter. Please adjust your values</p>;
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter!!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
};

export default EventBySlug;
