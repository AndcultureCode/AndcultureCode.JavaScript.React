import { CollectionUtils } from "utilities/collection-utils";

// -----------------------------------------------------------------------------------------
// #region Private Methods
// -----------------------------------------------------------------------------------------

const _numericEnumToPojo = (enumObject: any): {} => {
    let pojo: { [k: string]: any } = {};

    for (const key in enumObject) {
        if (isNaN(parseInt(key))) {
            pojo[key] = enumObject[key];
        }
    }

    return pojo;
};

const _objectToArray = (object: any): any[] => {
    const result: any[] = [];

    if (CollectionUtils.isEmpty(object)) {
        return result;
    }

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            result.push(object[key]);
        }
    }

    return result;
};

/**
 * Creates a timer instance that when stopped will supply elapsed time in milliseconds.
 * Useful for benchmarking or providing counters
 * @param name Useful name to identify the timer
 */
const _timer = (name: string) => {
    var start = new Date();
    return {
        /**
         * Stops the timer and returns elapsed time in milliseconds
         * @param log Optional flag if you'd like the timer to log to the console
         */
        stop(log?: boolean): number {
            var end = new Date();
            var time = end.getTime() - start.getTime();

            if (log === true) {
                console.log("Timer:", name, "finished in", time, "ms");
            }

            return time;
        },
    };
};

// #endregion Private Methods

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export const CoreUtils = {
    numericEnumToPojo: _numericEnumToPojo,
    objectToArray: _objectToArray,
    timer: _timer,
};

// #endregion Exports
