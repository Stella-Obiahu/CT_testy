 const carousel = document.querySelector(".carousel");
 firstImg = carousel.querySelectorAll("img")[0];
 arrowIcons = document.querySelectorAll(".wrapper i");

 let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

 const showHideIcon = () => {
     let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
     arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
     arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";

 }

 arrowIcons.forEach(icon => {
     icon.addEventListener("click", () => {
         let firstImgWidth = firstImg.clientWidth + 14;
         carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() =>  showHideIcon(), 60);
     })
 });

 const autoSlide = () => {
     if (carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return;
     positionDiff = Math.abs(positionDiff);
     let firstImgWidth = firstImg.clientWidth + 14;
     let valDifference = firstImgWidth - positionDiff;
     if (carousel.scrollLeft > prevScrollLeft) {
         return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
     }
     carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : positionDiff;
 }

 const dragStart = (e) => {
     isDragStart = true;
     prevPageX = e.pageX || e.touches[0].pageX;
     prevScrollLeft = carousel.scrollLeft;  
 }

 const dragging = (e) => {
     if (!isDragStart) return;
     e.preventDefault();
     isDragging = true;
     carousel.classList.add("dragging");
     positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
     carousel.scrollLeft = prevScrollLeft - positionDiff;
     showHideIcon();
 }

 const dragStop = () => {
     isDragStart = false;
     carousel.classList.remove("dragging");
     if (!isDragging) return;
     isDragging = false;
     autoSlide();
 }

 carousel.addEventListener("mousedown" , dragStart);
 carousel.addEventListener("touchstart" , dragStart);


 carousel.addEventListener("mousemove" , dragging);
 carousel.addEventListener("touchmove" , dragging);

 carousel.addEventListener("mouseup" , dragStop);
 carousel.addEventListener("mouseleave" , dragStop);
 carousel.addEventListener("touchend" , dragStop);



 let tabItems = document.querySelectorAll('.tab-item');
 let tabPanels = document.querySelectorAll('.tab-panel');
 function activateTab(index) {
    tabItems.forEach(item => item.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    tabItems[index].classList.add('active');
    tabPanels[index].classList.add('active');
 }

 tabItems.forEach((item, index) => {
    item.addEventListener('click', () =>{
        activateTab(index);
    });
 });
 window.addEventListener('resize', () =>{
    if (window.innerWidth <= 768){
        tabItems.forEach(item =>{
            item.removeEventListener('click', activateTab);
            item.addEventListener('click', () => {
                item.classList.toggle('active');
                let panel = item.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    } else {
        tabItems.forEach((item, index) =>{
            item.removeEventListener('click', () =>{
                activateTab(index);
            });
            item.addEventListener('click', () =>{
                activateTab(index);
            });
            item.classList.remove('active');
            tabPanels[index].classList
        });
    }
 })