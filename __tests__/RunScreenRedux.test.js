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
import SettingsReducer from '../src/reducers/SettingsReducer'





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


describe("Run screen", () => {

  


    it('Start Pause, Stop', () => {
        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(initialState)} />)
        const component = enzymeWrapper.dive().dive();
        console.log(component.find("StartButton").length)
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
        component.find("StopRunButton").props().onLongPress();
    });





    jest.useFakeTimers();

    it('Change Settings', () => {
        s = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: true,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(s)} />)
        const component = enzymeWrapper.dive().dive();
        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: true,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });


    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: true,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });


    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: true,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: false,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();

    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: true,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: false,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: false,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: true,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: false,
                display_time: true,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });



    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: false,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: true,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: true,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
////////////////////////////////////////////////////////////////////
    jest.useFakeTimers();
    it('Change Settings', () => {
        s = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: true,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(s)} />)
        const component = enzymeWrapper.dive().dive();
        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: true,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });


    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: true,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });


    jest.useFakeTimers();

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: true,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: false,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();

    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: true,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: false,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });
    jest.useFakeTimers();
    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: false,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: true,
                display_distance: true,
                display_pace: true,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: false,
                display_time: true,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });



    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: true,
                display_pace: false,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: true,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

    it('Change Settings', () => {
        t = {
            SettingsReducer: {
                display_calories: false,
                display_distance: false,
                display_pace: false,
                display_time: false,
                metric: false,
                update_frequency: false,
            },

            endRunReducer: {
                time: 0,
                distance: 0,
                pace: 0,
                calories: 0,
                startTime: "",
                endTime: "",
                route: [],
                hours: 0,
                mins: 0,
                secs: 0
            },
            PersonalInfoReducer: {
                name: null,
                email: null,
                birthday: null,
                height: null,
                weight: 100,
                sex: "male",
            }
        }

        const enzymeWrapper = shallow(<SimplyRun store={createMockStore(t)} />)
        const component = enzymeWrapper.dive().dive();

        component.find("StartButton").props().onPress();
        jest.advanceTimersByTime(1000);
        component.find("StartButton").props().onPress();
        component.find("StartButton").props().onPress();
    });

})