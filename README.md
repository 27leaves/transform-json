# Transform JSON

> Simple transform JSON object structure. Rename JSON keys with ease.


## Why?
First goal of this node module was to modify and maintain the structure of many
translation files of
[angular-translate](https://github.com/angular-translate/angular-translate).
Please note that the values of the input files never change, but the structural
information.

## Use it in your node project

```
npm install transform-json --save-dev
```

```javascript
var transformJson = require('transform-json');

var input = {
  a: 'some string'
};
var transform = {
  'a': 'b' // renames 'a' to 'b'
};
var output = transformJson(input, transform);
console.log('output: ' + JSON.stringify(output)); // output: {"b":"some string"}
```



## Use it with CLI and external JSON files

```
npm install -g transform-json
transform-json-cli --input=input.json --transform=transform.json --output=output.json
```

### Example files

_input.json:_
```json
{
  "TRANSLATE_THIS": "My Translation",
  "NAME": "My Name",
  "SETTINGS": {
    "SECTION_1": {
      "MOO": "YES"
    }
  }
}
```

_transform.json:_
```json
{
  "NAME": ["SETTINGS.SECTION_2.MOO", "NAME"],
  "TRANSLATE_THIS": "TRANSLATION"
}

```



_output.json:_
```json
{
  "TRANSLATION": "My Translation",
  "NAME": "My Name",
  "SETTINGS": {
    "SECTION_1": {
      "MOO": "YES"
    },
    "SECTION_2": {
      "MOO": "My Name"
    }
  }
}

```


## Transformations
* Basically, a transform describes
```json
{
  "Let's rename this key": "into this key"
}
```

* You can also give an array as value
```json
{
  "Let's rename this key": ["into this key", "and this key"]
}
```

* You also can look into deep objects
```json
{
  "PARTS.PART1": "PARTS.PART2"
}
```
(This works also if you don't have a hierarchy but a key which is exactly `"PARTS.PART1"`)

## Licence
Copyright (c) 2015 Johannes Herrnegger. Licensed under the MIT license.
