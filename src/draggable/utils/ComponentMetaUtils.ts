import { DesignNode } from "@/draggable/types/DesignBlock";

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

export {
    existsPlaceholder,
}
