// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { ServiceFactory } from "../../src/factories/serviceFactory";
import type { ILogEntry } from "../../src/models/ILogEntry";
import type { IService } from "../../src/models/IService";

/**
 * Test service for validation.
 */
class TestService implements IService {
	/**
	 * Validation property.
	 */
	public foo: number;

	/**
	 * Create a new instance of TestService.
	 */
	constructor() {
		this.foo = 1;
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @returns The response of the bootstrapping as log entries.
	 */
	public async bootstrap(): Promise<ILogEntry[]> {
		return [];
	}
}

describe("ServiceFactory", () => {
	test("register can fail if name is undefined", () => {
		expect(() => ServiceFactory.Instance.register(undefined as never, undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("register can fail if service is undefined", () => {
		expect(() => ServiceFactory.Instance.register("test", undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.function"
			})
		);
	});

	test("get can fail if name is undefined", () => {
		expect(() => ServiceFactory.Instance.get(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("get fail if unknown type", () => {
		expect(() => ServiceFactory.Instance.get("test")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noGet"
			})
		);
	});

	test("register and get can succeed", () => {
		ServiceFactory.Instance.register("test", () => new TestService());
		const t = ServiceFactory.Instance.get<TestService>("test");
		expect(t).toBeDefined();
		if (t) {
			expect(t.foo).toEqual(1);
		}
	});

	test("register and get can succeed and return same instance", () => {
		const testService = new TestService();
		ServiceFactory.Instance.register("test2", () => testService);
		const t2 = ServiceFactory.Instance.get<TestService>("test2");
		if (t2) {
			expect(t2).toBeDefined();
			expect(t2.foo).toEqual(1);
		}
		testService.foo = 2;
		const t2b = ServiceFactory.Instance.get<TestService>("test2");
		if (t2b) {
			expect(t2b.foo).toEqual(2);
		}
	});

	test("unregister can succeed", () => {
		ServiceFactory.Instance.register("test3", () => new TestService());
		const t3 = ServiceFactory.Instance.get<TestService>("test3");
		if (t3) {
			expect(t3.foo).toEqual(1);
		}
		ServiceFactory.Instance.unregister("test3");
		expect(() => ServiceFactory.Instance.get("test3")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noGet"
			})
		);
	});

	test("unregister can fail if name is undefined", () => {
		expect(() => ServiceFactory.Instance.unregister(undefined as never)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string"
			})
		);
	});

	test("unregister can fail with unknown type", () => {
		expect(() => ServiceFactory.Instance.unregister("unknown")).toThrow(
			expect.objectContaining({
				name: "GeneralError",
				message: "factoryInstance.noUnregister"
			})
		);
	});

	test("can reset the factory", () => {
		ServiceFactory.Instance.register("test3", () => new TestService());
		expect(ServiceFactory.Instance.get<TestService>("test3").foo).toEqual(1);
		ServiceFactory.Instance.get<TestService>("test3").foo = 2;
		ServiceFactory.Instance.reset();
		expect(ServiceFactory.Instance.get<TestService>("test3").foo).toEqual(1);
	});
});
