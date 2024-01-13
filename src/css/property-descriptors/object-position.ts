import {PropertyDescriptorParsingType, IPropertyListDescriptor} from '../IPropertyDescriptor';
import {CSSValue, parseFunctionArgs} from '../syntax/parser';
import {isLengthPercentage} from '../types/length-percentage';
import {Context} from '../../core/context';
import {TokenType} from "../syntax/tokenizer";
// export type ObjectPosition = LengthPercentageTuple;


export type ObjectPosition = {
    isPercentage: boolean;
    x: number;
    y: number;
};

export const objectPosition: IPropertyListDescriptor<ObjectPosition> = {
    name: 'object-position',
    initialValue: '50% 50%',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: (_context: Context, tokens: CSSValue[]): ObjectPosition => {
        const args = parseFunctionArgs(tokens)[0];
        const lengthPercentageValues = args.filter(isLengthPercentage);

        // 默认值，如果没有提供合法值
        let x = {isPercentage: true, value: 50};
        let y = {isPercentage: true, value: 50};

        if (lengthPercentageValues.length > 0) {
            x = {
                isPercentage: lengthPercentageValues[0].type === TokenType.PERCENTAGE_TOKEN,
                value: lengthPercentageValues[0].number
            };
        }

        if (lengthPercentageValues.length > 1) {
            y = {
                isPercentage: lengthPercentageValues[1].type === TokenType.PERCENTAGE_TOKEN,
                value: lengthPercentageValues[1].number
            };
        } else {
            y = x; // 如果只有一个值，使用相同的值作为 y
        }

        return {
            isPercentage: x.isPercentage && y.isPercentage,
            x: x.value,
            y: y.value
        };
    }
};
