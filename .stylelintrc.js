module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        "indentation": [2],
        "no-missing-end-of-source-newline": [true, { "severity": "warning"  }],
        "color-hex-length": ["short", { "severity": "warning"  }],
        "function-calc-no-invalid": null,
        "no-descending-specificity": null,
        "no-duplicate-selectors": null,
        "font-family-no-missing-generic-family-keyword": null,
    }
};