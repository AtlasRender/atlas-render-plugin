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
    private type: string;
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
     * @param type - Type of the plugin setting.
     * @param setting - Setting object.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(type: string, setting: any) {
        const validationError = new ValidationError("Error validating settings in PluginSettings.");

        if (typeof setting !== "object" || Array.isArray(setting))
            throw new ValidationError("Fatal validation error: incorrect token.", [], true);

        const {name, label} = setting;

        if (typeof type !== "string")
            validationError.reject("type", "string", {got: typeof type});
        else if (type.length > 50)
            validationError.reject(
                "type", // TODO: add type check.
                "string",
                {message: "Type is too long", status: 413}
            );

        if (typeof name !== "string")
            validationError.reject("name", "string", {got: typeof name});
        else if (name.length > 20)
            validationError.reject(
                "name",
                "string",
                {message: "Name is too long", status: 413}
            );

        if (typeof label !== "string" || label.length > 50)
            validationError.reject("label", "string", {got: typeof name});
        else if (label.length > 20)
            validationError.reject(
                "label",
                "string",
                {message: "Label is too long", status: 413}
            );


        if (validationError.hasErrors()) {
            throw validationError;
        }

        this.setType(type);
        this.name = name;
        this.label = label;
    }

    /**
     * setType - sets the type of the field.
     * @method
     * @author Danil Andreev
     */
    protected setType(type: string): void {
        this.type = type;
    }

    /**
     * getType - returns a type of the field.
     * @method
     * @author Danil Andreev
     */
    public getType(): string {
        return this.type;
    }
}
