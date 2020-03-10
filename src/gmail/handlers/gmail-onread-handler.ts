import { RetriveContacts } from '../../services/retrieve-contacts-service';
import { EventObject, Person } from '../../types';
import { ContactDetailsCard } from '../cards/contacts-details-card';
import { ContactDraftCard } from '../cards/contacts-draft-card';
import { PersonModel } from '../../models/person-model';

interface SeparatedContacts {
	existing: Person[],
	noneExsiting: Person[]
}

class GmailOnReadHandler {
	private _contacts: Person[];
	constructor(event: EventObject) {
		this._contacts = new RetriveContacts(event).getMessageContacts();
	}

	getSeparatedContacts() {
		return this._contacts.reduce((separatedContacts: SeparatedContacts, contact: Person) => {
			if (PersonModel.isExist(contact)) {
				separatedContacts.existing.push(contact);
			} else {
				separatedContacts.noneExsiting.push(contact);
			}

			return separatedContacts;
		}, {
			existing: [],
			noneExsiting: []
		});
	}

	buildCard() {
		const contacts = this.getSeparatedContacts();

		return [
			...contacts.existing.map(contact => new ContactDetailsCard(contact).getCard().build()),
			...contacts.noneExsiting.map(contact => new ContactDraftCard(contact).getCard().build())
		];
	}	
}

export const gmailOnReadHandler = (event: EventObject) => new GmailOnReadHandler(event).buildCard();
