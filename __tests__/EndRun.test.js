import React from 'react';
import renderer from 'react-test-renderer';
import SimplyRun from '../src/screens/SimplyRun'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import initialState from '../__mock_stores__/initialState'
const createMockStore = configureStore([])
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import StartButton from '../src/runbutton/StartButton';
import { View } from 'react-native'
import { UPDATE_ALL_SETTINGS } from '../src/actions/SettingsAction'
import SettingsReducer from '../src/reducers/SettingsReducer'
import EndRun from '../src/screens/EndRun';
import * as firebase from 'firebase';

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
describe("End screen", () => {

    beforeEach(() => {
        mockStore = createMockStore(initialState)
    })

    it('renders correctly', () => {
        const tree = renderer.create(
            <Provider store={mockStore}>
                <EndRun />
            </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });



})





it('Write a note', () => {
    const enzymeWrapper = shallow(<EndRun store={createMockStore(initialState)} />)
    const component = enzymeWrapper.dive().dive();
    component.find("TextInput").props().onChangeText("Note");
    component.find("TouchableOpacity").at(1).props().onPress()    
});
