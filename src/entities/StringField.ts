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
import * as _ from "lodash";
import {Validator} from "../errors";


/**
 * StringField - class, designed to create string plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class StringField extends PluginSetting {
    /**
     * min - minimal string length.
     */
    public readonly min: number;
    /**
     * max - maximal string length.
     */
    public readonly max: number;
    /**
     * default - default value.
     */
    public readonly default: string;

    /**
     * Creates an instance of StringField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super("string", setting);

        if (setting.min != null && typeof setting.min !== "number")
            this.validation.reject("min", "integer", {got: typeof setting.min});

        if (setting.max != null && typeof setting.max !== "number")
            this.validation.reject("max", "integer", {got: typeof setting.max});
        else if (setting.min != null && !this.validation.errorOn("min") && setting.min > setting.max)
            this.validation.reject(
                "max",
                "integer",
                {message: "Max value can not be lower than min.", status: Validator.Codes.LOWER_THAN_MIN}
            );


        if (setting.max != null && !this.validation.errorOn("max")) {
            if (!_.isInteger(setting.max))
                this.validation.reject(
                    "max",
                    "integer",
                    {message: "Max value can not be float.", status: Validator.Codes.INVALID_INTEGER}
                );
            if (setting.max < 0)
                this.validation.reject(
                    "max",
                    "integer",
                    {
                        got: typeof setting.min,
                        message: "Max length can not be less than zero",
                        status: Validator.Codes.LOWER_THAN_ZERO
                    }
                );
        }

        if (setting.min != null && !this.validation.errorOn("min")) {
            if (!_.isInteger(setting.min))
                this.validation.reject(
                    "min",
                    "integer",
                    {message: "Min value can not be float.", status: Validator.Codes.INVALID_INTEGER}
                );
            if (setting.min < 0)
                this.validation.reject(
                    "min",
                    "integer",
                    {
                        got: typeof setting.min,
                        message: "Min length can not be less than zero",
                        status: Validator.Codes.LOWER_THAN_ZERO
                    }
                );
        }


        if (setting.default != null && typeof setting.default !== "string")
            this.validation.reject("default", "string", {got: typeof setting.default});
        else if (
            setting.max != null && setting.min != null && setting.default != null &&
            !(this.validation.errorOn("min") && this.validation.errorOn("max"))
        ) {
            if (setting.default.length < setting.min)
                this.validation.reject(
                    "default",
                    "string",
                    {message: "Default value can not be lower than min.", status: Validator.Codes.LOWER_THAN_MIN}
                );
            if (setting.default.length > setting.max)
                this.validation.reject(
                    "default",
                    "string",
                    {message: "Default value can not be higher than max.", status: Validator.Codes.HIGHER_THAN_MAX}
                );
        }

        this.min = setting.min;
        this.max = setting.max;
        this.default = setting.default;
    }

    validatePayload(payload: any): string {
        if (this.nullable && !payload) return null;

        const interpreted: string = "" + payload;
        const error = new ValidationError("Incorrect payload.", undefined, {id: this.id});
        if (this.min != null && interpreted.length < this.min)
            error.reject("min", "string", {got: interpreted, message: "Out of bounds."});
        if (this.max != null && interpreted.length > this.max)
            error.reject("max", "string", {got: interpreted, message: "Out of bounds."});
        if (error.hasErrors())
            throw error;
        return interpreted;
    }

    getJSON(): object {
        return {
            ...super.getJSON(),
            min: this.min,
            max: this.max,
            default: this.default,
        };
    }
}
