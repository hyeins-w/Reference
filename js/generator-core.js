/* ===========================================================
   generator-core.js
   - HTML / CSS / JS 생성 엔진
   - generator-ui.js에서 호출됨
=========================================================== */

import { FieldTemplates } from "./templates.js";

/* ===========================================================
   지역 데이터(regionMap)
=========================================================== */
export const regionMap = {
    "서울특별시": ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
    "부산광역시": ['강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구'],
    "인천광역시": ['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],
    "대구광역시": ['남구','달서구','달성군','동구','북구','서구','수성구','중구'],
    "광주광역시": ['광산구','남구','동구','북구','서구'],
    "대전광역시": ['대덕구','동구','서구','유성구','중구'],
    "울산광역시": ['남구','동구','북구','울주군','중구'],
    "세종특별자치시": ['세종시'],
    "경기도": ['가평군','고양시','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','성남시','수원시','시흥시','안산시','안성시','안양시','양주시','양평군','여주시','연천군','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','포천시','하남시','화성시'],
    "강원도": ['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','정선군','철원군','춘천시','태백시','평창군','홍천군','화천군','횡성군'],
    "충청북도": ['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','진천군','청주시','충주시'],
    "충청남도": ['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','예산군','천안시','청양군','태안군','홍성군'],
    "경상북도": ['경산시','경주시','고령군','구미시','군위군','김천시','문경시','봉화군','상주시','성주군','안동시','영덕군','영양군','영주시','영천시','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군','포항시'],
    "경상남도": ['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시','창녕군','창원시','통영시','하동군','함안군','함양군','합천군'],
    "전라북도": ['고창군','군산시','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시','정읍시','진안군'],
    "전라남도": ['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군','여수시','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군'],
    "제주특별자치도": ['서귀포시','제주시']
};


/* ===========================================================
   필드 정렬 우선순위
=========================================================== */
export const fieldPriority = {
    long: 85,
    multi: 33,
    radio: 10,
    short: 10,
    select: 10
};


/* ===========================================================
   HTML 생성기
=========================================================== */
export function generateHTML(formName, baseFields, optionList) {

    let html = `<form method="post" action="apply.html" class="formsBox" name="${formName}">\n`;

    /* 1. 기본 필드 */
    baseFields.forEach(f => {
        if (FieldTemplates[f]) {
            html += FieldTemplates[f]() + "\n";
        }
    });

    /* 2. 옵션 필드 */
    optionList.forEach(opt => {
        html += FieldTemplates[opt.type](opt) + "\n";
    });

    /* 3. 개인정보 + 제출 */
    html += `
<div class="check-agree">
    <label><input type="checkbox" checked required /> 개인정보 처리방침 동의</label>
    <span class="show-privacy">[약관보기]</span>
</div>

<button type="submit" class="subBtn">빠른 상담 신청하기</button>
</form>
`;

    return html;
}


/* ===========================================================
   CSS 생성기
   (폼 단독 사용이 가능한 최소 스타일)
=========================================================== */
export function generateCSS() {
    return `
/* 폼 박스 */
.formsBox {
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #fff;
    margin: 0 auto;
}

/* 항목 */
.fg-item { margin-bottom: 18px; }
.input-name { margin-bottom: 6px; font-weight: 600; }

/* input */
input[type="text"], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1.5px solid #bbb;
    border-radius: 6px;
    font-size: 1rem;
}

/* 전화번호 */
.telBox { display: flex; align-items: center; gap: 6px; }
.telBox p { font-weight: bold; }

/* 지역 */
.place-row { display: flex; gap: 10px; }

/* 라디오 */
.radio-group { display: flex; flex-wrap: wrap; gap: 8px; }
.radio-group input[type="radio"] { display:none; }
.radio-group label {
    padding: 10px 14px;
    border: 1.5px solid #bbb;
    border-radius: 6px;
    cursor: pointer;
}
.radio-group input:checked + label {
    background: #3691ff;
    color: #fff;
    border-color: #3691ff;
}

/* 멀티 */
.multi-group { display: flex; flex-wrap: wrap; gap: 8px; }
.multi-option {
    padding: 10px 14px;
    border: 1.5px solid #bbb;
    border-radius: 6px;
    cursor: pointer;
}
.multi-option.active {
    background: #ff8a00;
    color: #fff;
    border-color: #ff8a00;
}

/* 개인정보 */
.check-agree {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
}
.show-privacy { color:#007acc; cursor:pointer; text-decoration: underline; }

/* 제출 */
.subBtn {
    width: 100%;
    padding: 16px;
    background: #3691ff;
    border: none;
    color: #fff;
    border-radius: 8px;
    font-size: 1.15rem;
    margin-top: 18px;
}
`;
}


/* ===========================================================
   JS 생성기
=========================================================== */
export function generateJS(popURL, formName) {

    return `
// ===== 지역 선택 =====
const regionMap = ${JSON.stringify(regionMap)};
const prov = document.querySelector("#province");
const city = document.querySelector("#city");

if (prov && city) {
    prov.addEventListener("change", () => {
        const list = regionMap[prov.value] || [];
        city.innerHTML = '<option value="">시/군/구</option>';
        list.forEach(c => {
            const op = document.createElement("option");
            op.value = c;
            op.textContent = c;
            city.appendChild(op);
        });
    });
}


// ===== 멀티 선택 =====
document.querySelectorAll(".multi-group").forEach(group => {
    const fieldName = group.dataset.name;
    const hidden = group.parentElement.querySelector("input[name='"+fieldName+"']");
    let selected = new Set();

    group.querySelectorAll(".multi-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.dataset.value;

            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                selected.delete(val);
            } else {
                btn.classList.add("active");
                selected.add(val);
            }

            hidden.value = Array.from(selected).join(",");
        });
    });
});


// ===== 약관 팝업 =====
document.querySelector(".show-privacy")?.addEventListener("click", () => {
    const pop = window.open("${popURL}", "privacy",
        "width=600,height=500,scrollbars=yes"
    );
    if (!pop) alert("팝업 차단이 되어 있습니다.");
});


// ===== 폼 위치로 스크롤 =====
function movSecton() {
    const f = document.querySelector("form[name='${formName}']");
    if (!f) return;
    const y = f.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior:"smooth" });
}
`;
}
