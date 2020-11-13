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
        let validationError: ValidationError = null;
        try {
            super("group", setting);
            validationError = new ValidationError("Error validating settings in GroupField.");
        } catch (error) {
            if (error instanceof ValidationError && !error.isFatal())
                validationError = error;
            else
                throw error;
        }

        if (!Array.isArray(setting.nested))
            validationError.reject("nested", "array", {got: typeof setting.default});

        if (validationError.hasErrors() || validationError.isFatal())
            throw validationError;
    }
}
