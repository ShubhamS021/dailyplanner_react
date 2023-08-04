import { type Actions } from 'hooks/useBoardStore/interfaces/Actions';
import { type State } from 'hooks/useBoardStore/interfaces/State';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { create as actualCreate } from 'zustand';

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();
const extension = {
    subscribe: vi.fn(() => {
        return () => {};
    }),
    unsubscribe: vi.fn(),
    send: vi.fn(),
    init: vi.fn(),
    error: vi.fn(),
};
const extensionConnector = { connect: vi.fn(() => extension) };
(window as any).__REDUX_DEVTOOLS_EXTENSION__ = extensionConnector;

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = (createState: any) => {
    const store = actualCreate<State & Actions>(createState);
    const initialState = store.getState();
    storeResetFns.add(() => {
        store.setState(initialState, true);
    });
    return store;
};

// Reset all stores after each test run
afterEach(() => {
    act(() => {
        storeResetFns.forEach((resetFn: any) => resetFn());
    });
});

export { create };
