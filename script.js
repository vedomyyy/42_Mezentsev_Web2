// Ждём полной загрузки страницы
window.addEventListener('load', function() {
    console.log('Страница загружена');
    
    // Получаем элементы
    const toiletSection = document.querySelector('.toilet-section');
    const poopImg = document.getElementById('poopImg');
    const splashImg = document.getElementById('splashImg');
    const speechBubble = document.getElementById('speechBubble');
    const reasonsBlock = document.querySelector('.reasons');
    
    if (!toiletSection || !poopImg || !splashImg || !speechBubble) {
        console.error('Ошибка: не все элементы найдены!');
        return;
    }
    
    console.log('Блок причин найден:', !!reasonsBlock);
    
    // Константы
    const START_TOP = 0;
    const END_TOP = 240;
    
    // Флаги
    let splashShown = false;
    let bubbleShown = false;
    let lastProgress = 0;
    
    // Функция сброса
    function resetToInitial() {
        console.log('🔄 СБРОС ВСЕГО');
        
        // Сбрасываем какашку
        poopImg.style.top = START_TOP + 'px';
        poopImg.style.opacity = '1';
        poopImg.style.filter = 'blur(3px) drop-shadow(0 4px 2px #b09b89)';
        
        // Прячем брызги ПРИНУДИТЕЛЬНО
        splashImg.classList.remove('show');
        splashImg.style.display = 'none';
        splashImg.style.opacity = '0';
        splashImg.style.transform = 'translateX(-50%) scale(0)';
        splashImg.style.animation = 'none';
        
        // Прячем облачко
        speechBubble.classList.remove('show');
        
        // Сбрасываем флаги
        splashShown = false;
        bubbleShown = false;
        
        console.log('✅ Сброс завершен');
    }
    
    function updatePoopPosition() {
        // Проверяем блок причин
        if (reasonsBlock) {
            const reasonsRect = reasonsBlock.getBoundingClientRect();
            if (reasonsRect.top <= 0) {
                console.log('🎯 ДОШЛИ ДО ТОП-5 ПРИЧИН');
                resetToInitial();
            }
        }
        
        // Получаем позицию секции
        const sectionRect = toiletSection.getBoundingClientRect();
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const sectionTop = sectionRect.top + scrollY;
        const pixelsScrolled = scrollY + windowHeight - sectionTop;
        const sectionHeight = sectionRect.height;
        
        // Прогресс
        let progress = pixelsScrolled / sectionHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        // Направление
        const scrollingDown = progress > lastProgress;
        
        // Двигаем какашку
        const currentTop = START_TOP + (END_TOP - START_TOP) * progress;
        poopImg.style.top = currentTop + 'px';
        
        // Блюр
        const blurAmount = 3 - (progress * 2.5);
        poopImg.style.filter = `blur(${Math.max(0, blurAmount)}px) drop-shadow(0 4px 2px #b09b89)`;
        
        // Прозрачность
        if (progress > 0.85) {
            poopImg.style.opacity = 1 - ((progress - 0.85) * 6.67);
        } else {
            poopImg.style.opacity = 1;
        }
        
        // Проверка невидимости
        const isPoopInvisible = progress >= 0.98 || parseFloat(poopImg.style.opacity) <= 0.05;
        
        // СКРОЛЛ ВНИЗ
        if (scrollingDown) {
            // Брызги ПОСЛЕ исчезновения какашки
            if (isPoopInvisible && !splashShown) {
                console.log('💦 БРЫЗГИ! Какашка исчезла');
                
                // Показываем брызги принудительно через style
                splashImg.style.display = 'block';
                splashImg.style.opacity = '0.9';
                splashImg.style.transform = 'translateX(-50%) scale(1.3)';
                splashImg.style.animation = 'splashPulse 0.6s ease-in-out infinite';
                
                // Добавляем класс для совместимости
                splashImg.classList.add('show');
                
                splashShown = true;
                
                // Облачко через 0.3 сек
                setTimeout(() => {
                    if (!bubbleShown && splashShown) {
                        speechBubble.classList.add('show');
                        bubbleShown = true;
                        console.log('💬 ОБЛАЧКО!');
                    }
                }, 300);
            }
        } 
        // СКРОЛЛ ВВЕРХ
        else {
            if (progress < 0.3) {
                resetToInitial();
            }
        }
        
        lastProgress = progress;
    }
    
    // Запуск
    poopImg.style.transition = 'none';
    window.addEventListener('scroll', updatePoopPosition);
    window.addEventListener('resize', updatePoopPosition);
    updatePoopPosition();
    
    console.log('Скролл-контроллер запущен');
});