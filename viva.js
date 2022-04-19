/**
 * 
 * @param {Object} opts 
 * @param {Array [{code:1,text:'IT'}]...} opts.data
 * @param {Function} opts.sucess
 * @returns 
 */
const Selector = (opts = {}) => {
    const data = opts.data || [];
    let selectorHtml = document.querySelector('div[selector]');

    if (data.length <= 0 || selectorHtml) {
        return;
    }

    const overlayStyle = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        overflow: hidden;
        transition: background 1s;
    `;

    const contentStyle = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 19999;
        width: 100%;
        max-height: 80%;
        overflow: hidden;
        background: #fff;
        transform: translateY(100%);
        transition: transform .3s;
        border-top-left-radius: 2vw;
        border-top-right-radius: 2vw;
    `;

    const itemStyle = `
        text-align: center;
        padding: 15px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    `;

    selectorHtml = document.createElement('div');
    selectorHtml.setAttribute('selector', 'selector');
    selectorHtml.setAttribute('style', overlayStyle);
    selectorHtml.innerHTML = `
        <div style="${contentStyle}">
            ${data.map(item => `<div style="${itemStyle}" data-code="${item.code}">${item.text}</div>`).join('')}
        </div>
    `;
    document.body.appendChild(selectorHtml);

    const timer = setTimeout(() => {
        selectorHtml.style.background = 'rgba(0, 0, 0, .5)';
        selectorHtml.firstElementChild.style.transform = 'translateY(0%)';
        selectorHtml.firstElementChild.lastElementChild.style.border = 'none';
        clearTimeout(timer);
    }, 50);

    selectorHtml.firstElementChild.addEventListener('click', (e) => {
        const target = e.target;
        target.style.background = 'rgba(0, 0, 0, .1)';
        const code = target.dataset.code;
        const text = target.innerText;
        opts.sucess && opts.sucess({
            code,
            text
        });
        selectorHtml.style.background = 'rgba(0, 0, 0, 0)';
        selectorHtml.firstElementChild.style.transform = 'translateY(100%)';
        const timer = setTimeout(() => {
            document.body.removeChild(selectorHtml);
            clearTimeout(timer);
        }, 1000);
    });
};

/**
 * 
 * @param {Object} opts 
 * @param {String} opts.title
 * @param {String} opts.contentText
 * @param {Function} opts.ok
 * @param {Function} opts.cancel
 * @returns 
 */
const Dialog = (opts = {}) => {
    let dialogHtml = document.querySelector('div[dialog]');
    if (dialogHtml) {
        return;
    }

    const overlayStyle = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        transition: background .8s;
    `;
    
    const containerStyle = `
        position: fixed;
        top: 45%;
        left: 50%;
        right: 50%;
        z-index: 19999;
        width: 90%;
        overflow: hidden;
        font-size: 16px;
        color: #333;
        background: #fff;
        border-radius: 16px;
        text-align: center;
        transform: translate3d(-50%, -50%, 0);
        opacity: 0;
        transition: opacity .3s;
    `;

    const titleStyle = `
        padding-top: 26px;
        font-weight: 500;
    `;

    const contentStyle = `
        color: #646566;
        padding: 26px;
        font-size: 14px;
        line-height: 20px;
        ${opts.title && 'padding-top: 8px;'}
    `;

    const btnBoxStyle = `
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        height: 50px;
        color: #323233;
        border-top: 1px solid rgba(0, 0, 0, .1);
    `;

    const btnStyle = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
    `;

    const okStyle = `
        color: #ee0a24;
        ${opts.cancel && 'border-left: 1px solid rgba(0, 0, 0, .1)'}
    `;

    dialogHtml = document.createElement('div');
    dialogHtml.setAttribute('dialog', 'dialog');
    dialogHtml.setAttribute('style', overlayStyle);
    dialogHtml.innerHTML = `
        <div style="${containerStyle}">
            ${opts.title && `<div style="${titleStyle}">${opts.title}</div>`}
            <div style="${contentStyle}">${opts.contentText || ''}</div>
            <div style="${btnBoxStyle}">
                ${opts.cancel && `<div style="${btnStyle}" id="dia-cancel">${opts.cancelText || '取消'}</div>`}
                <div style="${btnStyle}${okStyle}" id="dia-ok">${opts.okText || '确认'}</div>
            </div>
        </div>
    `;
    document.body.appendChild(dialogHtml);

    const timer = setTimeout(() => {
        dialogHtml.style.background = 'rgba(0, 0, 0, .7)';
        dialogHtml.firstElementChild.style.opacity = '1';
        clearTimeout(timer);
    }, 50);

    const hide = () => {
        dialogHtml.style.background = 'rgba(0, 0, 0, 0)';
        dialogHtml.firstElementChild.style.opacity = '0';
        const timer = setTimeout(() => {
            document.body.removeChild(dialogHtml);
            clearTimeout(timer);
        }, 800);
    };

    const cancel = document.querySelector('#dia-cancel');
    cancel && cancel.addEventListener('click', e => {
        cancel.style.background = 'rgba(0, 0, 0, .1)';
        opts.cancel && opts.cancel({code: 'cancel'})
        hide();
    });

    const ok = document.querySelector('#dia-ok');
    ok && ok.addEventListener('click', e => {
        ok.style.background = 'rgba(0, 0, 0, .1)';
        opts.ok && opts.ok({code: 'ok'})
        hide();
    });
}

export {
    Selector,
    Dialog
};