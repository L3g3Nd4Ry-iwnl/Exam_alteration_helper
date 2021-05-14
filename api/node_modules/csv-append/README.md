## csv-append

Low memory overhead, append-only csv writer.

Abstraction over [csv-write-stream](https://github.com/maxogden/csv-write-stream).

## Install

```sh
  yarn add csv-append
```

## Usage

### Create a new file

```typescript
import csvAppend from "csv-append";
const RELATIVE_PATH_TO_CSV = `./data/output.csv`;
const { append, end } = csvAppend(RELATIVE_PATH_TO_CSV);

append([{ a: 1, b: 2 }, { a: 2, b: 3 }]);
// Or
append({ a: 1, b: 2 });
append({ a: 2, b: 3 });

await end();
console.log(fs.readFileSync(RELATIVE_PATH_TO_CSV, { encoding: "utf8" }));
/* 
a,b
1,2
b,3
*/
```

### Append to file

```typescript
import csvAppend from "csv-append";
const RELATIVE_PATH_TO_CSV = `./data/output.csv`;
const { append, end } = csvAppend(RELATIVE_PATH_TO_CSV, true);

// append([{ a: 1, b: 2 }, { a: 2, b: 3 }]);
// Or
append({ a: 1, b: 2 });
append({ a: 2, b: 3 });

await end();
console.log(fs.readFileSync(RELATIVE_PATH_TO_CSV, { encoding: "utf8" }));
/* 
a,b
1,2
b,3
*/
```

## API

### `csvAppend`

#### Input :

- path: `string` (required)
- appendToFile: `boolean` (optional, default `false`)

#### Output :

```typescript
{
  append: append (👇),
  end: end (👇)
}
```

### `append`

`append` adds an object or an array of objects to the end of the csv file.

#### Input :

- args: `Array<any> | Array<Array<any>>`

#### Output :

void

### `end`

`end` returns a promise that resolves when the csv has been written to the fs.

#### Input :

None

#### Output :

`Promise<void>`
