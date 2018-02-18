import { all, fork } from 'redux-saga/effects';

import listSaga from './listSaga';
import registrationSaga from './registrationSaga';

function* rootSaga() {
  yield all([fork(listSaga), fork(registrationSaga)]);
}

export default sagaMiddleware => {
  sagaMiddleware.run(rootSaga);
};
