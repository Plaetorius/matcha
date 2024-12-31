import { MessageDto } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MessageState = {
	messages: MessageDto[];
	unreadCount: number;
	add: (message: MessageDto) => void;
	remove: (id: string) => void;
	set: (messages: MessageDto[]) => void;
	updateUnreadCount: (amount: number) => void;
}

const useMessageStore = create<MessageState>()(devtools((set) => ({
	messages: [],
	unreadCount: 0,
	add: (message) => set(state => ({ messages: [message, ...state.messages] })),
	remove: (id) => set(state => ({ messages: state.messages.filter(message => message.id !== id) })),
	set: (messages) => set({ messages }),
	// updateUnreadCount: (amount: number) => set(state => ({ unreadCount: state.unreadCount + amount }))
	// updateUnreadCount: (amount: number) => set(state => {
	// 	if (state.unreadCount !== state.unreadCount + amount) {
	// 		return { unreadCount: state.unreadCount + amount };
	// 	}
	// 	return state;
	// })
	
}), { name: 'messageStoreDemo' }))

export default useMessageStore;