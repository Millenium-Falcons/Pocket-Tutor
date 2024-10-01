import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import Color from './Color';
import { StylePropType } from './utils';
const { carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue, } = Color;
const styles = StyleSheet.create({
    avatarStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarTransparent: {
        backgroundColor: Color.backgroundTransparent,
    },
    textStyle: {
        color: Color.white,
        fontSize: 16,
        backgroundColor: Color.backgroundTransparent,
        fontWeight: '100',
    },
});
export function GiftedAvatar(props) {
    const avatarNameRef = useRef(undefined);
    const avatarColorRef = useRef(undefined);
    const { user = {
        name: null,
        avatar: null,
    }, avatarStyle = {}, textStyle = {}, onPress, } = props;
    const setAvatarColor = useCallback(() => {
        const userName = user.name || '';
        const name = userName.toUpperCase().split(' ');
        if (name.length === 1)
            avatarNameRef.current = `${name[0].charAt(0)}`;
        else if (name.length > 1)
            avatarNameRef.current = `${name[0].charAt(0)}${name[1].charAt(0)}`;
        else
            avatarNameRef.current = '';
        let sumChars = 0;
        for (let i = 0; i < userName.length; i += 1)
            sumChars += userName.charCodeAt(i);
        // inspired by https://github.com/wbinnssmith/react-user-avatar
        // colors from https://flatuicolors.com/
        const colors = [
            carrot,
            emerald,
            peterRiver,
            wisteria,
            alizarin,
            turquoise,
            midnightBlue,
        ];
        avatarColorRef.current = colors[sumChars % colors.length];
    }, [user.name]);
    const renderAvatar = useCallback(() => {
        switch (typeof user.avatar) {
            case 'function':
                return user.avatar([styles.avatarStyle, avatarStyle]);
            case 'string':
                return (<Image source={{ uri: user.avatar }} style={[styles.avatarStyle, avatarStyle]}/>);
            case 'number':
                return (<Image source={user.avatar} style={[styles.avatarStyle, avatarStyle]}/>);
            default:
                return null;
        }
    }, [user.name, user.avatar, avatarStyle]);
    const renderInitials = useCallback(() => {
        return (<Text style={[styles.textStyle, textStyle]}>
        {avatarNameRef.current}
      </Text>);
    }, [textStyle]);
    const handleOnPress = () => {
        const { onPress, ...rest } = props;
        if (onPress)
            onPress(rest);
    };
    const handleOnLongPress = () => {
        const { onLongPress, ...rest } = props;
        if (onLongPress)
            onLongPress(rest);
    };
    if (!user || (!user.name && !user.avatar))
        // render placeholder
        return (<View style={[
                styles.avatarStyle,
                styles.avatarTransparent,
                avatarStyle,
            ]} accessibilityRole='image'/>);
    if (user.avatar)
        return (<TouchableOpacity disabled={!onPress} onPress={handleOnPress} onLongPress={handleOnLongPress} accessibilityRole='image'>
        {renderAvatar()}
      </TouchableOpacity>);
    setAvatarColor();
    return (<TouchableOpacity disabled={!onPress} onPress={handleOnPress} onLongPress={handleOnLongPress} style={[
            styles.avatarStyle,
            { backgroundColor: avatarColorRef.current },
            avatarStyle,
        ]} accessibilityRole='image'>
      {renderInitials()}
    </TouchableOpacity>);
}
GiftedAvatar.propTypes = {
    user: PropTypes.object,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    avatarStyle: StylePropType,
    textStyle: StylePropType,
};
//# sourceMappingURL=GiftedAvatar.js.map