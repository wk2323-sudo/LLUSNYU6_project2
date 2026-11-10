// 화면 이동 도우미. expo-router의 router를 감싸서 자주 쓰는 이동을 한 줄로 쓰게 해요.
import { router, type Href } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export type TabName = 'home' | 'explore' | 'collab' | 'mystore';

/** 쌓인 화면을 모두 닫고 href를 새 시작 화면으로 만들어요 (가입 완료, 로그아웃 등) */
export function resetTo(href: Href) {
  if (router.canDismiss()) router.dismissAll();
  router.replace(href);
}

/** 쌓인 화면을 닫고 하단 탭으로 이동해요 (예: 요청 완료 → 협업 탭) */
export function goTab(tab: TabName) {
  resetTo(`/${tab}` as Href);
}

/** 뒤로 갈 화면이 없으면 홈으로 */
export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/home');
}

export async function copyText(text: string) {
  try {
    await Clipboard.setStringAsync(text);
  } catch {
    // 복사 권한이 없어도 화면에는 안내를 보여줘요
  }
}
