const LANG_KEY = "lang";

export default {
    save: (key: string, value: string | Object) => {
        const v = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, v);
    },
    get: (key: string) => {
        const item = localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item);
        }

        return null;
    },
    getLang: () => {
        return localStorage.getItem(LANG_KEY);
    },
    saveLang: (lang: string) => {
        localStorage.setItem(LANG_KEY, lang);
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    },
    clean: () => {
        localStorage.clear();
    },
};
