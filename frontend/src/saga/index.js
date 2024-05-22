import { takeLatest, debounce, retry, put, spawn } from "redux-saga/effects"
import { searchSkillsRequest, searchSkillsFailure, searchSkillsSuccess } from "../actions/actionCreators"
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
} from "../actions/actionTypes"
import { searchSkills } from "../api"

export default function* saga() {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchSearchSkillsSaga)
}

function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga)
}

function filterChangeSearchAction(action) {
  return action.type === CHANGE_SEARCH_FIELD && action.payload.search.trim() !== ""
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search))
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga)
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3
    const retryDelay = 1 * 1000
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload.search
    )
    yield put(searchSkillsSuccess(data))
  } catch (e) {
    yield put(searchSkillsFailure(e.message))
  }
}
