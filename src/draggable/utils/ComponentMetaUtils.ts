import lodash from "lodash";
import { createVNode, defineAsyncComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { isStr, noValue } from "@/utils/Typeof";
import { DesignNode } from "@/draggable/types/DesignBlock";
import { ComponentManage } from "@/draggable/types/ComponentManage";
import RefreshCwOff from "@/assets/images/refresh-cw-off.svg?component";
import RefreshCw from "@/assets/images/refresh-cw.svg?component";
import Sparkles from "@/assets/images/sparkles.svg?component";

/**
 * 是否存在占位节点
 */
function existsPlaceholder(placeholder?: Record<"default" | string, DesignNode | boolean>) {
    if (!placeholder) return false;
    for (let name in placeholder) {
        const holder = placeholder[name];
        if (holder) return true;
    }
    return false;
}

/**
 * 获取组件图标
 * @param icon              ComponentMeta["icon"]
 * @param componentManage   组件管理器
 */
function getComponentIcon(icon: any, componentManage: ComponentManage): any {
    if (noValue(icon) || (isStr(icon) && lodash.trim(icon).length <= 0)) {
        return createVNode(Sparkles, { 'stroke-width': "1.8", style: { width: "18px", height: "18px" } });
    }
    if (isStr(icon)) {
        return defineAsyncComponent({
            loader: async () => {
                // await sleep(1000 * 3)
                await componentManage.loadAsyncComponent(["FontAwesomeIcon"]);
                const faIcon = lodash.split(icon, " ").filter(item => lodash.trim(item).length > 0);
                return createVNode(FontAwesomeIcon, { icon: faIcon, fixedWidth: true });
            },
            // delay: 0,
            loadingComponent: createVNode(RefreshCw, { class: 'loading-spinner', 'stroke-width': "1.8", style: { width: "18px", height: "18px" } }),
            errorComponent: createVNode(RefreshCwOff, { 'stroke-width': "1.8", style: { width: "18px", height: "18px" } }),
        });
    }
    return icon;
}

export {
    existsPlaceholder,
    getComponentIcon,
}
