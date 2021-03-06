/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/16/20, 3:49 PM
 * All rights reserved.
 */


import {PluginSettingsSpec, SettingsPayload} from "../../src/entities";
import {ValidationError} from "../../src/errors";


interface PayloadFields {
    intVal: number,
    groupVal: {
        strVal: string;
        boolVal: boolean;
    }
}

describe("entities->SettingsPayload", () => {
    const spec: PluginSettingsSpec = new PluginSettingsSpec([
        {
            type: "integer",
            name: "intVal",
            label: "Integer value",
            min: -3,
            max: 10,
            default: 5,
            id: 1,
        },
        {
            type: "group",
            name: "groupVal",
            label: "Group",
            id: 2,
            nested: [
                {
                    type: "string",
                    name: "strVal",
                    label: "String value",
                    min: 0,
                    max: 50,
                    default: "Hello",
                    id: 3,
                    nullable: true,
                },
                {
                    type: "boolean",
                    name: "boolVal",
                    label: "Boolean field",
                    default: false,
                    id: 4,
                }
            ]
        }
    ]);
    let token: any = null;

    beforeEach(() => {
        token = {
            intVal: 2,
            groupVal: {
                strVal: "Hello darkness my old friend",
                boolVal: true,
            },
        }
    });

    test("Test with correct payload.", () => {
        let result: SettingsPayload<PayloadFields> = null;
        expect(() => result = new SettingsPayload<PayloadFields>(spec, token)).not.toThrowError();
        expect(result).toBeInstanceOf(SettingsPayload);
        expect(result.payload.intVal).toBe(token.intVal);
        expect(result.payload.groupVal.strVal).toBe(token.groupVal.strVal);
        expect(result.payload.groupVal.boolVal).toBe(token.groupVal.boolVal);
    });

    test("Test with incorrect payload.", () => {
        token.intVal = "hello";
        let result: SettingsPayload<PayloadFields> = null;
        expect(() => result = new SettingsPayload<PayloadFields>(spec, token)).toThrowError(ValidationError);
    });

    test("Test with correct payload with null strVal.", () => {
        token.strVal = null;
        let result: SettingsPayload<PayloadFields> = null;
        expect(() => result = new SettingsPayload<PayloadFields>(spec, token)).not.toThrowError();
    });

    test("Test validation trace on incorrect payload. (1)", () => {
        token.intVal = "hello";
        let result: SettingsPayload<PayloadFields> = null;
        expect(() => {
            try {
                result = new SettingsPayload<PayloadFields>(spec, token);
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.getErrorOnId(1)).toBeTruthy();
                }
                else
                    throw error;
            }
        }).not.toThrowError();
    });

    test("Test validation trace on incorrect payload. (4)", () => {
        token.boolVal = "true";
        let result: SettingsPayload<PayloadFields> = null;
        expect(() => {
            try {
                result = new SettingsPayload<PayloadFields>(spec, token);
            } catch (error) {
                if (error instanceof ValidationError) {
                    expect(error.getErrorOnId(1)).toBeTruthy();
                }
                else
                    throw error;
            }
        }).not.toThrowError();
    });
});
