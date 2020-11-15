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
     * types - available setting types.
     */
    public static readonly types: string[] = [
        "float",
        "integer",
        "string",
        "boolean",
        "group",
        "separator",
    ];

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

    protected validation: ValidationError;

    /**
     * Creates an instance of PluginSetting
     * @constructor
     * @param type - Type of the plugin setting.
     * @param setting - Setting object.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(type: string, setting: any) {
        this.validation = new ValidationError("Validation error");

        if (typeof setting !== "object" || Array.isArray(setting))
            throw new ValidationError("Fatal validation error: incorrect token.", [], true);

        const {name, label} = setting;

        if (!PluginSetting.types.includes(type))
            throw new ValidationError("Incorrect setting type.", undefined, true);

        if (typeof name !== "string")
            this.validation.reject("name", "string", {got: typeof name});
        else if (name.length > 20)
            this.validation.reject(
                "name",
                "string",
                {message: "Name is too long", status: 413}
            );

        if (typeof label !== "string")
            this.validation.reject("label", "string", {got: typeof name});
        else if (label.length > 25)
            this.validation.reject(
                "label",
                "string",
                {message: "Label is too long", status: 413, got: label}
            );

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

    /**
     * isValid - if validation has no errors will return true, else - false.
     * @method
     * @author Danil Andreev
     */
    isValid(): boolean {
        return !this.validation.hasErrors();
    }

    /**
     * getValidation - returns validation error object.
     * @method
     * @author Danil Andreev
     */
    public getValidation(): ValidationError {
        return this.validation;
    }
}
