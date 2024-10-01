import PropTypes from 'prop-types';
import React from 'react';
import { StyleProp, ImageStyle, TextStyle } from 'react-native';
import { User } from './Models';
export interface GiftedAvatarProps {
    user?: User;
    avatarStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
    onPress?: (props: GiftedAvatarProps) => void;
    onLongPress?: (props: GiftedAvatarProps) => void;
}
export declare function GiftedAvatar(props: GiftedAvatarProps): React.JSX.Element;
export declare namespace GiftedAvatar {
    var propTypes: {
        user: PropTypes.Requireable<object>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        avatarStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
        textStyle: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
    };
}
