# Class: GuardError

Class to handle errors which are triggered by data guards.

## Hierarchy

- [`BaseError`](BaseError.md)

  ↳ **`GuardError`**

## Constructors

### constructor

• **new GuardError**(`source`, `message`, `propertyName`, `propertyValue`, `propertyOptions?`): [`GuardError`](GuardError.md)

Create a new instance of GuardError.

#### Parameters

| Name               | Type      | Description                                                      |
| :----------------- | :-------- | :--------------------------------------------------------------- |
| `source`           | `string`  | The source of the error.                                         |
| `message`          | `string`  | The message as a code.                                           |
| `propertyName`     | `string`  | The property which triggered the guard error for the item.       |
| `propertyValue`    | `unknown` | The property value which triggered the guard error for the item. |
| `propertyOptions?` | `string`  | The property options which might be allowed.                     |

#### Returns

[`GuardError`](GuardError.md)

#### Overrides

[BaseError](BaseError.md).[constructor](BaseError.md#constructor)

#### Defined in

[packages/core/src/errors/guardError.ts:24](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/guardError.ts#L24)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[BaseError](BaseError.md).[cause](BaseError.md#cause)

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### inner

• `Optional` **inner**: [`IError`](../interfaces/IError.md)

The inner error if there was one.

#### Inherited from

[BaseError](BaseError.md).[inner](BaseError.md#inner)

#### Defined in

[packages/core/src/errors/baseError.ts:25](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L25)

---

### message

• **message**: `string`

The message for the error.

#### Inherited from

[BaseError](BaseError.md).[message](BaseError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

---

### name

• **name**: `string`

The name for the error.

#### Inherited from

[BaseError](BaseError.md).[name](BaseError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1075

---

### properties

• `Optional` **properties**: `Object`

Any additional information for the error.

#### Index signature

▪ [id: `string`]: `unknown`

#### Inherited from

[BaseError](BaseError.md).[properties](BaseError.md#properties)

#### Defined in

[packages/core/src/errors/baseError.ts:20](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L20)

---

### source

• `Optional` **source**: `string`

The source of the error.

#### Inherited from

[BaseError](BaseError.md).[source](BaseError.md#source)

#### Defined in

[packages/core/src/errors/baseError.ts:15](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L15)

---

### stack

• `Optional` **stack**: `string`

The stack trace for the error.

#### Inherited from

[BaseError](BaseError.md).[stack](BaseError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

---

### CLASS_NAME

▪ `Static` `Readonly` **CLASS_NAME**: `string`

Runtime name for the class.

#### Defined in

[packages/core/src/errors/guardError.ts:14](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/guardError.ts#L14)

## Methods

### toJsonObject

▸ **toJsonObject**(`includeStack?`): [`IError`](../interfaces/IError.md)

Serialize the error to the error model.

#### Parameters

| Name            | Type      | Description                     |
| :-------------- | :-------- | :------------------------------ |
| `includeStack?` | `boolean` | Include the stack in the error. |

#### Returns

[`IError`](../interfaces/IError.md)

The error model.

#### Inherited from

[BaseError](BaseError.md).[toJsonObject](BaseError.md#tojsonobject)

#### Defined in

[packages/core/src/errors/baseError.ts:222](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L222)

---

### expand

▸ **expand**(`errors`): `undefined` \| [`IError`](../interfaces/IError.md)

Expand an error tree.

#### Parameters

| Name     | Type                                                 | Description                   |
| :------- | :--------------------------------------------------- | :---------------------------- |
| `errors` | `undefined` \| [`IError`](../interfaces/IError.md)[] | The list of errors to expand. |

#### Returns

`undefined` \| [`IError`](../interfaces/IError.md)

The first level error.

#### Inherited from

[BaseError](BaseError.md).[expand](BaseError.md#expand)

#### Defined in

[packages/core/src/errors/baseError.ts:133](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L133)

---

### flatten

▸ **flatten**(`err`): [`IError`](../interfaces/IError.md)[]

Flatten an error tree.

#### Parameters

| Name  | Type      | Description         |
| :---- | :-------- | :------------------ |
| `err` | `unknown` | The starting error. |

#### Returns

[`IError`](../interfaces/IError.md)[]

The list of all internal errors.

#### Inherited from

[BaseError](BaseError.md).[flatten](BaseError.md#flatten)

#### Defined in

[packages/core/src/errors/baseError.ts:113](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L113)

---

### fromError

▸ **fromError**(`err`): [`BaseError`](BaseError.md)

Construct an error from an existing one.

#### Parameters

| Name  | Type      | Description        |
| :---- | :-------- | :----------------- |
| `err` | `unknown` | The exising error. |

#### Returns

[`BaseError`](BaseError.md)

The new instance.

#### Inherited from

[BaseError](BaseError.md).[fromError](BaseError.md#fromerror)

#### Defined in

[packages/core/src/errors/baseError.ts:66](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L66)

---

### isErrorCode

▸ **isErrorCode**(`error`, `code`): `boolean`

Test to see if the error has the specified error code.

#### Parameters

| Name    | Type                 | Description            |
| :------ | :------------------- | :--------------------- |
| `error` | `unknown`            | The error to test.     |
| `code`  | `string` \| `RegExp` | The code to check for. |

#### Returns

`boolean`

True if the error has the code.

#### Inherited from

[BaseError](BaseError.md).[isErrorCode](BaseError.md#iserrorcode)

#### Defined in

[packages/core/src/errors/baseError.ts:180](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L180)

---

### isErrorMessage

▸ **isErrorMessage**(`error`, `message`): error is BaseError

Test to see if the error has the specified error message.

#### Parameters

| Name      | Type                 | Description               |
| :-------- | :------------------- | :------------------------ |
| `error`   | `unknown`            | The error to test.        |
| `message` | `string` \| `RegExp` | The message to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Inherited from

[BaseError](BaseError.md).[isErrorMessage](BaseError.md#iserrormessage)

#### Defined in

[packages/core/src/errors/baseError.ts:167](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L167)

---

### isErrorName

▸ **isErrorName**(`error`, `name`): error is BaseError

Test to see if the error has the specified error name.

#### Parameters

| Name    | Type                 | Description            |
| :------ | :------------------- | :--------------------- |
| `error` | `unknown`            | The error to test.     |
| `name`  | `string` \| `RegExp` | The name to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Inherited from

[BaseError](BaseError.md).[isErrorName](BaseError.md#iserrorname)

#### Defined in

[packages/core/src/errors/baseError.ts:154](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L154)

---

### someErrorCode

▸ **someErrorCode**(`error`, `code`): error is BaseError

Test to see if any of the errors or children have the given error code.

#### Parameters

| Name    | Type                 | Description            |
| :------ | :------------------- | :--------------------- |
| `error` | `unknown`            | The error to test.     |
| `code`  | `string` \| `RegExp` | The code to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Inherited from

[BaseError](BaseError.md).[someErrorCode](BaseError.md#someerrorcode)

#### Defined in

[packages/core/src/errors/baseError.ts:213](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L213)

---

### someErrorMessage

▸ **someErrorMessage**(`error`, `message`): error is BaseError

Test to see if any of the errors or children have the given error message.

#### Parameters

| Name      | Type                 | Description               |
| :-------- | :------------------- | :------------------------ |
| `error`   | `unknown`            | The error to test.        |
| `message` | `string` \| `RegExp` | The message to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Inherited from

[BaseError](BaseError.md).[someErrorMessage](BaseError.md#someerrormessage)

#### Defined in

[packages/core/src/errors/baseError.ts:203](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L203)

---

### someErrorName

▸ **someErrorName**(`error`, `name`): error is BaseError

Test to see if any of the errors or children have the given error name.

#### Parameters

| Name    | Type                 | Description            |
| :------ | :------------------- | :--------------------- |
| `error` | `unknown`            | The error to test.     |
| `name`  | `string` \| `RegExp` | The name to check for. |

#### Returns

error is BaseError

True if the error has the name.

#### Inherited from

[BaseError](BaseError.md).[someErrorName](BaseError.md#someerrorname)

#### Defined in

[packages/core/src/errors/baseError.ts:193](https://github.com/gtscio/framework/blob/51767d6/packages/core/src/errors/baseError.ts#L193)
