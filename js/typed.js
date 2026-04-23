// 打字机效果
class Typed {
    constructor(element, options) {
        this.element = element;
        this.options = Object.assign({
            strings: ['Hello', 'World'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 1000,
            startDelay: 0,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        }, options);
        
        this.strings = this.options.strings;
        this.typeSpeed = this.options.typeSpeed;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.startDelay = this.options.startDelay;
        this.loop = this.options.loop;
        this.showCursor = this.options.showCursor;
        this.cursorChar = this.options.cursorChar;
        
        this.stringIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.loopCount = 0;
        
        this.init();
    }
    
    init() {
        setTimeout(() => {
            this.type();
        }, this.startDelay);
    }
    
    type() {
        const currentString = this.strings[this.stringIndex];
        const currentCharIndex = this.isDeleting ? this.charIndex - 1 : this.charIndex + 1;
        
        this.element.textContent = currentString.substring(0, currentCharIndex);
        
        if (!this.isDeleting && currentCharIndex === currentString.length) {
            this.isDeleting = true;
            setTimeout(() => this.type(), this.backDelay);
        } else if (this.isDeleting && currentCharIndex === 0) {
            this.isDeleting = false;
            this.stringIndex = (this.stringIndex + 1) % this.strings.length;
            if (!this.loop && this.stringIndex === 0) {
                return;
            }
            setTimeout(() => this.type(), this.typeSpeed);
        } else {
            const speed = this.isDeleting ? this.backSpeed : this.typeSpeed;
            setTimeout(() => this.type(), speed);
        }
    }
}