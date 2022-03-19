import { Context, createContext, useContext } from 'react';

export function assert(value: boolean, msg: string): asserts value {
    if (!value) {
        console.error('Assert', msg);

        throw new Error(msg);
    }
}

export function assertNotNullish<T>(value: T, msg: string = 'Value is nullish'): asserts value is NonNullable<T> {
    assert(!isNullish(value), msg);
}

export function isNullish<T>(value: T | undefined | null): value is undefined | null {
    return value === null || value === undefined;
}

const useSafeContext = <T>(context: Context<T>) => {
    const contextValue = useContext(context);

    assertNotNullish(contextValue, `Context '${context.displayName ?? 'Unknown Context'}' is not provided.`);

    return contextValue;
};

export const createSafeContext = <T>(displayName: string) => {
    const context = createContext<T | null>(null);
    context.displayName = displayName;

    const useContext = () => useSafeContext(context);

    return [context, useContext] as const;
};
