const ideaDraculaTheme = {
    "type": "dark",
    "colors": {
        "list.dropBackground": "#383b3d",
        "editor.foreground": "#d4d4d4",
        "editor.background": "#212122",
        "sideBar.background": "#1e1e1f",
        "editor.lineHighlightBackground": "#2A2A2B",
        "editor.inactiveSelectionBackground": "#3a3d41",
        "editor.selectionHighlightBackground": "#add6ff26",
        "editorIndentGuide.background": "#404040"
    },
    "tokenColors": [
        {
            "scope": "emphasis",
            "settings": {
                "fontStyle": "italic"
            }
        },
        {
            "scope": "strong",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "scope": "header",
            "settings": {
                "foreground": "#000080"
            }
        },
        {
            "scope": "comment",
            "settings": {
                "foreground": "#808080"
            }
        },
        {
            "scope": "constant.language",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "scope": [
                "constant.numeric"
            ],
            "settings": {
                "foreground": "#6897BB"
            }
        },
        {
            "scope": "constant.regexp",
            "settings": {
                "foreground": "#646695"
            }
        },
        {
            "scope": "entity.name.tag",
            "settings": {
                "foreground": "#FFC66D"
            }
        },
        {
            "scope": "entity.name.tag.css",
            "settings": {
                "foreground": "#d7ba7d"
            }
        },
        {
            "scope": "entity.other.attribute-name",
            "settings": {
                "foreground": "#BABABA"
            }
        },
        {
            "scope": [
                "entity.other.attribute-name.class.css",
                "entity.other.attribute-name.class.mixin.css",
                "entity.other.attribute-name.id.css",
                "entity.other.attribute-name.parent-selector.css",
                "entity.other.attribute-name.pseudo-class.css",
                "entity.other.attribute-name.pseudo-element.css",
                "source.css.less entity.other.attribute-name.id",
                "entity.other.attribute-name.attribute.scss",
                "entity.other.attribute-name.scss"
            ],
            "settings": {
                "foreground": "#d7ba7d"
            }
        },
        {
            "scope": "invalid",
            "settings": {
                "foreground": "#f44747"
            }
        },
        {
            "scope": "markup.underline",
            "settings": {
                "fontStyle": "underline"
            }
        },
        {
            "scope": "markup.bold",
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": "markup.heading",
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": "markup.italic",
            "settings": {
                "fontStyle": "italic"
            }
        },
        {
            "scope": "markup.inserted",
            "settings": {
                "foreground": "#b5cea8"
            }
        },
        {
            "scope": "markup.deleted",
            "settings": {
                "foreground": "#ce9178"
            }
        },
        {
            "scope": "markup.changed",
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": "beginning.punctuation.definition.quote.markdown",
            "settings": {
                "foreground": "#608b4e"
            }
        },
        {
            "scope": "beginning.punctuation.definition.list.markdown",
            "settings": {
                "foreground": "#6796e6"
            }
        },
        {
            "scope": "markup.inline.raw",
            "settings": {
                "foreground": "#ce9178"
            }
        },
        {
            "scope": "meta.selector",
            "settings": {
                "foreground": "#d7ba7d"
            }
        },
        {
            "name": "brackets of XML/HTML tags",
            "scope": "punctuation.definition.tag",
            "settings": {
                "foreground": "#FFC66D"
            }
        },
        {
            "scope": "meta.preprocessor",
            "settings": {
                "foreground": "#CC7832"
            }
        },
        {
            "scope": "meta.preprocessor.string",
            "settings": {
                "foreground": "#ce9178"
            }
        },
        {
            "scope": "meta.preprocessor.numeric",
            "settings": {
                "foreground": "#b5cea8"
            }
        },
        {
            "scope": "meta.structure.dictionary.key.python",
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "scope": "meta.diff.header",
            "settings": {
                "foreground": "#CC7832"
            }
        },
        {
            "scope": "storage",
            "settings": {
                "foreground": "red"
            }
        },
        {
            "scope": "storage.type",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "scope": [
                "keyword.other.phpdoc.php",
                "keyword.other.type.php",
                "storage.type.class.jsdoc",
                "entity.name.type.instance.jsdoc",
                "variable.other.jsdoc"
            ],
            "settings": {
                "foreground": "#808080"
            }
        },
        {
            "scope": "storage.modifier",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "scope": "string",
            "settings": {
                "foreground": "#6A8759"
            }
        },
        {
            "scope": "string.tag",
            "settings": {
                "foreground": "#6A8759"
            }
        },
        {
            "scope": "string.value",
            "settings": {
                "foreground": "#6A8759"
            }
        },
        {
            "scope": "string.regexp",
            "settings": {
                "foreground": "#6A8759"
            }
        },
        {
            "name": "JavaScript string interpolation ${}",
            "scope": [
                "punctuation.definition.template-expression.begin.js",
                "punctuation.definition.template-expression.begin.ts",
                "punctuation.definition.template-expression.end.ts",
                "punctuation.definition.template-expression.end.js"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": [
                "support.type.vendored.property-name",
                "support.type.property-name",
                "variable.css",
                "variable.scss",
                "variable.other.less"
            ],
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "scope": [
                "variable.other.property",
                "support.variable.property.dom",
                "entity.other.inherited-class"
            ],
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "scope": [
                "variable.other.object",
                "variable.other.object.property",
                "support.class.dom",
                "meta.function-call",
                "entity.name.type.module"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": [
                "variable.other.readwrite",
                "variable.other.constant.ts",
                "variable.parameter",
                "variable.other.readwrite.alias"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": "keyword",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "scope": "keyword.control",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "scope": "keyword.operator",
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": [
                "keyword.operator.new",
                "keyword.operator.expression",
                "keyword.operator.cast",
                "keyword.operator.sizeof",
                "keyword.operator.logical.python"
            ],
            "settings": {
                "foreground": "#CC7832"
            }
        },
        {
            "scope": "keyword.other.unit",
            "settings": {
                "foreground": "#b5cea8"
            }
        },
        {
            "scope": [
                "punctuation.section.embedded.begin.metatag.php",
                "punctuation.section.embedded.end.metatag.php"
            ],
            "settings": {
                "foreground": "#CC7832"
            }
        },
        {
            "scope": "support.function.git-rebase",
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "scope": "constant.sha.git-rebase",
            "settings": {
                "foreground": "#b5cea8"
            }
        },
        {
            "name": "coloring of the Java import and package identifiers",
            "scope": [
                "storage.modifier.import.java",
                "storage.modifier.package.java"
            ],
            "settings": {
                "foreground": "#d4d4d4"
            }
        },
        {
            "name": "this.self",
            "scope": "variable.language",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "name": "Source Python",
            "scope": [
                "source.python"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "name": "Magic function python",
            "scope": [
                "support.function.magic.python"
            ],
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "name": "Self keyword python",
            "scope": [
                "variable.language.special.self.python",
                "variable.parameter.function.language.special.self.python"
            ],
            "settings": {
                "foreground": "#9876AA",
                "fontStyle": ""
            }
        },
        {
            "name": "Function declarations Python",
            "scope": [
                "entity.name.function.python",
                "meta.function-call.generic.python"
            ],
            "settings": {
                "foreground": "#FFC66D"
            }
        },
        {
            "name": "Function declarations",
            "scope": [
                "entity.name.function",
                "support.function",
                "support.constant.handlebars"
            ],
            "settings": {
                "foreground": "#FFC66D"
            }
        },
        {
            "name": "Types declaration and references",
            "scope": [
                "meta.return-type",
                "support.class",
                "support.type",
                "entity.name.type",
                "entity.name.class",
                "storage.type.cs",
                "storage.type.generic.cs",
                "storage.type.modifier.cs",
                "storage.type.variable.cs",
                "storage.type.annotation.java",
                "storage.type.generic.java",
                "storage.type.java",
                "storage.type.object.array.java",
                "storage.type.primitive.array.java",
                "storage.type.primitive.java",
                "storage.type.token.java",
                "storage.type.groovy",
                "storage.type.annotation.groovy",
                "storage.type.parameters.groovy",
                "storage.type.generic.groovy",
                "storage.type.object.array.groovy",
                "storage.type.primitive.array.groovy",
                "storage.type.primitive.groovy"
            ],
            "settings": {
                "foreground": "#4EC9B0"
            }
        },
        {
            "name": "Types declaration and references",
            "scope": [
                "support.class",
                "entity.name.class",
                "support.type",
                "entity.name.type"
            ],
            "settings": {
                "foreground": "#FFC66D"
            }
        },
        {
            "name": "Arrow Function",
            "scope": [
                "storage.type.function.arrow"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "name": "Types declaration and references, TS grammar specific",
            "scope": [
                "meta.type.cast.expr",
                "meta.type.new.expr",
                "support.constant.math",
                "support.constant.dom",
                "support.constant.json"
            ],
            "settings": {
                "foreground": "#4EC9B0"
            }
        },
        {
            "name": "Control flow keywords",
            "scope": "keyword.control",
            "settings": {
                "foreground": "#CC7832",
                "fontStyle": "bold"
            }
        },
        {
            "name": "Variable and parameter name",
            "scope": [
                "meta.definition.variable.name",
                "support.variable"
            ],
            "settings": {
                "foreground": "#A9B7C6"
            }
        },
        {
            "scope": [
                "variable"
            ],
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "name": "Object keys, TS grammar specific",
            "scope": [
                "meta.object-literal.key",
                "meta.object-literal.key entity.name.function"
            ],
            "settings": {
                "foreground": "#9876AA"
            }
        },
        {
            "name": "CSS property value",
            "scope": [
                "support.constant.property-value",
                "support.constant.font-name",
                "support.constant.media-type",
                "support.constant.media",
                "constant.other.color.rgb-value",
                "constant.other.rgb-value",
                "support.constant.color"
            ],
            "settings": {
                "foreground": "#CE9178"
            }
        },
        {
            "scope": "token.info-token",
            "settings": {
                "foreground": "#6796e6"
            }
        },
        {
            "scope": "token.warn-token",
            "settings": {
                "foreground": "#cd9731"
            }
        },
        {
            "scope": "token.error-token",
            "settings": {
                "foreground": "#f44747"
            }
        },
        {
            "scope": "token.debug-token",
            "settings": {
                "foreground": "#b267e6"
            }
        }
    ]
};

const ideaLightTheme = {
    "name": "IDEA Intellij light theme",
    "type": "light",
    "colors": {
        "editor.background": "#ffffff",
        "editor.foreground": "#000000",
        "tab.inactiveBackground": "#d4d4d4",
        "tab.inactiveForeground": "#333333",
        "tab.activeBorder": "#c0c0c0",
        "tab.border": "#c0c0c0",
        "sideBar.background": "#ffffff",
        "sideBar.foreground": "#000000",
        "sideBar.border": "#c0c0c0",
        "sideBarSectionHeader.background": "#d4d4d4",
        "editorGutter.background": "#f0f0f0",
        "editorLineNumber.foreground": "#c1c1c1",
        "editor.lineHighlightBackground": "#fffae3",
        "editor.selectionHighlightBackground": "#F6EBBC",
        "activityBar.background": "#f2f2f2",
        "activityBar.foreground": "#000000",
        "activityBar.border": "#bcbcbc",
        "statusBar.background": "#f2f2f2",
        "statusBar.foreground": "#000000",
        "statusBar.border": "#c0c0c0"
    },
    "tokenColors": [
        {
            "settings": {
                "foreground": "#333333ff",
                "background": "#f5f5f5ff"
            }
        },
        {
            "name": "Comments",
            "scope": [
                "comment",
                "punctuation.definition.comment"
            ],
            "settings": {
                "fontStyle": "italic",
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "Comments: Preprocessor",
            "scope": "comment.block.preprocessor",
            "settings": {
                "fontStyle": "",
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "Comments: Documentation",
            "scope": [
                "comment.documentation",
                "comment.block.documentation"
            ],
            "settings": {
                "foreground": "#095e09"
            }
        },
        {
            "name": "Invalid - Deprecated",
            "scope": "invalid.deprecated",
            "settings": {
                "background": "#96000014"
            }
        },
        {
            "name": "Invalid - Illegal",
            "scope": "invalid.illegal",
            "settings": {
                "background": "#96000014",
                "foreground": "#ff0000"
            }
        },
        {
            "name": "Operators",
            "scope": "keyword.operator",
            "settings": {
                "foreground": "#777777"
            }
        },
        {
            "name": "Keywords",
            "scope": [
                "keyword",
                "storage"
            ],
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "Types",
            "scope": [
                "storage.type",
                "support.type"
            ],
            "settings": {
                "foreground": "#000000",
                "fontStyle": ""
            }
        },
        {
            "name": "Language Constants",
            "scope": [
                "constant.language",
                "support.constant",
                "variable.language"
            ],
            "settings": {
                "foreground": "#000088"
            }
        },
        {
            "name": "Variables",
            "scope": [
                "variable",
                "support.variable"
            ],
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": "bold"
            }
        },
        {
            "name": "Functions",
            "scope": [
                "entity.name.function",
                "support.function"
            ],
            "settings": {
                "foreground": "#000000"
            }
        },
        {
            "name": "Classes",
            "scope": [
                "entity.name.type",
                "entity.other.inherited-class",
                "support.class"
            ],
            "settings": {
                "foreground": "#000000"
            }
        },
        {
            "name": "Exceptions",
            "scope": "entity.name.exception",
            "settings": {
                "foreground": "#660000"
            }
        },
        {
            "name": "Sections",
            "scope": "entity.name.section",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "name": "Numbers, Characters",
            "scope": [
                "constant.numeric",
                "constant.character",
                "constant"
            ],
            "settings": {
                "foreground": "#000088"
            }
        },
        {
            "name": "Strings",
            "scope": "string",
            "settings": {
                "foreground": "#095e09",
                "fontStyle": "bold"
            }
        },
        {
            "name": "Strings: Escape Sequences",
            "scope": "constant.character.escape",
            "settings": {
                "foreground": "#777777"
            }
        },
        {
            "name": "Strings: Regular Expressions",
            "scope": "string.regexp",
            "settings": {
                "foreground": "#0531d0"
            }
        },
        {
            "name": "Strings: Symbols",
            "scope": "constant.other.symbol",
            "settings": {
                "foreground": "#AB6526"
            }
        },
        {
            "name": "Punctuation",
            "scope": "punctuation",
            "settings": {
                "foreground": "#777777"
            }
        },
        {
            "name": "Embedded Source",
            "scope": [
                "string source",
                "text source"
            ],
            "settings": {
                "foreground": "#000000"
            }
        },
        {
            "name": "HTML: Doctype Declaration",
            "scope": [
                "meta.tag.sgml.doctype",
                "meta.tag.sgml.doctype string",
                "meta.tag.sgml.doctype entity.name.tag",
                "meta.tag.sgml punctuation.definition.tag.html"
            ],
            "settings": {
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "HTML: Tags",
            "scope": [
                "meta.tag",
                "punctuation.definition.tag.html",
                "punctuation.definition.tag.begin.html",
                "punctuation.definition.tag.end.html"
            ],
            "settings": {
                "foreground": "#2E2A2E"
            }
        },
        {
            "name": "HTML: Tag Names",
            "scope": "entity.name.tag",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "HTML: Attribute Names",
            "scope": [
                "meta.tag entity.other.attribute-name",
                "entity.other.attribute-name.html"
            ],
            "settings": {
                "foreground": "#0531d0"
            }
        },
        {
            "name": "HTML: Attribute Values",
            "scope": "string.quoted.double.html",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "HTML: Css styles in html tags",
            "scope": "source.css",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "HTML: Entities",
            "scope": [
                "constant.character.entity",
                "punctuation.definition.entity"
            ],
            "settings": {
                "foreground": "#AB6526"
            }
        },
        {
            "name": "CSS: Selectors",
            "scope": [
                "meta.selector",
                "meta.selector entity",
                "meta.selector entity punctuation",
                "entity.name.tag.css"
            ],
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "CSS: Property Names",
            "scope": [
                "meta.property-name",
                "support.type.property-name"
            ],
            "settings": {
                "foreground": "#000088"
            }
        },
        {
            "name": "CSS: Property Values",
            "scope": [
                "meta.property-value",
                "meta.property-value constant.other",
                "support.constant.property-value"
            ],
            "settings": {
                "foreground": "#095e09"
            }
        },
        {
            "name": "CSS: Important Keyword",
            "scope": "keyword.other.important",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "name": "keyword.other.unit.px.css",
            "scope": "keyword.other.unit.px.css",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "Markup: Changed",
            "scope": "markup.changed",
            "settings": {
                "background": "#FFFFDD",
                "foreground": "#000000"
            }
        },
        {
            "name": "Markup: Deletion",
            "scope": "markup.deleted",
            "settings": {
                "background": "#FFDDDD",
                "foreground": "#000000"
            }
        },
        {
            "name": "Markup: Emphasis",
            "scope": "markup.italic",
            "settings": {
                "fontStyle": "italic"
            }
        },
        {
            "name": "Markup: Error",
            "scope": "markup.error",
            "settings": {
                "background": "#96000014",
                "foreground": "#660000"
            }
        },
        {
            "name": "Markup: Insertion",
            "scope": "markup.inserted",
            "settings": {
                "background": "#DDFFDD",
                "foreground": "#000000"
            }
        },
        {
            "name": "Markup: Link",
            "scope": "meta.link",
            "settings": {
                "foreground": "#0531d0"
            }
        },
        {
            "name": "Markup: Output",
            "scope": [
                "markup.output",
                "markup.raw"
            ],
            "settings": {
                "foreground": "#777777"
            }
        },
        {
            "name": "Markup: Prompt",
            "scope": "markup.prompt",
            "settings": {
                "foreground": "#777777"
            }
        },
        {
            "name": "Markup: Heading",
            "scope": "markup.heading",
            "settings": {
                "foreground": "#AA3731"
            }
        },
        {
            "name": "Markup: Strong",
            "scope": "markup.bold",
            "settings": {
                "fontStyle": "bold"
            }
        },
        {
            "name": "Markup: Traceback",
            "scope": "markup.traceback",
            "settings": {
                "foreground": "#660000"
            }
        },
        {
            "name": "Markup: Underline",
            "scope": "markup.underline",
            "settings": {
                "fontStyle": "underline"
            }
        },
        {
            "name": "Markup Quote",
            "scope": "markup.quote",
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "Markup Lists",
            "scope": "markup.list",
            "settings": {
                "foreground": "#0531d0"
            }
        },
        {
            "name": "Markup Styling",
            "scope": [
                "markup.bold",
                "markup.italic"
            ],
            "settings": {
                "foreground": "#095e09"
            }
        },
        {
            "name": "Markup Inline",
            "scope": "markup.inline.raw",
            "settings": {
                "fontStyle": "",
                "foreground": "#AB6526"
            }
        },
        {
            "name": "Extra: Diff Range",
            "scope": [
                "meta.diff.range",
                "meta.diff.index",
                "meta.separator"
            ],
            "settings": {
                "background": "#DDDDFF",
                "foreground": "#434343"
            }
        },
        {
            "name": "Extra: Diff From",
            "scope": "meta.diff.header.from-file",
            "settings": {
                "background": "#FFDDDD",
                "foreground": "#434343"
            }
        },
        {
            "name": "Extra: Diff To",
            "scope": "meta.diff.header.to-file",
            "settings": {
                "background": "#DDFFDD",
                "foreground": "#434343"
            }
        },
        {
            "name": "Object keys, TS grammar specific",
            "scope": [
                "meta.object-literal.key",
                "meta.object-literal.key entity.name.function"
            ],
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": "bold"
            }
        },
        {
            "name": "this.self",
            "scope": "variable.language",
            "settings": {
                "foreground": "#0042B6",
                "fontStyle": "bold"
            }
        },
        {
            "name": "variable other object js",
            "scope": "variable.other.object.js",
            "settings": {
                "foreground": "#326d6e",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.object.property.js",
            "scope": "variable.other.object.property.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.readwrite.js",
            "scope": "variable.other.readwrite.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.property.js",
            "scope": "variable.other.property.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "string.quoted.double.js",
            "scope": "string.quoted.double.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "string.quoted.single.js",
            "scope": "string.quoted.single.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "entity.name.function.js",
            "scope": [
                "support.class.console.js",
                "meta.function-call.js",
                "meta.block.js",
                "meta.function.expression.js",
                "meta.block.js",
                "meta.method.declaration.js",
                "meta.objectliteral.js"
            ],
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "meta.object-literal.key.js",
            "scope": "meta.object-literal.key.js",
            "settings": {
                "fontStyle": ""
            }
        },
        {
            "name": "meta.object-literal.key.js entity.name.function.js",
            "scope": "meta.object-literal.key.js entity.name.function",
            "settings": {
                "foreground": "#696539",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.parameter.js",
            "scope": "variable.parameter.js",
            "settings": {
                "foreground": "#000000",
                "fontStyle": ""
            }
        },
        {
            "name": "keyword.operator.expression.delete.js",
            "scope": "keyword.operator.expression.delete.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": ""
            }
        },
        {
            "name": "constant.language ",
            "scope": "constant.language ",
            "settings": {
                "foreground": "#000088",
                "fontStyle": ""
            }
        },
        {
            "name": "entity.name.function.js",
            "scope": "entity.name.function.js",
            "settings": {
                "foreground": "#696539"
            }
        },
        {
            "name": "storage.type.function.js",
            "scope": "storage.type.function.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.js",
            "scope": "storage.type.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "variable.language.this.js",
            "scope": "variable.language.this.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "support.class.component.js",
            "scope": "support.class.component.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.class.js",
            "scope": "storage.type.class.js",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "variable.other.readwrite.alias.js.jsx",
            "scope": "variable.other.readwrite.alias.js.jsx",
            "settings": {
                "foreground": "#000000",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.readwrite.alias.ts",
            "scope": "variable.other.readwrite.alias.ts",
            "settings": {
                "foreground": "#000000",
                "fontStyle": ""
            }
        },
        {
            "name": "entity.name.function.ts",
            "scope": "entity.name.function.ts",
            "settings": {
                "foreground": "#696539",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.language.this.ts",
            "scope": "variable.language.this.ts",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "meta.object-literal.key.ts",
            "scope": "meta.object-literal.key.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.object.property.ts",
            "scope": "variable.object.property.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.parameter.ts",
            "scope": "variable.parameter.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.object.property.ts",
            "scope": "variable.other.object.property.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.property.ts",
            "scope": "variable.other.property.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.object.ts",
            "scope": "variable.other.object.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "variable.other.readwrite.ts",
            "scope": "variable.other.readwrite.ts",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": ""
            }
        },
        {
            "name": "storage.type.function.ts",
            "scope": "storage.type.function.ts",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.class.ts",
            "scope": "storage.type.class.ts",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.ts",
            "scope": "storage.type.ts",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "string.quoted.single.ts",
            "scope": "string.quoted.single.ts",
            "settings": {
                "foreground": "#095e09",
                "fontStyle": ""
            }
        },
        {
            "name": "punctuation.section.embedded.begin.php",
            "scope": "punctuation.section.embedded.begin.php",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "variable.language.this.php",
            "scope": "variable.language.this.php",
            "settings": {
                "foreground": "#696539",
                "fontStyle": "bold"
            }
        },
        {
            "name": "variable.other.php",
            "scope": "variable.other.php",
            "settings": {
                "foreground": "#696539",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.function.php",
            "scope": "storage.type.function.php",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "storage.type.class.php",
            "scope": "storage.type.class.php",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "comment.block.documentation.phpdoc.php",
            "scope": "comment.block.documentation.phpdoc.php",
            "settings": {
                "fontStyle": "",
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "comment.block.documentation.phpdoc.php",
            "scope": "comment.block.documentation.phpdoc.php support.class",
            "settings": {
                "fontStyle": "",
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "keyword.other.phpdoc.php",
            "scope": "keyword.other.phpdoc.php",
            "settings": {
                "fontStyle": "",
                "foreground": "#AAAAAA"
            }
        },
        {
            "name": "storage.type.function.python",
            "scope": "storage.type.function.python",
            "settings": {
                "foreground": "#000088",
                "fontStyle": "bold"
            }
        },
        {
            "name": "entity.name.function.python",
            "scope": "entity.name.function.python",
            "settings": {
                "foreground": "#696539"
            }
        },
        {
            "name": "source.python",
            "scope": "source.python",
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "keyword.operator.logical.python",
            "scope": "keyword.operator.logical.python",
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "entity.name.function.ruby",
            "scope": "entity.name.function.ruby",
            "settings": {
                "foreground": "#696539"
            }
        },
        {
            "name": "source.ruby",
            "scope": "source.ruby",
            "settings": {
                "foreground": "#4d154d"
            }
        },
        {
            "name": "support.function.kernel.ruby",
            "scope": "support.function.kernel.ruby",
            "settings": {
                "foreground": "#326d6e",
                "fontStyle": "bold"
            }
        },
        {
            "name": "entity.name.type.class.ruby",
            "scope": "entity.name.type.class.ruby",
            "settings": {
                "foreground": "#4d154d",
                "fontStyle": "bold"
            }
        }
    ]
};

export {
    ideaDraculaTheme,
    ideaLightTheme,
};
