import React from 'react';
import ConnectedForgotPassword, {ForgotPassword} from '../src/screens/ForgotPassword';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';

const createMockStore = configureStore([])


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

        it('does NOT change state when parameter:"text" is empty or null', () => {
            const tree = renderer.create(<ForgotPassword />)
            const instance = tree.getInstance()
            instance.updateEmail("")
            expect(instance.state).toEqual({
                email:null,
                emailValid:false,
            })
            instance.updateEmail(null)
            expect(instance.state).toEqual({
                email:null,
                emailValid:false,
            })
        })
    })
})
