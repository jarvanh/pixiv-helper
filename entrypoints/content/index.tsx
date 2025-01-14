import "~/globals.css";
import ReactDOM, { Root } from "react-dom/client";
import App from "./App.tsx";

// https://www.chrismytton.com/plain-text-websites/
export default defineContentScript({
  matches: ["https://www.pixiv.net/artworks/*"],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // 修改容器样式
        container.style.position = "fixed";
        container.style.left = "20px"; // 距离左边 20px
        container.style.bottom = "20px"; // 距离底部 20px
        container.style.zIndex = "9999999";

        // 添加一个包装器来处理按钮的位置
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        container.appendChild(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return root;
      },
      onRemove: (root?: Root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
