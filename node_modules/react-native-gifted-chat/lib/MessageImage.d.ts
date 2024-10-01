import PropTypes from 'prop-types';
import React from 'react';
import { ImageProps, ViewStyle, StyleProp, ImageStyle, ImageURISource } from 'react-native';
import { LightboxProps } from 'react-native-lightbox-v2';
import { IMessage } from './Models';
export interface MessageImageProps<TMessage extends IMessage> {
    currentMessage: TMessage;
    containerStyle?: StyleProp<ViewStyle>;
    imageSourceProps?: Partial<ImageURISource>;
    imageStyle?: StyleProp<ImageStyle>;
    imageProps?: Partial<ImageProps>;
    lightboxProps?: LightboxProps;
}
export declare function MessageImage<TMessage extends IMessage = IMessage>({ containerStyle, lightboxProps, imageProps, imageSourceProps, imageStyle, currentMessage, }: MessageImageProps<TMessage>): React.JSX.Element | null;
export declare namespace MessageImage {
    var propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        imageSourceProps: PropTypes.Requireable<object>;
        imageStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        imageProps: PropTypes.Requireable<object>;
        lightboxProps: PropTypes.Requireable<object>;
    };
}
