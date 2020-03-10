import { createCard, createSection, createHeader, paragraph } from '../../services/card-service';
import { PERSON_ICON } from '../../helpers/images';
import { Person } from '../../types';

class ContactDetailsCard {
	private _person: Person;
	constructor(person: Person) {
		this._person = person;
	}

	getCard() {
		const paragraphWidget = paragraph(`${this._person.name} with email ${this._person.email}`);

		return createCard('contact-details', {
			header: createHeader(this._person.name, {
				imageUrl: PERSON_ICON,
				subtitle: this._person.email
			}),
			sections: [
				createSection([paragraphWidget])
			]
		});
	}
}

export { ContactDetailsCard };