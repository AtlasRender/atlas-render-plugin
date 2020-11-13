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
 * FloatField - class, designed to create integer plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class FloatField extends PluginSetting {
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
     * Creates an instance of FloatField.
     * @param setting - Object with payload to construct entity.
     * @param type - type of the setting. By default - float.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any, type: "integer" | "float" = "float") {
        let validationError: ValidationError = null;
        try {
            super(type, setting);
            validationError = new ValidationError("Error validating settings in FloatField.");
        } catch (error) {
            if (error instanceof ValidationError && !error.isFatal())
                validationError = error;
            else
                throw error;
        }

        if (typeof setting.min !== "number")
            validationError.reject("min", "float", {got: typeof setting.min});

        if (typeof setting.max !== "number")
            validationError.reject("max", "float", {got: typeof setting.min});
        else if (!validationError.errorOn("min") && setting.min > setting.max)
            validationError.reject(
                "max",
                "float",
                {message: "Max value can not be less than min.", status: 400}
            );

        if (typeof setting.default !== "number")
            validationError.reject("default", "float", {got: typeof setting.min});
        else if (!(validationError.errorOn("min") && validationError.errorOn("max"))) {
            if (setting.default < setting.min)
                validationError.reject(
                    "default",
                    "float",
                    {message: "Default value can not be less than min.", status: 400}
                );
            if (setting.default > setting.max)
                validationError.reject(
                    "default",
                    "float",
                    {message: "Default value can not be higher than max.", status: 400}
                );
        }

        if (validationError.hasErrors() || validationError.isFatal())
            throw validationError;
    }
}
