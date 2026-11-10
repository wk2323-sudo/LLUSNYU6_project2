/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
    presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      
      colors: {
        ink: '#1a1a1a', // 기본 글자
        sub: '#737373', // 보조 글자
        line: '#bfbfbf', // 카드·입력칸 테두리
        hair: '#e0e0e0', // 구분선
        fill: '#f2f2f2', // 사진 자리, 안내 박스
        brand: '#759fd8', // 주요 버튼, 선택 상태
        'brand-soft': '#e6edf8', // 파란 배경 위 보조 글자
      },
    },
  },
  plugins: [],
};
