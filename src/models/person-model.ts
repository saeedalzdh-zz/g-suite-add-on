import { localStorage } from '../services/local-storage-service';

interface PersonSchema {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
}

class PersonModel {
	private _person: PersonSchema;

	constructor(person: PersonSchema) {
		this._person = person;
	}

	create() {
		localStorage.set(`PERSON_${this._person.id}`, this._person);
	}

	update() {
		localStorage.get(`PERSON_${this._person.id}`);
	}
}

export { PersonModel };
