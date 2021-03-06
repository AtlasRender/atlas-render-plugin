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
 * SeparatorField - class, designed to create fields separator in plugin settings.
 * @class
 * @author Danil Andreev
 */
export default class SeparatorField extends PluginSetting {
    /**
     * Creates an instance of SeparatorField.
     * @param setting - Object with payload to construct entity.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(setting: any) {
        super("separator", setting);
    }

    validatePayload(payload: any): null {
        return null;
    }
}
