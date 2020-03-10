import { PersonModel } from "../../models/person-model";
import { EventObject, Person } from "../../types";
import { ContactDetailsCard } from '../cards/contacts-details-card';

interface AddPersonEvent extends EventObject{
	parameters: {
		person: string
	}
}

const addPersonHandler = function (event: AddPersonEvent) {
	const person: Person = JSON.parse(event.parameters.person);
	new PersonModel(person).create();

	const newCard = new ContactDetailsCard(person).getCard().build();

	return CardService.newActionResponseBuilder()
		.setNavigation(
			CardService.newNavigation()
				.updateCard(newCard)
		)
		.setStateChanged(true)
		.setNotification(
			CardService.newNotification()
				.setText(`${person.name} added`)
		)
		.build()
};

export { addPersonHandler };
