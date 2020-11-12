let doc = document,
    menuWrapper = doc.querySelector('.menu-wrap'),
    menu = doc.querySelector('.menu'),
    menuItems = menu.querySelectorAll('ul li'),
    menuFirstItems = doc.querySelector('.menu-list').children,
    menuWrapperWidth = menuWrapper.offsetWidth;
    init();
    hover();
    hideItems();

function init() {
    menuItems.forEach(element => {
        let $this = element;
        let subMenu = $this.querySelectorAll('.submenu');
    
        if (subMenu.length > 0) {
            $this.classList.add('has-submenu');
        }
    });
}

function hover() {
    let submenuItems = doc.querySelectorAll('.has-submenu');

    submenuItems.forEach(element => {
        let $this = element;
        
        $this.addEventListener('mouseenter', ()=> {
            $this.querySelector('.submenu').style.display="block";
            ulCoords = $this.querySelector('.submenu').getBoundingClientRect().right;
            
            if (ulCoords > menuWrapperWidth) {
                $this.querySelector('.submenu').classList.add('left');
            } else if (ulCoords < 0) {
                $this.querySelector('.submenu').classList.remove('left');
            }
        });
    
        $this.addEventListener('mouseleave', ()=> {
            $this.querySelector('.submenu').style.display="none";
        });
    });
}

window.addEventListener('resize', ()=> {
    hideItems();
});

function hideItems() {
    let widthLimit = menuWrapperWidth,
        moreButton = doc.createElement('div'),
        moreContainer = doc.createElement('div'),
        moreElement = doc.createElement('li'),
        moreLink = doc.createElement('a'),

        itemsToHide = [];
    
    for (let item of menuFirstItems) {
        widthLimit -= item.offsetWidth;

        if (widthLimit < 170) {
            itemsToHide.push(item);
        }
    }

    moreButton.classList.add('more-button');
    moreContainer.classList.add('more-container');
    moreElement.classList.add('more-element');
    moreLink.classList.add('more-link');

    menu.append(moreButton);
    moreButton.append(moreContainer);

    for (let item in itemsToHide) {
        moreContainer.append(itemsToHide[item]);
    }

    let moreBtn = doc.querySelector('.more-button')
        moreCon = doc.querySelector('.more-container');
        

    moreBtn.addEventListener('mouseenter', ()=> {
        moreCon.style.display="block";
    });

    moreBtn.addEventListener('mouseleave', ()=> {
        moreCon.style.display="none";
    });
}

