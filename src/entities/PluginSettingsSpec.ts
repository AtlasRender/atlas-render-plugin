/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 15:02
 * All rights reserved.
 */

import ValidationError from "../errors/ValidationError";
import {
    BooleanField,
    FloatField,
    GroupField,
    PluginSetting,
    SeparatorField,
    IntegerField, StringField
} from "./index";
import * as path from "path";


/**
 * PluginSettingsSpec - class for constructing plugin settings system.
 * @class
 * @author Danil Andreev
 */
export default class PluginSettingsSpec extends Array<PluginSetting> {
    /**
     * Creates an instance of PluginSettingsSpec
     * @param settings - Input object structure to process.
     * @constructor
     * @author Danil Andreev
     */
    constructor(settings: any) {
        if (!Array.isArray(settings)) {
            throw new ValidationError("Fatal: Invalid type of input", undefined, {isFatal: true});
        }

        super();
        const errors: ValidationError[] = [];

        for (const setting of settings) {
            try {
                const result = this.buildSetting(setting);
                if (!result.isValid())
                    throw result.getValidation();
                if (this.find((item: PluginSetting) => item.name === result.name))
                    throw new ValidationError(
                        `Field with name "${result.name}" already exists in this structure.`,
                        undefined,
                        {isFatal: true}
                    );
                super.push(result);
            } catch (error) {
                if (!(error instanceof ValidationError))
                    throw error;
                errors.push(error);
            }
        }

        if (errors.length)
            throw new ValidationError("Validation error on input object.").addNested(errors);
    }

    /**
     * buildSetting - method, designed to build and validate plugin settings structure.
     * @param setting
     * @method
     * @author Danil Andreev
     */
    protected buildSetting(setting: any): PluginSetting {
        if (typeof setting !== "object" || typeof setting.type !== "string")
            throw new ValidationError("Fatal: Invalid type of input.", undefined, {isFatal: true});
        switch (setting.type) {
            case "float":
                return new FloatField(setting);
            case "integer":
                return new IntegerField(setting);
            case "string":
                return new StringField(setting);
            case "boolean":
                return new BooleanField(setting);
            case "group":
                return new GroupField(setting);
            case "separator":
                return new SeparatorField(setting);
            default:
                throw new ValidationError("Fatal: invalid type on one of tokens.", undefined, {isFatal: true});
        }
    }

    public map<U>(callback: (value: PluginSetting, index: number, array: PluginSetting[]) => U, thisArg?: any): U[] {
        const newArray: PluginSetting[] = [...this];
        return newArray.map(callback);
    }

    filter(predicate: (value: PluginSetting, index: number, array: PluginSetting[]) => unknown, thisArg?: any): PluginSetting[] {
        const newArray: PluginSetting[] = [...this];
        return newArray.filter(predicate, thisArg);
    }

    slice(start?: number, end?: number): PluginSetting[] {
        const newArray: PluginSetting[] = [...this];
        return newArray.slice(start, end);
    }

    public concat(...items): PluginSettingsSpec {
        const newArray: PluginSetting[] = [...this].concat(...items);
        return new PluginSettingsSpec(newArray);
    }

    public copyWithin(target: number, start: number, end?: number): this {
        throw new Error(`This method is not allowed in PluginSettingSpec object.`);
    }

    public fill(value: PluginSetting, start?: number, end?: number): this {
        throw new Error(`This method is not allowed in PluginSettingSpec object.`);
    }

    public push(...items): number {
        throw new Error(`This method is not allowed in PluginSettingSpec object.`);
    }

    public splice(start: number, deleteCount?: number): PluginSetting[] {
        throw new Error(`This method is not allowed in PluginSettingSpec object.`);
    }

    public unshift(...items): number {
        throw new Error(`This method is not allowed in PluginSettingSpec object.`);
    }
}