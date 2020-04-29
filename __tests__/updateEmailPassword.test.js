import React from 'react';
import ConnectedUpdateEmailPassword, {UpdateEmailPassword} from '../src/screens/updateEmailPassword';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import firebase from 'firebase';

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

    describe('function "sendToFirebase" ', () => {
        
        it('stops on empty email', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const tree = renderer.create(<UpdateEmailPassword email="" navigation={navigation}/>)
            const instance = tree.getInstance()
            instance.state = {
                email: "",
                oldPassword: "hello123",
                password: "",
                confirmPassword: ""
            }
            firebase.auth = jest.fn();
            
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })

        it('stops on not matching passwords', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const tree = renderer.create(<UpdateEmailPassword email="" navigation={navigation}/>)
            const instance = tree.getInstance()
            firebase.auth = jest.fn();
            instance.state = {
                email: "",
                oldPassword: "hello123",
                password: "hello1234",
                confirmPassword: "hello1235"
            }
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })
    })

    describe('updateEmailPassword Screen  ', () => {

        test('change email/oldPassword/password/confirmPassword ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<UpdateEmailPassword store={createMockStore(initialState)} email="" navigation={navigation}/>)
            const component = enzymeWrapper.dive().dive();
            component.find("TextInput").at(0).props().onChangeText(" ");
            component.find("TextInput").at(1).props().onChangeText(" ");
            component.find("TextInput").at(2).props().onChangeText(" ");
            component.find("TextInput").at(3).props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change buttons ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<UpdateEmailPassword store={createMockStore(initialState)} email="" navigation={navigation}/>)
            const component = enzymeWrapper.dive().dive();
            component.find("View").at(1).dive().find("TouchableOpacity").at(0).props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
            component.find("View").at(1).dive().find("TouchableOpacity").at(1).props().onPress();
            expect(navigation.navigate).toHaveBeenCalled();
        })
    })
})