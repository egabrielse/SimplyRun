import React from 'react';
import ConnectedUpdateEmailPassword, {updateEmailPassword} from '../src/screens/updateEmailPassword';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

describe("updateEmailPassword screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedUpdateEmailPassword/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})