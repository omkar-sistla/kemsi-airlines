menu_expand=document.querySelector("#TOP_ELEMENT>i");
top_element=document.querySelector("#TOP_ELEMENT");
menu=document.querySelector(".menu");
menu_expand.onclick = function(){
    menu.classList.toggle("active");
    if (menu.classList.contains("active") && window.scrollY<=100){
        top_element.classList.add("scrolled");
    }
    else if(window.scrollY<=100){
        top_element.classList.remove("scrolled");
    }
}

window.onscroll = function(){
    if (window.scrollY>100 || menu.classList.contains("active")) {
        top_element.classList.add("scrolled");
    }
    else {
        top_element.classList.remove("scrolled");
    }
    
}

const card_sections=document.querySelectorAll(".card_section");
card_sections.forEach((card_section)=>{
    const card_slider=card_section.querySelector(".card_slider");
    const sliders=card_section.querySelectorAll(".sliders");
    const first_card_width=card_slider.querySelector(".card").offsetWidth;
    const card_sliderChildrens=[...card_slider.children];

    let isDragging = false, startX, startScrollLeft,timeoutId;
    let cardPerView = Math.round(card_slider.offsetWidth/first_card_width);

    //code for dragging   
    const dragStart=(e)=>{
        isDragging=true;
        card_slider.classList.add("drag");
        startX=e.pageX;
        startScrollLeft=card_slider.scrollLeft;
    }
    const dragStop=(e)=>{
        isDragging=false;
        card_slider.classList.remove("drag");
    }
    const dragging=(e)=>{
        if(!isDragging) return;
        card_slider.scrollLeft=startScrollLeft-(e.pageX-startX);
    }    

    //code for buttons
    sliders.forEach(slider => {
        slider.addEventListener("click",()=>{
            card_slider.scrollLeft += slider.className.includes("left") ? -first_card_width : first_card_width;
        })
    });

    //code for infinite scrolling   
    card_sliderChildrens.slice(-cardPerView).reverse().forEach(card =>{
        card_slider.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    card_sliderChildrens.slice(0,cardPerView).forEach(card =>{
        card_slider.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    const infiniteScroll=()=>{
        if(card_slider.scrollLeft===0){
            card_slider.classList.add("notransition");
            card_slider.scrollLeft = card_slider.scrollWidth - (2*card_slider.offsetWidth);
            card_slider.classList.remove("notransition");
        }
        else if(Math.ceil(card_slider.scrollLeft)===card_slider.scrollWidth-card_slider.offsetWidth){
            card_slider.classList.add("notransition");
            card_slider.scrollLeft=card_slider.offsetWidth;
            card_slider.classList.remove("notransition");
        }
        clearTimeout(timeoutId);
        if(!card_section.matches(":hover")) autoplay();
    }        

    //code for autoplay
    const autoplay= () => {
        if(window.innerWidth < 680 ) return;
        timeoutId = setTimeout(() => card_slider.scrollLeft+=first_card_width, 1500);
    }
    autoplay();

    card_slider.addEventListener("mousedown",dragStart);
    card_slider.addEventListener("mousemove",dragging);
    window.addEventListener("mouseup",dragStop);
    card_slider.addEventListener("scroll",infiniteScroll);
    card_section.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    card_section.addEventListener("mouseleave", autoplay);        
})

