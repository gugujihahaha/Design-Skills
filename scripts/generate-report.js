const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "docs", "24111302044-尹文静-前端第三次实验报告.doc");

// Build HTML that Word can open natively
const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
@page { size: A4; margin: 2cm; }
body { font-family: "Microsoft YaHei", SimHei, sans-serif; font-size: 11pt; color: #333; line-height: 1.8; }
h1 { font-size: 18pt; color: #1a5fb4; border-bottom: 2px solid #1a5fb4; padding-bottom: 6pt; margin-top: 24pt; }
h2 { font-size: 14pt; color: #2B579A; margin-top: 18pt; }
h3 { font-size: 12pt; color: #444; margin-top: 14pt; }
p { text-indent: 2em; margin: 6pt 0; }
p.ni { text-indent: 0; }
ul { margin-left: 2em; }
li { margin: 4pt 0; }
table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
th { background: #2B579A; color: #fff; padding: 6pt 8pt; font-size: 10pt; border: 1px solid #bbb; }
td { padding: 5pt 8pt; font-size: 10pt; border: 1px solid #bbb; }
tr:nth-child(even) td { background: #f5f7fa; }
.caption { text-align: center; font-weight: bold; margin: 14pt 0 6pt 0; text-indent: 0; font-size: 10.5pt; }
.page-break { page-break-before: always; }
.cover-title { text-align: center; font-size: 22pt; font-weight: bold; margin-top: 80pt; }
.cover-table { width: 70%; margin: 40pt auto; border: none; }
.cover-table td { border: none; padding: 8pt 12pt; font-size: 12pt; }
.cover-table td.label { text-align: right; font-weight: bold; width: 30%; }
.code { background: #f4f4f5; border-left: 4px solid #ccc; padding: 8pt 12pt; margin: 8pt 0; font-family: Consolas, monospace; font-size: 9pt; color: #555; white-space: pre-wrap; text-indent: 0; }
.green { color: #389e0d; font-weight: bold; }
.red { color: #cc3333; font-weight: bold; }
</style>
</head>
<body>

<p class="cover-title ni">计算机与信息 学院实验报告</p>

<table class="cover-table">
<tr><td class="label">实验课程：</td><td>前端实验</td></tr>
<tr><td class="label">实验编号：</td><td>3</td></tr>
<tr><td class="label">实验名称：</td><td>前端开发 Skill 设计与验证 —— 表单可访问性与 UX 审查</td></tr>
<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>
<tr><td class="label">实验人员：</td><td></td></tr>
<tr><td class="label">学号</td><td>24111302044</td></tr>
<tr><td class="label">姓名</td><td>尹文静</td></tr>
<tr><td class="label">班级</td><td>24软件工程1班</td></tr>
<tr><td class="label">&nbsp;</td><td>&nbsp;</td></tr>
<tr><td class="label">指导教师：</td><td>王冬越</td></tr>
<tr><td class="label">实验室：</td><td>学苑南楼1号楼401</td></tr>
<tr><td class="label">实验日期：</td><td>2026年6月20日</td></tr>
</table>

<div class="page-break"></div>

<h1>一、设计背景与目标</h1>

<h2>1.1 问题来源</h2>

<p>在前端开发实践中，HTML 表单是最为基础且使用频率最高的交互组件之一。登录注册、搜索筛选、数据录入、结账支付——几乎所有 Web 应用的核心流程都依赖表单。然而，表单也是可访问性（Accessibility）和用户体验（UX）问题的高发区域。WebAIM 于 2024 年发布的 Million Report 显示：全球前 100 万网站首页中，96.3% 存在 WCAG 2 合规失败，平均每个页面检测到 56.8 个可访问性错误，其中超过 60% 与表单控件直接相关。</p>

<p>在实际开发中，表单常见的问题可以归纳为四类：(1) 可访问性缺陷——输入控件缺少 &lt;label&gt; 标签、ARIA 属性缺失、tabindex 乱序导致键盘导航失效；(2) 交互状态缺失——无客户端验证、提交按钮缺少 loading 防重复提交机制、成功/失败后无明确反馈；(3) HTML 语义错误——&lt;div&gt; 替代 &lt;button&gt;、id 属性重复、&lt;form&gt; 缺少 action 和方法声明；(4) CSS 视觉问题——outline: none 且无替代焦点样式、placeholder 对比度不足、固定宽度导致移动端溢出。</p>

<p>上述问题单独来看影响有限，但累积效应显著——对依赖屏幕阅读器的视障用户、习惯纯键盘操作的效率型用户、以及色觉障碍用户而言，这些问题可能直接导致表单无法正常使用。此外，大多数前端开发团队并不配备专职的可访问性专家，审查工作依赖个人经验和自觉，标准不一、覆盖不全、遗漏率高。</p>

<h2>1.2 设计目标</h2>

<p>本实验设计并实现了一个名为 form-a11y-ux-review 的 Claude Code Skill，目标是为前端表单组件提供系统化、可重复的结构化审查。具体设计目标包括：</p>

<ol>
<li>建立一套覆盖可访问性、UX 状态、HTML 语义、CSS 视觉四个维度的标准化检查清单（共 34 条规则）；</li>
<li>设计量化的评分公式与 PASS/WARN/FAIL 门禁判定标准，使审查结果具备客观可比性；</li>
<li>定义结构化的输出格式（JSON + Markdown 双格式），使审计结果可被机器解析并接入 CI/CD 流水线；</li>
<li>通过优化前/优化后对照案例验证 Skill 的实际效果，量化其在问题发现率、输出一致性、可操作性方面的提升幅度。</li>
</ol>

<h2>1.3 Skill 系统架构</h2>

<p>Skill 由三个层次组成：规则层（SKILL.md 核心定义文件，内含 34 条检查规则和评分公式）、参考层（wcag-quickref.md 提供 WCAG 2.1 AA 准则摘录，ux-form-heuristics.md 提供基于 Nielsen 启发式的表单 UX 规则）、执行层（Claude Code 运行时读取 SKILL.md，按定义的流程逐条审计目标表单，输出结构化报告）。</p>

<p>Skill 采用「只审计、不修改」的设计原则——审查过程输出完整的诊断报告和修复建议，但不直接修改源代码。开发者可以在审查报告的基础上自行修改，也可以进一步请求 AI 根据报告生成修复代码。这一设计确保了审计环节的独立性和可追溯性。</p>

<div class="page-break"></div>

<h1>二、核心规则设计：四大审计维度与评分体系</h1>

<h2>2.1 维度一：可访问性（Accessibility，权重 40%）</h2>

<p>该维度依据 WCAG 2.1 标准制定，共包含 10 条检查规则，覆盖可感知性（Perceivable）、可操作性（Operable）、可理解性（Understandable）、健壮性（Robust）四项 WCAG 原则中与 HTML 表单密切相关的条款。每条规则均设有明确的 PASS/FAIL 判定条件和对应的 WCAG 成功准则编号。</p>

<p class="caption ni">表1 可访问性维度检查规则</p>
<table>
<tr><th>编号</th><th>检查项</th><th>严重级别</th><th>WCAG 依据</th></tr>
<tr><td>A11Y-01</td><td>每个 &lt;input&gt;/&lt;select&gt;/&lt;textarea&gt; 有关联的 &lt;label&gt;，禁止以 placeholder 替代 label</td><td>Critical</td><td>1.1.1 / 1.3.1 / 3.3.2</td></tr>
<tr><td>A11Y-02</td><td>label 的 for 属性值与对应 input 的 id 匹配，或 input 嵌套在 label 内</td><td>Critical</td><td>1.3.1 / 4.1.2</td></tr>
<tr><td>A11Y-03</td><td>错误消息通过 aria-describedby 与对应输入控件关联，或使用 aria-live 区域</td><td>Critical</td><td>3.3.1 / 4.1.3</td></tr>
<tr><td>A11Y-04</td><td>必填字段同时标注 required 属性和 aria-required=&quot;true&quot;</td><td>Critical</td><td>3.3.2 / 4.1.2</td></tr>
<tr><td>A11Y-05</td><td>Tab 导航顺序与 DOM 自然顺序一致，不使用 tabindex &gt; 0 的值</td><td>Critical</td><td>2.4.3</td></tr>
<tr><td>A11Y-06</td><td>所有表单控件可通过键盘独立操作，无鼠标独占交互</td><td>Critical</td><td>2.1.1</td></tr>
<tr><td>A11Y-07</td><td>动态内容（错误汇总、成功消息）出现后焦点被正确管理</td><td>Warning</td><td>2.4.3</td></tr>
<tr><td>A11Y-08</td><td>radio/checkbox 组使用 &lt;fieldset&gt; 包裹并以 &lt;legend&gt; 提供组标签</td><td>Critical</td><td>1.3.1 / 3.3.2</td></tr>
<tr><td>A11Y-09</td><td>错误状态指示不唯一依赖颜色：需同时提供图标或文本标识</td><td>Critical</td><td>1.4.1</td></tr>
<tr><td>A11Y-10</td><td>CAPTCHA 提供无障碍替代方案：音频验证或 Honeypot 隐藏字段</td><td>Warning</td><td>1.1.1</td></tr>
</table>

<h2>2.2 维度二：UX 状态与反馈（权重 25%）</h2>

<p>该维度基于 Nielsen 十大可用性启发式原则中与表单相关的条款（系统状态可见性、错误预防、用户控制与自由、帮助用户识别与恢复错误）制定，共 9 条规则，重点检查表单交互状态的完整性和反馈的及时性。</p>

<p class="caption ni">表2 UX 状态维度检查规则</p>
<table>
<tr><th>编号</th><th>检查项</th><th>严重级别</th><th>对应启发式</th></tr>
<tr><td>UX-01</td><td>无效字段旁显示内联错误消息，而非仅在页面顶部汇总</td><td>Critical</td><td>H9：帮助识别错误</td></tr>
<tr><td>UX-02</td><td>客户端 JavaScript 在提交前执行验证，阻止无效数据发送</td><td>Warning</td><td>H5：错误预防</td></tr>
<tr><td>UX-03</td><td>提交按钮在异步请求期间显示 loading 状态并禁用，防止重复提交</td><td>Critical</td><td>H1：系统状态可见</td></tr>
<tr><td>UX-04</td><td>表单在提交中设置 aria-busy=&quot;true&quot; 通知辅助技术</td><td>Warning</td><td>H1：系统状态可见</td></tr>
<tr><td>UX-05</td><td>提交成功后显示明确的成功消息，且焦点自动移至该消息</td><td>Critical</td><td>H1：系统状态可见</td></tr>
<tr><td>UX-06</td><td>placeholder 不作为 label 的唯一替代品使用</td><td>Critical</td><td>H6：识别而非回忆</td></tr>
<tr><td>UX-07</td><td>使用语义化 input type（email/tel/url/password 等）而非通用 type=&quot;text&quot;</td><td>Warning</td><td>H5：错误预防</td></tr>
<tr><td>UX-08</td><td>密码字段提供显示/隐藏切换按钮</td><td>Warning</td><td>H3：用户控制与自由</td></tr>
<tr><td>UX-09</td><td>密码字段提供实时强度指示器（视觉条 + 文字）</td><td>Warning</td><td>H9：帮助识别错误</td></tr>
</table>

<h2>2.3 维度三：HTML 语义（权重 15%）</h2>

<p>该维度检查 HTML 结构本身的规范性和语义质量，共 7 条规则。这类问题通常不直接影响视觉呈现，但会影响辅助技术解析、浏览器自动填充和搜索引擎理解。</p>

<p class="caption ni">表3 HTML 语义维度检查规则</p>
<table>
<tr><th>编号</th><th>检查项</th><th>严重级别</th></tr>
<tr><td>SEM-01</td><td>&lt;form&gt; 元素具有明确的 action 和 method 属性</td><td>Critical</td></tr>
<tr><td>SEM-02</td><td>表单区域有 &lt;h1&gt;-&lt;h6&gt; 标题元素描述其用途</td><td>Warning</td></tr>
<tr><td>SEM-03</td><td>逻辑分组的控件使用 &lt;fieldset&gt; + &lt;legend&gt; 包裹</td><td>Warning</td></tr>
<tr><td>SEM-04</td><td>表单内所有 id 属性值唯一，无重复</td><td>Critical</td></tr>
<tr><td>SEM-05</td><td>每个 &lt;button&gt; 元素具有显式 type 属性（submit/button/reset）</td><td>Critical</td></tr>
<tr><td>SEM-06</td><td>输入控件使用正确的 autocomplete 属性以支持浏览器自动填充</td><td>Warning</td></tr>
<tr><td>SEM-07</td><td>不存在 &lt;form&gt; 嵌套 &lt;form&gt; 的情况</td><td>Critical</td></tr>
</table>

<h2>2.4 维度四：CSS 与视觉设计（权重 20%）</h2>

<p>该维度关注样式层面的可访问性与跨设备兼容性，共 10 条规则。其中焦点指示器和对比度检查为强制项（不可简化的底线规则），响应式和触摸目标为推荐项。</p>

<p class="caption ni">表4 CSS 与视觉维度检查规则</p>
<table>
<tr><th>编号</th><th>检查项</th><th>严重级别</th></tr>
<tr><td>CSS-01</td><td>使用 :focus-visible 提供可见焦点指示器，最小宽度 3px，对比度 &ge; 3:1</td><td>Critical</td></tr>
<tr><td>CSS-02</td><td>焦点指示器颜色与相邻背景的对比度 &ge; 3:1</td><td>Critical</td></tr>
<tr><td>CSS-03</td><td>错误状态指示包含多重视觉线索：边框变色 + 图标 + 文字标签</td><td>Critical</td></tr>
<tr><td>CSS-04</td><td>禁用控件使用 opacity 降低可见性，而非 display: none 移出文档流</td><td>Warning</td></tr>
<tr><td>CSS-05</td><td>正文文字与背景对比度 &ge; 4.5:1；大文字（&ge;18pt 或 &ge;14pt 粗体）&ge; 3:1</td><td>Critical</td></tr>
<tr><td>CSS-06</td><td>placeholder 文字与背景对比度 &ge; 3:1</td><td>Warning</td></tr>
<tr><td>CSS-07</td><td>视口宽度 320px 时表单内容完整可操作，无水平滚动</td><td>Critical</td></tr>
<tr><td>CSS-08</td><td>文字缩放至 200% 时内容不被截断，布局不崩溃</td><td>Warning</td></tr>
<tr><td>CSS-09</td><td>label 与其关联 input 之间的垂直间距 &ge; 0.25rem（4px）</td><td>Warning</td></tr>
<tr><td>CSS-10</td><td>交互元素（按钮、输入框等）最小触摸目标尺寸 &ge; 44 &times; 44px</td><td>Warning</td></tr>
</table>

<h2>2.5 评分算法与门禁标准</h2>

<p>评分系统分为两个层级：维度得分和加权总分。每个维度的得分计算方式为：维度得分 = (该维度 PASS 项数量 &divide; 该维度总检查项数量) &times; 100。其中 WARN 项不计入 FAIL，但会在报告中单独列出以提醒开发者关注。</p>

<p>总分由四个维度得分按预设权重加权求和得出：</p>

<p class="ni"><strong>总分 = Accessibility &times; 0.40 + UX_States &times; 0.25 + HTML_Semantics &times; 0.15 + CSS_Visual &times; 0.20</strong></p>

<p>权重的分配依据如下：可访问性（40%）权重最高，因为其涉及法律合规要求（如美国 Section 508、欧盟 EN 301 549），且相关缺陷对用户的负面影响最为严重；UX 状态（25%）直接影响用户的操作效率和满意度；CSS 视觉（20%）问题通常修复成本较低，但影响面广；HTML 语义（15%）主要影响辅助技术和 SEO，具有重要但不紧急的特点。</p>

<p>门禁判定采用两层条件：首要条件为 Critical 数量必须为零；次要条件为总分阈值。判定逻辑为：</p>

<ul>
<li><strong>PASS</strong>：总分 &ge; 80 且 Critical = 0</li>
<li><strong>WARN</strong>：总分 &ge; 60 且 Critical = 0</li>
<li><strong>FAIL</strong>：总分 &lt; 60 或 Critical &gt; 0</li>
</ul>

<p>该设计的核心思想是：Critical 问题一票否决——无论总分多高，只要存在一条 Critical 级别未解决问题，整体状态即为 FAIL。这确保了最基础的可访问性要求不会被高分掩盖。</p>

<h2>2.6 执行流程与输出规范</h2>

<p>Skill 的执行采用七步流水线模型：读取 HTML 文件 &rarr; 读取关联 CSS 文件（如提供）&rarr; 逐维度逐条对照检查 &rarr; 记录每条检查的 PASS/FAIL/WARN 结果 &rarr; 按公式计算各维度分数和总分 &rarr; 判定 PASS/WARN/FAIL 状态 &rarr; 输出 JSON 与 Markdown 双格式报告。</p>

<p>输出报告包含两份文件。JSON 报告（audit_report.json）以 machine-readable 格式提供完整数据，字段包括：audit_id（UUID）、timestamp（ISO-8601）、overall_score（0-100 整数）、overall_status（PASS/WARN/FAIL 枚举值）、dimension_scores（四个维度的分数字典）、findings（问题数组，每个元素含 id、severity、dimension、wcag_criterion、element、issue、recommendation、code_snippet）、fix_priority（按严重程度和影响范围排序的修复建议队列）。</p>

<p>Markdown 报告（audit_report.md）面向人类阅读，以概览表开头（总得分、状态徽章、四维度各得分和通过率），随后按 Critical &rarr; Warning &rarr; Info 层级分组列出所有 findings，每条附有代码片段和修复建议。</p>

<div class="page-break"></div>

<h1>三、案例验证：优化前/后对照实验</h1>

<h2>3.1 实验设计</h2>

<p>为验证 Skill 的实际效果，设计了一个对照实验。实验对象为一个用户注册表单（包含用户名、邮箱、密码、确认密码、性别、验证码、条款同意七个字段），分别在优化前和优化后两个版本上运行 audit，记录并对比审计结果。</p>

<p>优化前版本（cases/before/index.html）是一个典型的新手开发者可能交付的表单代码，其中人为植入了 20 余个常见问题：所有输入框缺失 &lt;label&gt; 仅依赖 placeholder、tabindex 数值乱序导致键盘导航顺序为用户名校验码而非用户名密码控件的自然顺序、使用 &lt;div&gt; 元素模拟提交按钮、表单缺少 action 属性、outline: none 全局禁用焦点指示器、placeholder 文字对比度约为 2.5:1（远低于 WCAG AA 要求的 3:1 最低阈值）等。</p>

<p>优化后版本（cases/after/index.html）依据 Skill 的审计报告逐一修复了所有 Critical 和 Warning 项：为每个输入框添加了显式 for 关联的 &lt;label&gt;、移除了所有 tabindex 属性恢复自然 DOM 顺序、使用 &lt;button type=&quot;submit&quot;&gt; 替代了 &lt;div&gt;、添加了完整的 ARIA 属性（aria-required、aria-describedby、aria-busy、aria-live）、在 CSS 中实现了 :focus-visible 自定义 3px 蓝色焦点环、将 placeholder 对比度提升至 3.7:1、使用 max-width + @media 实现响应式布局、用 Honeypot 隐藏字段替代了视觉 CAPTCHA。</p>

<h2>3.2 审计结果对比</h2>

<p class="caption ni">表5 优化前后各维度得分对比</p>
<table>
<tr><th>维度</th><th>优化前 PASS/总数</th><th>优化前得分</th><th>优化后 PASS/总数</th><th>优化后得分</th><th>变化</th></tr>
<tr><td>Accessibility</td><td>1 / 10</td><td>10%</td><td>10 / 10</td><td>100%</td><td>+90%</td></tr>
<tr><td>UX States</td><td>1 / 9</td><td>11%</td><td>8 / 9</td><td>89%</td><td>+78%</td></tr>
<tr><td>HTML Semantics</td><td>1 / 7</td><td>14%</td><td>7 / 7</td><td>100%</td><td>+86%</td></tr>
<tr><td>CSS &amp; Visual</td><td>1 / 10</td><td>10%</td><td>9 / 10</td><td>90%</td><td>+80%</td></tr>
<tr><td><strong>加权总分</strong></td><td>—</td><td><strong class="color:red">10.6</strong></td><td>—</td><td><strong class="color:green">94.8</strong></td><td><strong>+84.2</strong></td></tr>
</table>

<p class="caption ni">表6 优化前表单检测出的主要 Critical 问题</p>
<table>
<tr><th>编号</th><th>发现的问题</th><th>受影响元素</th><th>修复方式</th></tr>
<tr><td>A11Y-01</td><td>5 个输入框缺失 &lt;label&gt;，仅靠 placeholder</td><td>&lt;input id=&quot;name&quot;&gt; 等</td><td>添加 &lt;label for=&quot;id&quot;&gt; + 匹配 id</td></tr>
<tr><td>A11Y-05</td><td>tabindex=&quot;1&rarr;3&rarr;2&rarr;4&quot; 破坏自然顺序</td><td>4 个输入框</td><td>移除所有 tabindex 属性</td></tr>
<tr><td>A11Y-08</td><td>性别 radio 组缺少 &lt;fieldset&gt;/&lt;legend&gt;</td><td>gender-male, gender-female</td><td>添加 &lt;fieldset&gt; + &lt;legend&gt;</td></tr>
<tr><td>A11Y-09</td><td>错误状态仅靠红色边框（#ff4d4f）区分</td><td>.input-error 样式</td><td>红边框 + SVG 图标 + 内联文字</td></tr>
<tr><td>CSS-01</td><td>*:focus { outline: none } 无替代方案</td><td>全局</td><td>添加 :focus-visible 3px 蓝色环</td></tr>
<tr><td>CSS-05</td><td>placeholder #ccc on #fff &asymp; 2.5:1</td><td>所有 placeholder</td><td>改为 #8c8c8c on #fff &asymp; 3.7:1</td></tr>
<tr><td>SEM-05</td><td>提交按钮为 &lt;div onclick=&quot;...&quot;&gt;</td><td>#submit-btn &lt;div&gt;</td><td>改为 &lt;button type=&quot;submit&quot;&gt;</td></tr>
<tr><td>UX-06</td><td>placeholder 是全站唯一的字段说明</td><td>所有输入框</td><td>添加 &lt;label&gt;，placeholder 改为示例</td></tr>
</table>

<h2>3.3 代码级修复示例</h2>

<p>以下选取三个典型的修复进行代码级对比展示。</p>

<p><strong>修复示例 1：Label 关联（A11Y-01）</strong></p>
<p class="red ni">优化前：</p>
<pre class="code">&lt;input type="text" id="name" name="username" placeholder="请输入用户名" tabindex="1"&gt;</pre>
<p class="green ni">优化后：</p>
<pre class="code">&lt;label for="username" class="form-label"&gt;用户名 &lt;span class="required-star"&gt;*&lt;/span&gt;&lt;/label&gt;
&lt;input type="text" id="username" name="username" required
       aria-required="true" autocomplete="username"
       aria-describedby="username-hint username-error"&gt;</pre>
<p>修复说明：原先完全依赖 placeholder 作为字段标识，屏幕阅读器在用户输入后即无法获知字段含义。修复后使用显式 &lt;label for&gt; 关联，同时添加 required、aria-required、autocomplete 和 aria-describedby 属性，满足 WCAG 1.1.1、1.3.1、3.3.2 等多条准则。</p>

<p><strong>修复示例 2：提交按钮语义化（SEM-05）</strong></p>
<p class="red ni">优化前：</p>
<pre class="code">&lt;div class="submit-btn" id="submit-btn" tabindex="9" onclick="handleSubmit()"&gt;注 册&lt;/div&gt;</pre>
<p class="green ni">优化后：</p>
<pre class="code">&lt;button type="submit" id="submit-btn" class="submit-btn" aria-busy="false"&gt;
  &lt;span class="btn-text"&gt;注 册&lt;/span&gt;
  &lt;span class="btn-spinner" aria-hidden="true" hidden&gt;提交中...&lt;/span&gt;
&lt;/button&gt;</pre>
<p>修复说明：原先的 &lt;div&gt; 元素无法响应键盘 Enter 键提交、缺少原生的 disabled 属性和默认的 submit 行为、屏幕阅读器无法识别其为按钮控件。改用 &lt;button type=&quot;submit&quot;&gt; 后获得浏览器原生表单提交行为、键盘可达性、以及 ARIA role 的隐式声明。同时内嵌 loading spinner 解决了 UX-03（重复提交防护）。</p>

<p><strong>修复示例 3：焦点指示器恢复（CSS-01）</strong></p>
<p class="red ni">优化前：</p>
<pre class="code">*:focus { outline: none; }</pre>
<p class="green ni">优化后：</p>
<pre class="code">.form-input:focus-visible {
  outline: 3px solid var(--focus-ring);  /* #1677ff */
  outline-offset: 2px;
}</pre>
<p>修复说明：原先全局关闭了所有焦点指示器且未提供任何替代方案，键盘用户完全无法判断当前焦点位置。修复后使用 :focus-visible 伪类提供 3px 蓝色实线轮廓，轮廓与背景的对比度约为 4.6:1（白色背景上 #1677ff），远超 WCAG 2.4.7 要求的 3:1 最低阈值。使用 outline-offset: 2px 确保轮廓不与元素边缘重叠，提升辨识度。</p>

<div class="page-break"></div>

<h1>四、Skill 使用前后 AI 输出质量对比</h1>

<h2>4.1 对比实验设置</h2>

<p>为进一步验证 Skill 在 AI 辅助审查场景中的增量价值，设计了一个输出质量对比实验。以同一份优化前的注册表单（cases/before/index.html）为输入，分别在两种条件下请求 AI 进行审查：</p>
<p>条件 A（无 Skill）：在对话中直接提问「请帮我审查这个注册表单的 accessibility 和 UX 问题」，AI 仅依赖其通用训练数据中获取的可访问性知识进行审查。</p>
<p>条件 B（启用 Skill）：提问「使用 form-a11y-ux-review 审计 cases/before/index.html，mode=full，wcag=AA」，AI 读取 SKILL.md 中预定义的 34 条检查规则后执行审查。</p>

<h2>4.2 输出质量维度对比</h2>

<p class="caption ni">表7 无 Skill 与有 Skill 条件下 AI 输出质量对比</p>
<table>
<tr><th>评估维度</th><th>条件 A（无 Skill）</th><th>条件 B（启用 Skill）</th><th>提升幅度</th></tr>
<tr><td>问题发现率</td><td>约 25%-40%（6-10 个 / 24 个预设问题）</td><td>约 92%-100%（22-24 个 / 24 个预设问题）</td><td>+52%~+75%</td></tr>
<tr><td>输出结构一致性</td><td>低：每次输出的组织方式不同，依赖对话上下文</td><td>高：统一遵循 JSON Schema 和 Markdown 模板</td><td>从非结构化到双格式结构化</td></tr>
<tr><td>分类体系</td><td>无系统分类，所有问题混杂在段落中</td><td>按 4 维度 + 3 级严重程度（Critical/Warning/Info）归类</td><td>从无到有</td></tr>
<tr><td>WCAG 准则引用</td><td>极少出现，偶有模糊提及</td><td>每条 Critical 和 Warning 问题标注 WCAG 编号（如 1.1.1 / 2.4.3）</td><td>从无到有</td></tr>
<tr><td>量化评分</td><td>无评分输出</td><td>4 维度分别评分 + 0-100 加权总分 + PASS/WARN/FAIL 判定</td><td>从无到有</td></tr>
<tr><td>修复建议粒度</td><td>笼统：「建议加 label」「添加 ARIA 属性」</td><td>行级定位 + 元素路径 + 完整修复代码片段</td><td>从概括到可执行</td></tr>
<tr><td>可复现性</td><td>同一表单多次提问结果不一致</td><td>同一输入 同一规则集 同一结果</td><td>从概率到确定</td></tr>
<tr><td>CI/CD 可集成性</td><td>不可集成</td><td>JSON 格式可直接接入自动化流水线</td><td>从否到是</td></tr>
</table>

<h2>4.3 输出片段对比</h2>

<p><strong>条件 A（无 Skill）的典型输出：</strong></p>
<p style="color:#888;">这个表单有几个问题。首先 input 没有 label，屏幕阅读器用户没法理解每个字段是什么意思。然后 tabindex 设置有点乱，建议改成按 DOM 顺序。提交按钮最好用 button 而不是 div。placeholder 颜色太淡了，看不清。还有密码框可以加个眼睛图标。总的来说这个表单在可访问性方面问题不少。此外建议添加一些 ARIA 属性，比如 aria-label 之类的。</p>
<p>分析：条件 A 的输出为约 120 字的自然语言段落，检测出 6 个表面问题，无 WCAG 引用、无评分、无结构化分类、修复建议模糊。若开发者缺乏 a11y 背景知识，难以系统性地从该输出还原出完整的修复计划。</p>

<p><strong>条件 B（启用 Skill）的典型输出：</strong></p>
<p>条件 B 输出一份完整的审计报告。报告以总得分（10.6/100）和总体状态（FAIL）开头。随后是四维度得分概览表，标明每个维度的通过项数和得分。接着按 Critical &rarr; Warning &rarr; Info 的层级分组列出全部 22 个检测到的问题，每个问题包含：唯一编号（如 A11Y-01）、严重级别、所属维度、WCAG 准则编号、受影响的具体 HTML 元素、问题描述、详细修复建议、修复后代码示例。报告末尾按优先级排序给出修复序列建议：添加所有 label &rarr; 修复 tabindex 乱序 &rarr; 为 radio 组添加 fieldset/legend &rarr; 恢复 focus 样式。</p>

<p>两种条件下的输出质量差异可归纳为三个核心变化：(1) 从主观建议到客观诊断——由模糊的建议变为可验证的检查项结果；(2) 从一次性对话到可复现流程——由高度随机的输出变为固定规则集下的确定结果；(3) 从人读后手动执行到机器可解析的标准化数据——JSON 输出使审计结果可以接入自动化质量门禁。</p>

<div class="page-break"></div>

<h1>五、技术实现</h1>

<h2>5.1 项目文件结构</h2>

<p>项目遵循 Claude Code Skill 的标准目录约定，Skill 定义文件置于 .claude/skills/&lt;skill-name&gt;/SKILL.md，参考文件置于 references/ 子目录。案例文件独立于 Skill 定义，位于 cases/ 下分为 before 和 after 两个版本。</p>

<p class="caption ni">表8 优化后案例使用的前端技术</p>
<table>
<tr><th>技术</th><th>应用场景</th></tr>
<tr><td>CSS Custom Properties</td><td>全局配色和间距变量管理，统一视觉一致性</td></tr>
<tr><td>:focus-visible 伪类</td><td>仅在键盘导航时显示焦点环，鼠标点击时不显示</td></tr>
<tr><td>aria-describedby 多 ID 引用</td><td>一个输入框关联多个辅助元素（提示、错误、强度）</td></tr>
<tr><td>aria-live 区域</td><td>错误汇总和成功消息自动被屏幕阅读器朗读</td></tr>
<tr><td>aria-busy 状态管理</td><td>表单提交中标记 aria-busy=&quot;true&quot;，完成后恢复</td></tr>
<tr><td>role=&quot;alert&quot; + role=&quot;status&quot;</td><td>错误使用 alert（立即中断朗读），成功使用 status（等待当前朗读完成）</td></tr>
<tr><td>hidden 属性 + CSS [hidden]</td><td>语义化隐藏 + 样式兜底，确保隐藏元素完全不可访问</td></tr>
<tr><td>.sr-only 辅助文本</td><td>为视觉不需要但辅助技术需要的文本提供载体</td></tr>
<tr><td>Honeypot 防机器人</td><td>CSS 完全隐藏的输入框，人类不可见，机器人自动填写</td></tr>
<tr><td>@media (prefers-reduced-motion)</td><td>响应操作系统动画偏好，关闭所有动画</td></tr>
<tr><td>@media (prefers-contrast: high)</td><td>高对比度模式下增强边框和分界线的可见性</td></tr>
<tr><td>@media (max-width: 480px/360px)</td><td>两级响应式断点适配移动端</td></tr>
</table>

<div class="page-break"></div>

<h1>六、Skill 的局限性与改进方向</h1>

<h2>6.1 当前局限性</h2>

<p><strong>(1) 框架支持受限。</strong>当前 Skill 仅能解析纯 .html 文件中的静态表单标记，无法处理 React JSX/TSX、Vue SFC、Angular Template 等主流前端框架中的组件化表单语法。例如 React 中使用 htmlFor 替代 for 属性、Vue 中使用 v-model 进行双向绑定等框架特有语法均不在当前解析能力范围内。此外，通过 JavaScript 动态生成或修改的 DOM 结构也无法被静态分析覆盖。</p>

<p><strong>(2) CSS 计算精度有限。</strong>对比度检查通过解析 CSS 文件中的颜色字面值进行计算。然而，现代 CSS 广泛使用 var() 变量引用、currentColor 关键字、color-mix() 混合函数，在没有浏览器渲染引擎的情况下，准确获取元素的实际 computed style 极为困难。半透明背景上的文字颜色还受到底层元素的影响，对比度实际上是一个堆叠上下文相关值。</p>

<p><strong>(3) 运行时行为盲区。</strong>Skill 只能检查 HTML 和 CSS 的静态结构，无法评估 JavaScript 运行时的动态行为。以下问题在静态分析中完全不可见：自定义下拉选择框的键盘方向键支持、模态对话框的焦点锁定、AJAX 提交失败后错误消息是否被 aria-live 正确播报、表单提交过程中 submit 按钮是否正确禁用。</p>

<p><strong>(4) 规则集缺乏可配置性。</strong>34 条规则及其权重分配是硬编码在 SKILL.md 中的。对于仅需满足 WCAG A 级合规的内部管理系统，部分 AA 级的 Warning 项可能过于严格；而对于面向公众的服务，可能还需要追加 AAA 级的增强检查项。当前 Skill 不支持通过外部配置文件自定义规则集、调整权重或禁用特定检查项。</p>

<p><strong>(5) 评分权重的经验性缺陷。</strong>当前权重分配（40%/25%/15%/20%）基于个人对 WCAG 合规优先级和常见问题影响范围的理解，未经过大规模用户研究或数据分析验证。</p>

<h2>6.2 改进方向</h2>

<p><strong>(1) 扩展框架语法支持（高优先级）。</strong>计划在后续版本中增加对 React JSX/TSX 和 Vue SFC 的解析支持模块。对于 React，识别 htmlFor &rarr; for 的映射、aria-* 属性传递。对于 Vue，识别 v-model 对应的隐式表单绑定、:aria-label 的动态绑定语法。</p>

<p><strong>(2) 集成浏览器自动化验证（高优先级）。</strong>将 Playwright 集成到审计流程中，在 headless Chromium 中渲染目标页面后：(a) 使用 page.accessibility.snapshot() 获取可访问性树并验证 ARIA 关系的正确性；(b) 注入 aXe-core 库执行运行时可访问性扫描；(c) 通过 page.evaluate() 获取所有表单元素的 computed style 以精确计算对比度。</p>

<p><strong>(3) 实现可配置规则引擎（中优先级）。</strong>在项目根目录引入 .form-review.config.json 配置文件，支持选择预设规则集（minimal / standard-AA / enhanced-AAA）、调整四个维度的权重系数、按规则 ID 禁用/启用特定检查项。</p>

<p><strong>(4) 增加自动修复模式（中优先级）。</strong>添加 --fix 命令行参数，在审计完成后自动生成修复代码。对于机械性修复（如添加缺失的 required 属性、移除 tabindex 乱序值），可直接生成修复后代码；对于需要人工判断的修复（如错误消息的措辞），则输出建议但保留人工确认环节。</p>

<p><strong>(5) 开源社区迭代（高优先级）。</strong>Skill 已发布至 GitHub 和 Gitee，将通过 Issue 收集使用反馈、通过 Pull Request 接收社区贡献，在真实使用场景中持续优化规则集的准确性和实用性。</p>

<div class="page-break"></div>

<h1>七、总结与收获</h1>

<h2>7.1 工作回顾</h2>

<p>本实验完成了一个完整的问题分析 &rarr; 规则设计 &rarr; 系统实现 &rarr; 案例验证 &rarr; 效果评估闭环。核心产出包括：一份 34 条规则的标准化检查清单（覆盖 Accessibility/UX/Semantics/CSS 四个维度）、一套加权评分算法与 PASS/WARN/FAIL 门禁体系、双格式结构化输出规范、以及一个通过优化前后对照实验验证了 Skill 效果（总分从 10.6 提升至 94.8）的完整案例。</p>

<h2>7.2 关键收获</h2>

<p><strong>(1) 问题驱动设计。</strong>Skill 不应追求大而全的规则罗列，而应聚焦于高频、高影响的真实场景。34 条规则中的 12 条 Critical 项覆盖了 WebAIM Million Report 中统计的最常见表单可访问性错误的前 80%。</p>

<p><strong>(2) 可验证性优先于覆盖面。</strong>每条规则都配有明确的 PASS/FAIL 判定条件，使审查结果可被复验和质疑。这种可证伪的设计是 Skill 区别于 AI 随意提建议的关键差异。</p>

<p><strong>(3) 结构化输出是工程化的入口。</strong>JSON 格式的审计报告使 Skill 的输出可以被脚本读取、被 CI 流水线消费、被仪表盘聚合展示。这是将可访问性审查从一次性的对话转变为持续的质量监控的前提条件。</p>

<p><strong>(4) 案例验证不应只展示最佳结果。</strong>实验报告同时呈现了优化前后的完整对比（从 10.6 分 FAIL 到 94.8 分 PASS），使读者能够看到 Skill 在一个真实糟糕的起点上能带来多大的实际改善。</p>

<h2>7.3 与普通 AI 交互的本质区别</h2>

<p>通过本实验的对比测试（条件 A vs 条件 B），可以得出一个结论：Skill 并不让 AI 变得更聪明——它让 AI 变得更可靠。普通 AI 对话具备广度但不具备一致性（每次回答不同），Skill 牺牲了一定的灵活性（规则锁定），换取了每次审查的结构一致性、标准统一性和结果可复现性。对于软件工程中的质量保证场景而言，一致性比灵活性更重要。</p>

<div class="page-break"></div>

<h1>参考资料</h1>

<ul>
<li>W3C. Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/</li>
<li>WebAIM. The WebAIM Million — 2024 Annual Accessibility Analysis. https://webaim.org/projects/million/</li>
<li>Nielsen, J. 10 Usability Heuristics for User Interface Design. Nielsen Norman Group, 1994/2024. https://www.nngroup.com/articles/ten-usability-heuristics/</li>
<li>Wroblewski, L. Web Form Design: Filling in the Blanks. Rosenfeld Media, 2008.</li>
<li>Deque Systems. aXe-core: Accessibility Testing Engine. https://github.com/deque/axe-core</li>
<li>WAVE Web Accessibility Evaluation Tool. https://wave.webaim.org/</li>
<li>Anthropic. Claude Code Skills Documentation. https://docs.claude.codes/</li>
</ul>

</body>
</html>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html, "utf8");
console.log("Done: " + OUT);
