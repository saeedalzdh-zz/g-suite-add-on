import { EventObject, EmailMessage, Contact } from '../types';

class RetriveContacts {
	private _messageId: string = '';
	private _accessToken: string = '';
	constructor(event: EventObject) {
		const { messageMetadata } = event;

		if (messageMetadata) {
			this._messageId = messageMetadata.messageId;
			this._accessToken = messageMetadata.accessToken;
		}
	}

	private _getUniqueContacts(contacts: Contact[]): Contact[] {
		return contacts.reduce((uniqueContacts: Contact[], contact: Contact) => {
			for (var i = 0; i < uniqueContacts.length; i++) {
				const uniqueContact = uniqueContacts[i];
				if (uniqueContact.email.toLowerCase() === contact.email.toLowerCase()) {
					return uniqueContacts;
				}
			}

			return [
				...uniqueContacts,
				contact
			]
		}, []);
	};

	private _isCurrentUserEmail(email: string): boolean {
		return /(.*no-reply.*|.*noreply.*|.*@docs.google.com)/.test(email);
	}

	private _isNonUserEmail(email: string): boolean {
		return Session.getEffectiveUser().getEmail() === email;
	}

	private _parseStringContact(stringContact: string): Contact[] {
		const regex = /(([\w,"\s]+)\s)?<?([^@<\s]+@[^@\s>]+)>?,?/g;
		let contacts: Contact[] = [];
		let m;

		// reference: https://theconfused.me/blog/extracting-recipients-information-from-email-headers-returned-from-gmail-api/
		// eslint-disable-next-line no-cond-assign
		while ((m = regex.exec(stringContact)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) {
				regex.lastIndex += 1;
			}

			let name = '';
			let email = '';

			if (m[2]) {
				name = m[2]
					.replace(/,$/, '')
					.replace(/"/g, '')
					.trim(); // strip whitespaces and commas, and remove quotation marks
			}

			if (m[3]) {
				email = m[3]
					.replace(/,$/, '')
					.trim()
					.split('"')
					.join(''); // strip whitespaces and commas from end of string
			}

			if (!this._isCurrentUserEmail(email) && !this._isNonUserEmail(email)) {
				contacts = [
					...contacts,
					{
						name,
						email
					}
				]
			}
		}

		return contacts;
	};

	private _getContactStringsFromMessage(): string[] {
		GmailApp.setCurrentMessageAccessToken(this._accessToken);
		const message: EmailMessage = GmailApp.getMessageById(this._messageId);

		return [message.getFrom(), message.getTo(), message.getCc()];
	}

	private _getAllParsedContacts(stringContacts: string[]): Contact[] {
		return stringContacts.reduce((contacts: Contact[], stringContact: string) => [
			...contacts,
			...this._parseStringContact(stringContact)
		], []);
	}

	getMessageContacts(): Contact[] {
		const stringContacts = this._getContactStringsFromMessage();
		const contacts = this._getAllParsedContacts(stringContacts);
		return this._getUniqueContacts(contacts);
	};
}

export { RetriveContacts };