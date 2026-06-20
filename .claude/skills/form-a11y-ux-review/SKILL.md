---
name: form-a11y-ux-review
description: >-
  对 HTML 表单进行 4 维度系统审计：可访问性 (ARIA/键盘导航/屏幕阅读器)、
  UX 状态 (错误/加载/成功)、HTML 语义 (fieldset/legend/heading)、
  CSS 视觉 (focus 样式/对比度/响应式)。每次输出结构化 JSON + Markdown
  报告，附带 PASS/WARN/FAIL 门禁判定。
---

# Form Accessibility & UX Review Skill

## 一、使用场景 (When to Invoke)

当开发者满足以下任一条件时，调用此 Skill：

1. 构建或修改了 HTML 表单（注册、登录、搜索、结账、联系我们等）
2. 需要对表单进行可访问性 (Accessibility) 和用户体验 (UX) 审查
3. 希望建立代码合并前的质量门禁（pre-QA gate）
4. 需要对现有表单进行无障碍合规性评估（WCAG 2.1 AA/AAA）

用户可以通过以下关键词触发：
- "review form" / "audit form" / "检查表单" / "审查表单"
- "check accessibility" / "检查可访问性" / "a11y audit"
- "verify form UX" / "验证表单体验"

---

## 二、处理流程 (Processing Flow)

### 2.1 工作模式

| 模式 | 说明 |
|------|------|
| `full` (默认) | 审计全部 4 个维度 |
| `quick` | 仅审计可访问性维度 |

### 2.2 执行步骤

```
Step 1: 读取目标 HTML 文件
    ↓
Step 2: 读取关联的 CSS 文件（如果提供）
    ↓
Step 3: 按维度逐条检查（详见第四章）
    ↓
Step 4: 记录每条检查的 PASS/FAIL/WARN 结果
    ↓
Step 5: 按公式计算各维度分数和总分
    ↓
Step 6: 判定 PASS / WARN / FAIL
    ↓
Step 7: 输出 audit_report.json + audit_report.md
```

### 2.3 重要约束

- Skill **只输出审计报告，不直接修改源文件**
- 开发者查看报告后可要求 AI 根据报告生成修复代码
- 如果审计过程中源文件发生变更，必须从头重新执行审计
- 不得跳过任何检查项，即使认为该项"不适用"也必须记录为 INFO 并说明原因

---

## 三、输入约定 (Input Contract)

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| HTML 文件路径 | 是 | - | 目标表单的 .html 文件路径 |
| CSS 文件路径 | 否 | - | 关联样式表，用于对比度/focus 检查 |
| mode | 否 | `full` | 审计模式：`full` 或 `quick` |
| wcag_level | 否 | `AA` | WCAG 等级：`AA` 或 `AAA` |

---

## 四、四大审计维度：完整检查清单

### 维度 1：Accessibility 可访问性 (权重 40%)

> 依据：WCAG 2.1 标准，共 10 项检查

| ID | 检查项 | WCAG 依据 | 判定条件 |
|----|--------|-----------|----------|
| A11Y-01 | 每个输入控件都有关联的 `<label>` | 1.1.1, 1.3.1, 3.3.2 | **FAIL** 如果任何 `<input>`/`<select>`/`<textarea>` 缺少可见 label 或 `aria-label` |
| A11Y-02 | Label 使用正确的 `for` 属性或 input 嵌套在 `<label>` 内 | 1.3.1, 4.1.2 | **FAIL** 如果 `for` 值不匹配 `id` 或两种关联方式都不存在 |
| A11Y-03 | 错误消息通过 `aria-describedby` 或 `aria-live` 关联 | 3.3.1, 4.1.3 | **FAIL** 如果错误文本缺少 `aria-describedby` 链接或 `role="alert"` / `aria-live="polite"` |
| A11Y-04 | 必填字段标记 `required` 和 `aria-required="true"` | 3.3.2, 4.1.2 | **FAIL** 如果缺少 `required` 属性；**WARN** 如果缺少 `aria-required` |
| A11Y-05 | Tab 顺序遵循 DOM 顺序 | 2.4.3 | **FAIL** 如果使用 `tabindex > 0` 或 tab 顺序不按 DOM 自然顺序 |
| A11Y-06 | 所有表单控件可通过键盘操作 | 2.1.1 | **FAIL** 如果有任何操作必须依赖鼠标（如自定义下拉框无方向键处理） |
| A11Y-07 | 动态内容出现时 Focus 被正确管理 | 2.4.3 | **FAIL** 如果表单提交后焦点丢失或重置到 `<body>` 且无合理目的 |
| A11Y-08 | 单选/复选框组使用 `<fieldset>` + `<legend>` | 1.3.1, 3.3.2 | **FAIL** 如果 radio/checkbox 组缺少 `<fieldset>` 和 `<legend>` |
| A11Y-09 | 颜色不是传达信息的唯一手段（如错误状态） | 1.4.1 | **FAIL** 如果错误状态仅用红色边框表示，无图标或文本说明 |
| A11Y-10 | CAPTCHA 有无障碍替代方案 | 1.1.1 | **FAIL** 如果仅有视觉 CAPTCHA 且无音频替代或 Honeypot |

