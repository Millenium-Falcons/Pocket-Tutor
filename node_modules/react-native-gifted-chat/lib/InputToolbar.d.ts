import PropTypes from 'prop-types';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ComposerProps } from './Composer';
import { SendProps } from './Send';
import { ActionsProps } from './Actions';
import { IMessage } from './Models';
export interface InputToolbarProps<TMessage extends IMessage> {
    options?: {
        [key: string]: () => void;
    };
    optionTintColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    primaryStyle?: StyleProp<ViewStyle>;
    accessoryStyle?: StyleProp<ViewStyle>;
    renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode;
    renderActions?(props: ActionsProps): React.ReactNode;
    renderSend?(props: SendProps<TMessage>): React.ReactNode;
    renderComposer?(props: ComposerProps): React.ReactNode;
    onPressActionButton?(): void;
    icon?: () => React.ReactNode;
    wrapperStyle?: StyleProp<ViewStyle>;
}
export declare function InputToolbar<TMessage extends IMessage = IMessage>(props: InputToolbarProps<TMessage>): React.JSX.Element;
export declare namespace InputToolbar {
    var propTypes: {
        renderAccessory: PropTypes.Requireable<(...args: any[]) => any>;
        renderActions: PropTypes.Requireable<(...args: any[]) => any>;
        renderSend: PropTypes.Requireable<(...args: any[]) => any>;
        renderComposer: PropTypes.Requireable<(...args: any[]) => any>;
        onPressActionButton: PropTypes.Requireable<(...args: any[]) => any>;
        containerStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        primaryStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        accessoryStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
    };
}
