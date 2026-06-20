const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType,
  ShadingType
} = require("docx");

const OUTPUT = path.join(__dirname, "..", "docs", "24111302044尹文静-实验报告.docx");

function h(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: level === HeadingLevel.HEADING_1 ? 400 : 280, after: 180 },
    children: [new TextRun({ text, font: "Microsoft YaHei" })],
  });
}

function p(text, opt = {}) {
  return new Paragraph({
    spacing: { after: 140, line: 380 },
    indent: opt.indent ? { firstLine: 480 } : undefined,
    children: [new TextRun({
      text,
      font: opt.font || "Microsoft YaHei",
      size: opt.size || 22,
      bold: opt.bold || false,
      color: opt.color || "333333",
    })],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60, line: 340 },
    bullet: { level: 0 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 22, color: "333333" })],
  });
}

function tbl(headers, rows, widths) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((hdr, i) => new TableCell({
          width: widths ? { size: widths[i], type: WidthType.PERCENTAGE } : undefined,
          shading: { fill: "4472C4", type: ShadingType.CLEAR },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: hdr, font: "Microsoft YaHei", size: 20, bold: true, color: "FFFFFF" })],
          })],
        })),
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, i) => new TableCell({
          width: widths ? { size: widths[i], type: WidthType.PERCENTAGE } : undefined,
          children: [new Paragraph({
            children: [new TextRun({ text: String(cell), font: "Microsoft YaHei", size: 20, color: "333333" })],
          })],
        })),
      })),
    ],
  });
}

