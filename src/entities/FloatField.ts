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
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super("float", setting);

        if (setting.min != null && typeof setting.min !== "number")
            this.validation.reject("min", "float", {got: typeof setting.min});

        if (setting.max != null && typeof setting.max !== "number")
            this.validation.reject("max", "float", {got: typeof setting.max});

        else if (setting.min != null && !this.validation.errorOn("min") && setting.min > setting.max)
            this.validation.reject(
                "max",
                "float",
                {message: "Max value can not be less than min.", status: 400}
            );

        if (setting.default != null && typeof setting.default !== "number")
            this.validation.reject("default", "float", {got: typeof setting.default});

        else if (
            setting.min != null && setting.max != null && setting.default != null &&
            !(this.validation.errorOn("min") && this.validation.errorOn("max"))
        ) {
            if (setting.default < setting.min)
                this.validation.reject(
                    "default",
                    "float",
                    {message: "Default value can not be less than min.", status: 400}
                );
            if (setting.default > setting.max)
                this.validation.reject(
                    "default",
                    "float",
                    {message: "Default value can not be higher than max.", status: 400}
                );
        }



        // if (typeof setting.min !== "number")
        //     this.validation.reject("min", "float", {got: typeof setting.min});
        //
        // if (typeof setting.max !== "number")
        //     this.validation.reject("max", "float", {got: typeof setting.max});
        // else if (!this.validation.errorOn("min") && setting.min > setting.max)
        //     this.validation.reject(
        //         "max",
        //         "float",
        //         {message: "Max value can not be less than min.", status: 400}
        //     );
        //
        // if (typeof setting.default !== "number")
        //     this.validation.reject("default", "float", {got: typeof setting.default});
        // else if (!(this.validation.errorOn("min") && this.validation.errorOn("max"))) {
        //     if (setting.default < setting.min)
        //         this.validation.reject(
        //             "default",
        //             "float",
        //             {message: "Default value can not be less than min.", status: 400}
        //         );
        //     if (setting.default > setting.max)
        //         this.validation.reject(
        //             "default",
        //             "float",
        //             {message: "Default value can not be higher than max.", status: 400}
        //         );
        // }

        this.min = setting.min;
        this.max = setting.max;
        this.default = setting.default;
    }

    public validatePayload(payload: any): number {
        if (this.nullable && !payload) return null;

        const interpreted: number = +payload;
        const error = new ValidationError("Incorrect payload.", undefined, {id: this.id});
        if (isNaN(interpreted))
            throw error.failValidation();
        if (this.max == null && interpreted > this.max)
            error.reject("max", "number", {got: interpreted, message: "Out of bounds."});
        if (this.min == null && interpreted < this.min)
            error.reject("min", "number", {got: interpreted, message: "Out of bounds."});
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
