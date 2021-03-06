/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 15.11.2020, 18:17
 * All rights reserved.
 */

import ValidatorOptions from "./ValidatorOptions";
import {ValidationError} from "../errors";


/**
 * ValidatorOptionsExtended - interface for Validator options, extended with nested errors.
 * @interface
 * @author Danil Andreev
 */
export default interface ValidatorOptionsExtended extends ValidatorOptions {
    /**
     * nested - nested items errors.
     */
    nested?: readonly ValidationError[];
}
