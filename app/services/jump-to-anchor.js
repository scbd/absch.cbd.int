import $ from 'jquery';

export default function jumpTo(anchor) {

    let target = null; 

    if(!anchor) {
        anchor = window.location.hash || null;
    }

    if(anchor?.target) { // from click event on a A
        anchor = anchor?.target; 
    }

    if(anchor?.hash) {
        anchor = anchor.hash || null;
    }

    if(typeof(anchor)=='string') {
        const anchorName = anchor.replace(/^#+/, '');
        target = target || $(`a[id=${anchorName}]:first`)[0];
        target = target || $(`a[name=${anchorName}]:first`)[0]; // legacy support
    }

    console.log('jumpTo', anchor, target);

    if(target) target.scrollIntoView({ behavior:'smooth'});
}