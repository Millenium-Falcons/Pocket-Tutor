import PropTypes from 'prop-types';
import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { QuickRepliesProps } from './QuickReplies';
import { MessageTextProps } from './MessageText';
import { MessageImageProps } from './MessageImage';
import { TimeProps } from './Time';
import { User, IMessage, LeftRightStyle, Reply, Omit, MessageVideoProps, MessageAudioProps } from './Models';
export type RenderMessageImageProps<TMessage extends IMessage> = Omit<BubbleProps<TMessage>, 'containerStyle' | 'wrapperStyle'> & MessageImageProps<TMessage>;
export type RenderMessageVideoProps<TMessage extends IMessage> = Omit<BubbleProps<TMessage>, 'containerStyle' | 'wrapperStyle'> & MessageVideoProps<TMessage>;
export type RenderMessageAudioProps<TMessage extends IMessage> = Omit<BubbleProps<TMessage>, 'containerStyle' | 'wrapperStyle'> & MessageAudioProps<TMessage>;
export type RenderMessageTextProps<TMessage extends IMessage> = Omit<BubbleProps<TMessage>, 'containerStyle' | 'wrapperStyle'> & MessageTextProps<TMessage>;
export interface BubbleProps<TMessage extends IMessage> {
    user?: User;
    touchableProps?: object;
    renderUsernameOnMessage?: boolean;
    isCustomViewBottom?: boolean;
    inverted?: boolean;
    position: 'left' | 'right';
    currentMessage: TMessage;
    nextMessage?: TMessage;
    previousMessage?: TMessage;
    optionTitles?: string[];
    containerStyle?: LeftRightStyle<ViewStyle>;
    wrapperStyle?: LeftRightStyle<ViewStyle>;
    textStyle?: LeftRightStyle<TextStyle>;
    bottomContainerStyle?: LeftRightStyle<ViewStyle>;
    tickStyle?: StyleProp<TextStyle>;
    containerToNextStyle?: LeftRightStyle<ViewStyle>;
    containerToPreviousStyle?: LeftRightStyle<ViewStyle>;
    usernameStyle?: TextStyle;
    quickReplyStyle?: StyleProp<ViewStyle>;
    quickReplyTextStyle?: StyleProp<TextStyle>;
    quickReplyContainerStyle?: StyleProp<ViewStyle>;
    onPress?(context?: unknown, message?: unknown): void;
    onLongPress?(context?: unknown, message?: unknown): void;
    onQuickReply?(replies: Reply[]): void;
    renderMessageImage?(props: RenderMessageImageProps<TMessage>): React.ReactNode;
    renderMessageVideo?(props: RenderMessageVideoProps<TMessage>): React.ReactNode;
    renderMessageAudio?(props: RenderMessageAudioProps<TMessage>): React.ReactNode;
    renderMessageText?(props: RenderMessageTextProps<TMessage>): React.ReactNode;
    renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode;
    renderTime?(timeProps: TimeProps<TMessage>): React.ReactNode;
    renderTicks?(currentMessage: TMessage): React.ReactNode;
    renderUsername?(user?: TMessage['user']): React.ReactNode;
    renderQuickReplySend?(): React.ReactNode;
    renderQuickReplies?(quickReplies: QuickRepliesProps<TMessage>): React.ReactNode;
}
export default class Bubble<TMessage extends IMessage = IMessage> extends React.Component<BubbleProps<TMessage>> {
    static contextType: React.Context<import("./GiftedChatContext").IGiftedChatContext>;
    static defaultProps: {
        touchableProps: {};
        onPress: null;
        onLongPress: null;
        renderMessageImage: null;
        renderMessageVideo: null;
        renderMessageAudio: null;
        renderMessageText: null;
        renderCustomView: null;
        renderUsername: null;
        renderTicks: null;
        renderTime: null;
        renderQuickReplies: null;
        onQuickReply: null;
        position: string;
        currentMessage: {
            text: null;
            createdAt: null;
            image: null;
        };
        nextMessage: {};
        previousMessage: {};
        containerStyle: {};
        wrapperStyle: {};
        bottomContainerStyle: {};
        tickStyle: {};
        usernameStyle: {};
        containerToNextStyle: {};
        containerToPreviousStyle: {};
    };
    static propTypes: {
        user: PropTypes.Validator<object>;
        touchableProps: PropTypes.Requireable<object>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageImage: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageVideo: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageAudio: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageText: PropTypes.Requireable<(...args: any[]) => any>;
        renderCustomView: PropTypes.Requireable<(...args: any[]) => any>;
        isCustomViewBottom: PropTypes.Requireable<boolean>;
        renderUsernameOnMessage: PropTypes.Requireable<boolean>;
        renderUsername: PropTypes.Requireable<(...args: any[]) => any>;
        renderTime: PropTypes.Requireable<(...args: any[]) => any>;
        renderTicks: PropTypes.Requireable<(...args: any[]) => any>;
        renderQuickReplies: PropTypes.Requireable<(...args: any[]) => any>;
        onQuickReply: PropTypes.Requireable<(...args: any[]) => any>;
        position: PropTypes.Requireable<string>;
        optionTitles: PropTypes.Requireable<(string | null | undefined)[]>;
        currentMessage: PropTypes.Requireable<object>;
        nextMessage: PropTypes.Requireable<object>;
        previousMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        }>>;
        wrapperStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        }>>;
        bottomContainerStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        }>>;
        tickStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        usernameStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        containerToNextStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        }>>;
        containerToPreviousStyle: PropTypes.Requireable<PropTypes.InferProps<{
            left: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
            right: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        }>>;
    };
    onPress: () => void;
    onLongPress: () => void;
    styledBubbleToNext(): (StyleProp<ViewStyle> | {
        borderBottomLeftRadius: number;
    } | {
        borderBottomRightRadius: number;
    })[] | null;
    styledBubbleToPrevious(): (StyleProp<ViewStyle> | {
        borderTopLeftRadius: number;
    } | {
        borderTopRightRadius: number;
    })[] | null;
    renderQuickReplies(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderMessageText(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderMessageImage(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderMessageVideo(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderMessageAudio(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderTicks(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderTime(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderUsername(): string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null | undefined;
    renderCustomView(): React.ReactNode;
    renderBubbleContent(): React.JSX.Element;
    render(): React.JSX.Element;
}
