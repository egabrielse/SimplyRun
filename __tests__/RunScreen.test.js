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

test("Start Tracking", () => {
    const t = renderer.create(<SimplyRun />)
    const instance = t.getInstance()
    instance.startTracking();
    expect(instance.state.calories).toBe(0)
    expect(instance.state.distance).toBe(0)
    expect(instance.state.secs).toBe(0)
    
})


