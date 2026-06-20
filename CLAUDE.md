# Form Accessibility & UX Review Skill 项目

本项目安装了 **Form A11Y & UX Review Skill**，用于对前端表单组件进行系统性可访问性与用户体验审计。

## Skill 位置
`.claude/skills/form-a11y-ux-review/SKILL.md`

## 触发规则

当用户执行以下操作时，优先使用 Skill：
- 要求 "review form"、"audit form"、"检查表单"、"审查表单"
- 要求 "check accessibility"、"检查可访问性"
- 要求 "verify form UX"、"验证表单体验"

## 使用方式

```
使用 form-a11y-ux-review 审计 cases/before/index.html，模式=full，WCAG=AA
```

## 案例文件

| 版本 | 路径 | 说明 |
|------|------|------|
| 优化前 | `cases/before/index.html` | 含 20+ 可访问性与 UX 问题的注册表单 |
| 优化后 | `cases/after/index.html` | 经 Skill 审计后完全修复的表单 |

## Skill 四大审计维度

1. **Accessibility（可访问性）** — 权重 40%，10 项检查
2. **UX States（用户体验状态）** — 权重 25%，9 项检查
3. **HTML Semantics（HTML 语义）** — 权重 15%，7 项检查
4. **CSS & Visual（CSS 与视觉）** — 权重 20%，8 项检查

## 评分标准

- **PASS**: ≥80 分 且 无 Critical 问题
- **WARN**: ≥60 分 且 无 Critical 问题
- **FAIL**: <60 分 或 存在 Critical 问题
