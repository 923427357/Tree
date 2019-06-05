import Tree from '../index.js';
let data = {
    text: '一级',
    // isOpen: false,
    state: {opened: true},
    children: [ 
        {
            text: '二级1',
            state: {opened: false},
            children: [
                {
                    text: '三级1-1',
                    state: {opened: false},
                    children: [
                        {
                            text: '四级1-1-1',
                            state: {opened: false},
                        }
                    ]
                },
                {
                    text: '三级1-2',
                    state: {opened: false},
                    children: [
                        {
                            text: '四级1-2-1',
                            state: {selected: false},
                        }
                    ]
                }
            ]
        }, 
        {
            text: '二级2',
            state: {opened: false},
            children: [
                {
                    text: '三级2-1',
                    state: {opened: false},
                    children: [
                        {
                            text: '四级2-1-1',
                            state: {opened: false},
                        }
                    ]
                },
                {
                    text: '三级2-2',
                    state: {opened: false},
                    children: [
                        {
                            text: '四级2-2-1',
                            state: {opened: false},
                        }
                    ]
                }
            ]
        }
    ]
}

// el: dom节点;   options: 配置项; iconClass: 自定义icon class;
let tree = new Tree({el: document.querySelector('.tree-menu'), options: {data, iconClass: 'arrow-icon-theme-gray'}});