import { localStorage } from '../services/localStorage-service';

interface PersonSchema {
	id: number;
	name: string;
	email: string;
	phone: string;
}

class PersonModel {
	private _person: PersonSchema;

	constructor(person: PersonSchema) {
		this._person = person;
	}

	create() {
		localStorage.set(this._person.id, this._person);
	}

	update() {
		localStorage.get(this._person.id);
	}
}

export { PersonModel };
