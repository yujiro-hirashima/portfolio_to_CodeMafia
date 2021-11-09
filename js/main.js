window.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.maple-container');

  const createContent = (img)=>{
    const mapleEl = document.createElement('img');

    mapleEl.className = 'maple';
    mapleEl.src       = img;

    const minSize = 10;
    const maxSize = 50;
    const size    = Math.random() * (maxSize + 1 - minSize) + minSize;

    mapleEl.style.width  = `${size}px`;
    mapleEl.style.height = `${size}px`;
    mapleEl.style.left   = Math.random() * innerWidth + 'px';
    mapleEl.style.zIndex = 3;

    section.appendChild(mapleEl);

    setTimeout(() => {mapleEl.remove();}, 10000);

  }

  const createMaple       = () => {createContent("https://yujiro-portfolio.net/wp-content/themes/yujiro_theme/img/momiji.png")       ;}
  const createOrangeMaple = () => {createContent("https://yujiro-portfolio.net/wp-content/themes/yujiro_theme/img/momiji_orange.png");}
  const createGinkgo      = () => {createContent("https://yujiro-portfolio.net/wp-content/themes/yujiro_theme/img/ityo.png")         ;}


  setInterval(createMaple      , 2000);
  setInterval(createOrangeMaple,  600);
  setInterval(createGinkgo     , 1500);
  
  
  const animationTarget = document.querySelectorAll('.textAnimation');
  for(i=0; i<animationTarget.length; i++){
    const target = animationTarget[i],
    texts  = target.textContent,
    textsArray = [];
    
    target.textContent = '';
    
    for(j=0; j < texts.split('').length; j++){
      const t = texts.split('')[j];
      if(t === ' '){
        textsArray.push(' ');
      }else{
        textsArray.push('<span><span style="animation: showText cubic-bezier(.54,.73,.13,.84) 2s ' + (j * .1 + i * .5) + 's backwards;">' + t + '</span></span>');
      }
    }
    
    for(k=0;  k < textsArray.length; k++){
      target.innerHTML += textsArray[k];
    }
  }
});
