// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of comparisons available to comparators.
 */
export enum ComparisonType {
	/**
	 * Equals.
	 */
	Equals = "Equals",

	/**
	 * Not Equals.
	 */
	NotEquals = "NotEquals",

	/**
	 * Greater Than.
	 */
	GreaterThan = "GreaterThan",

	/**
	 * Greater Than Or Equal.
	 */
	GreaterThanOrEqual = "GreaterThanOrEqual",

	/**
	 * Less Than.
	 */
	LessThan = "LessThan",

	/**
	 * Less Than Or Equal.
	 */
	LessThanOrEqual = "LessThanOrEqual",

	/**
	 * Includes.
	 */
	Includes = "Includes",

	/**
	 * Not Includes.
	 */
	NotIncludes = "NotIncludes",

	/**
	 * In operator.
	 */
	In = "In"
}
