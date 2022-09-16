import {BuildOptions} from "./types/config";
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    // Проксирование всех запросов через корневую странцу. Необходимо для правильного рутинга. Чтоб при перезагрузке страницы с адресом не index.html, показывалась нужная страница
    historyApiFallback: true
  }
}