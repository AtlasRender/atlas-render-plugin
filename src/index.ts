 /*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/12/20, 5:19 PM
 * All rights reserved.
 */

import {PluginSettingsSpec} from "./entities";

const input = [
    {
        type: "integer",
        name: "lol",
        label: "Loool the variable",
        min: 100,
        max: 10,
        default: 3,
    }
]

try {
    const spec = new PluginSettingsSpec(input);
    console.log(spec);
} catch (error) {
    console.error(error.message, error);
}