### 维度 2：UX States & Feedback 用户体验状态 (权重 25%)

> 依据：Nielsen 十大启发式原则 + 表单专项 UX 最佳实践，共 9 项检查

| ID | 检查项 | 判定条件 |
|----|--------|----------|
| UX-01 | 错误状态：无效字段旁显示内联错误消息 | **FAIL** 如果错误消息不在对应字段附近 |
| UX-02 | 错误状态：客户端验证阻止无效提交 | **FAIL** 如果仅靠服务端返回错误；**PASS** 如果有客户端 JS 拦截 |
| UX-03 | 加载状态：提交按钮显示 spinner/禁用状态 | **FAIL** 如果按钮在异步提交期间保持活动态（有重复提交风险） |
| UX-04 | 加载状态：表单在提交中设置 `aria-busy="true"` | **WARN** 如果缺少 |
| UX-05 | 成功状态：显示成功消息且焦点移至该消息 | **FAIL** 如果无成功消息或焦点未移动 |
| UX-06 | 不使用 `placeholder` 替代 `<label>` | **FAIL** 如果 placeholder 是唯一的视觉标签 |
| UX-07 | 输入类型匹配预期数据（`type="email"` 等） | **FAIL** 如果使用 `type="text"` 替代语义类型 |
| UX-08 | 密码字段提供显示/隐藏切换 | **WARN** 如果缺少 |
| UX-09 | 密码字段提供强度指示器 | **WARN** 如果缺少 |

### 维度 3：HTML Semantics HTML 语义 (权重 15%)

> 依据：HTML5 规范 + WHATWG 标准，共 7 项检查

| ID | 检查项 | 判定条件 |
|----|--------|----------|
| SEM-01 | `<form>` 有明确的 `action` 和 `method` 属性 | **FAIL** 如果 `action` 为空或缺失；或 `method` 不是 GET/POST |
| SEM-02 | 表单有标题 (`<h1>`-`<h6>`) 描述其用途 | **FAIL** 如果 `<form>` 内或之前没有标题元素 |
| SEM-03 | 多组表单控件使用 `<fieldset>` + `<legend>` 分组 | **FAIL** 如果逻辑分组控件缺少 `<fieldset>` |
| SEM-04 | 表单内所有 `id` 属性唯一 | **FAIL** 如果存在重复的 `id` |
| SEM-05 | `<button>` 有明确的 `type` 属性 | **FAIL** 如果 `<button>` 缺少 `type`（在 form 内默认 submit） |
| SEM-06 | 输入控件使用正确的 `autocomplete` 属性 | **WARN** 如果 email/name/address/password 字段缺少 |
| SEM-07 | `<form>` 不嵌套在另一个 `<form>` 内 | **FAIL** 如果存在嵌套 |

### 维度 4：CSS & Visual Design CSS 与视觉 (权重 20%)

> 共 8 项检查

| ID | 检查项 | 判定条件 |
|----|--------|----------|
| CSS-01 | Focus 指示器：`:focus-visible` 轮廓可见（≥3px，对比度 ≥3:1） | **FAIL** 如果使用 `outline: none` 且无自定义 focus 样式 |
| CSS-02 | Focus 指示器与背景对比度 ≥3:1 | **FAIL** 如果 focus 环颜色对比度 <3:1 |
| CSS-03 | 错误状态样式：边框变色 + 图标/文字变化 | **FAIL** 如果仅改变颜色（违反 1.4.1） |
| CSS-04 | 禁用状态使用 `opacity` 降低可见性，非 `display: none` | **FAIL** 如果禁用控件被移除出文档流 |
| CSS-05 | 文字对比度：正文 ≥4.5:1，大文字 ≥3:1（AA 级） | **FAIL** 如果低于阈值（WCAG 1.4.3） |
| CSS-06 | Placeholder 文字对比度 ≥3:1 | **WARN** 如果对比度不足 |
| CSS-07 | 响应式：320px 宽度下表单完全可用 | **FAIL** 如果窄屏出现水平滚动 |
| CSS-08 | 响应式：200% 缩放时内容不丢失 | **FAIL** 如果文字溢出或按钮无法使用 |
| CSS-09 | 标签间距：label 与 input 间 ≥0.25rem 间距 | **WARN** 如果标签与输入框视觉上紧贴 |
| CSS-10 | 触摸目标：交互元素 ≥44×44px（移动端） | **WARN** 在小视口上检查 |

---

## 五、评分公式与门禁标准

### 5.1 维度评分

```
维度得分 = (该维度 PASS 数 / 该维度总检查项数) × 100
```

WARN 项计为 PASS（不扣分），但会在报告中单独列出。

### 5.2 总分计算

```
总分 = (Accessibility × 0.40) + (UX × 0.25) + (HTML_Semantics × 0.15) + (CSS × 0.20)
```

### 5.3 严重程度定义

