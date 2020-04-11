import React from 'react';
import Login from '../src/screens/Login';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';

const createMockStore = configureStore([])


describe("Login screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <Login/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
