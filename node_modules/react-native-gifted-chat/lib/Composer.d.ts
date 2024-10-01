import React from 'react';
import PropTypes from 'prop-types';
import { TextInputProps } from 'react-native';
export interface ComposerProps {
    composerHeight?: number;
    text?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    textInputProps?: Partial<TextInputProps>;
    textInputStyle?: TextInputProps['style'];
    textInputAutoFocus?: boolean;
    keyboardAppearance?: TextInputProps['keyboardAppearance'];
    multiline?: boolean;
    disableComposer?: boolean;
    onTextChanged?(text: string): void;
    onInputSizeChanged?(layout: {
        width: number;
        height: number;
    }): void;
}
export declare function Composer({ composerHeight, disableComposer, keyboardAppearance, multiline, onInputSizeChanged, onTextChanged, placeholder, placeholderTextColor, text, textInputAutoFocus, textInputProps, textInputStyle, }: ComposerProps): React.ReactElement;
export declare namespace Composer {
    var propTypes: {
        composerHeight: PropTypes.Requireable<number>;
        text: PropTypes.Requireable<string>;
        placeholder: PropTypes.Requireable<string>;
        placeholderTextColor: PropTypes.Requireable<string>;
        textInputProps: PropTypes.Requireable<object>;
        onTextChanged: PropTypes.Requireable<(...args: any[]) => any>;
        onInputSizeChanged: PropTypes.Requireable<(...args: any[]) => any>;
        multiline: PropTypes.Requireable<boolean>;
        disableComposer: PropTypes.Requireable<boolean>;
        textInputStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        textInputAutoFocus: PropTypes.Requireable<boolean>;
        keyboardAppearance: PropTypes.Requireable<string>;
    };
}
