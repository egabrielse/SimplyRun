import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';

const createMockStore = configureStore([])


describe("App screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
                <App/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})