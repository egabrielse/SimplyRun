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

    describe('functions "_showDialog" and "_hideDialog" ', () => {
        const tree = renderer.create(<Settings />)
        const instance = tree.getInstance()
        test('correctly show the dialog', () => {
            instance._showDialog();
            expect(instance.state).toEqual({
                visible: true,
                password: ""
            })
        })

        test('correctly hide the dialog ', () => {
            instance._hideDialog();
            expect(instance.state).toEqual({
                visible: false,
                password: ""
            })
        })
    })

    describe('Settings Screen  ', () => {

        test('press first button', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Settings store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive().dive().dive();
            component.find("TouchableOpacity").at(0).props().onPress()
            expect(navigation.navigate).toHaveBeenCalled();
        })

        test('press second button', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Settings store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive().dive().dive();
            component.find("TouchableOpacity").at(1).props().onPress()
            expect(navigation.navigate).toHaveBeenCalled();
        })

        test('change TextInput', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Settings store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive().dive().dive();
            component.find("TextInput").props().onChangeText(" ")
            expect(navigation.navigate).not.toHaveBeenCalled();
        })
    })
})