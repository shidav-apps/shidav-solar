export function groupBy<T>(array: T[], selector: (item: T) => string): Record<string, T[]> {
    const res: Record<string, T[]> = {};

    for (const item of array) {
        const key = selector(item);
        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(item);
    }

    return res;
}