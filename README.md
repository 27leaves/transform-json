# Transform JSON

> Simple transform JSON object structure

First goal of this node module was to modify the structure of many translation files of [angular-translate](https://github.com/angular-translate/angular-translate). Please note that the values of the input files never change, but the structural information.

## Example

Start with
```
npm install -g transform-json
transform-json --input=input.json --template=template.json --output=output.json
```

Input JSON:
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

Transform JSON:
```
{
  "NAME": ["SETTINGS.SECTION_2.MOO", "NAME"],
  "TRANSLATE_THIS": "TRANSLATION"
}

```

Output JSON:
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
