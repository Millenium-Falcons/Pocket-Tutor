import * as React from 'react';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
export interface IGiftedChatContext {
    actionSheet(): {
        showActionSheetWithOptions: (options: ActionSheetOptions, callback: (buttonIndex?: number) => void | Promise<void>) => void;
    };
    getLocale(): string;
}
export declare const GiftedChatContext: React.Context<IGiftedChatContext>;
export declare const useChatContext: () => IGiftedChatContext;
