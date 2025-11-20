/* ============================================================
   generator-ui.js (완성본)
   - 옵션 카드 생성 UI
   - SortableJS 정렬
   - generateHTML / CSS / JS 호출
   - value-toggle 정상 작동 패치
============================================================ */

import {
    generateHTML,
    generateCSS,
    generateJS,
    fieldPriority,
    regionMap
} from "./generator-core.js";

import { FieldTemplates } from "./templates.js";

/* DOM */
const optionContainer = document.querySelector("#detail-option-container");
const resultArea = document.querySelector("#result-area");
const previewBox = document.querySelector("#preview-box");
const previewTarget = document.querySelector("#preview-target");

let generatedHTML = "";
let generatedCSS = "";
let generatedJS = "";

const baseFields = new Set();

/* ============================================================
   1. 기본 필드 토글
============================================================ */
document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");

        const field = btn.dataset.field;
        if (btn.classList.contains("active")) baseFields.add(field);
        else baseFields.delete(field);
    });
});

/* ============================================================
   2. 옵션 카드 템플릿
============================================================ */

const iconMap = {
    short: "&#9786;",  // ☺
    long: "&#9786;",
    radio: "&#9743;", // ✣
    multi: "&#9872;", // ⚑
    select: "&#9872;"
};

const typeName = {
    short: "단문 입력기",
    long: "장문 입력기",
    radio: "단일 선택 옵션",
    multi: "다중 선택 옵션",
    select: "Select 옵션"
};

function defaultName(type) {
    return {
        short: "option2",
        long: "option5",
        radio: "option1",
        multi: "option7",
        select: "option8",
    }[type] || "optionX";
}

function createOptionCard(type) {
    const id = "opt_" + Date.now();
    const hasValueInput = ["radio", "multi", "select"].includes(type);

    return `
<div class="option-card" data-id="${id}" data-type="${type}">
    <div class="option-card-header">
        <span class="option-icon">${iconMap[type]}</span>
        <span class="option-title">${typeName[type]}</span>
        <button class="opt-del-btn" data-id="${id}">×</button>
    </div>

    <div class="row">
        <label>옵션 name</label>
        <input type="text" class="opt-name" value="${defaultName(type)}">
    </div>

    <div class="row">
        <label>라벨(Label)</label>
        <input type="text" class="opt-label" placeholder="사용자에게 보이는 제목">
    </div>

    ${
        hasValueInput
            ? `
        <div class="row">
            <label>옵션 Label 목록</label>
            <textarea class="opt-label-list" placeholder="콤마로 구분"></textarea>
        </div>

        <button class="opt-toggle-values">Value 입력 열기 ▼</button>

        <div class="value-box hidden">
            <label>Value 목록</label>
            <textarea class="opt-value-list" placeholder="라벨과 다를 때만 입력"></textarea>
            <p class="hint">입력 안 하면 label 값 그대로 value로 사용됩니다.</p>
        </div>
        `
            : ""
    }
</div>
`;
}

/* ============================================================
   3. 옵션 카드 추가
============================================================ */
document.querySelector(".detail-buttons").addEventListener("click", e => {
    if (!e.target.classList.contains("detail-add")) return;
    const type = e.target.dataset.type;

    optionContainer.insertAdjacentHTML("beforeend", createOptionCard(type));

    applySortable();
});

/* Sortable 적용 */
function applySortable() {
    Sortable.create(optionContainer, {
        animation: 150,
        handle: ".option-card-header",
        ghostClass: "drag-ghost"
    });
}

/* ============================================================
   4. 동적 이벤트 바인딩 (삭제 + value-toggle)
============================================================ */

