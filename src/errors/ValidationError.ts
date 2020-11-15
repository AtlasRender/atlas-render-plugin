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


/**
 * ValidationError - validation error for plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class ValidationError extends TypeError {
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
     * Creates an instance of SettingsValidationError
     * @param message - String message.
     * @param validation - Validation map object.
     * @param isFatal - If true - fatal validation error.
     * @author Danil Andreev
     */
    constructor(message: string, validation: Validator[] = [], isFatal?: boolean) {
        super(message);
        this.validation = validation;
        this.fatalError = !!isFatal;
        this.nested = [];
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
        return !!this.validation.length || !!this.fatalError;
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
    reject(name: string, expected: string, options: ValidatorOptionsExtended): ValidationError {
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
}
