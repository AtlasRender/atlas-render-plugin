/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 16.11.2020, 00:12
 * All rights reserved.
 */

import Validator from "../../src/errors/Validator";
import ValidationError from "../../src/errors/ValidationError";


describe("errors->Validator", () => {
    test("Test creation.", () => {
        let result: Validator = null;
        expect(() => result = new Validator("field", "string")).not.toThrowError();
        expect(result).toBeInstanceOf(Validator);
        expect(result.key).toBe("field");
        expect(result.expected).toBe("string");
        expect(result.got).toBe(undefined);
        expect(result.getNested()).toEqual([]);
        expect(result.message).toBe(undefined);
        expect(result.status).toBe(undefined);
    });

    test("Test creation with options.", () => {
        let result: Validator = null;
        expect(() =>
            result = new Validator(
                "field",
                "string",
                {status: 100, message: "hello", got: "got_value"}
            )
        ).not.toThrowError();
        expect(result).toBeInstanceOf(Validator);
        expect(result.key).toBe("field");
        expect(result.expected).toBe("string");
        expect(result.got).toBe("got_value");
        expect(result.getNested()).toEqual([]);
        expect(result.message).toBe("hello");
        expect(result.status).toBe(100);
    });

    test("Test errors nesting", () => {
        let result: Validator = null;
        expect(() => result = new Validator("field", "string")).not.toThrowError();
        expect(result).toBeInstanceOf(Validator);
        const nestedError: ValidationError = new ValidationError("Hello")
        expect(() => result.addNested(nestedError)).not.toThrowError();
        expect(result.getNested()).toContainEqual(nestedError);
    });

    test("Test compareCode", () => {
        const code = 421;
        expect(Validator.compareCode(420, code)).toBe(true);
        expect(Validator.compareCode(400, code)).toBe(true);
        expect(Validator.compareCode(0, code)).toBe(true);
        expect(Validator.compareCode(422, code)).toBe(false);
        expect(Validator.compareCode(223, code)).toBe(false);
    })
});

describe("errors->Validator createValidator", () => {
    let token: any = null;
    beforeEach(() => {
        token = {
            key: "field",
            expected: "string",
            message: "Error",
            status: 100,
            nested: []
        };
    });
    test("Test valid token.", () => {
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).not.toThrowError();
        expect(result).toBeInstanceOf(Validator);
        expect(result.key).toBe(token.key);
        expect(result.expected).toBe(token.expected);
        expect(result.status).toBe(token.status);
        expect(result.message).toBe(token.message);
        expect(result.getNested()).toEqual(token.nested);
    });

    test("Test valid token with nested errors.", () => {
        token.nested = [
            new ValidationError("hello"),
            new ValidationError("darkness"),
        ];
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).not.toThrowError();
        expect(result).toBeInstanceOf(Validator);
        expect(result.getNested().length).toBe(2);
    });

    test("Test invalid token. (nested type)", () => {
        token.nested = "string";
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (nested item)", () => {
        token.nested = ["darkness"];
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (expected)", () => {
        token.expected = 1;
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (key)", () => {
        token.key = 1;
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (message)", () => {
        token.message = 1;
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });

    test("Test invalid token. (status)", () => {
        token.status = "1";
        let result: Validator = null;
        expect(() => result = Validator.createValidator(token)).toThrowError(TypeError);
    });
});
