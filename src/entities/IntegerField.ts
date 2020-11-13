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
        let validationError: ValidationError = null;
        try {
            super(setting, "integer");
            validationError = new ValidationError("Error validating settings in IntegerField.");
        } catch (error) {
            if (error instanceof ValidationError && !error.isFatal())
                validationError = error;
            else
                throw error;
        }

        if (!validationError.errorOn("min") && !_.isInteger(setting.min))
            validationError.reject(
                "min",
                "integer",
                {message: "Min value must be integer type.", status: 400}
            );
        if (!validationError.errorOn("max") && !_.isInteger(setting.max))
            validationError.reject(
                "mex",
                "integer",
                {message: "Max value must be integer type.", status: 400}
            );
        if (!validationError.errorOn("default") && !_.isInteger(setting.default))
            validationError.reject(
                "default",
                "integer",
                {message: "Default value must be integer type.", status: 400}
            );


        if (validationError.hasErrors() || validationError.isFatal())
            throw validationError;
    }
}
