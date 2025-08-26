export function Header() {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Калькулятор БЖУ для нескольких продуктов
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
          Добавляйте продукты, вводите БЖУ/100 г и вес — мы посчитаем граммы и
          калории по каждому и общий итог.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          💡 Совет: установите это приложение как PWA на телефон (через меню
          браузера «Добавить на главный экран»).
        </p>
      </header>
    </>
  );
}
