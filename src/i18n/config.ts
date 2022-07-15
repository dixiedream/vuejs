import it from "./it";
import en from "./en";
import Storage from "../shared/StorageManager";

let lang = Storage.getLang();
if (!lang) {
    const userLang = navigator.language || navigator.languages[0];
    [lang] = userLang.split("-");
    Storage.saveLang(lang);
}

export default {
    legacy: false,
    locale: lang,
    fallbackLocale: "it",
    messages: {
        it,
        en,
    },
};
