/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:47 PM
 * All rights reserved.
 */

declare namespace SettingValidator {
    export interface Options {
        /**
         * message - unnecessary message.
         */
        readonly message?: string;
        /**
         * status - validation status.
         */
        readonly status?: number;
        /**
         * got - value, got as argument in validated object.
         */
        readonly got?: any;
    }
}

export default class SettingValidator implements SettingValidator.Options {
    /**
     * key - validated object key.
     */
    public readonly key: string;
    /**
     * expected - expected value of validated object.
     */
    public readonly expected: string;
    public readonly message?: string;
    public readonly status?: number;
    public readonly got?: any;
    constructor(key: string, expected: string, options?: SettingValidator.Options) {
        this.key = key;
        this.expected = expected;
        this.message = options.message;
        this.status = options.status;
        this.got = options.got;
    }
}