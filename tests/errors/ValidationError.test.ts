/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 16.11.2020, 00:22
 * All rights reserved.
 */

import ValidationError from "../../src/errors/ValidationError";


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