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


/**
 * StringField - class, designed to create string plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class StringField extends PluginSetting {
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
    public readonly default: string;

    /**
     * Creates an instance of StringField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super("string", setting);

        if (typeof setting.min !== "number")
            this.validation.reject("min", "integer", {got: typeof setting.min});

        if (typeof setting.max !== "number")
            this.validation.reject("max", "integer", {got: typeof setting.max});
        else if (!this.validation.errorOn("min") && setting.min > setting.max)
        if (setting.min > setting.max)
            this.validation.reject(
                "max",
                "integer",
                {message: "Max value can not be less than min.", status: 400}
            );


        if (!this.validation.errorOn("min") && !this.validation.errorOn("max"))
            if (!_.isInteger(setting.min))
                this.validation.reject(
                    "min",
                    "integer",
                    {message: "Min value can not be float.", status: 400}
                );
            else if (!_.isInteger(setting.max))
                this.validation.reject(
                    "max",
                    "integer",
                    {message: "Max value can not be float.", status: 400}
                );

        if (typeof setting.default !== "string")
            this.validation.reject("default", "string", {got: typeof setting.default});
        else if (!(this.validation.errorOn("min") && this.validation.errorOn("max"))) {
            if (setting.default.length < setting.min)
                this.validation.reject(
                    "default",
                    "string",
                    {message: "Default value can not be less than min.", status: 400}
                );
            if (setting.default.length > setting.max)
                this.validation.reject(
                    "default",
                    "string",
                    {message: "Default value can not be higher than max.", status: 400}
                );
        }

        this.min = setting.min;
        this.max = setting.max;
        this.default = setting.default;
    }
}
