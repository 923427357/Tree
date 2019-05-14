class Tree {
    constructor({el, options = {}}) {
        this.el = el;
        this.options = {
            theme: 'default',
            data: {},
            clickCallBack: function(text, v) {
                console.log(text)
            }
        };
        this.level = 0;
        this.defaultNameClss = 'menu-name';
        this.defaultMenuType = ['has-menu'];
        // this.defaultMenuType = ['has-menu', 'has-selected', 'allow-disabled']; //TODO: add type
        Object.assign(this.options, options); //初始化数据
        this.initLevel(this.options.data); //标记层级
        this.render();
    }

    initLevel (data) {  //初始化数据层级  TODO: 优化--- initLevel 和 createElements合并；
        data.level = this.level;
        let {children} =  data;
        if (children) {
            this.level ++;
            children.map((_, index) => {
                if (index === 0 ) {
                    _.level = this.level;
                    this.initLevel(_);
                } else {
                    _.level = children[0].level;//拿到当前层级首个对象的level;
                    // Object.assign(_, children[0]); 
                }
            })
        } 
    }

    createElements(data = {}) {
        let {text, state: {opened, selected, disabled}, children, className = '', level} = data;
        let defaultSize = ['lg', 'md', 'sm'];
        className = (defaultSize[level] || 'sm') + ' lab icon iconfont' + className + (disabled ? ' disabled' : '') + (children ? ' has-menu' : '') + (opened ? '' : ' close');
        let menuContainerClass = opened ? 'menu-container show' : 'menu-container hide';
        return `<div class='${className}'>
            <div class='${this.defaultNameClss}'>${text}</div>
            
            <div class='${menuContainerClass}'>${children ? children.map(params => this.createElements(params)).join('') : ''}</div>
        </div>`
    }

    getMenuType(fullClass='', currentClass='') { //区分菜单类型 ; TODO: 增加 checbox， disabled                                    
        return fullClass.split(' ').find(str => str === currentClass); // indexOf会有盲区，'one-two' --- 'two'
    }

    changeStatus(dom, fullClass='', status='close') {
        let strArr = fullClass.split(status);
        let childrenClass = strArr.length > 1 ? ' show' : ' hide';
        dom.querySelector('.menu-container').className = 'menu-container' + childrenClass;
        let newClass = strArr.length > 1 ? strArr.join('') : `${fullClass} ${status}`;
        dom.className = newClass;
    }

    render() {
        let doms = this.createElements(this.options.data);
        let root = `<div class='tree-wrapper'>${doms}</div>`
        try {
            this.el.addEventListener("click", (event) => {
                let target = event.target || event.srcElement;
                if (target === this.el) return;
                if (target.className === this.defaultNameClss) { //点击导航名
                    this.options.clickCallBack(target.innerText, target);
                } else {//点击icon
                    let type;
                    this.defaultMenuType.map(str => {
                        !type && (type = this.getMenuType(target.className, str));
                    })
                    let [opened, selected, disabled] =  this.defaultMenuType;
                    switch(type) {
                        case opened: this.changeStatus(target, target.className, 'close');
                            break;
                        case selected: break; //TODO: 增加 checbox， disabled    
                    }
                }   
            })
            this.el.innerHTML = root;
        } catch(e) {
            console.log('Please check the elements')
        }

    }
}

window.$Tree = Tree;

// export default Tree;
