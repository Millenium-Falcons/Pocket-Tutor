import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Composer } from './Composer';
import { Send } from './Send';
import { Actions } from './Actions';
import Color from './Color';
import { StylePropType } from './utils';
export function InputToolbar(props) {
    const { renderActions, onPressActionButton, renderComposer, renderSend, renderAccessory, options, optionTintColor, icon, wrapperStyle, containerStyle, } = props;
    const actionsFragment = useMemo(() => {
        const props = {
            options,
            optionTintColor,
            icon,
            wrapperStyle,
            containerStyle,
        };
        return (renderActions?.(props) || (onPressActionButton && <Actions {...props}/>));
    }, [
        renderActions,
        onPressActionButton,
        options,
        optionTintColor,
        icon,
        wrapperStyle,
        containerStyle,
    ]);
    const composerFragment = useMemo(() => {
        return (renderComposer?.(props) || (<Composer {...props}/>));
    }, [renderComposer, props]);
    return (<View style={[styles.container, containerStyle]}>
      <View style={[styles.primary, props.primaryStyle]}>
        {actionsFragment}
        {composerFragment}
        {renderSend?.(props) || <Send {...props}/>}
      </View>
      {renderAccessory && (<View style={[styles.accessory, props.accessoryStyle]}>
          {renderAccessory(props)}
        </View>)}
    </View>);
}
InputToolbar.propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: StylePropType,
    primaryStyle: StylePropType,
    accessoryStyle: StylePropType,
};
const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Color.defaultColor,
        backgroundColor: Color.white,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
});
//# sourceMappingURL=InputToolbar.js.map