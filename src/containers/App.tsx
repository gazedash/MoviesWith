/**
 * @flow
 */

// import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import AppScreen from '../components/AppScreen';
// export default class App extends React.Component {
//   render() {
//     return (
//       <AppScreen />
//     );
//   }
// }
const mapStateToProps: MapStateToProps<{}, {}> = (state, ownProps) => { return {}; };
export default connect(mapStateToProps)(AppScreen);