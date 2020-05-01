import React from 'react';
import ConnectedRunLog, {RunLog} from '../src/screens/RunLog';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import populatedRunsState from '../__mock_stores__/populatedRunsState'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Alert } from 'react-native';
import firebase from 'firebase';

const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-native-maps', () => {
    const React = jest.requireActual('react');
    const MapView = jest.requireActual('react-native-maps');

    class MockMapView extends React.Component {
        render() {
            return React.createElement('MapView', this.props, this.props.children);
        }
    }
    MockMapView.propTypes = MapView.propTypes;

    class MockCallout extends React.Component {
        render() {
            return React.createElement('Callout', this.props, this.props.children);
        }
    }
    MockCallout.propTypes = MapView.Callout.propTypes;
    MockMapView.Callout = MockCallout;

    class MockMarker extends React.Component {
        render() {
            return React.createElement('Marker', this.props, this.props.children);
        }
    }
    MockMarker.propTypes = MapView.Marker.propTypes;
    MockMapView.Marker = MockMarker;

    class MockPolyline extends React.Component {
        render() {
            return React.createElement('Polyline', this.props, this.props.children);
        }
    }
    MockPolyline.propTypes = MapView.Polyline.propTypes;
    MockMapView.Polyline = MockPolyline;
    /* eslint-enable react/prefer-stateless-function */

    return MockMapView;
});


const run = [{
    id: "testID",
    note: "well done Jon",
    time: 720,
    distance: 2.1,
    pace: 5.71428571,
    calories: 0,
    start_time: new Date("2020-03-22T12:48:54Z"),
    end_time: new Date("2020-03-22T13:00:54Z"),
    route: [new firebase.firestore.GeoPoint(43.073051,-89.40123), new firebase.firestore.GeoPoint(43.073451,-89.40123)],
}]

const run2 = {
    id: "testID2",
    note: "well done again, Jon",
    time: 720,
    distance: 2.1,
    pace: 5.71428571,
    calories: 0,
    start_time: new Date("2020-03-22T12:48:54Z"),
    end_time: new Date("2020-03-22T13:00:54Z"),
    route: [new firebase.firestore.GeoPoint(43.073051,-89.40123), new firebase.firestore.GeoPoint(43.073451,-89.40123)],
}

describe("RunLog screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(populatedRunsState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={createMockStore(initialState)}>
                <ConnectedRunLog/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('open modal', () => {
        const navigation = jest.mock();
        navigation.navigate = jest.fn();
        const tree = renderer.create(
            <Provider store={createMockStore(populatedRunsState)}>
                <ConnectedRunLog/>
            </Provider>
        ).toJSON();
        const enzymeWrapper = shallow(<RunLog store={createMockStore(populatedRunsState)} navigation={navigation}/>)
        const component = enzymeWrapper.dive().dive().dive();
        component.find("TouchableHighlight").at(0).props().onPress()
        component.find("Cell").at(0).props().onPress()
        component.find("TouchableHighlight").at(1).props().onPress()
        
        expect(navigation.navigate).not.toHaveBeenCalled();
    })


    test("Test RunDetails", () => {
        
        const t = renderer.create(<RunLog runs={run} />)
        const instance = t.getInstance()
//        instance.componentDidMount()
        instance.RunDetails("blah")
        expect(instance.state.selectedRun).toBe(null)
        instance.RunDetails("testID")
        
        expect(instance.state.selectedRun.id).toBe("testID")
    
    })
    
    test("Test DeleteRun", () => {
        Alert.alert = jest.fn()
        const t = renderer.create(<RunLog />)
        const instance = t.getInstance()
        instance.ConfirmDeleteRun()
        expect(Alert.alert).toHaveBeenCalled()
    
    })
    
    test("Test formatStats", () => {
        const t = renderer.create(<RunLog runs={run} />)
        const instance = t.getInstance()
        instance.componentDidMount()
//        const result = instance.formatStats(instance.state.tableData[0])
        instance.sortTable(0, true)
        instance.sortTable(1, true)
        instance.sortTable(2, true)
        instance.sortTable(3, true)
        instance.setModalVisible(true, "testID")
        instance.props.runs.push(run2);
        instance.componentDidUpdate()
//        expect(result[0]).toBe("3/22/2020")
    
    
    })

    // describe('Modal', () => {
    //     it('renders the Modal Correctly', () => {
    //       const { modal } = render(<TextAreaInput {…props} />)
          
    //       getByText(props.labelText)
    //     })
    //   })
    
})

// test("Test formatTime", () => {
//     const t = renderer.create(<RunLog />)
//     const instance = t.getInstance()
//     const time = instance.formatTime(123)
//     expect(time).toBe("00:02:03")

// })

// test("Test formatDate", () => {
//     const t = renderer.create(<RunLog />)
//     const instance = t.getInstance()
//     const date = new Date("October 13, 2013 11:13:00")
//     const formatted = instance.formatDate(date)
//     expect(formatted).toBe("10/13/2013")

// })

// test("Test formatPace", () => {
//     const t = renderer.create(<RunLog />)
//     const instance = t.getInstance()
//     const pace = instance.formatPace(12.5)
//     expect(pace).toBe("12:30")

// })

