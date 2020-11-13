/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:47 PM
 * All rights reserved.
 */

import ValidationError from "./ValidationError";

/**
 * ValidatorOptions - options for Validator.
 * @interface
 * @author Danil Andreev
 */
export interface ValidatorOptions {
    /**
     * message - unnecessary message.
     */
    readonly message?: string;
    /**
     * status - validation status.
     */
    readonly status?: number;
    /**
     * got - value, got as argument in validated object.
     */
    readonly got?: any;
}

/**
 * Validator - class for declaring plugin setting validation error token.
 * @class
 * @author Danil Andreev
 */
export class Validator implements ValidatorOptions {
    /**
     * key - validated object key.
     */
    public readonly key: string;
    /**
     * expected - expected value of validated object.
     */
    /**
     * nested - nested items errors.
     */
    protected nested: ValidationError[];

    public readonly expected: string;
    public readonly message?: string;
    public readonly status?: number;
    public readonly got?: any;

    /**
     * Creates an instance of Validator.
     * @constructor
     * @param key - The key of an element in setting.
     * @param expected - Expected value of an element.
     * @param options - Options for more detailed setup.
     * @author Danil Andreev
     */
    constructor(key: string, expected: string, options?: ValidatorOptions) {
        this.key = key;
        this.expected = expected;
        this.message = options.message;
        this.status = options.status;
        this.got = options.got;
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
    public addNested(error: ValidationError): void {
        this.nested.push(error);
    }
}
