/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:47 PM
 * All rights reserved.
 */

import ValidationError from "./ValidationError";
import {ValidatorOptions} from "../interfaces/ValidatorOptions";
import ValidatorOptionsExtended from "../interfaces/ValidatorOptionsExtended";


/**
 * Validator - class for declaring plugin setting validation error token.
 * @class
 * @author Danil Andreev
 */
export default class Validator implements ValidatorOptions {
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
    constructor(key: string, expected: string, options?: ValidatorOptionsExtended) {
        this.key = key;
        this.expected = expected;
        this.message = options.message;
        this.status = options.status;
        this.got = options.got;
        this.nested = Array.isArray(options.nested) ? [...options.nested] : [];
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
}
