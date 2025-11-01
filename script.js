// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const closeBtn = document.querySelector('.close-btn');
    const musicBtn = document.getElementById('musicBtn');
    const birthdayMusic = document.getElementById('birthdayMusic');
    
    let isMusicPlaying = false;
    
    // 卡片点击翻转
    card.addEventListener('click', function() {
        if (!this.classList.contains('flipped')) {
            this.classList.add('flipped');
            // 播放翻转音效
            playSound();
        }
    });
    
    // 关闭按钮点击
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        card.classList.remove('flipped');
    });
    
    // 音乐控制
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            birthdayMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = '🔇';
        } else {
            birthdayMusic.play().catch(e => {
                console.log('音乐播放失败:', e);
            });
            musicBtn.classList.add('playing');
            musicBtn.textContent = '🎵';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // 键盘事件
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ': // 空格键翻转
                e.preventDefault();
                if (!card.classList.contains('flipped')) {
                    card.classList.add('flipped');
                    playSound();
                }
                break;
            case 'Escape': // ESC键关闭
                card.classList.remove('flipped');
                break;
            case 'm':
            case 'M': // M键控制音乐
                musicBtn.click();
                break;
        }
    });
    
    // 触摸事件支持
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) { // 滑动距离超过50px
            if (diff > 0) { // 向上滑动
                if (!card.classList.contains('flipped')) {
                    card.classList.add('flipped');
                    playSound();
                }
            } else { // 向下滑动
                card.classList.remove('flipped');
            }
        }
    });
    
    // 播放音效
    function playSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.volume = 0.3;
        audio.play().catch(e => {
            console.log('音效播放失败:', e);
        });
    }
    
    // 创建彩带效果
    function createConfetti() {
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '1000';
                
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => {
                    confetti.remove();
                };
            }, i * 100);
        }
    }
    
    // 定期创建彩带效果
    setTimeout(createConfetti, 2000);
    setInterval(createConfetti, 8000);
    
    // 鼠标移动时气球跟随效果
    document.addEventListener('mousemove', function(e) {
        const balloons = document.querySelectorAll('.balloon');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        balloons.forEach((balloon, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            balloon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}); 
