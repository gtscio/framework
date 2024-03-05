# Class: Comparator

Class to perform comparison operations using comparators.

## Constructors

### constructor

• **new Comparator**(): [`Comparator`](Comparator.md)

#### Returns

[`Comparator`](Comparator.md)

## Methods

### testConditions

▸ **testConditions**\<`T`\>(`entity`, `comparators?`): `boolean`

See if the entity matches the comparators.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name           | Type                                            | Description             |
| :------------- | :---------------------------------------------- | :---------------------- |
| `entity`       | `T`                                             | The entity to test.     |
| `comparators?` | [`IComparator`](../interfaces/IComparator.md)[] | The conditions to test. |

#### Returns

`boolean`

True if the entity matches.

#### Defined in

[utils/comparator.ts:18](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/utils/comparator.ts#L18)
