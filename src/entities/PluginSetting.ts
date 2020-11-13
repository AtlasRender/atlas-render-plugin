/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:19 PM
 * All rights reserved.
 */

import ValidationError from "../errors/ValidationError";


/**
 * PluginSetting - base class for plugin settings.
 * @class
 * @author Danil Andreev
 */
export default class PluginSetting {
    /**
     * type - the type of a filed.
     */
    public readonly type: string;
    /**
     * name - key value of the field.
     */
    public readonly name: string;
    /**
     * label - label of the field. Will be displayed in the UI.
     */
    public readonly label: string;

    /**
     * Creates an instance of PluginSetting
     * @constructor
     * @param setting - Setting object.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        const validationError = new ValidationError("Error validating settings in PluginSettings.");

        if (typeof setting !== "object" || Array.isArray(setting))
            throw new ValidationError("Fatal validation error: incorrect token.", [], true);

        const {type, name, label} = setting;

        // TODO: add length check.
        if (typeof type !== "string")
            validationError.reject("type", "string", {got: typeof type});
        if (typeof name !== "string" || name.length > 50)
            validationError.reject(
                "name",
                "string",
                {got: typeof name}
            );
        if (typeof label !== "string" || label.length > 50)
            validationError.reject(
                "label",
                "string",
                {got: typeof name}
            );

        if (validationError.hasErrors()) {
            throw validationError;
        }
    }
}
