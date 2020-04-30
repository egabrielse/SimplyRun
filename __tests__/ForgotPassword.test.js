import React from 'react';
import ConnectedForgotPassword, {ForgotPassword} from '../src/screens/ForgotPassword';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

describe("ForgotPassword screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedForgotPassword/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('function "updateEmail', () => {
        it('changes state.email to parameter:"text", and does NOT set state.emailValid to true when text.length is less than 8', () => {
            const tree = renderer.create(<ForgotPassword />)
            const instance = tree.getInstance()
            instance.updateEmail("1234567")
            expect(instance.state).toEqual({
                email:"1234567",
                emailValid:false,
            })
        })
        it('changes state.email to parameter:"text", and sets state.emailValid to true when text.length is equal to or greater than 8', () => {
            const tree = renderer.create(<ForgotPassword />)
            const instance = tree.getInstance()
            instance.updateEmail("12345678")
            expect(instance.state).toEqual({
                email:"12345678",
                emailValid:true,
            })
        })
    })

    describe('InputPersonalInfo Screen  ', () => {

        test('change email ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<ForgotPassword store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("TextInput").props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('send email button ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<ForgotPassword store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })
    })
})
