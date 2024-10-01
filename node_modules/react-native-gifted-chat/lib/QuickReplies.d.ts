import React from 'react';
import PropTypes from 'prop-types';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { IMessage, Reply } from './Models';
export interface QuickRepliesProps<TMessage extends IMessage = IMessage> {
    nextMessage?: TMessage;
    currentMessage: TMessage;
    color?: string;
    sendText?: string;
    quickReplyStyle?: StyleProp<ViewStyle>;
    quickReplyTextStyle?: StyleProp<TextStyle>;
    quickReplyContainerStyle?: StyleProp<ViewStyle>;
    onQuickReply?(reply: Reply[]): void;
    renderQuickReplySend?(): React.ReactNode;
}
export declare function QuickReplies({ currentMessage, nextMessage, color, quickReplyStyle, quickReplyTextStyle, quickReplyContainerStyle, onQuickReply, sendText, renderQuickReplySend, }: QuickRepliesProps<IMessage>): React.JSX.Element | null;
export declare namespace QuickReplies {
    var propTypes: {
        currentMessage: PropTypes.Validator<object>;
        onQuickReply: PropTypes.Requireable<(...args: any[]) => any>;
        color: PropTypes.Requireable<string>;
        sendText: PropTypes.Requireable<string>;
        renderQuickReplySend: PropTypes.Requireable<(...args: any[]) => any>;
        quickReplyStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
    };
}
