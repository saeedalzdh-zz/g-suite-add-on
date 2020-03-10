# g-suite-add-on
G Suite add-on best-practices

## Simple add-on

### Script manifest

```
{
  "addOns": {
		"gmail": {
			"homepageTrigger": {
				"runFunction": "onHomepages",
				"enabled": true
			}
		},

		"calendar": {
			"homepageTrigger": {
				"runFunction": "onHomepages",
				"enabled": true
			}
		},

		"common": {
			"layoutProperties": {
				"primaryColor": "#ff392b",
				"secondaryColor": "#d68617"
			},
			"logoUrl": "https://ssl.gstatic.com/docs/script/images/logo/script-64.png",
			"name": "Demo G Suite Add-on"
		}
	},

	"oauthScopes": [
        "https://www.googleapis.com/auth/calendar.addons.execute",
        "https://www.googleapis.com/auth/gmail.addons.execute",
		"https://www.googleapis.com/auth/gmail.addons.current.action.compose",
		"https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/script.locale"
	],

    "timeZone": "Europe/Bucharest",
    "dependencies": {
      
    },
    "exceptionLogging": "STACKDRIVER",
    "runtimeVersion": "V8"
}
```

### sample code

```
function onHomepages() {

	const keyValue = CardService.newKeyValue().setContent('Saeed').setTopLabel('My name is');

	const textParagraph = CardService.newTextParagraph()
		.setText("This is a text paragraph widget. Multiple lines are allowed if needed.");

	const textButton = CardService.newTextButton()
		.setText("open link actions")
		.setOpenLink(CardService.newOpenLink()
			.setUrl("https://www.google.com"));

	const action = CardService.newAction().setFunctionName('notificationCallback');
	const textButtonAction = CardService.newTextButton().setText('Create notification').setOnClickAction(action);

	const cardHeader = CardService.newCardHeader().setTitle("Card title");

	const cardSection = CardService.newCardSection().addWidget(keyValue).addWidget(textParagraph).addWidget(textButton).addWidget(textButtonAction);

	const card = CardService.newCardBuilder()
		.setName("Card name")
		.setHeader(cardHeader)
		.addSection(cardSection)
		.build();

	return card;
}

function notificationCallback() {
	return CardService.newActionResponseBuilder()
		.setNotification(CardService.newNotification()
			.setText("Some info to display to user"))
		.build();
}
```