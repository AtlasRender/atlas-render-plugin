/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:42 PM
 * All rights reserved.
 */

export default class SettingValidationError extends TypeError {
    protected validation: string[];
    constructor(message: string, validation?: string[]) {
        super(message);
    }
    public getValidation(): readonly string[] {
        return this.validation;
    }
    reject() {

    }
}