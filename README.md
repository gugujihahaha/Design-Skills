# Form A11Y & UX Review

> 前端实验作业 · 24111302044 · 尹文静
>
> GitHub: https://github.com/gugujihahaha/Design-Skills

## 这是什么

一个给 Claude Code 用的 Skill，用来检查 HTML 表单写得规不规范。主要检查四个方面：有没有加 label、键盘能不能用、错误提示合不合理、CSS 对比度够不够。

写这个是因为平时写表单经常漏东西——忘了加 label、placeholder 当标签用、tab 顺序乱写、提交按钮没 loading——等测试发现了再改就很麻烦。有了这个 Skill，写完表单跑一下审查，能发现大部分常见问题。

## 怎么装

把 `.claude/skills/form-a11y-ux-review/` 文件夹拷到你项目的 `.claude/skills/` 目录下，然后在 `CLAUDE.md` 里加上触发规则就行。

## 怎么用

在 Claude Code 里说：

```
使用 form-a11y-ux-review 审计 cases/before/index.html，mode=full
```

然后它会输出一个审计报告，告诉你哪里有问题、多严重、怎么改。

也可以只查可访问性：

```
快速检查这个表单的 accessibility
```

## 检查维度

- **可访问性**（权重 40%）— 10 条：label 关联、ARIA 属性、键盘操作、tab 顺序、focus 管理
- **用户体验**（权重 25%）— 9 条：错误/加载/成功三种状态、输入类型、密码相关
- **HTML 语义**（权重 15%）— 7 条：form 结构、id 唯一性、button 类型、autocomplete
- **CSS 视觉**（权重 20%）— 10 条：focus 样式、对比度、响应式、触摸目标大小

## 评分规则

每个维度按通过率算分，然后加权加起来：

```
总分 = 可访问性×0.4 + UX×0.25 + 语义×0.15 + CSS×0.2
```

- 总分 ≥ 80，且没有严重问题 → PASS
- 总分 ≥ 60，没有严重问题 → WARN
- 总分 < 60，或者有严重问题 → FAIL

## 案例对比

用这个 Skill 审查了 `cases/before/` 里的注册表单（一个写得比较随意的版本），得分 10.6 分，状态 FAIL，查出来 8 个严重问题。

修完之后（`cases/after/`），得分 94.8，状态 PASS。

具体的问题和修改过程详见实验报告。

## 项目文件

```
├── .claude/skills/form-a11y-ux-review/
│   ├── SKILL.md              ← Skill 定义（核心文件）
│   └── references/           ← 参考资料
├── cases/
│   ├── before/               ← 优化前的表单
│   └── after/                ← 优化后的表单
├── docs/
│   └── 24111302044尹文静-实验报告.docx
└── CLAUDE.md                 ← Skill 触发配置
```

## 参考

- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- WAVE 工具: https://wave.webaim.org/
- aXe DevTools: https://www.deque.com/axe/
