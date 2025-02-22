import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        const userBlockedList = Array.isArray(user.blocked) ? user.blocked : [];
        const currentUserBlockedList = Array.isArray(currentUser.blocked) ? currentUser.blocked : [];


        // CHECK IF CURRENT USER BLOCKED
        if (userBlockedList.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // CHECK IF RECEIVER BLOCKED
        else if (currentUserBlockedList.includes(user.id)) {
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });
        }

    },

    changeBlock: () => {
        set((state) => ({ ...state, isReceiverBlocked: !state.isCurrentUserBlocked }));
    },
}));
