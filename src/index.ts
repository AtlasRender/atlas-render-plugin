/*
* Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
* Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
* File creator: Danil Andreev
* Project: atlas-render-plugin
* File last modified: 11/12/20, 5:19 PM
* All rights reserved.
*/

import {GroupField, PluginSetting, PluginSettingsSpec, StringField} from "./entities";
import ValidationError from "./errors/ValidationError";
import SettingsPayload from "./entities/SettingsPayload";

const input = [
    {
        type: "integer",
        name: "intVal",
        label: "Integer value",
        min: -3,
        max: 10,
        default: 5,
    },
    {
        type: "group",
        name: "groupVal",
        label: "Group",
        nested: [
            {
                type: "string",
                name: "strVal",
                label: "String value",
                min: 0,
                max: 50,
                default: "Hello",
            },
            {
                type: "boolean",
                name: "boolVal",
                label: "Boolean field",
                default: false,
            }
        ]
    }
]

const payload = {
    intVal: "hello",
    groupVal: {
        strVal: "Hello darkness my old friend",
        boolVal: true,
    },
}
// const err = {
//     message: "Error",
//     fatalError: false,
//     validation: [],
//     nested: [
//         new ValidationError("hello"),
//         new ValidationError("darkness"),
//     ],
// };
//
// try {
//     const res = ValidationError.createValidationError(err);
//     console.log(res);
// }catch (error) {
//     console.error(error.message, error.trace);
// }


// try {
//     const spec = new PluginSettingsSpec(input);
//     const result = new SettingsPayload(spec, payload);
//     console.log(result);
// } catch (error) {
//     console.error(error.message, error);
// }


const token = {
    name: "floatFiled",
    label: "I am float field",
    min: 0,
    max: 10,
    default: "Hello darkness my old friend",
};

console.log(new StringField(token).getValidation());