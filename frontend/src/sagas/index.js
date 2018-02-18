import listSaga from './listSaga';

export default sagaMiddleware => {
  sagaMiddleware.run(listSaga);
};

