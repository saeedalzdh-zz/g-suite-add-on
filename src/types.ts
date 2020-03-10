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

interface Person {
	id?: number;
	name: string;
	email: string;
	phone?: string;
	address?: string;
}

export { EventObject, EmailMessage, Person };