import{_ as t,p as d,q as e,J as r}from"./framework-25b03c29.js";const a={},o=r('<p>在IDEA中使用debug模式对程序进行断点调试是程序员必备技能，快来看看吧</p><h3 id="断点的概念" tabindex="-1"><a class="header-anchor" href="#断点的概念" aria-hidden="true">#</a> 断点的概念</h3><p>debug模式离不开断点（breakpoint），断点是能够程序中断执行的点</p><p>设置断点后，当程序以<code>debug</code>模式运行时，就可以利用断点来使程序在某个地方暂停执行，方便开发人员调试和排错</p><blockquote><p>当以debug模式运行程序时，会停在第一个断点所在行<mark>（该行还没有被执行!）</mark></p></blockquote><p><strong>如何添加或设置一个断点</strong></p><p>直接在想要打断点的行的行号区域单击即可（也可以使用快捷键Ctrl+F8）</p><blockquote><p>断点可以在debug过程中动态设置哦</p></blockquote><h3 id="断点的分类" tabindex="-1"><a class="header-anchor" href="#断点的分类" aria-hidden="true">#</a> 断点的分类</h3><table><thead><tr><th>断点</th><th>描述</th></tr></thead><tbody><tr><td>源断点</td><td>黄色圆点，可以直接设置断点属性（Shift+单击）</td></tr><tr><td>行断点</td><td>是最常用、最普遍的断点</td></tr><tr><td>方法断点</td><td>在方法执行前和执行完毕处各打一个断点</td></tr><tr><td>字段断点</td><td>监控某个字段（属性）值的变化</td></tr><tr><td>异常断点</td><td>在程序出现指定异常时，引发异常的行打一个断点</td></tr></tbody></table><h3 id="断点调试按钮-命令" tabindex="-1"><a class="header-anchor" href="#断点调试按钮-命令" aria-hidden="true">#</a> 断点调试按钮/命令</h3><p>先认识一下debug断点调试面板：</p><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230120201805.png" alt="20230120201805"></p><p><strong>单步调试</strong></p><table><thead><tr><th>序号</th><th>按钮</th><th>描述</th></tr></thead><tbody><tr><td>1</td><td>step over</td><td>程序向下执行一行（如果当前行有方法调用，这个方法将被执行完毕返回，然后到下一行）</td></tr><tr><td>2</td><td>step into</td><td>程序向下执行一行（如果该行有自定义方法的调用，则运行进入自定义方法，注意不会进入JDK官方类库的方法）</td></tr><tr><td>3</td><td>force step into</td><td>程序向下执行一行（如果当前行有方法调用，则强制进入该方法中，无论该方法是自定义方法还是JDK类库中的方法）</td></tr><tr><td>4</td><td>step out</td><td>跳出当前方法，返回到方法调用处的下一行（该方法将会被执行完毕）</td></tr><tr><td>5</td><td>run to cursor</td><td>回到当前断点并继续执行到下一个断点处。有的说是运行到光标所在处</td></tr><tr><td>5</td><td>evaluate expression</td><td>计算表达式的值，实际表现为给一个方法传参，然后获取返回值</td></tr><tr><td>6</td><td>drop frame</td><td>回退到当前方法调用行</td></tr><tr><td>7</td><td>show excution point</td><td>回到执行到的断点处</td></tr></tbody></table><blockquote><p>实际测试发现，当前行有方法调用，并且调用的方法中设置了断点，step over命令也会进入到方法体内断点处。（很简单，因为方法体内有断点，step over就无法一步执行完方法调用了）</p></blockquote><p><strong>多步调试</strong></p><table><thead><tr><th>序号</th><th>按钮</th><th>描述</th></tr></thead><tbody><tr><td>1</td><td>rerun</td><td>重新以debug模式运行程序</td></tr><tr><td>2</td><td>modify run configuration</td><td>debug运行设置</td></tr><tr><td>3</td><td>resume program</td><td>（恢复程序）运行程序到下一个断点</td></tr><tr><td>4</td><td>pause program</td><td>暂停程序，一般不会用到</td></tr><tr><td>5</td><td>stop</td><td>停止debug程序的运行</td></tr><tr><td>6</td><td>view breakpoints</td><td>查看当前程序设置的所有断点，进一步地，可以设置断点出现的条件等断点属性</td></tr><tr><td>7</td><td>mute breakpoints</td><td>使所有断点失效，再次单击可使所有断点生效（当你某次debug程序程序却直接运行完毕，而又确实设置了断点时，检查这个按钮）</td></tr></tbody></table><h3 id="多线程断点调试" tabindex="-1"><a class="header-anchor" href="#多线程断点调试" aria-hidden="true">#</a> 多线程断点调试</h3><p>利用断点调试，我们可以控制多个线程的执行顺序</p><h3 id="断点调试拓展" tabindex="-1"><a class="header-anchor" href="#断点调试拓展" aria-hidden="true">#</a> 断点调试拓展</h3><p><strong>条件断点</strong> 条件断点只有在满足某个条件时才会生效</p><p>Variables：在变量区可以查看当前断点之前的当前方法内的变量。</p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><p><strong>IDEA插件推荐</strong></p><ol><li><p><code>GsonFormat</code>：根据json格式的数据自动生成实体类中的属性及对应的setter、getter方法（快捷键alt+S）</p></li><li><p><code>Free MyBatis Plugins</code>：针对mybatis框架，完成Mapper接口和对应Mapper.xml之间的快速跳转</p></li><li><p><code>RestfulTool</code>：俗称插件版Postman，对Controller层接口进行管理，发送请求，获得响应数据等</p></li><li><p><code>SequenceDiagram</code>：以图形化的形式展示某个方法的调用栈，方便开发者梳理业务逻辑</p></li></ol>',26),p=[o];function h(n,s){return d(),e("div",null,p)}const c=t(a,[["render",h],["__file","IDEA-debug.html.vue"]]);export{c as default};