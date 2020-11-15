/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 15:02
 * All rights reserved.
 */

import ValidationError from "../errors/ValidationError";
import {BooleanField, FloatField, GroupField, PluginSetting, SeparatorField} from "./index";
import IntegerField from "./IntegerField";


/**
 * PluginSettingsSpec - class for constructing plugin settings system.
 * @class
 * @author Danil Andreev
 */
export default class PluginSettingsSpec {
    /**
     * settings - plugin settings structure.
     */
    public readonly settings: PluginSetting[];

    /**
     * Creates an instance of PluginSettingsSpec
     * @param settings - Input object structure to process.
     * @constructor
     * @author Danil Andreev
     */
    constructor(settings: any) {
        if (!Array.isArray(settings)) {
            throw new ValidationError("Fatal: Invalid type of input", undefined, true);
        }

        const errors: ValidationError[] = [];

        this.settings = settings.map((setting: any): PluginSetting => {
            try {
                const result = this.buildSetting(setting);
                if (!result.isValid())
                    throw result.getValidation();
                return result;
            } catch (error) {
                if (!(error instanceof ValidationError))
                    throw error;!
                errors.push(error);
            }
        });
    }

    /**
     * buildSetting - method, designed to build and validate plugin settings structure.
     * @param setting
     * @method
     * @author Danil Andreev
     */
    protected buildSetting(setting: any): PluginSetting {
        if (typeof setting !== "object" || typeof setting.type !== "string")
            throw new ValidationError("Fatal: Invalid type of input.", undefined, true);
        switch (setting.type) {
            case "float":
                return new FloatField(setting);
            case "integer":
                return new IntegerField(setting);
            case "boolean":
                return new BooleanField(setting);
            case "group":
                return new GroupField(setting);
            case "separator":
                return new SeparatorField(setting);
            default:
                throw new ValidationError("Fatal: invalid type on one of tokens.", undefined, true);
        }
    }
}