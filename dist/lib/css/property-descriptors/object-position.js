"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectPosition = void 0;
var parser_1 = require("../syntax/parser");
var length_percentage_1 = require("../types/length-percentage");
exports.objectPosition = {
    name: 'object-position',
    initialValue: '50% 50%',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (_context, tokens) {
        var args = parser_1.parseFunctionArgs(tokens)[0];
        var lengthPercentageValues = args.filter(length_percentage_1.isLengthPercentage);
        // 默认值，如果没有提供合法值
        var x = { isPercentage: true, value: 50 };
        var y = { isPercentage: true, value: 50 };
        if (lengthPercentageValues.length > 0) {
            x = {
                isPercentage: lengthPercentageValues[0].type === 16 /* PERCENTAGE_TOKEN */,
                value: lengthPercentageValues[0].number
            };
        }
        if (lengthPercentageValues.length > 1) {
            y = {
                isPercentage: lengthPercentageValues[1].type === 16 /* PERCENTAGE_TOKEN */,
                value: lengthPercentageValues[1].number
            };
        }
        else {
            y = x; // 如果只有一个值，使用相同的值作为 y
        }
        return {
            isPercentage: x.isPercentage && y.isPercentage,
            x: x.value,
            y: y.value
        };
    }
};
//# sourceMappingURL=object-position.js.map