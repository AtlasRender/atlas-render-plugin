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
import {PluginSettingsSpec} from "./index";


/**
 * GroupField - class, designed to create  plugin setting groups.
 * @class
 * @author Danil Andreev
 */
export default class GroupField extends PluginSetting {
    /**
     * nested - nested items in group.
     */
    public readonly nested: PluginSetting[];

    /**
     * Creates an instance of GroupField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super("group", setting);

        if (!Array.isArray(setting.nested))
            this.validation.reject("nested", "array", {got: typeof setting.default});

        this.nested = [];
        try {
            this.nested = new PluginSettingsSpec(setting.nested).settings;
        } catch (error) {
            if (!(error instanceof ValidationError))
                throw error;
            this.validation.reject("nested", "array", {nested: error.getNested()});
        }
    }

    validatePayload(payload: any): object {
        const validationError = new ValidationError("Incorrect payload.");
        if (typeof payload !== "object")
            throw validationError.failValidation();

        const interpreted: object = this.nested.reduce((result: any, token: PluginSetting) => {
            try {
                result[token.name] = token.validatePayload(payload[token.name]);
            } catch (error) {
                if (!(error instanceof ValidationError))
                    throw error;
                validationError.addNested(error);
            } finally {
                return result;
            }
        }, {});

        if (validationError.hasErrors())
            throw validationError;

        return interpreted;
    }
}
