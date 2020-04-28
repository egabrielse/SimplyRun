import React from 'react';
import ConnectedEditSettings, {EditSettings} from '../src/screens/editSettings';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import initialState from '../__mock_stores__/initialState'
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as dates from '../src/constants/Date';
// import firebaseConfig from '../src/config/firebaseConfig';
const firebase = jest.genMockFromModule('firebase')

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
        
        it('works correctly ', () => {
            // const auth = jest.fn(() => {
            //       return {
            //           currentUser: "fakeUser"
            //       }
            //   })
            // const firestore = jest.fn(() => {
            //     return { 
            //         collection: jest.fn(() => {
            //             return {
            //                 doc: jest.fn(() => {
            //                 return {
            //                   collection: collection,
            //                   update: jest.fn(() => Promise.resolve(true)),
            //                   onSnapshot: jest.fn(() => Promise.resolve(true)),
            //                   get: jest.fn(() => Promise.resolve(true))
            //                 }
            //               })
            //         }})
            //     };
            //   });
            // firestore.FieldValue = {
            //     serverTimestamp: () => {
            //       return "MOCK_TIME";
            //     }
            //   };
            jest.mock('../src/config/firebaseConfig')
            firebase.initializeApp = jest.fn();
            firebase.auth = jest.fn(() => Promise.resolve(true))
            firebase.firestore = jest.fn(() => {
                    return {
                        collection: jest.fn(() => {
                            return {
                                doc: jest.fn(() => { 
                                    return {
                                        update: jest.fn(() => Promise.resolve(true))
                                    }
                                })
                            }
                        })
                    }
            })

            // const firestoreMock = jest.fn(() => {
            //     return {
            //         mockCollection: jest.fn(() => {
            //             return {
            //                 mockDoc: jest.fn(() => { 
            //                     return {
            //                         mockUpdate: jest.fn(() => Promise.resolve(true))
            //                     }
            //                 })
            //             }
            //         })
            //     }
            // })
    
            const tree = renderer.create(<EditSettings name="" email="" display_calories={false} height="0" 
                metric={true} sex="male" weight="0" birthday="0" update_frequency="0" display_time={false} display_distance={false} display_pace={false}
                />)
            const instance = tree.getInstance()
            instance.sendToFirebase();
            expect(firebase.auth).not.toHaveBeenCalled();
        })

    })
})