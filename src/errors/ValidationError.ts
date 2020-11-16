/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:42 PM
 * All rights reserved.
 */


import ValidatorOptionsExtended from "../interfaces/ValidatorOptionsExtended";
import Validator from "./Validator";
import {ValidationErrorOptions} from "../interfaces";
import WebJsonable from "../interfaces/WebJsonable";
import * as _ from "lodash";


/**
 * ValidationError - validation error for plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class ValidationError extends TypeError implements WebJsonable {
    /**
     * validation - validation map.
     */
    protected validation: Validator[];
    /**
     * fatalError - if true, validation of this token is failed with fatal error.
     * @protected
     */
    protected fatalError: boolean;

    /**
     * nested - nested errors.
     * @protected
     */
    protected nested: ValidationError[];

    /**
     * id - custom identifier. Not used in validation.
     */
    public readonly id?: string | number;

    /**
     * Creates an instance of SettingsValidationError
     * @param message - String message.
     * @param validation - Validation map object.
     * @param options - Validation error additional options.
     * @author Danil Andreev
     */
    constructor(message: string, validation: Validator[] = [], options: ValidationErrorOptions = {}) {
        super(message);
        this.validation = validation;
        this.fatalError = !!options.isFatal;
        this.nested = [];
        this.id = options.id;
    }

    /**
     * createValidationError - creates ValidationError instance from input structure.
     * @method
     * @param input - Any input data. Will be checked and validated.
     * @throws TypeError
     * @author Danil Andreev
     */
    public static createValidationError(input: any): ValidationError {
        if (typeof input !== "object")
            throw new TypeError(`Invalid 'input' type, expected "object", got "${typeof input}".`);
        if (typeof input.message !== "string")
            throw new TypeError(`Invalid 'input.message' type, expected "string", got "${typeof input.message}".`);
        if (input.fatalError && typeof input.fatalError !== "boolean")
            throw new TypeError(`Invalid 'input.fatalError' type, expected "boolean", got "${typeof input.fatalError}".'`);
        if (input.validation && !Array.isArray(input.validation))
            throw new TypeError(`Invalid 'input.validation' type, expected "Validator[]", got "${typeof input.validation}".'`);
        if (input.nested && !Array.isArray(input.nested))
            throw new TypeError(`Invalid 'input.nested' type, expected "Validator[]", got "${typeof input.nested}".'`);

        let validation: Validator[] = [];
        if (input.validation)
            validation = input.validation.map(item => Validator.createValidator(item));

        let nested: ValidationError[] = [];
        if (input.nested)
            nested = input.nested.map(item => ValidationError.createValidationError(item));

        const result: ValidationError = new ValidationError(input.message, validation, input.fatalError || false);
        result.addNested(nested);
        return result;
    }


    /**
     * getValidation - method for getting validation map from error.
     * @method
     * @author Danil Andreev
     */
    public getValidation(): readonly Validator[] {
        return this.validation;
    }

    /**
     * getNested - method for getting nested errors.
     * @method
     * @author Danil Andreev
     */
    public getNested(): readonly ValidationError[] {
        return this.nested;
    }

    /**
     * failValidation - function, designed to fail validation with fatal error.
     * @method
     * @author Danil Andreev
     */
    failValidation(): ValidationError {
        this.fatalError = true;
        return this;
    }

    /**
     * isFatal - if validation failed with fatal error - returns true, else - false.
     * @method
     * @author Danil Andreev
     */
    public isFatal(): boolean {
        return this.fatalError;
    }

    /**
     * hasErrors - method, designed to check if this error has validators.
     * @method
     * @author Danil Andreev
     */
    public hasErrors(): boolean {
        return !!this.validation.length || !!this.fatalError || !!this.nested.length;
    }

    /**
     * errorOn - returns error if it is error on selected field or undefined if not.
     * @method
     * @param key - Key of the field.
     * @author Danil Andreev
     */
    public errorOn(key: string): Validator | undefined {
        return this.validation.find((candidate: Validator) => candidate.key === key);
    }

    /**
     * reject - method, designed to allow setting element rejection.
     * @method
     * @param name - The key of an element in setting.
     * @param expected - Expected value of an element.
     * @param options - Options for more detailed setup.
     * @author Danil Andreev
     */
    reject(name: string, expected: string, options?: ValidatorOptionsExtended): ValidationError {
        if (!this.validation.some((candidate: Validator) => candidate.key === name))
            this.validation.push(new Validator(name, expected, options));
        return this;
    }

    addNested(error: ValidationError | ValidationError[]): ValidationError {
        if (Array.isArray(error))
            this.nested = this.nested.concat(error);
        else
            this.nested.push(error);
        return this;
    }

    public getJSON(): object {
        return {
            id: this.id,
            message: this.message,
            fatalError: this.fatalError,
            nested: this.nested.map(item => item.getJSON()),
            validation: this.validation.map(item => item.getJSON()),
        }
    }

    /**
     * getFlatErrorsList - returns flatten errors list with all nested errors and errors nested in validators.
     * @method
     * @author Danil Andreev
     */
    getFlatErrorsList(): ValidationError[] {
        let errors = [];
        errors = errors.concat(this.nested);
        errors = errors.concat(_.flatten(this.nested.map((item: ValidationError): ValidationError[] => item.getFlatErrorsList())));
        errors.concat(_.flatten(this.validation.map((validator: Validator): ValidationError[][] =>
            (validator.getNested().map((item: ValidationError): ValidationError[] => item.getFlatErrorsList())
        ))));
        return errors;
    }

    /**
     * getErrorOnId - returns error with custom id that matches input id.
     * If not found - returns false.
     * @method
     * @param id - Target id.
     * @author Danil Adnreev
     */
    getErrorOnId(id: number | string): ValidationError {
        return this.getFlatErrorsList().find((item: ValidationError): boolean => item.id === id);
    }
}
