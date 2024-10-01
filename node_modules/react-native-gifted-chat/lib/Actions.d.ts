import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface ActionsProps {
    options?: {
        [key: string]: () => void;
    };
    optionTintColor?: string;
    icon?: () => ReactNode;
    wrapperStyle?: StyleProp<ViewStyle>;
    iconTextStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPressActionButton?(): void;
}
export declare function Actions({ options, optionTintColor, icon, wrapperStyle, iconTextStyle, onPressActionButton, containerStyle, }: ActionsProps): React.JSX.Element;
export declare namespace Actions {
    var propTypes: {
        options: PropTypes.Requireable<object>;
        optionTintColor: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<(...args: any[]) => any>;
        onPressActionButton: PropTypes.Requireable<(...args: any[]) => any>;
        wrapperStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        containerStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
    };
}
