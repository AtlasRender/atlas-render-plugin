/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 17:00
 * All rights reserved.
 */

import {PluginSetting} from "../../src/entities";
import ValidationError from "../../src/errors/ValidationError";


describe("entities->PluginSetting", () => {
    test("Test correct token.", () => {
        const token = {
            name: "basicSetting",
            label: "A basic setting",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("float", token)).not.toThrowError();
        expect(result).toBeInstanceOf(PluginSetting);
        expect(result.isValid()).toBe(true);
        expect(result.name).toBe(token.name);
        expect(result.label).toBe(token.label);
        expect(result.getType()).toBe("float");
    });

    test("Test correct token with custom number id.", () => {
        const token = {
            name: "basicSetting",
            label: "A basic setting",
            id: 1234,
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("float", token)).not.toThrowError();
        expect(result).toBeInstanceOf(PluginSetting);
        expect(result.isValid()).toBe(true);
        expect(result.id).toBe(token.id);
    });

    test("Test correct token with custom string id.", () => {
        const token = {
            name: "basicSetting",
            label: "A basic setting",
            id: "hello-darkness",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("float", token)).not.toThrowError();
        expect(result).toBeInstanceOf(PluginSetting);
        expect(result.isValid()).toBe(true);
        expect(result.id).toBe(token.id);
    });

    test("Test incorrect type.", () => {
        const token = {
            name: "basicSetting",
            label: "A basic setting",
        };
        expect(() => new PluginSetting("not_existing_type", token)).toThrowError(ValidationError);
    });

    test("Test incorrect token type.", () => {
        const token = "I am a string";
        expect(() => new PluginSetting("integer", token)).toThrowError(ValidationError);
    });

    test("Test token without name.", () => {
        const token = {
            label: "A basic setting",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("name")).toBeTruthy();
        expect(result.getValidation().errorOn("label")).toBeFalsy();
    });

    test("Test token without label.", () => {
        const token = {
            name: "basicSetting",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("label")).toBeTruthy();
        expect(result.getValidation().errorOn("name")).toBeFalsy();
    });

    test("Test token without label and name.", () => {
        const token = {
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("label")).toBeTruthy();
        expect(result.getValidation().errorOn("name")).toBeTruthy();
    });

    test("Test token without extra log label.", () => {
        const token = {
            name: "basicSetting",
            label: "I am string more than 25 chars",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("label")).toBeTruthy();
        expect(result.getValidation().errorOn("name")).toBeFalsy();
    });

    test("Test token with invalid name / name with restricted characters. (1sdf)", () => {
        const token = {
            name: "1sdf",
            label: "I am a label",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("name")).toBeTruthy();
        expect(result.getValidation().errorOn("label")).toBeFalsy();
    });

    test("Test token with invalid name / name with restricted characters. (Hello lol)", () => {
        const token = {
            name: "Hello lol",
            label: "I am a label",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("name")).toBeTruthy();
        expect(result.getValidation().errorOn("label")).toBeFalsy();
    });

    test("Test token with invalid name / name with restricted characters. (Hello-lol)", () => {
        const token = {
            name: "Hello-lol",
            label: "I am a label",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("name")).toBeTruthy();
        expect(result.getValidation().errorOn("label")).toBeFalsy();
    });

    test("Test token with too long id", () => {
        const token = {
            name: "name",
            label: "I am a label",
            id: "Hello darkness my old friend, I've come to talk with you again, Because a vision softly creeping.",
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).toThrowError(TypeError);
    });

    test("Test token with invalid id type.", () => {
        const token = {
            name: "name",
            label: "I am a label",
            id: true,
        };
        let result: PluginSetting = null;
        expect(() => result = new PluginSetting("integer", token)).toThrowError(TypeError);
    });
});
