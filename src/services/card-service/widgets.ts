class Widgets {
	static paragraph(text: string) {
		return CardService.newTextParagraph().setText(text);
	}

	static image(image: string, alt: string = '') {
		return CardService.newImage()
			.setImageUrl(image)
			.setAltText(alt);
	}

	static action() {
		return CardService.newAction()
			.setFunctionName("handleImageClick")
			.setParameters({ imageSrc: 'carImage' })
	}
}

export { Widgets }