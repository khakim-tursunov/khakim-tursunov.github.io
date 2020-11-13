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
            $this.querySelector('.submenu').classList.add('active');
            ulRightCoords = $this.querySelector('.submenu').getBoundingClientRect().right;
            ulLeftCoords = $this.querySelector('.submenu').getBoundingClientRect().left;
            
            if (ulRightCoords || ulLeftCoords > menuWrapperWidth) {
                $this.querySelector('.submenu').classList.add('left');
            } else if (ulCoords < 0) {
                $this.querySelector('.submenu').classList.remove('left');
            }
        });
    
        $this.addEventListener('mouseleave', ()=> {
            $this.querySelector('.submenu').classList.remove('active');
        });
    });
}

function hideItems() {
    let widthLimit = menuWrapperWidth,
        moreElement = doc.createElement('div'),
        moreButtonElement = doc.createElement('a'),
        moreContainerElement = doc.createElement('div'),
        itemsToHide = [];
    
    for (let item of menuFirstItems) {
        widthLimit -= item.offsetWidth;

        if (widthLimit < 170) {
            itemsToHide.push(item);
        }
    }

    moreElement.classList.add('more-btn');
    moreContainerElement.classList.add('more-container');

    menu.append(moreElement);
    moreElement.append(moreButtonElement);
    moreElement.append(moreContainerElement);

    moreButtonElement.href="#";
    moreButtonElement.innerHTML="...";

    for (let item in itemsToHide) {
        moreContainerElement.append(itemsToHide[item]);
    }
    
    let moreButton = doc.querySelector('.more-btn'),
        moreContainer = doc.querySelector('.more-container'),
        moreItems = moreContainer.querySelectorAll('li');

    moreItems.forEach(item => {
        item.classList.add('more-item');
    });

    moreButton.addEventListener('mouseenter', ()=> {
        moreContainerElement.classList.add('active');
    });

    moreButton.addEventListener('mouseleave', ()=> {
        moreContainer.classList.remove('active');
    });
}