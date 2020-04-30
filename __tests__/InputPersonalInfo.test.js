import React from 'react';
import ConnectedInputPersonalInfo, {InputPersonalInfo} from '../src/screens/InputPersonalInfo';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import { Alert } from 'react-native';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

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

    describe('InputPersonalInfo Screen  ', () => {

        test('change name ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<InputPersonalInfo store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(2).dive().find("TextInput").props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('toggle metric/imperial ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<InputPersonalInfo store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(5).dive().find("TouchableOpacity").props().onPress();
            component.find("View").at(7).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change height/weight ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<InputPersonalInfo store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            // ft/m, in/cm, lb/kg
            component.find("View").at(16).dive().find("TextInput").props().onChangeText(" ");
            component.find("View").at(17).dive().find("TextInput").props().onChangeText(" ");
            component.find("View").at(18).dive().find("TextInput").props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('toggle sex', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<InputPersonalInfo store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            // male then female button
            component.find("View").at(21).dive().find("TouchableOpacity").props().onPress();
            component.find("View").at(23).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('submit ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<InputPersonalInfo store={createMockStore(initialState)} navigation={navigation}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(25).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })
    })
})
