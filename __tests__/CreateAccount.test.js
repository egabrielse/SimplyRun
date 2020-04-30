import React from 'react';
import ConnnectedCreateAccount, {CreateAccount} from '../src/screens/CreateAccount';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('firebase', () => {
    return {
        initializeApp: jest.fn(),
        auth: jest.fn(() => {
            return {
                createUserWithEmailAndPassword: jest.fn((email, pass) => {
                    return new Promise(function(resolve, reject) {
                        if (email == "jondoe@test.com" & pass == "asdf1234") {
                            resolve({
                                email: 'jondoe@test.com',
                                uid: 'asdf1234'
                            });
                        } else {
                            reject({ message: 'Error creating new user.' });
                        }
                    });
                }),
                currentUser: {
                    email: "jondoe@test.com",
                    uid: "TH9FYXr4NR2rlsbxHa3F"
                }
            };
        }),
        // UNDER CONSTRUCTION:
        firestore: jest.fn(() => {
            return {
                collection: jest.fn((users) => {
                    return {
                        doc: jest.fn((userID) => {
                            return {
                                set: jest.fn((userData) => {
                                    // Needs a promise return
                                }),
                                get: jest.fn(() => {
                                    // Needs a promise return
                                }),
                                collection: jest.fn((runlog) => {
                                    return {
                                        get: jest.fn(() => {
                                            // Needs a promise return
                                        }),
                                        add: jest.fn(() => {
                                            // Needs a promise return
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    };
});

const createMockStore = configureStore([])

describe("CreateAccount screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnnectedCreateAccount/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe("CreateAccount screen", () => {
    it('function "updateEmail" sets state.email but not state.emailValid (too short)', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updateEmail("1234567")
        expect(instance.state).toEqual({
            email:"1234567",
            password:null,
            confirmPassword:null,
            emailValid:false,
            passwordValid:false,
            confirmValid:false,
        })
    })
    it('function "updateEmail" sets state.email and state.emailValid', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updateEmail("12345678")
        expect(instance.state).toEqual({
            email:"12345678",
            password:null,
            confirmPassword:null,
            emailValid:true,
            passwordValid:false,
            confirmValid:false,
        })
    })
})

        
describe("CreateAccount screen", () => {
    it('function "updatePassword sets state.password but not state.passwordValid (too short)', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updatePassword("1234567")
        expect(instance.state).toEqual({
            email:null,
            password:"1234567",
            confirmPassword:null,
            emailValid:false,
            passwordValid:false,
            confirmValid:false,
        })
    })
    it('function "updatePassword sets state.password and state.passwordValid', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updatePassword("12345678")
        expect(instance.state).toEqual({
            email:null,
            password:"12345678",
            confirmPassword:null,
            emailValid:false,
            passwordValid:true,
            confirmValid:false,
        })
    })
})

describe("CreateAccount screen", () => {
    it('function "updateConirm sets state.confirmPassword but not state.confirmValid (too short)', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updateConfirm("1234567")
        expect(instance.state).toEqual({
            email:null,
            password:null,
            confirmPassword:"1234567",
            emailValid:false,
            passwordValid:false,
            confirmValid:false,
        })
    })
    it('function "updateConirm sets state.confirmPassword and state.confirmValid', () => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.updateConfirm("12345678")
        expect(instance.state).toEqual({
            email:null,
            password:null,
            confirmPassword:"12345678",
            emailValid:false,
            passwordValid:false,
            confirmValid:true,
        })
    })
})

describe("CreateAccount screen", () => {

    it('function "signUp" alerts user to missing email or password', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.setState({
            email:null,
            password:null,
            confirmPassword:null,
        })
        instance.signUp()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Please provide a email address and password")
    });

    it('function "signUp" alerts user to mismatching passwords', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.setState({
            email:"jondoe@test.com",
            password:"asdf1234",
            confirmPassword:"1234asdf",
        })
        instance.signUp()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Passwords do not match")
    });

    // SUCCESSFULLY MOCKED FIREBASE!!!!
    it('function "signUp" returns error message when user cannot be signed up', async() => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.setState({
            email:"jondoe@test.com",
            password:"asdf",
            confirmPassword:"asdf",
        })
        await instance.signUp()
        process.nextTick(() => {
            expect(Alert.alert.mock.calls.length).toBe(1)
            expect(Alert.alert.mock.results[0].value).toBe("Error creating new user.")
        })
    });

    it('function "signUp" successfully signs up a new user', async() => {
        const tree = renderer.create(<CreateAccount />)
        const instance = tree.getInstance()
        instance.setState({
            email:"jondoe@test.com",
            password:"asdf1234",
            confirmPassword:"asdf1234",
        })
        await instance.signUp()

        process.nextTick(() => {
            expect(instance.state).toEqual({
                email:null,
                password:null,
                confirmPassword:null,
                emailValid:false,
                passwordValid:false,
                confirmValid:false,
            })
        })
    });

    describe('CreateAccount Screen textinput/button testing  ', () => {

        test('change email/password/confirmPassword ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<CreateAccount store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            // email, password, confirmPassword
            component.find("TextInput").at(0).props().onChangeText(" ");
            component.find("TextInput").at(1).props().onChangeText(" ");
            component.find("TextInput").at(2).props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('sign up user ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<CreateAccount store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            // email, password, confirmPassword
            component.find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })
    })
    
})