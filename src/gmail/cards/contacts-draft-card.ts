import { createCard, createSection, createHeader, actionButton } from '../../services/card-service';
import { LIST_NEW_PERSON_ICON } from '../../helpers/images';
import { Person } from '../../types';

class ContactDraftCard {
	private _person: Person;
	constructor(person: Person) {
		this._person = person;
	}

	getCard() {
		const contactEmail = actionButton('Add Contact', 'addPersonHandler', {
			person: this._person
		});

		return createCard('contact-details', {
			header: createHeader(this._person.email, {
				imageUrl: LIST_NEW_PERSON_ICON,
				subtitle: 'new contact'
			}),
			sections: [
				createSection([contactEmail])
			]
		});
	}
}

export { ContactDraftCard };