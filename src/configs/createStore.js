import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducers';
import { rootSaga } from './rootSagas';

const persistConfig = {
  key: 'rootPersist',
  storage,
  blacklist: ['loginReducer', 'registerReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const storeMiddleware =
  process.env.MODE === 'localhost'
    ? composeWithDevTools(applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(persistedReducer, storeMiddleware);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
