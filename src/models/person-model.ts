import { localStorage } from '../services/local-storage-service';
import { Person } from '../types';

class PersonModel {
	private _person: Person;

	constructor(person: Person) {
		this._person = person;
	}

	static isExist(contact: Person): boolean {
		const persons = PersonModel.getAll();

		return !!persons.length && !!persons.filter(person =>
			person.email.toLowerCase().trim() === contact.email.toLowerCase().trim()
		).length;
	}

	static getAll(): any[] {
		return localStorage.get('PERSON') || [];
	}

	create() {
		const person = this._person;

		localStorage.set('PERSON', {
			...PersonModel.getAll(),
			person
		});

		console.log(PersonModel.getAll());
	}
}

export { PersonModel };
