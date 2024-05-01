import {clearAuthUser, setAuthUser} from "@/store/user.js";
import {makeStore} from "@/store/index.js";

describe('user slice additional tests', () => {
    let store;

    beforeEach(() => {
        store = makeStore();
    });

    test('default state is correct', () => {
        const state = store.getState();
        expect(state.user.authUser).toEqual({});
    });

    test('handles invalid data for setAuthUser', () => {
        store.dispatch(setAuthUser(undefined));
        const state = store.getState();
        expect(state.user.authUser).toEqual(undefined);
    });

    test('multiple updates are handled correctly', () => {
        const user1 = { name: 'John Doe', email: 'john@example.com' };
        const user2 = { name: 'Jane Doe', email: 'jane@example.com' };
        store.dispatch(setAuthUser(user1));
        store.dispatch(setAuthUser(user2));
        const state = store.getState();
        expect(state.user.authUser).toEqual(user2);
    });

    test('clearAuthUser is idempotent', () => {
        store.dispatch(clearAuthUser());
        const firstState = store.getState();
        store.dispatch(clearAuthUser());
        const secondState = store.getState();
        expect(secondState.user.authUser).toEqual(firstState.user.authUser);
    });
});
