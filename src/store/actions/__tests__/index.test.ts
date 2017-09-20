import Actions from "../";
import store from '../../';

const XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest;

test("FetchActor", () => {
  // store.dispatch(
  //   Actions.FetchActor.action({ name: 'Ryan Gosling' })
  // );
  // expect(Actions.FetchActor.type).not.toBe("FETCH_ACTOR");
});

// test('FetchMovies', async () => {
//   await store.dispatch(
//     new Actions.FetchMovies().action({ with_cast: 30614 })
//   );
//   // console.log('====================================');
//   // console.log(store.getState());
//   // console.log('====================================');
//   expect(new Actions.FetchMovies().type).not.toBe('FETCH_MOVIES');
// });