import { AxiosResponse } from "axios";
import { ServiceResponse } from "../interfaces/service-response";
import { PagedResult } from "andculturecode-javascript-core";
import { ResultRecord } from "andculturecode-javascript-core";
import { Result } from "andculturecode-javascript-core";

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

/**
 * Translates axios specific data response to a more generic ServiceResponse
 * type for consumption throughout the system
 */
const _mapAxiosResponse = <TRecord>(
    recordType: { new (props: Partial<TRecord>): TRecord },
    axiosResponse: AxiosResponse<Result<TRecord>>
): ServiceResponse<TRecord> => {
    if (axiosResponse == null) {
        return axiosResponse;
    }

    // Ensure result data is wrapped within a record
    let resultObject;
    if (axiosResponse.data?.resultObject != null) {
        resultObject = new recordType(axiosResponse.data.resultObject);
        axiosResponse.data.resultObject = resultObject;
    }

    return {
        result: new ResultRecord<TRecord>(axiosResponse.data),
        resultObject: resultObject,
        rowCount: 1,
        status: axiosResponse.status,
    };
};

/**
 * Translates axios specific data responses to a more generic ServiceResponse
 * type for consumption throughout the system
 */
const _mapPagedAxiosResponse = <TRecord>(
    recordType: { new (props: Partial<TRecord>): TRecord },
    axiosResponse: AxiosResponse<PagedResult<TRecord>>
): ServiceResponse<TRecord> => {
    if (axiosResponse == null) {
        return axiosResponse;
    }
    const data = axiosResponse.data;

    // Ensure result data is wrapped within records
    let resultObjects;
    if (data?.resultObject?.length != null && data.resultObject.length > 0) {
        resultObjects = data.resultObject.map((r) => new recordType(r));
        data.resultObject = resultObjects;
    }

    return {
        results: new ResultRecord<TRecord[]>(data),
        resultObjects: resultObjects,
        rowCount: data?.resultObject?.length ?? 0,
        status: axiosResponse.status,
    };
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export const ServiceUtils = {
    mapAxiosResponse: _mapAxiosResponse,
    mapPagedAxiosResponse: _mapPagedAxiosResponse,
};

// #endregion Exports
