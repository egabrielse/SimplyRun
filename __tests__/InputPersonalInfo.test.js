import React from 'react';
import InputPersonalInfo from '../src/screens/InputPersonalInfo';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';

const createMockStore = configureStore([])

describe("InputPersonalInfo screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <InputPersonalInfo/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})