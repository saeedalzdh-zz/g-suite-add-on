class CardServiceWrapper {
	static createCard(name: string, options?: {
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
					card.addSection(section);
				});
			}

			if (options.actions && options.actions.length) {
				options.actions.forEach((action: any) => card.addCardAction(action));
			}
		}

		return card;
	}

	static createSection(widgets: object[] = [], options?: {
		header?: string,
		isCollapsible?: boolean,
		numUncollapsibleWidgets?: number
	}) {
		const section = CardService.newCardSection();

		if (widgets && widgets.length) {
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

	static createHeader(title: string, options?: {
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

	static paragraph(text: string) {
		return CardService.newTextParagraph().setText(text);
	}

	static image(image: string, alt: string = '') {
		return CardService.newImage()
			.setImageUrl(image)
			.setAltText(alt);
	}

	static keyValue(content: string, options?: {
		topLabel?: string,
		bottomLabel?: string,
		iconUrl?: string,
		multiline?: boolean
	}) {
		const keyvalue = CardService.newKeyValue()
			.setContent(content);

		if (options) {
			if (options.topLabel) {
				keyvalue.setTopLabel(options.topLabel)
			}

			if (options.bottomLabel) {
				keyvalue.setBottomLabel(options.bottomLabel)
			}

			if (options.iconUrl) {
				keyvalue.setIconUrl(options.iconUrl)
			}

			if (options.multiline) {
				keyvalue.setMultiline(true);
			}
		}

		return keyvalue;
	}

	static actionButton(text: string, handler: string, params?: object) {
		const action = CardServiceWrapper.action(handler, params)

		return CardService.newTextButton().setText(text).setOnClickAction(action);
	}

	static openLinkButton(text: string, url: string) {
		return CardService.newTextButton()
			.setText(text)
			.setOpenLink(
				CardService.newOpenLink().setUrl(url)
			);
	}

	private static action(handler: string, params?: object) {
		const action = CardService.newAction().setFunctionName(handler)
		
		if (params) {
			const parameters = CardServiceWrapper.prepareParameters(params);
			action.setParameters(parameters);
		}
			
		return action;
	}

	private static prepareParameters(parameters: any) {
		return Object.keys(parameters).reduce(
			(params, key) => ({
				...params,
				[key]: CardServiceWrapper.stringifyValue(parameters[key])
			}),
			{}
		);
	};

	private static stringifyValue(value: any) {
		if (value) {
			if (typeof value === 'string') {
				return value;
			}

			if (typeof value === 'number') {
				return String(value);
			}

			if (typeof value === 'object') {
				return JSON.stringify(value);
			}
		}

		return '';
	};

	static notification(text: string) {
		return CardService.newActionResponseBuilder()
			.setNotification(CardService.newNotification().setText(text))
			.build();
	};
}

export const {
	createCard,
	createSection,
	createHeader,
	paragraph,
	image,
	keyValue,
	actionButton,
	openLinkButton,
	notification
} = CardServiceWrapper;