optionContainer.addEventListener("click", e => {

    /* 삭제 버튼 */
    if (e.target.classList.contains("opt-del-btn")) {
        const card = e.target.closest(".option-card");
        card.remove();
        return;
    }

    /* value 열기/닫기 */
    if (e.target.classList.contains("opt-toggle-values")) {
        const card = e.target.closest(".option-card");
        const box = card.querySelector(".value-box");
        
        // [수정!] 'hidden' 대신 CSS에 정의된 'open' 클래스를 토글합니다.
        box.classList.toggle("open"); 
        
        // 버튼 텍스트 변경 로직도 'open' 클래스 확인으로 변경합니다.
        e.target.textContent = box.classList.contains("open")
            ? "Value 입력 닫기 ▲"
            : "Value 입력 열기 ▼";
        
        return;
    }
});

/* ============================================================
   5. 폼 생성 버튼
============================================================ */
document.querySelector("#generate").addEventListener("click", () => {
    const formName = document.querySelector(".form-name").value || "withus-form";
    const popURL = document.querySelector(".pop-url").value || "/privacy.html";

    const optionNodes = [...document.querySelectorAll(".option-card")];

    const optionList = optionNodes.map(card => {
        const type = card.dataset.type;

        return {
            type,
            name: card.querySelector(".opt-name").value.trim(),
            title: card.querySelector(".opt-label").value.trim(),
            labels:
                card.querySelector(".opt-label-list")?.value
                    .split(",").map(s => s.trim()).filter(Boolean) || [],
            values:
                card.querySelector(".opt-value-list")?.value
                    .split(",").map(s => s.trim()).filter(Boolean) || [],
            maxLen: fieldPriority[type] || 10
        };
    });

    optionList.sort((a, b) => b.maxLen - a.maxLen);

    generatedHTML = generateHTML(formName, [...baseFields], optionList);
    generatedCSS = generateCSS();
    generatedJS = generateJS(popURL, formName);

    resultArea.textContent = generatedHTML;
});

/* ============================================================
   6. 탭 전환
============================================================ */
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.dataset.target;

        if (target === "html") resultArea.textContent = generatedHTML;
        else if (target === "css") resultArea.textContent = generatedCSS;
        else if (target === "js") resultArea.textContent = generatedJS;
    });
});

/* ============================================================
   7. 미리보기
============================================================ */
document.querySelector("#previewBtn").onclick = () => {
    if (!generatedHTML) {
        alert("먼저 폼을 생성하세요!");
        return;
    }

    previewBox.style.display = "block";
    previewTarget.innerHTML = generatedHTML;

    /* CSS 적용 */
    const styleEl = document.querySelector("#preview-style") || document.createElement("style");
    styleEl.id = "preview-style";
    styleEl.textContent = generatedCSS;
    document.head.appendChild(styleEl);

    bindPreviewEvents();
};

function bindPreviewEvents() {
    /* 지역 처리 */
    const prov = previewTarget.querySelector("#province");
    const city = previewTarget.querySelector("#city");

    if (prov && city) {
        prov.addEventListener("change", () => {
            const list = regionMap[prov.value] || [];
            city.innerHTML = "<option value=''>시/군/구</option>";

            list.forEach(c => {
                const o = document.createElement("option");
                o.value = c;
                o.textContent = c;
                city.appendChild(o);
            });
        });
    }

    /* 미리보기 내 form submit 방지 */
    const form = previewTarget.querySelector("form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            alert("미리보기에서는 제출되지 않습니다.");
        });
    }
}

/* ============================================================
   8. 복사하기
============================================================ */
document.querySelector("#copyBtn").onclick = () => {
    navigator.clipboard.writeText(resultArea.textContent);
    alert("복사되었습니다!");
};

/* ============================================================
   9. 초기화
============================================================ */
document.querySelector("#resetBtn").onclick = () => {
    document.querySelector(".form-name").value = "";
    document.querySelector(".pop-url").value = "";

    baseFields.clear();
    document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));

    optionContainer.innerHTML = "";
    resultArea.textContent = "폼 생성 버튼을 눌러보세요.";

    previewBox.style.display = "none";
    previewTarget.innerHTML = "";

    generatedHTML = "";
    generatedCSS = "";
    generatedJS = "";
};
