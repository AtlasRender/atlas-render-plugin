/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 18:23
 * All rights reserved.
 */

import {GroupField, PluginSetting} from "../../src/entities";


describe("entities->GroupField", () => {
    test("Test correct token.", () => {
        const token = {
            name: "groupField",
            label: "I am a group field",
            nested: [
                {
                    type: "integer",
                    name: "nestedInteger",
                    label: "I am an nested int",
                    min: 0,
                    max: 10,
                    default: 2,
                },
                {
                    type: "float",
                    name: "nestedFloat",
                    label: "I am a a nested float",
                    min: 0.1,
                    max: 10.2,
                    default: 2.4,
                },
            ],
        };
        let result: GroupField = null;
        expect(() => result = new GroupField(token)).not.toThrowError();
        expect(result).toBeInstanceOf(GroupField);
        expect(result.isValid()).toBe(true);
        expect(result.name).toBe(token.name);
        expect(result.label).toBe(token.label);
        expect(result.getType()).toBe("group");
        for (const nested of result.nested) {
            expect(nested).toBeInstanceOf(PluginSetting);
        }
    });

    test("Test incorrect nested token.", () => {
        const token = {
            name: "groupField",
            label: "I am a group field",
            nested: [
                "token",
                {
                    type: "float",
                    name: "nestedInteger",
                    label: "I am a a nested float",
                    min: 0.1,
                    max: 10.2,
                    default: 2.4,
                },
            ],
        };
        let result: GroupField = null;
        expect(() => result = new GroupField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("nested").getNested()[0].isFatal()).toBe(true);
    });

    test("Test incorrect nested token.", () => {
        const token = {
            name: "groupField",
            label: "I am a group field",
            nested: [
                {
                    type: "float",
                    name: "nestedInteger",
                    label: "I am a a nested float",
                    min: 0.1,
                    max: 10,
                    default: 11,
                },
            ],
        };
        let result: GroupField = null;
        expect(() => result = new GroupField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("nested")).toBeTruthy();
        expect(result.getValidation().errorOn("nested").getNested()[0].errorOn("default")).toBeTruthy();
    });
});
