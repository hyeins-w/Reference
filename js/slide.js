// 모든 로딩 박스 반복
document.querySelectorAll('.loadBox').forEach(box => {
    const showBtn = box.querySelector('.showBtn');
    const copyCssBtn = box.querySelector('.copyCssBtn');
    const copyHtmlBtn = box.querySelector('.copyHtmlBtn');
    const copyJsBtn = box.querySelector('.copyJsBtn');
    const hideCode = box.querySelector('.hideCode');
    const codes = box.querySelectorAll('pre code');

    // 코드 보기 버튼
    showBtn.addEventListener('click', () => {
        hideCode.classList.toggle('open');
        showBtn.textContent = hideCode.classList.contains('open') ? '코드 숨기기' : '코드 보기';
    });

    // CSS 복사
    copyCssBtn.addEventListener('click', () => {
        const cssCode = codes[0].innerText.trim();
        navigator.clipboard.writeText(cssCode)
            .then(() => alert('CSS 코드가 복사되었습니다!'))
            .catch(() => alert('복사 실패. 브라우저 권한을 확인하세요.'));
    });

    // HTML 복사
    copyHtmlBtn.addEventListener('click', () => {
        const htmlCode = codes[1].innerText.trim();
        navigator.clipboard.writeText(htmlCode)
            .then(() => alert('HTML 코드가 복사되었습니다!'))
            .catch(() => alert('복사 실패. 브라우저 권한을 확인하세요.'));
    });

    // JS 복사
    copyJsBtn.addEventListener('click', () => {
        const jsCode = codes[2]?.innerText.trim();
        if(jsCode){
            navigator.clipboard.writeText(jsCode)
                .then(() => alert('JS 코드가 복사되었습니다!'))
                .catch(() => alert('복사 실패. 브라우저 권한을 확인하세요.'));
        } else {
            alert('복사할 JS 코드가 없습니다.');
        }
    });

    new Splide('.splide1', {
        type   : 'loop',
        drag   : 'none',
        focus  : 'center',
        perPage: 3,
        autoHeight: true,
        autoScroll: { speed: 0.5 },
        arrows: false,
        pagination: false,
        gap: '0.5em',
    }).mount(window.splide.Extensions);

    const primarySlider = new Splide('.splide2', {
        type : 'loop',
        perPage  : 1,
        perMove  : 1,
        gap  : '0.5rem',
        arrows : false,
        pagination: false,
        autoplay : true,
        interval : 3000,
        pauseOnHover: false,
    }).mount();

    const secondarySlider = new Splide('.splide3', {
        type : 'loop',
        perPage : 3,
        perMove : 1,
        gap : '0.5rem',
        arrows: false,
        pagination: false,
        autoplay : false,
        interval : 3000,
        pauseOnHover: false,
        focus: 'center',
        trimSpace: false,
    }).mount();

    primarySlider.on('move', (newIndex) => {
        secondarySlider.go(newIndex);
    });

    primarySlider.on('autoplay:play', () => { secondarySlider.play(); });
    primarySlider.on('autoplay:pause', () => { secondarySlider.pause(); });
    secondarySlider.go(primarySlider.index);

    const splide6 = new Splide('#promo', {
        type: 'loop',
        focus: 'center',
        perPage: 3,
        gap: '1em',
        pagination: false,
        arrows: false,
        drag: false,
        snap: false,
        speed: 700,
        autoplay: true,
        interval: 2600,
        pauseOnHover: false,
    }).mount();

    const root   = splide6.root;
    const track6  = root.querySelector('.splide__track');
    const slides6 = root.querySelectorAll('.splide__slide');

    function updateScales(){
        const rect6    = track6.getBoundingClientRect();
        const centerX = rect6.left + rect6.width / 2;
        const maxDist = rect6.width / 2;

        slides6.forEach((li) => {
            const card = li.querySelector('.card6');
            const r = li.getBoundingClientRect();
            const slideCenter = r.left + r.width / 2;
            const dist  = Math.abs(centerX - slideCenter);
            const t = Math.max(0, 1 - dist / maxDist);

            const scale = 0.68 + t * (1.2 - 0.88);
            const blurPx = (1 - t) * 1;
            const bright = 0.6 + t * 0.4;
            const opacity = 0.7 + t * 0.3;

            card.style.transform = `scale(${scale}) translateY(0.333em)`;
            card.style.filter    = `blur(${blurPx}px) brightness(${bright})`;
            card.style.opacity   = opacity;
        });

        requestAnimationFrame(updateScales);
    }

    requestAnimationFrame(updateScales);

    /* --------- 지역 데이터 / 티커 --------- */
    const regionMap = {
        '서울특별시': ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
        '부산광역시': ['강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구'],
        '인천광역시': ['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],
        '대구광역시': ['남구','달서구','달성군','동구','북구','서구','수성구','중구'],
        '광주광역시': ['광산구','남구','동구','북구','서구'],
        '대전광역시': ['대덕구','동구','서구','유성구','중구'],
        '울산광역시': ['남구','동구','북구','울주군','중구'],
        '세종특별자치시': ['세종시'],
        '경기도': ['가평군','고양시','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시','수원시','시흥시','안산시','안성시','안양시','양주시','양평군','여주시','연천군','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시'],
        '강원도': ['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군','화천군','횡성군'],
        '충청북도': ['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','진천군','청주시','충주시'],
        '충청남도': ['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시','청양군','태안군','홍성군'],
        '경상북도': ['경산시','경주시','고령군','구미시','군위군','김천시','문경시','봉화군','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군','포항시'],
        '경상남도': ['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원시','통영시','하동군','함안군','함양군','합천군'],
        '전라북도': ['고창군','군산시','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시','정읍시','진안군'],
        '전라남도': ['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군'],
        '제주특별자치도': ['서귀포시','제주시']
    };

    const names = ['김*수', '박*현', '이*연', '최*우', '한*리', '정*석','윤*빈','오*우','송*철','강*경','배*진', '신*호','조*연','서*우','임*선','문*아','남*혁','홍*지','권*림','노*찬','장*혁','유*은','하*리','백*성','곽*진','안*별','심*윤','전*현','류*재','도*빈'];

    function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }

    function getRandomAddress() {
        const provinces = Object.keys(regionMap);
        const randomProv = provinces[Math.floor(Math.random() * provinces.length)];

        const cities = regionMap[randomProv];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];

        const shortProv = randomProv.replace(/특별시|광역시|도|자치시|자치도/g,'').substring(0,2);

        return `${shortProv} ${randomCity}`;
    }

    function generateTickerList(count = 10) {
        const listEl = document.querySelector('.ticker-list');
        listEl.innerHTML = '';
        const formattedDate = getFormattedDate();

        let uniqueListContent = '';

        for (let i = 0; i < count; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAddress = getRandomAddress();

            uniqueListContent += `
                <li>
                    <div>${formattedDate}</div>
                    <div>${randomName}</div>
                    <div>${randomAddress}</div>
                </li>
            `;
        }

        listEl.innerHTML = uniqueListContent;
        listEl.innerHTML += uniqueListContent;
    }

    generateTickerList();

});

$(document).ready(function(){
    $('.your-class').slick({
        centerMode: true,
        centerPadding: '20%',
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true
    });
});