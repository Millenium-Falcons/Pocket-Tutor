import PropTypes from 'prop-types';
import { IMessage } from './Models';
export declare const StylePropType: PropTypes.Requireable<NonNullable<number | boolean | object | null | undefined>>;
export declare function isSameDay(currentMessage: IMessage, diffMessage: IMessage | null | undefined): boolean;
export declare function isSameUser(currentMessage: IMessage, diffMessage: IMessage | null | undefined): boolean;