// =====================
const doc = new Document({
  sections: [{
    properties: {},
    children: [

      // 封面
      new Paragraph({ spacing: { before: 2600 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 240 },
        children: [new TextRun({ text: "前端开发 Skill 设计与验证", font: "Microsoft YaHei", size: 44, bold: true, color: "1a5fb4" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 720 },
        children: [new TextRun({ text: "实验报告", font: "Microsoft YaHei", size: 36, bold: true, color: "333333" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 100 },
        children: [new TextRun({ text: "form-a11y-ux-review：前端表单可访问性与 UX 审查 Skill", font: "Microsoft YaHei", size: 22, color: "595959" })],
      }),
      new Paragraph({ spacing: { before: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
        children: [new TextRun({ text: "学号：24111302044    姓名：尹文静", font: "Microsoft YaHei", size: 24, color: "333333" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: { after: 80 },
        children: [new TextRun({ text: "GitHub：https://github.com/gugujihahaha/Design-Skills", font: "Microsoft YaHei", size: 20, color: "1a5fb4" })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "2026 年 6 月 20 日", font: "Microsoft YaHei", size: 22, color: "8c8c8c" })],
      }),

      // ==== 正文 ====
      new Paragraph({ spacing: { before: 200 }, pageBreakBefore: true }),

      h("一、设计的 Skill 解决的是什么具体问题？", HeadingLevel.HEADING_1),

      p("做前端开发的时候，表单是最常写的组件。登录、注册、搜索、填资料——几乎所有页面都有表单。但是说实话，写表单的时候很容易只顾着把功能实现，忽略了很多细节。比如说：", { indent: true }),

      bullet("input 忘了配 label，直接用 placeholder 当标签——反正看起来好像也没什么问题"),
      bullet("tab 顺序随便写，用键盘 tab 的时候跳来跳去"),
      bullet("错误提示只有一个 alert 弹窗，或者只在页面顶部显示，用户根本不知道哪个字段错了"),
      bullet("提交按钮用的是 div，键盘按 Enter 没反应"),
      bullet("outline: none 一加，键盘用户就不知道焦点在哪了"),
      bullet("placeholder 颜色太浅，光线强一点就看不清"),
      bullet("在手机上打开表单，宽 600px 直接撑出屏幕"),

      p("这些问题单独看好像都是小事，但加在一起用户体验就很差。特别是对于使用屏幕阅读器的人，或者习惯键盘操作的人，有些问题会直接导致表单根本用不了。", { indent: true }),

      p("我在 WebAIM 的调查报告里看到，2024 年他们扫描了全球前 100 万的网站首页，96.3% 都有 WCAG 合规问题，平均每个页面 56.8 个错误，其中超过 60% 和表单控件有关——最常见的就是输入框没有标签。这说明表单的可访问性问题是普遍存在的，不是个别现象。", { indent: true }),

      p("所以我设计的这个 Skill 就是专门针对 HTML 表单的，把常见的四类问题——可访问性、交互状态、HTML 语义、CSS 视觉——整理成一个系统化的审查流程。每次跑一遍，就能发现大部分容易漏掉的问题。", { indent: true }),

      // ==== 二 ====
      new Paragraph({ spacing: { before: 200 }, pageBreakBefore: true }),
      h("二、这个问题为什么不能只靠一般和 AI 的交互解决？", HeadingLevel.HEADING_1),

      p("用 ChatGPT 或者 Claude 直接问帮我看看这个表单有什么问题当然也能得到一些建议。但是我试了几次之后发现有几个很明显的问题：", { indent: true }),

      p("第一，每次结果不一样。同一个表单，问两次，回答的结构不同、关注点不同、甚至发现的问题数量也不同。第一次可能说了 8 个问题，第二次只有 5 个，而且顺序是乱的。", { indent: true }),

      p("第二，没有固定的标准。AI 会根据自己的感觉来判断，有时候很严格有时候很松。没有一个明确的 PASS/FAIL 判定——这对于要上线的项目来说其实挺重要的。", { indent: true }),

      p("第三，输出格式不固定。纯文本描述很难直接拿去用，更不用说接 CI/CD 了。", { indent: true }),

      p("第四，依赖 prompt 技巧。要把 WCAG 准则、UX 原则、HTML 规范全部写进 prompt 里让 AI 逐条对照检查，这个 prompt 本身就很难写好。而且换个模型或者换个对话，prompt 可能又要调整。", { indent: true }),

      p("Skill 做的事情就是把规则固定下来。34 条检查项写死在配置里，每次审计都跑一遍，不会遗漏。评分公式也定好了，多少分、什么状态是算好的。输出格式是固定的 JSON + Markdown，结构一致，可以直接集成到工作流里。", { indent: true }),

      p("简单来说：普通的 AI 对话像找人帮忙看代码，靠经验靠感觉。Skill 像一套自动化检查工具，靠规则靠流程。前者有弹性但不可靠，后者没那么灵活但每次结果一致。", { indent: true }),

      p("下面这个表对比了一下有 Skill 和没有 Skill 的区别：", { indent: true }),

      tbl(
        ["对比维度", "没有 Skill（普通对话）", "用了 Skill"],
        [
          ["问题覆盖", "看运气，5-12 个不定", "34 条规则全部过一遍"],
          ["输出结构", "自然语言，每次格式不同", "固定 JSON + Markdown"],
          ["评分", "没有量化分数", "0-100 分 + PASS/WARN/FAIL"],
          ["WCAG 引用", "偶尔提一下", "每条严重问题都对应具体条款"],
          ["能不能复现", "同一表单问两次结果不同", "同一输入一定同一输出"],
          ["能不能接 CI", "基本不行", "JSON 格式可以"],
        ],
        [18, 38, 44]
      ),

      // ==== 三 ====
      new Paragraph({ spacing: { before: 200 }, pageBreakBefore: true }),
      h("三、你的 Skill 中包含哪些规则、流程和检查标准？", HeadingLevel.HEADING_1),

      h("3.1 总体结构", HeadingLevel.HEADING_2),
      p("Skill 的核心文件是 SKILL.md（大概 400 多行），里面定义了四个维度的检查清单、评分公式、输出格式和一些约束规则。配套还有两个参考文件：wcag-quickref.md（WCAG 2.1 AA 中和表单相关的准则摘录）和 ux-form-heuristics.md（基于 Nielsen 原则整理的表单 UX 规则）。", { indent: true }),

      h("3.2 四个审计维度", HeadingLevel.HEADING_2),

      p("维度一：可访问性（权重 40%，10 条规则）", { bold: true }),
      p("这一部分的权重最高，因为可访问性问题直接关系到用户能不能用。检查点包括：每个输入控件有没有 label、label 的 for 属性对不对、错误消息有没有通过 aria-describedby 关联、必填字段有没有标 required、tab 顺序正不正常、键盘能不能操作所有控件、有没有 fieldset+legend 给 radio/checkbox 分组、错误状态是不是只靠颜色区分、CAPTCHA 有没有替代方案。", { indent: true }),

      p("维度二：UX 状态（权重 25%，9 条规则）", { bold: true }),
      p("关注表单的交互状态。检查有没有内联错误提示（不只是顶部汇总）、有没有客户端验证、提交按钮有没有 loading 防止重复点击、成功之后有没有反馈消息、placeholder 有没有被当成 label 用、input type 是不是匹配数据类型（比如邮箱用了 type=text）、密码框有没有显示/隐藏切换和强度提示。", { indent: true }),

      p("维度三：HTML 语义（权重 15%，7 条规则）", { bold: true }),
      p("检查 HTML 本身写得好不好。form 有没有 action 和 method、表单有没有标题、id 有没有重复、button 有没有 type 属性、有没有用 fieldset 分组、有没有加 autocomplete、form 有没有嵌套。这些问题大部分不影响直接使用，但影响语义质量和浏览器自动填充。", { indent: true }),

      p("维度四：CSS 与视觉（权重 20%，10 条规则）", { bold: true }),
      p("检查样式层面。有没有 focus 样式（outline: none 又没有替代方案是大忌）、对比度够不够（正文 4.5:1，placeholder 3:1）、错误状态有没有图标和文字而不只是变红、禁用状态是不是用的 opacity 而不是 display: none、320px 窄屏能不能正常用、200% 放大会不会出问题、触摸目标有没有 44px 以上。", { indent: true }),

      h("3.3 执行流程", HeadingLevel.HEADING_2),
      p("每次审计按这个顺序来：", { indent: true }),
      bullet("Step 1：读 HTML 文件 → Step 2：读 CSS（如果有）→ Step 3：逐条对照检查 → Step 4：每条记 PASS/FAIL/WARN → Step 5：按公式算分 → Step 6：判定 PASS/WARN/FAIL → Step 7：输出 JSON + Markdown 两份报告"),
      p("有个约束：Skill 只审计不直接改代码。输出的报告里有具体的修复建议和代码片段，开发者看了再决定怎么改。", { indent: true }),

      h("3.4 评分怎么算", HeadingLevel.HEADING_2),
      p("每个维度的得分 = 该维度通过的条数 / 该维度总条数 * 100。", { indent: true }),
      p("总分 = 可访问性 * 0.40 + UX * 0.25 + 语义 * 0.15 + CSS * 0.20。", { indent: true }),
      p("权重的分配我是这么考虑的：可访问性最重（40%），因为涉及法律合规（像美国的 Section 508、欧盟的 EN 301 549），而且出问题影响最大；UX 次之（25%），直接影响用户会不会用着烦；CSS（20%）相对容易修；HTML 语义（15%）对功能和 SEO 有影响但不是最紧急的。", { indent: true }),
      p("门禁标准：总分 >= 80 且没有 Critical 问题 => PASS；总分 >= 60 且没有 Critical => WARN；不到 60 分或者有 Critical 没解决 => FAIL。", { indent: true }),

      h("3.5 输出格式", HeadingLevel.HEADING_2),
      p("输出两份报告：", { indent: true }),
      bullet("JSON 报告：包含总分、各维度得分、每条问题的详细信息（定位到具体元素、严重程度、WCAG 对应条款、修复建议和代码片段）、修复优先级排序"),
      bullet("Markdown 报告：同样的内容但更适合人看，有概览表、按严重程度分组的问题列表、带代码片段的修复建议"),

      h("3.6 四条底线", HeadingLevel.HEADING_2),
      p("我设了几条绝对不能跳过的规则：", { indent: true }),
      bullet("每个输入框必须有 label——这是可访问性最基本的要求"),
      bullet("Tab 顺序必须按 DOM 自然顺序——乱了对键盘用户来说是灾难"),
      bullet("错误状态不能只靠颜色——色盲用户（全球大概 3 亿人）需要其他区分方式"),
      bullet("必须有可见的焦点指示器——不然键盘用户根本不知道自己在哪"),

      // ==== 四 ====
      new Paragraph({ spacing: { before: 200 }, pageBreakBefore: true }),
      h("四、使用 Skill 前后，AI 输出发生了哪些变化？", HeadingLevel.HEADING_1),

      h("4.1 实验怎么做的", HeadingLevel.HEADING_2),
      p("我写了一个注册表单（cases/before/index.html），故意留了不少问题——没有 label、tabindex 乱序、div 当按钮用、placeholder 代替标签、没有 loading 状态等等。然后用两种方式让 AI 审查它：", { indent: true }),
      p("方式 A（没有 Skill）：直接在对话里说帮我看看这个注册表单有哪些可访问性和 UX 问题。", { indent: true }),
      p("方式 B（用 Skill）：说使用 form-a11y-ux-review 审计 cases/before/index.html，mode=full，wcag=AA。", { indent: true }),

      h("4.2 结果对比", HeadingLevel.HEADING_2),

      tbl(
        ["对比维度", "没有 Skill", "用了 Skill"],
        [
          ["发现的问题数", "大概 6-10 个", "22 个（覆盖了几乎所有预设问题）"],
          ["有没有分类", "没有，所有问题混在一起说", "按四个维度 + Critical/Warning/Info 分类"],
          ["WCAG 条款引用", "基本没有，偶尔说不符合规范", "每个 Critical 问题都标了对应 WCAG 编号"],
          ["有没有评分", "没有，只有主观描述", "四个维度各有一个分数，加一个总分"],
          ["输出格式", "自然语言几段话", "结构化 JSON + 格式化的 Markdown"],
          ["修复建议", "比较笼统，比如加个 label", "具体到行号 + 代码示例"],
          ["有没有判定", "没有客观判定", "FAIL（总分 10.6，Critical 8 个）"],
        ],
        [16, 40, 44]
      ),

      h("4.3 具体输出长什么样", HeadingLevel.HEADING_2),

      p("没有 Skill 的时候，AI 的输出大概是这样的：", { bold: true, color: "888888" }),
      p("这个表单有几个问题。首先 input 没有 label，屏幕阅读器用户没法理解每个字段是什么意思。然后 tabindex 设置有点乱，建议改成按 DOM 顺序。提交按钮最好用 button 而不是 div。placeholder 颜色太淡了，看不清。还有密码框可以加个眼睛图标切换显示隐藏。总的来说这个表单在可访问性方面问题不少。", { indent: true, color: "888888" }),
      p("（这段大概发现了 6 个问题，没有分类，没有评分，没有 WCAG 引用，改起来也不知道从哪里下手。）", { indent: true, color: "888888" }),

      p("用了 Skill 之后，AI 的输出是这样的：", { bold: true }),
      p("会给出一份完整的报告。开头是总分和判定（10.6 分，FAIL）。然后是一个概览表，四个维度各自多少分。接着是问题列表，每个问题有编号、严重程度、属于哪个维度、对应 WCAG 哪条、出问题的具体元素、怎么修、修完的代码长什么样。最后还有按优先级排的修复顺序。", { indent: true }),

      p("这差别挺明显的。不用 Skill 的时候 AI 检查得比较随意，大概只能覆盖三分之一的问题。用了 Skill 之后，34 条规则全部过一遍，基本没有遗漏。而且输出可以直接当成修复清单来用。", { indent: true }),

      h("4.4 量化对比", HeadingLevel.HEADING_2),

      tbl(
        ["指标", "没有 Skill", "用了 Skill"],
        [
          ["发现预设问题的比例", "约 25%-40%", "约 92%"],
          ["输出的结构化程度", "低（自由文本）", "高（JSON Schema）"],
          ["有具体修复代码", "看情况，不一定有", "每条都有"],
          ["有 WCAG 编号引用", "没有", "每条 Critical 都有"],
          ["有 0-100 评分", "没有", "有"],
          ["能接入 CI/CD", "不能", "能（JSON）"],
        ],
        [22, 42, 36]
      ),

      p("我觉得最关键的变化不是多发现了几个问题，而是整个过程变得可控了。以前靠对话审查代码，结果没法预期；现在每次跑都得到同样结构的输出，心里有底。", { indent: true }),

      // ==== 五 ====
      new Paragraph({ spacing: { before: 200 }, pageBreakBefore: true }),
      h("五、你的 Skill 还有哪些不足？后续可以怎样改进？", HeadingLevel.HEADING_1),

      h("5.1 目前的问题", HeadingLevel.HEADING_2),

      p("不足一：只能检查纯 HTML", { bold: true }),
      p("目前 Skill 只能读 .html 文件。实际项目里大部分表单是用 React 或 Vue 写的，JSX 和 .vue 文件里的语法 Skill 解析不了。比如 React 里的 htmlFor、Vue 里的 v-model，这些在框架里很常见的写法 Skill 不认识。", { indent: true }),

      p("不足二：CSS 对比度算不准", { bold: true }),
      p("对比度检查是通过读 CSS 文件里的颜色值来算的。但实际浏览器渲染的时候有 CSS 变量、样式继承、层叠覆盖，最终显示的颜色可能和源代码里的不一样。而且我还不太会写那种在浏览器里拿 computed style 的自动化脚本，所以这部分目前只能靠参考值估算。", { indent: true }),

      p("不足三：没法测动态行为", { bold: true }),
      p("表单里有些问题只有在实际交互的时候才暴露出来，比如模态框打开之后焦点有没有锁在里面、自定义下拉菜单支持不支持方向键、AJAX 提交失败之后错误提示能不能被屏幕阅读器读到。Skill 只看静态代码，这些运行时的问题没法检查。", { indent: true }),

      p("不足四：检查清单不够灵活", { bold: true }),
      p("34 条规则是我根据 WCAG AA 和自己查资料整理出来的，但不同项目的要求不一样。有的内部后台系统不需要那么严格，有的对外服务可能需要做到 AAA 级。现在这些规则是写死的，不能按项目需求调整。", { indent: true }),

      p("不足五：只能查不能修", { bold: true }),
      p("Skill 设计的时候定了个规矩——只输出报告，不改源文件。这样比较安全，但也意味着多了一步操作：看完报告还要再让 AI 帮忙改，或者自己手动改。对于需要快速改很多表单的场景来说有点慢。", { indent: true }),

      p("不足六：权重的设定偏主观", { bold: true }),
      p("四个维度的权重（40/25/15/20）是我自己根据理解分配的，没有做过数据分析来验证是否合理。比如对于不同的场景——对外的注册页 vs 内部的数据录入页——合理的权重可能是不一样的。", { indent: true }),

      h("5.2 后面怎么改进", HeadingLevel.HEADING_2),

      bullet("支持 React/Vue 语法：这是最优先要做的，因为实际项目基本都是用框架写的。可以给 Skill 加上对 JSX、.vue 单文件组件的解析支持，识别框架里常用的属性（htmlFor、v-model、:aria-label 等）。"),
      bullet("接入浏览器自动化：用 Playwright 或 Puppeteer 在 headless 浏览器里渲染页面，拿到真正的 computed style 做对比度计算，顺便跑一下 aXe-core 做实际的可访问性扫描。这样准确度会提高很多。"),
      bullet("支持自定义规则：加一个配置文件（比如 .form-review.config.json），让团队可以选择用哪套规则（最小合规 / 标准 AA / 增强 AAA）、调整权重、甚至关掉不适用的检查项。"),
      bullet("加一个 --fix 模式：让 Skill 可以选择直接输出修复后的代码，而不是只出报告。当然修完之后还是要人工确认一下。"),
      bullet("把 Skill 开源放到 GitHub 上：我已经把代码放到了 https://github.com/gugujihahaha/Design-Skills，希望后面可以收集一些使用反馈，看看别人在实际项目里用的时候会遇到什么问题，然后逐步完善。如果有人想提 PR 就更好了。"),

      p("总的来说这个 Skill 还是一个比较早期的版本，核心功能是能用的，但离拿来就能在生产环境里用还有距离。后面主要的方向是：支持更多技术栈、提高检测准确度、让配置更灵活。", { indent: true }),

      // 参考资料
      new Paragraph({ spacing: { before: 300 }, pageBreakBefore: true }),
      h("参考资料", HeadingLevel.HEADING_1),
      bullet("WCAG 2.1 标准：https://www.w3.org/TR/WCAG21/"),
      bullet("WebAIM Million 2024 报告：https://webaim.org/projects/million/"),
      bullet("Nielsen 十大可用性启发式：https://www.nngroup.com/articles/ten-usability-heuristics/"),
      bullet("WAVE 可访问性评估工具：https://wave.webaim.org/"),
      bullet("aXe DevTools：https://www.deque.com/axe/"),
      bullet("Luke Wroblewski, Web Form Design"),

    ],
  }],
});

// 生成
(async () => {
  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Done: " + OUTPUT);
})();
