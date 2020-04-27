import { shallow } from 'enzyme';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import {SimplyRun} from '../src/screens/SimplyRun'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import initialState from '../__mock_stores__/initialState'

import StopRunButton from '../src/runbutton/StopRunButton';
import StartButton from '../src/runbutton/StartButton';




const createMockStore = configureStore([])

Enzyme.configure({ adapter: new Adapter() })


const mockGeolocation = {
    getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
            coords: {
                latitude: 51.1,
                longitude: 45.3
            }
        })))
};
global.navigator.geolocation = mockGeolocation;


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



test("Test Timer", () => {
    const t = renderer.create(<SimplyRun />)
    const instance = t.getInstance()
    instance.start()
    expect(instance.state.secs).toBe(0)

})
    

test("Format Stats", () => {
    const t = renderer.create(<SimplyRun />)
    const instance = t.getInstance()
    instance.formatStats();
    expect(instance.state.stats).toBe("")
})


jest.useFakeTimers();


test("Start Tracking", () => {
    const t = renderer.create(<SimplyRun />)
    const instance = t.getInstance()
    instance.startTracking();

    jest.advanceTimersByTime(1000)
    expect(instance.state.distance).toBe(0)


})
test("Start Tracking", () => {
    const t = renderer.create(<SimplyRun />)
    const instance = t.getInstance()
    instance.state.distance = 1
    instance.startTracking();
    jest.advanceTimersByTime(1000)
    expect(instance.state.distance).toBe(1)


})



test("Start and Stop Button", () => {
    const stop = renderer.create(<StopRunButton />)
    expect(stop.getInstance().props[0]).toBe(undefined)
    const start = renderer.create(<StartButton />)
    expect(start.getInstance().props[0]).toBe(undefined)
})

