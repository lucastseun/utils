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

export {
    Selector
};