/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 21:34
 * All rights reserved.
 */

import {PluginSettingsSpec} from "../../src/entities";
import ValidationError from "../../src/errors/ValidationError";


describe("entities->PluginSettingSpec", () => {
    let token = null;
    beforeEach(() => {
        token = [
            {
                type: "integer",
                name: "int",
                label: "Integer",
                min: -10,
                max: 100,
                default: -2,
            },
            {
                type: "separator",
                name: "sep",
                label: "Separator",
            },
            {
                type: "group",
                name: "grp",
                label: "A group",
                nested: [
                    {
                        type: "boolean",
                        name: "bool",
                        label: "Boolean",
                        default: false,
                    }
                ]
            },
        ];
    });

    test("Test correct token.", () => {
        let result: PluginSettingsSpec = null;
        expect(() => result = new PluginSettingsSpec(token)).not.toThrowError();
        expect(result.settings.length).toBe(3);
    });

    test("Test incorrect token.", () => {
        token[1] = "separator";
        let result: PluginSettingsSpec = null;
        expect(() => result = new PluginSettingsSpec(token)).toThrowError(ValidationError);
    });

    test("Test incorrect token type.", () => {
        token[1].type = "not_existing_type";
        let result: PluginSettingsSpec = null;
        expect(() => result = new PluginSettingsSpec(token)).toThrowError(ValidationError);
    });

    test("Test incorrect nested token type.", () => {
        token[2].nested[0].default = "string";
        let result: PluginSettingsSpec = null;
        expect(() => result = new PluginSettingsSpec(token)).toThrowError(ValidationError);
    });
});
