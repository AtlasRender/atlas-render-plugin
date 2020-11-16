/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 16.11.2020, 00:22
 * All rights reserved.
 */

import ValidationError from "../../src/errors/ValidationError";
import Validator from "../../src/errors/Validator";


describe("errors->ValidationError", () => {
    test("Test creation.", () => {
        let result: ValidationError = null;
        expect(() => result = new ValidationError("Something is invalid")).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.isFatal()).toBe(false);
        expect(result.getNested().length).toBe(0);
        expect(result.getValidation().length).toBe(0);
    });

    test("Test fatal error on creation.", () => {
        let result: ValidationError = null;
        expect(() => result = new ValidationError(
            "Something is invalid",
            undefined,
            true
        )).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.isFatal()).toBe(true);
    });

    test("Test rejection.", () => {
        let result: ValidationError = null;
        expect(() => result = new ValidationError("Something is invalid")).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        result.reject("field", "string");
        expect(result.isFatal()).toBe(false);
        expect(result.hasErrors()).toBe(true);
        expect(result.getNested().length).toBe(0);
        expect(result.getValidation().length).toBe(1);
        expect(result.errorOn("field")).toBeTruthy();
    });

    test("Test errors nesting.", () => {
        let result: ValidationError = null;
        expect(() => result = new ValidationError("Something is invalid")).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        result.addNested(new ValidationError("Nested error."));
        expect(result.isFatal()).toBe(false);
        expect(result.getNested().length).toBe(1);
        expect(result.getValidation().length).toBe(0);
        expect(result.hasErrors()).toBe(true);
    });
});

describe("errors->ValidationError createValidationError", () => {
    let token: any = null;
    beforeEach(() => {
        token = {
            message: "Error",
            fatalError: false,
            validation: [],
            nested: [],
        };
    });

    test("Test valid token.", () => {
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.hasErrors()).toBe(false);
        expect(result.message).toBe(token.message);
        expect(result.getValidation()).toEqual(token.validation);
        expect(result.getNested()).toEqual(token.nested);
    });

    test("Test valid token with nested errors.", () => {
        token.nested = [
            new ValidationError("hello"),
            new ValidationError("darkness"),
        ];
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.getNested().length).toBe(2);
    });

    test("Test valid token with validators.", () => {
        token.validation = [
            new Validator("field1", "string"),
            new Validator("field2", "string"),
        ];
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.getValidation().length).toBe(2);
    });

    test("Test valid token with validators.", () => {
        token.validation = [
            new Validator("field1", "string"),
            new Validator("field2", "string"),
        ];
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).not.toThrowError();
        expect(result).toBeInstanceOf(ValidationError);
        expect(result.getValidation().length).toBe(2);
    });

    test("Test invalid token. (validation)", () => {
        token.validation = "I am a string";
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (nested)", () => {
        token.nested = "I am a string";
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (fatalError)", () => {
        token.fatalError = "false";
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (message)", () => {
        token.message = {hello: "darkness"};
        let result: ValidationError = null;
        expect(() => result = ValidationError.createValidationError(token)).toThrowError(TypeError);
    });
});
