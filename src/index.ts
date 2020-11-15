/*
* Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
* Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
* File creator: Danil Andreev
* Project: atlas-render-plugin
* File last modified: 11/12/20, 5:19 PM
* All rights reserved.
*/

import {GroupField, PluginSettingsSpec} from "./entities";

const input = [
    {
        type: "group",
        name: "groupField",
        label: "I am a group field",
        nested: [
            {
                type: "integer",
                name: "nestedInteger",
                label: "I am an nested int",
                min: 0,
                max: 10,
                default: 2,
            },
            {
                type: "float",
                name: "nestedInteger",
                label: "I am a a nested float",
                min: 0.1,
                max: 10.2,
                default: 2.4,
            },
        ],
    }
];

new GroupField(input[0]);

// try {
//     const spec = new PluginSettingsSpec(input);
//     console.log(spec);
// } catch (error) {
//     console.error(error.message, error);
// }
