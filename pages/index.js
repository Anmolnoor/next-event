import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsLetter from "../components/input/newsletter-registration";

const FeaturedEvents = (props) => {
	const { featuredEvents } = props;
	return (
		<div>
			<Head>
				<title>Nextjs Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to evolve.....'
				/>
			</Head>
			<NewsLetter />
			<EventList items={featuredEvents} />
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
