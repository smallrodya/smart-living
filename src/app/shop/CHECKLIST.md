# Чеклист изменений страниц раздела Shop

## Постельное белье
- [x] duvet-set-by-type (Заменена кнопка Add to Cart на View)
- [x] super-king (Заменена кнопка Add to Cart на View)
- [x] king (Заменена кнопка Add to Cart на View)
- [x] double (Заменена кнопка Add to Cart на View)
- [x] single (Заменена кнопка Add to Cart на View)
- [x] hotel-quality (Заменена кнопка Add to Cart на View)
- [x] teddy (Заменена кнопка Add to Cart на View)
- [x] 3d (Заменена кнопка Add to Cart на View)
- [x] plain (Заменена кнопка Add to Cart на View)
- [x] printed (Заменена кнопка Add to Cart на View)
- [x] electric-underblankets (Заменена кнопка Add to Cart на View)
- [x] bedspreads (Заменена кнопка Add to Cart на View)
- [x] kids-bedding (Заменена кнопка Add to Cart на View)
- [x] weighted-blankets (Заменена кнопка Add to Cart на View)
- [x] fleece-bedding (Заменена кнопка Add to Cart на View)
- [x] pillowcases (Заменена кнопка Add to Cart на View)
- [x] fitted-sheets (Заменена кнопка Add to Cart на View)
- [x] complete-bedding-set (Заменена кнопка Add to Cart на View)

## Ковры и коврики
- [x] table-placemat (Заменена кнопка Add to Cart на View)
- [x] kitchen-mat (Заменена кнопка Add to Cart на View)
- [x] door-mat (Заменена кнопка Add to Cart на View)
- [x] table-runner (Заменена кнопка Add to Cart на View)
- [x] hallway-runner (Заменена кнопка Add to Cart на View)
- [x] reversible-rugs (Заменена кнопка Add to Cart на View)
- [x] carved-rugs (Заменена кнопка Add to Cart на View)
- [x] shaggy-rugs (Заменена кнопка Add to Cart на View)

#### Размеры ковров
- [x] Large (Заменена кнопка Add to Cart на View)
- [x] medium (Заменена кнопка Add to Cart на View)
- [x] runner (Заменена кнопка Add to Cart на View)
- [x] small (Заменена кнопка Add to Cart на View)
- [x] extra-large (Заменена кнопка Add to Cart на View)
- [x] round (Заменена кнопка Add to Cart на View)
- [x] square (Заменена кнопка Add to Cart на View)
- [x] custom-size (Заменена кнопка Add to Cart на View)

## Пледы и полотенца
- [x] fleece-throws-towels (Заменена кнопка Add to Cart на View)
- [x] all-throws (Заменена кнопка Add to Cart на View)
- [x] weighted-blankets-throws-towels (Заменена кнопка Add to Cart на View)
- [x] 10pc-towel-bale-set (Заменена кнопка Add to Cart на View)
- [x] 8pc-towel-bale-set (Заменена кнопка Add to Cart на View)
- [x] tea-towels (Заменена кнопка Add to Cart на View)

## Другое
- [x] clearance
- [x] crib

## Инструкция по изменению
1. Открыть файл страницы (page.tsx)
2. Найти блок с кнопкой Add to Cart
3. Заменить на кнопку View с иконкой глаза
4. Сохранить изменения
5. Отметить выполнение в чеклисте

## Шаблон кода для замены
```tsx
<button
  onClick={() => setQuickViewProduct(product)}
  style={{
    flex: 1,
    padding: '12px 24px',
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#333';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = '#222';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
  View
</button>
``` 