let i = 0

const I: Partial<Record<string, number>> = {}

export function genId(): number;
export function genId(prefix: string): string;
export function genId(prefix?: string): number | string {
    if (prefix) {
        I[prefix] = (I[prefix] ?? (I[prefix] = 0));
        // @ts-ignore
        return prefix + (++I[prefix])
    }
    return ++i;
}

export default genId;