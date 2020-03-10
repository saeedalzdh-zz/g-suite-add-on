import { createCard, createSection, createHeader, paragraph } from '../../services/card-service';

class GmailHomePageCard {
	private _hostApp: string;
	constructor(hostApp: string) {
		this._hostApp = hostApp;
	}

	getCard() {
		const widget = paragraph(
			`Welcome to the host app ${this._hostApp}, choose one email to use the functionality. new one!`
		);

		return createCard('gmail-homepage', {
			header: createHeader(`${this._hostApp} Home Page`),
			sections: [
				createSection([widget])
			]
		});
	}
}

export { GmailHomePageCard }