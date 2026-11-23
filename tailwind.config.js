/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 앱은 밝은 화면만 써요. 기본값(media)이면 웹 개발 모드에서
  // "Cannot manually set color scheme" 오류가 나서 class로 정해요.
  darkMode: 'class',
  theme: {
    extend: {
      // DURE 브랜드 색상 (Figma 'DURE 브랜딩' 섹션)
      colors: {
        charcoal: '#47423e', // 주요 버튼, 제목, 선택 상태
        pressed: '#2a2623', // 눌린 주요 버튼
        sand: '#dcd5cd', // 베이지: 칩 테두리, 지난 수치, 선택된 탭
        cream: '#f4f1ee', // 연한 베이지: 카드·안내 배경
        line: '#e8e3dd', // 얇은 선: 카드 테두리, 구분선, 태그 배경
        mid: '#a39b92', // 중간 베이지: 비활성 글자, 체크박스 테두리
        sub: '#6f6862', // 보조 글자
        yellow: '#ffec9f', // 옐로: 강조, AI 표시 (위에는 차콜 글자만)
        'yellow-soft': '#fff5ce', // 연한 옐로: 상태 태그, 한 줄 해석
        input: '#bfbfbf', // 입력칸 테두리
        canvas: '#f7f7f7', // 제안서 화면 배경
      },
    },
  },
  plugins: [],
};
