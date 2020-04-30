import React from 'react';
import ConnectedInputPersonalInfo, {InputPersonalInfo} from '../src/screens/InputPersonalInfo';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import { Alert } from 'react-native';

const createMockStore = configureStore([])

describe("InputPersonalInfo screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedInputPersonalInfo/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

describe("InputPersonalInfo screen", () => {

    it('function "convertHeightToInches" converts feet and inches to inches', () => {
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({metric:false})
        expect(instance.convertHeightToInches(5,8)).toEqual(68)
    });

    it('function "convertHeightToInches" converts meters and centimeters to inches', () => {
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({metric:true})
        expect(instance.convertHeightToInches(1,95)).toEqual(77)
    });



    it('function "convertWeightToPounds" converts pounds to pounds', () => {
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({metric:false})
        expect(instance.convertWeightToPounds(185)).toEqual(185)
    });

    it('function "convertWeightToPounds" converts kilograms to pounds', () => {
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({metric:true})
        expect(instance.convertWeightToPounds(85)).toEqual(187)
    });

})

describe("InputPersonalInfo screen", () => {

    it('function "submit" alerts user to missing name', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({
            metric:false,
            name:null,
            ftm:5,
            incm:8,
            weight:185,
            month:"January",
            day:"1",
            year:"1990"
        })
        instance.submit()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Please provide a name.")
    });

    it('function "submit" alerts user to missing height', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({
            metric:false,
            name:"Jon Doe",
            ftm:null,
            incm:null,
            weight:185,
            month:"January",
            day:"1",
            year:"1990"
        })
        instance.submit()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Please provide a height.")
    });

    it('function "submit" alerts user to missing weight', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({
            metric:false,
            name:"Jon Doe",
            ftm:5,
            incm:8,
            weight:null,
            month:"January",
            day:"1",
            year:"1990"
        })
        instance.submit()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Please provide a weight.")
    });

    it('function "submit" alerts user to missing birthday', () => {
        Alert.alert = jest.fn(x => x)
        const tree = renderer.create(<InputPersonalInfo />)
        const instance = tree.getInstance()
        instance.setState({
            metric:false,
            name:"Jon Doe",
            ftm:5,
            incm:8,
            weight:185,
            month:null,
            day:null,
            year:null
        })
        instance.submit()
        expect(Alert.alert.mock.calls.length).toBe(1)
        expect(Alert.alert.mock.results[0].value).toBe("Please provide a full birth date.")
    });
})
