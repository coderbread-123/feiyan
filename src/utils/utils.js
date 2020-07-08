/**
 * 封装处理从数据库读取的时间
 * 传入一个包含特殊时间格式成员的数组
 * @param {*} array
 * @returns
 */
export const resolveDate = (array)=> {
    return array.map(item => {
        // 将数据库的时间格式转为常用的时间格式
        // 原始的时间格式
        const originTime = item.add_time;
        
        // 格式化年月日
        const formatYMD = originTime.split('T')[0];

        // 格式化时分秒
        // 解决从数据库读取的时间与插入的时间相差八小时
        const H = (Number(originTime.split('T')[1].split('.')[0].split(':')[0]) + 8) % 24;
        const M = (Number(originTime.split('T')[1].split('.')[0].split(':')[1])) % 60;
        const S = (Number(originTime.split('T')[1].split('.')[0].split(':')[2])) % 60;
        const arr = [H, M, S];
        const newArr = arr.map(item => {
            if (item < 10) {
                return '0' + item;
            }else {
                return item;
            }
        });
        
        
        const formatHMS = newArr[0] + ':' + newArr[1] + ':' + newArr[2];

        item.add_time = formatYMD + ' ' + formatHMS;
        return item;
    });
}

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
/* 
    解析markdown代码高亮
    Marked
*/
export const Marked = (content)=> {
    // 配置marked解析
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    return marked(content);
}