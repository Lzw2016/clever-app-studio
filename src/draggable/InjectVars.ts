import { inject, provide } from "vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { noValue } from "@/utils/Typeof";
import { Cursor } from "@/draggable/models/Cursor";

/** 注入的变量名定义 */
const varNames = {
    /** 拖拽引擎对象 */
    designerEngine: Symbol('__designer_engine__'),
};

/** 设置 DesignerEngine */
function setDesignerEngine(designerEngine: DesignerEngine) {
    provide(varNames.designerEngine, designerEngine);
}

/**
 * 获取 DesignerEngine
 * @param required 是否必须得到 DesignerEngine 对象
 */
function getDesignerEngine(required: boolean = true): DesignerEngine {
    const designerEngine = inject<DesignerEngine>(varNames.designerEngine);
    if (required && noValue(designerEngine)) {
        throw new Error("还未注入 DesignerEngine 对象");
    }
    return designerEngine!;
}

/**
 * 获取 Cursor
 * @param required 是否必须得到 Cursor 对象
 */
function getCursor(required: boolean = true): Cursor {
    const designerEngine = getDesignerEngine(required);
    return designerEngine?.cursor;
}















export {
    setDesignerEngine,
    getDesignerEngine,
    getCursor,
}
