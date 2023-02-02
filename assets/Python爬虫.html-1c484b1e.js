import{_ as t,p as e,q as p,G as s,J as a,s as n}from"./framework-25b03c29.js";const i={},l=a(`<h2 id="初识爬虫" tabindex="-1"><a class="header-anchor" href="#初识爬虫" aria-hidden="true">#</a> 初识爬虫</h2><h3 id="爬虫的概念" tabindex="-1"><a class="header-anchor" href="#爬虫的概念" aria-hidden="true">#</a> 爬虫的概念</h3><p><strong>什么是爬虫</strong></p><p><code>爬虫</code>：通过编写程序，模拟浏览器上网，并抓取有价值的数据的过程</p><p><code>反爬虫</code>：门户网站通过制定相应的策略或技术手段，来阻止爬虫程序对其网站数据的爬取</p><p><code>反反爬</code>：爬虫程序可以采用一些技术手段，来绕过或破坏门户网站的反爬机制，从而爬取到有用的数据</p><blockquote><p>爬虫与反爬虫就是一对矛与盾</p></blockquote><p><strong>爬虫合法性探究</strong></p><p>爬虫可能带来的风险？</p><ul><li>爬虫干扰了被访问网站的正常运营</li><li>爬虫抓取了受到法律保护的特定类型的数据或信息</li></ul><p>如何合理地使用爬虫？</p><ul><li>对爬虫程序进行优化，避免干扰网站的正常运行</li><li>不要爬取涉及商业机密等敏感信息</li></ul><p><strong>爬虫的君子协议</strong></p><p>通常，网站的<code>robots.txt</code>文件中声明了那些数据可以被爬取，那些数据不可以被爬取（非强制性）</p><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230113122447.png" alt="20230113122447"></p><h3 id="爬虫的分类" tabindex="-1"><a class="header-anchor" href="#爬虫的分类" aria-hidden="true">#</a> 爬虫的分类</h3><p>在不同的使用场景下，爬虫的分类有</p><ol><li><p><code>通用爬虫</code>：抓取一整张页面的数据（很可能包含大量无用信息）</p></li><li><p><code>聚焦爬虫</code>：抓取页面中特定的局部内容，必须建立在通用爬虫的基础之上</p></li><li><p><code>增量爬虫</code>：只会爬取网站中最新更新的数据</p></li></ol><h2 id="网络请求与响应" tabindex="-1"><a class="header-anchor" href="#网络请求与响应" aria-hidden="true">#</a> 网络请求与响应</h2><h3 id="http协议" tabindex="-1"><a class="header-anchor" href="#http协议" aria-hidden="true">#</a> http协议</h3><p>http(s)协议是服务器和客户端进行数据交互的一种形式，服务器和客户端都需要遵守该协议才能进行数据交互</p><p>https协议是http协议的升级版，服务器与客户端的数据交互是通过证书加密的，攻击者很难获得有价值的信息</p><p><strong>常用的请求头信息</strong></p><table><thead><tr><th>Request Header</th><th>描述</th></tr></thead><tbody><tr><td>User-Agent</td><td>请求载体的身份标识</td></tr><tr><td>Connection</td><td>请求完毕后，保持连接还是断开连接</td></tr></tbody></table><p><strong>常用的响应头信息</strong></p><table><thead><tr><th>Response Header</th><th>描述</th></tr></thead><tbody><tr><td>Content-Type</td><td>服务器响应数据的类型</td></tr></tbody></table><h3 id="requests模块" tabindex="-1"><a class="header-anchor" href="#requests模块" aria-hidden="true">#</a> requests模块</h3><p><code>requests</code>是python中的一个基于网络请求的模块，用来模拟浏览器发送请求。</p><p><strong>requests模块的安装与使用</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> requests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests

url <span class="token operator">=</span> <span class="token string">&#39;http://www.baidu.com&#39;</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>    <span class="token comment">#发起一个get请求，并获得响应数据</span>
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text
<span class="token keyword">print</span><span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>resp.text</td><td>以字符串形式返回，通常是页面的html源代码</td></tr><tr><td>resp.content</td><td>以二进制形式返回，比如一张图片、一个音频</td></tr><tr><td>resp.json()</td><td>返回一个字典对象（当响应数据是json类型时使用）</td></tr></tbody></table><p><strong>基于requests的简易网页采集器（使用到了UA伪装）</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests

<span class="token comment"># 1. 准备数据</span>
<span class="token comment"># url = &#39;https://www.sogou.com/web?query=猫羽雫&#39;</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://www.sogou.com/web&#39;</span>
word <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&#39;Enter a word:&#39;</span><span class="token punctuation">)</span>
params <span class="token operator">=</span> <span class="token punctuation">{</span>  <span class="token comment">#请求参数，拼接在url后</span>
    <span class="token string">&#39;query&#39;</span><span class="token punctuation">:</span> word
<span class="token punctuation">}</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">#请求头，伪装成浏览器</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 2. 发起请求</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>params<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text
<span class="token keyword">print</span><span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>

<span class="token comment"># 3. 持久化存储</span>
file_name <span class="token operator">=</span> word <span class="token operator">+</span> <span class="token string">&#39;.html&#39;</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_name<span class="token punctuation">,</span><span class="token string">&#39;w&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fp<span class="token punctuation">:</span>
    fp<span class="token punctuation">.</span>write<span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>file_name<span class="token punctuation">,</span><span class="token string">&#39;保存成功！&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据解析" tabindex="-1"><a class="header-anchor" href="#数据解析" aria-hidden="true">#</a> 数据解析</h2><p><code>数据解析</code>是在得到整个网页源代码后，对其中的有用信息进行提取的过程。属于聚焦爬虫</p><p><strong>数据解析的一般步骤</strong></p><p>检查网页源代码发现，有价值的数据一般存放在标签中，或者标签的属性中。所以数据解析的一般步骤是：<mark>1.获取网页源代码 2.标签定位 3.解析数据</mark></p><blockquote><p>F12检查元素中的数据不一定在页面源代码中，也有可能是通过ajax动态刷新的数据，这是我们在数据解析时需要注意的。数据解析要以页面源代码为准！</p></blockquote><p><strong>Python中数据解析的三种方式</strong></p><p>1.正则表达式（通用） 2.BeautifulSoup4（python独有） 3.xpath（推荐，通用性最强）</p><h3 id="使用正则表达式" tabindex="-1"><a class="header-anchor" href="#使用正则表达式" aria-hidden="true">#</a> 使用正则表达式</h3><p>建议先把要提取的那部分源码单独复制，对照着去写正则表达式（F12太乱了🤣）</p><p>从重复的标签（如li）开始写正则，那么这个正则可以提取到多组数据哦</p><p><strong>re.findall(pattern,string,flags)</strong></p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>匹配的正则表达式</td></tr><tr><td>string</td><td>待匹配的文本字符串</td></tr><tr><td>flags</td><td>标志位。用于控制正则表达式的匹配方式，如：是否区分大小写，多行匹配等等</td></tr></tbody></table><br><table><thead><tr><th>标志位</th><th>描述</th></tr></thead><tbody><tr><td>re.S</td><td>使.能够匹配包括换行在内的所有字符</td></tr><tr><td>re.M</td><td>多行匹配，影响^和$</td></tr><tr><td>re.I</td><td>使匹配对大小写不敏感</td></tr></tbody></table><br><table><thead><tr><th>正则表达式</th><th>描述</th></tr></thead><tbody><tr><td>.</td><td>匹配除换行符外的任意单个字符</td></tr><tr><td>*</td><td>匹配多个字符</td></tr><tr><td>?</td><td>非贪婪匹配</td></tr></tbody></table><h3 id="使用beautifulsoup" tabindex="-1"><a class="header-anchor" href="#使用beautifulsoup" aria-hidden="true">#</a> 使用BeautifulSoup</h3><p>对于一个网页来说，都有一定的特殊结构和层级关系，而且很多节点都用id和class来区分。所以可以借助网页的结构和属性来提取数据。</p><p><strong>使用BeautifulSoup的一般步骤</strong></p><ol><li>实例化一个BeautifulSoup对象，并且<mark>将页面源代码加载到该对象中</mark></li><li>调用BeautifulSoup对象提供的属性或方法进行标签定位和数据提取</li></ol><p><strong>BeautifulSoup4的安装与使用（需要一并下载lxml解析器）</strong></p><div class="language-base line-numbers-mode" data-ext="base"><pre class="language-base"><code>pip install bs4
pip install lxml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> bs4 <span class="token keyword">import</span> BeautifulSoup
<span class="token keyword">import</span> requests

<span class="token comment"># 加载html有两种方式</span>
<span class="token comment"># 方式一 使用本地html文档中的数据</span>
fp <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;./猫羽雫.html&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;r&#39;</span><span class="token punctuation">,</span>encoding<span class="token operator">=</span><span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span>
soup <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>fp<span class="token punctuation">,</span><span class="token string">&#39;lxml&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>soup<span class="token punctuation">)</span> <span class="token comment">#我们发现，soup对象的内容就是加载到该对象中的html源码</span>

<span class="token comment"># 方式二 从互联网上获取html源码</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://www.baidu.com&#39;</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
soup <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>resp<span class="token punctuation">.</span>text<span class="token punctuation">,</span><span class="token string">&#39;lxml&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>soup<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>BeautifulSoup对象中提供的属性和方法</strong></p><ol><li>根据标签名或选择器定位，返回标签之间的所有内容</li></ol><table><thead><tr><th>方法</th><th>描述</th></tr></thead><tbody><tr><td>find(tag,attr=value)</td><td>根据标签名和属性进行定位，只返回符合条件的第一个元素内容</td></tr><tr><td>find_all(tag,attr=value)</td><td>返回一个列表，用法同上</td></tr><tr><td>select(css选择器)</td><td>使用CSS选择器进行定位，返回一个列表</td></tr></tbody></table><br>`,61),o=n("table",null,[n("thead",null,[n("tr",null,[n("th",null,"属性"),n("th",null,"描述")])]),n("tbody",null,[n("tr",null,[n("td",null,".text"),n("td",null,"获取所有文本内容")]),n("tr",null,[n("td",null,".string"),n("td",null,"只能获取直系的文本内容")])])],-1),c=n("br",null,null,-1),u=a(`<table><thead><tr><th>属性</th><th>描述</th></tr></thead><tbody><tr><td>[attr]</td><td>获取属性对应的属性值</td></tr></tbody></table><h3 id="使用xpath解析" tabindex="-1"><a class="header-anchor" href="#使用xpath解析" aria-hidden="true">#</a> 使用xpath解析</h3><p>xpath解析是最常用、最便捷、最高效，且通用性最强的解析方式。xpath是根据元素所处层级进行定位的</p><p><strong>xpath解析的一般步骤</strong></p><ol><li>实例化一个etree对象，并将要解析的html页面源码数据加载到对象中</li><li>调用etree对象的<code>xpath(xpath表达式)</code>方法结合xpath表达式实现标签的定位和数据提取</li></ol><p><strong>xpath的安装与使用</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> lxml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> lxml <span class="token keyword">import</span> etree
<span class="token keyword">import</span> requests

<span class="token comment"># 加载html有两种方式</span>
<span class="token comment"># 方式一 使用本地html文档中的数据</span>
etree<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">&#39;./猫羽雫.html&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 方式二 从互联网上获取html源码</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://www.baidu.com&#39;</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>方法</th><th>描述</th></tr></thead><tbody><tr><td>etree.HTML(html)</td><td>实例化一个etree对象，并加载要解析的html</td></tr><tr><td>etree.parse(filepath)</td><td>实例化一个etree对象，并加载要解析的html（本地html）</td></tr><tr><td>xpath(xpath表达式)</td><td>使用xpath表达式进行标签定位，返回一个列表</td></tr></tbody></table><br><p>xpath()方法返回一个列表，如果xpath表达式只进行了定位，没有进行数据提取，那么列表中每个元素都将是一个Element对象。</p><p><strong>xpath表达式用法</strong></p><ol><li>根据html元素层级进行定位</li></ol><table><thead><tr><th>xpath表达式</th><th>描述</th></tr></thead><tbody><tr><td>/</td><td>表示单个层级，放在开头表示html根元素</td></tr><tr><td>//</td><td>表示多个层级（常用）</td></tr><tr><td>./</td><td>表示当前标签</td></tr><tr><td>[@attr=value]</td><td>根据属性进行定位</td></tr><tr><td>[index]</td><td>根据元素所处位置进行定位，index从1开始</td></tr></tbody></table><br><ol start="2"><li>提取标签之间的文本数据</li></ol><table><thead><tr><th>xpath表达式</th><th>描述</th></tr></thead><tbody><tr><td>/text()</td><td>获取标签中的文本,返回一个列表</td></tr><tr><td>//text()</td><td>可以获取标签中非直系的文本，返回一个列表</td></tr></tbody></table><br><ol start="3"><li>提取标签中指定属性的值</li></ol><table><thead><tr><th>xpath表达式</th><th>描述</th></tr></thead><tbody><tr><td>/@attr</td><td>获取标签中属性对应的值</td></tr></tbody></table><br><h2 id="数据解析实战" tabindex="-1"><a class="header-anchor" href="#数据解析实战" aria-hidden="true">#</a> 数据解析实战</h2><p>我们将通过三个案例分别使用三种数据解析方式获取到我们想要的数据</p><h3 id="彼岸图网" tabindex="-1"><a class="header-anchor" href="#彼岸图网" aria-hidden="true">#</a> 彼岸图网</h3><p><code>需求</code>：获取图中每个li标签内，所有a标签href属性的值，所有img标签src属性的值，以及所有b标签内的文本</p><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230114184112.png" alt="20230114184112"></p><p><strong>方式一 正则表达式</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">import</span> re

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://pic.netbian.com/4kmeinv/&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 为了防止下一步获取的&lt;li&gt;标签不准确，这里加了一步先获取&lt;ul&gt;的操作</span>
ex0 <span class="token operator">=</span> <span class="token string">&#39;&lt;ul class=&quot;clearfix&quot;&gt;(.*?)&lt;/ul&gt;&#39;</span>
ul <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>ex0<span class="token punctuation">,</span>page_content<span class="token punctuation">,</span>re<span class="token punctuation">.</span>S<span class="token punctuation">)</span>  <span class="token comment">#实际上页面中就一个符合条件的ul</span>
ul_content <span class="token operator">=</span> ul<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">#strip()去除字符串首尾空格和换行</span>

<span class="token comment"># 2. 数据解析</span>
<span class="token comment"># 待匹配的字符串格式：&lt;li&gt;&lt;a href=&quot;/tupian/30912.html&quot; target=&quot;_blank&quot;&gt;&lt;img src=&quot;/uploads/allimg/230111/012011-16733712117326.jpg&quot; alt=&quot;4k 居家 可爱 公主 女孩 美女 粉色裙子 电脑 壁纸&quot; /&gt;&lt;b&gt;4k 居家 可爱 公主 女孩&lt;/b&gt;&lt;/a&gt;&lt;/li&gt;</span>
ex <span class="token operator">=</span> <span class="token string">&#39;&lt;li&gt;&lt;a href=&quot;(.*?)&quot; .*?&lt;img src=&quot;(.*?)&quot; .*?&lt;b&gt;(.*?)&lt;/b&gt;&lt;/a&gt;&lt;/li&gt;&#39;</span> <span class="token comment">#把想要提取的内容用()括起来</span>
data_list <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>ex<span class="token punctuation">,</span>ul_content<span class="token punctuation">,</span>re<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
<span class="token keyword">for</span> data <span class="token keyword">in</span> data_list<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># (&#39;/tupian/30912.html&#39;, &#39;/uploads/allimg/230111/012011-16733712117326.jpg&#39;, &#39;4k 居家 可爱 公主 女孩&#39;)</span>
<span class="token comment"># (&#39;/tupian/30903.html&#39;, &#39;/uploads/allimg/230110/153047-16733358474a9c.jpg&#39;, &#39;甜美微笑 双手合十 小清&#39;)</span>
<span class="token comment"># ... ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式二 bs4</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">from</span> bs4 <span class="token keyword">import</span> BeautifulSoup

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://pic.netbian.com/4kmeinv/&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 2. 数据解析</span>
soup <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>page_content<span class="token punctuation">,</span><span class="token string">&#39;lxml&#39;</span><span class="token punctuation">)</span>
ul <span class="token operator">=</span> soup<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">,</span>class_<span class="token operator">=</span><span class="token string">&#39;clearfix&#39;</span><span class="token punctuation">)</span>
a_list <span class="token operator">=</span> ul<span class="token punctuation">.</span>find_all<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 或者直接 a_list = soup.select(&#39;div.clearfix li a&#39;)</span>

<span class="token keyword">for</span> a <span class="token keyword">in</span> a_list<span class="token punctuation">:</span>
    a_href <span class="token operator">=</span> a<span class="token punctuation">[</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>a_href<span class="token punctuation">)</span>

    img_src <span class="token operator">=</span> a<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;src&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>img_src<span class="token punctuation">)</span>

    b <span class="token operator">=</span> a<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text    <span class="token comment">#text获取标签中的所有文本</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># /tupian/30912.html</span>
<span class="token comment"># /uploads/allimg/230111/012011-16733712117326.jpg</span>
<span class="token comment"># 4k 居家 可爱 公主 女孩</span>
<span class="token comment"># /tupian/30903.html</span>
<span class="token comment"># /uploads/allimg/230110/153047-16733358474a9c.jpg</span>
<span class="token comment"># 甜美微笑 双手合十 小清</span>
<span class="token comment"># ... ...</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式三 xpath</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> lxml <span class="token keyword">import</span> etree
<span class="token keyword">import</span> requests

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://pic.netbian.com/4kmeinv/&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 2. 数据解析</span>
<span class="token comment"># //多个层级下找  xpath()永远返回一个列表</span>
tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>
li_list <span class="token operator">=</span> tree<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;//ul[@class=&quot;clearfix&quot;]/li&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> li <span class="token keyword">in</span> li_list<span class="token punctuation">:</span>
    a_href <span class="token operator">=</span> li<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./a/@href&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>a_href<span class="token punctuation">)</span>

    img_src <span class="token operator">=</span> li<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;.//img/@src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>img_src<span class="token punctuation">)</span>

    span <span class="token operator">=</span> li<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;.//b/text()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>span<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># /tupian/30912.html</span>
<span class="token comment"># /uploads/allimg/230111/012011-16733712117326.jpg</span>
<span class="token comment"># 4k 居家 可爱 公主 女孩</span>
<span class="token comment"># /tupian/30903.html</span>
<span class="token comment"># /uploads/allimg/230110/153047-16733358474a9c.jpg</span>
<span class="token comment"># 甜美微笑 双手合十 小清</span>
<span class="token comment"># ... ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wallhaven" tabindex="-1"><a class="header-anchor" href="#wallhaven" aria-hidden="true">#</a> Wallhaven</h3><p><code>需求</code>：获取图中每个li标签内，所有a标签href属性的值，所有img标签data-src属性的值，以及所有span标签内图片的分辨率信息</p><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230114194136.png" alt="20230114194136"></p><p><strong>方式一 正则表达式</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">import</span> re

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://wallhaven.cc/toplist&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 2. 数据解析</span>
ex <span class="token operator">=</span> <span class="token string">&#39;&lt;img .*? data-src=&quot;(.*?)&quot; .*?&lt;a .*? href=&quot;(.*?)&quot; .*?&lt;span .*?&gt;(.*?)&lt;/span&gt;&#39;</span>
data_list <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>ex<span class="token punctuation">,</span>page_content<span class="token punctuation">,</span>re<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
<span class="token keyword">for</span> data <span class="token keyword">in</span> data_list<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># (&#39;https://th.wallhaven.cc/small/l8/l83o92.jpg&#39;, &#39;https://wallhaven.cc/w/l83o92&#39;, &#39;1920 x 1200&#39;)</span>
<span class="token comment"># (&#39;https://th.wallhaven.cc/small/85/85o67y.jpg&#39;, &#39;https://wallhaven.cc/w/85o67y&#39;, &#39;825 x 1400&#39;)</span>
<span class="token comment"># ... ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式二 bs4</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">from</span> bs4 <span class="token keyword">import</span> BeautifulSoup

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://wallhaven.cc/toplist&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 2. 数据解析</span>
<span class="token comment"># select()选择器定位  find_all()标签名+属性定位 他们都返回一个列表 |find()返回字符串类型</span>
<span class="token comment"># [attr]不能直接从列表中获取属性的值</span>
soup <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>page_content<span class="token punctuation">,</span><span class="token string">&#39;lxml&#39;</span><span class="token punctuation">)</span>
figure_list <span class="token operator">=</span> soup<span class="token punctuation">.</span>select<span class="token punctuation">(</span><span class="token string">&#39;figure.thumb&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> figure <span class="token keyword">in</span> figure_list<span class="token punctuation">:</span>

    img_data_src <span class="token operator">=</span> figure<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;data-src&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>img_data_src<span class="token punctuation">)</span>

    a_href <span class="token operator">=</span> figure<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">&#39;href&#39;</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>a_href<span class="token punctuation">)</span>

    span <span class="token operator">=</span> figure<span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text     <span class="token comment">#text获取标签内所有文本 string获取标签内直系文本</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>span<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># https://th.wallhaven.cc/small/l8/l83o92.jpg</span>
<span class="token comment"># https://wallhaven.cc/w/l83o92</span>
<span class="token comment"># 1920 x 1200</span>
<span class="token comment"># https://th.wallhaven.cc/small/85/85o67y.jpg</span>
<span class="token comment"># https://wallhaven.cc/w/85o67y</span>
<span class="token comment"># 825 x 1400</span>
<span class="token comment"># ... ... </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方式三 xpath</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> lxml <span class="token keyword">import</span> etree
<span class="token keyword">import</span> requests

<span class="token comment"># 1. 准备数据</span>
url <span class="token operator">=</span> <span class="token string">&#39;https://wallhaven.cc/toplist&#39;</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>
resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding
page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text

<span class="token comment"># 2. 数据解析</span>
tree <span class="token operator">=</span> etree<span class="token punctuation">.</span>HTML<span class="token punctuation">(</span>page_content<span class="token punctuation">)</span>
figure_list <span class="token operator">=</span> tree<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;//figure&#39;</span><span class="token punctuation">)</span>    <span class="token comment">#在文档中查找figure标签，注意xpath()方法永远返回一个列表</span>

<span class="token keyword">for</span> figure <span class="token keyword">in</span> figure_list<span class="token punctuation">:</span>
    img_data_src <span class="token operator">=</span> figure<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./img/@data-src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>  <span class="token comment">#获取当前标签下的img标签的data-src属性的值</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>img_data_src<span class="token punctuation">)</span>

    a_href <span class="token operator">=</span> figure<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;./a/@href&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>a_href<span class="token punctuation">)</span>

    span <span class="token operator">=</span> figure<span class="token punctuation">.</span>xpath<span class="token punctuation">(</span><span class="token string">&#39;.//span[@class=&quot;wall-res&quot;]/text()&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>  <span class="token comment"># //在多个层级下寻找 /text()获取标签内的文本</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>span<span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token comment"># https://th.wallhaven.cc/small/l8/l83o92.jpg</span>
<span class="token comment"># https://wallhaven.cc/w/l83o92</span>
<span class="token comment"># 1920 x 1200</span>
<span class="token comment"># https://th.wallhaven.cc/small/85/85o67y.jpg</span>
<span class="token comment"># https://wallhaven.cc/w/85o67y</span>
<span class="token comment"># 825 x 1400</span>
<span class="token comment"># ... ... </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="爬虫实战-进阶" tabindex="-1"><a class="header-anchor" href="#爬虫实战-进阶" aria-hidden="true">#</a> 爬虫实战（进阶）</h2><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230113154149.png" alt="20230113154149"></p><p>观察发现，每个图片都放在一个li标签中</p><p><img src="https://cdn.staticaly.com/gh/sunday521/postimg.wyun521.top@main/img/2023/20230113160905.png" alt="20230113160905"></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">import</span> re
<span class="token keyword">import</span> os
<span class="token keyword">import</span> time

<span class="token comment"># 获取整个网页源代码 :给我一个url，返回页面源代码</span>
<span class="token keyword">def</span> <span class="token function">getPageContent</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span>headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
    resp<span class="token punctuation">.</span>encoding <span class="token operator">=</span> resp<span class="token punctuation">.</span>apparent_encoding  <span class="token comment">#解决页面中文乱码,一定要在resp.text前调用</span>
    page_content <span class="token operator">=</span> resp<span class="token punctuation">.</span>text
    <span class="token keyword">return</span> page_content<span class="token punctuation">;</span>

<span class="token comment"># 从父页面源代码中解析出每个子页面的url</span>
<span class="token keyword">def</span> <span class="token function">jiexi</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span>page_content<span class="token punctuation">)</span><span class="token punctuation">:</span>
    child_a_list <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>ex<span class="token punctuation">,</span>page_content<span class="token punctuation">,</span>re<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
    child_a_list <span class="token operator">=</span> child_a_list<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
    <span class="token keyword">return</span> child_a_list<span class="token punctuation">;</span>

<span class="token comment"># 从子页面源代码中解析出图片地址</span>
<span class="token keyword">def</span> <span class="token function">jiexi2</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span>page_content<span class="token punctuation">)</span><span class="token punctuation">:</span>
    img_a_list <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>ex<span class="token punctuation">,</span> page_content<span class="token punctuation">,</span> re<span class="token punctuation">.</span>S<span class="token punctuation">)</span>
    <span class="token keyword">return</span> img_a_list<span class="token punctuation">;</span>


<span class="token keyword">def</span> <span class="token function">saveImg</span><span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">,</span>img_url<span class="token punctuation">)</span><span class="token punctuation">:</span>
    nowtime <span class="token operator">=</span> time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&quot;%Y%m%d-%H%M%S&quot;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    filename <span class="token operator">=</span> <span class="token builtin">dir</span> <span class="token operator">+</span> <span class="token string">&#39;\\\\&#39;</span> <span class="token operator">+</span> nowtime <span class="token operator">+</span> <span class="token string">&#39;.jpg&#39;</span>

    resp <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>img_url<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fp<span class="token punctuation">:</span>
        fp<span class="token punctuation">.</span>write<span class="token punctuation">(</span>resp<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&#39;保存成功!&#39;</span><span class="token punctuation">)</span>




url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&#39;https://pic.netbian.com/4kmeinv/index_2.html&#39;</span></span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;User-Agent&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36&#39;</span>
<span class="token punctuation">}</span>

ex <span class="token operator">=</span> <span class="token string">&#39;&lt;li&gt;&lt;a href=&quot;(.*?)&quot; .*?&lt;b&gt;.*?&lt;/b&gt;&lt;/a&gt;&lt;/li&gt;&#39;</span>

<span class="token comment"># dir = input(&#39;请输入要将图片保存在那个路径下（如D:\\\\img）：&#39;)</span>
<span class="token builtin">dir</span> <span class="token operator">=</span> <span class="token string">&#39;C:\\\\Users\\\\编程小白\\\\Pictures\\\\photo\\\\bian2&#39;</span>
<span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    os<span class="token punctuation">.</span>mkdir<span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;该文件夹已经存在，不需要再创建&#39;</span><span class="token punctuation">)</span>



<span class="token keyword">for</span> page <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;正在爬取第&#39;</span><span class="token punctuation">,</span> page<span class="token punctuation">,</span> <span class="token string">&#39;页图片...&#39;</span><span class="token punctuation">)</span>
    url <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&#39;https://pic.netbian.com/4kdongwu/index_</span><span class="token interpolation"><span class="token punctuation">{</span>page<span class="token punctuation">}</span></span><span class="token string">.html&#39;</span></span>
    page_content <span class="token operator">=</span> getPageContent<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    child_a_list <span class="token operator">=</span> jiexi<span class="token punctuation">(</span>ex<span class="token punctuation">,</span> page_content<span class="token punctuation">)</span>

    <span class="token keyword">for</span> child_a <span class="token keyword">in</span> child_a_list<span class="token punctuation">:</span>
        child_url <span class="token operator">=</span> <span class="token string">&#39;https://pic.netbian.com&#39;</span><span class="token operator">+</span> child_a
        child_page_content <span class="token operator">=</span> getPageContent<span class="token punctuation">(</span>child_url<span class="token punctuation">)</span>
        child_ex <span class="token operator">=</span> <span class="token string">&#39;&lt;a href=&quot;&quot; id=&quot;img&quot;&gt;&lt;img src=&quot;(.*?)&quot;&#39;</span>
        img_a_list <span class="token operator">=</span> jiexi2<span class="token punctuation">(</span>child_ex<span class="token punctuation">,</span>child_page_content<span class="token punctuation">)</span>          <span class="token comment"># 获取父页面一页所有图片链接</span>

        <span class="token keyword">for</span> img_a <span class="token keyword">in</span> img_a_list<span class="token punctuation">:</span>
            img_url <span class="token operator">=</span> <span class="token string">&#39;https://pic.netbian.com&#39;</span> <span class="token operator">+</span> img_a
            <span class="token keyword">print</span><span class="token punctuation">(</span>img_url<span class="token punctuation">)</span>
            saveImg<span class="token punctuation">(</span><span class="token builtin">dir</span><span class="token punctuation">,</span>img_url<span class="token punctuation">)</span>

    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46);function r(d,k){return e(),p("div",null,[l,s(" 2. 获取标签之间的文本数据（不包括子标签） "),o,c,s(" 3. 获取标签中指定属性的值 "),u])}const v=t(i,[["render",r],["__file","Python爬虫.html.vue"]]);export{v as default};
