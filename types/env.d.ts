/** 项目环境配置 */
interface EnvConfig {
    /** vite 调试服务 bind host */
    serverHost: string | boolean;
    /** vite 调试端口 */
    serverPort: number;
    /** api服务地址 */
    apiTarget: string;
    /** html页面标题 */
    htmlTitle: string;

    [key: string]: any;
}
