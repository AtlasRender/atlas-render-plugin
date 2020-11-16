/*
 * Copyright (c) 2020. This code created and belongs to Pathfinder render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * File creator: Danil Andreev
 * Project: atlas-render-plugin
 * File last modified: 11/16/20, 4:59 PM
 * All rights reserved.
 */

/**
 * ValidationErrorOptions - interface for ValidationErrorOptions.
 * @interface
 * @author Danil Andreev
 */
export interface ValidationErrorOptions {
    /**
     * isFatal - if true - validation is failed with fatal error.
     */
    isFatal?: boolean,
    /**
     * id - custom identifier. Not used in validation.
     */
    id?: any,
}
