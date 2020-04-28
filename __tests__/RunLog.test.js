import React from 'react';
import ConnectedRunLog, {RunLog} from '../src/screens/RunLog';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Alert } from 'react-native';

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


describe("RunLog screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <ConnectedRunLog/>
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });


    test("Test RunDetails", () => {
        const t = renderer.create(<RunLog />)
        const instance = t.getInstance()
        instance.RunDetails("blah")
        expect(instance.state.selectedRun).toBe(null)
    
    })
    
    test("Test DeleteRun", () => {
        Alert.alert = jest.fn()
        const t = renderer.create(<RunLog />)
        const instance = t.getInstance()
        instance.ConfirmDeleteRun()
        expect(Alert.alert).toHaveBeenCalled()
    
    })
    
    test("Test formatStats", () => {
        const t = renderer.create(<RunLog />)
        const instance = t.getInstance()
        const date = new Date("October 13, 2013 11:13:00")
        const rowData = [date, 12, 4321, 7.6]
        const result = instance.formatStats(rowData)
        instance.sortTable(0, true)
        instance.setModalVisible(true, "wllKAvWP9h2eNQMyc4Mp")
        
        expect(result[0]).toBe("10/13/2013")
    
    
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

