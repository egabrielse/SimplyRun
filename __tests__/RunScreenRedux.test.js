import React from 'react';
import renderer from 'react-test-renderer';
import SimplyRun from '../src/screens/SimplyRun'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import initialState from '../__mock_stores__/initialState'
const createMockStore = configureStore([])


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

describe("Run screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <SimplyRun />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });



})
