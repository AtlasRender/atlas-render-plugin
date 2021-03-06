/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:47 PM
 * All rights reserved.
 */

import ValidationError from "./ValidationError";
import ValidatorOptionsExtended from "../interfaces/ValidatorOptionsExtended";
import WebJsonable from "../interfaces/WebJsonable";
import {ValidatorOptions} from "../interfaces";


/**
 * Validator - class for declaring plugin setting validation error token.
 * @class
 * @author Danil Andreev
 */
export default class Validator implements ValidatorOptions, WebJsonable {
    /**
     * Codes - available error codes for validation.
     */
    public static readonly Codes = {
        // 1XX Common errors
        INVALID_PAYLOAD: 100,

        // 2XX - Type errors
        INVALID_TYPE: 200,
        INVALID_NUMBER: 210,
        INVALID_INTEGER: 211,
        INVALID_BOOLEAN: 220,
        INVALID_OBJECT: 230,
        INVALID_KEY: 240,
        INVALID_STRING: 250,
        INVALID_ARRAY: 260,

        // 3XX - Boundary errors
        OUT_OF_BOUNDS: 300,
        HIGHER_THAN_MAX: 310,
        TOO_BIG_VALUE: 312,
        LOWER_THAN_MIN: 320,
        LOWER_THAN_ZERO: 321,
        TOO_SMALL_VALUE: 322,
        MIN_HIGHER_THAN_MAX: 330,
    }

    /**
     * key - validated object key.
     */
    public readonly key: string;
    /**
     * expected - expected value of validated object.
     */
    public readonly expected: string;
    public readonly message?: string;
    public readonly status?: number;
    public readonly got?: any;
    protected nested: ValidationError[];

    /**
     * Creates an instance of Validator.
     * @constructor
     * @param key - The key of an element in setting.
     * @param expected - Expected value of an element.
     * @param options - Options for more detailed setup.
     * @author Danil Andreev
     */
    constructor(key: string, expected: string, options: ValidatorOptionsExtended = {}) {
        this.key = key;
        this.expected = expected;
        this.message = options.message;
        this.status = options.status;
        this.got = options.got;
        this.nested = Array.isArray(options.nested) ? [...options.nested] : [];
    }

    /**
     * compareCode - returns true if expected code is subset of current
     * @param expected - Code for checking.
     * @param current - Code from validation.
     * @example
     * Validator.compareCode(420, 421) === true
     * Validator.compareCode(400, 421) === true
     * Validator.compareCode(422, 421) === false
     * Validator.compareCode(431, 421) === false
     */
    public static compareCode(expected: number, current: number): boolean {
        const expectedStr: string = String(expected);
        const currentStr: string = String(current);
        for (let i = 0; i < currentStr.length; i++) {
            if (expectedStr[i] && expectedStr[i] !== "0" && expectedStr[i] !== currentStr[i])
                return false;
        }
        return true;
    }

    /**
     * createValidator - creates Validator instance from input structure.
     * @method
     * @param input - Any input data. Will be checked and validated.
     * @throws TypeError
     * @author Danil Andreev
     */
    public static createValidator(input: any): Validator {
        if (typeof input !== "object")
            throw new TypeError(`Incorrect type of validator, expected "object", got "${typeof input}"`);
        if (typeof input.key !== "string")
            throw new TypeError(`Incorrect type of 'key' field, expected "string", got "${typeof input.key}"`);
        if (typeof input.expected !== "string")
            throw new TypeError(`Incorrect type of 'expected' field, expected "string", got "${typeof input.expected}"`);
        if (input.message && typeof input.message !== "string")
            throw new TypeError(`Incorrect type of 'message' field, expected "string | undefined", got "${typeof input.message}"`);
        if (input.status && typeof input.status !== "number")
            throw new TypeError(`Incorrect type of 'status' field, expected "number | undefined", got "${typeof input.status}"`);
        if (input.nested && !Array.isArray(input.nested))
            throw new TypeError(`Incorrect type of 'nested' field, expected "ValidationError[]", got "${typeof input.nested}"`);

        let nested: ValidationError[] = [];
        if (input.nested)
            nested = input.nested.map(item => ValidationError.createValidationError(item));

        const result = new Validator(
            input.key,
            input.expected, {
                message: input.message,
                status: input.status,
                got: input.got,
                nested: nested,
            }
        );
        return result;
    }

    /**
     * getNested - returns an array of nested errors.
     * @method
     * @author Danil Andreev
     */
    public getNested(): readonly ValidationError[] {
        return this.nested;
    }

    /**
     * addNested - adds nested validation error to object.
     * @param error - Error object.
     */
    public addNested(error: ValidationError): Validator {
        this.nested.push(error);
        return this;
    }

    getJSON(): object {
        return {
            key: this.key,
            expected: this.expected,
            message: this.message,
            status: this.status,
            got: this.got,
            nested: this.nested.map(item => item.getJSON()),
        }
    }
}
