export function fromStorage<T>(name: string, def: T): T {
    return JSON.parse(localStorage.getItem(name)) ?? def
}