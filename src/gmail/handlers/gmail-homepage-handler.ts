import { EventObject } from '../../types';
import { GmailHomePageCard } from '../cards/gmail-homepage-card';

const gmailHomePageHandler = (event: EventObject) =>
	new GmailHomePageCard(event.commonEventObject.hostApp)
		.getCard()
		.build();

export { gmailHomePageHandler };