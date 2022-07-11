import {isArray, isBoolean, isNumber, isString, isObject, isNotNull, TypeGuard} from './typeguards';

export interface IParser<T> {
    <F>(value: unknown, fallbackValue: F, property?: string): T | F;
}

export function safelyParseOr<T, F>(data: unknown, key: string, parse: IParser<T>, fallback: F): T | F {
    const [firstKey, ...chainedKeys] = key.split('.');
    if (isObject(data) && isNotNull(data) && firstKey in data) {
        const value = data[firstKey];

        if (chainedKeys.length) {
            return safelyParseOr(value, chainedKeys.join('.'), parse, fallback);
        }

        return parse(value, fallback, key);
    } else {
        return fallback;
    }
}

export function parseAsType<T>(isExpectedType: TypeGuard<T>): IParser<T> {
    return (value, fallbackValue) => {
        if (isExpectedType(value)) {
            return value;
        } else {
            return fallbackValue;
        }
    };
}

export const parseAsString = parseAsType(isString);
export const parseAsNumber = parseAsType(isNumber);
export const parseAsBoolean = parseAsType(isBoolean);
export const parseAsArray = parseAsType(isArray);
