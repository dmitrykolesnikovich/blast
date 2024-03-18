export class Localization {

    private readonly messages: any
    language: string

    constructor(messages: any, language: string = getBrowserLanguage()) {
        this.messages = messages as Map<string, Map<string, string>>
        this.language = language
    }

    getText(message: string): string {
        const texts: any | undefined = this.messages[this.language]
        if (texts === undefined) return message
        const text: string | undefined = texts[message]
        if (text === undefined) return message
        return text
    }

}

function getBrowserLanguage() {
    let browserLanguage: string
    if (navigator.languages && navigator.languages.length !== 0) {
        browserLanguage = navigator.languages[0]
    } else {
        browserLanguage = navigator.language || 'en'
    }
    return browserLanguage.split('-')[0]
}
