import React from 'react';
import ConnectedEditSettings, {EditSettings} from '../src/screens/editSettings';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as dates from '../src/constants/Date';
import firebase from 'firebase';

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

describe("editSettings screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    afterEach(() => {
        tree = null
        instance = null
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedEditSettings/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('function "componentDidMount" ', () => {
        
        it('correctly mounts ', () => {
            const tree = renderer.create(<EditSettings name="" email="" display_calories={false} height="0" 
                metric={true} sex="male" weight="0" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}
            />)
            const instance = tree.getInstance()

            expect(instance.state).toEqual({
                name: "",
                email: "",
                day: "31",
                month: "December",
                year: "1969",
                ftm: "0",
                incm: "0",
                weight: "0",
                sex: "male",
                metric: true,
                update_frequency: "0",
                display_calories_switch: false,
                display_pace_switch: false,
                display_distance_switch: false,
                display_time_switch: false
            })
        })
    })

    describe('function "convertMeasurementsToHeight" ', () => {
        
        it('correctly converts with metric ', () => {
            const tree = renderer.create(<EditSettings name="" email="" display_calories={false} height="0" 
                metric={true} sex="male" weight="0" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}
            />)
            const instance = tree.getInstance()
            const num = instance.convertMeasurementsToHeight(1, 50)
            expect(num).toEqual(150)
        })

        it('correctly converts with imperial ', () => {
            const tree = renderer.create(<EditSettings name="" email="" display_calories={false} height="0" 
                metric={false} sex="male" weight="0" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}
            />)
            const instance = tree.getInstance()
            const num = instance.convertMeasurementsToHeight(5, 10)
            expect(num).toEqual(70)
        })
    })

    describe('function "sendToFirebase" ', () => {
        
        it('stops on null name', () => {
            const tree = renderer.create(<EditSettings name="" email="" display_calories={false} height="101" 
            metric={true} sex="male" weight="2" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const instance = tree.getInstance()
            firebase.auth = jest.fn();
            
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })

        it('stops on blank height', () => {
            const tree = renderer.create(<EditSettings name="fakeName" email="" display_calories={false} height={null}
            metric={true} sex="male" weight="" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const instance = tree.getInstance()
            firebase.auth = jest.fn();
            instance.state = {
                name: "fakeName",
                email: "",
                day: "31",
                month: "December",
                year: "1969",
                ftm: "",
                incm: "0",
                weight: "",
                sex: "male",
                metric: true,
                update_frequency: "0",
                display_calories_switch: false,
                display_pace_switch: false,
                display_distance_switch: false,
                display_time_switch: false
            }
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })

        it('stops on blank weight', () => {
            const tree = renderer.create(<EditSettings name="fakeName" email="" display_calories={false} height={null}
            metric={true} sex="male" weight="" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const instance = tree.getInstance()
            firebase.auth = jest.fn();
            instance.state = {
                name: "fakeName",
                email: "",
                day: "31",
                month: "December",
                year: "1969",
                ftm: "0",
                incm: "0",
                weight: "",
                sex: "male",
                metric: true,
                update_frequency: "0",
                display_calories_switch: false,
                display_pace_switch: false,
                display_distance_switch: false,
                display_time_switch: false
            }
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })

        it('stops on blank date', () => {
            const tree = renderer.create(<EditSettings name="fakeName" email="" display_calories={false} height={null}
            metric={true} sex="male" weight="" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const instance = tree.getInstance()
            firebase.auth = jest.fn();
            instance.state = {
                name: "fakeName",
                email: "",
                day: "31",
                month: "December",
                year: "",
                ftm: "",
                incm: "",
                weight: "",
                sex: "male",
                metric: true,
                update_frequency: "0",
                display_calories_switch: false,
                display_pace_switch: false,
                display_distance_switch: false,
                display_time_switch: false
            }
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        }) 
    })

    describe('editSettings Screen  ', () => {

        test('change name ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(0).dive().find("TextInput").props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change to metric ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(4).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change to imperial ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(6).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change height/weight ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(15).dive().find("TextInput").props().onChangeText(" ");
            component.find("View").at(16).dive().find("TextInput").props().onChangeText(" ");
            component.find("View").at(17).dive().find("TextInput").props().onChangeText(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change sex ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(20).dive().find("TouchableOpacity").props().onPress();
            component.find("View").at(22).dive().find("TouchableOpacity").props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('change switches ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="fakeName" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(24).dive().find("Switch").props().onValueChange(" ");
            component.find("View").at(25).dive().find("Switch").props().onValueChange(" ");
            component.find("View").at(26).dive().find("Switch").props().onValueChange(" ");
            component.find("View").at(27).dive().find("Switch").props().onValueChange(" ");
            expect(navigation.navigate).not.toHaveBeenCalled();
        })

        test('save/cancel buttons ', () => {
            const navigation = jest.mock();
            navigation.navigate = jest.fn();
            const enzymeWrapper = shallow(<EditSettings store={createMockStore(initialState)} navigation={navigation} 
                name="" email="" display_calories={false} height={null} metric={true} sex="male" weight="" 
                birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}/>)
            const component = enzymeWrapper.dive();
            component.find("View").at(28).dive().find("TouchableOpacity").at(0).props().onPress();
            expect(navigation.navigate).not.toHaveBeenCalled();
            component.find("View").at(28).dive().find("TouchableOpacity").at(1).props().onPress();
            expect(navigation.navigate).toHaveBeenCalled();
        })

    })
})