function normalizeName(name: string) {
    return "wstartpage_" + name;
}

export function fromLocalStorage<T>(name: string, def: T): T {
    try {
        name = normalizeName(name);
        return JSON.parse(localStorage.getItem(name)) ?? def
    } catch (e) {
        return def;
    }
}

export function toLocalStorage<T>(name: string, obj: T) {
    name = normalizeName(name);
    localStorage.setItem(name, JSON.stringify(obj));
}