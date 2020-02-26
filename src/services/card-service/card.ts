import { logger } from "../../helpers/logger";

class Card {
	static builder(name: string, options?: {
		header?: any,
		actions?: any[],
		sections?: any[]
	}) {
		const card = CardService.newCardBuilder();

		card.setName(name);

		if (options) {
			if (options.header) {
				card.setHeader(options.header);
			}

			if (options.sections && options.sections.length) {
				options.sections.forEach((section: any) => {
					logger(section);
					logger(card);
					card.addSection(section);
				});
			}

			if (options.actions && options.actions.length) {
				options.actions.forEach((action: any) => card.addCardAction(action));
			}	
		}
		
		return card;
	}

	static section(widgets: object[] = [], options?: {
		header?: string,
		isCollapsible?: boolean,
		numUncollapsibleWidgets?: number
	}) {
		const section = CardService.newCardSection();

		if (widgets && widgets.length) {
			logger(widgets);
			logger(section);
			widgets.forEach((widget: object) => section.addWidget(widget));
		}

		if (options) {
			if (options.header) {
				section.setHeader(options.header);
			}

			if (options.isCollapsible) {
				section.setCollapsible(options.isCollapsible);
			}

			if (options.numUncollapsibleWidgets) {
				section.setNumUncollapsibleWidgets(options.numUncollapsibleWidgets);
			}
		}

		return section;
	}

	static header(title: string, options?: {
		subtitle?: string,
		imageUrl?: string,
		setImageAltText?: string,
		imageStyle?: any
	}) {
		const header = CardService.newCardHeader();
		
		header.setTitle(title);

		if (options) {
			if (options.subtitle) {
				header.setSubtitle(options.subtitle);
			}

			if (options.imageUrl) {
				header.setImageUrl(options.imageUrl);
			}

			if (options.imageStyle) {
				header.setImageStyle(options.imageStyle);
			}

			if (options.setImageAltText) {
				header.setImageStyle(options.imageStyle);
			}
		}

		return header;
	}
}

export { Card };



