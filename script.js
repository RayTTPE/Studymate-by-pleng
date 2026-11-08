const textTargets = document.querySelectorAll(
    '.animate-text, .section h2'
);

// ฟังก์ชันรวมสระ/วรรณยุกต์ไทยให้อยู่กับพยัญชนะ
function splitThaiText(text) {
    const chars = Array.from(text);
    const result = [];

    chars.forEach(char => {

        // สระ วรรณยุกต์ และเครื่องหมายประกอบภาษาไทย
        const isThaiMark = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/.test(char);

        if (isThaiMark && result.length > 0) {
            result[result.length - 1] += char;
        } else {
            result.push(char);
        }
    });

    return result;
}

textTargets.forEach(target => {

    const text = target.textContent.trim();

    target.innerHTML = '';

    const letters = splitThaiText(text);

    letters.forEach((char, index) => {

        const span = document.createElement('span');

        span.innerHTML =
            char === ' '
                ? '&nbsp;'
                : char;

        let extraDelay = 0;

        if (target.tagName === "P") {
            extraDelay = 2;
        }

        span.style.animationDelay =
            `${extraDelay + (index * 0.08)}s`;

        target.appendChild(span);
    });

});

function letterAnimation() {

    textTargets.forEach(target => {

        const rect =
            target.getBoundingClientRect();

        const visible =
            rect.top < window.innerHeight * 0.8 &&
            rect.bottom > 0;

        if (visible) {

            target.classList.add('show');

        } else {

            target.classList.remove('show');

            target.querySelectorAll('span')
                .forEach(span => {

                    span.style.animation = 'none';

                    span.offsetHeight;

                    span.style.animation = '';

                });
        }
    });
}

const boxes =
    document.querySelectorAll('.animate-box');

function boxAnimation() {

    boxes.forEach(box => {

        const rect =
            box.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.85) {

            box.classList.add('show');

        } else {

            box.classList.remove('show');

        }
    });
}

window.addEventListener('scroll', () => {

    letterAnimation();
    boxAnimation();

});

window.addEventListener('load', () => {

    letterAnimation();
    boxAnimation();

});
