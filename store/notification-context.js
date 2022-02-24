import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
	notification: null, // {title, message, status}
	showNotification: (notificationData) => {},
	hideNotification: () => {}
});

const NotificationContextProvider = (props) => {
	const [activeNotification, setActiveNotification] = useState();

	const useFxn = () => {
		if (
			activeNotification &&
			(activeNotification.status === "success" ||
				activeNotification.status === "error")
		) {
			const timmer = setTimeout(() => {
				setActiveNotification(null);
			}, 2000);
			return () => {
				clearTimeout(timmer);
			};
		}
	};
	const useArray = [activeNotification];

	useEffect(useFxn, useArray);

	const showNotification = (notificationData) => {
		setActiveNotification(notificationData);
	};

	const hideNotification = () => {
		setActiveNotification(null);
	};

	const context = {
		notification: activeNotification,
		showNotification: showNotification,
		hideNotification: hideNotification
	};

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
