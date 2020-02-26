interface EventObject {
	hostApp: string;
	clientPlatform: string;
	commonEventObject: {
		hostApp: string,
		platform: string
	};
	messageMetadata?: { 
		accessToken: string,
		messageId: string
	};
}

interface EmailMessage {
	getFrom(): string;
	getTo(): string;
	getCc(): string;
}

interface Contact {
	name: string;
	email: string;
}

export { EventObject, EmailMessage, Contact };