/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 17:23
 * All rights reserved.
 */

import {StringField} from "../../src/entities";


describe("entities->StringField", () => {
    test("Test correct token.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            max: 10,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result).toBeInstanceOf(StringField);
        expect(result.isValid()).toBe(true);
        expect(result.min).toBe(token.min);
        expect(result.max).toBe(token.max);
        expect(result.default).toBe(token.default);
        expect(result.label).toBe(token.label);
        expect(result.name).toBe(token.name);
        expect(result.getType()).toBe("string");
    });

    test("Test token without min.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            max: 10,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test token without max.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("max")).toBeTruthy();
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test token without default.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            max: 10,
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("default")).toBeTruthy();
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
    });

    test("Test token with min greater than max.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 100,
            max: 10,
            default: "Hello Darkness",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeTruthy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with default length not in min max bounds.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            max: 10,
            default: "Hello darkness my old friend",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with incorrect type of min.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: "10",
            max: 100,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with incorrect type of max.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            max: "100",
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeTruthy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test token with incorrect type of default.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: 0,
            max: 100,
            default: 10,
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with incorrect type of default and min.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: "0",
            max: 100,
            default: 10,
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with min less than zero.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: -10,
            max: 100,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test token with max less than zero.", () => {
        const token = {
            name: "floatFiled",
            label: "I am float field",
            min: -100,
            max: -10,
            default: "Hello",
        };
        let result: StringField = null;
        expect(() => result = new StringField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeTruthy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });
});
