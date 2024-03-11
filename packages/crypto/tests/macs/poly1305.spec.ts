// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Converter } from "@gtsc/core";
import testVectors from "./poly1305.json";
import { Poly1305 } from "../../src/macs/poly1305";

test("ChaCha20 can run test vectors", () => {
	// Test Vectors https://www.ietf.org/rfc/rfc8439.html#appendix-A
	for (const testVector of testVectors) {
		const hash = new Poly1305(Converter.hexToBytes(testVector.key));

		hash.update(Converter.hexToBytes(testVector.input));
		hash.finish();

		expect(Converter.bytesToHex(hash.digest())).toEqual(testVector.mac);
	}
});
