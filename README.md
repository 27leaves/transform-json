# Transform JSON

> Simple transform JSON object structure

First goal of this node module was to modify the structure of many translation files of [angular-translate](https://github.com/angular-translate/angular-translate). Please note that the values of the input files never change, but the structural information.

## Install

```
npm install -g transform-json
```

## Using in node

```
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

## Using with CLI and external JSON files

```
transform-json-cli --input=input.json --transform=template.json --output=output.json
```

### Example files

input.json:
```
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

transform.json:
```
{
  "NAME": ["SETTINGS.SECTION_2.MOO", "NAME"],
  "TRANSLATE_THIS": "TRANSLATION"
}

```

output.json:
```
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
