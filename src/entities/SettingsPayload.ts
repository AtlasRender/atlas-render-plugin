/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/16/20, 2:57 PM
 * All rights reserved.
 */

import {PluginSetting, PluginSettingsSpec} from "./index";
import ValidationError from "../errors/ValidationError";


/**
 * SettingsPayload - class for validating and constructing plugin setting payload from input data.
 * @class
 * @author Danil Andreev
 */
export default class SettingsPayload<T = any> {
    /**
     * payload - plugin settings validated payload.
     */
    public readonly payload: T;
    /**
     * spec - plugin settings payload spec. Need to validate input data and convert is to correct payload.
     */
    public readonly spec: PluginSettingsSpec;

    /**
     * Creates an instance of SettingsPayload.
     * @param spec - Plugin settings payload spec. Need to validate input data and convert is to correct payload.
     * @param payload - Any payload to validate and convert.
     * @throws ValidationError
     * @author Danil Andreev
     */
    constructor(spec: PluginSettingsSpec, payload: any) {
        this.spec = spec;
        const validationError = new ValidationError("Invalid payload.");
        const interpreted = spec.reduce((result: any, token: PluginSetting) => {
            try {
                result[token.name] = token.validatePayload(payload[token.name]);
            } catch (error) {
                if (!(error  instanceof ValidationError))
                    throw error;
                validationError.addNested(error);
            } finally {
                return result;
            }
        }, {});

        if(validationError.hasErrors())
            throw validationError;

        this.payload = interpreted;
    }
}
