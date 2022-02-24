import React, { Fragment, useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "../events/ui/notification";
import { NotificationContext } from "../../store/notification-context";

const Layout = (props) => {
	const context = useContext(NotificationContext);

	const activeNotification = context.notification;

	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</Fragment>
	);
};

export default Layout;
