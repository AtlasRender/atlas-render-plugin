/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:23 PM
 * All rights reserved.
 */

import PluginSetting from "./PluginSetting";
import ValidationError from "../errors/ValidationError";


/**
 * IntegerField - class, designed to create integer plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class IntegerField extends PluginSetting {
    /**
     * min - minimal value.
     */
    public readonly min: number;
    /**
     * max - maximal value.
     */
    public readonly max: number;
    /**
     * default - default value.
     */
    public readonly default: number;

    /**
     * Creates an instance of IntegerField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        let validationError: ValidationError = null;
        try {
            super("integer", setting);
            validationError = new ValidationError("Error validating settings in IntegerField.");
        } catch (error) {
            if (error instanceof ValidationError && !error.isFatal())
                validationError = error;
            else
                throw error;
        }

        if (typeof setting.min !== "number")
            validationError.reject("min", "integer", {got: typeof setting.min});

        if (typeof setting.max !== "number")
            validationError.reject("max", "integer", {got: typeof setting.min});
        else if (!validationError.errorOn("min") && setting.min > setting.max)
            validationError.reject(
                "max",
                "integer",
                {message: "Max value can not be less than min.", status: 400}
            );

        if (typeof setting.default !== "number")
            validationError.reject("default", "integer", {got: typeof setting.min});
        else if (!(validationError.errorOn("min") && validationError.errorOn("max"))) {
            if (setting.default < setting.min)
                validationError.reject(
                    "default",
                    "integer",
                    {message: "Default value can not be less than min.", status: 400}
                );
            if (setting.default > setting.max)
                validationError.reject(
                    "default",
                    "integer",
                    {message: "Default value can not be higher than max.", status: 400}
                );
        }

        if (validationError.hasErrors() || validationError.isFatal())
            throw validationError;
    }
}
