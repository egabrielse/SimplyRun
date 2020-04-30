import React from 'react';
import ConnectedLogin, {Login} from '../src/screens/Login';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Alert } from 'react-native';

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

describe("Login screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedLogin/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('function "updateEmail', () => {
        it('changes state.email to parameter:"text", and does NOT set state.emailValid to true when text.length is less than 8', () => {
            const tree = renderer.create(<Login />)
            const instance = tree.getInstance()
            instance.updateEmail("1234567")
            expect(instance.state).toEqual({
                email:"1234567",
                password:null,
                emailValid:false,
                passwordValid:false,
            })
        })
        it('changes state.email to parameter:"text", and sets state.emailValid to true when text.length is equal to or greater than 8', () => {
            const tree = renderer.create(<Login />)
            const instance = tree.getInstance()
            instance.updateEmail("12345678")
            expect(instance.state).toEqual({
                email:"12345678",
                password:null,
                emailValid:true,
                passwordValid:false,
            })
        })
    })

    
    describe('function "updatePassword', () => {
        it('changes state.password to parameter:"text", and does NOT set state.passwordValid to true when text.length is less than 8', () => {
            const tree = renderer.create(<Login />)
            const instance = tree.getInstance()
            instance.updatePassword("1234567")
            expect(instance.state).toEqual({
                email:null,
                password:"1234567",
                emailValid:false,
                passwordValid:false,
            })
        })
        it('changes state.passord to parameter:"text", and sets state.passwordValid to true when text.length is equal to or greater than 8', () => {
            const tree = renderer.create(<Login />)
            const instance = tree.getInstance()
            instance.updatePassword("12345678")
            expect(instance.state).toEqual({
                email:null,
                password:"12345678",
                emailValid:false,
                passwordValid:true,
            })
        })
    })

    describe('function "signIn', () => {
        it('Displays a helpful message if email or password fields are empty', () => {
            Alert.alert = jest.fn()

            const tree = renderer.create(<Login />)
            const instance = tree.getInstance()
            instance.signIn()
            expect(Alert.alert).toHaveBeenCalled()
        })
    })

    describe('Login Screen  ', () => {

        test('change email ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Login store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("TextInput").at(0).props().onChangeText("asdf1234");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change password ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Login store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("TextInput").at(1).props().onChangeText("asdf1234");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('sign in button ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Login store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('go to Create Account ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Login store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("Text").at(3).props().onPress();
            expect(navigation.navigate).toHaveBeenCalled();
        })

        test('go to Forgot Password ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<Login store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("Text").at(4).props().onPress();
            expect(navigation.navigate).toHaveBeenCalled();
        })
    })
})
