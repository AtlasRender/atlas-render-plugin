/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 21:30
 * All rights reserved.
 */

import {SeparatorField} from "../../src/entities";


describe("entities->SeparatorField", () => {
    test("Test correct token.", () => {
        const token = {
            name: "separatorField",
            label: "I am separator",
        };
        let result: SeparatorField = null;
        expect(() => result = new SeparatorField(token)).not.toThrowError();
        expect(result).toBeInstanceOf(SeparatorField);
        expect(result.name).toBe(token.name);
        expect(result.label).toBe(token.label);
        expect(result.getType()).toBe("separator");
    });
});
