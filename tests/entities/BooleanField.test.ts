/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 16:39
 * All rights reserved.
 */

import {BooleanField} from "../../src/entities";
import ValidationError from "../../src/errors/ValidationError";


describe("entities->BooleanField", () => {
    test("Test correct token.", () => {
        const token = {
            name: "booleanField",
            label: "Boolean field",
            default: false,
        };
        let result: BooleanField = null;
        expect(() => result = new BooleanField(token)).not.toThrowError();
        expect(result).toBeInstanceOf(BooleanField);
        expect(result.isValid()).toBe(true);
        expect(result.name).toBe(token.name);
        expect(result.label).toBe(token.label);
        expect(result.default).toBe(token.default);
        expect(result.getType()).toBe("boolean");
    });

    test("Test token without default.", () => {
        const token = {
            name: "bool",
            label: "Boolean field",
        };
        let result: BooleanField = null;
        expect(() => result = new BooleanField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().isFatal()).toBe(false);
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token without name and default.", () => {
        const token = {
            label: "Boolean field",
        };
        let result: BooleanField = null;
        expect(() => result = new BooleanField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().isFatal()).toBe(false);
        expect(result.getValidation().errorOn("name")).toBeTruthy();
        expect(result.getValidation().errorOn("label")).toBeFalsy();
        expect(result.getValidation().errorOn("default")).toBeTruthy();
    });

    test("Test token with incorrect value in default.", () => {
        const token = {
            label: "Boolean field",
            default: "true",
        };
        let result: BooleanField = null;
        expect(() => result = new BooleanField(token)).not.toThrowError();
        expect(result.isValid()).toBe(false);
        expect(result.getValidation().isFatal()).toBe(false);
        expect(result.getValidation().errorOn("default")).toBeTruthy();
        expect(result.getValidation().errorOn("default").expected).toBe("boolean");
        expect(result.getValidation().errorOn("default").got).toBe("string");
    });

    test("Test incorrect token.", () => {
        const token = "I am a string";
        let result: BooleanField = null;
        expect(() => result = new BooleanField(token)).toThrowError(ValidationError);
    });
});
