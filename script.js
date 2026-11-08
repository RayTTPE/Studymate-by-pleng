const textTargets = document.querySelectorAll(
'.animate-text, .section h2'
);

textTargets.forEach(target => {

    const text = target.textContent.trim();

    target.innerHTML = '';

    [...text].forEach((char,index)=>{

        const span =
        document.createElement('span');

        span.innerHTML =
        char === ' '
        ? '&nbsp;'
        : char;

        let extraDelay = 0;

        if(target.tagName === "P"){
            extraDelay = 2;
        }

        span.style.animationDelay =
        `${extraDelay + (index * 0.08)}s`;

        target.appendChild(span);

    });

});

function letterAnimation(){

    textTargets.forEach(target=>{

        const rect =
        target.getBoundingClientRect();

        const visible =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > 0;

        if(visible){

            target.classList.add('show');

        }else{

            target.classList.remove('show');

            target.querySelectorAll('span')
            .forEach(span=>{

                span.style.animation='none';

                span.offsetHeight;

                span.style.animation='';

            });

        }

    });

}

const boxes =
document.querySelectorAll('.animate-box');

function boxAnimation(){

    boxes.forEach(box=>{

        const rect =
        box.getBoundingClientRect();

        if(rect.top < window.innerHeight * 0.85){

            box.classList.add('show');

        }else{

            box.classList.remove('show');

        }

    });

}

window.addEventListener('scroll',()=>{

    letterAnimation();
    boxAnimation();

});

window.addEventListener('load',()=>{

    letterAnimation();
    boxAnimation();

});
