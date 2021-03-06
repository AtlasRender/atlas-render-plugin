/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:23 PM
 * All rights reserved.
 */

import ValidationError from "../errors/ValidationError";
import FloatField from "./FloatField";
import * as _ from "lodash";
import {Validator} from "../errors";


/**
 * IntegerField - class, designed to create integer plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class IntegerField extends FloatField {
    /**
     * Creates an instance of IntegerField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super(setting);
        this.setType("integer");

        if (this.min != null && !this.validation.errorOn("min") && !_.isInteger(setting.min))
            this.validation.reject(
                "min",
                "integer",
                {message: "Min value must be integer type.", status: Validator.Codes.INVALID_INTEGER}
            );
        if (this.max != null && !this.validation.errorOn("max") && !_.isInteger(setting.max))
            this.validation.reject(
                "max",
                "integer",
                {message: "Max value must be integer type.", status: Validator.Codes.INVALID_INTEGER}
            );
        if (this.default != null && !this.validation.errorOn("default") && !_.isInteger(setting.default))
            this.validation.reject(
                "default",
                "integer",
                {message: "Default value must be integer type.", status: Validator.Codes.INVALID_INTEGER}
            );
    }

    validatePayload(payload: any): number {
        let validationError: ValidationError = null;
        let interpreted = null;
        try {
            interpreted = super.validatePayload(payload);
        } catch (error) {
            if (!(error instanceof ValidationError))
                throw error;
            validationError = error;
        } finally {
            if (!validationError) validationError = new ValidationError("Incorrect payload.", undefined, {id: this.id});
        }
        if (!_.isInteger(interpreted))
            validationError.reject("type", "integer", {got: interpreted, message: "Value is not integer"});

        if (validationError.hasErrors())
            throw validationError;
        return payload;
    }
}
