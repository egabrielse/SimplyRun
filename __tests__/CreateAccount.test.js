import React from 'react';
import CreateAccount from '../src/screens/CreateAccount';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';

const createMockStore = configureStore([])

describe("CreateAccount screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <CreateAccount/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
