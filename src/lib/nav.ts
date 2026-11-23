
import { router, type Href } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

export type TabName = 'home' | 'explore' | 'collab' | 'mystore';


export function resetTo(href: Href) {
  if (router.canDismiss()) router.dismissAll();
  router.replace(href);
}


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
