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
});