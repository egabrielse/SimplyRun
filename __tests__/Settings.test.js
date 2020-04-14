import React from 'react';
import ConnectedSettings, {Settings} from '../src/screens/Settings';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

describe("Settings screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedSettings/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})