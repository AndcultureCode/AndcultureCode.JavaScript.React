import { ServiceUtils } from "./service-utils";
import { StubResourceRecord } from "../tests/stubs/stub-resource-record";
import { Factory } from "rosie";
import { AxiosResponse } from "axios";
import { FactoryType } from "../tests/factories/factory-type";
import { ResultRecord } from "../view-models/result-record";
import "jest-extended";
import { RouteUtils } from "./route-utils";
import { RouteDefinition } from "../interfaces/route-definition";
import { RouteMap } from "../interfaces/route-map";

describe("RouteUtils", () => {
    // -----------------------------------------------------------------------------------------
    // #region appendQueryParams
    // -----------------------------------------------------------------------------------------

    describe("appendQueryParams", () => {
        test("when path is null, it returns '?'", () => {
            // Arrange
            const path = null;
            const queryParams = {};

            // Act
            const result = RouteUtils.appendQueryParams(path, queryParams);

            // Assert
            expect(result).toBe("?");
        });

        test("when queryParams is null, it returns the unmodified path", () => {
            // Arrange
            const path = "path";
            const queryParams = null;

            // Act
            const result = RouteUtils.appendQueryParams(path, queryParams);

            // Assert
            expect(result).toBe(path);
        });

        test("when queryParams is has a value, it returns the path", () => {
            // Arrange
            const path = "path";
            const queryParams = {
                skip: 1,
                take: 2,
            };

            // Act
            const result = RouteUtils.appendQueryParams(path, queryParams);

            // Assert
            expect(result).toBe("path?skip=1&take=2");
        });
    });

    // #endregion appendQueryParams

    // -----------------------------------------------------------------------------------------
    // #region debugRoutes
    // -----------------------------------------------------------------------------------------

    describe("debugRoutes", () => {
        test("when given a route map with a single route, it calls console.log once", () => {
            // Arrange
            const routeMap = Factory.build<RouteMap>(FactoryType.RouteMap);
            const consoleLogSpy = jest.spyOn(console, "log");

            // Act
            RouteUtils.debugRoutes(routeMap);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        });

        test("when given a route map with multiple routes, it calls console.log at least once", () => {
            // Arrange
            const routeMap = Factory.build<RouteMap>(FactoryType.RouteMap, {
                routes: Factory.build<RouteDefinition>(
                    FactoryType.RouteDefinition.Nested
                ),
            });
            const consoleLogSpy = jest.spyOn(console, "log");

            // Act
            RouteUtils.debugRoutes(routeMap);

            // Assert
            expect(consoleLogSpy).toHaveBeenCalled();
            expect(consoleLogSpy).not.toHaveBeenCalledTimes(1);
        });
    });

    // #endregion debugRoutes

    // -----------------------------------------------------------------------------------------
    // #region getFlattenedRoutes
    // -----------------------------------------------------------------------------------------

    describe("getFlattenedRoutes", () => {
        test.only("when a route has nested routes, it returns a flattened list", () => {
            // Arrange
            const parentRoute = Factory.build<RouteDefinition>(
                FactoryType.RouteDefinition.Nested
            );
            const routes = [parentRoute];

            // Act
            const result = RouteUtils.getFlattenedRoutes(routes);

            // Assert
            expect(result).toHaveLength(2);
        });

        test("when routes are already in a flattened state, it returns an equivalent array", () => {
            // Arrange
            const routes = Factory.buildList(
                FactoryType.RouteDefinition.Default,
                3
            );

            // Act
            const result = RouteUtils.getFlattenedRoutes(routes);

            // Assert
            expect(result).toHaveLength(routes.length);
            expect(result).toStrictEqual(routes);
        });
    });

    // #endregion getFlattenedRoutes
});
