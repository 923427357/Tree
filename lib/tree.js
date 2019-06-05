class Tree {
    constructor({el, options = {}}) {
        this.el = el;
        this.options = {
            theme: 'default',
            data: {},
            iconClass: 'arrow-icon',
            clickCallBack: function(text, node) {
                console.log(text, node)
            }
        };
        this.level = 0;
        this.defaultNameClss = 'menu-name';
        this.defaultMenuType = [options.iconClass || 'arrow-icon'];
        // TODO: icon, clickBefore, clickAfter, childNode; 增加 checbox, disabled    
        // this.defaultMenuType = ['arrow-icon', 'has-selected', 'allow-disabled']; //TODO: add type

        // 初始化数据; 
        // TODO: 增加类型检测 / 容错处理;
        Object.assign(this.options, options); 
        
        // 标记层级
        this.initLevel(this.options.data);
        
        this.render();
    }

    // 初始化数据层级  
    // TODO: initLevel 和 createElements代码提取复用
    initLevel (data) {  
        data.level = this.level;
        let {children} =  data;
        if (children) {
            this.level ++;
            children.map((_, index) => {
                if (index === 0 ) {
                    _.level = this.level;
                    this.initLevel(_);
                } else {
                    // 拿到当前层级首个对象的level;
                    _.level = children[0].level;
                    // Object.assign(_, children[0]); 
                }
            })
        } 
    }

    createElements(data = {}) {
        let {text, state: {opened, selected, disabled}, children, className = '', level} = data;
        let defaultSize = ['lg', 'md', 'sm'];
        className = (defaultSize[level] || 'sm') + ' lab icon iconfont' + className + (disabled ? ' disabled' : '') + (children ? ` ${this.options.iconClass}` : '') + (opened ? ' open' : ' close');
        let menuContainerClass = `menu-container ${opened ? 'show' : 'hide'}`;
        return `<div class='${className}'>
            <div class='${this.defaultNameClss}'>${text}</div>
            
            <div class='${menuContainerClass}'>${children ? children.map(params => this.createElements(params)).join('') : ''}</div>
        </div>`
    }

     // 区分菜单类型; TODO: 增加 checbox, disabled         
    getMenuType(fullClass='', currentClass='') {                           
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
                } else {
                    // 点击icon
                    let type;
                    this.defaultMenuType.map(str => {
                        !type && (type = this.getMenuType(target.className, str));
                    })
                    let [opened, selected, disabled] =  this.defaultMenuType;
                    switch(type) {
                        case opened: this.changeStatus(target, target.className, 'close');
                            break;
                        case selected: break; //TODO: 增加 checbox, disabled    
                    }
                }   
            })
            this.el.innerHTML = root;
        } catch(e) {
            console.log('Please check the elements')
        }

    }
}

export default Tree;
