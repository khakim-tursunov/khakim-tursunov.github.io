let doc = document, 
    curent = 0,
    sliderItem = document.querySelectorAll('.slider-item'),
    sliderWidth = document.querySelector('.slider-item').offsetWidth,
    accordionTitle = document.querySelectorAll('.accordion-title');

let slider = {
    prev() {
        curent--;
        sliderItem[curent].style.marginLeft = '0px';

    },
    next() {
        sliderItem[curent].style.marginLeft = -sliderWidth + 'px';
        curent++;
    },
    disablePrev() {
        if (curent == 0) {
            doc.querySelector('.slide-prev').classList.add('disable');
        } else {
            doc.querySelector('.slide-next').classList.remove('disable');
        }
    },
    disableNext() {
        if (curent + 1 == sliderItem.length) {
            doc.querySelector('.slide-next').classList.add('disable');
        }  else {
            doc.querySelector('.slide-prev').classList.remove('disable');
        }
    }
}

doc.querySelector('.slide-prev').addEventListener('click', ()=> {
    slider.prev();
    slider.disablePrev();
});

doc.querySelector('.slide-next').addEventListener('click', ()=> {
    slider.next();
    slider.disableNext();
});

accordionTitle.forEach(item => {
    item.addEventListener('click', ()=> {
        item.nextElementSibling.classList.toggle('active');
    });
});

