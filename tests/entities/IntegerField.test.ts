/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 17:39
 * All rights reserved.
 */

import {IntegerField} from "../../src/entities";


describe("entities->IntegerField", () => {
    test("Test correct token.", () => {
        const token = {
            name: "integerField",
            label: "I am an integer field",
            min: 0,
            max: 10,
            default: 2,
        }
        let result: IntegerField = null;
        expect(() => result = new IntegerField(token)).not.toThrowError();
        expect(result).toBeInstanceOf(IntegerField);
        expect(result.isValid()).toBe(true);
        expect(result.name).toBe(token.name);
        expect(result.label).toBe(token.label);
        expect(result.min).toBe(token.min);
        expect(result.max).toBe(token.max);
        expect(result.default).toBe(token.default);
        expect(result.getType()).toBe("integer");
    });

    test("Test non integer min.", () => {
        const token = {
            name: "integerField",
            label: "I am an integer field",
            min: 0.1,
            max: 10,
            default: 2,
        }
        let result: IntegerField = null;
        expect(() => result = new IntegerField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeTruthy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test non integer max.", () => {
        const token = {
            name: "integerField",
            label: "I am an integer field",
            min: 0,
            max: 10.2,
            default: 2,
        }
        let result: IntegerField = null;
        expect(() => result = new IntegerField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeTruthy();
        expect(result.getValidation().errorOn("default")).toBeFalsy();
    });

    test("Test non integer default.", () => {
        const token = {
            name: "integerField",
            label: "I am an integer field",
            min: 0,
            max: 10,
            default: 2.1,
        }
        let result: IntegerField = null;
        expect(() => result = new IntegerField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test default out of min max bounds.", () => {
        const token = {
            name: "integerField",
            label: "I am an integer field",
            min: 0,
            max: 10,
            default: 20,
        }
        let result: IntegerField = null;
        expect(() => result = new IntegerField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().errorOn("min")).toBeFalsy();
        expect(result.getValidation().errorOn("max")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });
});
