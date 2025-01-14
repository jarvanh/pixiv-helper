# Pixvi-Helper - Pixiv 插画下载 Chrome 扩展 🎨

[English](README.md) | [简体中文](README_zh.md)

一个基于 WXT 和 shadcn/ui 构建的 Chrome 扩展，帮助您通过 Alist 下载并同步 Pixiv 插画到云存储。支持不同画质选项的下载，让您轻松管理喜爱的作品。

## ✨ 主要特性

- 🖼️ 一键下载 Pixiv 插画
- 📊 多种画质选项（高质量、标准质量）
- ☁️ 通过 Alist 同步下载内容到云存储
- 💾 支持多种存储后端（Google Drive、OneDrive 等）
- 🎯 响应式直观的用户界面
- ⚡ 快速高效的下载体验
- 🔒 本地配置存储保护隐私

## 🛠️ 技术栈

- **框架**: React + TypeScript
- **扩展框架**: WXT (WebExtension Tools)
- **UI 组件**: shadcn/ui
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **状态管理**: React Hooks
- **存储集成**: Alist API

## 🚀 快速开始

1. 克隆仓库：`git clone https://github.com/hellokaton/pixvi-helper.git`
2. 安装依赖：

```bash
pnpm install
```

3. 启动开发服务器：

```bash
pnpm dev
```

这将自动：

- 启动开发服务器
- 打开已加载扩展的 Chrome 浏览器
- 启用热重载以便开发

## 🔧 配置说明

通过弹出式设置面板可以配置以下内容：

- Alist 服务器配置
- 下载画质偏好
- 存储后端选择
- 下载路径设置

## 💡 使用方法

1. 在 Chrome 中安装扩展
2. 配置您的 Alist 服务器设置
3. 浏览 Pixiv 并使用下载按钮保存插画
4. 选择您偏好的画质
5. 扩展会自动将下载内容同步到您的云存储

## 🤝 贡献指南

欢迎提交贡献！请随时提交 Pull Request。

## 📝 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 基于 [WXT](https://wxt.dev) 构建
- UI 组件来自 [shadcn/ui](https://ui.shadcn.com)
- 图标来自 [Lucide](https://lucide.dev)
- 云存储集成使用 [Alist](https://alist.nn.ci)