| 级别 | 定义 |
|------|------|
| **Critical** | 阻断性障碍：A11Y-01/A11Y-05/A11Y-06/A11Y-09 的 FAIL |
| **Warning** | 影响体验但不阻断使用：所有 WARN 项 |
| **Info** | 不适用或可选建议 |

### 5.4 门禁判定

| 状态 | 条件 |
|------|------|
| **PASS** ✅ | 总分 ≥ 80 且 Critical = 0 |
| **WARN** ⚠️ | 总分 ≥ 60 且 Critical = 0 |
| **FAIL** ❌ | 总分 < 60 或 Critical > 0 |

---

## 六、输出格式 (Output Contract)

### 6.1 JSON 报告 (`audit_report.json`)

```json
{
  "audit_id": "uuid",
  "timestamp": "ISO-8601",
  "target_file": "cases/before/index.html",
  "css_file": "cases/before/style.css",
  "mode": "full",
  "wcag_level": "AA",
  "overall_score": 0-100,
  "overall_status": "PASS | WARN | FAIL",
  "dimension_scores": {
    "accessibility": { "score": 0-100, "pass": 0, "fail": 0, "warn": 0, "total": 10 },
    "ux": { "score": 0-100, "pass": 0, "fail": 0, "warn": 0, "total": 9 },
    "html_semantics": { "score": 0-100, "pass": 0, "fail": 0, "warn": 0, "total": 7 },
    "css": { "score": 0-100, "pass": 0, "fail": 0, "warn": 0, "total": 10 }
  },
  "summary": {
    "critical_count": 0,
    "warning_count": 0,
    "pass_count": 0,
    "total_checks": 36
  },
  "findings": [
    {
      "id": "A11Y-01",
      "severity": "critical",
      "dimension": "accessibility",
      "wcag_criterion": "1.1.1 / 1.3.1",
      "element": "<input type=\"text\" placeholder=\"用户名\">",
      "issue": "缺少关联的 <label> 元素，仅有 placeholder",
      "recommendation": "添加 <label for=\"username\">用户名</label> 并设 input id=\"username\"",
      "code_snippet": "<label for=\"username\">用户名</label>\n<input type=\"text\" id=\"username\" required>"
    }
  ],
  "fix_priority": [
    "1. 为所有输入框添加 <label> 关联（Critical ×N）",
    "2. 修复 tabindex 乱序问题",
    "3. 为 radio group 添加 <fieldset>/<legend>"
  ]
}
```

### 6.2 Markdown 报告 (`audit_report.md`)

人类可读格式，包含：
- 概览表（总分、状态、各维度得分）
- 按严重程度分组的 Findings 列表
- 每个 Finding 附带修复建议和代码片段
- 修复优先级排序

---

## 七、检查标准 (Verification Standards)

### 7.1 审计完整性标准

审计完成后，必须确认：
1. ✅ 所有 36 项检查全部执行，无跳过
2. ✅ 每个 FAIL/WARN 项都有具体的元素定位和修复建议
3. ✅ 每个 PASS 项都有确认依据（如代码行号）
4. ✅ 评分计算正确，门禁判定无误

### 7.2 修复验证标准

修复后的表单必须满足：
1. ✅ 无 Critical 级别问题
2. ✅ 每个输入控件都有 label 关联
3. ✅ 键盘 Tab 导航从头到尾流畅、有序
4. ✅ 错误/加载/成功三种状态全部覆盖
5. ✅ aXe DevTools / WAVE 浏览器扩展无 critical violations

### 7.3 不可简化规则

以下规则在任何情况下都不可跳过或放宽：
- A11Y-01（label 关联）— 这是最基础的可访问性要求
- A11Y-05（tab 顺序）— 乱序会完全破坏键盘用户体验
- A11Y-09（颜色不是唯一信息传达手段）— 直接影响色盲用户
- CSS-01（focus 指示器）— 键盘用户无法操作没有 focus 指示的页面

---

## 八、使用示例

### 示例 1：完整审计

```
用户: 请使用 form-a11y-ux-review 审计 cases/before/index.html，mode=full, wcag=AA
AI: [读取 HTML 和 CSS] → [逐条检查 36 项] → [计算分数] → [输出 JSON + Markdown 报告]
```

### 示例 2：快速审计

```
用户: 快速检查这个登录表单的可访问性
AI: [触发 Skill quick 模式] → [仅检查维度1的10项] → [输出简化报告]
```

### 示例 3：根据报告修复

```
用户: 根据审计报告修复 cases/before/index.html 中的所有 Critical 和 Warning 问题
AI: [读取 audit_report.json] → [按优先级逐一修复] → [输出 cases/after/index.html]
```

---

## 九、参考资源

- WCAG 2.1 快速参考：`references/wcag-quickref.md`
- 表单 UX 启发式原则：`references/ux-form-heuristics.md`
- WAVE 浏览器扩展：https://wave.webaim.org/
- aXe DevTools：https://www.deque.com/axe/
- WCAG 官方文档：https://www.w3.org/TR/WCAG21/
