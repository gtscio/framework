// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */

import { Ed25519 } from "./ed25519";
import { ExtendedGroupElement } from "./edwards25519/extendedGroupElement";
import { ProjectiveGroupElement } from "./edwards25519/projectiveGroupElement";
import { scalarMinimal, scalarReduce } from "./edwards25519/scalar";
import { Sha512 } from "../hashes/sha512";

/**
 * Implementation of Zip215.
 */
export class Zip215 {
	/**
	 * Verify reports whether sig is a valid signature of block by
	 * publicKey, using precisely-specified validation criteria (ZIP 215) suitable
	 * for use in consensus-critical contexts.
	 * @param publicKey The public key for the block.
	 * @param block The block content to validate.
	 * @param sig The signature to verify.
	 * @returns True if the signature is valid.
	 */
	public static verify(publicKey: Uint8Array, block: Uint8Array, sig: Uint8Array): boolean {
		if (!publicKey || publicKey.length !== Ed25519.PUBLIC_KEY_SIZE) {
			return false;
		}

		if (!sig || sig.length !== Ed25519.SIGNATURE_SIZE || (sig[63] & 224) !== 0) {
			return false;
		}

		const A = new ExtendedGroupElement();

		// ZIP215: this works because FromBytes does not check that encodings are canonical.
		if (!A.fromBytes(publicKey)) {
			return false;
		}
		A.X.neg();
		A.T.neg();

		const h = new Sha512();
		h.update(sig.subarray(0, 32));
		h.update(publicKey);
		h.update(block);

		const digest = h.digest();

		const hReduced = new Uint8Array(32);
		scalarReduce(hReduced, digest);

		const r = new Uint8Array(sig.subarray(0, 32));

		const checkR = new ExtendedGroupElement();
		// ZIP215: this works because FromBytes does not check that encodings are canonical.
		if (!checkR.fromBytes(r)) {
			return false;
		}

		const s = new Uint8Array(sig.subarray(32));
		// https://tools.ietf.org/html/rfc8032#section-5.1.7 requires that s be in
		// the range [0, order) in order to prevent signature malleability.
		// ZIP215: This is also required by ZIP215.
		if (!scalarMinimal(s)) {
			return false;
		}

		const rProj = new ProjectiveGroupElement();
		const R = new ExtendedGroupElement();

		rProj.doubleScalarMultiplyVarTime(hReduced, A, s);
		rProj.toExtended(R);

		// ZIP215: We want to check [8](R - R') == 0
		return R.cofactorEqual(checkR);
	}
}
