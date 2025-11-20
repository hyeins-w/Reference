// ==============================
// templates.js
// ==============================

export const FieldTemplates = {

    /* ------------------------------
       1. 성함(name)
    ------------------------------ */
    name: () => `
<div class="fg-item">
    <div class="input-name"><p>성함</p></div>
    <div class="input-box">
        <input type="text" name="name" class="user-name" placeholder="성함" required />
    </div>
</div>
`,

    /* ------------------------------
       2. 연락처(phone)
       전화번호 구조: tel1 / tel2 / tel3
    ------------------------------ */
    phone: () => `
<div class="fg-item">
    <div class="input-name"><p>연락처</p></div>
    <div class="input-box telBox">
        <div>
            <select name="tel1" class="ph-Num1">
                <option>010</option>
                <option>011</option>
                <option>016</option>
                <option>017</option>
            </select>
        </div>
        <p></p>
        <input type="text" maxlength="4" name="tel2" class="ph-Num2" required 
               placeholder="연락처" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
        <p></p>
        <input type="text" maxlength="4" name="tel3" class="ph-Num2" required 
               placeholder="연락처" oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
    </div>
</div>
`,

    /* ------------------------------
       3. 지역(place)
       province(도/시 선택) + city(구/군 선택)
    ------------------------------ */
    place: () => `
<div class="fg-item">
    <div class="input-name"><p>지역</p></div>
    <div class="place-row">
        <div class="select-wrapper">
            <select id="province" name="province">
                <option value="">시/도</option>
                <option value="서울특별시">서울</option>
                <option value="경기도">경기</option>
                <option value="인천광역시">인천</option>
                <option value="부산광역시">부산</option>
                <option value="대구광역시">대구</option>
                <option value="광주광역시">광주</option>
                <option value="대전광역시">대전</option>
                <option value="울산광역시">울산</option>
                <option value="세종특별자치시">세종</option>
                <option value="강원도">강원</option>
                <option value="충청북도">충북</option>
                <option value="충청남도">충남</option>
                <option value="경상북도">경북</option>
                <option value="경상남도">경남</option>
                <option value="전라북도">전북</option>
                <option value="전라남도">전남</option>
                <option value="제주특별자치도">제주</option>
            </select>
        </div>

        <div class="select-wrapper">
            <select id="city" name="city">
                <option value="">시/군/구</option>
            </select>
        </div>
    </div>
</div>
`,

    /* ------------------------------
       4. 단문 입력기 (short)
       opt.title, opt.placeholder, opt.name
    ------------------------------ */
    short: (opt) => `
<div class="fg-item">
    <div class="input-name"><p>${opt.title}</p></div>
    <div class="input-box">
        <input type="text"
               name="${opt.name}"
               placeholder="${opt.placeholder || '입력해주세요'}"/>
    </div>
</div>
`,

    /* ------------------------------
       5. 장문 입력기 (long)
    ------------------------------ */
    long: (opt) => `
<div class="fg-item">
    <div class="input-name"><p>${opt.title}</p></div>
    <div class="input-box">
        <textarea name="${opt.name || 'option5'}"
                  rows="4"
                  placeholder="내용을 입력해주세요"></textarea>
    </div>
</div>
`,

    /* ------------------------------
       6. 단일 선택 옵션 (radio)
       opt.labels[], opt.values[]
    ------------------------------ */
    radio: (opt) => {
        const labels = opt.labels.length ? opt.labels : ["옵션1", "옵션2"];
        const values = opt.values.length ? opt.values : labels;

        const items = labels.map((lb, i) => `
            <input type="radio" id="${opt.name}_${i}" name="${opt.name}" value="${values[i]}" required>
            <label for="${opt.name}_${i}">${lb}</label>
        `).join("");

        return `
<div class="fg-item">
    <div class="input-name"><p>${opt.title}</p></div>
    <div class="input-box">
        <div class="radio-group">
            ${items}
        </div>
    </div>
</div>
`;
    },

    /* ------------------------------
       7. 다중 선택 옵션 (multi)
    ------------------------------ */
    multi: (opt) => {
        const labels = opt.labels.length ? opt.labels : ["옵션1", "옵션2", "옵션3"];
        const values = opt.values.length ? opt.values : labels;

        const items = labels.map((lb, i) => `
            <div class="multi-option" data-value="${values[i]}">${lb}</div>
        `).join("");

        return `
<div class="fg-item">
    <div class="input-name"><p>${opt.title}</p></div>
    <div class="input-box">
        <input type="text" name="${opt.name}" hidden>
        <div class="multi-group" data-name="${opt.name}">
            ${items}
        </div>
    </div>
</div>
`;
    },

    /* ------------------------------
       8. Select 옵션
    ------------------------------ */
    select: (opt) => {
        const labels = opt.labels.length ? opt.labels : ["선택1", "선택2"];
        const values = opt.values.length ? opt.values : labels;

        const items = labels.map((lb, i) =>
            `<option value="${values[i]}">${lb}</option>`
        ).join("");

        return `
<div class="fg-item">
    <div class="input-name"><p>${opt.title}</p></div>
    <div class="input-box">
        <select name="${opt.name}">
            <option value="">선택해주세요</option>
            ${items}
        </select>
    </div>
</div>
`;
    }

};
