/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/16/20, 5:08 PM
 * All rights reserved.
 */

/**
 * WebJsonable - interface for classes, able to convert their payload to web json structure.
 * @interface
 * @author Danil Andreev
 */
export default interface WebJsonable {
    /**
     * getJSON - returns clear json for web exchanges.
     * @method
     */
    getJSON(): object;
}
