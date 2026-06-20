# 表单 UX 启发式原则

## 概述

基于 Jakob Nielsen 十大可用性启发式原则和 Luke Wroblewski 表单设计最佳实践，本文档定义了表单用户体验的检查标准。

---

## 核心启发式原则（表单适配版）

### H1: 系统状态可见性 (Visibility of System Status)

- 用户在提交表单时，系统应即时反馈：
  - **成功**：显示明确的成功消息，焦点移至消息区域
  - **失败**：在出错的字段旁显示内联错误消息，焦点移至第一个错误
  - **加载中**：提交按钮变为禁用状态 + 显示加载指示器

### H2: 系统与现实世界的匹配 (Match Between System and Real World)

- 使用用户熟悉的语言，而非技术术语
- 标签和错误消息使用自然语言（如"请输入有效的电子邮箱地址"而非"Email format invalid"）
- 输入框的顺序应符合用户心理模型（姓名→邮箱→密码→确认）

### H3: 用户控制与自由 (User Control and Freedom)

- 密码字段应提供显示/隐藏切换按钮
- 用户可以随时修改已填写的字段
- 不自动提交表单，需要用户明确的确认操作

### H4: 一致性与标准 (Consistency and Standards)

- 所有必填字段使用统一标记（如红色星号 *）
- 错误消息格式统一（字段名 + 具体问题 + 修复建议）
- 使用标准 HTML 控件而非自定义实现

### H5: 错误预防 (Error Prevention)

- 使用正确的 HTML5 输入类型（`type="email"`, `type="tel"` 等）利用浏览器原生验证
- 实时验证优于提交后验证
- 关键操作前提供确认步骤

### H6: 识别而非回忆 (Recognition Rather Than Recall)

- 使用 `placeholder` 提供输入示例，但不能替代 `<label>`
- 使用 `autocomplete` 属性帮助浏览器自动填充
- 密码要求在使用时展示，而非用户需记忆

### H7: 使用的灵活性与效率 (Flexibility and Efficiency of Use)

- 支持键盘快捷操作（Enter 提交，方向键在 radio 组间切换）
- 常用字段自动聚焦（`autofocus` 在第一个输入框）

### H8: 美学与极简设计 (Aesthetic and Minimalist Design)

- 标签与输入框间距充足（≥0.25rem 的 margin-bottom）
- 表单在移动设备上完全可用（320px 宽度无滚动）
- 不要询问不必要的信息

### H9: 帮助用户识别、诊断和恢复错误 (Help Users Recognize, Diagnose, and Recover from Errors)

- 错误消息应具体说明：
  - 什么地方出了错（定位到具体字段）
  - 出了什么错（用用户能理解的语言描述）
  - 怎么修复它（提供具体操作指引）

### H10: 帮助与文档 (Help and Documentation)

- 复杂字段提供上下文帮助（提示文本或 tooltip）
- 密码要求字段在输入时可见

---

## 表单状态覆盖清单

一个设计良好的表单必须覆盖以下所有状态：

| 状态类别 | 状态 | 描述 |
|----------|------|------|
| 默认 | idle | 初始加载状态，所有字段为空 |
| 默认 | focused | 正在输入的字段有明确的焦点指示 |
| 交互 | valid | 字段值合法，可显示绿色对勾 |
| 交互 | invalid | 字段值不合法，显示内联错误消息 |
| 交互 | disabled | 不可编辑的字段（opacity 降低，非 display:none） |
| 流程 | loading | 表单正在异步提交，按钮禁用+spinner |
| 流程 | success | 提交成功，显示成功消息 |
| 流程 | error | 提交失败（服务端错误），显示错误消息 |
| 空状态 | empty required | 必填字段为空时尝试提交的提示 |
