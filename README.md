# Tree
原生js封装的Tree组件，目前紧支持唯一theme

使用说明：

      var data = {
            text: '', //title <br/>
            state: {opened: true}, //opened icon展开/闭合, <br/>
            children: [
                  text: '', <br/>
                  state: {}, //首期仅支持opened类型<br/>
                  children: []<br/>
            ]
        }
  
        new $Tree({el: dom, options: {data}}); //创建实例
        
