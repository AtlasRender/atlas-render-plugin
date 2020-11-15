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
 * BooleanField - class, designed to create integer plugin setting.
 * @class
 * @author Danil Andreev
 */
export default class BooleanField extends PluginSetting {
    /**
     * default - default value.
     */
    public readonly default: boolean;

    /**
     * Creates an instance of BooleanField.
     * @param setting - Object with payload to construct entity.
     * @param type - type of the setting. By default - float.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any, type: "boolean" = "boolean") {
        super(type, setting);

        if (typeof setting.default !== "boolean")
            validationError.reject("default", "boolean", {got: typeof setting.default});

        this.default = setting.default;
    }
}
