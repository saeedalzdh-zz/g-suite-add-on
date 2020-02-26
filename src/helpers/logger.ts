export const logger = (log: object) => {

	const traceCode = Utilities.getUuid();

	const parameters = {
		...log,
		traceCode
	};

	// using console class to log in stackdriver
	// eslint-disable-next-line no-console
	console.log(parameters);

	// using Logger class to log in apps script project for debugging
	Logger.log(JSON.stringify(parameters));

	return traceCode;
};
