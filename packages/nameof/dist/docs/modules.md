# @gtsc/nameof

## Functions

### nameof

▸ **nameof**\<`T`\>(`property?`, `replaceParent?`): `string`

Placeholder method which substitutes the type name as a string at runtime.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name             | Type      | Description                                                              |
| :--------------- | :-------- | :----------------------------------------------------------------------- |
| `property?`      | `unknown` | The property to get the name of.                                         |
| `replaceParent?` | `string`  | Optional object name to replace the top level object of a property path. |

#### Returns

`string`

The type name as a string.

#### Defined in

[index.ts:11](https://github.com/gtscio/framework/blob/51767d6/packages/nameof/src/index.ts#L11)
