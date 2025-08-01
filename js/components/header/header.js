import { getTokenStatus } from "../../core/config.js";
import {
  logoutGNBEvent,
  searchGNBEvent,
} from "./components/headerEventHandlers.js";
import { getHeaderGNB } from "./components/headerRender.js";
export function initHeader() {
  //로그인 토큰 가져오기
  const loginStatus = getTokenStatus();
  //GNB 랜딩
  getHeaderGNB(loginStatus);
  // 검색기능
  searchGNBEvent();
  //로그아웃
  logoutGNBEvent();
}
