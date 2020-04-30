import {getHeaderTitle} from '../src/navigation/BottomTabNavigator';

describe("getHeaderTitle works properly ", () => {
    test('with RUN_LOG ', () => {
        const route = {
            state: {
                index: 0,
                routes: [
                    {
                        name: "RUN_LOG"
                    }
                ]
            }
        }
        const name = getHeaderTitle(route);
        expect(name).toEqual("Run Log");
    })

    test('with SIMPLY_RUN ', () => {
        const route = {
            state: {
                index: 0,
                routes: [
                    {
                        name: "SIMPLY_RUN"
                    }
                ]
            }
        }
        const name = getHeaderTitle(route);
        expect(name).toEqual("Simply Run");
    })

    test('with SETTINGS ', () => {
        const route = {
            state: {
                index: 0,
                routes: [
                    {
                        name: "SETTINGS"
                    }
                ]
            }
        }
        const name = getHeaderTitle(route);
        expect(name).toEqual("Settings");
    })
})