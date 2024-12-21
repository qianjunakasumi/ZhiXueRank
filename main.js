// Copyright (c) 2022 qianjunakasumi <{official, i}@qianjunakasumi{.moe, @{gmail, outlook}.com}>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://github.com/qianjunakasumi/ZhiXueRank/blob/main/LICENSE.

// ==UserScript==
// @name         智学网排行榜
// @namespace    moe.qianjunakasumi.zhixuerank
// @version      1.0.7
// @author       qianjunakasumi
// @description  智学网排名计算
// @source       https://github.com/qianjunakasumi/ZhiXueRank
// @updateURL    https://github.com/qianjunakasumi/ZhiXueRank/blob/main/main.js
// @downloadURL  https://github.com/qianjunakasumi/ZhiXueRank/blob/main/main.js
// @supportURL   https://github.com/qianjunakasumi/ZhiXueRank/issues/new/choose
// @match        https://www.zhixue.com/activitystudy/web-report/index.html?from=web-container_top
// @grant        none
// ==/UserScript==

const GLOBALDATA = {
    data: {},

    newCode: id => {
        if (!!GLOBALDATA.data[id]) {
            return;
        }
        GLOBALDATA.data[id] = {
            number: 0,
            subject: {},
        };
    },
    addNumber: (id, n) => {
        GLOBALDATA.newCode(id);
        GLOBALDATA.data[id].number = n;
    },
    addRank: (id, n, o) => {
        GLOBALDATA.newCode(id);
        GLOBALDATA.data[id].subject[n] = {
            rank: -1,
            org: o,
        };
    },
    calc: id => {
        const e = GLOBALDATA.data[id];
        const keys = Object.keys(e.subject);
        if (e.number === 0 || keys.length === 0) {
            return;
        }

        for (const ki in keys) {
            const k = keys[ki];
            if (e.subject[k].rank !== -1) {
                return;
            }

            const percentage = e.subject[k].org;
            const total = e.number;

            let finalRank = -1;
            let minDelta = 100;

            for (let i = 1; i <= total; i++) {
                const delta = Math.abs(percentage - 100 / (total - 1) * (i - 1));
                if (delta < minDelta) {
                    finalRank = i;
                    minDelta = delta;
                }
            }

            // const rank = Math.ceil(percentage / 100 * total);

            GLOBALDATA.data[id].subject[k].rank = finalRank;
        }

        display(id);
    },
};

function display(id) {
    let html = `
<div>
    <div class="general" style="padding-bottom: 0">
        <div class="general-head specific">
            <h2 class="class-a-title">班级排行榜</h2>
            <div style="margin-bottom: 12px"></div>
           考试人数 ${GLOBALDATA.data[id].number}
        </div>
    </div>
    <div class="single">`;

    const keys = Object.keys(GLOBALDATA.data[id].subject);
    for (const ki in keys) {
        const k = keys[ki];
        html += `<div style="sub-item; display: inline-block; width: 50%; margin-bottom: 15px;">
                    <div class="subject">${k}</div>
                    <div style="margin-left: 150px;">
                        <div class="bottom">
                            <div>
                                <span class="specific">第 </span>
                                <span class="blue">${GLOBALDATA.data[id].subject[k].rank}</span>
                                <span class="specific"> 名</span>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    html += `
    </div>
</div>
`;

    let rankDOM = document.createElement('div');
    rankDOM.classList.add('hierarchy');
    rankDOM.id = 'qianjuzhixuerank';
    rankDOM.innerHTML = html;

    document.querySelector('#report > div > div.report > div > div').insertBefore(rankDOM, document.querySelector('#report > div > div.report > div > div > div:nth-child(2)'));
}

function patchRequest(url, xhr) {
    if (url.indexOf('zhixuebao/report/exam/getSubjectDiagnosis') !== -1) {
        xhr.addEventListener("load", patchGetSubjectDiagnosisOnReadyStateChange);
    }
    if (url.indexOf('zhixuebao/report/exam/getLevelTrend') !== -1) {
        xhr.addEventListener("load", patchGetLevelTrendOnReadyStateChange);
    }
}

function patchGetSubjectDiagnosisOnReadyStateChange(proto) {
    const xhr = proto.currentTarget;
    if (xhr.readyState !== 4) {
        return;
    }

    const code = xhr.responseURL.substring(72, 108);
    const data = JSON.parse(xhr.response);
    data.result.list.forEach(element => {
        GLOBALDATA.addRank(code, element.subjectName, element.myRank);
    });
    GLOBALDATA.calc(code);
}

function patchGetLevelTrendOnReadyStateChange(proto) {
    const xhr = proto.currentTarget;
    if (xhr.readyState !== 4) {
        return;
    }

    const code = xhr.responseURL.substring(66, 102);
    const data = JSON.parse(xhr.response);
    GLOBALDATA.addNumber(code, data.result.list[0].statTotalNum);
    GLOBALDATA.calc(code);
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open
function inject() {
    XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        patchRequest(url, this);
        this._open(method, url, async, user, password);
    };
}

(function () {
    'use strict';
    inject();
})();
