import PropTypes from 'prop-types';
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface LoadEarlierProps {
    isLoadingEarlier?: boolean;
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    activityIndicatorStyle?: StyleProp<ViewStyle>;
    activityIndicatorColor?: string;
    activityIndicatorSize?: number | 'small' | 'large';
    onLoadEarlier?(): void;
}
export declare function LoadEarlier({ isLoadingEarlier, onLoadEarlier, label, containerStyle, wrapperStyle, textStyle, activityIndicatorColor, activityIndicatorSize, activityIndicatorStyle, }: LoadEarlierProps): React.ReactElement;
export declare namespace LoadEarlier {
    var propTypes: {
        onLoadEarlier: PropTypes.Requireable<(...args: any[]) => any>;
        isLoadingEarlier: PropTypes.Requireable<boolean>;
        label: PropTypes.Requireable<string>;
        containerStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        wrapperStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        textStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        activityIndicatorStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        activityIndicatorColor: PropTypes.Requireable<string>;
        activityIndicatorSize: PropTypes.Requireable<string>;
    };
}
