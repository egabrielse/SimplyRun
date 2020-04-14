import React from 'react';
import ConnnectedCreateAccount, {CreateAccount} from '../src/screens/CreateAccount';
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
                <ConnnectedCreateAccount/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('function "updateEmail', () => {
        it('changes state.email to parameter:"text", and does NOT set state.emailValid to true when text.length is less than 8', () => {
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
        it('changes state.email to parameter:"text", and sets state.emailValid to true when text.length is equal to or greater than 8', () => {
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

    
    describe('function "updatePassword', () => {
        it('changes state.password to parameter:"text", and does NOT set state.passwordValid to true when text.length is less than 8', () => {
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
        it('changes state.passord to parameter:"text", and sets state.passwordValid to true when text.length is equal to or greater than 8', () => {
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

    describe('function "updateConirm', () => {
        it('changes state.confirmPassword to parameter:"text", and does NOT set state.confirmValid to true when text.length is less than 8', () => {
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
        it('changes state.confirmPassword to parameter:"text", and sets state.confirmValid to true when text.length is equal to or greater than 8', () => {
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
})
