// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-bitwise */
/*
	Based on https://github.com/quartzjer/chacha20/blob/master/chacha20.js.
	Implementation of  https://tools.ietf.org/html/rfc8439
*/

import { BitHelper } from "../utils/bitHelper";

/**
 * Implementation of the ChaCha20 cipher.
 */
export class ChaCha20 {
	/**
	 * The input from the key.
	 * @internal
	 */
	private readonly _input: Uint32Array;

	/**
	 * Create a new instance of ChaCha20.
	 * @param key The key.
	 * @param nonce The nonce.
	 * @param counter Counter.
	 */
	constructor(key: Uint8Array, nonce: Uint8Array, counter: number = 0) {
		this._input = new Uint32Array(16);

		// https://www.ietf.org/rfc/rfc8439.html#section-2.3
		this._input[0] = 1634760805;
		this._input[1] = 857760878;
		this._input[2] = 2036477234;
		this._input[3] = 1797285236;
		this._input[4] = BitHelper.u8To32LittleEndian(key, 0);
		this._input[5] = BitHelper.u8To32LittleEndian(key, 4);
		this._input[6] = BitHelper.u8To32LittleEndian(key, 8);
		this._input[7] = BitHelper.u8To32LittleEndian(key, 12);
		this._input[8] = BitHelper.u8To32LittleEndian(key, 16);
		this._input[9] = BitHelper.u8To32LittleEndian(key, 20);
		this._input[10] = BitHelper.u8To32LittleEndian(key, 24);
		this._input[11] = BitHelper.u8To32LittleEndian(key, 28);
		this._input[12] = counter;
		this._input[13] = BitHelper.u8To32LittleEndian(nonce, 0);
		this._input[14] = BitHelper.u8To32LittleEndian(nonce, 4);
		this._input[15] = BitHelper.u8To32LittleEndian(nonce, 8);
	}

	/**
	 * Quarter round.
	 * @param x The 32 bit array.
	 * @param a The a index.
	 * @param b The b index.
	 * @param c The c index.
	 * @param d The d index.
	 * @internal
	 */
	private static quarterRound(x: Uint32Array, a: number, b: number, c: number, d: number): void {
		x[a] += x[b];
		x[d] = BitHelper.rotate(x[d] ^ x[a], 16);
		x[c] += x[d];
		x[b] = BitHelper.rotate(x[b] ^ x[c], 12);
		x[a] += x[b];
		x[d] = BitHelper.rotate(x[d] ^ x[a], 8);
		x[c] += x[d];
		x[b] = BitHelper.rotate(x[b] ^ x[c], 7);
	}

	/**
	 * Encrypt the data.
	 * @param data The source data to encrypt.
	 * @returns The encrypted data.
	 */
	public encrypt(data: Uint8Array): Uint8Array {
		const x = new Uint32Array(16);
		const output = new Uint8Array(64);
		let dPos = 0;
		let i;
		let sPos = 0;
		let len = data.length;
		const dst = new Uint8Array(data.length);

		while (len > 0) {
			for (i = 16; i >= 0; i--) {
				x[i] = this._input[i];
			}
			for (i = 20; i > 0; i -= 2) {
				ChaCha20.quarterRound(x, 0, 4, 8, 12);
				ChaCha20.quarterRound(x, 1, 5, 9, 13);
				ChaCha20.quarterRound(x, 2, 6, 10, 14);
				ChaCha20.quarterRound(x, 3, 7, 11, 15);
				ChaCha20.quarterRound(x, 0, 5, 10, 15);
				ChaCha20.quarterRound(x, 1, 6, 11, 12);
				ChaCha20.quarterRound(x, 2, 7, 8, 13);
				ChaCha20.quarterRound(x, 3, 4, 9, 14);
			}
			for (i = 16; i >= 0; i--) {
				x[i] += this._input[i];
			}
			for (i = 16; i >= 0; i--) {
				BitHelper.u32To8LittleEndian(output, 4 * i, x[i]);
			}

			this._input[12] += 1;
			if (!this._input[12]) {
				this._input[13] += 1;
			}
			if (len <= 64) {
				for (i = len; i >= 0; i--) {
					dst[i + dPos] = data[i + sPos] ^ output[i];
				}
				return dst;
			}
			for (i = 64; i >= 0; i--) {
				dst[i + dPos] = data[i + sPos] ^ output[i];
			}
			len -= 64;
			sPos += 64;
			dPos += 64;
		}

		return dst;
	}

	/**
	 * Decrypt the data.
	 * @param data The source data to decrypt.
	 * @returns The decrypted data.
	 */
	public decrypt(data: Uint8Array): Uint8Array {
		return this.encrypt(data);
	}

	/**
	 * Create a keystream of the given length.
	 * @param length The length to create the keystream.
	 * @returns The keystream.
	 */
	public keyStream(length: number): Uint8Array {
		const dst = new Uint8Array(length);
		for (let i = 0; i < dst.length; i++) {
			dst[i] = 0;
		}
		return this.encrypt(dst);
	}
}
